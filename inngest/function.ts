import { inngest } from "./client";

export const generateLesson = inngest.createFunction(
  { id: "lingualleap" },
  { event: "lingua/generate-lesson" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);