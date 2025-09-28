# 🔄 AI INTERVIEWER - PROJECT FLOW DIAGRAM

## 📱 USER JOURNEY FLOW

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   LANDING PAGE  │───▶│   SIGN UP/IN    │───▶│    DASHBOARD    │
│                 │    │                 │    │                 │
│ • Hero Section  │    │ • Registration  │    │ • Statistics    │
│ • Features      │    │ • Email Verify  │    │ • Start New     │
│ • Pricing       │    │ • Login Form    │    │ • History       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     RESULTS     │◀───│   INTERVIEW     │◀───│ CREATE INTERVIEW│
│                 │    │                 │    │                 │
│ • Score Display │    │ • Question 1/15 │    │ • Job Role      │
│ • PDF Download  │    │ • Timer: 3:00   │    │ • Experience    │
│ • Feedback      │    │ • Answer Input  │    │ • Company       │
│ • Retake Option │    │ • Next/Previous │    │ • Generate Qs   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🏗️ TECHNICAL ARCHITECTURE FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                      │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   AUTH PAGES    │  DASHBOARD PAGE │     INTERVIEW PAGES         │
│                 │                 │                             │
│ • /sign-up      │ • /dashboard    │ • /interview/create         │
│ • /sign-in      │ • Statistics    │ • /interview/[id]           │
│ • /verify       │ • History       │ • /interview/[id]/results   │
└─────────────────┴─────────────────┴─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API ROUTES (Backend)                       │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   AUTH APIs     │    AI APIs      │     INTERVIEW APIs          │
│                 │                 │                             │
│ • /api/sign-up  │ • /api/getqs    │ • /api/interview/create     │
│ • /api/sign-in  │ • /api/evaluate │ • /api/interview/[id]       │
│ • /api/verify   │ • /api/createpdf│ • /api/interview/save       │
└─────────────────┴─────────────────┴─────────────────────────────┘
                                │
                                ▼
┌─────────────────┬─────────────────┬─────────────────────────────┐
│    DATABASE     │   AI SERVICE    │        EXTERNAL             │
│                 │                 │                             │
│ • MongoDB       │ • Gemini 2.5    │ • Redis (Cache)             │
│ • User Model    │ • Question Gen  │ • Nodemailer (Email)        │
│ • Interview     │ • Evaluation    │ • Puppeteer (PDF)           │
│ • Questions     │ • Scoring       │ • Vercel (Hosting)          │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

---

## 🔄 INTERVIEW EXECUTION FLOW

```
START INTERVIEW
       │
       ▼
┌─────────────────┐
│  Generate Qs    │ ──── AI API Call ────┐
│  Store in DB    │                      │
└─────────────────┘                      │
       │                                 │
       ▼                                 │
┌─────────────────┐                      │
│ Question 1/15   │◀─────────────────────┘
│ Timer: 3:00     │
│ [Answer Input]  │
└─────────────────┘
       │
       ▼
┌─────────────────┐
│   Auto-Save     │ ──── Every 30 seconds
│   Answer        │
└─────────────────┘
       │
       ▼
┌─────────────────┐
│   Next/Prev     │ ──── Navigation
│   Question      │
└─────────────────┘
       │
       ▼ (After Q15)
┌─────────────────┐
│  Submit All     │ ──── AI Evaluation ────┐
│  Answers        │                        │
└─────────────────┘                        │
       │                                   │
       ▼                                   │
┌─────────────────┐                        │
│ Show Results    │◀───────────────────────┘
│ Generate PDF    │
│ Save History    │
└─────────────────┘
```

---

## 📊 DATA FLOW DIAGRAM

```
USER INPUT ──────┐
                 │
                 ▼
┌─────────────────────────────────┐
│         FRONTEND STATE          │
│                                 │
│ • currentQuestion: 1            │
│ • answers: [{qid:1, ans:"..."}] │
│ • timeLeft: 180                 │
│ • interviewId: "abc123"         │
└─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│         API ENDPOINTS           │
│                                 │
│ POST /api/interview/create      │
│ GET  /api/interview/[id]        │
│ PUT  /api/interview/save        │
│ POST /api/interview/evaluate    │
└─────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│         DATABASE STORAGE        │
│                                 │
│ Interview: {                    │
│   userId, questions, answers,   │
│   status, score, createdAt      │
│ }                               │
└─────────────────────────────────┘
```

---

## 🎯 MISSING COMPONENTS TO BUILD

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ ❌ MISSING      │    │ ❌ MISSING      │    │ ❌ MISSING      │
│                 │    │                 │    │                 │
│ Interview       │    │ Question        │    │ Results         │
│ Creation Page   │    │ Display Page    │    │ Display Page    │
│                 │    │                 │    │                 │
│ /interview/     │    │ /interview/     │    │ /interview/     │
│ create          │    │ [id]            │    │ [id]/results    │
└─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ ❌ MISSING      │    │ ❌ MISSING      │    │ ❌ MISSING      │
│                 │    │                 │    │                 │
│ Interview       │    │ Timer           │    │ Auto-Save       │
│ Model           │    │ Component       │    │ Hook            │
│                 │    │                 │    │                 │
│ Database        │    │ React           │    │ useEffect       │
│ Schema          │    │ Component       │    │ Logic           │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🚀 IMPLEMENTATION ORDER

```
1. CREATE MODELS     ──▶  Interview, Question, Answer schemas
                          │
2. BUILD CREATION    ──▶  Form to select job/company/experience  
                          │
3. BUILD DISPLAY     ──▶  Show questions with timer
                          │
4. ADD NAVIGATION    ──▶  Next/Previous buttons
                          │
5. ADD AUTO-SAVE     ──▶  Save answers every 30s
                          │
6. BUILD RESULTS     ──▶  Show scores and feedback
                          │
7. CONNECT PDF       ──▶  Use existing PDF APIs
```

This visual flow shows exactly what you need to build and how everything connects!