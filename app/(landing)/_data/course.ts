// Content for the USRC × Trinetix learning program landing page.
// Lifted verbatim from /USRC-Landing-Course-v2.md — the source of truth.
// Do not paraphrase. If copy changes, update the markdown first, then mirror here.

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

export type Module = {
  id: string;
  number: string;
  title: string;
  description: string;
  format: string;
  duration: string;
  goal: string;
  lessons: Lesson[];
  workshops?: { title: string; body: string }[];
  homework?: { body: string };
  outcome: string;
};

export type Phase = {
  id: string;
  number: 1 | 2 | 3;
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
  eyebrow: "Rapid prototyping program",
  headline: "Rapid prototyping for healthcare product teams",
  subheadline:
    "A practical course for U.S. Renal Care Business Analysts, Business Systems Analysts, and technical teams who need to turn product discussions into prototype drafts, test ideas with stakeholders, and judge the quality of AI-generated UI concepts.",
  meta: [
    { value: "11", label: "modules" },
    { value: "~21h", label: "of learning" },
    { value: "Web + Mobile", label: "" },
  ],
};

/* ============================================================
   BASIC DETAILS (§2)
   ============================================================ */
export const basicDetails = {
  audience:
    "Business Analysts, Business Systems Analysts, product-facing technical team members, and leads who work with requirements, user flows, product ideas, and early prototype reviews.",
  outcome:
    "After the course, participants can read screens, structure user flows, write stronger AI prototyping prompts, critique generated UI, and use prototypes as a requirements validation tool.",
  format:
    "Lectures, workshops, case studies, screen audits, workbook practice, AI-tool demos, and a final project.",
  scope:
    "This is not a production design or software engineering course. It teaches practical UX/UI judgment and AI prototyping literacy for requirements work. Designers and developers still own production design and implementation.",
};

/* ============================================================
   ABOUT THE PROGRAM (§3)
   ============================================================ */
export const aboutProgram = {
  paragraphs: [
    "Product ideas may lose shape between the first stakeholder conversation, the written requirement, the prototype, and the engineering handoff. A prototype can look polished and still answer the wrong question.",
    "This course gives business and technical teams a working method: understand the user, map the task, describe the screen, generate a prototype draft, critique it with principles, and use it to validate assumptions. The focus is whether the flow makes sense. It stays grounded in general UX and product practice: users, personas, mental models, journey maps, user flows, interface patterns, mobile behavior, design systems, heuristic review, and AI-assisted prototyping.",
  ],
};

/* ============================================================
   SKILLS / OUTCOMES (§4) — 10 items
   ============================================================ */
export const outcomes = {
  heading: "By the end, participants can",
  items: [
    "Translate stakeholder input into user journeys, user flows, and prototype requirements.",
    "Read web and mobile screens by zones, patterns, states, and interaction logic.",
    "Explain UI problems with terms such as hierarchy, contrast, spacing, typography, cognitive load, component, token, and pattern.",
    "Apply Nielsen's heuristics and Laws of UX to real screens and AI-generated prototypes.",
    "Choose the right prototype fidelity for the question being tested.",
    "Write structured prompts for web and mobile prototypes.",
    "Compare AI prototyping tools by task fit.",
    "Run a heuristic audit before showing a prototype to stakeholders (patients, partners, clinical specialists, staff, and others).",
    "Present a prototype as a validation tool.",
    "Document what changed in requirements after a validation session.",
  ],
};

/* ============================================================
   COURSE FACTS (§5)
   ============================================================ */
export const courseFacts = {
  heading: "Course facts",
  stats: [
    { value: "3", label: "Phases" },
    { value: "11", label: "Modules" },
    { value: "~21h", label: "Learning time" },
    { value: "7", label: "AI tools" },
    { value: "Web + Mobile", label: "Platforms" },
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
      duration: "~7 hours",
      description:
        "User psychology, interface anatomy, mobile behavior, visual design language, and design systems.",
    },
    {
      number: 2,
      name: "Critical thinking",
      modulesRange: "Modules 05–06",
      duration: "~4 hours",
      description:
        "Nielsen's heuristics, cognitive load, current trends, and common AI design failures.",
    },
    {
      number: 3,
      name: "AI prototyping",
      modulesRange: "Modules 07–11",
      duration: "~10 hours",
      description:
        "From prototype logic to requirements defense, using 7 AI tools and separate approaches for web and mobile.",
    },
  ],
};

