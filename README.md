
# Lingual Leap AI 🚀

**Lingual Leap AI** is an AI-powered language learning platform that generates personalized lessons and translations using **Google Gemini**, real-time storage with **Firebase**, background jobs via **Inngest**, and modern SaaS billing with **Polar**.

Users can generate custom lesson plans, translate text between languages, listen with text-to-speech, and unlock premium features through a PRO subscription.

🌍 Live Demo: https://lingual-leap-ai.vercel.app  
📦 GitHub Repo: https://github.com/diegovilhalva/lingual-leap-ai

---

## ✨ Features

- 🤖 AI-generated personalized language lessons (Gemini)
- 🌐 Real-time AI-powered text translation
- 🔊 Text-to-Speech pronunciation support
- 📚 Lesson history & translation history
- 🔐 Authentication with Firebase (Email, Google, GitHub)
- 💾 Realtime database with Firestore
- 🧠 Background jobs & workflows with Inngest
- 💳 PRO subscriptions & billing via Polar
- 🎨 Modern UI with Tailwind & shadcn/ui
- 🌓 Dark mode & theme support
- ⚡ Fast Next.js 16 App Router architecture

---

## 🧱 Tech Stack

**Frontend**
- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

**Backend / Services**
- Firebase (Auth, Firestore)
- Google Gemini AI
- Inngest (Background Jobs & Event-driven workflows)
- Polar (Payments & Subscriptions)

---

## 🔐 Environment Variables

Create a `.env.local` file and configure the following:

```env
POLAR_SUCCESS_URL=http://localhost:3000/dashboard?checkout=success

INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

SESSION_SECRET=

POLAR_ACCESS_TOKEN=
POLAR_PRODUCT_ID=

GOOGLE_API_KEY=
````

---

## 🛠 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/diegovilhalva/lingual-leap-ai.git
cd lingual-leap-ai
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Start Inngest locally:

```bash
npx inngest-cli dev
```

Open the app:

```
http://localhost:3000
```

---

## 🧠 How It Works

### Lesson Generation

* Users select topic, language, and proficiency
* Gemini generates structured lesson plans
* Lessons are stored in Firestore
* Inngest manages async processing

### Translation

* Users submit text for translation
* Gemini processes translations
* Results are stored & streamed back in real-time

### Monetization

* Free users have limited access
* PRO users unlock premium languages & features
* Polar handles subscriptions and checkout

---

## 🧪 Example Use Cases

* Language learners
* Teachers & tutors
* Travelers
* Developers testing AI workflows
* SaaS MVP demos

---

## 🗺 Roadmap (Planned)

* ✅ More languages
* ✅ Cloud-based Text-to-Speech fallback
* ⏳ Speech-to-Text
* ⏳ User progress tracking
* ⏳ Gamification & streaks
* ⏳ Mobile-first PWA
* ⏳ Public API access

---

## 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss improvements.

---

## 🧑‍💻 Author

**Diego Vilhalva**
GitHub: [https://github.com/diegovilhalva](https://github.com/diegovilhalva)
Live App: [https://lingual-leap-ai.vercel.app](https://lingual-leap-ai.vercel.app)

---

## ⭐ If you like this project

Give it a star — it helps a lot!
