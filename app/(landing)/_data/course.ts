// Content for the USRC × Trinetix learning program landing page.
// Course: "From Vague Requests to Validated Requirements"
// Do not paraphrase. If copy changes, update the source document first, then mirror here.

export type ResourceType =
  | "article"
  | "video"
  | "workbook"
  | "practice"
  | "template"
  | "resource"
  | "official docs";

export type Resource = {
  type: ResourceType;
  label: string;
  url: string;
  duration?: string;
};

export type Lesson = {
  id: string;
  number: string;
  title: string;
  description: string;
  resources: Resource[];
  estimatedTime?: string;
};

export type Section = {
  lessonIds: string[];
  activity?: { label: string; body: string };
};

export type ModuleOutput = {
  name: string;
  fields: string[];
};

export type Module = {
  id: string;
  number: string;
  title: string;
  description: string;
  format: string;
  duration: string;
  purpose: string;
  lectureTopics: string[];
  lessons: Lesson[];
  sections?: Section[];
  workshops?: { title: string; body: string; items?: string[] }[];
  reading?: { body: string; items?: { label: string; url: string }[] };
  homework?: { body: string; items?: string[] };
  outcome: string;
  output?: ModuleOutput;
  didYouKnow?: string[];
  templates?: { label: string; fileName?: string; content?: string }[];
};

export type Phase = {
  id: string;
  number: 1 | 2;
  name: string;
  tagline: string;
  modulesRange: string;
  duration: string;
  modules: Module[];
};

/* ============================================================
   TEMPLATE CONTENT — AI PROMPTS
   ============================================================ */

