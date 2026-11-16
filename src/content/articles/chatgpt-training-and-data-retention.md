---
title: "Managing training and data retention across ChatGPT and OpenAI plans"
description: "Training and retention are separate controls on every OpenAI plan.  What each ChatGPT plan and the API do by default, how to stop training, where zero data retention is actually available, and what I would configure for an individual, a small firm, and a law firm."
date: 2026-11-16
services:
  - ai-governance
  - ai-agents
  - fractional-cio
---

## Two different questions

When I wrote about [training and retention on Claude](/articles/claude-training-and-data-retention), I said the first step is to separate two questions.  Training is whether the vendor may use what you send to improve future models.  Retention is how long your prompts and files sit on the vendor's servers before they are deleted.  The same split applies to OpenAI, and on ChatGPT the two are even further apart.

On Claude's consumer plans, the training setting also sets the retention period.  On ChatGPT's consumer plans it does not.  Your chats stay until you delete them, whichever way the toggle is set.

On the business side (ChatGPT Business, Enterprise, Edu, and the API) OpenAI does not train on your data by default.  OpenAI documents a configurable retention period for Enterprise, Edu, and Healthcare workspaces, and zero data retention, or ZDR, exists only on the API, by approval, endpoint by endpoint.

The short version is that a Plus or Pro subscriber can stop most training from one settings page and cannot get ZDR at any price.  A business customer starts with no training, and the only route to ZDR runs through the API.

## Free, Go, Plus, and Pro

I pay for Plus, so this is the plan I know from the inside.  On personal plans, data sharing is on by default.  The setting is labeled "Improve the model for everyone" under Settings, Data controls.  When you are signed in, it applies to your account on the web and on mobile.  When you are signed out, the choice is saved only in that browser.

| Setting | Training | Retention |
| --- | --- | --- |
| Improve the model on | New conversations may be used to train OpenAI models | Saved until you delete them |
| Improve the model off | New conversations are not used for training | Saved until you delete them |

Turning the setting off works going forward.  It does not delete or hide anything, and archiving a chat does not change whether it can be used for training.

When you delete a chat, it leaves your account immediately and is scheduled for permanent deletion from OpenAI's systems within 30 days.  Two exceptions apply.  A chat that has already been de-identified and disassociated from your account is outside that promise, and so is anything OpenAI must keep for security or legal reasons.

A few things need their own attention:

- Temporary chats do not appear in history, do not create or update memories, and are not used for training.  OpenAI may keep a copy for up to 30 days for safety purposes.  If you save a temporary chat, it becomes a regular chat and follows your normal settings.
- Feedback goes around the training setting.  If you click thumbs up or thumbs down after opting out, OpenAI says the entire conversation tied to that feedback may be used to train its models.
- Trusted Access programs are another exception.  During a Trusted Access session such as Daybreak, which OpenAI offers for more sensitive work, it may use your content for training even when the toggle is off.
- Voice mode has its own training control, separate from the main toggle.
- Memory, shared links, and ad personalization each have their own controls.  Turning training off changes none of them.
- Files saved to Library are managed apart from chats.  Deleting a chat does not delete a file saved to Library.  Files added to a custom GPT or a project stay until that GPT, project, or file is deleted, and are then removed within 30 days.

Here is what I would tell anyone on a personal plan who wants no training and the shortest retention they can get:

1. Turn "Improve the model for everyone" off.  If you use voice mode, turn its training control off too.
2. Use a temporary chat for anything you would not want in a training set or in your history.
3. Delete chats when the work is done, and delete Library files separately.  OpenAI's limit is 30 days after deletion, and no setting shortens it.
4. Do not rate a sensitive conversation.
5. Review memory and shared links now and then.  Both persist apart from chat history.
6. Check the settings again after every terms update.

There is no ZDR on Free, Go, Plus, or Pro.

## The court order that changed the deletion promise

Any article about ChatGPT retention has to account for the New York Times copyright case.  On May 13, 2025, the court ordered OpenAI to preserve and segregate output log data that would otherwise have been deleted.  For more than four months, chats users deleted, and temporary chats that would have expired, were kept instead.  The order reached consumer ChatGPT, ChatGPT Team (now Business), and API customers without a ZDR agreement.  ChatGPT Enterprise, Edu, and ZDR API traffic were excluded.

