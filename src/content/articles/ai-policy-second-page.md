---
title: "Your firm's AI policy needs a second page"
description: "California's SB 574 and the Third Circuit's ROSS ruling change what a law firm's AI policy has to cover.  Gail Jefferson on the legal shifts, and Christopher Fryer on the vendor terms, monitoring, and gateway controls that a one-page policy now needs behind it."
date: 2026-10-09
byline: "Gail Jefferson, with Christopher Fryer"
originalUrl: "https://obviai.substack.com/p/your-firms-ai-policy-needs-a-second"
coauthor:
  name: "Gail Jefferson"
  url: "https://gailjefferson.com/"
services:
  - ai-governance
  - fractional-cio
draft: false
---

*This article first appeared on Gail Jefferson's [Obvi AI Substack](https://obviai.substack.com/p/your-firms-ai-policy-needs-a-second).  Part 1 is Gail's.  Part 2 is mine.*

Recently, two developments dramatically shifted the compliance, governance, and liability risks for attorneys using AI.  As California is implicated, most of the supporting case law and analyses are California-related.  This is of course not exhaustive.  [Pulse Digest](https://gailjefferson.com/pulsedigest.html), a running newsletter tracking what AI vendors promise against their actual contracts and terms, covers these developments.

> A firm that wrote a one-page AI policy last year did the right thing, and that's still the foundation.  What changed this week is that the page isn't enough on its own.  The second part of this piece, from Chris Fryer, picks up the governance side.

## Part 1: What SB 574 and ROSS mean for your firm's AI policy

### California's SB 574 mandates strict AI duties

Signed on September 30 by Governor Newsom ([Governor's release](https://www.gov.ca.gov/2026/09/30/californias-nation-leading-ai-framework-just-got-stronger-governor-newsom-signs-more-first-in-the-nation-worker-protections-and-more/)), [SB 574](https://calmatters.digitaldemocracy.org/bills/ca_202520260sb574) explicitly states in Business and Professions Code section 6068.1 that an attorney "shall not delegate the practice of law to generative artificial intelligence."  As covered in [The Recorder](https://www.law.com/therecorder/2026/10/01/lawyers-face-stronger-ai-review-responsibilities-under-new-california-law/), the law forces lawyers to personally verify every case and statutory citation, with court sanctions under section 128.7 for failures, and mandates disclosing AI use to the court for all submitted documents.

This statutory change codifies real risks as seen in Damien Charlotin's [comprehensive AI Hallucination Database](https://www.damiencharlotin.com/hallucinations/), which now tracks over 2,100 court decisions addressing AI-hallucinated content, including the respective sanctions.  Over 1,400 instances in the U.S. illustrate how generative AI has fabricated sources, misrepresented sources, and provided false quotes or old case law in filings submitted to the court.

Here is how SB 574 stacks up against existing ethics guidance.

| Duty | ABA Model Rules and Opinion 512 | California 2026 Practical Guidance | SB 574 (Cal. Bus. and Prof. Code §§ 6068.1 and 128.7) |
| --- | --- | --- | --- |
| Competence | Rule 1.1 Comment [8]: keep "abreast of changes in the law and its practice, including the benefits and risks associated with relevant technology." | Two duties: reach a reasonable understanding of the tool's capabilities, data sources and limits before using it, and review and correct its outputs.  Reassess as models change. | It is an "attorney's duty to exercise reasonable competence and diligence in the practice of law." |
| Delegating judgment | Rule 2.1 requires independent professional judgment; Rule 5.3 holds supervisors responsible for delegated work and known problems left unremedied. | "A lawyer's professional judgment cannot be delegated to AI." | An attorney "shall not delegate the practice of law to generative artificial intelligence."  Agentic systems may not file, communicate with the court or make representations without lawyer review. |
| Confidentiality | Rule 1.6(c) requires reasonable efforts to prevent unauthorized disclosure or access.  For self-learning tools, informed client consent is required (Opinion 512). | Do not input client confidences into a tool that presents material risks, absent informed client consent.  Read the terms and privacy policy; marketing assurances are not enough. | No confidential or personal information in a system unless access is restricted to the attorney and attorney-authorized people.  No consent exception. |
| Verification and candor | Rules 3.1 and 3.3: no false statements to a tribunal; advance only meritorious claims. | Review all AI output, including citations, before it goes to a court, and verify and correct errors. | Review all generative AI output, including citations, and verify and correct errors.  The penalty is sanctions. |
| Court disclosure | No general Model Rule; courts act through standing orders. | Check for rules or orders requiring disclosure of AI use, and comply. | Requires disclosure to the court on all submitted documents where generative AI was used. |

### Thomson Reuters v. ROSS: a warning on AI training data

On September 29, 2026, the Third Circuit handed down a ruling in [Thomson Reuters v. ROSS Intelligence](https://www2.ca3.uscourts.gov/opinarch/252153p.pdf), finding that ROSS's use of human-written, copyrighted Westlaw headnotes to train its competing legal AI search engine was not protected by fair use.

As covered by [LawNext](https://www.lawnext.com/2026/09/3rd-circuit-rules-for-thomson-reuters-in-its-copyright-fight-against-legal-research-startup-ross.html), the court determined that ROSS's copying was commercial, "minimally transformative, at best," and actively harmed both Westlaw's existing market and a developing market for licensing headnotes as AI-training data.

However, there is a crucial limitation: the court explicitly noted in a footnote that ROSS's non-generative system "cannot generate original expression."  This separates the ruling from the broader debate over generative AI models, which remains fiercely contested in ongoing litigation.  For example, the generative AI sector recently saw the massive $1.5 billion class settlement in [Bartz v. Anthropic](https://www.pearlcohen.com/federal-court-approves-1-5-billion-anthropic-copyright-settlement-largest-in-history/) (approved in July 2026) regarding the training of models on books allegedly torrented and not purchased.

Despite ROSS's intent to ask the Supreme Court to review the case, arguing the ruling "creates continued uncertainty" ([LawNext](https://www.lawnext.com/2026/10/ross-says-it-will-ask-supreme-court-to-review-3rd-circuit-ruling-for-thomson-reuters-in-copyright-case.html)), the immediate takeaway for lawyers is clear: training data liability is real (and customers can be caught in the fallout).

### The distillation gap: humans vs. models

The ROSS ruling creates a fascinating legal gap regarding "distillation."  In ROSS, human Westlaw editors summarized opinions into copyrighted headnotes, which ROSS's contractor then used for training data.  Because a human wrote the summary, copyright law applied.

But what happens when one AI model learns by copying the outputs of another AI model?

Because purely AI-generated output has no U.S. copyright, AI labs fighting model distillation cannot easily rely on copyright claims.  This might explain the tactics in [Anthropic's September 2026 threat report](https://www.anthropic.com/threat-intelligence-report-september-2026).  Anthropic alleges it disrupted massive distillation campaigns by rival labs, including over 151 million exchanges by Alibaba and 12.1 million by DeepSeek, but its public recourse relies on banning fraudulent accounts and enforcing terms of service, rather than asserting copyright over Claude's outputs ([TechCrunch](https://techcrunch.com/2026/09/10/anthropic-details-distillation-campaigns-from-alibaba-moonshot-ai-and-deepseek/)).  A model's output lacks a human author, so the copyright theories used against ROSS gain little traction on this frontier, where private rules, not property law, keep the peace.

### Action items: auditing software and enforcing controls

**1. Audit all software, not just "AI tools"**

You should audit every piece of software your firm uses, from standard word processors to CRMs, because many traditional platforms are quietly rolling out generative features.  Confirming a tool "doesn't train on your data" is only the bare minimum.  You must investigate who can access the inputs, outputs, and data, where they are stored, and how long they are retained (including any third party the software company uses).  SB 574 explicitly bars entering confidential information into a system unless access is strictly restricted to the attorney and authorized individuals.  A tool nobody reviewed cannot be shown to meet this test, and the liability falls on the lawyer, not the vendor.

**2. Deploy endpoint tracking to enforce controls**

Firms can no longer rely on honor systems or basic network firewalls to prevent the use of shadow AI.  To enforce data controls effectively, IT must deploy Cloud Access Security Brokers (CASB) or specific endpoint monitoring agents directly onto every managed computer.  These tools go beyond simply blocking domains at the network level; they track specific HTTP requests and API calls back to individual users and specific devices.  Network-level tracking often misses local desktop applications or browser extensions with broad permissions, making endpoint-level monitoring essential for maintaining compliance with California's strict new confidentiality rules.

> Those two action items tell a firm what to do.  They don't tell it what happens next, what the audit turns up, what the monitoring report shows, and who has authority to act on it.  Chris has worked through exactly that question inside law firms, so I've asked him to pick up from here.

## Part 2: Governance beyond the one-page AI policy

I spent twelve years as CIO of an AmLaw 200 firm and co-chaired its AI task force.  I now advise firms on this work.  What follows is what happens when a firm tries to do those two things, and the controls I would add.

Start with the policy.  Firms that banned AI found that the use did not stop.  It moved to personal phones and personal accounts, where no setting protects the firm's data and no log records what was sent.  A one-page policy that names the approved tools, the data that stays out, the person who approves new tools, and the person to call with questions is still the right first step, and [here is how to write that policy](/articles/one-page-ai-policy).  SB 574 does not make that page obsolete.  It makes the page insufficient on its own, because the law now asks a question the policy cannot answer by itself.  Does the system restrict access to the attorney and authorized people?  Answering that takes three more things.  Read the vendor terms closely, watch what staff actually use, and put a control in front of the model.

### Read the terms for four things, not one

The confirmation most firms collect is that a vendor does not train on customer data.  That is one of four questions, and it is the one least likely to cause trouble.

Training and retention are separate controls.  Training is whether the vendor may use what you send to improve future models.  Retention is how long your prompts and files sit on the vendor's servers before deletion.  A tool can have training off and still retain data for years, and most commercial AI plans do exactly that.  On Anthropic's commercial plans, for example, training is off under the contract, and the default retention is 30 days.  Zero data retention is a separate request that an organization has to make and qualify for, and it does not carry over to a new account under the same company.

Side channels go around the main setting.  On Claude's Team and Enterprise plans, a conversation that a user rates with the thumbs-up or thumbs-down button is kept for up to five years and may be used for training, even though training is otherwise off.  An administrator can close that channel for the whole firm with one setting, but only if someone knows to look for it.  Every vendor has a path like this somewhere, and the terms are where you find it.

The rules follow the credential, not the tool.  The same Claude Code terminal is a consumer session under a personal Pro login and a commercial session under the firm's Enterprise login, with different training and retention rules for each.  A lawyer who signs into an approved tool with a personal account has left the firm's terms behind without opening a different program.

Connectors are separate processors.  When a tool reaches into the document management system or email through a connector or an MCP server, the vendor's retention promise stops at its own boundary.  Each connector needs its own review.

The reason it matters under SB 574 is simple.  Whatever a vendor keeps is client information held by a third party, which is why the retention term matters as much as the training term.  It can fall inside a litigation hold.  Outside counsel guidelines increasingly ask which AI tools touched a matter and how long data stayed with them.  A copy in a vendor's 30-day window is discoverable, and most firms have no record it exists.  The retention setting for each tool belongs in the firm's data map with a named owner, next to the email archive and the document management system.

For a plan-by-plan table of how these four questions come out for Claude, see my article on [training and retention across Claude plans](/articles/claude-training-and-data-retention).

### What monitoring actually shows you

Gail is right that a network firewall is not enough and that endpoint visibility is now the floor.  I ran these tools at a firm, and I want to add what the reports look like once they arrive.

The reports run long.  A firewall and a DNS filter like Cisco's OpenDNS log every request to a known AI domain, and the result is a list that nobody reads end to end.  The log names the user and the domain, but a hundred requests from one person may be an afternoon of drafting or a page left open in a browser tab, so it cannot tell you how much AI work is really being done.  The report shows, beyond a doubt, that people are working outside the firm's approved tools.  That one finding is enough to change the conversation, and it is the reason to run the report at all.

The tools see less than the vendor demos suggest.  A CASB or endpoint agent catches traffic to known AI domains from managed devices.  It does not see the personal phone sitting next to the keyboard.  It does not see confidential text pasted into an approved tool, because the approved tool is approved.  It sees that a browser extension talked to an AI endpoint, but not what the extension read from the page.

The report also creates a problem the firm did not have before.  Every line on it is now a known event.  If the policy does not name who decides what happens next, the list sits in IT.  Most firms collect this information and do not act on it, and I do not exempt the firms I have worked in.  This is the best argument for the one-page policy.  Monitoring without a named decision-maker produces a record of violations that nobody is authorized to act on.  A report that nobody acts on is the strongest case for enforcement lower in the stack, where the control runs whether or not anyone reads the log.

### A control in front of the model

Monitoring tells the firm what happened.  SB 574 asks the firm to prevent it.  The architecture that does that is a gateway, a firm-controlled proxy that sits between every user and every model the firm allows.

A gateway can mask client names and identifiers before a prompt leaves the building, log each request to a user and a matter, route privileged material to a model running on the firm's own hardware, and apply one policy no matter which application the lawyer opened.  It gives the firm a single place to answer the question the statute asks.  Who had access, and what did they send?

A governance gateway may be the only way for a firm to meet the letter of SB 574, because it is the one place where the firm, and not the vendor, decides what leaves the building.  Enterprise platforms such as Airia offer this today, at a scale and a price built for large organizations.  Most law firms are not large organizations.  Smaller and less expensive governance tools will have to reach them, or the statute will set a standard that only the biggest firms can meet.

### Four layers

Policy names the approved tools and the person who decides.  Settings make the vendor terms match the policy.  Monitoring shows whether people followed it.  A gateway enforces it before the data moves.  Each layer catches what the one before misses.  A firm that has only the first one has a good start and an open question, and Gail's closing question below is the right place to begin answering it.

How comprehensive is your IT department's current visibility into the generative AI browser extensions your staff may have installed?

---

[Gail Jefferson](https://gailjefferson.com/) is a California IP attorney, founder of Obvi AI, and publishes [Pulse Digest](https://gailjefferson.com/pulsedigest.html), which tracks what legal AI vendors say about policy and governance against the public record.  Christopher Fryer is the founder of Stewardmark, an AI transformation and technology leadership consultancy, and was CIO of Hanson Bridgett for twelve years.  Stewardmark is evaluating governance gateways built for firms without enterprise budgets.

If you want your firm's vendor terms, settings, and policy reviewed together, my [AI readiness review](/services/ai-governance) covers all three.
