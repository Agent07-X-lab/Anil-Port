'use server';

/**
 * @fileOverview AI-powered chatbot integration for Anil's portfolio.
 *
 * - integrateAIChatbot - A function to integrate the AI chatbot.
 * - IntegrateAIChatbotInput - The input type for the integrateAIChatbot function.
 * - IntegrateAIChatbotOutput - The return type for the integrateAIChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrateAIChatbotInputSchema = z.object({
  query: z.string().describe('The user query for the chatbot.'),
});
export type IntegrateAIChatbotInput = z.infer<typeof IntegrateAIChatbotInputSchema>;

const IntegrateAIChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type IntegrateAIChatbotOutput = z.infer<typeof IntegrateAIChatbotOutputSchema>;

export async function integrateAIChatbot(input: IntegrateAIChatbotInput): Promise<IntegrateAIChatbotOutput> {
  return integrateAIChatbotFlow(input);
}

const integrateAIChatbotPrompt = ai.definePrompt({
  name: 'integrateAIChatbotPrompt',
  input: {schema: IntegrateAIChatbotInputSchema},
  output: {schema: IntegrateAIChatbotOutputSchema},
  prompt: `You are an AI-powered chatbot integrated into Anil Kumar Sahu's portfolio website. Your purpose is to provide information about Anil's skills, projects, and experience, and answer questions from website visitors.

  Here's some information about Anil Kumar Sahu:
  - Name: Anil Kumar Sahu
  - Title: Full-Stack Developer & UI/UX Designer
  - Education: B.Tech Student at PME College
  - Location: Odisha, Berhampur, India
  - Tagline: "Crafting Digital Experiences Through Code & Design"

  Skills:
  - Frontend Development: React.js (Advanced), JavaScript (ES6+) (Advanced), HTML5 & CSS3 (Advanced), Tailwind CSS (Intermediate), Three.js (Intermediate), TypeScript (Intermediate), Next.js (Learning)
  - Backend Development: Node.js (Advanced), Express.js (Advanced), RESTful APIs (Advanced), JWT Authentication (Intermediate)
  - Database: MongoDB (Intermediate), MySQL (Intermediate), SQL (Advanced), PostgreSQL (Intermediate), Firebase (Intermediate)
  - Design & Tools: Figma (Advanced), Adobe XD (Intermediate), UI/UX Design (Advanced), Git & GitHub (Advanced), VS Code (Advanced), Postman (Intermediate)

  Projects:
  - AI-Powered Chatbot: React, Node.js, OpenAI GPT API, Express, MongoDB. Intelligent chatbot with memory that provides human-like responses.
  - Advanced Task Management System: React, Node.js, MongoDB, Socket.io, JWT, Tailwind. Full-featured project management tool for teams.
  - Smart To-Do List Application: React, Firebase, Framer Motion, LocalStorage. Beautiful and intuitive task organizer with smart features.
  - SQL Database Dashboard: React, Node.js, MySQL, PostgreSQL, Chart.js, Recharts. Powerful database management tool with analytics.
  - E-Commerce Platform: React, Node.js, MongoDB, Stripe, Redux. Full-stack online shopping platform.
  - Weather Forecast App: React, OpenWeather API, Mapbox, Geolocation. Real-time weather app with stunning visuals.

  Please respond to the following query:
  {{query}}`,
});

const integrateAIChatbotFlow = ai.defineFlow(
  {
    name: 'integrateAIChatbotFlow',
    inputSchema: IntegrateAIChatbotInputSchema,
    outputSchema: IntegrateAIChatbotOutputSchema,
  },
  async input => {
    const {output} = await integrateAIChatbotPrompt(input);
    return output!;
  }
);
