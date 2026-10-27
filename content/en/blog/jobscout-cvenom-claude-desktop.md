---
title: "From job search to tailored CV in one Claude Desktop chat"
description: "Connect JobScout and cvenom to Claude Desktop: Claude finds the jobs that match your profile, then hands the best one to cvenom, which returns a CV tailored to it as a PDF."
date: "2026-10-27"
author: "Cvenom Team"
tags: ["tutorial", "claude", "mcp", "jobscout", "job search"]
lang: "en"
status: "draft"
---

# From job search to tailored CV in one Claude Desktop chat

Searching for jobs and adapting your CV to each one usually means two tabs, a lot of copy-paste and a CV you rewrite by hand every time. With **JobScout** and **cvenom** both connected to **Claude Desktop**, it becomes one conversation:

> *"Find data engineer jobs in Zurich posted this week, score them against my profile, and make me a CV for the best one."*

Claude asks **JobScout** to search LinkedIn and the national job boards and to score each post against your profile. It then passes the job you pick to **cvenom**, which tailors **your real CV** to it and returns a PDF ready to send. Claude never writes the CV itself: the content always comes from your cvenom profile.

This guide is for **Claude Desktop** (macOS and Windows). A guide for Codex is coming once we've checked the same flow there.

![The whole flow in Claude Desktop: search, score, then a tailored CV as a PDF](/image/blog/jobscout-claude-desktop/00-overview.png)

## What you need

