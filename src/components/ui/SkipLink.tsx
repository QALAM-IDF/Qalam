"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: "absolute",
        top: "-100px",
        left: "16px",
        zIndex: 99999,
        padding: "12px 20px",
        background: "var(--or-brillant)",
        color: "var(--encre-noire)",
        borderRadius: "0 0 8px 8px",
        fontWeight: 700,
        textDecoration: "none",
        transition: "top 0.2s",
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = "0";
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = "-100px";
      }}
    >
      Aller au contenu principal
    </a>
  );
}
