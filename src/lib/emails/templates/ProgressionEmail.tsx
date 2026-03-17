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

export type ProgressionEmailProps = {
  firstName: string;
  lessonsCompleted: number;
  totalLessons: number;
  percentComplete: number;
  coursesInProgress: { title: string; progress: number }[];
  nextLesson?: { title: string; courseTitle: string };
  siteUrl: string;
};

function getEncouragement(percent: number): string {
  if (percent >= 80) return "ممتاز! Vous êtes presque au bout !";
  if (percent >= 50) return "أحسنت! Continuez comme ça !";
  return "La régularité est la clé. Un peu chaque jour !";
}

export function ProgressionEmail({
  firstName,
  lessonsCompleted,
  totalLessons,
  percentComplete,
  coursesInProgress,
  nextLesson,
  siteUrl,
}: ProgressionEmailProps) {
  const encouragement = getEncouragement(percentComplete);
  const nextUrl = nextLesson
    ? `${siteUrl}/espace-membre/cours`
    : `${siteUrl}/espace-membre/cours`;

  return (
    <Html>
      <Head />
      <Preview>📊 Votre progression cette semaine — Qalam</Preview>
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
            تقدمك هذا الأسبوع / Votre progression
          </Heading>

          <Section
            style={{
              textAlign: "center",
              marginBottom: "24px",
              padding: "24px",
              backgroundColor: emailColors.beigeChaud,
              borderRadius: "8px",
              border: `1px solid ${emailColors.or}`,
            }}
          >
            <Text style={{ margin: 0, fontSize: "42px", fontWeight: "bold", color: emailColors.orBrillant }}>
              {percentComplete}%
            </Text>
            <Text style={{ margin: "8px 0 0", fontSize: "14px", color: emailColors.encre }}>
              complété
            </Text>
            <Section style={{ marginTop: "16px" }}>
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  width: "100%",
                  height: "12px",
                  backgroundColor: emailColors.beige,
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: `${percentComplete}%`,
                        backgroundColor: emailColors.orBrillant,
                      }}
                    />
                    <td style={{ backgroundColor: "transparent" }} />
                  </tr>
                </tbody>
              </table>
            </Section>
            <Text style={{ margin: "8px 0 0", fontSize: "12px", color: emailColors.encreDouce }}>
              {lessonsCompleted} leçons / {totalLessons} total
            </Text>
          </Section>

          {coursesInProgress.length > 0 ? (
            <Section style={{ marginBottom: "20px" }}>
              <Text style={{ margin: "0 0 12px", fontSize: "16px", color: emailColors.encre, fontWeight: "bold" }}>
                Détail par cours
              </Text>
              {coursesInProgress.map((c, i) => (
                <Section
                  key={i}
                  style={{
                    marginBottom: "12px",
                    padding: "12px",
                    backgroundColor: emailColors.beige,
                    borderRadius: "6px",
                  }}
                >
                  <Text style={{ margin: "0 0 6px", fontSize: "14px", color: emailColors.encre }}>
                    {c.title}
                  </Text>
                  <table
                    role="presentation"
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                      width: "100%",
                      height: "6px",
                      backgroundColor: emailColors.ivoire,
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            width: `${c.progress}%`,
                            backgroundColor: emailColors.or,
                          }}
                        />
                        <td style={{ backgroundColor: "transparent" }} />
                      </tr>
                    </tbody>
                  </table>
                  <Text style={{ margin: "4px 0 0", fontSize: "12px", color: emailColors.encreDouce }}>
                    {c.progress}%
                  </Text>
                </Section>
              ))}
            </Section>
          ) : null}

          {nextLesson ? (
            <Text style={{ margin: "0 0 8px", fontSize: "14px", color: emailColors.encre }}>
              Prochaine leçon recommandée : <strong>{nextLesson.title}</strong> ({nextLesson.courseTitle})
            </Text>
          ) : null}

          <Text
            style={{
              margin: "20px 0",
              fontSize: "15px",
              color: emailColors.encre,
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {encouragement}
          </Text>

          <Section style={{ textAlign: "center" }}>
            <Link
              href={nextUrl}
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
              Reprendre mes cours →
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
