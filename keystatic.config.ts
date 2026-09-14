import { config, fields, collection, singleton } from '@keystatic/core';

const bulletsField = fields.array(
  fields.object({ text: fields.text({ label: 'Texte' }) }),
  { label: 'Puces', itemLabel: (props) => props.fields.text.value || 'Puce' }
);

const iconOptions = [
  { label: 'Base de données', value: 'base-de-donnees.png' },
  { label: 'Diagramme circulaire', value: 'diagramme-circulaire.png' },
  { label: 'Conseiller financier', value: 'conseiller-financier.png' },
  { label: 'Analytique', value: 'analytique.png' },
  { label: 'Bouclier', value: 'bouclier.png' },
  { label: 'Codage', value: 'codage.png' },
];

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : { kind: 'github', repo: 'Diego-Agitech/agifid' },
  ui: {
    brand: { name: 'AgiFid — Éditeur du site' },
    navigation: {
      "Page d'accueil": [
        'hero',
        'experts',
        'methodology',
        'services360',
        'offers',
        'itaa',
        'onboarding',
        'faq',
        'contact',
      ],
      Actualités: ['blog'],
    },
  },
  singletons: {
    hero: singleton({
      label: 'Bannière (haut de page)',
      path: 'src/content/hero',
      format: { data: 'json' },
      previewUrl: '/index.html#hero',
      schema: {
        kicker: fields.text({
          label: 'Petit texte au-dessus du titre',
          description: 'Ex : 98 entreprises nous font déjà confiance',
        }),
        titleBefore: fields.text({ label: 'Titre — début', description: 'Ex : Fiduciaire' }),
        titleHighlight: fields.text({ label: 'Titre — mot en surbrillance', description: 'Ex : 100% dédiée' }),
        titleAfter: fields.text({ label: 'Titre — fin', description: 'Ex : aux sociétés sur Odoo' }),
        ctaLabel: fields.text({ label: 'Texte du bouton', description: 'Ex : Parler à un expert' }),
      },
    }),
    methodology: singleton({
      label: 'Méthodologie (section "Pourquoi nous")',
      path: 'src/content/methodology',
      format: { data: 'json' },
      previewUrl: '/index.html#pourquoi',
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre du point' }),
            bullets: bulletsField,
          }),
          { label: 'Points (numérotés automatiquement)', itemLabel: (props) => props.fields.title.value || 'Point' }
        ),
      },
    }),
    services360: singleton({
      label: 'Accompagnement à 360°',
      path: 'src/content/services360',
      format: { data: 'json' },
      previewUrl: '/index.html#accompagnement',
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        items: fields.array(
          fields.object({
            icon: fields.select({ label: 'Icône', options: iconOptions, defaultValue: 'base-de-donnees.png' }),
            title: fields.text({ label: 'Titre du service' }),
            bullets: bulletsField,
          }),
          { label: 'Services', itemLabel: (props) => props.fields.title.value || 'Service' }
        ),
      },
    }),
    offers: singleton({
      label: 'Offres & tarifs',
      path: 'src/content/offers',
      format: { data: 'json' },
      previewUrl: '/index.html#services',
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        subtitle: fields.text({ label: 'Sous-titre' }),
        tiers: fields.array(
          fields.object({
            name: fields.text({ label: 'Nom de la formule' }),
            price: fields.text({ label: 'Prix affiché', description: 'Ex : 3 500 € / an' }),
            features: fields.array(
              fields.object({
                included: fields.checkbox({ label: 'Inclus (coché) ou non-inclus (décoché)', defaultValue: true }),
                text: fields.text({ label: 'Texte' }),
              }),
              { label: 'Caractéristiques', itemLabel: (props) => props.fields.text.value || 'Ligne' }
            ),
          }),
          { label: 'Formules', itemLabel: (props) => props.fields.name.value || 'Formule' }
        ),
      },
    }),
    itaa: singleton({
      label: 'Membre de l\'ITAA',
      path: 'src/content/itaa',
      format: { data: 'json' },
      previewUrl: '/index.html#methodologie',
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        subtitle: fields.text({ label: 'Sous-titre' }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre du point' }),
            text: fields.text({ label: 'Texte', multiline: true }),
          }),
          { label: 'Points (numérotés automatiquement)', itemLabel: (props) => props.fields.title.value || 'Point' }
        ),
      },
    }),
    onboarding: singleton({
      label: "Process d'onboarding",
      path: 'src/content/onboarding',
      format: { data: 'json' },
      previewUrl: '/index.html#onboarding',
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        subtitle: fields.text({ label: 'Sous-titre' }),
        steps: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre de l\'étape' }),
            text: fields.text({ label: 'Texte', multiline: true }),
          }),
          { label: 'Étapes (numérotées automatiquement)', itemLabel: (props) => props.fields.title.value || 'Étape' }
        ),
      },
    }),
    faq: singleton({
      label: 'FAQ (SEO / IA)',
      path: 'src/content/faq',
      format: { data: 'json' },
      previewUrl: '/index.html#faq',
      schema: {
        title: fields.text({ label: 'Titre de la section' }),
        subtitle: fields.text({ label: 'Sous-titre' }),
        items: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({
              label: 'Réponse',
              multiline: true,
              description: 'Reponse directe des la premiere phrase : c\'est ce qui est repris par Google et les IA (ChatGPT, Perplexity...).',
            }),
          }),
          { label: 'Questions', itemLabel: (props) => props.fields.question.value || 'Question' }
        ),
      },
    }),
    contact: singleton({
      label: 'Contact (texte autour du formulaire)',
      path: 'src/content/contact',
      format: { data: 'json' },
      previewUrl: '/index.html#contact',
      schema: {
        titleBefore: fields.text({ label: 'Titre — début', description: 'Ex : Discutons de votre' }),
        titleHighlight: fields.text({ label: 'Titre — mot en surbrillance', description: 'Ex : comptabilité' }),
        trustList: fields.array(
          fields.object({ text: fields.text({ label: 'Texte' }) }),
          { label: 'Liste de confiance (3 puces)', itemLabel: (props) => props.fields.text.value || 'Puce' }
        ),
        directTitle: fields.text({ label: 'Titre "discuter en direct"' }),
        directText: fields.text({ label: 'Texte', multiline: true }),
      },
    }),
  },
  collections: {
    blog: collection({
      label: 'Actualités',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      previewUrl: '/actualites/{slug}.html',
      columns: ['title', 'lang', 'category', 'date', 'published'],
      schema: {
        title: fields.slug({
          name: { label: 'Titre' },
          slug: { label: 'URL (générée depuis le titre)' },
        }),
        date: fields.date({ label: 'Date de publication', defaultValue: { kind: 'today' } }),
        lang: fields.select({
          label: 'Langue',
          options: [
            { label: 'Français', value: 'fr' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'fr',
        }),
        category: fields.text({ label: 'Catégorie', description: 'Ex : Fiscalité, Odoo, Digital & IA' }),
        excerpt: fields.text({
          label: 'Résumé (affiché dans la liste et pour le SEO)',
          multiline: true,
          validation: { length: { max: 300 } },
        }),
        coverImage: fields.image({
          label: 'Image de couverture',
          directory: 'public/assets/img/blog',
          publicPath: 'assets/img/blog/',
        }),
        published: fields.checkbox({
          label: 'Publié (décoché = brouillon, invisible sur le site)',
          defaultValue: true,
        }),
        author: fields.text({ label: 'Auteur', defaultValue: 'AgiFid' }),
        relatedArticles: fields.multiRelationship({
          label: 'Articles liés',
          collection: 'blog',
          description: 'Affichés en bas de l\'article, pour le maillage interne (SEO).',
          validation: { length: { max: 3 } },
        }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),
    experts: collection({
      label: 'Équipe',
      slugField: 'name',
      path: 'src/content/experts/*',
      format: { data: 'json' },
      previewUrl: '/index.html#experts',
      columns: ['displayName', 'role', 'order'],
      schema: {
        displayName: fields.text({
          label: 'Nom affiché sur le site',
          description: 'Ex : Mika',
          validation: { isRequired: true },
        }),
        role: fields.select({
          label: 'Rôle',
          options: [
            { label: 'Expert Comptable ITAA', value: 'Expert Comptable ITAA' },
            { label: 'Expert Odoo', value: 'Expert Odoo' },
          ],
          defaultValue: 'Expert Comptable ITAA',
        }),
        order: fields.integer({
          label: 'Position (1 = premier affiché)',
          defaultValue: 1,
        }),
        bio: fields.text({
          label: 'Bio (page À propos)',
          description: 'Quelques phrases : parcours, spécialité. Laissé vide = non affiché.',
          multiline: true,
        }),
        linkedin: fields.url({
          label: 'Profil LinkedIn (page À propos)',
        }),
        photo: fields.image({
          label: 'Photo',
          description: 'Format portrait recommandé (comme les photos actuelles).',
          directory: 'public/assets/img/experts',
          publicPath: 'assets/img/experts/',
        }),
        name: fields.slug({
          name: {
            label: 'Identifiant technique',
            description: 'Généré automatiquement depuis le nom, ne pas modifier sauf besoin particulier.',
          },
        }),
      },
    }),
  },
});