const PROMPT_DISCOVERY_INTERVIEW_PLANNER = `Act as a business analyst, requirements discovery coach, and workflow interview facilitator.

I need to prepare for a user conversation about a vague or solution-first request. Help me plan the conversation using the exact Workflow Discovery Template structure, but do not force generic questions into every section.

Do not write final requirements.
Do not define product behaviors.
Do not design screens.
Do not create user stories or acceptance criteria.

Your job is to help me prepare a focused, relevant, non-leading interview plan that uncovers the real workflow, oversight moment, decision, exception, information need, assumptions, and validation questions behind the request.

## Input

Original vague request:
[PASTE ORIGINAL REQUEST HERE]

Known project or business context:
[PASTE CONTEXT HERE]

Known users or roles:
[LIST KNOWN USERS OR ROLES, IF ANY]

Likely interviewee role:
[ACTUAL USER / MANAGER / APPROVER / REQUESTER / PROCESS OWNER / DOWNSTREAM CONSUMER / SUPPORT ROLE / PROXY STAKEHOLDER / UNKNOWN]

Known systems, tools, or channels:
[LIST SYSTEMS, TOOLS, OR CHANNELS, IF ANY]

Known constraints:
[LIST KNOWN RULES, DEPENDENCIES, POLICIES, LIMITATIONS, OR NON-NEGOTIABLES, IF ANY]

What I already think is true:
[LIST CURRENT ASSUMPTIONS, IF ANY]

## Your Rules

1. First, identify whether the original request describes:

   * a problem,
   * a desired solution,
   * or both.

2. If the request describes a desired solution, challenge it politely using this framing:
   "This request appears to describe a solution. The underlying problem is not fully clear yet."

3. Before generating questions, classify the request pattern, discovery lens, and likely interviewee type.

4. Do not assume every request is a linear task workflow.

5. Do not mechanically fill every section with generic questions.

6. Decide what kind of discovery conversation this request needs.

7. If the request is too broad to create a useful interview plan, do not generate the full table. Instead:

   * explain why the request is too broad,
   * propose 2–3 possible discovery directions,
   * list the minimum clarification needed to proceed.

8. Prepare questions in a non-leading discovery style.

9. Prefer questions based on real past behavior, not opinions or imagined future behavior.

10. Use recent-real-example questions, but adapt the object of the question to the request type:

* "Can you walk me through the last time you completed this task?"
* "Can you walk me through the last time you reviewed this information?"
* "Can you walk me through the last time you noticed an exception?"
* "Can you walk me through the last time something was overdue, late, missing, or incorrect?"
* "Can you walk me through the last time you had to make this decision?"
* "Can you walk me through the last time you had to follow up with someone?"
* "Can you walk me through the last time you needed this information to answer a question?"

11. Avoid asking users to confirm your assumption. Instead, ask them to describe what happened.

12. Write user interview questions as if I am asking the user directly.

13. Use "you" when the interviewee is the person doing, reviewing, deciding, approving, or following up on the work.

14. Use "someone else," "another role," or the role name only when asking about work done by other people.

15. Do not invent workflow details.

16. Do not complete the Workflow Discovery Template as if facts are already known.

17. Mark missing information as:
    "Unknown / needs validation."

18. Focus only on:

* preparing for the user conversation,
* identifying assumptions,
* generating discovery questions,
* identifying signals to listen for.

19. Do not generate more than:

* 8 core interview questions,
* 5 optional follow-up probes,
* 3 highest-risk assumptions,
* 3 recommended follow-up interview areas.

20. The expected output is not requirements. The expected output is an interview-ready discovery guide.

## Request Pattern Classification

Choose the dominant request pattern and any secondary patterns.

Request patterns:

1. Task workflow
   Use when the user is completing a specific task from start to finish.

2. Monitoring / managerial view
   Use when the user needs to review many items, notice issues, prioritize, or follow up.

3. Exception management
   Use when the request is about missing, late, overdue, incorrect, failed, or blocked work.

4. Approval / decision workflow
   Use when the user must approve, reject, route, prioritize, escalate, or decide.

5. Reporting / visibility
   Use when the user needs information to answer a question, understand status, or report progress.

6. Notification / alerting
   Use when the request is about knowing something at the right time.

7. Mobile access
   Use when the request is about doing, reviewing, or deciding away from a desk.

8. Integration / duplicate entry
   Use when the request involves multiple systems, repeated entry, reconciliation, or source-of-truth problems.

9. Role / permission difference
   Use when different roles need different visibility, actions, permissions, or responsibilities.

10. Compliance / due date tracking
    Use when the request involves deadlines, licenses, training, certification, policy, audit, or required completion.

11. Mixed pattern
    Use when more than one pattern is central.

## Discovery Lens Selection

Choose the main discovery lens.

Discovery lenses:

1. Workflow discovery
   Use when the user completes a task or process.

2. Oversight discovery
   Use when the user monitors work, reviews exceptions, or follows up.

3. Decision discovery
   Use when the user decides, approves, prioritizes, routes, or escalates.

4. Exception discovery
   Use when the important work happens when something goes wrong.

5. Information-use discovery
   Use when the user needs visibility, status, reporting, or a trusted answer.

6. Compliance discovery
   Use when the work involves deadlines, rules, licenses, training, certifications, or auditability.

7. Role / access discovery
   Use when role differences, permissions, or responsibility boundaries are central.

## Interviewee Type Adaptation

Adapt questions based on who will be interviewed.

If interviewing an actual user:

* Ask what they did, checked, decided, created, updated, submitted, or communicated.

If interviewing a manager:

* Ask what they reviewed, noticed, prioritized, delegated, escalated, or followed up on.

If interviewing an approver:

* Ask what they needed to decide, what information they used, and what happened after approval or rejection.

If interviewing a requester:

* Ask what situation led to the request, what problem they observed, and who is affected.

If interviewing a process owner:

* Ask how the process is supposed to work, where it breaks, and where actual behavior differs from the intended process.

If interviewing a downstream consumer:

* Ask what information or outcome they depend on, when they need it, and what happens when it is late, missing, or wrong.

If interviewing a proxy stakeholder:

* Ask what they have directly observed, what they are assuming, and which actual users should be interviewed next.

## Question Style Rules

### Prefer

* "Can you walk me through the last time this happened?"
* "What were you trying to accomplish?"
* "What were you looking for?"
* "What made something require attention?"
* "What happened next?"
* "What did you do at that point?"
* "What information did you need?"
* "Where did you look for that information?"
* "Who else was involved?"
* "What made that situation difficult?"
* "What happened when things did not go as expected?"
* "How did you know the work was complete?"

### Avoid

* "Would a dashboard help?"
* "Do you need notifications?"
* "Should the system automate this?"
* "Do you want a status tracker?"
* "Would it be useful if…?"
* "Is the problem that users do not have visibility?"
* "Should managers be able to approve this?"
* "Do you need this on mobile?"
* "Do users need…?"
* "Would users benefit from…?"

### Convert Leading Questions Into Better Discovery Questions

| Leading question to avoid           | Better non-leading version                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------- |
| Would a dashboard help you?         | Can you walk me through the last time you needed to understand the status of this work?     |
| Do you need notifications?          | Can you tell me about the last time someone needed to know about a change or issue?         |
| Should this be automated?           | Can you walk me through the manual steps you take today?                                    |
| Do managers need approval access?   | Can you walk me through the last time approval was needed? Who was involved?                |
| Would mobile access be useful?      | Can you tell me about the last time you needed to do this away from your desk?              |
| Do you need role-based permissions? | Can you walk me through who can do what today?                                              |
| Should the system show status?      | Can you walk me through the last time you had to check where things stood?                  |
| Do users duplicate data?            | Can you walk me through where the same information is entered, checked, copied, or updated? |

## Output Format

### 1. Request Diagnosis

Use this structure:

| Item                         | Output   |
| ---------------------------- | -------- |
| Problem / solution / both    | [Answer] |
| Dominant request pattern     | [Answer] |
| Secondary request patterns   | [Answer] |
| Main discovery lens          | [Answer] |
| Likely interviewee type      | [Answer] |
| Why this classification fits | [Answer] |
| Questions to avoid           | [Answer] |
| Questions to prioritize      | [Answer] |

### 2. Discovery Challenge

If the original request is solution-led, explain:

* what solution is being requested,
* what problem is still unclear,
* what workflow, oversight moment, exception, decision, information need, or compliance risk needs to be understood first,
* what should not be assumed yet,
* how to reframe the conversation around recent real work.

### 3. Priority Discovery Areas

Use this structure:

| Discovery area | Priority | Why it matters for this request |
| -------------- | -------- | ------------------------------- |

Use priorities:

* High — ask in the first interview
* Medium — ask if time allows
* Low — do not ask unless it emerges
* Not applicable yet — skip for now

Discovery areas must map to the Workflow Discovery Template sections:

1. Vague request
2. Request describes a desired solution instead of the problem to solve
3. Primary user
4. Different roles
5. User goal
6. User task
7. Trigger
8. Workflow steps
9. Pain points
10. Decisions
11. Exceptions
12. Friction points
13. Workarounds
14. Handoffs
15. Transitions
16. Waiting steps
17. Timing and urgency reveal
18. Duplicate entries
19. Constraints

### 4. Interview Flow

Create a practical interview flow with no more than 8 core questions.

Use this structure:

| Interview phase | Purpose | Core question | Optional follow-up |
| --------------- | ------- | ------------- | ------------------ |

Rules:

* Questions must be direct, as if I am asking the user.
* Questions must be non-leading.
* Questions must match the request pattern and discovery lens.
* Questions should follow a natural conversation arc.
* Avoid repeating the same question in different words.

### 5. Workflow Discovery Template Mapping

Use this exact table structure:

| Section | What we know before the conversation | Assumptions / unknowns | Questions to ask users | Signals to listen for, without prompting | Notes |
| ------- | ------------------------------------ | ---------------------- | ---------------------- | ---------------------------------------- | ----- |

Use the following sections in this exact order:

1. Vague request
2. Request describes a desired solution instead of the problem to solve
3. Primary user
4. Different roles
5. User goal
6. User task
7. Trigger
8. Workflow steps
9. Pain points
10. Decisions
11. Exceptions
12. Friction points
13. Workarounds
14. Handoffs
15. Transitions
16. Waiting steps
17. Timing and urgency reveal
18. Duplicate entries
19. Constraints

For each section:

* provide what is currently known,
* provide what is assumed or unknown,
* provide a relevant non-leading question only if the section is high or medium priority,
* if the section is low priority or not applicable yet, write "Low priority for this interview" or "Not applicable yet,"
* identify signals to listen for without prompting,
* add notes for the interviewer.

Important:

* Do not force every section to have questions.
* Do not use the same generic question across sections.
* Prioritize quality and relevance over completeness.
* Avoid repeating similar questions across sections.

Exception:
For **Section 1. Vague request**, only state the original request and any immediate notes about how it is framed. Do not generate user questions or signals for this section.

For Section 1:

* Questions to ask users: "N/A — original request only."
* Signals to listen for: "N/A — covered in Section 2."

### 6. Top Questions to Ask First

List no more than 8 core questions.

Prioritize questions that:

* match the request pattern,
* ask about a recent real example,
* reveal actual behavior,
* uncover workflow, monitoring, decision, exception, information-use, role, or compliance logic,
* identify roles and handoffs,
* expose pain points without suggesting a solution,
* separate facts from assumptions.

### 7. Highest-Risk Assumptions

List no more than 3 assumptions that should not be introduced as facts during the interview.

Use this structure:

| Assumption | Why it is risky | How to validate without leading |
| ---------- | --------------- | ------------------------------- |

### 8. Follow-Up Interview Areas

List no more than 3 areas that may need a follow-up interview after the first conversation.

Use this structure:

| Follow-up area | Why it may need follow-up | Who to interview |
| -------------- | ------------------------- | ---------------- |

### 9. Interview Readiness Check

Rate readiness for the user conversation:

* Red: Too little context to conduct a useful interview.
* Yellow: Enough context to conduct discovery, but many assumptions remain.
* Green: Strong enough context to run a focused workflow conversation.

Explain the rating in 3–5 bullets.

Remember: The goal is to prepare for workflow discovery, not to produce final requirements.`;

