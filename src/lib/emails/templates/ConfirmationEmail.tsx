import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from "@react-email/components";
import { emailColors } from "./emailColors";

export type ConfirmationEmailProps = {
  firstName: string;
  forfait: string;
  type: string;
  price: number;
  siteUrl: string;
};

const forfaitLabel: Record<string, string> = {
  decouverte: "Découverte",
  essentiel: "Essentiel",
  intensif: "Intensif",
};

export function ConfirmationEmail({
  firstName,
  forfait,
  type,
  price,
  siteUrl,
}: ConfirmationEmailProps) {
  const forfaitName = forfaitLabel[forfait] ?? forfait;
  const typeLabel = type === "mensuel" ? "Abonnement mensuel" : "Paiement unique";
  const ctaUrl = `${siteUrl}/espace-membre`;

  return (
    <Html>
      <Head />
      <Preview>✒️ Votre accès Qalam est activé — {forfaitName}</Preview>
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
              fontFamily: "serif",
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
            مبروك ! / Félicitations !
          </Heading>
          <Text style={{ margin: "0 0 16px", fontSize: "16px", color: emailColors.encre }}>
            Bonjour {firstName},
          </Text>
          <Text style={{ margin: "0 0 24px", fontSize: "16px", color: emailColors.encre, lineHeight: 1.5 }}>
            Votre inscription est confirmée. Votre accès à l&apos;espace membre est maintenant actif.
          </Text>

          <Section
            style={{
              backgroundColor: emailColors.beigeChaud,
              border: `2px solid ${emailColors.or}`,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              <strong>Forfait</strong> : {forfaitName}
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              <strong>Type</strong> : {typeLabel}
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              <strong>Montant</strong> : {price}€
            </Text>
            <Text style={{ margin: 0, fontSize: "14px", color: emailColors.encre }}>
              <strong>Accès</strong> : Immédiat
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
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
              Accéder à mes cours →
            </Link>
          </Section>

          <Section
            style={{
              marginTop: "24px",
              padding: "16px 0",
              borderTop: `1px solid ${emailColors.beigeChaud}`,
            }}
          >
            <Text
              style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}
              dir="rtl"
            >
              عزيزي {firstName}،
            </Text>
            <Text
              style={{ margin: 0, fontSize: "14px", color: emailColors.encreDouce, lineHeight: 1.5 }}
              dir="rtl"
            >
              تم تفعيل اشتراكك بنجاح. يمكنك الآن الوصول إلى دروسك.
            </Text>
          </Section>

          <Text style={{ marginTop: "24px", fontSize: "12px", color: emailColors.encreDouce }}>
            Conservez cet email comme preuve d&apos;achat.
          </Text>
          <Text style={{ margin: "4px 0 0", fontSize: "12px", color: emailColors.encreDouce }}>
            Pour toute question : contact@qalam.academy
          </Text>
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
