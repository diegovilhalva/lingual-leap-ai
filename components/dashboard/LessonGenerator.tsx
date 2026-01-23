"use client"

import { GeneratorIcon } from "@/constants/icons/Generator";
import { LessonPlan, Proficiency, User } from "@/types";
import { FC, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LANGUAGES, PROFICIENCY_LEVELS } from "@/constants/constants";
import { Button } from "../ui/button";
import { LoadingSpinner } from "@/constants/icons/LoadingSpinner";
import GeneratedLesson from "./GeneratedLesson";
import { lessongeneratorTrigger } from "@/services/inngestTrigger";
import { toast } from "sonner";

interface LessonGeneratorProps {
  selectedLanguage: string;
  user: User;
}

const LessonGenerator: FC<LessonGeneratorProps> = ({ selectedLanguage, user }) => {
  const [topic, setTopic] = useState<string>("Ordering food at a restaurant");
  const [proficiency, setProficiency] = useState<Proficiency>(
    Proficiency.Beginner
  );
  const [lessonPlan, setLessonPlan] = useState<
    | {
      lessonPlan: LessonPlan;
      language: string;
      proficiency: Proficiency;
      topic: string;
    }[]
    | null
  >(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const language = LANGUAGES.find(
    (language) => language.name === selectedLanguage
  );

  const handleGenerateLesson = async () => {
    if (!user.isPro && language?.pro) {
      setError("Select language is only available for PRO members");
      toast.error("Select language is only available for PRO members");
      return;
    }

    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    // console.log("Selected Language:", selectedLanguage);
    if (!selectedLanguage) {
      setError("Please select a language.");
      return;
    }

    setIsLoading(true);
    setError(null)

    try {
      await lessongeneratorTrigger({
        topic,
        proficiency,
        selectedLanguage,
        userId: user.id,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center text-xl font-bold text-primary">
        <GeneratorIcon />
        <h2>Dynamic Lesson Generator</h2>
      </div>
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="topic"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Lesson Topic
          </Label>
          <Input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Ordering food, booking a hotel"
            className="dark:text-white"
          />
        </div>
        <div>
          <Label
            htmlFor="proficiency"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Proficiency Level
          </Label>
          <Select
            onValueChange={(proficiency) =>
              setProficiency(proficiency as Proficiency)
            }
            value={proficiency}
          >
            <SelectTrigger className="w-full dark:text-white">
              <SelectValue placeholder="Select Proficiency" />
            </SelectTrigger>
            <SelectContent>
              {PROFICIENCY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={handleGenerateLesson}
        >
         {isLoading ? <LoadingSpinner /> : "Generate Lesson"}
        </Button>
        {error && (
          <div className="text-red-500 text-sm p-3 bg-red-100 dark:bg-red-900/50 rounded-md">
            {error}
          </div>)}
        <div className="transition-opacity duration-500">
          {isLoading && !lessonPlan && (
            <div className="text-center p-8 space-y-3">
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                Generating your personalized lesson...
              </p>
            </div>
          )}
          {lessonPlan && lessonPlan.length > 0 && (
            <GeneratedLesson
              lesson={lessonPlan}
              selectedLanguage={selectedLanguage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonGenerator