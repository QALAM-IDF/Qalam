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

export type RappelCoursEmailProps = {
  firstName: string;
  coursTitle: string;
  coursTitleAr: string;
  sessionDate: string;
  zoomLink?: string;
  siteUrl: string;
};

export function RappelCoursEmail({
  firstName,
  coursTitle,
  coursTitleAr,
  sessionDate,
  zoomLink,
  siteUrl,
}: RappelCoursEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>⏰ Rappel — Votre cours commence demain</Preview>
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
            درسك غداً / Votre cours est demain !
          </Heading>

          <Section
            style={{
              backgroundColor: emailColors.beigeChaud,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              border: `1px solid ${emailColors.or}`,
            }}
          >
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              📚 <strong>Cours</strong> : {coursTitle} / <span dir="rtl">{coursTitleAr}</span>
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              📅 <strong>Date</strong> : {sessionDate}
            </Text>
            {zoomLink ? (
              <Text style={{ margin: 0, fontSize: "14px", color: emailColors.encre }}>
                🔗 <strong>Lien</strong> :{" "}
                <Link href={zoomLink} style={{ color: emailColors.or }}>
                  Rejoindre Zoom
                </Link>
              </Text>
            ) : null}
          </Section>

          <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre, fontWeight: "bold" }}>
            Conseils de préparation :
          </Text>
          <Text style={{ margin: "0 0 4px", fontSize: "14px", color: emailColors.encre }}>
            • Préparez votre cahier et stylo
          </Text>
          <Text style={{ margin: "0 0 4px", fontSize: "14px", color: emailColors.encre }}>
            • Testez votre connexion Zoom 10 min avant
          </Text>
          <Text style={{ margin: "0 0 20px", fontSize: "14px", color: emailColors.encre }}>
            • Révisez la leçon précédente
          </Text>

          <Text
            style={{ margin: "0 0 24px", fontSize: "14px", color: emailColors.encreDouce, lineHeight: 1.5 }}
            dir="rtl"
          >
            تذكير: درسك غداً. كن مستعداً!
          </Text>

          <Section style={{ textAlign: "center" }}>
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
              Voir mes cours →
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
