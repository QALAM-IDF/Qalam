export type Forfait = {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  hours: number;
  sessionsPerWeek: number;
  sessionDuration: string;
  groupSize: string;
  format: string;
  price: number;
  priceLabel?: string;
  features: string[];
  highlighted?: boolean;
  theme?: "default" | "hommes" | "femmes" | "enfants";
};

export const forfaits: Forfait[] = [
  {
    id: "decouverte",
    name: "Découverte",
    nameAr: "الاكتشاف",
    tagline: "Pour débuter en douceur",
    hours: 10,
    sessionsPerWeek: 1,
    sessionDuration: "1h",
    groupSize: "max 8 personnes",
    format: "Zoom",
    price: 120,
    priceLabel: "soit 12€/h",
    features: [
      "10 heures de cours en groupe",
      "Accès aux replays pendant 30 jours",
      "Support pédagogique PDF inclus",
      "Groupe mixte selon disponibilité",
    ],
    highlighted: false,
  },
  {
    id: "essentiel",
    name: "Essentiel",
    nameAr: "الأساسي",
    tagline: "Le forfait le plus choisi",
    hours: 30,
    sessionsPerWeek: 2,
    sessionDuration: "1h30",
    groupSize: "max 8 personnes",
    format: "Zoom + replay",
    price: 299,
    priceLabel: "soit 9,97€/h",
    features: [
      "30 heures de cours en groupe",
      "Accès aux replays illimité",
      "Support pédagogique complet",
      "Évaluation de niveau offerte",
      "Groupe dédié (Hommes / Femmes / Enfants)",
      "Messagerie avec le professeur",
    ],
    highlighted: true,
  },
  {
    id: "intensif",
    name: "Intensif",
    nameAr: "المكثف",
    tagline: "Pour progresser rapidement",
    hours: 30,
    sessionsPerWeek: 3,
    sessionDuration: "1h30",
    groupSize: "individuel",
    format: "Zoom + replay",
    price: 490,
    priceLabel: "soit 16,33€/h",
    features: [
      "30 heures de cours particuliers",
      "Programme 100% personnalisé",
      "Accès aux replays illimité",
      "Supports pédagogiques sur mesure",
      "Évaluation de niveau offerte",
      "Suivi hebdomadaire et bilan mensuel",
      "Messagerie prioritaire 7j/7",
    ],
    highlighted: false,
  },
];
