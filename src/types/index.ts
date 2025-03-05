export type Category = 1 | 2 | 3 | 4 | 5 | null;

export interface WizardContextType {
  step: number;
  setStep: (step: number) => void;
  musicCategory: Category;
  setMusicCategory: (category: Category) => void;
  textCategory: Category;
  setTextCategory: (category: Category) => void;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

export interface ResultProps {
  onBack?: () => void;
}

export interface CategoryOption {
  id: Category;
  title: string;
  description: string;
}

export const musicCategoryOptions: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description: "Génération IA sans intervention humaine.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description: "Génération IA avec direction humaine (prompts, corrections).",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description: "Mélange équilibré entre créativité humaine et IA.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description: "Production humaine avec outils numériques basiques.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description: "Production humaine sans IA ni automatisation.",
  },
];

export const textCategoryOptions: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description: "Texte généré par IA sans intervention.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description: "Texte IA avec raffinement humain intensif.",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description: "Rédaction mixte humain-IA.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description: "Texte humain avec outils d'aide basiques.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description: "Texte 100% humain sans assistance automatique.",
  },
];

export const musicCategoryOptionsDetailed: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description:
      "L'œuvre est générée par une IA sans aucune implication manuelle directe dans le choix ou la modification du contenu final.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description:
      "L'œuvre finale est toujours à 100% générée par l'IA, mais avec une forte intervention humaine sur le plan de la direction créative, du prompting, des corrections et du raffinage.",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description:
      "Un mélange entre la créativité et l'interprétation humaine, et l'apport de l'IA ou d'autres outils numériques, de manière significative dans le processus.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description:
      "L'œuvre est principalement produite, jouée ou composée par un être humain, mais emploie des outils numériques pour des améliorations ou des corrections non substantielles.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description:
      "L'œuvre est quasi entièrement le fruit d'une interprétation et d'une expertise humaines, avec un usage très limité ou inexistant d'automatismes IA ou numériques.",
  },
];

export const textCategoryOptionsDetailed: CategoryOption[] = [
  {
    id: 1,
    title: "IA seule",
    description:
      "Le texte est généré automatiquement par une IA sans prompt réfléchi ou avec un prompt unique accepté tel quel.",
  },
  {
    id: 2,
    title: "IA dirigée",
    description:
      "Le texte est principalement généré par l'IA, mais avec un raffinage intensif humain sur le plan de la structure, du style et du contenu.",
  },
  {
    id: 3,
    title: "Collaboration IA",
    description:
      "L'auteur rédige (en partie) ou conçoit la structure, les idées, puis s'appuie sur l'IA pour compléter ou optimiser des segments de texte de manière significative.",
  },
  {
    id: 4,
    title: "Assistance numérique",
    description:
      "Le texte est principalement écrit par l'auteur, mais utilise des outils IA ou d'autres logiciels qui affinent le résultat, sans changer fondamentalement les idées ni la structure.",
  },
  {
    id: 5,
    title: "Production artisanale",
    description:
      "Le texte est exclusivement écrit par un être humain sans avoir recours à des outils automatiques pour la correction, la suggestion, ou la reformulation.",
  },
];
