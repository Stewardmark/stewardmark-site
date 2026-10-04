---
title: "Managing training and data retention across Claude plans"
description: "Training and retention are separate controls on every Claude plan.  What each plan does by default, how to stop training, where zero data retention is actually available, and what I would configure for an individual, a small firm, and a law firm."
date: 2026-10-05
services:
  - ai-governance
  - ai-agents
  - fractional-cio
---

## Two different questions

When a client asked me whether Claude would train on the organization's data, I learned to answer with a second question: do you mean training, or do you mean retention?  They are different problems with different controls, and settling one tells you nothing about the other.

Training is whether Anthropic may use what you send to improve future models.  Retention is how long your prompts and files sit on Anthropic's servers before they are deleted.  You can have no training and long retention at the same time, and most Claude customers do.

On the consumer plans (Free, Pro, Max) one setting controls training, and that same setting sets the retention period.  On the commercial side (Team, Enterprise, the API, and the cloud marketplaces) training is off under the contract, and retention is a separate conversation.  The default there is 30 days.  Zero data retention, or ZDR, exists only for organizations that ask for it and qualify.

The short version: a Pro or Max subscriber can stop training with one toggle and cannot get ZDR at any price.  A commercial customer starts with no training and has to go ask for ZDR.  The rest of this article works through what that means for each plan, and what I would actually configure.

## Free, Pro, and Max

I pay for Max, so this is the plan I know best from the inside.  One setting decides everything.  It is labeled "You can help improve Claude" under Settings, Privacy.  Anthropic made every existing account pick a position on it by October 8, 2025, and new accounts pick at signup.  The choice applies to Claude on the web, desktop, and mobile, and to any Claude Code session signed in with the same account.

| Setting | Training | Retention |
| --- | --- | --- |
| Improve Claude on | Chats, uploaded files, and outputs may be used to train future models | Up to 5 years, de-identified |
| Improve Claude off | No training on new or resumed conversations | Deleted within 30 days of removal from chat history |

Turning it off works going forward.  A conversation that already went into a training run stays there.  A conversation you delete before the next run starts is not used, and a deleted chat leaves Anthropic's back end within 30 days.

A few things stay out of training no matter how the setting is set.  Incognito chats are never used and do not land in your history.  Raw content that arrives through a connector such as Google Drive or an MCP server is excluded from feedback submissions, although anything you paste into the chat yourself is in.  And feedback is its own channel: when you click thumbs up or thumbs down, that conversation is kept for 5 years, de-linked from your account, even if training is off.

Here is what I do on my own account, and what I would tell anyone on Pro or Max who wants no training and the shortest retention they can get:

1. Turn "You can help improve Claude" off, and look at it again after every terms update.
2. Use incognito for anything you would not want in a training set.  It is excluded by design, not by a setting you might forget.
3. Delete conversations when the work is done.  Thirty days after deletion is the floor on a consumer plan.
4. Do not rate a sensitive chat.  Feedback goes around the training setting.
5. Look at memory now and then.  It persists until you edit or delete it, and it is separate from chat retention.
6. Unshare old shared links under Settings, Privacy, Shared links.

There is no ZDR on Free, Pro, or Max.  If you need it, the work has to move to the API under commercial terms or to a Team or Enterprise plan, and even there ZDR is a separate request rather than a feature of the plan.

## Team and Enterprise

Team and Enterprise run under Anthropic's commercial terms, so training is off because the contract says so, not because someone remembered to flip a switch.  Anthropic does not train on inputs or outputs from Claude for Work unless the organization opts in, through the Development Partner Program for example, or a user submits feedback with the thumbs up or thumbs down buttons.

That feedback button is the one hole.  A rated conversation is kept for up to 5 years, de-linked from user and customer IDs, and may be used for training.  A Primary Owner or Owner can close it for the whole organization with the "Rate chats" setting under Organization settings, Data and Privacy.  If I were still running a firm's technology, that would be the first thing I turned off after signing.

Retention is where the two plans part ways.

| Plan | Default retention | Admin control |
| --- | --- | --- |
| Team | Chats stay until the user deletes them; gone from the back end within 30 days after that | Disable feedback |
| Enterprise | Kept indefinitely unless an admin sets a custom period | Disable feedback; set a custom retention period, 30 days minimum |

