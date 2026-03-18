export type ForfaitCategorie =
  | "hommes"
  | "femmes"
  | "enfant-5-8"
  | "enfant-9-12"
  | "enfant-13-15"
  | "particulier";

export type ForfaitType = "youtube" | "zoom" | "youtube-zoom";

export type Forfait = {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  categorie: ForfaitCategorie;
  format: ForfaitType;
  hours: number;
  sessionsPerWeek: number;
  sessionDuration: string;
  groupSize: string;
  price: number;
  priceLabel?: string;
  cycleWeeks?: number;
  features: string[];
  highlighted?: boolean;
  methodeKids?: boolean;
  stripePrice?: string;
};

// ============================================================
// FORFAITS HOMMES (YouTube + PDF)
// ============================================================
const forfaitsHommes: Forfait[] = [
  {
    id: "hommes-decouverte",
    name: "Découverte",
    nameAr: "الاكتشاف",
    tagline: "Pour débuter en douceur",
    categorie: "hommes",
    format: "youtube",
    hours: 10,
    sessionsPerWeek: 1,
    sessionDuration: "1h",
    groupSize: "max 8 personnes",
    price: 120,
    priceLabel: "soit 12€/h",
    features: [
      "10h de cours en vidéo YouTube (non répertorié)",
      "Accès aux replays pendant 30 jours",
      "Support pédagogique PDF inclus",
      "Groupe Hommes dédié",
    ],
  },
  {
    id: "hommes-essentiel",
    name: "Essentiel",
    nameAr: "الأساسي",
    tagline: "Le forfait le plus choisi",
    categorie: "hommes",
    format: "youtube",
    hours: 30,
    sessionsPerWeek: 2,
    sessionDuration: "1h30",
    groupSize: "max 8 personnes",
    price: 299,
    priceLabel: "soit 9,97€/h",
    highlighted: true,
    features: [
      "30h de cours en vidéo YouTube (non répertorié)",
      "Accès aux replays illimité",
      "Support pédagogique PDF complet",
      "Évaluation de niveau offerte",
      "Groupe Hommes dédié",
      "Messagerie avec le professeur",
    ],
  },
  {
    id: "hommes-particulier",
    name: "Cours Particuliers",
    nameAr: "الدروس الخصوصية",
    tagline: "Suivi personnalisé en Zoom",
    categorie: "particulier",
    format: "zoom",
    hours: 30,
    sessionsPerWeek: 3,
    sessionDuration: "1h30",
    groupSize: "individuel",
    price: 490,
    priceLabel: "soit 16,33€/h",
    features: [
      "30h de cours particuliers en Zoom",
      "Programme 100% personnalisé",
      "Accès aux replays illimité",
      "Supports pédagogiques sur mesure",
      "Évaluation de niveau offerte",
      "Suivi hebdomadaire et bilan mensuel",
      "Messagerie prioritaire 7j/7",
      "Disponible à partir de 15 ans",
    ],
  },
];

// ============================================================
// FORFAITS FEMMES (YouTube + PDF)
// ============================================================
const forfaitsFemmes: Forfait[] = [
  {
    id: "femmes-decouverte",
    name: "Découverte",
    nameAr: "الاكتشاف",
    tagline: "Pour débuter en douceur",
    categorie: "femmes",
    format: "youtube",
    hours: 10,
    sessionsPerWeek: 1,
    sessionDuration: "1h",
    groupSize: "max 8 personnes",
    price: 120,
    priceLabel: "soit 12€/h",
    features: [
      "10h de cours en vidéo YouTube (non répertorié)",
      "Accès aux replays pendant 30 jours",
      "Support pédagogique PDF inclus",
      "Groupe Femmes exclusif",
    ],
  },
  {
    id: "femmes-essentiel",
    name: "Essentiel",
    nameAr: "الأساسي",
    tagline: "Le forfait le plus choisi",
    categorie: "femmes",
    format: "youtube",
    hours: 30,
    sessionsPerWeek: 2,
    sessionDuration: "1h30",
    groupSize: "max 8 personnes",
    price: 299,
    priceLabel: "soit 9,97€/h",
    highlighted: true,
    features: [
      "30h de cours en vidéo YouTube (non répertorié)",
      "Accès aux replays illimité",
      "Support pédagogique PDF complet",
      "Évaluation de niveau offerte",
      "Groupe Femmes exclusif",
      "Messagerie avec la professeure",
    ],
  },
  {
    id: "femmes-particulier",
    name: "Cours Particuliers",
    nameAr: "الدروس الخصوصية",
    tagline: "Suivi personnalisé en Zoom",
    categorie: "particulier",
    format: "zoom",
    hours: 30,
    sessionsPerWeek: 3,
    sessionDuration: "1h30",
    groupSize: "individuel",
    price: 490,
    priceLabel: "soit 16,33€/h",
    features: [
      "30h de cours particuliers en Zoom",
      "Programme 100% personnalisé",
      "Professeure native dédiée",
      "Supports pédagogiques sur mesure",
      "Messagerie prioritaire 7j/7",
      "Disponible à partir de 15 ans",
    ],
  },
];