const PROMPT_DISCOVERY_TRANSCRIPT_ANALYZER = `Act as a business analyst, UX researcher, requirements discovery coach, and workflow analyst.

I will provide a user interview transcript or detailed conversation notes. Analyze the transcript and turn it into a structured Workflow Discovery analysis.

Do not write final requirements.
Do not define product behaviors.
Do not design screens.
Do not create user stories or acceptance criteria.
Do not create IA prototype instructions.

Your job is to analyze what the transcript actually supports, extract the real workflow or discovery pattern, separate evidence from assumptions, and identify what still needs validation.

The expected Module 1 output is:

* workflow understanding,
* assumptions,
* transcript-supported observations,
* questions to validate,
* follow-up interview needs.

## Input

Original vague request:
[PASTE ORIGINAL REQUEST HERE]

Interview transcript or detailed notes:
[PASTE FULL TRANSCRIPT OR NOTES HERE]

Interview participant role:
[ACTUAL USER / MANAGER / APPROVER / REQUESTER / PROCESS OWNER / DOWNSTREAM CONSUMER / SUPPORT ROLE / PROXY STAKEHOLDER / UNKNOWN]

Known project or business context:
[PASTE CONTEXT HERE]

Known users or roles:
[LIST KNOWN USERS OR ROLES, IF ANY]

Known systems, tools, or channels:
[LIST SYSTEMS, TOOLS, OR CHANNELS, IF ANY]

Known constraints:
[LIST KNOWN RULES, DEPENDENCIES, POLICIES, LIMITATIONS, OR NON-NEGOTIABLES, IF ANY]

What I already thought was true before the interview:
[LIST PRIOR ASSUMPTIONS, IF ANY]

Output mode:
[SHORT / FULL]

## Output Mode Rules

If **Output mode is SHORT**, provide only:

1. Transcript Diagnosis
2. Transcript-Based Discovery Summary
3. Evidence vs. Inference vs. Assumption
4. Top Questions to Validate Next
5. Readiness Check

Use SHORT mode when:

* the transcript is short,
* the team needs quick synthesis,
* the goal is to decide whether more discovery is needed,
* the full 19-section Workflow Discovery Template is not needed yet.

If **Output mode is FULL**, provide all sections:

1. Transcript Diagnosis
2. Transcript-Based Discovery Summary
3. Workflow Discovery Template Mapping
4. Evidence vs. Inference vs. Assumption
5. User Language and Terminology
6. Contradictions, Gaps, and Ambiguities
7. Top Questions to Validate Next
8. Highest-Risk Assumptions
9. Recommended Follow-Up Interviews
10. Readiness Check

Use FULL mode when:

* the transcript is substantial,
* the team needs a reusable handoff artifact,
* the analysis will be used to populate the Workflow Discovery Template,
* the team needs traceability across all discovery sections.

If the output mode is missing, default to **SHORT** and state:
"Output mode was not specified, so I am using SHORT mode."

## Your Rules

1. Use the transcript as the primary evidence source.

2. First, identify whether the original request describes:

   * a problem,
   * a desired solution,
   * or both.

3. If the original request or interviewee describes a desired solution, challenge it politely using this framing:
   "This appears to describe a solution. The underlying problem or workflow need still requires validation."

4. Before filling the template, classify:

   * request pattern,
   * discovery lens,
   * interviewee type,
   * perspective represented,
   * perspectives missing,
   * evidence quality.

5. Do not assume every request is a linear task workflow.

6. Do not mechanically fill every section with generic content.

7. Do not invent workflow details.

8. Do not treat assumptions as facts.

9. Separate:

   * directly stated facts,
   * inferred observations,
   * assumptions,
   * unknowns,
   * contradictions or gaps.

10. If a section is not supported by the transcript, write:
    "Not stated in transcript / needs validation."

11. If a section is low relevance for this transcript, write:
    "Low relevance in this transcript."

12. If you infer something, label it clearly as:
    "Inference."

13. Preserve important user language and terminology where useful.

14. Use short evidence snippets only when they clarify the finding. Do not over-quote.

15. Do not move into requirements, product behavior, design, or IA prototype recommendations.

16. Focus only on:

* transcript-supported workflow understanding,
* assumptions,
* open questions,
* validation needs,
* follow-up interview needs.

17. If the transcript is too thin, fragmented, or unclear, say so explicitly. Do not create false completeness.

18. If the interviewee is a proxy stakeholder, clearly separate what they directly observed from what they believe or assume.

## Request Pattern Classification

Choose the dominant request pattern and any secondary patterns.

Request patterns:

1. Task workflow
   Use when the user is completing a specific task from start to finish.

2. Monitoring / managerial view
   Use when the user reviews many items, notices issues, prioritizes, follows up, or oversees work.

3. Exception management
   Use when the request is about missing, late, overdue, incorrect, failed, or blocked work.

4. Approval / decision workflow
   Use when the user must approve, reject, route, prioritize, escalate, or decide.

5. Reporting / visibility
   Use when the user needs information to answer a question, understand status, or report progress.

6. Notification / alerting
   Use when the request is about knowing something at the right time.

7. Mobile access
   Use when the request is about doing, reviewing, or deciding away from a desk.

8. Integration / duplicate entry
   Use when the request involves multiple systems, repeated entry, reconciliation, or source-of-truth problems.

9. Role / permission difference
   Use when different roles need different visibility, actions, permissions, or responsibilities.

10. Compliance / due date tracking
    Use when the request involves deadlines, licenses, training, certification, policy, audit, or required completion.

11. Mixed pattern
    Use when more than one pattern is central.

## Discovery Lens Selection

Choose the main discovery lens.

Discovery lenses:

1. Workflow discovery
   Use when the transcript describes a task or process.

2. Oversight discovery
   Use when the transcript describes monitoring, reviewing, noticing, prioritizing, or following up.

3. Decision discovery
   Use when the transcript describes deciding, approving, prioritizing, routing, or escalating.

4. Exception discovery
   Use when the transcript describes what happens when something goes wrong.

5. Information-use discovery
   Use when the transcript describes visibility, status, reporting, or trusted information needs.

6. Compliance discovery
   Use when the transcript describes deadlines, rules, licenses, training, certifications, or auditability.

7. Role / access discovery
   Use when the transcript describes role differences, permissions, or responsibility boundaries.

## Evidence Strength Scale

For each major finding, classify evidence strength:

* Strong evidence — directly and clearly stated in the transcript.
* Partial evidence — mentioned but incomplete or unclear.
* Weak evidence — implied but not directly stated.
* Not stated — no transcript support.
* Contradictory — transcript contains conflicting or inconsistent information.

## Output Format

## SHORT Mode Output

Use this output only when Output mode is SHORT.

### 1. Transcript Diagnosis

Use this structure:

| Item                           | Output                                             |
| ------------------------------ | -------------------------------------------------- |
| Problem / solution / both      | [Answer]                                           |
| Dominant request pattern       | [Answer]                                           |
| Secondary request patterns     | [Answer]                                           |
| Main discovery lens            | [Answer]                                           |
| Interviewee type               | [Answer]                                           |
| Perspective represented        | [Whose view does this transcript represent?]       |
| Perspectives missing           | [Which roles or perspectives are not represented?] |
| Evidence quality               | [Strong / Partial / Weak / Mixed]                  |
| Why this classification fits   | [Answer]                                           |
| Areas not sufficiently covered | [Answer]                                           |

### 2. Transcript-Based Discovery Summary

Summarize in plain language:

* what the interviewee described,
* what workflow, oversight moment, exception, decision, information need, or compliance issue appears to be involved,
* what the interviewee actually does or observes,
* what the interviewee needs to know, decide, complete, escalate, or follow up on,
* what is still unclear,
* what should not be assumed yet.

Keep this summary evidence-based. Do not add requirements.

### 3. Evidence vs. Inference vs. Assumption

Create a table:

| Directly supported by transcript | Inference | Assumption / unknown | Validation needed |
| -------------------------------- | --------- | -------------------- | ----------------- |

Rules:

* Put only directly stated items in the first column.
* Put reasoned interpretations in the inference column.
* Put unconfirmed beliefs or missing details in the assumption / unknown column.
* Explain how each assumption or inference should be validated.

### 4. Top Questions to Validate Next

List no more than 8 follow-up questions.

Prioritize questions that:

* address gaps in the transcript,
* validate assumptions,
* clarify weak evidence,
* include missing roles,
* clarify workflow, oversight, decision, exception, information-use, role, or compliance logic,
* avoid leading the user toward a solution.

Write questions as direct user-facing questions.

### 5. Readiness Check

Rate readiness for moving from Module 1 workflow discovery to Module 2 requirement hypotheses:

* Red: Too many unknowns to move forward.
* Yellow: Workflow or discovery pattern is partly understood, but more validation is needed.
* Green: Enough workflow understanding to begin drafting requirement hypotheses in the next module.

Explain the rating in 3–5 bullets.

Remember: The goal is to analyze transcript evidence, not to produce final requirements.

## FULL Mode Output

Use this output only when Output mode is FULL.

### 1. Transcript Diagnosis

Use this structure:

| Item                           | Output                                             |
| ------------------------------ | -------------------------------------------------- |
| Problem / solution / both      | [Answer]                                           |
| Dominant request pattern       | [Answer]                                           |
| Secondary request patterns     | [Answer]                                           |
| Main discovery lens            | [Answer]                                           |
| Interviewee type               | [Answer]                                           |
| Perspective represented        | [Whose view does this transcript represent?]       |
| Perspectives missing           | [Which roles or perspectives are not represented?] |
| Evidence quality               | [Strong / Partial / Weak / Mixed]                  |
| Why this classification fits   | [Answer]                                           |
| Areas not sufficiently covered | [Answer]                                           |

### 2. Transcript-Based Discovery Summary

Summarize in plain language:

* what the interviewee described,
* what workflow, oversight moment, exception, decision, information need, or compliance issue appears to be involved,
* what the interviewee actually does or observes,
* what the interviewee needs to know, decide, complete, escalate, or follow up on,
* what is still unclear,
* what should not be assumed yet.

Keep this summary evidence-based. Do not add requirements.

### 3. Workflow Discovery Template Mapping

Use this exact table structure:

| Section | What the transcript supports | Evidence strength | Assumptions / unknowns | Questions to validate with users | Signals / patterns identified | Notes |
|---|---|---|---|---|---|

Use the following sections in this exact order:

1. Vague request
2. Request describes a desired solution instead of the problem to solve
3. Primary user
4. Different roles
5. User goal
6. User task
7. Trigger
8. Workflow steps
9. Pain points
10. Decisions
11. Exceptions
12. Friction points
13. Workarounds
14. Handoffs
15. Transitions
16. Waiting steps
17. Timing and urgency reveal
18. Duplicate entries
19. Constraints

For each section:

* summarize only what the transcript supports,
* mark evidence strength,
* identify assumptions and unknowns,
* write validation questions only when validation is needed,
* identify signals or patterns that appeared in the transcript,
* add notes for future discovery.

Important:

* Do not force every section to appear complete.
* Do not invent missing workflow steps.
* Do not turn weak evidence into a confident conclusion.
* Do not use generic validation questions if the transcript already gives a clear answer.
* If the section is unsupported, write "Not stated in transcript / needs validation."
* If the section is not central to this transcript, write "Low relevance in this transcript."

Exception:
For **Section 1. Vague request**, only preserve the original request and immediate framing. Do not generate validation questions unless the original request itself is unclear.

### 4. Evidence vs. Inference vs. Assumption

Create a table:

| Directly supported by transcript | Inference | Assumption / unknown | Validation needed |
| -------------------------------- | --------- | -------------------- | ----------------- |

Rules:

* Put only directly stated items in the first column.
* Put reasoned interpretations in the inference column.
* Put unconfirmed beliefs or missing details in the assumption / unknown column.
* Explain how each assumption or inference should be validated.

### 5. User Language and Terminology

Capture important words or phrases from the transcript.

Use this structure:

| User term or phrase | Possible meaning | Needs clarification? |
| ------------------- | ---------------- | -------------------- |

Include:

* user terms,
* system names,
* status names,
* role names,
* exception language,
* urgency language,
* informal workaround language.

### 6. Contradictions, Gaps, and Ambiguities

List any contradictions or unclear areas.

Use this structure:

| Issue | Why it matters | Follow-up question |
| ----- | -------------- | ------------------ |

Include:

* conflicting statements,
* unclear ownership,
* unclear source of truth,
* unclear role difference,
* unclear trigger,
* unclear completion point,
* unclear exception handling,
* missing perspective.

If no contradictions are visible, write:
"No explicit contradictions found in the transcript. Gaps may still exist because this is only one perspective."

### 7. Top Questions to Validate Next

List no more than 8 follow-up questions.

Prioritize questions that:

* address gaps in the transcript,
* validate assumptions,
* clarify weak evidence,
* include missing roles,
* clarify workflow, oversight, decision, exception, information-use, role, or compliance logic,
* avoid leading the user toward a solution.

Write questions as direct user-facing questions.

### 8. Highest-Risk Assumptions

List no more than 3 assumptions that should not move forward without validation.

Use this structure:

| Assumption | Why it is risky | How to validate without leading |
| ---------- | --------------- | ------------------------------- |

### 9. Recommended Follow-Up Interviews

List no more than 3 follow-up interviews.

Use this structure:

| Who to interview | Why | What to validate |
| ---------------- | --- | ---------------- |

Choose only roles that are needed based on transcript gaps.

### 10. Readiness Check

Rate readiness for moving from Module 1 workflow discovery to Module 2 requirement hypotheses:

* Red: Too many unknowns to move forward.
* Yellow: Workflow or discovery pattern is partly understood, but more validation is needed.
* Green: Enough workflow understanding to begin drafting requirement hypotheses in the next module.

Explain the rating in 3–5 bullets.

Remember: The goal is to analyze transcript evidence, not to produce final requirements.`;