- **Claude Desktop**, from [claude.ai/download](https://claude.ai/download)
- **A cvenom account** with at least one CV profile ([create one in the studio](https://studio.cvenom.com))
- **JobScout**, the free desktop app that finds and scores the jobs (step 1)
- **A mayorana.ch plan**, for the monthly AI credits that JobScout and cvenom both use (step 2)

## Step 1: Install JobScout

JobScout is a desktop app that collects job posts for one country at a time (Switzerland, Germany, France, the UK, Singapore and more) and ranks them against your profile. It runs on your computer and reads LinkedIn without logging in, so your account is never at risk.

Download it from [JobScout's page on mayorana.ch](https://mayorana.ch/en/apps/jobscout):

- **macOS** (Apple Silicon and Intel): open [jobscout-macos.dmg](https://mayorana.ch/downloads/jobscout/latest/jobscout-macos.dmg) and drag JobScout to Applications
- **Windows**: run [jobscout-setup.exe](https://mayorana.ch/downloads/jobscout/latest/jobscout-setup.exe)

Open JobScout once and pick your country with the flags at the top of the sidebar.

![JobScout's download page on mayorana.ch](/image/blog/jobscout-claude-desktop/01-jobscout-download.png)

## Step 2: Subscribe to a mayorana.ch plan

One mayorana.ch plan covers both apps:

| Plan | Price | AI credits a month | JobScout searches a month | Tailored CVs a month |
|---|---|---|---|---|
| Basic | €9 / month | 500 | 50 | up to 25 |
| Pro | €19 / month | 2,000 | 500 | up to 100 |
| Max | €49 / month | 4,000 | 1,000 | up to 200 |

The free version of JobScout runs 10 searches a month.

- **JobScout** gets more searches a month
- **AI credits** every month, spent by JobScout to score jobs **and by cvenom** to tailor CVs, write cover letters and translate profiles. A tailored CV costs 20 credits.

Pick a plan on [mayorana.ch/pricing](https://mayorana.ch/pricing?from=cvenom).

> Sign in on mayorana.ch with the **same Google account as your cvenom account**. That's how cvenom finds your plan: its credits are spent first, then your own cvenom balance.

![The plans on mayorana.ch/pricing](/image/blog/jobscout-claude-desktop/02-mayorana-pricing.png)

After checkout you receive a **licence number** by email. In JobScout, click **✦ PRO** at the top of the window, paste it and click **Activate**. JobScout then shows the AI credits left this month.

![Activating the licence in JobScout's Pro window](/image/blog/jobscout-claude-desktop/03-jobscout-licence.png)

You can check that cvenom sees the plan in the [studio's credits page](https://studio.cvenom.com/credits), or later by asking Claude *"What is my cvenom credit balance?"*.

## Step 3: Connect JobScout to Claude Desktop

JobScout runs on your computer, so Claude Desktop starts it as a local MCP server. JobScout writes the configuration for you:

- In JobScout, click **MCP** in the bar at the top of the window and **Copy** the Claude Desktop snippet
- In Claude Desktop, open **Settings → Developer → Edit Config**
- Paste the snippet into `claude_desktop_config.json` and save. If the file already has an `mcpServers` section, add only the `jobscout` entry to it
- **Quit Claude Desktop completely** and open it again

On macOS, the snippet looks like this:

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

![JobScout's MCP window, with the snippet to copy](/image/blog/jobscout-claude-desktop/04-jobscout-mcp-button.png)

![Settings → Developer in Claude Desktop, with jobscout running](/image/blog/jobscout-claude-desktop/05-claude-desktop-developer.png)

> JobScout only works in **Claude Desktop**, not in Claude in the browser: claude.ai can only reach servers on the internet, and JobScout runs on your machine. The JobScout window and Claude share the same jobs, so whatever Claude changes shows up in the window within a couple of seconds.

## Step 4: Connect cvenom to Claude Desktop

cvenom is an online MCP server, added as a connector:

- In Claude Desktop, open **Settings → Connectors**, click **+ Add** and choose **Add custom connector**
- Enter the server URL and, under **Advanced settings**, the OAuth Client ID:

| Field | Value |
|---|---|
| MCP Server URL | `https://gateway.api0.ai/mcp/cvenom-mcp` |
| OAuth Client ID | `cvenom-mcp` |

- Click **Connect** and sign in with the Google account you use on cvenom

The details are in [Use Claude AI to manage your CVs](/en/blog/connect-claude-mcp). Already connected on claude.ai? Then the connector is already there in Claude Desktop.

![The cvenom connector in Claude Desktop's Connectors settings](/image/blog/jobscout-claude-desktop/06-claude-desktop-connectors.png)

In a new chat, click **+** in the message box, then **Connectors**: both **jobscout** and **cvenom** should be listed and switched on.

## Step 5: Give JobScout your profile

JobScout scores jobs against a profile: who you are, what you're looking for, where. The quickest way to write it is to start from your CV:

> *"Read my cvenom profile and use it to set my JobScout profile for Switzerland. Show me the text before saving."*

Claude reads your CV through cvenom, drafts a profile and shows it to you. Nothing is saved until you agree.

## Step 6: Find jobs and get a tailored CV

Now ask for jobs:

> *"Search for senior backend engineer jobs in Geneva posted in the last week, then score the new ones."*

JobScout searches LinkedIn, jobs.ch and jobup.ch, keeps the new posts and gives each one a score with a one-line verdict, strengths and gaps.

![Claude listing the best matches with their scores](/image/blog/jobscout-claude-desktop/07-claude-search-score.png)

The first time Claude uses a tool, Claude Desktop asks for your permission. Choose **Always allow** for the read-only ones (listing and reading jobs, reading your CV) and keep the confirmation for the rest if you prefer.

![Claude Desktop asking to allow a JobScout tool](/image/blog/jobscout-claude-desktop/08-claude-tool-permission.png)

Pick a job and ask for the CV:

> *"Make me a CV for the second one."*

Claude asks JobScout for the job's link and full description, then hands them to cvenom with your profile. cvenom tailors your CV to the post and returns a **download link** to the PDF.

![cvenom's tailored CV, with its download link in the chat](/image/blog/jobscout-claude-desktop/09-claude-cv-generated.png)

![The tailored CV as a PDF](/image/blog/jobscout-claude-desktop/10-cv-pdf.png)

From there, carry on in the same chat:

> *"Write a cover letter in French for this job."*

> *"How well do I really fit this one? List the gaps."*

> *"Mark it as Applied in JobScout."*

> *"Save this search as a watch."*

Watches run on a schedule in the JobScout window, so keep it open for them.

## What it costs

| Action | Uses |
|---|---|
| A search (from Claude or the window) | 1 of your JobScout searches this month |
| Scoring jobs | AI credits from your plan, per job scored |
| A tailored CV (PDF) | 20 cvenom credits |
| A cover letter, a fit analysis, a translation | cvenom credits, as in the studio |

Score the jobs you're interested in rather than everything, and ask Claude for the balance any time: *"How many cvenom credits do I have left?"*

## Troubleshooting

- **Claude doesn't see JobScout**: check the path in `claude_desktop_config.json` against the one in JobScout's MCP window, then quit Claude Desktop completely (not just the window) and open it again
- **Claude writes a CV itself instead of using cvenom**: the cvenom connector isn't on in this chat. Switch it on under **+ → Connectors** in the message box
- **cvenom says you don't have enough credits**: sign in on mayorana.ch with the same email as your cvenom account, so the plan's credits count there
- **cvenom lists no profiles**: you signed in to the connector with another Google account, or without the `cvenom-mcp` Client ID. Remove the connector and add it again

---

Questions? Reach us at [mb@mayorana.ch](mailto:mb@mayorana.ch)
