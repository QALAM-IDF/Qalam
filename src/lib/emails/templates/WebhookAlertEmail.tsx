import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Preview,
} from "@react-email/components";

export type WebhookAlertEmailProps = {
  type: string;
  details: Record<string, unknown>;
};

export function WebhookAlertEmail({ type, details }: WebhookAlertEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>⚠️ Alerte Stripe Qalam — {type}</Preview>
      <Body style={{ background: "#fff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
          <Heading style={{ color: "#c0392b" }}>
            ⚠️ Alerte Webhook Stripe
          </Heading>
          <Text style={{ color: "#333" }}>
            Type d&apos;alerte : <strong>{type}</strong>
          </Text>
          <Hr />
          <Text style={{ color: "#333", fontWeight: "bold" }}>
            Détails :
          </Text>
          {Object.entries(details).map(([key, value]) => (
            <Text
              key={key}
              style={{ color: "#555", margin: "4px 0" }}
            >
              <strong>{key}</strong> : {String(value)}
            </Text>
          ))}
          <Hr />
          <Text style={{ color: "#888", fontSize: 12 }}>
            Action requise : vérifier Supabase → table purchases et corriger
            manuellement si nécessaire.
          </Text>
          <Text style={{ color: "#888", fontSize: 12 }}>
            {new Date().toLocaleString("fr-FR")} — Qalam
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
