"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CalligraphyDivider from "@/components/shared/CalligraphyDivider";

type PortableTextRendererProps = {
  value: unknown[] | null | undefined;
  dir?: "ltr" | "rtl";
};

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        className="font-display text-3xl mt-12 mb-4"
        style={{ color: "var(--encre-noire)" }}
      >
        {children}
        <CalligraphyDivider className="mt-2 h-4 w-24" color="var(--or-brillant)" compact />
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        className="font-display text-2xl mt-8 mb-3"
        style={{ color: "var(--encre-noire)" }}
      >
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p
        className="font-body text-lg leading-relaxed mb-4"
        style={{ color: "var(--encre-douce)" }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        className="border-l-4 pl-6 py-2 my-8 italic rounded-r-lg"
        style={{
          borderColor: "var(--or-brillant)",
          background: "var(--beige-chaud)",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { _ref?: string }; alt?: string; caption?: string };
    }) => {
      const url = value?.asset ? urlFor(value).width(800).height(450).url() : "";
      if (!url) return null;
      return (
        <figure className="my-8 rounded-xl overflow-hidden">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={800}
            height={450}
            className="w-full object-cover"
          />
          {value.caption && (
            <figcaption
              className="text-center text-sm mt-2"
              style={{ color: "var(--encre-douce)" }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    arabicWord: ({
      value,
    }: {
      value: { arabic?: string; transliteration?: string; translation?: string };
    }) => (
      <div
        className="my-8 p-6 rounded-xl text-center grain-overlay"
        style={{
          background: "var(--beige-chaud)",
          border: "1px solid var(--or-brillant)",
        }}
      >
        <p
          className="font-arabic text-5xl mb-2"
          style={{ color: "var(--or-luxe)" }}
        >
          {value?.arabic ?? ""}
        </p>
        <p
          className="font-body text-sm italic mb-1"
          style={{ color: "var(--encre-douce)" }}
        >
          {value?.transliteration ?? ""}
        </p>
        <p
          className="font-display text-lg"
          style={{ color: "var(--encre-noire)" }}
        >
          {value?.translation ?? ""}
        </p>
      </div>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--or-luxe)",
          textDecoration: "underline",
        }}
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong
        style={{
          color: "var(--encre-noire)",
          fontWeight: 700,
        }}
      >
        {children}
      </strong>
    ),
  },
};

export default function PortableTextRenderer({
  value,
  dir = "ltr",
}: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;

  return (
    <div dir={dir} className="prose-custom">
      <PortableText value={value as import("@portabletext/types").PortableTextBlock[]} components={components} />
    </div>
  );
}
