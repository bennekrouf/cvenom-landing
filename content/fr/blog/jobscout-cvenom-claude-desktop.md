---
title: "De la recherche d'emploi au CV adapté, dans une seule conversation Claude Desktop"
description: "JobScout trouve les offres. cvenom adapte votre CV à celle que vous choisissez. Le tout dans Claude Desktop."
date: "2026-10-27"
author: "Cvenom Team"
tags: ["tutoriel", "claude", "mcp", "jobscout", "recherche d'emploi"]
lang: "fr"
status: "published"
---

# De la recherche d'emploi au CV adapté, dans une seule conversation Claude Desktop

Connectez **JobScout** et **cvenom** à **Claude Desktop**. Puis demandez :

> *« Trouve des postes de data engineer à Zurich publiés cette semaine et fais-moi un CV pour le meilleur. »*

JobScout trouve et note les offres. cvenom adapte votre CV et renvoie un PDF. Claude n'écrit jamais le CV lui-même.

Ce guide concerne Claude Desktop sur macOS et Windows. Un guide Codex suivra.

## Ce qu'il vous faut

- [Claude Desktop](https://claude.ai/download)
- Un compte cvenom avec un profil CV ([studio](https://studio.cvenom.com))
- JobScout (étape 1)
- Un abonnement mayorana.ch, pour les crédits IA (étape 2)

## Étape 1 : installer JobScout

Téléchargez JobScout sur [mayorana.ch](https://mayorana.ch/fr/apps/jobscout) :

- **macOS** : [jobscout-macos.dmg](https://mayorana.ch/downloads/jobscout/latest/jobscout-macos.dmg)
- **Windows** : [jobscout-setup.exe](https://mayorana.ch/downloads/jobscout/latest/jobscout-setup.exe)

Ouvrez-le et choisissez votre pays.

![La page de téléchargement de JobScout sur mayorana.ch](/image/blog/jobscout-claude-desktop/01-jobscout-download.png)

## Étape 2 : s'abonner à une offre mayorana.ch

Un seul abonnement couvre les deux applications. Il ajoute des recherches JobScout et des crédits IA chaque mois. cvenom utilise les mêmes crédits : un CV adapté en coûte 20.

Choisissez votre offre sur [mayorana.ch/pricing](https://mayorana.ch/pricing?from=cvenom).

> Utilisez le même compte Google que sur cvenom. C'est ainsi que cvenom retrouve votre abonnement.

![Les offres sur mayorana.ch/pricing](/image/blog/jobscout-claude-desktop/02-mayorana-pricing.png)

Vous recevez un numéro de licence par e-mail. Dans JobScout, cliquez sur **✦ PRO**, collez-le et cliquez sur **Activate**.

![Activation de la licence dans la fenêtre Pro de JobScout](/image/blog/jobscout-claude-desktop/03-jobscout-licence.png)

## Étape 3 : connecter JobScout

- Dans JobScout, cliquez sur **MCP** et copiez le bloc Claude Desktop
- Dans Claude Desktop, ouvrez **Settings → Developer → Edit Config**
- Collez le bloc dans `claude_desktop_config.json` et enregistrez. Si le fichier contient déjà `mcpServers`, ajoutez seulement l'entrée `jobscout`
- Quittez complètement Claude Desktop puis rouvrez-le

![La fenêtre MCP de JobScout, avec le bloc à copier](/image/blog/jobscout-claude-desktop/04-jobscout-mcp-button.png)

![Settings → Developer dans Claude Desktop, avec jobscout actif](/image/blog/jobscout-claude-desktop/05-claude-desktop-developer.png)

JobScout tourne sur votre ordinateur : il fonctionne dans Claude Desktop, pas sur claude.ai.

## Étape 4 : connecter cvenom

Dans **Settings → Connectors**, ajoutez un connecteur personnalisé :

| Champ | Valeur |
|---|---|
| MCP Server URL | `https://gateway.api0.ai/mcp/cvenom-mcp` |
| OAuth Client ID | `cvenom-mcp` (sous Advanced settings) |

Cliquez sur **Connect** et connectez-vous avec le compte Google de cvenom. Détails dans [Utilisez Claude AI pour gérer vos CVs](/fr/blog/connect-claude-mcp).

![Le connecteur cvenom dans les réglages Connectors de Claude Desktop](/image/blog/jobscout-claude-desktop/06-claude-desktop-connectors.png)

## Étape 5 : définir votre profil JobScout

JobScout note les offres selon votre profil. Partez de votre CV :

> *« Lis mon profil cvenom et utilise-le pour définir mon profil JobScout pour la Suisse. Montre-moi le texte avant d'enregistrer. »*

Rien n'est enregistré sans votre accord.

## Étape 6 : trouver des offres et obtenir un CV

> *« Cherche des postes de senior backend engineer à Genève publiés la semaine dernière, puis note les nouveaux. »*

La première fois, Claude Desktop demande l'autorisation pour chaque outil. **Always allow** convient aux outils en lecture seule.

![Claude Desktop demande l'autorisation d'utiliser un outil JobScout](/image/blog/jobscout-claude-desktop/08-claude-tool-permission.png)

Puis choisissez une offre :

> *« Fais-moi un CV pour la deuxième. »*

cvenom adapte votre CV et renvoie un lien de téléchargement.

![Le CV adapté par cvenom, avec son lien de téléchargement dans la conversation](/image/blog/jobscout-claude-desktop/09-claude-cv-generated.png)

![Le CV adapté en PDF](/image/blog/jobscout-claude-desktop/10-cv-pdf.png)

Continuez dans la même conversation : lettre de motivation, analyse d'adéquation, ou statut Applied dans JobScout.

## En cas de problème

- **Claude ne voit pas JobScout** : vérifiez le chemin dans la config, puis quittez et rouvrez Claude Desktop
- **Claude écrit le CV lui-même** : activez le connecteur cvenom via **+ → Connectors**
- **Crédits insuffisants** : connectez-vous sur mayorana.ch avec l'e-mail de votre compte cvenom
- **Aucun profil dans cvenom** : reconnectez le connecteur avec le bon compte Google et le Client ID `cvenom-mcp`

---

Des questions ? Écrivez-nous à [mb@mayorana.ch](mailto:mb@mayorana.ch)