The Enterprise custom retention control covers standalone chats and their artifacts, and Projects with the chats inside them.  Shorten the period and anything older is scheduled for deletion the moment you save; a daily job finishes the purge over a few days.  Claude Design, Claude Tag, Claude Managed Agents, and Claude Code on the web are not covered by that control and follow their own rules.

Neither plan includes ZDR for the Claude app.  Anthropic's own documentation lists the Team and Enterprise interfaces as outside ZDR.  Where ZDR does show up on Enterprise is Claude Code: a qualifying Enterprise organization can have its account team turn it on, per organization, after an eligibility review.

If you administer one of these plans:

1. Turn off "Rate chats" under Data and Privacy so nobody can route a client conversation into the 5-year feedback store.
2. On Enterprise, set a custom retention period.  Thirty days is the shortest available and matches the API default.
3. Join the Development Partner Program only on purpose.  It is the one way an organization opts into training on these plans.
4. If you need ZDR for coding, ask the account team for it on Claude Code and get the confirmation in writing.

## Claude Code

Claude Code takes on the policy of whatever account you sign in with.  The same terminal session is a consumer session under a Pro or Max login and a commercial session under a Console API key or an Enterprise login.  The rules follow the credential, not the tool, which surprises people.

| Login | Training | Retention | ZDR |
| --- | --- | --- | --- |
| Free, Pro, Max | Follows the account's "improve Claude" setting | 5 years on, 30 days off | Not available |
| Console API key (commercial org) | None | 30 days | On request |
| Claude for Enterprise | None | 30 days | On request, for qualified organizations |
| Bedrock, Google Cloud Agent Platform, Microsoft Foundry | None by Anthropic | Set by the cloud provider | Set by the cloud provider |

Three things happen on the developer's machine or through side channels whatever the login:

- Local transcripts sit in plaintext under ~/.claude/projects/ for 30 days by default.  The cleanupPeriodDays setting changes that.  Sessions started from Claude Desktop or Cowork are exempt from cleanup unless you say otherwise.
- The /feedback, /bug, and /share commands send the conversation, code included, to Anthropic, where it is kept for 5 years.  DISABLE_FEEDBACK_COMMAND=1 removes the path.
- Session quality surveys sometimes offer to upload a transcript.  Nothing goes unless you choose Yes.  CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1 stops the prompt.

Telemetry is metadata only; it never carries code, prompts, or file paths.  DISABLE_TELEMETRY=1 turns off metrics, DISABLE_ERROR_REPORTING=1 turns off error reports, and CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 turns off everything non-essential at once.  On Bedrock, Google Cloud, and Foundry these are already off.  All of them can go in settings.json so a team gets the same configuration on every machine.

ZDR for Claude Code takes an Enterprise organization that Anthropic has reviewed and enabled, one organization at a time, through the account team.  It is not in the standard Enterprise plan and there is no admin switch for it.  Once it is on, prompts and responses are not stored after the response comes back, and the features that depend on server-side storage are shut off at the backend: cloud sessions, including ones started from the desktop app, Remote Control, Artifacts, Claude Tag, and feedback submission.  Chat on claude.ai and Cowork sessions stay outside ZDR even for a ZDR organization.  Developers also have to sign in to the ZDR organization.  A personal login or another organization's API key is not covered, and the forceLoginMethod and forceLoginOrgUUID managed settings exist to make sure nobody does that by accident.

What I would set up for Claude Code:

1. Sign in with a commercial credential, a Console API key or an Enterprise login, never a Pro or Max account.  That alone takes training off the table.
2. Put DISABLE_FEEDBACK_COMMAND=1 and CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY=1 in settings.json, and DISABLE_TELEMETRY=1 if the organization would rather send no metrics.
3. Lower cleanupPeriodDays on shared or managed machines, since the local transcripts are plaintext.
4. Treat MCP servers and other integrations as separate data processors.  Anthropic's retention promises stop at Anthropic's boundary.

### When nothing may leave the building