// ============================================================
// FORFAITS ENFANTS — Méthode Kids (YouTube + PDF)
// ============================================================
const forfaitsEnfants: Forfait[] = [
  {
    id: "enfant-5-8",
    name: "Enfants 5-8 ans",
    nameAr: "الأطفال ٥-٨ سنوات",
    tagline: "Alphabet et mots simples en contexte ludique",
    categorie: "enfant-5-8",
    format: "youtube",
    hours: 8,
    sessionsPerWeek: 1,
    sessionDuration: "45min",
    groupSize: "max 6 enfants",
    price: 149,
    priceLabel: "Cycle 8 semaines",
    cycleWeeks: 8,
    methodeKids: true,
    features: [
      "Cycle de 8 semaines · 1 séance/semaine",
      "Vidéos YouTube non répertoriées (45min)",
      "Méthode Kids : Jeu, Histoire, Répétition",
      "Mini-défis et cartes visuelles",
      "Support PDF illustré",
      "Accès aux replays illimité",
      "Groupe max 6 enfants",
    ],
  },
  {
    id: "enfant-9-12",
    name: "Enfants 9-12 ans",
    nameAr: "الأطفال ٩-١٢ سنوات",
    tagline: "Phrases complètes, histoires, dialogue et lecture",
    categorie: "enfant-9-12",
    format: "youtube",
    hours: 10,
    sessionsPerWeek: 1,
    sessionDuration: "1h",
    groupSize: "max 6 enfants",
    price: 179,
    priceLabel: "Cycle 10 semaines",
    cycleWeeks: 10,
    methodeKids: true,
    highlighted: true,
    features: [
      "Cycle de 10 semaines · 1 séance/semaine",
      "Vidéos YouTube non répertoriées (1h)",
      "Méthode Kids : Jeu, Histoire, Répétition",
      "Récits courts et dialogues",
      "Support PDF + exercices",
      "Accès aux replays illimité",
      "Groupe max 6 enfants",
    ],
  },
  {
    id: "enfant-13-15",
    name: "Enfants 13-15 ans",
    nameAr: "الأطفال ١٣-١٥ سنة",
    tagline: "Expression orale, écriture structurée et récitation",
    categorie: "enfant-13-15",
    format: "youtube",
    hours: 12,
    sessionsPerWeek: 2,
    sessionDuration: "1h",
    groupSize: "max 8 adolescents",
    price: 219,
    priceLabel: "Cycle 12 semaines",
    cycleWeeks: 12,
    methodeKids: true,
    features: [
      "Cycle de 12 semaines · 2 séances/semaine",
      "Vidéos YouTube non répertoriées (1h)",
      "Expression orale et écriture structurée",
      "Introduction à la récitation coranique",
      "Support PDF avancé",
      "Accès aux replays illimité",
      "Groupe max 8 adolescents",
    ],
  },
];

export const forfaits = [
  ...forfaitsHommes,
  ...forfaitsFemmes,
  ...forfaitsEnfants,
];

export const forfaitsByCategorie = {
  hommes: forfaitsHommes,
  femmes: forfaitsFemmes,
  enfants: forfaitsEnfants,
} as const;

export const forfaitsParticulier = [
  ...forfaitsHommes.filter((f) => f.categorie === "particulier"),
  ...forfaitsFemmes.filter((f) => f.categorie === "particulier"),
];
