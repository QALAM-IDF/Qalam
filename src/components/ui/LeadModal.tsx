"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "number" | "tel";
};

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  accent: string;
};

export default function LeadModal({ open, onClose, title, fields, accent }: LeadModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            className="w-full max-w-lg rounded-2xl border border-[#d4af3766] bg-[var(--blanc-ivoire)] p-5"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h3 className="font-display text-3xl" style={{ color: accent }}>
                {title}
              </h3>
              <button onClick={onClose} className="rounded-full border border-current/25 p-1.5" aria-label="Fermer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="grid gap-3">
              {fields.map((field) => (
                <label key={field.name} className="text-sm text-[var(--encre-douce)]">
                  {field.label}
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    className="mt-1 w-full rounded-xl border border-[#d7c49f] bg-[#f7f0df] px-3 py-2 outline-none focus:border-[var(--or-luxe)]"
                  />
                </label>
              ))}
              <label className="text-sm text-[var(--encre-douce)]">
                Message
                <textarea className="mt-1 min-h-24 w-full rounded-xl border border-[#d7c49f] bg-[#f7f0df] px-3 py-2 outline-none focus:border-[var(--or-luxe)]" />
              </label>
              <button
                type="button"
                className="mt-1 rounded-full px-5 py-2.5 text-sm text-white"
                style={{ backgroundColor: accent }}
              >
                Envoyer
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
