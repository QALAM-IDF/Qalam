import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
} from "@react-email/components";
import { emailColors } from "./emailColors";

export type ProfMessageEmailProps = {
  eleveNom: string;
  profNom: string;
  message: string;
  siteUrl: string;
};

export function ProfMessageEmail({
  eleveNom,
  profNom,
  message,
  siteUrl,
}: ProfMessageEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ margin: 0, padding: 0, backgroundColor: emailColors.ivoire }}>
        <Section
          style={{
            backgroundColor: emailColors.beige,
            padding: "24px 16px",
            textAlign: "center" as const,
          }}
        >
          <Text
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "bold",
              color: emailColors.encre,
            }}
          >
            Message de votre professeur Qalam
          </Text>
        </Section>

        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "24px 16px" }}>
          <Text style={{ margin: "0 0 16px", fontSize: "16px", color: emailColors.encre }}>
            Bonjour {eleveNom},
          </Text>
          <Section
            style={{
              padding: "20px",
              backgroundColor: emailColors.beigeChaud,
              borderRadius: "8px",
              border: `1px solid ${emailColors.or}`,
              whiteSpace: "pre-wrap" as const,
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: "15px",
                color: emailColors.encre,
                lineHeight: 1.6,
              }}
            >
              {message}
            </Text>
          </Section>
          <Text style={{ margin: "16px 0 0", fontSize: "14px", color: emailColors.encreDouce }}>
            Votre professeur, {profNom}
          </Text>

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <Link
              href={`${siteUrl}/espace-membre/cours`}
              style={{
                display: "inline-block",
                backgroundColor: emailColors.orBrillant,
                color: emailColors.encre,
                padding: "14px 28px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Accéder à mes cours →
            </Link>
          </Section>
        </Container>

        <Section
          style={{
            backgroundColor: emailColors.beige,
            padding: "20px 16px",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Text style={{ margin: 0, fontSize: "12px", color: emailColors.encreDouce }}>
            © Qalam
          </Text>
        </Section>
      </Body>
    </Html>
  );
}
