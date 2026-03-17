"use client";

import { FileDown } from "lucide-react";

type PdfDownloadProps = {
  pdfUrl?: string;
  lessonTitle?: string;
};

export default function PdfDownload({ pdfUrl }: PdfDownloadProps) {
  const handleClick = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!pdfUrl}
      className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
      style={{
        borderColor: "var(--or-brillant)",
        backgroundColor: "var(--blanc-ivoire)",
        color: "var(--encre-noire)",
      }}
    >
      <FileDown className="h-4 w-4" />
      {pdfUrl ? "Télécharger le support PDF" : "PDF bientôt disponible"}
    </button>
  );
}