const HOW_TO_USE_DISCOVERY_INTERVIEW_PLANNER = `Use this prompt before a user interview or discovery conversation when you receive a vague, broad, or solution-first request.

It is especially helpful when the request sounds like:

* "We need a dashboard."
* "We need a manager view."
* "We need notifications."
* "We need automation."
* "We need mobile access."
* "We need better visibility."

The prompt helps you prepare a focused interview plan by identifying the likely request pattern, choosing the right discovery lens, and generating non-leading questions based on real past behavior.

### When to Use It

Use this prompt when you need to:

* prepare for a workflow discovery conversation,
* understand the real work behind a vague request,
* avoid jumping directly to requirements or screens,
* uncover assumptions and unknowns,
* prepare questions for users, managers, approvers, or process owners,
* decide which parts of the Workflow Discovery Template matter most for the first interview.

### How to Use It

1. Paste the original request exactly as it was stated.
2. Add any known business context, roles, tools, systems, and constraints.
3. Add what you currently think is true, but label it as assumptions.
4. Run the prompt.
5. Review the request diagnosis and interview flow first.
6. Use the suggested questions as a starting point, not as a fixed script.
7. Adjust the questions based on the actual interviewee and conversation.
8. After the interview, capture what you learned in the Workflow Discovery Template.

### Important Note

This prompt uses AI to help prepare discovery questions. AI output can be incomplete, generic, or wrong. Always review the output before using it with users.

Check that:

* the questions fit the request and interviewee,
* the questions are non-leading,
* the output does not treat assumptions as facts,
* irrelevant sections are not forced into the interview,
* the interview flow feels natural and practical,
* the prompt did not invent workflow details.

Use AI as a thinking partner, not as the source of truth. The source of truth is what users actually say, do, need, and validate.`;

