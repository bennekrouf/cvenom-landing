---
title: "Use Claude AI to manage your CVs"
description: "Connect your cvenom account to Claude.ai in 2 minutes using MCP and let AI generate, translate and optimize your CVs through natural conversation."
date: "2026-04-17"
author: "Cvenom Team"
tags: ["tutorial", "claude", "mcp", "ai"]
lang: "en"
status: "published"
---

# Use Claude AI to manage your CVs

Cvenom now supports the **Model Context Protocol (MCP)** — an open standard that lets AI assistants like Claude securely access your data and take actions on your behalf.

Once connected, you can chat with Claude to manage your CVs without ever opening the studio.

## What you can do

- **List your profiles** — see all your CV profiles at a glance
- **Read your CV data** — ask Claude to summarize or review your experience
- **Generate a PDF** — produce a polished PDF in any template and language
- **Check your balance** — view your credit balance and transaction history
- **Translate your profile** — create the French or German version of your CV (English, French and German are supported)
- **Tailor your CV to a job** — paste a job posting link and get a fit analysis, an optimized CV, or a ready-to-send PDF
- **Write a cover letter** — from your profile and the job posting
- **Generate a portfolio** — a project portfolio PDF from your profile
- **Import an existing CV** — paste your CV as text and Claude turns it into a cvenom profile

## How to connect (2 minutes)

### 1. Open Claude.ai connectors

In [Claude.ai](https://claude.ai), click **Customize** (top-right) → **Connectors** → **Add custom connector**.

### 2. Enter the cvenom MCP details

| Field | Value |
|---|---|
| MCP Server URL | `https://gateway.api0.ai/mcp/cvenom-mcp` |
| OAuth Client ID | `cvenom-mcp` |

The OAuth Client ID goes under **Advanced settings**; leave the client secret empty.

> Don't skip the Client ID: without it, Claude signs you in to a generic workspace instead of cvenom, and your profiles won't show up.

Already connected with the older URL `https://gateway.api0.ai/mcp?client=cvenom-mcp`? It keeps working — no need to change anything.

### 3. Authenticate with Google

Click **Connect**. A Google sign-in window will open — sign in with the **same Google account** you use on cvenom. That's it.

> Claude only has access to **your** account. Each user authenticates independently — your data is never shared.

## Example conversations

Once connected, try asking Claude:

> *"List my cvenom profiles"*

> *"Generate my profile john-doe as a PDF using the executive template in French"*

> *"My profile only has an English version — can you translate it to French so I can generate a French CV?"*

> *"How well does my profile john-doe fit this job? https://www.linkedin.com/jobs/view/…"*

> *"Tailor my CV to this posting and give me the PDF"*

> *"Write a cover letter in French for this job, based on my profile"*

> *"Here is my CV as text — create a cvenom profile from it"*

> *"What is my current cvenom credit balance?"*

Generating, optimizing and translating use cvenom credits, exactly as in the studio.

## On mobile too

The MCP connector works on **Claude.ai mobile** (iOS & Android) the same way — connect once and use it anywhere.

---

Questions? Reach us at [mb@mayorana.ch](mailto:mb@mayorana.ch)
