export type Teacher = {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  quote: string;
  quoteTranslation: string;
  specialites: {
    niveaux: string[];
    univers: string[];
    matieres: string[];
  };
  diplomes: string[];
  youtubeId?: string;
  /** URL de la photo du professeur — si fournie, affichée via next/image */
  avatarUrl?: string;
  avatarInitials: string;
  avatarTheme: "hommes" | "femmes" | "coranique";
  experience: string;
  students: number;
};

export const teachers: Teacher[] = [
  {
    id: "abdallah",
    name: "Abdallah Karim",
    nameAr: "عبد الله كريم",
    role: "Professeur d'arabe — Hommes",
    roleAr: "أستاذ اللغة العربية",
    bio: "Abdallah est titulaire d'une licence en langue et littérature arabes de l'Université Al-Azhar du Caire. Natif de Tunisie, il enseigne l'arabe depuis plus de 8 ans, avec une approche rigoureuse ancrée dans la tradition classique. Il est spécialisé dans la grammaire avancée et la littérature arabe.",
    bioAr: "عبد الله حاصل على إجازة في اللغة العربية وآدابها من جامعة الأزهر بالقاهرة. يُدرِّس اللغة العربية منذ أكثر من ثماني سنوات.",
    quote: "اللغة العربية بحرٌ لا ساحل له",
    quoteTranslation: "La langue arabe est un océan sans rivage",
    specialites: {
      niveaux: ["Intermédiaire", "Avancé"],
      univers: ["Hommes"],
      matieres: ["Grammaire", "Littérature", "Expression écrite"],
    },
    diplomes: [
      "Licence — Langue & Littérature arabes, Al-Azhar (Le Caire)",
      "Certificat d'enseignement FLE adapté à l'arabe",
      "Formation Tajwid — Ijaza niveau 1",
    ],
    youtubeId: "dQw4w9WgXcQ",
    avatarInitials: "AK",
    avatarTheme: "hommes",
    experience: "8 ans",
    students: 210,
  },
  {
    id: "fatima",
    name: "Fatima Zahra",
    nameAr: "فاطمة الزهراء",
    role: "Professeure d'arabe — Femmes & Enfants",
    roleAr: "أستاذة اللغة العربية",
    bio: "Fatima Zahra est diplômée en sciences de l'éducation et en linguistique arabe. Née au Maroc, elle a développé une méthode douce et bienveillante pour enseigner l'arabe aux femmes et aux enfants. Passionnée par la calligraphie, elle intègre l'art de l'écriture dans ses cours.",
    bioAr: "فاطمة الزهراء حاصلة على شهادة في علوم التربية واللسانيات العربية. طوّرت منهجاً تربوياً خاصاً يجمع بين اللغة والفن.",
    quote: "كلُّ حرفٍ نورٌ يضيء الطريق",
    quoteTranslation: "Chaque lettre est une lumière qui éclaire le chemin",
    specialites: {
      niveaux: ["Débutant", "Intermédiaire"],
      univers: ["Femmes", "Enfants"],
      matieres: ["Alphabet", "Calligraphie", "Arabe parlé"],
    },
    diplomes: [
      "Master — Sciences de l'éducation, Université Mohammed V (Rabat)",
      "Diplôme de linguistique arabe appliquée",
      "Certification enseignement enfants (5-15 ans)",
    ],
    youtubeId: "dQw4w9WgXcQ",
    avatarInitials: "FZ",
    avatarTheme: "femmes",
    experience: "6 ans",
    students: 185,
  },
  {
    id: "noureddine",
    name: "Noureddine Mansour",
    nameAr: "نور الدين منصور",
    role: "Professeur de Coran & Tajwid",
    roleAr: "أستاذ القرآن الكريم والتجويد",
    bio: "Noureddine est hafiz du Coran (mémorisé intégralement) et détenteur d'une Ijaza en récitation selon la riwaya Hafs. Formé en Arabie Saoudite puis en Égypte, il consacre son enseignement à la transmission correcte et mélodieuse du Coran. Son approche est à la fois académique et spirituelle.",
    bioAr: "نور الدين حافظٌ لكتاب الله، وحاصل على إجازة في القراءات بروايةِ حفص عن عاصم.",
    quote: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    quoteTranslation: "Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne",
    specialites: {
      niveaux: ["Tous niveaux (Coran)"],
      univers: ["Hommes", "Femmes"],
      matieres: ["Tajwid", "Mémorisation", "Récitation"],
    },
    diplomes: [
      "Hafiz — Mémorisation intégrale du Coran",
      "Ijaza en récitation — Riwaya Hafs (Médine)",
      "Diplôme d'enseignement des sciences coraniques",
    ],
    youtubeId: "dQw4w9WgXcQ",
    avatarInitials: "NM",
    avatarTheme: "coranique",
    experience: "10 ans",
    students: 130,
  },
];
