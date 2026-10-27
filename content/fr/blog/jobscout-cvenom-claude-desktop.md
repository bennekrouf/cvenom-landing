---
title: "De la recherche d'emploi au CV adapté, dans une seule conversation Claude Desktop"
description: "Connectez JobScout et cvenom à Claude Desktop : Claude trouve les offres qui correspondent à votre profil, puis confie la meilleure à cvenom, qui vous renvoie un CV adapté en PDF."
date: "2026-10-27"
author: "Cvenom Team"
tags: ["tutoriel", "claude", "mcp", "jobscout", "recherche d'emploi"]
lang: "fr"
status: "draft"
---

# De la recherche d'emploi au CV adapté, dans une seule conversation Claude Desktop

Chercher des offres et adapter son CV à chacune, c'est d'habitude deux onglets, beaucoup de copier-coller et un CV réécrit à la main à chaque fois. Avec **JobScout** et **cvenom** connectés tous les deux à **Claude Desktop**, tout tient dans une conversation :

> *« Trouve des postes de data engineer à Zurich publiés cette semaine, note-les par rapport à mon profil et fais-moi un CV pour le meilleur. »*

Claude demande à **JobScout** de chercher sur LinkedIn et les sites d'emploi nationaux, et de noter chaque offre par rapport à votre profil. Il transmet ensuite l'offre choisie à **cvenom**, qui adapte **votre vrai CV** et renvoie un PDF prêt à envoyer. Claude n'écrit jamais le CV lui-même : le contenu vient toujours de votre profil cvenom.

Ce guide concerne **Claude Desktop** (macOS et Windows). Un guide pour Codex suivra, une fois le même parcours vérifié de ce côté.

![Le parcours complet dans Claude Desktop : recherche, notation, puis CV adapté en PDF](/image/blog/jobscout-claude-desktop/00-overview.png)

## Ce qu'il vous faut