The ongoing obligation ended on September 26, 2025, and OpenAI returned to 30-day deletion.  OpenAI says it still holds a limited set of April through September 2025 data under legal hold.

A second order in the same case is easy to confuse with the first.  In January 2026 the court affirmed an order for OpenAI to produce 20 million de-identified ChatGPT conversations to the plaintiffs, and OpenAI says it has complied.  OpenAI says the sample was drawn from December 2022 through November 2024 and excluded Enterprise, Edu, Business, and API customers.

The lesson is not specific to OpenAI.  A vendor's deletion schedule is a policy, and a court can override it.  Any copy that sits in a 30-day window can end up preserved and produced in someone else's lawsuit.  ZDR traffic stayed out because nothing was stored to preserve.  Enterprise and Edu were excluded from the order.

## Business and Enterprise

ChatGPT Business (formerly Team), Enterprise, Edu, and ChatGPT for Healthcare run under OpenAI's business terms.  OpenAI does not use their content to train its models by default.  That holds when the workspace uses Codex too.

Feedback works differently here than on personal plans.  OpenAI says a thumbs up or thumbs down in a Business, Enterprise, or Edu workspace does not permit training on the conversation, unless the organization has signed a separate agreement that allows training.  OpenAI does not say what else happens to a rated conversation.  Admins can turn ratings off under Workspace settings, Allow response feedback.  If I were still running a firm's technology, that would be the first thing I turned off.

Retention is where Business and Enterprise part ways.

| Plan | Default retention | Admin control |
| --- | --- | --- |
| Business | Chats stay until the user deletes them; removed within 30 days after that | No documented custom retention period; members cannot export their own data, but an owner can export a member's data where the option is available; no workspace-wide switch for shared links |
| Enterprise | Chats stay until the user deletes them unless an Owner sets a workspace period | Custom retention period, 90-day minimum; Compliance API; Enterprise Key Management; data residency; shared links can be disabled |

A few Enterprise details matter in practice:

- The 90-day minimum is three times Claude Enterprise's 30-day floor.
- Files saved to Library follow the workspace retention policy.  Some transient uploads that never reach Library expire after 48 hours.
- When a member is removed, their projects and GPTs are reassigned to an owner, while their conversations follow the workspace retention policy.
- Compliance API records are available for 30 days.  Once exported, they follow the retention policy of the system that receives them, which means your SIEM or review platform now holds a copy.

OpenAI's documentation is not consistent about Business.  Its plan materials present configurable retention as an Enterprise feature, while one line on its enterprise privacy page suggests Business admins also control retention.  Ask OpenAI to confirm before relying on either reading.

Neither plan offers ZDR for the ChatGPT app.  OpenAI treats ZDR as an API-only control.

ChatGPT Work and connected apps need their own review.  Work's local computer access feature does not provide strict zero data retention, and OpenAI tells organizations that require ZDR not to enable it.  Content from a document system, mailbox, or Slack can be copied into a project, Library, or a synced index, and deleting the conversation leaves those copies in place.

If you administer one of these plans:

1. On Enterprise, have an Owner set a custom retention period.  Ninety days is the shortest available.  At a law firm, set it with the records and litigation hold process in mind, because automated deletion must not destroy material the firm is obligated to preserve.
2. On Business, assume chats live until a member deletes them, and that a deleted chat cannot be restored.  If a legal hold reaches ChatGPT content, have an owner export the custodian's data rather than rely on the hold notice alone.
3. Turn off Allow response feedback in any workspace that handles client material.
4. Export Compliance API records to a system whose own retention you control, and add that system to the data map.
5. Map every place a connected app can copy client information, not only the chat.

## Codex

Codex takes on the policy of whatever account you sign in with, the same way Claude Code does.  When you sign in with ChatGPT, Codex follows your workspace's permissions, retention, and residency settings.  When you sign in with an API key, Codex follows your API organization's retention and data-sharing settings instead.  Codex cloud requires a ChatGPT sign-in.

| Login | Training | Retention | ZDR |
| --- | --- | --- | --- |
| Free, Go, Plus, Pro | Follows "Improve the model for everyone," plus the Codex "Include environments" setting | Same as the account | Not available |
| Business or Enterprise | Not by default | Follows the workspace | Not through ChatGPT |
| API key | Not by default | Follows the API organization | If the organization is approved |