For the work that matters most, the best privacy control is to keep the prompt off Anthropic's servers in the first place.  Claude Code will talk to any endpoint that speaks the Anthropic API format, and Ollama now speaks it natively.  Pull a model, set `ANTHROPIC_BASE_URL=http://localhost:11434` and `ANTHROPIC_AUTH_TOKEN=ollama` (the local server accepts any token), and every request goes to the machine in front of you.  LM Studio, llama.cpp, and a self-hosted LiteLLM gateway work the same way.  An organization can pin managed machines to that endpoint with `allowedProviders: ["customEndpoint"]` in a managed settings file so a developer cannot route around it.

The cost is capability.  Anthropic does not support running Claude Code against non-Claude models, and a local 20B to 70B model gives up most of what makes Claude Code worth using.  I recommend running it as a split: local models for drafting against privileged material, a ZDR commercial endpoint for everything else.  For the local half, training and retention stop being questions, because the data never makes the trip.

## The API, Bedrock, Google Cloud, and Foundry

The API is where ZDR actually lives.  Under commercial terms Anthropic does not train on API traffic, keeps inputs and outputs for 30 days under the standard policy, and will turn on ZDR for an organization that asks through sales and passes the eligibility review.  With ZDR on, prompts and responses are not stored once the response is returned.  Two exceptions survive every arrangement: anything flagged by trust and safety systems can be held up to 2 years, and anything the law requires Anthropic to keep.

ZDR is not a blanket.  It applies feature by feature, and some features sit permanently outside it because they cannot work without storing something on the server.

| Covered by ZDR | Outside ZDR |
| --- | --- |
| Messages API, token counting, citations, thinking, inline PDFs, web search, web fetch | Files API (kept until deleted or expired) |
| Client-side tools: computer use, bash, text editor, memory tool, browser use | Batch processing (29 days) |
| Prompt caching, structured outputs, cache diagnostics (brief in-memory artifacts only) | Code execution and programmatic tool calling (30 days) |
| Context management and context editing, tool search, advisor tool | Managed Agents, Agent Skills, MCP connector, MCP tunnels |

Two details trip people up.  Structured outputs cache the JSON schema for 24 hours, so client names and other sensitive values must stay out of property names, enum values, and regex patterns and live only in the message content.  A PDF is covered only when you send it inline, embedded in the request itself.  Upload it through the Files API instead and Anthropic stores a copy until you delete it, outside ZDR.  If you want a document to fall under zero data retention, embed it in each request rather than uploading it once and referencing it.

The newest models are the current exception.  Claude Fable 5.1, Mythos 5.1, Fable 5, and Mythos 5 are what Anthropic calls Covered Models, and they require 30-day retention on every platform.  A ZDR organization cannot call them.  The workaround is a separate workspace: in the Console, under Settings, Workspaces, open the workspace's Privacy controls tab and turn on 30-day retention for that workspace alone.  The rest of the organization stays on ZDR, and the older models remain fully available under it.  In September 2026 Anthropic announced an application-only program, Enterprise Frontier Safeguards, that offers ZDR on Fable to approved enterprises by moving the safety monitoring onto infrastructure the customer controls.  I would treat that as something to negotiate, not something to count on.

Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry sit outside Anthropic's retention arrangements altogether.  Anthropic does not train on traffic through them, and retention follows the cloud provider's own controls: customer-managed KMS keys on Bedrock, CMEK on Google Cloud, Azure-resident prompts on Foundry's Azure-hosted option.  ZDR on those platforms goes through the platform or your Anthropic account representative, not the Console.

HIPAA readiness is a different arrangement and does not require ZDR.  It keeps 30-day retention with encryption, access controls, and audit logging, and it blocks its own list of features.

If you are building on the API with confidential material:

1. Ask sales for ZDR on every organization that handles it.  It does not carry over to a new organization under the same account.
2. Build on the covered features.  Keep the Files API, batches, code execution, and Agent Skills out of ZDR workloads, or accept that those calls keep their own retention.
3. Put Covered Model traffic in a dedicated 30-day workspace instead of loosening the whole organization.
4. Keep secrets and client identifiers out of structured output schemas.
5. Get the enablement in writing and check it on each organization rather than assume it carried over.

## Plan by plan

