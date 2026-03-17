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

export type BienvenuEmailProps = {
  firstName: string;
  forfait: string;
  siteUrl: string;
};

const forfaitLabel: Record<string, string> = {
  decouverte: "Découverte",
  essentiel: "Essentiel",
  intensif: "Intensif",
};

export function BienvenuEmail({
  firstName,
  forfait,
  siteUrl,
}: BienvenuEmailProps) {
  const forfaitName = forfaitLabel[forfait] ?? forfait;

  return (
    <Html>
      <Head />
      <Preview>👋 Bienvenue dans votre espace Qalam, {firstName} !</Preview>
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
              fontSize: "26px",
              color: emailColors.encre,
              textAlign: "center",
            }}
          >
            أهلاً وسهلاً / Bienvenue !
          </Heading>
          <Text style={{ margin: "0 0 24px", fontSize: "16px", color: emailColors.encre, lineHeight: 1.5 }}>
            Votre espace d&apos;apprentissage est prêt.
          </Text>

          <Section
            style={{
              backgroundColor: emailColors.beigeChaud,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              border: `1px solid ${emailColors.or}`,
            }}
          >
            <Text style={{ margin: "0 0 12px", fontSize: "16px", color: emailColors.encre, fontWeight: "bold" }}>
              3 étapes pour commencer
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              1️⃣{" "}
              <Link href={`${siteUrl}/espace-membre/cours`} style={{ color: emailColors.or }}>
                Accédez à vos cours
              </Link>
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              2️⃣{" "}
              <Link href={`${siteUrl}/espace-membre/progression`} style={{ color: emailColors.or }}>
                Suivez votre progression
              </Link>
            </Text>
            <Text style={{ margin: 0, fontSize: "14px", color: emailColors.encre }}>
              3️⃣{" "}
              <Link href={`${siteUrl}/contact`} style={{ color: emailColors.or }}>
                Contactez votre professeur
              </Link>
            </Text>
          </Section>

          <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encreDouce }}>
            Forfait actif : {forfaitName}
          </Text>
          <Text style={{ margin: "0 0 20px", fontSize: "14px", color: emailColors.encreDouce }}>
            Vos cours disponibles selon votre forfait sont déjà accessibles dans l&apos;espace membre.
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
              مرحباً بك في فضائك التعليمي. دروسك في انتظارك!
            </Text>
          </Section>

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
              Commencer maintenant →
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
