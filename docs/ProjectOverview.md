# Indicateur d'Utilisation de l'IA

Un outil interactif permettant aux créateurs (artistes, producteurs, auteurs) d'évaluer et de communiquer le niveau d'utilisation de l'intelligence artificielle dans leurs œuvres musicales et textuelles.

## 📋 Table des matières

- [Vision du projet](#vision-du-projet)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Architecture technique](#architecture-technique)
- [Structure des données](#structure-des-données)
- [Guide d'installation](#guide-dinstallation)
- [Détails d'implémentation](#détails-dimplémentation)
- [Déploiement](#déploiement)
- [Contributions et évolutions](#contributions-et-évolutions)

## 🔭 Vision du projet

### Contexte

Avec l'essor de l'IA dans la création artistique, il devient important pour les créateurs, les plateformes et le public de comprendre clairement le degré d'implication de l'IA dans le processus créatif. Ce projet vise à établir un standard transparent pour communiquer cette information.

### Objectifs

- **Transparence** : Permettre aux créateurs d'être transparents sur leurs méthodes de création
- **Standardisation** : Établir un système de catégorisation cohérent et compréhensible
- **Valorisation** : Valoriser tous les types de création, de l'artisanat pur à l'utilisation innovante de l'IA
- **Facilité d'utilisation** : Offrir une interface simple pour déterminer sa catégorie et la communiquer

### Public cible

- Artistes et musiciens
- Auteurs et écrivains
- Producteurs de contenus
- Plateformes de diffusion
- Consommateurs et amateurs d'art

## 🎯 Fonctionnalités principales

1. **Évaluation interactive** : Assistant étape par étape guidant l'utilisateur pour déterminer sa catégorie
2. **Double classification** : Évaluation distincte pour la musique et les textes
3. **Système à 5 niveaux** : Classification claire allant de la production 100% IA à la création artisanale
4. **Génération de badge** : Création d'un badge visuel pour afficher son indicateur
5. **Code exportable** : Génération de code HTML et Markdown à intégrer sur différentes plateformes

### Système de classification

#### Pour la musique

- **Catégorie 1** : Production exclusivement avec l'IA, sans intervention humaine
- **Catégorie 2** : Production exclusivement avec l'IA, mais avec interventions humaines
- **Catégorie 3** : Production avec assistance significative de l'IA ou du numérique
- **Catégorie 4** : Production humaine avec assistance numérique légère
- **Catégorie 5** : Production purement artisanale

#### Pour les textes

- **Catégorie 1** : Texte généré automatiquement par l'IA sans intervention
- **Catégorie 2** : Texte généré par l'IA avec raffinage humain
- **Catégorie 3** : Co-création entre l'humain et l'IA
- **Catégorie 4** : Texte principalement humain avec outils d'assistance
- **Catégorie 5** : Texte exclusivement écrit sans outils automatiques

## 🔧 Architecture technique

### Stack technologique

- **Frontend** : Next.js 14 avec App Router, React, TypeScript
- **UI/Design** : Tailwind CSS, HeadlessUI
- **État** : React Context API
- **Déploiement** : Vercel
- **Versionning** : GitHub

### Structure de l'application

L'application suit une architecture de type "wizard" (assistant par étapes) :

```
src/
├── app/                    # Structure App Router de Next.js
├── components/             # Composants réutilisables
├── contexts/               # Gestion de l'état global
├── steps/                  # Composants pour chaque étape du wizard
├── types/                  # Définitions TypeScript
```

### Workflow utilisateur

1. Page d'introduction expliquant le concept
2. Évaluation du processus de création musicale
3. Évaluation du processus de création textuelle
4. Affichage du résultat et exportation du badge

## 📊 Structure des données

### Types principaux

```typescript
// Catégories possibles
type Category = 1 | 2 | 3 | 4 | 5 | null;

// Structure du contexte global
interface WizardContextType {
  step: number;
  setStep: (step: number) => void;
  musicCategory: Category;
  setMusicCategory: (category: Category) => void;
  textCategory: Category;
  setTextCategory: (category: Category) => void;
}

// Structure d'une option de catégorie
interface CategoryOption {
  id: Category;
  title: string;
  description: string;
}
```

### Gestion de l'état

L'application utilise React Context pour gérer l'état global, avec notamment :

- Suivi de l'étape actuelle
- Stockage des catégories sélectionnées pour la musique et le texte
- Accès à ces données depuis n'importe quel composant

## 💻 Guide d'installation

### Prérequis

- Node.js 18+ et npm/yarn
- Compte GitHub pour le versionning
- Compte Vercel pour le déploiement (optionnel)

### Installation locale

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/votre-username/ia-indicator.git
   cd ia-indicator
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Accéder à l'application**  
   Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur

## 🔍 Détails d'implémentation

### Composants clés

- **WizardContext** : Gère l'état global de l'application
- **ProgressBar** : Affiche la progression dans l'assistant
- **RadioGroup** : Permet la sélection des catégories avec descriptions
- **ResultBadge** : Génère la représentation visuelle de l'indicateur
- **Steps** : Composants pour chaque étape de l'assistant

### Personnalisation des styles

Le projet utilise Tailwind CSS pour le styling, avec quelques extensions personnalisées définies dans `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      'brand-blue': '#3b82f6',
      // Autres couleurs personnalisées
    },
  },
}
```

## 🚀 Déploiement

### Déploiement sur Vercel

1. Créer un compte sur [Vercel](https://vercel.com/)
2. Connecter votre compte GitHub
3. Importer le projet depuis votre dépôt
4. Configurer les variables d'environnement si nécessaire
5. Déployer l'application

### Considérations SEO

- Utiliser les métadonnées dans le fichier `layout.tsx` pour optimiser le référencement
- Ajouter une description pertinente et des mots-clés adaptés
- Créer un sitemap et un fichier robots.txt

## 🔄 Contributions et évolutions

### Pistes d'amélioration futures

1. **Internationalisation** : Support multilingue (français/anglais)
2. **Mode questionnaire détaillé** : Questions plus précises pour déterminer la catégorie
3. **Historique** : Sauvegarder les résultats pour les comparer
4. **Analyses** : Collecter des statistiques anonymes sur l'utilisation de l'IA
5. **API** : Offrir une API pour intégrer l'indicateur à d'autres plateformes

### Gouvernance du projet

Ce projet est inspiré du concept de "Creative Commons Chooser" mais adapté à l'IA dans la création artistique. Il vise à établir un standard ouvert et transparent pour la communication sur l'utilisation de l'IA dans l'art.

### Licence

Ce projet est distribué sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 📚 Références

- [Guide complet des catégories](./docs/categories.md)
- [Exemples d'utilisation](./docs/examples.md)
- [FAQ](./docs/faq.md)

## 📞 Contact

Pour toute question concernant le projet, contactez [nom du responsable] à [email].
