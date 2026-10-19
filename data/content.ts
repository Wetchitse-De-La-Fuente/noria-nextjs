export const demos = {
  support: {
    heading: ['Les mêmes questions.', 'Chaque jour.'],
    description: 'Votre équipe cherche les bonnes informations et répond à des demandes qui se ressemblent.',
    file: 'Guide de livraison.pdf',
    fileDetail: 'Source interne · 12 pages',
    badge: 'PDF',
    question: '« Quels sont vos délais de livraison à Dakar ? »',
    citation: 'Guide de livraison · Page 4',
    answer: [
      'Voici une réponse prête à être relue :',
      'À Dakar, les commandes sont livrées sous 24 à 48 heures ouvrées après confirmation.',
      'Un message de suivi est envoyé dès que votre commande est en route.',
    ],
  },
  documents: {
    heading: ['Des documents longs.', 'L’essentiel, plus vite.'],
    description:
      'Une information utile se cache parfois au milieu de dizaines de pages. Rendez-la plus accessible.',
    file: 'Contrat de prestation.pdf',
    fileDetail: 'Document d’exemple · 24 pages',
    badge: 'PDF',
    question: '« Quels sont les délais et les obligations à retenir ? »',
    citation: 'Contrat de prestation · Pages 8–10',
    answer: [
      'Voici les points à vérifier dans cet exemple :',
      'Livraison du premier livrable : 30 jours après validation du cadrage. Retours attendus sous 5 jours ouvrés.',
      'Toute modification du périmètre fait l’objet d’un accord écrit. Synthèse à contrôler dans le document original.',
    ],
  },
  operations: {
    heading: ['Des données éparpillées.', 'Une action plus claire.'],
    description:
      'Centralisez les informations répétitives pour préparer le suivi et laisser vos équipes décider.',
    file: 'Suivi des commandes.csv',
    fileDetail: 'Données fictives · 128 lignes',
    badge: 'CSV',
    question: '« Quelles commandes demandent notre attention ? »',
    citation: 'Suivi des commandes · Lignes 14, 32, 67',
    answer: [
      'Voici le suivi préparé à partir de l’exemple :',
      '3 commandes dépassent la date prévue. Les dossiers C-014 et C-032 attendent une confirmation du transporteur.',
      'Le dossier C-067 nécessite une validation interne. Une liste de relance peut être préparée pour votre équipe.',
    ],
  },
} as const;
export type DemoKey = keyof typeof demos;
export const expertiseDetails = {
  strategie: {
    label: 'STRATÉGIE & CONSEIL',
    title: 'Un cap avant les outils.',
    description:
      'Nous vous aidons à décider où l’IA peut être utile et à construire une feuille de route adaptée à vos ressources.',
    interest: 'Stratégie IA',
    blocks: [
      [
        'Observer votre réalité',
        'Échanges avec les équipes, revue des tâches et des outils, repérage des données disponibles.',
      ],
      [
        'Comparer les opportunités',
        'Une sélection de cas d’usage selon leur utilité, leur faisabilité et leurs contraintes.',
      ],
      [
        'Organiser les prochaines étapes',
        'Des priorités, un périmètre de départ et des indicateurs partagés avant d’investir dans une solution.',
      ],
    ],
  },
  solutions: {
    label: 'SOLUTIONS & AUTOMATISATION',
    title: 'Du cas d’usage à l’usage.',
    description:
      'Un accompagnement pour concevoir, tester et intégrer une solution au travail de vos équipes.',
    interest: 'Automatisation',
    blocks: [
      [
        'Prototyper sur un périmètre précis',
        'Un premier exemple fonctionnel pour confronter l’idée à vos documents et à vos processus.',
      ],
      [
        'Relier les bons outils',
        'Des intégrations choisies selon vos besoins, vos accès et vos exigences de confidentialité.',
      ],
      [
        'Observer et améliorer',
        'Des tests avec les utilisateurs, une validation humaine adaptée et un suivi défini ensemble.',
      ],
    ],
  },
  formation: {
    label: 'FORMATION & ADOPTION',
    title: 'L’IA avance avec vos équipes.',
    description:
      'Des ateliers pratiques pour comprendre les possibilités, reconnaître les limites et trouver les bons usages.',
    interest: 'Formation',
    blocks: [
      [
        'Partager les repères',
        'Comprendre ce que font les outils, ce qu’ils ne garantissent pas et quand vérifier les réponses.',
      ],
      [
        'Pratiquer sur vos métiers',
        'Des exercices et des méthodes de travail issus de situations concrètes de votre entreprise.',
      ],
      [
        'Installer les bons réflexes',
        'Documentation, règles d’usage et accompagnement pour continuer à progresser après les ateliers.',
      ],
    ],
  },
} as const;
export type ExpertiseKey = keyof typeof expertiseDetails;
export const privacyDetail = {
  label: 'CONFIDENTIALITÉ',
  title: 'Vos informations, en clair.',
  description: 'Les interactions de cette vitrine fonctionnent dans votre navigateur.',
  blocks: [
    [
      'Démonstrations et simulateur',
      'Les exemples sont fictifs. Ils ne sont pas envoyés à un service d’intelligence artificielle. Les valeurs du simulateur ne sont pas enregistrées.',
    ],
    [
      'Votre brief',
      'Les informations du formulaire restent dans la page pendant votre visite. Seule votre action sur Copier ou Télécharger crée une copie. Aucun message n’est envoyé par ce site.',
    ],
    [
      'Mesure d’audience',
      'Aucun outil publicitaire ou d’analyse d’audience n’est intégré à cette page. Les polices sont hébergées avec le site.',
    ],
  ],
} as const;
