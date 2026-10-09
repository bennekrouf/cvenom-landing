---
title: "Utilisez Claude AI pour gérer vos CVs"
description: "Connectez votre compte cvenom à Claude.ai en 2 minutes via MCP et laissez l'IA générer, traduire et optimiser vos CVs par simple conversation."
date: "2026-04-17"
author: "Cvenom Team"
tags: ["tutoriel", "claude", "mcp", "ia"]
lang: "fr"
status: "published"
---

# Utilisez Claude AI pour gérer vos CVs

Cvenom supporte désormais le **Model Context Protocol (MCP)** — un standard ouvert qui permet aux assistants IA comme Claude d'accéder à vos données et d'agir en votre nom, de manière sécurisée.

Une fois connecté, vous pouvez discuter avec Claude pour gérer vos CVs sans jamais ouvrir le studio.

## Ce que vous pouvez faire

- **Lister vos profils** — voir tous vos profils CV d'un coup d'œil
- **Lire vos données** — demander à Claude de résumer ou relire votre expérience
- **Générer un PDF** — produire un CV soigné dans n'importe quel template et langue
- **Consulter votre solde** — voir votre solde de crédits et l'historique des transactions
- **Traduire votre profil** — créer la version française ou allemande de votre CV (anglais, français et allemand sont pris en charge)
- **Adapter votre CV à une offre** — collez le lien d'une offre d'emploi et obtenez une analyse d'adéquation, un CV optimisé ou un PDF prêt à envoyer
- **Rédiger une lettre de motivation** — à partir de votre profil et de l'offre
- **Générer un portfolio** — un PDF de vos projets à partir de votre profil
- **Importer un CV existant** — collez votre CV en texte et Claude le transforme en profil cvenom

## Comment se connecter (2 minutes)

### 1. Ouvrir les connecteurs Claude.ai

Sur [Claude.ai](https://claude.ai), cliquez sur **Customize** (en haut à droite) → **Connectors** → **Add custom connector**.

### 2. Saisir les informations cvenom MCP

| Champ | Valeur |
|---|---|
| MCP Server URL | `https://gateway.api0.ai/mcp/cvenom-mcp` |
| OAuth Client ID | `cvenom-mcp` |

L'OAuth Client ID se saisit dans **Advanced settings** ; laissez le client secret vide.

> Ne sautez pas le Client ID : sans lui, Claude vous connecte à un espace générique au lieu de cvenom, et vos profils n'apparaîtront pas.

Déjà connecté avec l'ancienne URL `https://gateway.api0.ai/mcp?client=cvenom-mcp` ? Elle continue de fonctionner — rien à changer.

### 3. S'authentifier avec Google

Cliquez sur **Connect**. Une fenêtre de connexion Google s'ouvre — connectez-vous avec le **même compte Google** que celui utilisé sur cvenom. C'est tout.

> Claude n'accède qu'à **votre** compte. Chaque utilisateur s'authentifie indépendamment — vos données ne sont jamais partagées.

## Exemples de conversations

Une fois connecté, essayez de demander à Claude :

> *« Liste mes profils cvenom »*

> *« Génère mon profil john-doe en PDF avec le template executive en français »*

> *« Mon profil n'existe qu'en anglais — peux-tu le traduire en français pour que je puisse générer un CV français ? »*

> *« Mon profil john-doe correspond-il à cette offre ? https://www.linkedin.com/jobs/view/… »*

> *« Adapte mon CV à cette offre et donne-moi le PDF »*

> *« Rédige une lettre de motivation en français pour ce poste, à partir de mon profil »*

> *« Voici mon CV en texte — crée un profil cvenom à partir de celui-ci »*

> *« Quel est mon solde de crédits cvenom ? »*

La génération, l'optimisation et la traduction consomment des crédits cvenom, exactement comme dans le studio.

## Sur mobile aussi

Le connecteur MCP fonctionne sur **Claude.ai mobile** (iOS & Android) de la même façon — connectez-vous une fois et utilisez-le partout.

---

Des questions ? Contactez-nous à [mb@mayorana.ch](mailto:mb@mayorana.ch)
