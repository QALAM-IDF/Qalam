export type QuizQuestion = {
  id: string;
  question: string;
  questionAr?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  titleAr: string;
  duration: string;
  youtubeId: string;
  description: string;
  pdfUrl?: string;
  quiz?: QuizQuestion[];
  completed?: boolean;
};

export type Course = {
  id: string;
  title: string;
  titleAr: string;
  level:
    | "decouverte"
    | "essentiel-debutant"
    | "essentiel-intermediaire"
    | "essentiel-avance"
    | "intensif"
    | "coranique";
  forfait: "decouverte" | "essentiel" | "intensif";
  univers: "hommes" | "femmes" | "enfants" | "mixte";
  description: string;
  totalHours: number;
  totalLessons: number;
  lessons: Lesson[];
  thumbnail?: string;
};

export const mockCourses: Course[] = [
  {
    id: "decouverte-alphabet",
    title: "L'Alphabet Arabe",
    titleAr: "الحروف العربية",
    level: "decouverte",
    forfait: "decouverte",
    univers: "mixte",
    description:
      "Apprenez les 28 lettres de l'alphabet arabe, leur prononciation et leurs formes selon leur position dans le mot.",
    totalHours: 10,
    totalLessons: 10,
    lessons: [
      {
        id: "l1",
        title: "Introduction & les voyelles",
        titleAr: "المقدمة والحركات",
        duration: "18:42",
        youtubeId: "dQw4w9WgXcQ",
        description:
          "Découvrez la structure de la langue arabe et les trois voyelles fondamentales : fatha, kasra, damma.",
        pdfUrl: "/pdfs/lecon-1.pdf",
        completed: true,
        quiz: [
          {
            id: "q1",
            question: "Combien de lettres compte l'alphabet arabe ?",
            questionAr: "كم عدد حروف الأبجدية العربية؟",
            options: ["24 lettres", "26 lettres", "28 lettres", "30 lettres"],
            correctIndex: 2,
            explanation:
              "L'alphabet arabe compte 28 lettres, toutes des consonnes. Les voyelles sont indiquées par des signes diacritiques.",
          },
          {
            id: "q2",
            question: 'Comment s\'appelle la voyelle "a" court en arabe ?',
            options: ["Kasra", "Damma", "Fatha", "Sukun"],
            correctIndex: 2,
            explanation:
              "La Fatha (فتحة) est le signe qui indique le son 'a' court. Elle se place au-dessus de la lettre.",
          },
        ],
      },
      {
        id: "l2",
        title: "Les lettres ا ب ت ث",
        titleAr: "الحروف أ ب ت ث",
        duration: "22:15",
        youtubeId: "dQw4w9WgXcQ",
        description:
          "Écriture et prononciation des quatre premières lettres de l'alphabet, avec exercices de lecture.",
        pdfUrl: "/pdfs/lecon-2.pdf",
        completed: true,
        quiz: [
          {
            id: "q3",
            question: "Combien de points a la lettre ث (tha) ?",
            options: ["1 point", "2 points", "3 points", "Aucun point"],
            correctIndex: 2,
            explanation:
              "La lettre ث (tha) possède 3 points au-dessus, ce qui la distingue de ب (1 point en dessous) et ت (2 points au-dessus).",
          },
        ],
      },
      {
        id: "l3",
        title: "Les lettres ج ح خ",
        titleAr: "الحروف ج ح خ",
        duration: "19:30",
        youtubeId: "dQw4w9WgXcQ",
        description:
          "Maîtrisez le son du ح (h aspiré) et du خ (kh gutural), deux sons inexistants en français.",
        pdfUrl: "/pdfs/lecon-3.pdf",
        completed: false,
        quiz: [],
      },
      ...Array.from({ length: 7 }, (_, i) => ({
        id: `l${i + 4}`,
        title: `Leçon ${i + 4} — Lettres suivantes`,
        titleAr: `الدرس ${i + 4}`,
        duration: `${16 + i}:00`,
        youtubeId: "dQw4w9WgXcQ",
        description: `Suite de l'apprentissage de l'alphabet arabe — groupe de lettres ${i + 4}.`,
        completed: false,
        quiz: [] as QuizQuestion[],
      })),
    ],
  },
  {
    id: "essentiel-grammaire",
    title: "Grammaire Fondamentale",
    titleAr: "قواعد اللغة العربية",
    level: "essentiel-debutant",
    forfait: "essentiel",
    univers: "mixte",
    description:
      "Construisez des phrases correctes en arabe. Sujet, verbe, complément, masculin/féminin, singulier/pluriel.",
    totalHours: 30,
    totalLessons: 20,
    lessons: Array.from({ length: 20 }, (_, i) => ({
      id: `eg-l${i + 1}`,
      title: `Leçon ${i + 1} — ${["La phrase nominale", "Le verbe arabe", "Le duel", "Le pluriel brisé", "Les pronoms"][i % 5]}`,
      titleAr: `الدرس ${i + 1}`,
      duration: `${20 + (i % 8)}:${String((i * 3) % 60).padStart(2, "0")}`,
      youtubeId: "dQw4w9WgXcQ",
      description: `Approfondissez votre compréhension de la grammaire arabe — leçon ${i + 1}.`,
      pdfUrl: `/pdfs/grammaire-${i + 1}.pdf`,
      completed: i < 3,
      quiz:
        i < 3
          ? [
              {
                id: `eg-q${i}`,
                question: "Question de révision de la leçon",
                options: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
                correctIndex: 1,
                explanation: "Explication de la bonne réponse.",
              } as QuizQuestion,
            ]
          : [],
    })),
  },
  {
    id: "coranique-tajwid",
    title: "Tajwid — Les Fondamentaux",
    titleAr: "أحكام التجويد",
    level: "coranique",
    forfait: "intensif",
    univers: "mixte",
    description:
      "Apprenez les règles essentielles du Tajwid pour réciter le Coran correctement et mélodieusement.",
    totalHours: 30,
    totalLessons: 15,
    lessons: Array.from({ length: 15 }, (_, i) => ({
      id: `taj-l${i + 1}`,
      title: [
        "Makharej (points d'articulation)",
        "Nun Sakinah",
        "Meem Sakinah",
        "Madd (prolongation)",
        "Waqf (pause)",
      ][i % 5],
      titleAr: `الدرس ${i + 1}`,
      duration: `${25 + (i % 5)}:00`,
      youtubeId: "dQw4w9WgXcQ",
      description: `Règles du Tajwid — leçon ${i + 1}.`,
      pdfUrl: `/pdfs/tajwid-${i + 1}.pdf`,
      completed: false,
      quiz: [] as QuizQuestion[],
    })),
  },
];

export const forfaitAccess: Record<string, string[]> = {
  decouverte: ["decouverte-alphabet"],
  essentiel: ["decouverte-alphabet", "essentiel-grammaire"],
  intensif: [
    "decouverte-alphabet",
    "essentiel-grammaire",
    "coranique-tajwid",
  ],
};

export const mockUser: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  forfait: "decouverte" | "essentiel" | "intensif";
  univers: "hommes" | "femmes" | "enfants";
  joinedAt: string;
  progression: Record<string, { completed: number; total: number }>;
} = {
  id: "user-001",
  firstName: "Yassine",
  lastName: "Benali",
  email: "yassine@example.com",
  forfait: "essentiel",
  univers: "hommes",
  joinedAt: "2025-01-15",
  progression: {
    "decouverte-alphabet": { completed: 2, total: 10 },
    "essentiel-grammaire": { completed: 3, total: 20 },
  },
};
