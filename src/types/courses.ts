// Types pour les cours et leçons
// Remplace les imports depuis @/data/mock-courses

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
  courseId?: string;
  title: string;
  titleAr?: string;
  duration: string;
  youtubeId?: string;
  description?: string;
  pdfUrl?: string;
  quiz?: QuizQuestion[];
  completed?: boolean;
  orderIndex?: number;
  published?: boolean;
};

export type CourseForfait =
  | "decouverte"
  | "essentiel"
  | "intensif"
  | "enfant-5-8"
  | "enfant-9-12"
  | "enfant-13-15";

export type Course = {
  id: string;
  title: string;
  titleAr?: string;
  level: string;
  forfait: CourseForfait;
  univers: "hommes" | "femmes" | "enfants" | "mixte";
  description?: string;
  totalHours: number;
  totalLessons?: number;
  lessons: Lesson[];
  published?: boolean;
  thumbnail?: string;
};

export type ForfaitId =
  | "decouverte"
  | "essentiel"
  | "intensif"
  | "hommes-decouverte"
  | "hommes-essentiel"
  | "hommes-particulier"
  | "femmes-decouverte"
  | "femmes-essentiel"
  | "femmes-particulier"
  | "enfant-5-8"
  | "enfant-9-12"
  | "enfant-13-15";
export type Univers = "hommes" | "femmes" | "enfants" | "mixte";
export type UserRole = "eleve" | "professeur" | "admin";

/** Pour un forfait acheté (id), liste des forfaits de cours accessibles */
export const forfaitAccess: Record<string, CourseForfait[]> = {
  decouverte: ["decouverte"],
  essentiel: ["decouverte", "essentiel"],
  intensif: ["decouverte", "essentiel", "intensif"],
  "hommes-decouverte": ["decouverte"],
  "hommes-essentiel": ["decouverte", "essentiel"],
  "hommes-particulier": ["decouverte", "essentiel", "intensif"],
  "femmes-decouverte": ["decouverte"],
  "femmes-essentiel": ["decouverte", "essentiel"],
  "femmes-particulier": ["decouverte", "essentiel", "intensif"],
  "enfant-5-8": ["decouverte", "enfant-5-8"],
  "enfant-9-12": ["decouverte", "enfant-9-12"],
  "enfant-13-15": ["decouverte", "essentiel", "enfant-13-15"],
};