const HOW_TO_USE_DISCOVERY_TRANSCRIPT_ANALYZER = `Use this prompt after a user interview, discovery conversation, workshop, or observation session when you have a transcript or detailed notes.

The prompt helps you analyze what was actually said, separate evidence from assumptions, and identify what still needs validation before moving toward requirements.

### When to Use It

Use this prompt when you need to:

* analyze a user interview transcript,
* summarize discovery notes,
* extract workflow understanding from a conversation,
* identify assumptions and unknowns,
* find gaps or contradictions,
* prepare follow-up questions,
* decide whether the team is ready to move from workflow discovery to requirement hypotheses.

Use **SHORT mode** when you need a quick synthesis.
Use **FULL mode** when you need a more complete handoff artifact and want to map findings into the Workflow Discovery Template.

### How to Use It

1. Paste the original request exactly as it was stated.
2. Paste the full interview transcript or detailed notes.
3. Add the interview participant's role.
4. Add any known context, systems, constraints, and prior assumptions.
5. Choose the output mode: **SHORT** or **FULL**.
6. Run the prompt.
7. Review the output carefully.
8. Use the validation questions and follow-up interview recommendations to plan the next discovery step.
9. Update the Workflow Discovery Template only with information that is supported by the transcript or clearly marked as an assumption.

### Important Note

This prompt uses AI to support transcript analysis. AI output can be incomplete, generic, or wrong. It may overstate weak evidence, miss nuance, or turn assumptions into conclusions.

Always check that:

* the output is grounded in the transcript,
* user statements are not taken out of context,
* assumptions are clearly marked,
* weak evidence is not treated as fact,
* missing perspectives are identified,
* validation questions are relevant and non-leading,
* the output does not jump into requirements, product behavior, or design.

Use AI as an analysis assistant, not as the source of truth. The source of truth is the transcript, the user's actual words, observed behavior, and later validation.`;

/* ============================================================
   HERO
   ============================================================ */
export const hero = {
  headline: "From Vague Requests to Validated Requirements",
  audienceTags: ["BAs", "BSAs", "PMs", "Delivery leads", "IT partners", "Business stakeholders", "Vendor teams"],
  coreOutcome:
    "Participants learn how to turn high-level business requests into clearer, validated, buildable requirements using collaborative discovery, lightweight prototyping, and live validation.",
};

/* ============================================================
   BASIC DETAILS (§2)
   ============================================================ */
export const basicDetails = {
  audience:
    "BAs, BSAs, PMs, delivery leads, IT partners, business stakeholders, vendor product/design/delivery teams.",
  coreOutcome:
    "Participants learn how to turn high-level business requests into clearer, validated, buildable requirements using collaborative discovery, lightweight prototyping, and live validation.",
  format: [
    { label: "Presentation", description: "Concepts & principles" },
    { label: "Exercises", description: "Practice time and space" },
    { label: "Reading", description: "Curated videos & articles for deeper exploration" },
    { label: "Reusable Templates", description: "Ready-to-use work artifacts" },
    { label: "Reusable Prompts", description: "Copy-paste AI starters" },
  ],
  inScope:
    "Improving requirements velocity and accuracy through better elicitation, workflow mapping, IA prototyping, continuous validation, and clearer handoff between client and vendor teams.",
  outOfScope:
    "Deep UX training, final UI design, advanced Figma skills, technical architecture, development planning, and treating AI/Figma Make prototypes as final solutions.",
};

/* ============================================================
   ABOUT THE PROGRAM (§3)
   ============================================================ */
export const aboutProgram = {
  paragraphs: [
    "Better requirements faster: fewer interpretation gaps, fewer late surprises, fewer rework cycles, and more confidence before design and development begin.",
    "This course gives business and technical teams a working method: understand how users think, map workflows before screens, structure requirement hypotheses, prototype to validate assumptions, and hand off requirements that design and delivery can actually use.",
  ],
};

/* ============================================================
   SKILLS / OUTCOMES (§4)
   ============================================================ */
export const outcomes = {
  heading: "By the end, participants can",
  groups: [
    {
      label: "User Understanding",
      items: [
        { text: "Explain why users think in tasks and workarounds, not in features." },
        { text: "Use a User Thinking Canvas to capture roles, goals, triggers, and evidence sources." },
      ],
    },
    {
      label: "Interface Literacy",
      items: [
        { text: "Read a screen by its structural components: forms, tables, filters, statuses, and states." },
        { text: "Identify where business rules, cognitive load, and missing requirements hide in UI.", highlight: true },
      ],
    },
    {
      label: "Requirements Craft",
      items: [
        { text: "Transform vague requests into structured requirement hypotheses with context, user, task, and validation questions." },
        { text: "Map workflows to find hidden requirements in handoffs, exceptions, and approvals." },
      ],
    },
    {
      label: "Prototyping & Validation",
      items: [
        { text: "Use Figma Make or AI tools to create IA prototypes as validation artifacts, not design deliverables.", highlight: true },
        { text: "Run lightweight validation sessions and capture evidence, not opinions." },
        { text: "Package validated requirements into a handoff that design and delivery teams can use." },
      ],
    },
  ],
};

/* ============================================================
   COURSE FACTS (§5)
   ============================================================ */
export const courseFacts = {
  heading: "Course facts",
  stats: [
    { value: "2", label: "Phases" },
    { value: "7", label: "Modules" },
    { value: "8", label: "Artifacts" },
    { value: "Requirements", label: "Focus" },
  ],
};

/* ============================================================
   COURSE STRUCTURE OVERVIEW (§5)
   ============================================================ */
export const courseStructure = {
  heading: "Course structure",
  phases: [
    {
      number: 1,
      name: "Foundation",
      modulesRange: "Modules 01–03",
      duration: "TBD",
      description:
        "Universal track for everyone: business, IT, operations, product, delivery, and vendor teams. General design judgment for requirements work.",
    },
    {
      number: 2,
      name: "Prototyping & Validation",
      modulesRange: "Modules 04–07",
      duration: "TBD",
      description:
        "Hands-on prototyping with Figma Make (broad audience) and AI tools (advanced BSAs), continuous validation, and requirements handoff.",
    },
  ],
};

/* ============================================================
   CURRICULUM — 2 phases × 7 modules
   ============================================================ */