| Product | Training default | How to stop training | Retention | ZDR |
| --- | --- | --- | --- | --- |
| Free, Pro, Max (Claude.ai) | Whatever you chose at signup | Settings, Privacy, turn the setting off; use incognito chats | 5 years with training on; 30 days after deletion with it off | Not available |
| Claude Code on a Pro or Max login | Same as the account | Same toggle, or sign in with a commercial credential | Same as the account | Not available |
| Team | Off by contract | Admin turns off "Rate chats" | Until the user deletes; 30 days after | Not for the app |
| Enterprise | Off by contract | Admin turns off "Rate chats" | Indefinite unless an admin sets a custom period (30-day minimum) | Not for the app; on request for Claude Code |
| API (Console) | Off by contract | Nothing to do; opt-in only through the Development Partner Program | 30 days standard | Per organization, through sales; Covered Models excluded |
| Bedrock, Google Cloud Agent Platform, Foundry | Off by contract | Nothing to do | Set by the cloud provider | Set by the cloud provider |

## What I would configure

If you are an individual on Pro or Max, turn "You can help improve Claude" off, use incognito for anything sensitive, delete chats when you are done, and never rate a sensitive conversation.  That gets training to zero and retention to 30 days after deletion, which is as good as a consumer plan gets.  There is no ZDR here, and no amount of asking changes that.

If you are a solo consultant or a small firm handling client material, keep the consumer account for personal use and put client work on a Console API organization or a Team plan.  Training stops under the contract the day the work moves.  If a client engagement letter requires ZDR, the API is the only route: request it per organization, build on the covered features, and send any Covered Model traffic to a 30-day workspace.

If you run technology for a law firm or another regulated organization, Enterprise is the floor, with "Rate chats" off and a 30-day custom retention period set by an Owner.  Developers get Claude Code under Enterprise with ZDR requested from the account team, login forced to the ZDR organization, and the feedback and survey paths disabled in settings.json.  Application workloads get an API organization with ZDR and the eligibility table treated as an architecture constraint.  Write all of it down and get it confirmed by Anthropic, because ZDR and custom retention are turned on by people, not by plan tier, and every new organization starts without them.

Three habits matter on every tier.  Do not submit feedback on anything confidential.  Review connectors and MCP servers on their own terms, because they sit outside Anthropic's promises.  And recheck the settings after every terms update, because the defaults have moved before and will move again.

If you want these settings reviewed and written down for your organization, my [AI readiness review](/services/ai-governance) covers vendor terms, account settings, and the policy that goes with them.

## Sources

Everything above reflects Anthropic's published policies as of October 2, 2026.  Anthropic revises these pages often, so check them before relying on a detail.

- [Updates to Consumer Terms and Privacy Policy](https://www.anthropic.com/news/updates-to-our-consumer-terms), Anthropic
- [How long do you store my data?](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data), Anthropic Privacy Center
- [Is my data used for model training? (consumer)](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training), Anthropic Privacy Center
- [Is my data used for model training? (commercial)](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training), Anthropic Privacy Center
- [Who can view my conversations?](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations), Claude Support
- [Configure custom data retention controls for Enterprise plans](https://support.claude.com/en/articles/10440198-configure-custom-data-retention-controls-for-enterprise-plans), Claude Support
- [Data retention practices for Covered Models](https://support.claude.com/en/articles/15425996-data-retention-practices-for-covered-models), Claude Support
- [Claude Code data usage](https://code.claude.com/docs/en/data-usage), Claude Code Docs
- [Claude Code zero data retention](https://code.claude.com/docs/en/zero-data-retention), Claude Code Docs
- [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention), Claude Platform Docs
- [Claude: settings and good practices](https://privacyinternational.org/guide-step/5677/claude-settings-and-good-practices), Privacy International
- [Anthropic promises zero data retention, but customers must check it worked](https://www.theregister.com/ai-and-ml/2026/09/02/anthropic-promises-zero-data-retention-but-customers-must-check-it-worked/5293789), The Register, September 2, 2026
- [Anthropic compatibility](https://docs.ollama.com/api/anthropic-compatibility), Ollama Docs
- [Other LLM gateways](https://code.claude.com/docs/en/llm-gateway), Claude Code Docs