- **Claude Desktop**, sur [claude.ai/download](https://claude.ai/download)
- **Un compte cvenom** avec au moins un profil CV ([créez-en un dans le studio](https://studio.cvenom.com))
- **JobScout**, l'application de bureau gratuite qui trouve et note les offres (étape 1)
- **Un abonnement mayorana.ch**, pour les crédits IA mensuels utilisés par JobScout et par cvenom (étape 2)

## Étape 1 : installer JobScout

JobScout est une application de bureau qui collecte les offres d'un pays à la fois (Suisse, Allemagne, France, Royaume-Uni, Singapour et d'autres) et les classe selon votre profil. Elle tourne sur votre ordinateur et lit LinkedIn sans connexion : votre compte ne court aucun risque.

Téléchargez-la depuis [la page JobScout sur mayorana.ch](https://mayorana.ch/fr/apps/jobscout) :

- **macOS** (Apple Silicon et Intel) : ouvrez [jobscout-macos.dmg](https://mayorana.ch/downloads/jobscout/latest/jobscout-macos.dmg) et glissez JobScout dans Applications
- **Windows** : lancez [jobscout-setup.exe](https://mayorana.ch/downloads/jobscout/latest/jobscout-setup.exe)

Ouvrez JobScout une première fois et choisissez votre pays avec les drapeaux en haut de la barre latérale.

![La page de téléchargement de JobScout sur mayorana.ch](/image/blog/jobscout-claude-desktop/01-jobscout-download.png)

## Étape 2 : s'abonner à une offre mayorana.ch

Un seul abonnement mayorana.ch couvre les deux applications :

| Offre | Prix | Crédits IA par mois | Recherches JobScout par mois | CVs adaptés par mois |
|---|---|---|---|---|
| Basic | 9 € / mois | 500 | 50 | jusqu'à 25 |
| Pro | 19 € / mois | 2 000 | 500 | jusqu'à 100 |
| Max | 49 € / mois | 4 000 | 1 000 | jusqu'à 200 |

La version gratuite de JobScout fait 10 recherches par mois.

- **JobScout** a plus de recherches par mois
- **Des crédits IA** chaque mois, utilisés par JobScout pour noter les offres **et par cvenom** pour adapter vos CVs, rédiger vos lettres de motivation et traduire vos profils. Un CV adapté coûte 20 crédits.

Choisissez votre offre sur [mayorana.ch/pricing](https://mayorana.ch/pricing?from=cvenom).

> Connectez-vous sur mayorana.ch avec **le même compte Google que votre compte cvenom**. C'est ainsi que cvenom retrouve votre abonnement : ses crédits sont utilisés en premier, puis votre propre solde cvenom.

![Les offres sur mayorana.ch/pricing](/image/blog/jobscout-claude-desktop/02-mayorana-pricing.png)

Après le paiement, vous recevez un **numéro de licence** par e-mail. Dans JobScout, cliquez sur **✦ PRO** en haut de la fenêtre, collez-le et cliquez sur **Activate**. JobScout affiche alors les crédits IA restants pour le mois.

![Activation de la licence dans la fenêtre Pro de JobScout](/image/blog/jobscout-claude-desktop/03-jobscout-licence.png)

Vous pouvez vérifier que cvenom voit votre abonnement sur [la page crédits du studio](https://studio.cvenom.com/credits), ou plus tard en demandant à Claude *« Quel est mon solde de crédits cvenom ? »*.

## Étape 3 : connecter JobScout à Claude Desktop

JobScout tourne sur votre ordinateur : Claude Desktop le lance comme serveur MCP local. JobScout prépare la configuration pour vous :

- Dans JobScout, cliquez sur **MCP** dans la barre en haut de la fenêtre et **copiez** le bloc Claude Desktop
- Dans Claude Desktop, ouvrez **Settings → Developer → Edit Config**
- Collez le bloc dans `claude_desktop_config.json` et enregistrez. Si le fichier contient déjà une section `mcpServers`, ajoutez-y seulement l'entrée `jobscout`
- **Quittez complètement Claude Desktop** puis rouvrez-le

Sur macOS, le bloc ressemble à ceci :

```json
{
  "mcpServers": {
    "jobscout": {
      "command": "/Applications/JobScout.app/Contents/MacOS/jobscout",
      "args": ["mcp"]
    }
  }
}
```

![La fenêtre MCP de JobScout, avec le bloc à copier](/image/blog/jobscout-claude-desktop/04-jobscout-mcp-button.png)

![Settings → Developer dans Claude Desktop, avec jobscout actif](/image/blog/jobscout-claude-desktop/05-claude-desktop-developer.png)

> JobScout fonctionne uniquement dans **Claude Desktop**, pas dans Claude sur le navigateur : claude.ai ne peut joindre que des serveurs sur internet, et JobScout tourne sur votre machine. La fenêtre JobScout et Claude partagent les mêmes offres : ce que Claude modifie apparaît dans la fenêtre en quelques secondes.

## Étape 4 : connecter cvenom à Claude Desktop

cvenom est un serveur MCP en ligne, qui s'ajoute comme connecteur :

- Dans Claude Desktop, ouvrez **Settings → Connectors**, cliquez sur **+ Add** puis **Add custom connector**
- Saisissez l'URL du serveur et, sous **Advanced settings**, l'OAuth Client ID :

| Champ | Valeur |
|---|---|
| MCP Server URL | `https://gateway.api0.ai/mcp/cvenom-mcp` |
| OAuth Client ID | `cvenom-mcp` |

- Cliquez sur **Connect** et connectez-vous avec le compte Google que vous utilisez sur cvenom

Tous les détails sont dans [Utilisez Claude AI pour gérer vos CVs](/fr/blog/connect-claude-mcp). Déjà connecté sur claude.ai ? Le connecteur est alors déjà présent dans Claude Desktop.

![Le connecteur cvenom dans les réglages Connectors de Claude Desktop](/image/blog/jobscout-claude-desktop/06-claude-desktop-connectors.png)

Dans une nouvelle conversation, ouvrez le menu des outils sous la zone de message : **jobscout** et **cvenom** doivent y figurer, activés.

## Étape 5 : donner votre profil à JobScout

JobScout note les offres par rapport à un profil : qui vous êtes, ce que vous cherchez, où. Le plus rapide est de partir de votre CV :

> *« Lis mon profil cvenom et utilise-le pour définir mon profil JobScout pour la Suisse. Montre-moi le texte avant d'enregistrer. »*

Claude lit votre CV via cvenom, rédige un profil et vous le montre. Rien n'est enregistré sans votre accord.

## Étape 6 : trouver des offres et obtenir un CV adapté

Demandez maintenant des offres :

> *« Cherche des postes de senior backend engineer à Genève publiés la semaine dernière, puis note les nouveaux. »*

JobScout cherche sur LinkedIn, jobs.ch et jobup.ch, garde les nouvelles offres et attribue à chacune une note, avec un verdict en une ligne, des points forts et des lacunes.

![Claude liste les meilleures correspondances avec leur note](/image/blog/jobscout-claude-desktop/07-claude-search-score.png)

La première fois que Claude utilise un outil, Claude Desktop vous demande l'autorisation. Choisissez **Allow always** pour les outils en lecture seule (lister et lire les offres, lire votre CV), et gardez la confirmation pour les autres si vous préférez.

![Claude Desktop demande l'autorisation d'utiliser un outil JobScout](/image/blog/jobscout-claude-desktop/08-claude-tool-permission.png)

Choisissez une offre et demandez le CV :

> *« Fais-moi un CV pour la deuxième. »*

Claude demande à JobScout le lien et la description complète de l'offre, puis les transmet à cvenom avec votre profil. cvenom adapte votre CV à l'offre et renvoie un **lien de téléchargement** vers le PDF.

![Le CV adapté par cvenom, avec son lien de téléchargement dans la conversation](/image/blog/jobscout-claude-desktop/09-claude-cv-generated.png)

![Le CV adapté en PDF](/image/blog/jobscout-claude-desktop/10-cv-pdf.png)

Et continuez dans la même conversation :

> *« Rédige une lettre de motivation en français pour cette offre. »*

> *« Est-ce que je corresponds vraiment à ce poste ? Liste les lacunes. »*

> *« Marque-la comme Applied dans JobScout. »*

> *« Enregistre cette recherche comme veille. »*

Les veilles tournent selon un calendrier dans la fenêtre JobScout : laissez-la ouverte.

## Ce que ça coûte

| Action | Consomme |
|---|---|
| Une recherche (depuis Claude ou la fenêtre) | 1 de vos recherches JobScout du mois |
| La notation des offres | Des crédits IA de votre abonnement, par offre notée |
| Un CV adapté (PDF) | 20 crédits cvenom |
| Une lettre de motivation, une analyse d'adéquation, une traduction | Des crédits cvenom, comme dans le studio |

Notez les offres qui vous intéressent plutôt que toutes, et demandez votre solde à Claude quand vous voulez : *« Combien de crédits cvenom me reste-t-il ? »*

## En cas de problème

- **Claude ne voit pas JobScout** : comparez le chemin dans `claude_desktop_config.json` avec celui de la fenêtre MCP de JobScout, puis quittez complètement Claude Desktop (pas seulement la fenêtre) et rouvrez-le
- **Claude écrit un CV lui-même au lieu d'utiliser cvenom** : le connecteur cvenom n'est pas activé dans cette conversation. Activez-le dans le menu des outils sous la zone de message
- **cvenom indique que vos crédits sont insuffisants** : connectez-vous sur mayorana.ch avec la même adresse e-mail que votre compte cvenom, pour que les crédits de l'abonnement y comptent
- **cvenom ne liste aucun profil** : vous vous êtes connecté au connecteur avec un autre compte Google, ou sans le Client ID `cvenom-mcp`. Supprimez le connecteur et ajoutez-le à nouveau

---

Des questions ? Écrivez-nous à [mb@mayorana.ch](mailto:mb@mayorana.ch)