export const curriculum: { heading: string; phases: Phase[] } = {
  heading: "What's covered",
  phases: [
    /* ============================================================
       PHASE 1 — FOUNDATION (Modules 01–04)
       ============================================================ */
    {
      id: "phase-1",
      number: 1,
      name: "Foundation",
      tagline:
        "Universal track for everyone: business, IT, operations, product, delivery, and vendor teams. General design judgment for requirements work.",
      modulesRange: "Modules 01–03",
      duration: "TBD",
      modules: [
        {
          id: "module-01",
          number: "01",
          title: "Understanding Users Through Workflow",
          description:
            "This module helps participants move beyond vague requests by uncovering the real work behind. Participants learn to separate problem space from solution space, map workflows, ask better questions, listen for signals, and turn findings into early requirement hypotheses.",
          format: "Presentation 15 min",
          duration: "TBD",
          purpose: "Help participants understand why vague requirements happen: stakeholders describe solutions, users describe symptoms, and teams interpret through different mental models.",
          lectureTopics: [
            "Solution Space vs Problem Space",
            "Decoding vague requests",
            "Mapping real work",
            "Asking good questions and listening for signals",
            "Requirement Hypothesis",
          ],
          lessons: [
            {
              id: "1-1",
              number: "1.1",
              title: "Users think in tasks, goals, workarounds, risks, and interruptions",
              description: "Users do not think in features. Understanding this gap is the first step to better requirements.",
              resources: [],
            },
            {
              id: "1-2",
              number: "1.2",
              title: "Jobs-to-be-done as a practical requirements lens",
              description: "JTBD reframes requirements from features to outcomes. A practical tool for elicitation.",
              resources: [],
            },
            {
              id: "1-4",
              number: "1.4",
              title: "Why \"what do you need?\" often produces weak requirements",
              description: "The most common elicitation question is also the weakest. Better questions lead to better requirements.",
              resources: [],
            },
            {
              id: "1-5",
              number: "1.5",
              title: "Stakeholder input vs. user evidence vs. requirements",
              description: "These three are different things. Confusing them is a common source of weak requirements.",
              resources: [],
            },
          ],
          workshops: [
            {
              title: "Live Exercises",
              body: "",
            },
          ],
          reading: {
            body: "",
            items: [
              { label: "Problem Space and Solution Space Research (video)", url: "https://www.nngroup.com/videos/problem-solution-space/" },
              { label: "UX Mapping Methods: When to Use Which (video)", url: "https://www.nngroup.com/articles/ux-mapping-cheat-sheet/" },
              { label: "Wireflows: A UX Deliverable for Workflows and Apps (article)", url: "https://www.nngroup.com/articles/wireflows/" },
            ],
          },
          homework: {
            body: "TBD",
          },
          output: {
            name: "User Thinking Canvas",
            fields: [
              "User role",
              "Goal",
              "Trigger",
              "Current behavior",
              "Pain point",
              "Workaround",
              "Decision needed",
              "Evidence source",
              "Reusable prompt: TBD",
            ],
          },
          outcome:
            "After this module, a participant understands why users and stakeholders describe needs differently, can use the JTBD lens for elicitation, and has a User Thinking Canvas for structuring user understanding.",
          templates: [
            { label: "Workflow Discovery Template", fileName: "Workflow_Discovery_Template.pages" },
            { label: "AI Prompt: Discovery Interview Planner", content: PROMPT_DISCOVERY_INTERVIEW_PLANNER },
            { label: "How to Use: AI Prompt — Discovery Interview Planner", content: HOW_TO_USE_DISCOVERY_INTERVIEW_PLANNER },
            { label: "AI Prompt: Discovery Transcript Analyzer", content: PROMPT_DISCOVERY_TRANSCRIPT_ANALYZER },
            { label: "How to Use: AI Prompt — Discovery Transcript Analyzer", content: HOW_TO_USE_DISCOVERY_TRANSCRIPT_ANALYZER },
          ],
        },
        {
          id: "module-02",
          number: "02",
          title: "From Workflow Signals and Requirement Hypothesis to Product Behavior",
          description:
            "This module helps participants translate workflow findings into what the system may need to show, allow, prevent, track, or escalate. Participants learn to define product behavior categories, rules, states, and interface questions that prepare the team for screen anatomy, IA prototyping, and validation.",
          format: "Presentation 15 min",
          duration: "TBD",
          purpose: "Help participants translate workflow findings into what the system may need to show, allow, prevent, track, or escalate.",
          lectureTopics: [
            "Product behavior categories",
            "Product behavior and behavior questions",
            "Product behavior verbs",
            "Behavior rules. Conditions that change what the system does.",
            "Behavior-to-interface bridge",
          ],
          lessons: [],
          workshops: [
            {
              title: "Exercises",
              body: "TBD",
            },
          ],
          reading: {
            body: "TBD",
          },
          homework: {
            body: "TBD",
          },
          outcome:
            "After this module, a participant can read a screen by its structural components, identify where business rules and requirements hide, and use the Screen Anatomy Checklist for requirement conversations. Reusable prompt: Design Literacy & Cognitive Load Check.",
        },
        {
          id: "module-03",
          number: "03",
          title: "Interface Anatomy for Better Requirements",
          description:
            "This module helps participants understand how screens communicate product behavior, user actions, rules, states, and information needs. Participants learn to use interface anatomy as a requirements discovery tool, not as visual design training.",
          format: "Presentation 15 min",
          duration: "TBD",
          purpose: "Help participants understand how screens communicate product behavior, user actions, rules, states, and information needs.",
          lectureTopics: [
            "Why screen anatomy matters for requirements",
            "From product behavior to interface elements",
            "Basic anatomy of a screen",
            "Interface elements as requirement clues",
            "States, rules, and edge cases",
            "Web vs. mobile requirements",
          ],
          lessons: [],
          workshops: [
            {
              title: "Exercises",
              body: "TBD",
            },
          ],
          reading: {
            body: "TBD",
          },
          homework: {
            body: "TBD",
          },
          outcome:
            "After this module, a participant can read interface anatomy as a requirements discovery tool and identify hidden requirements in screen elements, states, and rules.",
        },
      ],
    },
    /* ============================================================
       PHASE 2 — PROTOTYPING & VALIDATION (Modules 05A–07)
       ============================================================ */
    {
      id: "phase-2",
      number: 2,
      name: "Prototyping & Validation",
      tagline:
        "Hands-on prototyping with Figma Make (broad audience) and AI tools (advanced BSAs), continuous validation, and requirements handoff.",
      modulesRange: "Modules 04–07",
      duration: "TBD",
      modules: [
        {
          id: "module-04",
          number: "04",
          title: "IA Prototyping with Figma Make",
          description:
            "Participants use workflow maps, requirement hypotheses, product behaviors, and interface questions to create a rough IA prototype in Figma Make. The focus is not polished UI design, but making assumptions visible enough to support discussion, validation, and better requirements handoff.",
          format: "Lecture, demo, and workshop",
          duration: "TBD",
          purpose: "Help participants use Figma Make to quickly externalize structure, flows, roles, screens, and decision points so they can validate requirements earlier. This module focuses on information architecture and workflow clarity, not visual polish.",
          lectureTopics: [
            "IA prototype vs. UI prototype: structure, flow, grouping, roles, and terminology before visual polish.",
            "Where requirements hide in IA: navigation, categories, statuses, filters, permissions, empty states, exception paths, data sources, and notifications.",
            "How to prompt Figma Make from a requirement hypothesis, not from a vague feature request.",
            "How to use a generated prototype to identify assumptions, missing rules, unclear terminology, and validation questions.",
            "How to treat Figma Make output as a conversation artifact, not as design direction.",
          ],
          lessons: [
            {
              id: "5a-1",
              number: "5A.1",
              title: "IA prototype vs. UI prototype",
              description: "Structure, flow, grouping, roles, and terminology come before visual polish. Understanding this distinction changes how you prompt and how you evaluate output.",
              resources: [],
            },
            {
              id: "5a-2",
              number: "5A.2",
              title: "Where requirements hide in IA",
              description: "Navigation, categories, statuses, filters, permissions, empty states, exception paths, data sources, and notifications all carry requirement decisions.",
              resources: [],
            },
            {
              id: "5a-3",
              number: "5A.3",
              title: "Prompting Figma Make from a requirement hypothesis",
              description: "A good prompt starts with a structured requirement, not a vague feature request. Prompt quality drives prototype quality.",
              resources: [],
            },
            {
              id: "5a-4",
              number: "5A.4",
              title: "Using a prototype to find assumptions and gaps",
              description: "Mark what seems confirmed, invented, missing, or unclear. The prototype is a thinking tool, not a deliverable.",
              resources: [],
            },
            {
              id: "5a-5",
              number: "5A.5",
              title: "Prototype as conversation artifact, not design direction",
              description: "Figma Make output is disposable. Its value is in the conversations it enables, not in its pixels.",
              resources: [],
            },
          ],
          workshops: [
            {
              title: "Workshop",
              body: "Create a simple IA prototype for a non-clinical process. Participants start with a vague request, for example: \"We need a better way to manage support requests.\" Then they:",
              items: [
                "Define the user, goal, workflow, and known information",
                "Write a Figma Make prompt",
                "Generate a low-fidelity IA prototype",
                "Mark what seems confirmed, invented, missing, or unclear",
                "Create validation questions for users or stakeholders",
              ],
            },
          ],
          reading: {
            body: "TBD",
          },
          homework: {
            body: "Create one Figma Make IA prototype for a current or realistic process and identify:",
            items: [
              "3 assumptions the prototype made",
              "3 missing or unclear requirements",
              "3 validation questions",
              "1 workflow or IA change based on expected feedback",
            ],
          },
          output: {
            name: "Figma Make IA Prototype Pack",
            fields: ["TBD"],
          },
          outcome:
            "After this module, a participant can use Figma Make to create IA prototypes as validation artifacts, identify assumptions and gaps in generated output, and formulate validation questions for stakeholders.",
        },
        {
          id: "module-05",
          number: "05",
          title: "Advanced IA Prototyping with Claude",
          description:
            "Participants use Claude to refine IA prototype inputs, structure complex product behavior, generate screen-by-screen logic. This module focuses on using AI as a reasoning partner to clarify roles, rules, states, edge cases, validation questions, and handoff-ready prototype guidance before detailed design begins.",
          format: "Lecture, demo, and workshop",
          duration: "TBD",
          purpose: "Help BSAs use Claude Design or similar tools responsibly during elicitation.",
          lectureTopics: [
            "AI prototype as conversation artifact.",
            "Prompting from workflow, not from vague feature requests.",
            "How to preserve assumptions and open questions.",
            "How to avoid over-polished prototypes.",
            "How to document what changed during live validation.",
          ],
          lessons: [
            {
              id: "5b-1",
              number: "5B.1",
              title: "AI prototype as conversation artifact",
              description: "An AI prototype should enable conversations, not replace them. Every generated screen carries implicit assumptions that need validation.",
              resources: [],
            },
            {
              id: "5b-2",
              number: "5B.2",
              title: "Prompting from workflow, not from feature requests",
              description: "A structured workflow produces better prompts than a vague feature description. Start from the map, not from the wish list.",
              resources: [],
            },
            {
              id: "5b-3",
              number: "5B.3",
              title: "Preserving assumptions and open questions",
              description: "Every AI-generated prototype should include visible annotations: Assumption, Needs validation, Business rule unknown, Source of truth unknown, Role/access unknown.",
              resources: [],
            },
            {
              id: "5b-4",
              number: "5B.4",
              title: "Avoiding over-polished prototypes",
              description: "The more polished a prototype looks, the more stakeholders treat it as final. Keep fidelity low to keep conversation productive.",
              resources: [],
            },
            {
              id: "5b-5",
              number: "5B.5",
              title: "Documenting what changed during live validation",
              description: "Feedback during validation changes requirements. How to capture those changes systematically.",
              resources: [],
            },
          ],
          workshops: [
            {
              title: "Workshop",
              body: "Start with a vague request and create:",
              items: [
                "A requirement hypothesis",
                "A workflow sketch",
                "An AI prototype prompt",
                "A prototype",
                "A validation script",
              ],
            },
          ],
          reading: {
            body: "TBD",
          },
          homework: {
            body: "Bring one real or realistic vague request and produce an AI prototype package:",
            items: [
              "Prompt",
              "Prototype",
              "Assumptions",
              "Validation questions",
              "Captured feedback structure",
            ],
          },
          output: {
            name: "AI Prototype Elicitation Pack",
            fields: ["TBD"],
          },
          outcome:
            "After this module, a participant can use AI tools to create prototypes as elicitation instruments, annotate assumptions, and document what changed during validation.",
        },
        {
          id: "module-06",
          number: "06",
          title: "Validating the Requirements and the Prototype",
          description:
            "This module helps participants validate continuously, cheaply, and appropriately before detailed design or development begins. Participants learn how to test requirement hypotheses, prototype assumptions, workflow fit, terminology, roles, rules, and edge cases so teams can reduce rework and move forward with stronger evidence.",
          format: "Lecture and workshop",
          duration: "TBD",
          purpose: "Teach teams to validate continuously, cheaply, and appropriately.",
          lectureTopics: [
            "What to validate at each stage: problem, workflow, terminology, requirement, prototype, edge case, priority.",
            "How to ask non-leading questions.",
            "How to test a prototype without selling it.",
            "How to capture evidence, not opinions.",
            "How to synthesize feedback into decisions.",
          ],
          lessons: [
            {
              id: "6-1",
              number: "6.1",
              title: "What to validate at each stage",
              description: "Problem, workflow, terminology, requirement, prototype, edge case, priority — each stage has different validation needs.",
              resources: [],
            },
            {
              id: "6-2",
              number: "6.2",
              title: "How to ask non-leading questions",
              description: "Leading questions produce confirmation, not evidence. Specific techniques for neutral elicitation.",
              resources: [],
            },
            {
              id: "6-3",
              number: "6.3",
              title: "Testing a prototype without selling it",
              description: "Presenting a prototype and testing a prototype are different activities. Observers watch behavior; presenters watch reactions.",
              resources: [],
            },
            {
              id: "6-4",
              number: "6.4",
              title: "Capturing evidence, not opinions",
              description: "\"I like it\" is not evidence. Observation notes, task completion, and confusion points are.",
              resources: [],
            },
            {
              id: "6-5",
              number: "6.5",
              title: "Synthesizing feedback into decisions",
              description: "Feedback without synthesis creates noise. How to turn observations into requirement changes.",
              resources: [],
            },
          ],
          workshops: [
            {
              title: "Workshop",
              body: "Validation session with assigned roles:",
              items: [
                "Moderator",
                "Participant",
                "Note-taker",
                "Observer",
              ],
            },
          ],
          reading: {
            body: "NN/g's research-method guidance: user research can happen at any point in the design cycle, and usability testing observes people performing tasks so teams can uncover problems and opportunities.",
          },
          homework: {
            body: "Conduct one mini-validation session with a colleague or representative user.",
          },
          output: {
            name: "Live Validation Script",
            fields: [
              "Goal",
              "Hypothesis",
              "Tasks",
              "Questions",
              "Observation notes",
              "Requirement changes",
              "Open decisions",
              "Reusable prompt: TBD",
            ],
          },
          outcome:
            "After this module, a participant can run lightweight validation sessions, ask non-leading questions, capture evidence instead of opinions, and synthesize feedback into requirement decisions.",
        },
        {
          id: "module-07",
          number: "07",
          title: "Collaborative Handoff for Design and Delivery",
          description:
            "This module helps participants package validated understanding into a design-ready handoff that supports faster and more accurate design iteration. Participants learn how to transfer the right mix of context, decisions, evidence, assumptions, open questions, prototype notes, and next steps so client and vendor teams can move forward with shared clarity.",
          format: "Lecture and workshop",
          duration: "TBD",
          purpose: "Define what a useful, design-ready handoff looks like. Align around a shared best-practice format for transferring knowledge, decisions, evidence, and open questions in a way that supports faster and more accurate design iteration.",
          lectureTopics: [
            "What knowledge needs to be included for design and delivery teams to move forward confidently.",
            "What design teams need to understand before creating or iterating detailed designs.",
            "What delivery and development teams need to understand before estimating, planning, or building.",
            "How to document decisions, assumptions, unresolved questions, and decision owners.",
            "How to avoid using the prototype as the only source of truth.",
            "How to connect user feedback, validation notes, and stakeholder decisions back to requirements.",
            "How to distinguish between confirmed requirements, working assumptions, and items needing further validation.",
            "How to create traceability from feedback to requirement.",
          ],
          lessons: [
            {
              id: "7-1",
              number: "7.1",
              title: "What knowledge needs to be included for design and delivery teams to move forward confidently",
              description: "",
              resources: [],
            },
            {
              id: "7-2",
              number: "7.2",
              title: "What design teams need to understand before creating or iterating detailed designs",
              description: "",
              resources: [],
            },
            {
              id: "7-3",
              number: "7.3",
              title: "What delivery and development teams need to understand before estimating, planning, or building",
              description: "",
              resources: [],
            },
            {
              id: "7-4",
              number: "7.4",
              title: "How to document decisions, assumptions, unresolved questions, and decision owners",
              description: "",
              resources: [],
            },
            {
              id: "7-5",
              number: "7.5",
              title: "How to avoid using the prototype as the only source of truth",
              description: "",
              resources: [],
            },
            {
              id: "7-6",
              number: "7.6",
              title: "How to connect user feedback, validation notes, and stakeholder decisions back to requirements",
              description: "",
              resources: [],
            },
            {
              id: "7-7",
              number: "7.7",
              title: "How to distinguish between confirmed requirements, working assumptions, and items needing further validation",
              description: "",
              resources: [],
            },
            {
              id: "7-8",
              number: "7.8",
              title: "How to create traceability from feedback to requirement",
              description: "",
              resources: [],
            },
          ],
          workshops: [
            {
              title: "Workshop",
              body: "Package a validated prototype into a handoff bundle.",
            },
          ],
          reading: {
            body: "TBD",
          },
          homework: {
            body: "Prepare a final handoff package for the shared build-along app.",
          },
          output: {
            name: "Validated Requirements Handoff Template",
            fields: ["Reusable prompt: TBD"],
          },
          outcome:
            "After this module, a participant can package validated requirements into a handoff that design and delivery teams can use, with traceability from feedback to requirement.",
        },
      ],
    },
  ],
};

