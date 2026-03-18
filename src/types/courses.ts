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

export type Course = {
  id: string;
  title: string;
  titleAr?: string;
  level: string;
  forfait: "decouverte" | "essentiel" | "intensif";
  univers: "hommes" | "femmes" | "enfants" | "mixte";
  description?: string;
  totalHours: number;
  totalLessons?: number;
  lessons: Lesson[];
  published?: boolean;
  thumbnail?: string;
};

export type ForfaitId = "decouverte" | "essentiel" | "intensif";
export type Univers = "hommes" | "femmes" | "enfants" | "mixte";
export type UserRole = "eleve" | "professeur" | "admin";

export const forfaitAccess: Record<ForfaitId, ForfaitId[]> = {
  decouverte: ["decouverte"],
  essentiel: ["decouverte", "essentiel"],
  intensif: ["decouverte", "essentiel", "intensif"],
};