The "Include environments" setting is easy to miss.  It controls whether extra context from your Codex environments can be used for training, and it is separate from the main toggle.  Turning off "Improve the model for everyone," or opting out through OpenAI's Privacy Portal, does not change it.  On a personal plan, you have to turn off both.

Several local settings in `~/.codex/config.toml` control what leaves the machine or stays on it:

- `history.persistence = "none"` stops Codex from saving session transcripts to `history.jsonl`.
- `feedback.enabled = false` removes the `/feedback` command, which is on by default.
- `analytics.enabled = false` turns off the built-in metrics exporter.  An OpenTelemetry exporter you configure yourself keeps running.
- `otel.log_user_prompt` and `otel.log_agent_responses` are off by default.  Leave them off unless your own collector is built to hold client content.

For a team, the login controls matter most.  `forced_login_method` and `forced_chatgpt_workspace_id` keep a developer on the firm's account.  An administrator can enforce the same thing with `allowed_login_methods` and `allowed_chatgpt_workspaces` in a `requirements.toml` delivered through the system requirements file or MDM.  OpenAI notes that cloud-managed values for those two keys are ignored, so they have to be set on the device.

### When nothing may leave the building

Codex can run against a local model.  `codex --oss` connects to Ollama or LM Studio and defaults to OpenAI's open-weight gpt-oss:20b.  Model requests then go to the machine in front of you, and OpenAI never sees the prompts.  The agent can still reach the network, call MCP servers, and write local session files, so restrict those separately before treating the work as fully contained.

The cost is capability, as it is with Claude Code.  An open-weight model on a laptop gives up much of what makes a frontier coding agent useful.  I recommend the same split I use for Claude: local models for drafting against privileged material, and a commercial endpoint with the right retention terms for everything else.

## The API

The API is where ZDR lives at OpenAI.  OpenAI has not trained on API data since March 1, 2023, unless a customer opts in.  Two kinds of storage remain.  Abuse monitoring logs hold prompts and responses for up to 30 days by default, or longer when the law requires it or OpenAI judges it necessary to protect its services.  Application state is whatever a feature has to store to work, such as a saved response or an uploaded file.

Approved customers can choose one of two controls.  Modified Abuse Monitoring keeps customer content out of the abuse monitoring logs across all endpoints, except for image and file inputs in rare cases.  Zero Data Retention does the same and also forces the `store` parameter to false on the Responses and Chat Completions APIs, even when a request asks for true.  Both require approval through sales.  Once approved, they are configured under Settings, Organization, Data controls, Data retention, at the organization level, with a per-project override.  A project can be set to inherit, to a specific control, or to none.

ZDR is not a blanket.  Some endpoints keep application state even in a ZDR organization.

| Covered by ZDR | Outside ZDR |
| --- | --- |
| Responses, Chat Completions, Decisions | Files (kept until deleted) |
| Embeddings, moderations, legacy completions | Batches, fine-tuning, evals (kept until deleted) |
| Audio transcription, translation, and speech | Assistants, threads, and vector stores (kept until deleted) |
| Realtime and GPT-Live sessions | Conversations, ChatKit threads, and the Agents API |
| Image generation on listed models | Custom voices |

A few details trip people up:

- Without ZDR, the Responses API stores response data for at least 30 days by default.  Setting `store` to false stops that, but it does not remove the abuse monitoring logs.
- A flagged image is kept for manual review even under ZDR.
- MCP servers and other third-party tools follow their own retention policies.
- Structured output schemas count as system data, outside data residency.  Keep client names out of them.

### Frontier models and Private Safety Processing

The newest models are where OpenAI and Anthropic now differ most.  Anthropic requires 30-day retention for its Covered Models, apart from an application-only program for approved enterprises.  OpenAI announced on August 19, 2026 that it would keep offering ZDR on frontier models through a system it calls Private Safety Processing, and says GPT-6 Astra supports ZDR for eligible customers.

Under ZDR with Private Safety Processing, selected interactions are encrypted and written to a storage bucket you own, in AWS, Azure, Google Cloud, or Oracle Cloud.  OpenAI keeps an index, not the content.  An automated review runs in a hardware-attested environment that disables human access, and only bounded safety signals come out.  You must keep those records for at least 30 days, and you can add your own encryption key on top of OpenAI's.  Where Private Safety Processing applies, both vendors keep 30 days of something.  The difference is whose storage holds it and who can read it.