/* ============================================================
   INCLUDED MATERIALS (§6) — 8 artifacts
   ============================================================ */
export const includedMaterials = {
  heading: "Included artifacts",
  items: [
    "User Thinking Canvas",
    "Screen Anatomy Checklist",
    "Requirement Hypothesis Template",
    "Workflow-to-Requirements Map",
    "Figma Make IA Prototype Pack",
    "AI Prototype Elicitation Pack",
    "Live Validation Script",
    "Validated Requirements Handoff Template",
  ],
};

/* ============================================================
   FAQ (§7) — 5 Q&As
   ============================================================ */
export const faq = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "faq-1",
      question: "Is this a UX or design course?",
      answer:
        "No. It teaches enough interface literacy and design judgment for BA, BSA, PM, and delivery teams to write better requirements. Production design remains a designer responsibility.",
    },
    {
      id: "faq-2",
      question: "Do participants need coding or Figma skills?",
      answer:
        "No prior Figma or coding experience is needed. Figma Make and AI tools are used as thinking and validation instruments, not as design tools.",
    },
    {
      id: "faq-3",
      question: "What do participants take away?",
      answer:
        "Eight reusable artifacts: User Thinking Canvas, Screen Anatomy Checklist, Requirement Hypothesis Template, Workflow-to-Requirements Map, Figma Make IA Prototype Pack, AI Prototype Elicitation Pack, Live Validation Script, and Validated Requirements Handoff Template.",
    },
    {
      id: "faq-4",
      question: "What is Track A vs Track B in Phase 2?",
      answer:
        "Module 05A (Figma Make) is for the broad audience — anyone involved in requirements work. Module 05B (AI Prototyping) is for advanced BSAs who want to use AI tools for elicitation. Both are sequential modules, not parallel tracks.",
    },
    {
      id: "faq-5",
      question: "How is this relevant to U.S. Renal Care?",
      answer:
        "The methods apply to any requirements work: patient portal flows, scheduling, provider dashboards, lab review, clinic operations. The underlying skills are universal: understand users, map workflows, structure requirements, prototype, validate, and hand off.",
    },
  ],
};

