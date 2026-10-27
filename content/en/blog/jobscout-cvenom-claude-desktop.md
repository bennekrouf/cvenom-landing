---
title: "From job search to tailored CV in one Claude Desktop chat"
description: "JobScout finds the jobs. cvenom tailors your CV to the one you pick. All in Claude Desktop."
date: "2026-10-27"
author: "Cvenom Team"
tags: ["tutorial", "claude", "mcp", "jobscout", "job search"]
lang: "en"
status: "published"
---

# From job search to tailored CV in one Claude Desktop chat

Connect **JobScout** and **cvenom** to **Claude Desktop**. Then ask:

> *"Find data engineer jobs in Zurich posted this week and make me a CV for the best one."*

JobScout finds and scores the jobs. cvenom tailors your CV and returns a PDF. Claude never writes the CV itself.

This guide is for Claude Desktop on macOS and Windows. A Codex guide is coming.

## What you need

- [Claude Desktop](https://claude.ai/download)
- A cvenom account with a CV profile ([studio](https://studio.cvenom.com))
- JobScout (step 1)
- A mayorana.ch plan, for AI credits (step 2)

## Step 1: Install JobScout

Download JobScout from [mayorana.ch](https://mayorana.ch/en/apps/jobscout):

- **macOS**: [jobscout-macos.dmg](https://mayorana.ch/downloads/jobscout/latest/jobscout-macos.dmg)
- **Windows**: [jobscout-setup.exe](https://mayorana.ch/downloads/jobscout/latest/jobscout-setup.exe)

Open it and pick your country.

![JobScout's download page on mayorana.ch](/image/blog/jobscout-claude-desktop/01-jobscout-download.png)

## Step 2: Subscribe to a mayorana.ch plan

One plan covers both apps. It adds JobScout searches and AI credits every month. cvenom uses the same credits: a tailored CV costs 20.

Pick a plan on [mayorana.ch/pricing](https://mayorana.ch/pricing?from=cvenom).

> Use the same Google account as on cvenom. That's how cvenom finds your plan.

![The plans on mayorana.ch/pricing](/image/blog/jobscout-claude-desktop/02-mayorana-pricing.png)

You get a licence number by email. In JobScout, click **✦ PRO**, paste it and click **Activate**.

![Activating the licence in JobScout's Pro window](/image/blog/jobscout-claude-desktop/03-jobscout-licence.png)

## Step 3: Connect JobScout

- In JobScout, click **MCP** and copy the Claude Desktop snippet
- In Claude Desktop, open **Settings → Developer → Edit Config**
- Paste it into `claude_desktop_config.json` and save. If the file already has `mcpServers`, add only the `jobscout` entry
- Quit Claude Desktop completely and open it again

![JobScout's MCP window, with the snippet to copy](/image/blog/jobscout-claude-desktop/04-jobscout-mcp-button.png)

![Settings → Developer in Claude Desktop, with jobscout running](/image/blog/jobscout-claude-desktop/05-claude-desktop-developer.png)

JobScout runs on your computer, so it works in Claude Desktop, not on claude.ai.

## Step 4: Connect cvenom

In **Settings → Connectors**, add a custom connector:

| Field | Value |
|---|---|
| MCP Server URL | `https://gateway.api0.ai/mcp/cvenom-mcp` |
| OAuth Client ID | `cvenom-mcp` (under Advanced settings) |

Click **Connect** and sign in with your cvenom Google account. Details in [Use Claude AI to manage your CVs](/en/blog/connect-claude-mcp).

![The cvenom connector in Claude Desktop's Connectors settings](/image/blog/jobscout-claude-desktop/06-claude-desktop-connectors.png)

## Step 5: Set your JobScout profile

JobScout scores jobs against your profile. Start it from your CV:

> *"Read my cvenom profile and use it to set my JobScout profile for Switzerland. Show me the text before saving."*

Nothing is saved until you agree.

## Step 6: Find jobs and get a CV

> *"Search for senior backend engineer jobs in Geneva from the last week, then score the new ones."*

The first time, Claude Desktop asks before using each tool. **Always allow** is fine for the read-only ones.

![Claude Desktop asking to allow a JobScout tool](/image/blog/jobscout-claude-desktop/08-claude-tool-permission.png)

Then pick a job:

> *"Make me a CV for the second one."*

cvenom tailors your CV and returns a download link.

![cvenom's tailored CV, with its download link in the chat](/image/blog/jobscout-claude-desktop/09-claude-cv-generated.png)

![The tailored CV as a PDF](/image/blog/jobscout-claude-desktop/10-cv-pdf.png)

Carry on in the same chat: a cover letter, a fit check, or marking the job as Applied.

## Troubleshooting

- **Claude doesn't see JobScout**: check the path in the config, then quit and reopen Claude Desktop
- **Claude writes the CV itself**: switch on the cvenom connector under **+ → Connectors**
- **Not enough credits**: sign in on mayorana.ch with your cvenom email
- **No profiles in cvenom**: reconnect the connector with the right Google account and the `cvenom-mcp` Client ID

---

Questions? [mb@mayorana.ch](mailto:mb@mayorana.ch)