Plain ZDR keeps no request content after processing on eligible endpoints, apart from short-lived caches.  ZDR with Private Safety Processing is different, because it does create records.  They sit in your storage instead of OpenAI's, and they are under your own key only if you set up Enterprise Key Management.  That bucket belongs in your data map and your litigation hold procedures like any other repository.  The setting is per project and applies to all traffic in that project, so OpenAI suggests a separate project for work that does not need it.  OpenAI does not publish which models require it, so ask before you design around one.

OpenAI also reserves the right, with written notice, to make specific models ineligible for ZDR for a specific customer.  It describes two fallback arrangements.  Under Private Retention, content is kept in encrypted OpenAI-managed logs and excluded from human review unless the law requires it.  Under Safety Retention, used when OpenAI is investigating or preventing severe risk, content its classifiers flag may be kept and reviewed by people.  I would ask which arrangement could apply to each model before signing, not after.

If you are building on the API with confidential material:

1. Ask sales for ZDR or Modified Abuse Monitoring on every organization that handles it.
2. Build on the covered endpoints.  Keep Files, Batches, Assistants, vector stores, and the Agents API out of ZDR workloads, or accept their retention.
3. Set the retention control per project and confirm each project's setting rather than assume it inherited.
4. If you use Private Safety Processing, put the bucket under your retention schedule and your hold process.
5. Keep secrets and client identifiers out of structured output schemas.

## Azure

OpenAI models sold through Microsoft Foundry run under Microsoft's terms.  Microsoft says prompts and completions are not available to OpenAI and are not used for training without your permission.  Stored data stays in your Azure resource and geography, but Global deployments can process prompts in any region where the model runs, and DataZone deployments anywhere in the chosen data zone.

Microsoft can keep a sample of flagged prompts for human review and does not say for how long.  Managed customers can apply for modified abuse monitoring, which ends that storage but is not the same thing as ZDR.  Once approved, the resource's `ContentLogging` capability reads false.

OpenAI models are also offered through Amazon Bedrock, under AWS's terms, which I have not reviewed for this article.

## Plan by plan

| Product | Training default | How to stop training | Retention | ZDR |
| --- | --- | --- | --- | --- |
| Free, Go, Plus, Pro | On | Turn off "Improve the model for everyone" and the voice control; use temporary chats; do not rate | Until you delete; up to 30 days after | Not available |
| Codex on a personal plan | On | The main toggle plus "Include environments" | Same as the account | Not available |
| Business | Off by default | Nothing to do | Until the user deletes; up to 30 days after | Not for the app |
| Enterprise | Off by default | Same as Business | Owner-set period, 90-day minimum | Not for the app |
| API | Off since March 2023 | Nothing to do unless you opted in | Abuse logs up to 30 days; application state varies by endpoint | By approval, per organization and project, eligible endpoints only |
| Azure (Microsoft Foundry) | Off | Nothing to do | Stored features in your resource; sampled abuse data unless modified | No equivalent; modified abuse monitoring by application |

## What I would configure

If you are an individual on a personal plan, turn off "Improve the model for everyone" and the voice training control, use temporary chats for anything sensitive, delete chats and Library files when you are done, and never rate a sensitive conversation.  If you use Codex, turn off "Include environments" as well.  That stops ordinary training and holds retention to OpenAI's 30-day deletion window, with the exceptions described above.

If you are a solo consultant or a small firm handling client material, keep the personal account for personal use and put client work on Business or an API organization.  Training stops under the business terms the day the work moves.  The move does not change how earlier work in the personal account was handled, so review what went there before.  OpenAI does not document a retention setting for Business, so either delete client chats as a matter of routine or move to Enterprise.  If an engagement letter requires ZDR, the API is the only route.

If you run technology for a law firm or another regulated organization, Enterprise is the floor for ChatGPT, with an Owner-set retention period and Compliance API exports going to a system you control.  Developers get Codex signed in to the firm's workspace, with login method and workspace enforced on the device, local history off, and feedback disabled.  Application workloads get an API organization with ZDR, built on the covered endpoints.  If you adopt Private Safety Processing, the bucket it writes to is a firm repository with its own retention rule and its own place in the hold process.

