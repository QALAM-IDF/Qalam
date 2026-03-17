export type Programme = {
  id: string;
  title: string;
  titleAr: string;
  level: string;
  levelAr: string;
  description: string;
  objectifs: string[];
  duration: string;
  prerequis: string;
  theme: "default" | "hommes" | "femmes" | "enfants";
};

export const programmes: Programme[] = [
  {
    id: "debutant",
    title: "Débutant",
    titleAr: "مبتدئ",
    level: "Niveau 1",
    levelAr: "المستوى الأول",
    description:
      "Partez de zéro et apprenez l'alphabet, la lecture et les bases de la conversation.",
    objectifs: [
      "Lire et écrire l'alphabet arabe",
      "Comprendre les sons et la phonétique",
      "Construire des phrases simples",
      "Vocabulaire du quotidien (200 mots)",
    ],
    duration: "30h (1 forfait Essentiel)",
    prerequis: "Aucun",
    theme: "default",
  },
  {
    id: "intermediaire",
    title: "Intermédiaire",
    titleAr: "متوسط",
    level: "Niveau 2",
    levelAr: "المستوى الثاني",
    description:
      "Renforcez votre grammaire, enrichissez votre vocabulaire et développez l'aisance à l'oral.",
    objectifs: [
      "Maîtriser la grammaire arabe standard",
      "Conversations fluides sur des sujets variés",
      "Lecture de textes courants",
      "Vocabulaire élargi (800 mots)",
    ],
    duration: "30h (1 forfait Essentiel)",
    prerequis: "Niveau Débutant validé ou test de positionnement",
    theme: "default",
  },
  {
    id: "avance",
    title: "Avancé",
    titleAr: "متقدم",
    level: "Niveau 3",
    levelAr: "المستوى الثالث",
    description:
      "Atteignez un niveau d'expression écrite et orale avancé, proche du locuteur natif.",
    objectifs: [
      "Expression écrite soignée et complexe",
      "Compréhension de médias arabes",
      "Littérature et textes classiques",
      "Arabisation dans les écrits professionnels",
    ],
    duration: "30h (1 forfait Essentiel ou Intensif)",
    prerequis: "Niveau Intermédiaire validé",
    theme: "default",
  },
  {
    id: "coranique",
    title: "Coranique & Tajwid",
    titleAr: "قرآن وتجويد",
    level: "Niveau Spécialisé",
    levelAr: "المستوى المتخصص",
    description:
      "Apprenez à réciter le Coran avec les règles du Tajwid, sous la guidance d'un professeur certifié.",
    objectifs: [
      "Maîtrise des règles du Tajwid",
      "Récitation correcte et mélodieuse",
      "Mémorisation de sourates choisies",
      "Compréhension du sens des versets",
    ],
    duration: "30h (1 forfait Essentiel ou Intensif)",
    prerequis: "Savoir lire l'arabe (niveau Débutant minimum)",
    theme: "default",
  },
];
