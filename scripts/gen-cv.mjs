import { writeFileSync } from "node:fs";

/* Genera un CV mínimo en PDF válido */
const stream =
  "BT /F1 22 Tf 72 740 Td (María Bermúdez) Tj ET\n" +
  "BT /F1 13 Tf 72 712 Td (Estudiante de Ingeniería en Computación) Tj ET\n" +
  "BT /F1 9 Tf 72 696 Td (React - TypeScript - Diseño de producto) Tj ET\n" +
  "0.427 0.365 0.965 rg 72 688 480 1 re f 0 0 0 rg\n" +
  "BT /F1 10 Tf 72 668 Td (Contacto: maria.bermudez@uru.edu - github.com/mariabermudez) Tj ET\n" +
  "BT /F1 9 Tf 72 652 Td (Universidad Rafael Urdaneta - Maracaibo, Zulia, Venezuela) Tj ET\n" +
  "BT /F1 11 Tf 72 630 Td (EXPERIENCIA Y PROYECTOS) Tj ET\n" +
  "BT /F1 10 Tf 72 608 Td (2024 - hoy - Estudiante de Ingeniería en Computación - URU) Tj ET\n" +
  "BT /F1 10 Tf 72 590 Td (2025 - hoy - Desarrolladora Frontend Freelance - React y TypeScript) Tj ET\n" +
  "BT /F1 10 Tf 72 572 Td (2024 - 2025 - Proyectos universitarios - dashboards y apps web) Tj ET\n" +
  "BT /F1 11 Tf 72 534 Td (HABILIDADES) Tj ET\n" +
  "BT /F1 10 Tf 72 512 Td (React, TypeScript, JavaScript, HTML, CSS, Tailwind, Figma, SQL, Git) Tj ET";

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((obj, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
});
const xrefPos = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 0; i < objects.length; i++) {
  pdf += `${String(offsets[i + 1]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

writeFileSync("public/cv.pdf", Buffer.from(pdf, "latin1"));
console.log("cv.pdf generado:", pdf.length, "bytes");