/* ============================================================
   CURRICULUM — 3 phases × 11 modules
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
        "User psychology, interface anatomy, mobile behavior, visual design language, and design systems.",
      modulesRange: "Modules 01–04",
      duration: "~7 hours",
      modules: [
        {
          id: "module-01",
          number: "01",
          title: "How users think",
          description:
            "UX as behavioral logic. Mental models, jobs-to-be-done, user journey, and the gap between business analyst expectations and end-user needs.",
          format: "Lecture and workshop",
          duration: "90 min",
          goal: "Understand that UX is not style or taste. UX is how people understand a task, what they expect from the product, and where the interface helps or gets in the way.",
          lessons: [
            {
              id: "1-1",
              number: "1.1",
              title: "What is UX and how does it differ from UI",
              description:
                "Core definitions that build the right vocabulary. Without this, business analysts confuse \"beautiful\" with \"usable.\" Those are different questions.",
              estimatedTime: "~14 min",
              resources: [
                {
                  type: "article",
                  label: "The Definition of User Experience — NN/g",
                  url: "https://www.nngroup.com/articles/definition-user-experience/",
                  duration: "5 min",
                },
                {
                  type: "article",
                  label: "Usability 101: Introduction to Usability — NN/g",
                  url: "https://www.nngroup.com/articles/usability-101-introduction-to-usability/",
                  duration: "5 min",
                },
                {
                  type: "video",
                  label: "Usability 101 — NN/g",
                  url: "https://www.nngroup.com/videos/usability-101/",
                  duration: "4 min",
                },
              ],
            },
            {
              id: "1-4",
              number: "1.2",
              title: "Human-Centered Design: the approach behind the work",
              description:
                "Design Thinking and Human-Centered Design (HCD) give structure to requirements gathering and idea validation. A BA does not need to become a designer to use the approach.",
              estimatedTime: "~10 min",
              resources: [
                {
                  type: "article",
                  label: "Design Thinking 101 — NN/g",
                  url: "https://www.nngroup.com/articles/design-thinking/",
                  duration: "6 min",
                },
                {
                  type: "video",
                  label: "What is Human-Centered Design? — IDEO",
                  url: "https://www.youtube.com/watch?v=_r0VX-aU_T8",
                  duration: "4 min",
                },
              ],
            },
            {
              id: "1-2",
              number: "1.3",
              title: "Mental models: why users \"don't understand\" the interface",
              description:
                "People interact with products through expectations, not through the team's internal logic. A BA who understands mental models asks better questions during requirements gathering and catches mismatches earlier.",
              estimatedTime: "~10 min",
              resources: [
                {
                  type: "article",
                  label: "Mental Models and User Experience Design — NN/g",
                  url: "https://www.nngroup.com/articles/mental-models/",
                  duration: "7 min",
                },
                {
                  type: "video",
                  label: "What is a Mental Model? — NN/g",
                  url: "https://www.nngroup.com/videos/mental-models/",
                  duration: "3 min",
                },
              ],
            },
            {
              id: "1-3",
              number: "1.4",
              title: "User journey map: the path from task to outcome",
              description:
                "A journey map is useful before any prototype exists. It documents the user's steps, expectations, pain points, and gaps in the requirement.",
              estimatedTime: "~11 min",
              resources: [
                {
                  type: "article",
                  label: "Journey Mapping 101 — NN/g",
                  url: "https://www.nngroup.com/articles/journey-mapping-101/",
                  duration: "6 min",
                },
                {
                  type: "video",
                  label: "Customer Journey Mapping 101 — NN/g",
                  url: "https://www.nngroup.com/videos/journey-mapping-101/",
                  duration: "5 min",
                },
              ],
            },
            {
              id: "1-5",
              number: "1.5",
              title: "Designers as user advocates — and why every product role shares that responsibility",
              description:
                "User advocacy is not a designer's job alone. Business analysts write requirements that shape the product, and when any role optimizes only for the stakeholder's request, the user pays the cost. Asking \"who is the user and what do they actually need?\" is a requirement-gathering skill, not a design preference.",
              estimatedTime: "~15 min",
              resources: [
                {
                  type: "article",
                  label: "NIST — Human Centered Design (HCD)",
                  url: "https://www.nist.gov/itl/iad/visualization-and-usability-group/human-factors-human-centered-design",
                  duration: "10–15 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class workshop",
              body: "The group builds a user journey map from a project scenario. Each participant documents the user's steps, expectations, pain points, and open questions for their own product or a prepared healthcare workflow. Group discussion follows. ~30 min within the session.",
            },
            {
              title: "In-class practice: discovering hidden complexity",
              body: "Mini-exercise: each participant picks an interface they use daily (Teams, Outlook, or similar) and tries to find one non-obvious function. Example: how to add someone to a calendar invite. The goal is to notice that stakeholders often describe interfaces based on the simplest path and skip everything else. After the exercise, the group discusses why users miss features and what that means for requirements.",
            },
          ],
          homework: {
            body: "Review the lesson resources on UX vs UI, human-centered design, mental models, and user journey mapping. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant understands the difference between UX and UI, knows what a mental model is, can build a basic user journey map for a project, and understands that user advocacy is a shared responsibility across product, design, business analysis, and engineering.",
        },
        {
          id: "module-02",
          number: "02",
          title: "Interface anatomy: web and mobile",
          description:
            "Screen zones, UI patterns, navigation, touch targets, thumb zone, safe areas, gestures, iOS vs Android, responsive vs adaptive behavior.",
          format: "Lecture and case studies",
          duration: "120 min",
          goal: "Learn to read any screen by zones, recognize common UI patterns, and understand how web and mobile differ in both requirements and prototyping practice.",
          lessons: [
            {
              id: "2-1",
              number: "2.1",
              title: "Screen anatomy: zones, elements, patterns",
              description:
                "Every interface is built from typical zones and components. Recognizing them helps business analysts translate requirements into screen structures faster.",
              estimatedTime: "~14 min",
              resources: [
                {
                  type: "article",
                  label: "Design-Pattern Guidelines: Study Guide — NN/g",
                  url: "https://www.nngroup.com/articles/design-pattern-guidelines-study-guide/",
                  duration: "6 min",
                },
                {
                  type: "article",
                  label: "Web UX: Study Guide — NN/g",
                  url: "https://www.nngroup.com/articles/web-ux-study-guide/",
                  duration: "8 min",
                },
              ],
            },
            {
              id: "2-2",
              number: "2.2",
              title: "Mobile UX: why mobile is not a shrunken website",
              description:
                "Mobile has its own interaction logic. Thumb zone, touch targets, safe areas, gesture navigation, and interruptions change the design approach.",
              estimatedTime: "~23 min",
              resources: [
                {
                  type: "article",
                  label: "Mobile UX: Study Guide — NN/g",
                  url: "https://www.nngroup.com/articles/mobile-ux-study-guide/",
                  duration: "10 min",
                },
                {
                  type: "article",
                  label: "Touch Targets on Touchscreens — NN/g",
                  url: "https://www.nngroup.com/articles/touch-target-size/",
                  duration: "6 min",
                },
                {
                  type: "article",
                  label: "The State of Mobile User Experience — NN/g",
                  url: "https://www.nngroup.com/articles/state-mobile-ux/",
                  duration: "7 min",
                },
              ],
            },
            {
              id: "2-3",
              number: "2.3",
              title: "Mobile navigation patterns and iOS vs Android",
              description:
                "Tab bar, bottom navigation, hamburger menu, and navigation hub each have their own logic. iOS and Android also follow different conventions. Business analysts need to distinguish these patterns when gathering requirements.",
              estimatedTime: "~24 min",
              resources: [
                {
                  type: "article",
                  label: "Basic Patterns for Mobile Navigation — NN/g",
                  url: "https://www.nngroup.com/articles/mobile-navigation-patterns/",
                  duration: "8 min",
                },
                {
                  type: "article",
                  label: "Designing for iOS — Apple HIG",
                  url: "https://developer.apple.com/design/human-interface-guidelines/designing-for-ios",
                  duration: "8 min",
                },
                {
                  type: "article",
                  label: "Material 3 Foundations — Google Material Design",
                  url: "https://m3.material.io/foundations",
                  duration: "8 min",
                },
              ],
            },
            {
              id: "2-4",
              number: "2.4",
              title: "Responsive vs adaptive: one product across multiple screens",
              description:
                "Some products need one flow that adapts across screens. Others need a separate mobile flow. This affects requirements, not just design.",
              estimatedTime: "~7 min",
              resources: [
                {
                  type: "article",
                  label: "Mobile First Is NOT Mobile Only — NN/g",
                  url: "https://www.nngroup.com/articles/mobile-first-not-mobile-only/",
                  duration: "7 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class case study",
              body: "The facilitator opens Google Maps in a browser and Google Maps as a standalone mobile app side by side. The group compares how the same service is implemented across platforms: screen zones, navigation patterns, touch targets, gestures, safe areas, and iOS vs Android differences. Each participant then repeats the comparison with a product they work with, identifying what changes between the web and mobile version and why.",
            },
          ],
          homework: {
            body: "Review the lesson resources on screen anatomy, mobile UX, navigation patterns, and responsive vs adaptive design. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant can break down web and mobile screens into functional zones, recognize key mobile patterns, and explain responsive vs adaptive design.",
        },
        {
          id: "module-03",
          number: "03",
          title: "Visual design language",
          description:
            "Hierarchy, typography, color, grid, spacing, Gestalt principles, and how to distinguish quality from weak design through real web and mobile examples.",
          format: "Lecture and screen audit",
          duration: "90 min",
          goal: "Build concrete vocabulary for evaluating UI quality. After this module, business analysts can talk about design using observable facts, not taste.",
          lessons: [
            {
              id: "3-1",
              number: "3.1",
              title: "5 principles of visual design in UX",
              description:
                "Scale, hierarchy, balance, contrast, and Gestalt explain why some interfaces are easy to read and others are not. These principles also give BAs a vocabulary for reviewing AI-generated prototypes.",
              estimatedTime: "~15 min",
              resources: [
                {
                  type: "article",
                  label: "5 Principles of Visual Design in UX — NN/g",
                  url: "https://www.nngroup.com/articles/principles-visual-design/",
                  duration: "8 min",
                },
                {
                  type: "video",
                  label: "Visual Hierarchy — NN/g",
                  url: "https://www.nngroup.com/videos/visual-hierarchy/",
                  duration: "3 min",
                },
                {
                  type: "video",
                  label: "The Gestalt Principles for UI Design — NN/g",
                  url: "https://www.nngroup.com/videos/the-gestalt-principles-intro/",
                  duration: "4 min",
                },
              ],
            },
            {
              id: "3-2",
              number: "3.2",
              title: "Visual hierarchy: why the eye goes where it should",
              description:
                "Hierarchy works through size, color, spacing, position, and contrast. It is one of the fastest ways to judge whether a screen supports the task or fights it.",
              estimatedTime: "~7 min",
              resources: [
                {
                  type: "article",
                  label: "Visual Hierarchy in UX: Definition — NN/g",
                  url: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/",
                  duration: "7 min",
                },
              ],
            },
            {
              id: "3-3",
              number: "3.3",
              title: "Typography, color, grid: a practical breakdown through real products",
              description:
                "Type systems, the 8px grid, color for status and hierarchy, density, and safe zones all affect whether a prototype is readable. The module uses product screens such as a patient portal, provider dashboard, and scheduling flow.",
              estimatedTime: "~26 min",
              resources: [
                {
                  type: "article",
                  label: "Why Does a Design Look Good? — NN/g",
                  url: "https://www.nngroup.com/articles/why-does-design-look-good/",
                  duration: "8 min",
                },
                {
                  type: "article",
                  label: "The Anatomy of a Good Design — NN/g",
                  url: "https://www.nngroup.com/articles/why-does-a-design-look-good-part2/",
                  duration: "8 min",
                },
                {
                  type: "article",
                  label: "Visual Design in UX: Study Guide — NN/g",
                  url: "https://www.nngroup.com/articles/visual-design-in-ux-study-guide/",
                  duration: "10 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class audit",
              body: "Each participant receives a web or mobile screenshot. They run a mini-audit: hierarchy, typography, color, spacing, and patterns. The facilitator reviews findings and corrects terminology.",
            },
          ],
          homework: {
            body: "Review the lesson resources on visual design principles, visual hierarchy, typography, color, and grid. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant knows the 5 visual design principles, can describe an interface problem with specific terms, and has better language for talking to designers.",
        },
        {
          id: "module-04",
          number: "04",
          title: "Design system: components, tokens, how to read one",
          description:
            "What a design system is and why business analysts need it. Components, tokens, styles, Figma libraries, and public systems such as Material 3, Apple HIG, and Atlassian.",
          format: "Lecture and Figma file walkthrough",
          duration: "90 min",
          goal: "Understand how a design system affects requirements and prototyping. Business analysts should be able to read a system as a shared vocabulary for working with design and development.",
          lessons: [
            {
              id: "4-1",
              number: "4.1",
              title: "What is a design system and why does it matter to business analysts",
              description:
                "A design system is the shared language between designers and developers, not just a component library. Business analysts who understand that language write more precise requirements and avoid unnecessary custom UI.",
              estimatedTime: "~15 min",
              resources: [
                {
                  type: "article",
                  label: "Design Systems 101 — NN/g",
                  url: "https://www.nngroup.com/articles/design-systems-101/",
                  duration: "8 min",
                },
                {
                  type: "article",
                  label: "Design Systems vs. Style Guides — NN/g",
                  url: "https://www.nngroup.com/articles/design-systems-vs-style-guides/",
                  duration: "7 min",
                },
              ],
            },
            {
              id: "4-2",
              number: "4.2",
              title: "Components, tokens, patterns: core terminology",
              description:
                "A button is a component. #0058E9 can be a color token. A login form is a pattern. These terms let a BA write a precise requirement: \"use the standard button component,\" not \"make it look like the rest of the app.\"",
              estimatedTime: "~8 min",
              resources: [
                {
                  type: "article",
                  label: "Front-End Style Guides: Definition, Requirements — NN/g",
                  url: "https://www.nngroup.com/articles/front-end-style-guides/",
                  duration: "8 min",
                },
              ],
            },
            {
              id: "4-3",
              number: "4.3",
              title: "Industry design systems: Material 3, Apple HIG, Atlassian",
              description:
                "These systems set common expectations for many products. BAs who know them can understand why a designer proposes a pattern and can compare an AI-generated prototype against an established standard.",
              estimatedTime: "~40 min",
              resources: [
                {
                  type: "resource",
                  label: "Material Design 3 — Google (web + mobile)",
                  url: "https://m3.material.io/",
                  duration: "overview 15 min",
                },
                {
                  type: "resource",
                  label: "Human Interface Guidelines — Apple (mobile)",
                  url: "https://developer.apple.com/design/human-interface-guidelines/",
                  duration: "overview 15 min",
                },
                {
                  type: "resource",
                  label: "Atlassian Design System (web SaaS)",
                  url: "https://atlassian.design/",
                  duration: "overview 10 min",
                },
              ],
            },
            {
              id: "4-4",
              number: "4.4",
              title: "How a design system affects the project: a business perspective",
              description:
                "A design system reduces the cost of scaling a product. Shared components and tokens lower the time designers and developers spend on repeated decisions, maintain brand consistency across a product family, and reduce long-term design debt. Business analysts who understand this argument can have more informed conversations about scope and custom-UI requests with USRC stakeholders.",
              estimatedTime: "~20 min",
              resources: [
                {
                  type: "article",
                  label: "IBM Carbon — Consistency in the Cloud",
                  url: "https://v10.carbondesignsystem.com/case-studies/consistency-in-the-cloud/",
                  duration: "15–20 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class Figma walkthrough",
              body: "The facilitator opens a public Figma library, such as Material Design 3 Figma Kit or Atlassian, and walks through components, tokens, and their use on screens. Participants repeat the navigation in a real file.",
            },
          ],
          homework: {
            body: "Review the lesson resources on design systems, components, tokens, and industry systems (Material 3, Apple HIG, Atlassian). Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant understands what a design system, component, token, and pattern are; can open a Figma library; and can find the right component for a requirement.",
        },
      ],
    },
    /* ============================================================
       PHASE 2 — CRITICAL THINKING (Modules 05–06)
       ============================================================ */
    {
      id: "phase-2",
      number: 2,
      name: "Critical thinking",
      tagline:
        "Nielsen's heuristics, cognitive load, current trends, and common AI design failures.",
      modulesRange: "Modules 05–06",
      duration: "~4 hours",
      modules: [
        {
          id: "module-05",
          number: "05",
          title: "Nielsen's 10 heuristics and cognitive load",
          description:
            "The industry standard, plus Laws of UX. The group fills out the Heuristic Evaluation Workbook using real web and mobile examples.",
          format: "Lecture and workbook practice",
          duration: "120 min",
          goal: "Learn a proven review method. After this module, business analysts can conduct a quick heuristic analysis and argue problems using specific principles, not intuition.",
          lessons: [
            {
              id: "5-1",
              number: "5.1",
              title: "Nielsen's 10 heuristics: the canonical text",
              description:
                "This is the primary source. Formulated in 1994, still useful today. That is what a fundamental principle looks like.",
              estimatedTime: "~6 min",
              resources: [
                {
                  type: "article",
                  label: "10 Usability Heuristics for User Interface Design — NN/g, Jakob Nielsen",
                  url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
                  duration: "6 min",
                },
              ],
            },
            {
              id: "5-2",
              number: "5.2",
              title: "How to conduct a heuristic evaluation + free workbook",
              description:
                "NN/g's article and workbook give BAs a tool they can use immediately: analyze a requirement, a screenshot, or an AI-generated prototype and record the issue with evidence.",
              estimatedTime: "~11 min + tool",
              resources: [
                {
                  type: "article",
                  label: "How to Conduct a Heuristic Evaluation — NN/g",
                  url: "https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/",
                  duration: "11 min",
                },
                {
                  type: "workbook",
                  label: "Heuristic Evaluation Workbook (PDF) — NN/g",
                  url: "https://media.nngroup.com/media/articles/attachments/Heuristic_Evaluation_Workbook_-_Nielsen_Norman_Group.pdf",
                  duration: "PDF",
                },
              ],
            },
            {
              id: "5-3",
              number: "5.3",
              title: "Cognitive load: why \"too much\" breaks UX",
              description:
                "Cognitive load explains why overloaded screens fail. It matters even more on mobile, where space is limited and the task still needs to be clear.",
              estimatedTime: "~11 min",
              resources: [
                {
                  type: "article",
                  label: "Minimize Cognitive Load to Maximize Usability — NN/g",
                  url: "https://www.nngroup.com/articles/minimize-cognitive-load/",
                  duration: "8 min",
                },
                {
                  type: "video",
                  label: "What Is Cognitive Load? — NN/g",
                  url: "https://www.nngroup.com/videos/cognitive-load/",
                  duration: "3 min",
                },
              ],
            },
            {
              id: "5-4",
              number: "5.4",
              title: "Laws of UX: psychological laws in design",
              description:
                "Laws of UX collects principles such as Jakob's Law, Fitts' Law, and Hick's Law. Fitts' Law is especially useful when reviewing mobile touch targets.",
              estimatedTime: "~20–30 min",
              resources: [
                {
                  type: "resource",
                  label: "Laws of UX — lawsofux.com (21 laws, free)",
                  url: "https://lawsofux.com/",
                  duration: "20–30 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class workbook practice",
              body: "The facilitator shows examples from real web and mobile applications side by side and asks: which UX solution here is more convenient, and why? The speaker demonstrates the difference between a decision that works and one that does not, then explains the design reasoning behind each. Participants then complete the Heuristic Evaluation Workbook for one product (first on web, then on mobile) and see how the same heuristic can surface differently across platforms.",
            },
            {
              title: "In-class practice: from generic AI UI to a distinct design",
              body: "The speaker generates a standard UI screen using an AI tool, then demonstrates step by step how to customize it into something more unique: adjusting layout density, applying a specific visual style, reworking the hierarchy, and removing generic patterns. Participants observe the decision-making process and discuss what made the result feel less generic.",
            },
          ],
          homework: {
            body: "Review the lesson resources on Nielsen's 10 heuristics, the Laws of UX, and cognitive load. Try applying the heuristic evaluation workbook to one interface of your choice. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant knows the 10 heuristics, can apply them to a screen, understands cognitive load, and has completed a first heuristic audit.",
        },
        {
          id: "module-06",
          number: "06",
          title: "Modern trends vs timeless principles",
          description:
            "State of UX 2026. AI as a new UI paradigm. Where AI-generated design looks right but breaks UX. Comparative audit of two products on web and mobile.",
          format: "Lecture and comparative audit",
          duration: "90 min",
          goal: "Distinguish what looks modern from what works correctly. AI tools can generate trendy screens quickly. The BA still has to check the logic.",
          lessons: [
            {
              id: "6-1",
              number: "6.1",
              title: "State of UX 2026: where the industry is heading",
              description:
                "NN/g's annual review gives context for where UX is moving and why quality review matters more in the AI-generation era.",
              estimatedTime: "~12 min",
              resources: [
                {
                  type: "article",
                  label: "State of UX 2026: Design Deeper to Differentiate — NN/g",
                  url: "https://www.nngroup.com/articles/state-of-ux-2026/",
                  duration: "12 min",
                },
              ],
            },
            {
              id: "6-2",
              number: "6.2",
              title: "AI as a new UI paradigm: what it means for interfaces",
              description:
                "Jakob Nielsen's article explains how AI changes human-computer interaction. This helps BAs evaluate both AI-powered features and AI-generated prototypes.",
              estimatedTime: "~10 min",
              resources: [
                {
                  type: "article",
                  label: "AI: First New UI Paradigm in 60 Years — NN/g, Jakob Nielsen",
                  url: "https://www.nngroup.com/articles/ai-paradigm/",
                  duration: "10 min",
                },
              ],
            },
            {
              id: "6-3",
              number: "6.3",
              title: "Where AI design looks right but breaks UX",
              description:
                "AI tools often produce screens that look plausible but fail the task. This module covers common failure patterns and the \"handmade design\" trust signal.",
              estimatedTime: "~16 min",
              resources: [
                {
                  type: "article",
                  label: "The UX Reckoning: Prepare for 2025 and Beyond — NN/g",
                  url: "https://www.nngroup.com/articles/ux-reset-2025/",
                  duration: "10 min",
                },
                {
                  type: "article",
                  label: "Handmade Designs: The New Trust Signal — NN/g (2025)",
                  url: "https://www.nngroup.com/articles/handmade-designs/",
                  duration: "6 min",
                },
              ],
            },
            {
              id: "6-4",
              number: "6.4",
              title: "Analyzing quality designs: seeing why something works",
              description:
                "The module returns to NN/g visual design material, now with a different question: why does this screen follow the principle, and what would break if we changed it?",
              estimatedTime: "~8 min",
              resources: [
                {
                  type: "article",
                  label: "Visual Design in UX: Study Guide — NN/g (Testing section)",
                  url: "https://www.nngroup.com/articles/visual-design-in-ux-study-guide/",
                  duration: "8 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class comparative audit",
              body: "The facilitator compares two similar product flows, such as two patient portals or two scheduling dashboards. The group checks trends, heuristics, cognitive load, and mobile behavior. The point is to decide which is better and explain why.",
            },
          ],
          homework: {
            body: "Review the lesson resources on State of UX 2026, the AI UI paradigm, and common AI design failures. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this phase, a participant can evaluate interfaces using heuristics, argue problems clearly, and recognize where AI-generated design commonly fails.",
        },
      ],
    },
    /* ============================================================
       PHASE 3 — AI PROTOTYPING (Modules 07–11)
       ============================================================ */
    {
      id: "phase-3",
      number: 3,
      name: "AI prototyping",
      tagline:
        "From prototype logic to requirements defense, using 7 AI tools and separate approaches for web and mobile.",
      modulesRange: "Modules 07–11",
      duration: "~10 hours",
      modules: [
        {
          id: "module-07",
          number: "07",
          title: "Prototype logic and fidelity levels",
          description:
            "Fidelity levels and when to use each. Difference between user journey and user flow. Minimum viable prototype for validation. Live demo on web and mobile.",
          format: "Lecture, demo, and flow exercise",
          duration: "90 min",
          goal: "Understand prototypes as validation tools, know which type fits which question, and treat web and mobile as different contexts.",
          lessons: [
            {
              id: "7-1",
              number: "7.1",
              title: "Lo-fi vs hi-fi: why \"expensive and polished\" is not always better",
              description:
                "A prototype is a question, not an answer. The fidelity level depends on what you want to validate. For mobile, lo-fi can be enough: a paper sketch may already expose the main issue.",
              estimatedTime: "~11 min",
              resources: [
                {
                  type: "article",
                  label: "UX Prototypes: Low Fidelity vs. High Fidelity — NN/g",
                  url: "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/",
                  duration: "8 min",
                },
                {
                  type: "video",
                  label: "5 Tips for New Prototypers — NN/g",
                  url: "https://www.nngroup.com/videos/tips-for-new-prototypers/",
                  duration: "3 min",
                },
              ],
            },
            {
              id: "7-2",
              number: "7.2",
              title: "User flow vs user journey: what the prototype must cover",
              description:
                "A journey map describes the broader path. A user flow shows the screen-by-screen route. Requirements often describe a journey, but a prototype must show a flow. This gap causes many misunderstandings.",
              estimatedTime: "~5 min",
              resources: [
                {
                  type: "article",
                  label: "User Journeys vs. User Flows — NN/g",
                  url: "https://www.nngroup.com/articles/user-journeys-vs-user-flows/",
                  duration: "5 min",
                },
              ],
            },
            {
              id: "7-3",
              number: "7.3",
              title: "How to prepare a prototype for testing with a user",
              description:
                "Before showing a prototype, decide what you want to learn. For mobile work, show it on a real device when possible, not only on a laptop screen.",
              estimatedTime: "~9 min",
              resources: [
                {
                  type: "video",
                  label: "UX Prototyping: 5 Factors for Selecting the Right Tool — NN/g",
                  url: "https://www.nngroup.com/videos/prototyping-tool/",
                  duration: "3 min",
                },
                {
                  type: "article",
                  label: "Paper Prototyping: Getting User Data Before You Code — NN/g",
                  url: "https://www.nngroup.com/articles/paper-prototyping/",
                  duration: "6 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class live demo + flow exercise",
              body: "The facilitator builds a user flow for a real scenario, first as a sketch, then as a structured list of screens. Each participant builds a flow for one of their projects. This becomes the base for the prototype in Module 09.",
            },
          ],
          homework: {
            body: "Review the lesson resources on lo-fi vs hi-fi prototypes, user flows vs user journeys, and prototype preparation. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant understands the difference between lo-fi and hi-fi, knows the difference between user journey and user flow, and has a user flow ready for later practice.",
        },
        {
          id: "module-08",
          number: "08",
          title: "From Business Analyst requirements to screens",
          description:
            "How to translate requirements into a structured prompt. Minimum viable prototype for validation. Iterating through AI chat. Different prompting approaches for web and mobile.",
          format: "Practice and prompting",
          duration: "90 min",
          goal: "Translate raw stakeholder requirements into a prototype structure. The skill is framing an idea so it can be validated, not producing a polished visual.",
          lessons: [
            {
              id: "8-1",
              number: "8.1",
              title: "How to write prompts for AI prototyping",
              description:
                "Prompt quality drives prototype quality. A BA who clearly states context, target audience, scenario, platform, screens, features, and constraints gets better results from any AI tool.",
              estimatedTime: "~15 min",
              resources: [
                {
                  type: "article",
                  label: "How to Write Effective Prompts for AI UI Tools — Stormy AI",
                  url: "https://stormy.ai/blog/how-to-use-v0-dev-ai-web-development-guide",
                  duration: "10 min",
                },
                {
                  type: "template",
                  label: "Prompt structure: goal → user → screens → features — Lovable Docs",
                  url: "https://docs.lovable.dev/tips-tricks/from-idea-to-app",
                  duration: "5 min",
                },
              ],
            },
            {
              id: "8-2",
              number: "8.2",
              title: "Mobile prompting: specifics and differences from web",
              description:
                "A mobile prototype requires a different prompt. Specify iOS or Android, navigation type, touch element sizes, and the primary task. Otherwise, AI often generates a web interface with smaller fonts.",
              estimatedTime: "~20 min",
              resources: [
                {
                  type: "practice",
                  label: "Google Stitch — try the same prompt for web and mobile, compare results",
                  url: "https://stitch.withgoogle.com/",
                  duration: "20 min",
                },
              ],
            },
            {
              id: "8-3",
              number: "8.3",
              title: "Iteration: how to refine a prototype through AI chat",
              description:
                "AI prototyping is a dialogue. The first result is almost never final. This lesson covers how to give feedback, when to start over, and when to edit by hand.",
              estimatedTime: "~15 min",
              resources: [
                {
                  type: "article",
                  label: "No-Hype Tips: How to Iterate in Lovable — UX Collective",
                  url: "https://uxdesign.cc/getting-started-with-lovable-the-no-hype-beginner-tips-to-building-with-ai-36460d46249d",
                  duration: "7 min",
                },
                {
                  type: "article",
                  label: "Case Study: Iterative Design and Prototype Testing — NN/g",
                  url: "https://www.nngroup.com/articles/case-study-iterative-design-prototyping/",
                  duration: "8 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class practice",
              body: "Each participant transforms project requirements into a structured prompt: context, platform, user, scenario, key screens, and constraints. The facilitator gives feedback and demonstrates iteration.",
            },
          ],
          homework: {
            body: "Review the lesson resources on prompt writing, mobile prompting, and iteration. Try writing a structured prompt for a product scenario you work with. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant can translate requirements into a structured prompt for web or mobile, iterate a prototype through chat, and produce a prototype draft from a project scenario.",
        },
        {
          id: "module-09",
          number: "09",
          title: "7 AI tools: overview, demo, first launch",
          description:
            "Google Stitch, Claude Design, Figma Make, Lovable, and v0 for UI prototyping. Claude Code and Cursor for AI development awareness. Live demo of each, with mobile specifics.",
          format: "AI tools and live demo",
          duration: "120 min",
          goal: "Understand what each tool is best for and get first-hand practice under facilitator guidance.",
          lessons: [
            {
              id: "9-1",
              number: "9.1",
              title: "Google Stitch: step-by-step guide + mobile specifics",
              description:
                "Fastest start of the UI tools. Good for a first mobile prototype when you need a quick screen direction.",
              resources: [
                {
                  type: "article",
                  label: "Design Mobile App UI with Google Stitch — Codecademy",
                  url: "https://www.codecademy.com/article/google-stitch-tutorial-ai-powered-ui-design-tool",
                  duration: "15 min",
                },
              ],
            },
            {
              id: "9-2",
              number: "9.2",
              title: "Claude Design: generating UX concepts and reviewing prototypes",
              description:
                "Claude Design helps discuss an idea, generate solution options, or critique a prototype. It is useful before or alongside tools such as Figma Make and Lovable.",
              resources: [
                {
                  type: "practice",
                  label: "claude.ai/design — try a prompt for a mobile app user flow",
                  url: "https://claude.ai/design",
                  duration: "20 min",
                },
              ],
            },
            {
              id: "9-3",
              number: "9.3",
              title: "Figma Make: interactive prototype with screen navigation",
              description:
                "Figma Make supports clicks, transitions, and UI behavior. It is useful when the prototype needs to feel closer to a product than a static mockup.",
              resources: [
                {
                  type: "article",
                  label: "Figma Make Tutorial — Codecademy",
                  url: "https://www.codecademy.com/article/figma-make-tutorial",
                  duration: "15 min",
                },
              ],
            },
            {
              id: "9-4",
              number: "9.4",
              title: "Lovable: full web app for stakeholder demos",
              description:
                "Lovable is useful when a stakeholder needs to see how a web flow might work, not only click through a mockup. It generates front-end code with a shareable link.",
              resources: [
                {
                  type: "article",
                  label: "Getting Started with Lovable: No-Hype Tips — UX Collective",
                  url: "https://uxdesign.cc/getting-started-with-lovable-the-no-hype-beginner-tips-to-building-with-ai-36460d46249d",
                  duration: "10 min",
                },
                {
                  type: "official docs",
                  label: "From Idea to Working App — Lovable Docs",
                  url: "https://docs.lovable.dev/tips-tricks/from-idea-to-app",
                  duration: "7 min",
                },
              ],
            },
            {
              id: "9-5",
              number: "9.5",
              title: "v0: precise UI components by prompt",
              description:
                "v0 generates React/Tailwind components such as tables, forms, cards, and dashboards. It works best when you need a specific UI element, not a full flow.",
              resources: [
                {
                  type: "article",
                  label: "v0 by Vercel: A Guide With Demo Project — DataCamp",
                  url: "https://www.datacamp.com/tutorial/vercel-v0",
                  duration: "12 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class live demo",
              body: "The facilitator demonstrates each UI tool using one scenario, such as a mobile app for scheduling a service or a patient portal flow. Participants compare speed, UI quality, mobile behavior, and editability. Then the group sees a short Claude Code and Cursor demo: what a developer does with these tools after the prototype is validated.",
            },
            {
              title: "In-class practice: USRC patient app flow across tools",
              body: "The facilitator picks one flow from the USRC patient mobile app (such as appointment scheduling or a lab result view) and demonstrates how to prototype it using two or three of the tools covered today. Participants compare the speed, UI quality, and mobile behavior of each tool on the same real scenario. Discussion: which tool would you choose for this kind of project, and why?",
            },
          ],
          homework: {
            body: "Explore the AI tools covered in class using the guides linked in the lessons. Try generating at least one prototype using a tool of your choice. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant has first-hand experience with the UI tools, knows when to use each one, and understands the difference between UI prototyping and AI development.",
        },
        {
          id: "module-10",
          number: "10",
          title: "Validating AI concepts",
          description:
            "Common AI prototype mistakes, separately for web and mobile. Heuristic audit of your own prototype. Decision tree: what to rework and what to keep.",
          format: "Practice and audit",
          duration: "90 min",
          goal: "Check AI prototype quality independently before showing it to a stakeholder. The BA is the first quality filter.",
          lessons: [
            {
              id: "10-1",
              number: "10.1",
              title: "Common AI prototype mistakes: web and mobile separately",
              description:
                "AI repeats the same mistakes. On mobile: ignoring safe areas, undersized touch targets, and copied web navigation. On web: information overload and broken hierarchy.",
              estimatedTime: "~13 min",
              resources: [
                {
                  type: "article",
                  label: "The UX Reckoning 2025: where AI tools are still weak — NN/g",
                  url: "https://www.nngroup.com/articles/ux-reset-2025/",
                  duration: "8 min",
                },
                {
                  type: "article",
                  label: "Minimize Cognitive Load — NN/g (where AI overloads screens)",
                  url: "https://www.nngroup.com/articles/minimize-cognitive-load/",
                  duration: "5 min",
                },
              ],
            },
            {
              id: "10-2",
              number: "10.2",
              title: "Applying the heuristics workbook to your own prototype",
              description:
                "Participants return to the workbook and apply it to their own AI prototype. This is the practical skill: say what the problem is, where it appears, which principle it violates, and what should change.",
              estimatedTime: "~40 min practice",
              resources: [
                {
                  type: "workbook",
                  label: "Heuristic Evaluation Workbook (PDF) — NN/g: apply to your own prototype",
                  url: "https://media.nngroup.com/media/articles/attachments/Heuristic_Evaluation_Workbook_-_Nielsen_Norman_Group.pdf",
                  duration: "40 min",
                },
              ],
            },
            {
              id: "10-3",
              number: "10.3",
              title: "When to redo the prompt, when to edit, when to keep as is",
              description:
                "Not every problem deserves the same response. Critical failures break the logic and require a new prompt. Smaller clarity issues may be edited directly. Some rough edges are acceptable at lo-fi level.",
              estimatedTime: "~4 min",
              resources: [
                {
                  type: "article",
                  label: "UX Prototypes — NN/g (section on \"good enough\" prototypes)",
                  url: "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/",
                  duration: "4 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "In-class audit",
              body: "Each participant opens the prototype from Module 08 and runs the heuristic checklist across web and mobile aspects. They find at least three specific problems and argue them with principles. The facilitator reviews common group mistakes.",
            },
          ],
          homework: {
            body: "Review the lesson resources on common AI prototype mistakes and the heuristic evaluation process. Apply the heuristics workbook to your prototype from Module 08 if not completed in class. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this module, a participant can identify common AI prototype mistakes, argue them with UX principles, and complete a heuristic audit of their own prototype.",
        },
        {
          id: "module-11",
          number: "11",
          title: "Prototype as requirements defense: final project",
          description:
            "Full cycle: requirements, journey map, AI prototype, heuristic audit, stakeholder presentation scenario, and group defense.",
          format: "Final project and defense",
          duration: "120 min",
          goal: "Complete the full business analyst cycle from requirements to prototype and defend it in front of the group.",
          lessons: [
            {
              id: "11-1",
              number: "11.1",
              title: "How to present a prototype to a stakeholder: what to say, what not to",
              description:
                "A prototype is a tool for asking questions. The right framing is \"help us verify that we understood this correctly.\" For mobile work, show it on a real device when possible.",
              estimatedTime: "~7 min",
              resources: [
                {
                  type: "article",
                  label: "Usability Testing 101 — NN/g",
                  url: "https://www.nngroup.com/articles/usability-testing-101/",
                  duration: "7 min",
                },
              ],
            },
            {
              id: "11-2",
              number: "11.2",
              title: "Documenting decisions after a stakeholder session",
              description:
                "After a prototype review, the stakeholder gives feedback. The BA needs to capture what changes in requirements, what needs another validation pass, and what belongs in the next iteration.",
              estimatedTime: "~7 min",
              resources: [
                {
                  type: "article",
                  label: "7 Ways to Analyze a Customer Journey Map — NN/g",
                  url: "https://www.nngroup.com/articles/analyze-customer-journey-map/",
                  duration: "7 min",
                },
              ],
            },
          ],
          workshops: [
            {
              title: "Final project: group defense",
              body: "The full business analyst cycle: take a one-paragraph stakeholder request, build a user journey map, choose an AI tool and generate a 3–5 screen prototype for web or mobile, run a heuristic audit using the NN/g workbook, prepare a presentation scenario with 3 questions to validate with a stakeholder, and defend the work for 5 minutes. Evaluation criteria: clear user flow, prototype matches requirements, audit identifies real problems, presentation questions test assumptions.",
            },
            {
              title: "In-class workshop: patient account dashboard from the USRC mobile app",
              body: "The facilitator presents a patient account or dashboard flow from the USRC patient mobile app, one that has no equivalent on the web version. Participants take the mobile flow and assemble a prototype version of it using the AI tools and prompting methods from earlier modules. The goal is to translate a real, familiar product flow into a prototype that could start a web implementation conversation.",
            },
          ],
          homework: {
            body: "No pre-reading required. Review the full NN/g heuristic evaluation workbook before your final defense presentation. Independent practice exercises will be added before finalizing the learning program.",
          },
          outcome:
            "After this course, a participant has practiced the full cycle: requirements, journey, prototype, heuristic audit, and stakeholder validation. The result is not just a file. It is a repeatable way to turn vague input into a prototype that can be discussed.",
        },
      ],
    },
  ],
};

/* ============================================================
   AI TOOLS (Module 09 overview, promoted to its own section)
   ============================================================ */
export type ToolCategory = "UI / Mobile" | "UI / Concepts" | "UI / Interactive" | "UI / Live demo" | "UI / Components" | "AI Dev / CLI" | "AI Dev / IDE";

export type Tool = {
  id: string;
  name: string;
  url: string;
  category: ToolCategory;
  group: "UI" | "AI Dev";
  tagline: string;
};

export const tools: { heading: string; items: Tool[] } = {
  heading: "AI tools covered",
  items: [
    {
      id: "google-stitch",
      name: "Google Stitch",
      url: "https://stitch.withgoogle.com/",
      category: "UI / Mobile",
      group: "UI",
      tagline: "Fastest start. Text to mobile screen in about 90 seconds. Gemini models.",
    },
    {
      id: "claude-design",
      name: "Claude Design",
      url: "https://claude.ai/design",
      category: "UI / Concepts",
      group: "UI",
      tagline: "UX consultant and UI concept generator. Useful alongside other tools.",
    },
    {
      id: "figma-make",
      name: "Figma Make",
      url: "https://www.figma.com/make/",
      category: "UI / Interactive",
      group: "UI",
      tagline: "Interactive prototype with navigation. Web and mobile. Close to a real product experience.",
    },
    {
      id: "lovable",
      name: "Lovable",
      url: "https://lovable.dev/",
      category: "UI / Live demo",
      group: "UI",
      tagline: "Live web app for demos. Generates front-end code.",
    },
    {
      id: "v0",
      name: "v0 (Vercel)",
      url: "https://v0.dev/",
      category: "UI / Components",
      group: "UI",
      tagline: "React/Tailwind components. Strong for specific interface elements.",
    },
    {
      id: "claude-code",
      name: "Claude Code",
      url: "https://claude.ai/code",
      category: "AI Dev / CLI",
      group: "AI Dev",
      tagline: "AI development agent via terminal. Included so BAs understand how developers may use it.",
    },
    {
      id: "cursor",
      name: "Cursor",
      url: "https://www.cursor.com/",
      category: "AI Dev / IDE",
      group: "AI Dev",
      tagline: "AI-powered code editor with chat. Included so BAs understand when technical teams may use it.",
    },
  ],
};

/* ============================================================
   INCLUDED MATERIALS (§6) — 8 chips
   ============================================================ */
export const includedMaterials = {
  heading: "Included materials",
  items: [
    "Journey map and user-flow examples",
    "Prompt structure for web and mobile prototypes",
    "Screen anatomy reference",
    "Visual audit worksheet",
    "Design-system terminology reference",
    "Heuristic evaluation workbook",
    "AI tool comparison matrix",
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
      question: "Is this a design course?",
      answer:
        "No. It teaches enough UX and UI judgment for BA/BSA and technical teams to create and critique prototype drafts. Production design remains a designer responsibility.",
    },
    {
      id: "faq-2",
      question: "Are these prototypes production-ready?",
      answer:
        "No. They are validation drafts. They help teams test whether they understood the requirement before design and development effort increases.",
    },
    {
      id: "faq-3",
      question: "Do participants need coding skills?",
      answer:
        "No coding is required for the BA/BSA exercises. Claude Code and Cursor are included so participants understand how developers may use AI after handoff.",
    },
    {
      id: "faq-4",
      question: "Can the AI tools change before finalizing the learning program?",
      answer:
        "Yes. Tool access, pricing, and features change quickly. The module can be refreshed before finalizing the learning program without changing the core course logic.",
    },
    {
      id: "faq-5",
      question: "How is this relevant to U.S. Renal Care?",
      answer:
        "The examples can use healthcare workflows where useful, such as patient portal flows, scheduling, provider dashboards, lab review, and clinic operations. The underlying skills are general product skills: understand users, structure flows, prototype, critique, and validate.",
    },
  ],
};

/* ============================================================
   SKILLS AFTER COURSE (§8) — 6 items
   ============================================================ */
export const skillsAfterCourse = {
  heading: "Skills after the course",
  items: [
    "Read and critique a web or mobile interface using the language of principles: heuristics, hierarchy, cognitive load, and mobile specifics.",
    "Understand design systems: components, tokens, and patterns. Read a Figma library and write clearer requirements for the team.",
    "Build user journey maps and user flows from stakeholder requirements for web and mobile contexts.",
    "Select the right AI tool for the task and generate a prototype using a structured prompt.",
    "Conduct a heuristic audit of a prototype and identify UX problems before showing it to a stakeholder.",
    "Use the prototype as a requirements validation tool in conversation with a stakeholder.",
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
    { id: "tools", label: "Tools" },
    { id: "faq", label: "FAQ" },
  ],
};
