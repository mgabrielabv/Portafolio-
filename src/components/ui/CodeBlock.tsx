import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import { cn } from "@/utils/cn";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);

const EXT_TO_LANG: Record<string, string> = {
  tsx: "tsx",
  ts: "typescript",
  jsx: "tsx",
  js: "javascript",
  mjs: "javascript",
  py: "python",
  json: "json",
  sh: "bash",
};

function resolveLanguage(language: string | undefined, fileName: string | undefined): string {
  if (language) return language;
  if (fileName) {
    const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
    const mapped = EXT_TO_LANG[ext];
    if (mapped) return mapped;
  }
  return "typescript";
}

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  className?: string;
}

/** Bloque de código con syntax highlighting y botón "copiar código". */
export function CodeBlock({ code, language, fileName, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const resolved = resolveLanguage(language, fileName);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible */
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-[#201D19] text-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-[#A89E94]">{fileName ?? resolved}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-mono text-xs text-[#C4BDB2] transition-colors hover:bg-white/10"
          aria-label={copied ? "Código copiado" : "Copiar código"}
        >
          {copied ? <Check className="size-3.5 text-accent" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>
      <SyntaxHighlighter
        language={resolved}
        style={oneDark}
        customStyle={{ margin: 0, background: "transparent", padding: "1.25rem 1.5rem", fontSize: "0.8rem", lineHeight: 1.7 }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
