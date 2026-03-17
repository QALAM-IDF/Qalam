import { SignIn } from "@clerk/nextjs";

export default function ConnexionPage() {
  return (
    <main
      className="grain-overlay flex min-h-screen items-center justify-center py-20"
      style={{ background: "var(--beige-creme)" }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="font-arabic text-3xl mb-1" style={{ color: "var(--or-luxe)" }}>
            أهلاً بك
          </p>
          <h1 className="font-display text-4xl" style={{ color: "var(--encre-noire)" }}>
            Connexion à Qalam
          </h1>
        </div>
        <SignIn
          forceRedirectUrl="/auth-redirect"
          fallbackRedirectUrl="/auth-redirect"
          appearance={{
            variables: {
              colorPrimary: "#b8860b",
              colorBackground: "#faf6ee",
              colorText: "#1a1208",
              colorInputBackground: "#f5efe0",
              colorInputText: "#1a1208",
              borderRadius: "8px",
              fontFamily: "'Lato', sans-serif",
            },
            elements: {
              card: "shadow-none border border-[#d4af3740]",
            },
          }}
        />
      </div>
    </main>
  );
}
