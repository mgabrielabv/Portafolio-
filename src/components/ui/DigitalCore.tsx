import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { cn } from "@/utils/cn";

const VIOLET = 0x8b5cf6;
const CYAN = 0x22d3ee;
const SOFT_VIOLET = 0xa78bfa;

/**
 * Núcleo digital 3D: esfera de alambre + nube de puntos que rota
 * lentamente sobre un fondo transparente. three.js se carga de forma
 * diferida (chunk aparte) para no pesar el primer render. Con
 * prefers-reduced-motion solo dibuja un fotograma estático.
 */
export function DigitalCore({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (disposed) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 6.2;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      // Esfera de alambre (violeta)
      const wire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.9, 2),
        new THREE.MeshBasicMaterial({
          color: VIOLET,
          wireframe: true,
          transparent: true,
          opacity: 0.32,
        }),
      );
      group.add(wire);

      // Esfera interior (cian)
      const inner = new THREE.Mesh(
        new THREE.SphereGeometry(1.05, 24, 16),
        new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.22 }),
      );
      group.add(inner);

      // Partículas sobre la superficie (violeta suave)
      const count = 420;
      const positions = new Float32Array(count * 3);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const r = 1.9 + 0.06;
        positions[i * 3] = Math.cos(theta) * radius * r;
        positions[i * 3 + 1] = y * r;
        positions[i * 3 + 2] = Math.sin(theta) * radius * r;
      }
      const points = new THREE.Points(
        new THREE.BufferGeometry().setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3),
        ),
        new THREE.PointsMaterial({
          color: SOFT_VIOLET,
          size: 0.035,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      group.add(points);

      // Aro decorativo
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.35, 0.008, 12, 90),
        new THREE.MeshBasicMaterial({
          color: CYAN,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      ring.rotation.x = Math.PI / 2.6;
      group.add(ring);

      const resize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      const draw = (t: number) => {
        const s = t * 0.00016;
        wire.rotation.x = s * 1.1;
        wire.rotation.y = s * 1.6;
        inner.rotation.x = -s * 1.4;
        inner.rotation.y = s * 1.1;
        points.rotation.y = s * 0.8;
        ring.rotation.z = s * 0.5;
        renderer.render(scene, camera);
      };

      resize();

      let raf = 0;
      const tick = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(tick);
      };
      if (reduced) {
        draw(4000);
      } else {
        raf = requestAnimationFrame(tick);
      }

      const ro = new ResizeObserver(() => {
        resize();
        if (reduced) draw(4000);
      });
      ro.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        wire.geometry.dispose();
        (wire.material as THREE.Material).dispose();
        inner.geometry.dispose();
        (inner.material as THREE.Material).dispose();
        points.geometry.dispose();
        (points.material as THREE.Material).dispose();
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={containerRef} className={cn("relative", className)} aria-hidden />;
}
