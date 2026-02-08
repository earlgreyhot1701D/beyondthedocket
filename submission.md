# From Jury Coordinator to AI Builder in 6 Months

%}*This is a submission for the [New Year, New You Portfolio Challenge Presented by Google AI](https://dev.to/challenges/new-year-new-you-google-ai-2025-12-31)*

---

> **Feb 2026 Update**: Since the original submission, the `gemini-2.0-flash-exp` model and `@google/generative-ai` SDK have been deprecated. To ensure this portfolio remains live and functional for judges and visitors, I have migrated the backend to the stable **Gemini 2.5 Flash** model using the new Google Gen AI SDK (`@google/genai`).

---

## About Me

Six months ago, I was a Judicial Services Manager for Santa Barbara Superior Court. My job: answer jury service questions. People would call with the same questions over and over.

"Am I eligible?" "What does this legal code mean?" "Can I defer my service?"

I'd look it up. Write an email. Repeat 200 times a month.

One day it hit me: this is a perfect AI problem. The answers already exist in California legal code. They just need to be retrieved and explained clearly. No hallucinations. No guessing.

So I built a chatbot. Took a weekend. Used AWS Bedrock and Claude. Fed it the legal code so responses were auditable.

It worked. Court staff use it now.

That one project changed something. I realized I could build. I could ship. I could solve real problems with code.

Over the next six months, I shipped 14+ projects. Won two hackathons. Went from "I wonder if I can do this" to "Yeah, I can ship things."

This portfolio documents that journey. It's not a resume. It's evidence of what you can do when you start solving problems instead of planning.

I'm still a Judicial Services Manager (that's my actual job title). But I'm also someone who builds AI applications. The portfolio is the proof.

---

## Portfolio

{% embed https://beyond-the-docket-489960083310.us-west1.run.app/ %}

The portfolio is interactive. Click around. Here's what you'll find:

**4 Major Projects** (Timeline view showing my 6-month journey):
- **Jury Eligibility Chatbot (July)** - RAG-powered, production-ready
- **PDF Text Extractor (August)** - Cohort Member & AI Builder (Selected 1 of 100). Built the core PDF engine. Team took 2nd place
- **Janus-Clew (December)** - Won AWS Vibe Hackathon. Growth tracking using complexity metrics
- **Athena-Clew (January)** - Built for Gemini 3 Hackathon. Autonomous debugging with Deep Thinking

**10 Side Projects** (Collapsible section):
- Court innovation tools (jury management, access control)
- Hackathon submissions (event ticketing, pattern detection, sprint planning)
- Creative builds (hot sauce analyzer, trip planner, typing game)

The best feature? The **case study generator**. Keep reading to understand why I built it.

---

## How I Built It

### The Tech Stack

**Frontend**:
- React 19 + TypeScript (type safety, modern patterns)
- Vite (sub-100ms hot reload)
- Tailwind CSS (utility-first, custom color system)
- Framer Motion (smooth animations)

**Backend**:
- Node.js + Express (minimal, focused)
- **Gemini 2.5 Flash API** (Updated from 2.0/1.5 due to deprecation. Migrated to the new `@google/genai` SDK for 2026 stability.)
- GitHub API (live metadata syncing)

**Infrastructure**:
- Docker multi-stage build (frontend compilation + backend bundling)
- **Google Cloud Run** (deployment, global distribution)

### How I Used Gemini (The Case Study Generator)

**The Problem**: Developers market their work differently depending on who's reading.

**Concrete example**: The PDF extractor project.

When I apply for a job, I write:
> "Led development of PDF extraction engine for accessibility platform. Implemented custom OCR integration with PyPDF2, achieving 95% accuracy. Selected for innovation cohort (100 from 1,300 applicants). Team placed 2nd out of 14."

When I write a blog post, I write:
> "We had 36 hours and a crazy ambitious goal. My teammate Cai and I stayed up until 1am debugging a cursed .env file. But Friday morning it worked. Our team took 2nd place. Here's what we learned about working under pressure."

Same project. Completely different narratives. One sounds professional. One sounds human. Both are true.

Most developers write both versions and it's tedious. Or they pick one and hope it works.

**Solution**: Built a dual-mode case study generator powered by **Gemini 2.0 Flash**.

You input your project data once. Then:

**Blog Post Mode** outputs:
- Personal narrative (your thinking, decisions, learnings)
- Conversational tone
- Suitable for LinkedIn, personal blog, Twitter threads
- Gives hiring managers a sense of who you are

**Professional Mode** outputs:
- Professional case study (problem → solution → technical approach → results)
- Metrics-focused
- Suitable for resumes, job applications, investor pitches
- Gives hiring managers proof you can execute

**Why Gemini 2.0 Flash specifically?**
- **Speed**: Sub-2-second generation (critical for UX—people won't wait 10 seconds for content)
- **Quality**: Produces publication-ready markdown without hallucinating
- **Context awareness**: Understands the difference between narrative voice and corporate voice
- **Cost**: Free tier covers the entire demo load

### Built in 12 Hours Using Antigravity

I used Google's **Antigravity** development environment (with its Chrome extension for real-time browser testing):

- **Tight Feedback Loop**: The extension was critical. Instead of constantly switching to the browser to test, the extension showed me everything in real-time. Caught bugs before they became problems.
- **Context-Aware Coding**: Antigravity handled the heavy lifting of boilerplate and API integrations, allowing me to focus on the "Complexity Velocity" narrative and UX.

---

## What I'm Most Proud Of

### 1. The Case Study Generator Actually Works
It's not a gimmick. It solves a real problem I had (and other developers have too). You can generate publication-ready case studies in 2 seconds. That's useful engineering.

### 2. Live GitHub Integration
Every project card shows real data: stars, language, last update. Not because it looks cool. Because I wanted the portfolio to feel alive, not frozen.

### 3. Editorial Design Language
The portfolio uses an editorial design system with strategic colors:
- **Tech Blue**: Foundation of trust
- **Innovation Purple**: Modern sophistication  
- **Achievement Gold**: Highlighting wins
- **Energy Cyan**: Interactive feedback

### 4. The Velocity Narrative
The timeline shows six months of escalating projects. Not a list of accomplishments. A story of velocity.

---

## What's Next

I have a backlog:
- Real-time complexity scoring (automated metrics on projects)
- Resume generation from project data
- Export case studies to different formats

But honestly? These projects solved what I needed solved. The portfolio is done.

---

## Stack & Credits

**GitHub**: [github.com/earlgreyhot1701D/beyondthedocket](https://github.com/earlgreyhot1701D/beyondthedocket)  
**License**: MIT

Built with:
- React 19 + TypeScript
- Gemini 2.5 Flash (case study generation)
- Google Cloud Run (hosting)
- Antigravity (development environment)

---

**La Shara Cordero**  
Judicial Services Manager by day, AI builder by commit  
[LinkedIn](https://www.linkedin.com/in/la-shara-cordero-a0017a11/) | [GitHub](https://github.com/earlgreyhot1701D) | [Blog](https://theforumfiles.substack.com/)

---

**Tags:** #devchallenge #googleaichallenge #portfolio #gemini
