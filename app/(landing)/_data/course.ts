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
  reading?: { body: string };
  homework?: { body: string; items?: string[] };
  outcome: string;
  output?: ModuleOutput;
  didYouKnow?: string[];
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
    { label: "Lecture", description: "Concepts & principles" },
    { label: "Workshop", description: "Hands-on with shared app" },
    { label: "Reading", description: "NN/g video & article" },
    { label: "Homework", description: "One reusable artifact" },
    { label: "TBD", description: "Course duration" },
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
      modulesRange: "Modules 01–04",
      duration: "TBD",
      description:
        "Universal track for everyone: business, IT, operations, product, delivery, and vendor teams. General design judgment for requirements work.",
    },
    {
      number: 2,
      name: "Prototyping & Validation",
      modulesRange: "Modules 05A–07",
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
      modulesRange: "Modules 01–04",
      duration: "TBD",
      modules: [
        {
          id: "module-01",
          number: "01",
          title: "How users think",
          description:
            "Why vague requirements happen: stakeholders describe solutions, users describe symptoms, and teams interpret through different mental models.",
          format: "Lecture and workshop",
          duration: "TBD",
          purpose: "Help participants understand why vague requirements happen: stakeholders describe solutions, users describe symptoms, and teams interpret through different mental models.",
          lectureTopics: [
            "Users do not think in features; they think in tasks, goals, workarounds, risks, and interruptions.",
            "Jobs-to-be-done as a practical requirements lens.",
            "Why \"what do you need?\" often produces weak requirements.",
            "Difference between stakeholder input, user evidence, and requirements.",
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
              title: "Workshop",
              body: "TBD",
            },
          ],
          reading: {
            body: "TBD",
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
        },
        {
          id: "module-02",
          number: "02",
          title: "Interface anatomy: what screens are made of",
          description:
            "Learn the common building blocks of web and mobile interfaces, basic design dos and don'ts, and how interface choices reveal hidden requirements.",
          format: "Lecture and homework",
          duration: "TBD",
          purpose: "Learn the common building blocks of web and mobile interfaces, basic design dos and don'ts, and how interface choices reveal hidden requirements around data, permissions, actions, states, and workflows.",
          lectureTopics: [
            "Web vs. mobile: what changes and why.",
            "Basic screen anatomy. Screen element and requirement question.",
            "Navigation patterns.",
            "Forms, tables, cards, and dashboards.",
            "Design dos and don'ts.",
            "Mobile-specific dos and don'ts.",
            "What makes forms cognitively hard.",
            "\"Looks simple\" does not mean \"is simple.\"",
          ],
          lessons: [
            {
              id: "2-1",
              number: "2.1",
              title: "Web vs. mobile: what changes and why",
              description: "Platform differences affect layout, navigation, and interaction — and each difference can surface a hidden requirement.",
              resources: [],
            },
            {
              id: "2-2",
              number: "2.2",
              title: "Basic screen anatomy. Screen element and requirement question",
              description: "Every screen element implies a requirement question. Learning to see the connection is the foundation of interface literacy.",
              resources: [],
            },
            {
              id: "2-3",
              number: "2.3",
              title: "Navigation patterns",
              description: "Tabs, sidebars, breadcrumbs, bottom bars — each pattern carries assumptions about user flow and information architecture.",
              resources: [],
            },
            {
              id: "2-4",
              number: "2.4",
              title: "Forms, tables, cards, and dashboards",
              description: "Four core screen patterns that account for most business applications. Each hides different requirement decisions.",
              resources: [],
            },
            {
              id: "2-5",
              number: "2.5",
              title: "Design dos and don'ts",
              description: "Practical guidelines for interface decisions that affect clarity, usability, and requirement quality.",
              resources: [],
            },
            {
              id: "2-6",
              number: "2.6",
              title: "Mobile-specific dos and don'ts",
              description: "Touch targets, thumb zones, offline states, and other mobile constraints that generate requirements desktop doesn't.",
              resources: [],
            },
            {
              id: "2-7",
              number: "2.7",
              title: "What makes forms cognitively hard",
              description: "Forms are where most business rules live. Understanding cognitive load in forms improves requirement quality.",
              resources: [],
            },
            {
              id: "2-8",
              number: "2.8",
              title: "\"Looks simple\" does not mean \"is simple\"",
              description: "Complexity hides in interfaces. Learning to see it is a key requirements skill.",
              resources: [],
            },
          ],
          didYouKnow: [
            "A dropdown can hide a business rule.",
            "An empty state can reveal a missing requirement.",
            "Table columns usually represent prioritization decisions.",
            "Error messages often expose workflow exceptions.",
            "A required field is a policy decision, not just a UI choice.",
          ],
          reading: {
            body: "Few Guesses, More Success: 4 Principles to Reduce Cognitive Load in Forms. Minimize Cognitive Load to Maximize Usability.",
          },
          homework: {
            body: "Choose one screen from an existing tool, prototype, or familiar product and analyze it using the screen anatomy checklist. Identify:",
            items: [
              "3 key screen elements",
              "3 hidden requirements",
              "3 design dos or don'ts observed",
              "2 differences if this were web vs. mobile",
              "2 missing states or edge cases",
              "1 question to validate with a user or stakeholder",
            ],
          },
          output: {
            name: "Screen Anatomy Checklist for Requirement conversations",
            fields: ["Reusable prompt: Design Literacy & Cognitive Load Check"],
          },
          outcome:
            "After this module, a participant can read a screen by its structural components, identify where business rules and requirements hide, and use the Screen Anatomy Checklist for requirement conversations. Reusable prompt: Design Literacy & Cognitive Load Check.",
        },
        {
          id: "module-03",
          number: "03",
          title: "From requests to requirements",
          description:
            "Transform vague asks into structured requirement hypotheses. Request vs. requirement vs. assumption vs. constraint.",
          format: "Lecture and workshop",
          duration: "TBD",
          purpose: "Teach participants to transform vague asks into structured requirement hypotheses.",
          lectureTopics: [
            "Request vs. requirement vs. assumption vs. constraint.",
            "How to ask better follow-up questions.",
            "How to detect solutioning too early (problem space vs. solution space).",
            "How to separate \"must,\" \"should,\" \"nice to have,\" and \"unknown.\"",
            "Requirements as testable statements.",
          ],
          lessons: [
            {
              id: "3-1",
              number: "3.1",
              title: "Request vs. requirement vs. assumption vs. constraint",
              description: "Four different things that often get mixed up in conversation. Separating them is the first step to structured requirements.",
              resources: [],
            },
            {
              id: "3-2",
              number: "3.2",
              title: "How to ask better follow-up questions",
              description: "The quality of requirements depends on the quality of questions. Specific techniques for deeper elicitation.",
              resources: [],
            },
            {
              id: "3-3",
              number: "3.3",
              title: "Detecting solutioning too early",
              description: "Problem space vs. solution space. Teams that jump to screens before understanding the problem produce weak requirements.",
              resources: [],
            },
            {
              id: "3-4",
              number: "3.4",
              title: "Must, should, nice to have, and unknown",
              description: "Priority is a requirement attribute. Learning to separate these early prevents scope confusion.",
              resources: [],
            },
            {
              id: "3-5",
              number: "3.5",
              title: "Requirements as testable statements",
              description: "If a requirement cannot be tested, it cannot be validated. Writing testable requirements is a core skill.",
              resources: [],
            },
          ],
          workshops: [
            {
              title: "Workshop",
              body: "Take vague requests and improve them. Example: \"Clinicians need a dashboard.\" Turn into:",
              items: [
                "Which clinicians?",
                "During which task?",
                "What decision must they make?",
                "What information is missing today?",
                "What happens if the decision is wrong?",
                "How often is this needed?",
                "What source of truth should be used?",
                "What would make this successful?",
              ],
            },
          ],
          reading: {
            body: "NN/g's stakeholder-interview guidance: stakeholder conversations should uncover success metrics, concerns, constraints, and alignment issues early.",
          },
          homework: {
            body: "Rewrite three vague requirements using a structured format:",
            items: [
              "Context",
              "User",
              "Task",
              "Pain",
              "Needed decision",
              "Requirement hypothesis",
              "Validation question",
              "Evidence needed",
            ],
          },
          output: {
            name: "Requirement Hypothesis Template",
            fields: [
              "Context",
              "User",
              "Task",
              "Pain",
              "Needed decision",
              "Requirement hypothesis",
              "Validation question",
              "Evidence needed",
            ],
          },
          outcome:
            "After this module, a participant can distinguish requests from requirements, ask better follow-up questions, detect premature solutioning, and write structured requirement hypotheses.",
        },
        {
          id: "module-04",
          number: "04",
          title: "Mapping workflows before screens",
          description:
            "Prevent teams from jumping straight into screens before understanding process. Process map vs. journey map vs. task flow.",
          format: "Lecture and workshop",
          duration: "TBD",
          purpose: "Prevent teams from jumping straight into screens before understanding process. Mapping methods create shared understanding and shared artifacts for decision-making.",
          lectureTopics: [
            "Process map vs. journey map vs. task flow.",
            "Where requirements hide: handoffs, exceptions, waiting, duplicate entry, approvals, and compliance rules.",
            "How to map \"as-is\" and \"to-be\" without overcomplicating.",
            "How to identify requirement gaps from a workflow.",
          ],
          lessons: [
            {
              id: "4-1",
              number: "4.1",
              title: "Process map vs. journey map vs. task flow",
              description: "Three mapping methods for three different purposes. Choosing the right one depends on the question you need answered.",
              resources: [],
            },
            {
              id: "4-2",
              number: "4.2",
              title: "Where requirements hide in workflows",
              description: "Handoffs, exceptions, waiting, duplicate entry, approvals, and compliance rules all hide requirements that screens must eventually handle.",
              resources: [],
            },
            {
              id: "4-3",
              number: "4.3",
              title: "Mapping \"as-is\" and \"to-be\" without overcomplicating",
              description: "Workflow mapping should clarify, not create analysis paralysis. Practical guidelines for useful maps.",
              resources: [],
            },
            {
              id: "4-4",
              number: "4.4",
              title: "Identifying requirement gaps from a workflow",
              description: "A workflow map is not the goal — the requirements it reveals are. How to read a map for gaps.",
              resources: [],
            },
          ],
          workshops: [
            {
              title: "Workshop",
              body: "Build a simple workflow map for a non-clinical process, such as:",
              items: [
                "Requesting access to a tool",
                "Scheduling a meeting with multiple departments",
                "Submitting an internal support ticket",
                "Approving a document",
              ],
            },
          ],
          reading: {
            body: "TBD",
          },
          homework: {
            body: "TBD",
          },
          output: {
            name: "Workflow-to-Requirements Map",
            fields: ["TBD"],
          },
          outcome:
            "After this module, a participant can choose the right mapping method, build workflow maps, and identify hidden requirements in handoffs, exceptions, and approvals.",
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
      modulesRange: "Modules 05A–07",
      duration: "TBD",
      modules: [
        {
          id: "module-05a",
          number: "05A",
          title: "Figma as a shared thinking tool",
          description:
            "Use Figma Make to quickly externalize structure, flows, roles, screens, and decision points so teams can validate requirements earlier. Focus on information architecture, not visual polish.",
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
          id: "module-05b",
          number: "05B",
          title: "AI prototyping for elicitation",
          description:
            "Use Claude Design or similar tools responsibly during elicitation. AI prototype as conversation artifact with visible annotations for assumptions, validation needs, and unknowns.",
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
          title: "Continuous validation in the flow",
          description:
            "Validate continuously, cheaply, and appropriately. What to validate at each stage: problem, workflow, terminology, requirement, prototype, edge case, priority.",
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
          title: "Collaborative requirements handoff for design and delivery",
          description:
            "Define what a useful, design-ready handoff looks like. Align around a shared best-practice format for transferring knowledge, decisions, evidence, and open questions.",
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
