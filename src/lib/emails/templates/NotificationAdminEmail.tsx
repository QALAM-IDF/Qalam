import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Preview,
} from "@react-email/components";
import { emailColors } from "./emailColors";

export type NotificationAdminEmailProps = {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  source: string;
  receivedAt: string;
  adminUrl: string;
};

export function NotificationAdminEmail({
  senderName,
  senderEmail,
  subject,
  message,
  source,
  receivedAt,
  adminUrl,
}: NotificationAdminEmailProps) {
  const adminMessagesUrl = `${adminUrl}/admin/messages`;
  const replyTo = `mailto:${senderEmail}`;

  return (
    <Html>
      <Head />
      <Preview>📩 Nouveau message — {subject} — Qalam</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: emailColors.ivoire }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "24px 16px" }}>
          <Heading
            style={{
              margin: "0 0 20px",
              fontSize: "20px",
              color: emailColors.encre,
            }}
          >
            Nouveau message reçu sur Qalam
          </Heading>

          <Section
            style={{
              padding: "16px",
              backgroundColor: emailColors.beige,
              borderRadius: "8px",
              marginBottom: "16px",
              border: `1px solid ${emailColors.beigeChaud}`,
            }}
          >
            <Text style={{ margin: "0 0 6px", fontSize: "13px", color: emailColors.encre }}>
              <strong>De</strong> : {senderName} &lt;{senderEmail}&gt;
            </Text>
            <Text style={{ margin: "0 0 6px", fontSize: "13px", color: emailColors.encre }}>
              <strong>Sujet</strong> : {subject}
            </Text>
            <Text style={{ margin: "0 0 6px", fontSize: "13px", color: emailColors.encre }}>
              <strong>Source</strong> : {source}
            </Text>
            <Text style={{ margin: 0, fontSize: "13px", color: emailColors.encre }}>
              <strong>Reçu le</strong> : {receivedAt}
            </Text>
          </Section>

          <Text style={{ margin: "0 0 6px", fontSize: "13px", color: emailColors.encre, fontWeight: "bold" }}>
            Message :
          </Text>
          <Section
            style={{
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "6px",
              marginBottom: "20px",
              border: `1px solid ${emailColors.beigeChaud}`,
              whiteSpace: "pre-wrap" as const,
            }}
          >
            <Text style={{ margin: 0, fontSize: "13px", color: emailColors.encre, lineHeight: 1.5 }}>
              {message}
            </Text>
          </Section>

          <Section style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href={adminMessagesUrl}
              style={{
                display: "inline-block",
                backgroundColor: emailColors.orBrillant,
                color: emailColors.encre,
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Voir dans l&apos;admin →
            </Link>
            <Link
              href={replyTo}
              style={{
                display: "inline-block",
                backgroundColor: emailColors.beigeChaud,
                color: emailColors.encre,
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                textDecoration: "none",
                border: `1px solid ${emailColors.or}`,
              }}
            >
              Répondre par email →
            </Link>
          </Section>
        </Container>

        <Section
          style={{
            backgroundColor: emailColors.beige,
            padding: "16px",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Text style={{ margin: 0, fontSize: "12px", color: emailColors.encreDouce }}>
            © Qalam Admin
          </Text>
        </Section>
      </Body>
    </Html>
  );
}