Treat the retention setting for each tool as a field in the firm's data map with a named owner.  Whatever a vendor keeps is client information held by a third party.  The New York Times order showed that a vendor's deletion window can be frozen by a court in a case the firm is not part of.  A firm that records which AI tools touch each kind of client information, and how long each keeps it, can answer a client's question the day it is asked.

Vendor settings are only part of the answer for a law firm.  No-training terms and short retention are safeguards, not a finding that a workflow meets the lawyer's duty of confidentiality.  ABA Formal Opinion 512 asks lawyers to weigh the tool, the information, and the client's circumstances, and some uses need the client's informed consent.

Three habits matter on every tier.  Do not rate anything confidential on a personal plan.  Review connectors, MCP servers, and plugins on their own terms, because they sit outside OpenAI's promises.  And recheck the settings after every terms update, because OpenAI revises these pages often.

If you want these settings reviewed and written down for your organization, my [AI readiness review](/services/ai-governance) covers vendor terms, account settings, and the policy that goes with them.

## Sources

Everything above reflects OpenAI's and Microsoft's published documentation as of November 16, 2026.  Both revise these pages often, so check them before relying on a detail.

- [Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt), OpenAI Help Center
- [How your data is used to improve model performance](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance), OpenAI Help Center
- [Managing data, sharing, and privacy in ChatGPT Business](https://help.openai.com/en/articles/8798634-managing-data-sharing-and-privacy-in-chatgpt-business), OpenAI Help Center
- [Chat and file retention in ChatGPT](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt), OpenAI Help Center
- [Data retention when a member is removed from a workspace](https://help.openai.com/en/articles/8266418-data-retention-when-a-member-is-removed-from-a-workspace), OpenAI Help Center
- [Enterprise privacy at OpenAI](https://openai.com/enterprise-privacy/), OpenAI
- [Data governance and compliance](https://academy.openai.com/public/clubs/admins-6o6xf/resources/data-governance-and-compliance), OpenAI Academy
- [How we're responding to The New York Times' data demands](https://openai.com/index/response-to-nyt-data-demands/), OpenAI
- [Fighting the New York Times' invasion of user privacy](https://openai.com/index/fighting-nyt-user-privacy-invasion/), OpenAI
- [OpenAI and The New York Times](https://openai.com/new-york-times/), OpenAI
- [NYT v OpenAI: The Deleted ChatGPT Chats Order, Explained](https://www.llms-for-lawyers.com/confidentiality/nyt-v-openai-deleted-chatgpt-chats-lawyers/), LLMs for Lawyers, September 2026
- [Order terminating the preservation obligation, October 9, 2025](https://blogs.duanemorris.com/classactiondefense/wp-content/uploads/sites/56/2025/10/In-re-Open-AI-Inc.-Copyright-Infringement-Litig.-10.9.25-Order-ECF-No.-992.pdf), In re OpenAI, Inc. Copyright Infringement Litigation, S.D.N.Y.
- [Data controls in the OpenAI platform](https://developers.openai.com/api/docs/guides/your-data), OpenAI API Docs
- [ZDR with Private Safety Processing](https://developers.openai.com/api/docs/guides/private-safety-processing), OpenAI API Docs
- [Offering Zero Data Retention for frontier models](https://openai.com/index/offering-zero-data-retention-for-frontier-models/), OpenAI, August 19, 2026
- [GPT-6 Astra](https://openai.com/index/gpt-6-astra/), OpenAI
- [Codex authentication](https://developers.openai.com/codex/auth), OpenAI Developers
- [Codex configuration reference](https://developers.openai.com/codex/config-file/config-reference), OpenAI Developers
- [ChatGPT Work cloud security](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-cloud-security), OpenAI
- [Codex with Ollama](https://docs.ollama.com/integrations/codex), Ollama Docs
- [Data, privacy, and security for Models sold by Azure in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy), Microsoft Learn
- [ABA issues first ethics guidance on a lawyer's use of AI tools](https://www.americanbar.org/news/abanews/aba-news-archives/2024/07/aba-issues-first-ethics-guidance-ai-tools/), American Bar Association, July 2024
- [OpenAI previews zero-retention safety system as Anthropic requires data logs](https://www.axios.com/2026/08/19/openai-previews-zero-retention-safety-system-as-anthropic-requires-data-logs), Axios, August 19, 2026
