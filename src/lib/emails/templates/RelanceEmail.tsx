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

export type RelanceEmailProps = {
  firstName: string;
  forfait: string;
  expiredAt: string;
  progressionSummary: string;
  siteUrl: string;
};

const forfaitLabel: Record<string, string> = {
  decouverte: "Découverte",
  essentiel: "Essentiel",
  intensif: "Intensif",
};

export function RelanceEmail({
  firstName,
  forfait,
  expiredAt,
  progressionSummary,
  siteUrl,
}: RelanceEmailProps) {
  const forfaitName = forfaitLabel[forfait] ?? forfait;
  const ctaUrl = `${siteUrl}/choisir-forfait`;

  return (
    <Html>
      <Head />
      <Preview>🔄 Votre accès Qalam a expiré — Renouvelez pour continuer</Preview>
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
              fontSize: "24px",
              fontWeight: "bold",
              color: emailColors.encre,
            }}
          >
            Qalam ✒️
          </Text>
          <Text
            style={{
              margin: "8px 0 0",
              fontSize: "14px",
              color: emailColors.encreDouce,
            }}
            dir="rtl"
          >
            العربية مفتاحُ عالمٍ جديد
          </Text>
        </Section>

        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "24px 16px" }}>
          <Heading
            style={{
              margin: "0 0 16px",
              fontSize: "24px",
              color: emailColors.encre,
              textAlign: "center",
            }}
          >
            نجدّد لك / On se retrouve ?
          </Heading>
          <Text style={{ margin: "0 0 16px", fontSize: "16px", color: emailColors.encre }}>
            Bonjour {firstName},
          </Text>
          <Text style={{ margin: "0 0 16px", fontSize: "16px", color: emailColors.encre, lineHeight: 1.5 }}>
            Votre accès Qalam ({forfaitName}) a expiré le {expiredAt}.
          </Text>
          <Text style={{ margin: "0 0 24px", fontSize: "16px", color: emailColors.encre, lineHeight: 1.5 }}>
            Vous avez complété {progressionSummary} — ne perdez pas votre élan !
          </Text>

          <Section
            style={{
              backgroundColor: emailColors.beigeChaud,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
              border: `1px solid ${emailColors.or}`,
            }}
          >
            <Text style={{ margin: "0 0 8px", fontSize: "16px", color: emailColors.encre }}>
              🔒 Vos données et progression sont conservées.
            </Text>
            <Text style={{ margin: 0, fontSize: "14px", color: emailColors.encreDouce, lineHeight: 1.5 }}>
              Renouvelez maintenant pour reprendre exactement où vous en étiez.
            </Text>
          </Section>

          <Text style={{ margin: "0 0 12px", fontSize: "14px", color: emailColors.encre }}>
            Options : Même forfait | Changer de forfait | CPF
          </Text>

          <Section
            style={{
              marginTop: "20px",
              padding: "16px 0",
              borderTop: `1px solid ${emailColors.beigeChaud}`,
            }}
          >
            <Text
              style={{ margin: 0, fontSize: "14px", color: emailColors.encreDouce, lineHeight: 1.5 }}
              dir="rtl"
            >
              لا تتوقف عن التعلم. عودتك تسعدنا!
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <Link
              href={ctaUrl}
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
              Renouveler mon accès →
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
            © Qalam | contact@qalam.academy
          </Text>
        </Section>
      </Body>
    </Html>
  );
}
