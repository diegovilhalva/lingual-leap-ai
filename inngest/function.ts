import { lessongeneratorParams, translatorParams } from "@/types";
import { inngest } from "./client";
import { generateLesson as lessonGenerator, translateText } from "@/services/gemini"
import { NonRetriableError } from "inngest";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
export const generateLesson = inngest.createFunction(
  { id: "lingualleap" },
  { event: "lingua/generate-lesson" },
  async ({ event, step }) => {
    const { topic, proficiency, selectedLanguage, userId } =
      event.data as lessongeneratorParams;
    const plan = await step.run("Generate Lession", async () => {
      try {
        const plan = await lessonGenerator(topic, proficiency, selectedLanguage);
        return plan;
      } catch (error) {
        console.log(error);
        return null;
      }
    });
    const Saved = await step.run("Save the Lession", async () => {
      try {
        if (!plan) throw new NonRetriableError("No lesson plan generated");
        await addDoc(collection(db, "lessons"), {
          language: selectedLanguage,
          proficiency: proficiency,
          topic: topic,
          lessonPlan: plan,
          userId: userId,
          createdAt: Timestamp.now(),
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    });
    return {
      plan: plan,
      Saved,
    };
  },
);


export const translator = inngest.createFunction(
  { id: "lingua-translator" },
  { event: "lingua/translate" },
  async ({ event, step }) => {
     const { userId, sourceLangName, targetLangName, text, selectedLanguage } =
      event.data as translatorParams;
        const translatedText = await step.run("Save the translations", async () => {
      try {
        const translatedText = await translateText(
          text,
          sourceLangName,
          targetLangName
        );
        return translatedText;
      } catch (error) {
        console.log(error);
      }
  })

     const Saved = await step.run("Save the translations", async () => {
      try {
        await addDoc(collection(db, "translations"), {
          translatedText,
          sourceLangName,
          targetLangName,
          originalText: text,
          userId: userId,
          selectedLanguage: selectedLanguage,
          createdAt: Timestamp.now(),
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    });

      return {
      translatedText,
      Saved,
    };
  }
);