/* ============================================================
   SKILLS AFTER COURSE (§8) — 7 items
   ============================================================ */
export const skillsAfterCourse = {
  heading: "Skills after the course",
  items: [
    "Understand why users think in tasks and workarounds, and apply the User Thinking Canvas to capture user context before writing requirements.",
    "Read screens by structural components and use the Screen Anatomy Checklist to find hidden business rules and missing requirements.",
    "Transform vague stakeholder requests into structured, testable requirement hypotheses using the Requirement Hypothesis Template.",
    "Map workflows before screens and identify hidden requirements in handoffs, exceptions, approvals, and compliance rules.",
    "Use Figma Make or AI tools to create lightweight IA prototypes as validation artifacts, not as design deliverables.",
    "Run continuous validation sessions with non-leading questions, capturing evidence instead of opinions.",
    "Package validated requirements into a handoff that design and delivery teams can actually use, with full traceability from feedback to requirement.",
  ],
};

/* ============================================================
   FOOTER (§9)
   ============================================================ */
export const footer = {
  left: "Prepared for U.S. Renal Care evaluation.",
  right: "© 2026 Trinetix. All Rights Reserved.",
};

/* ============================================================
   NAVIGATION ANCHORS (header)
   ============================================================ */
export const nav = {
  brand: { primary: "U.S. Renal Care", divider: "×", secondary: "Trinetix" },
  anchors: [
    { id: "about", label: "About" },
    { id: "curriculum", label: "Curriculum" },
    { id: "faq", label: "FAQ" },
  ],
};
