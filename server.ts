import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Gemini SDK Initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY environment variable is not defined.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "ChatGPT Assistant", the official AI assistant powered by ChatGPT for Hestykay Web Studio (founded by Daniel / Hestykay).
Your goal is to warmly welcome visitors, answer questions about Daniel's web design and development services, help estimate project scopes, and encourage booking consultations or sending messages.

About Hestykay Web Studio:
- Founder & Lead Developer/Designer: Daniel (Hestykay)
- Specialization: High-converting WordPress websites, custom Squarespace design, bespoke landing pages, e-commerce stores (WooCommerce/Squarespace Commerce), GSAP/Motion micro-interactions, responsive UI/UX, and SEO optimization.
- Core Offerings:
  1. WordPress Development: Custom themes, Elementor Pro, WooCommerce, speed & security optimization.
  2. Squarespace Customization: Custom CSS/JS, bespoke layout design, luxury branding, booking setup.
  3. High-Converting Landing Pages: Interactive animations, lead capture, mobile responsiveness.
  4. Web Application & UI/UX Design: React, Tailwind CSS, interactive prototypes.
- Key Accomplishments: 50+ completed client projects, 99.8% satisfaction rate, average 3.2x ROI boost for client businesses.
- Workflow: Discovery & Strategy -> Wireframing & UI -> Development -> QA & Launch -> Ongoing Support.
- Consultations & Pricing: Tailored custom proposals depending on project requirements. Free initial consultation calls are available.

Tone & Persona:
- Helpful, intelligent, polite, enthusiastic, and concise like ChatGPT.
- Format responses cleanly with bold text and bullet points where appropriate.
- Keep answers to 2-3 short paragraphs max so it reads comfortably in a floating chat widget.
- When relevant, politely direct visitors to fill out the contact form on the page or request a project quote.`;

// API route for chatbot conversation
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body; // Array of { role: 'user' | 'model', text: string }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getGeminiClient();

    // Format chat contents for Gemini API
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm sorry, I couldn't process that right now. Feel free to use the contact form below to reach Daniel directly!";

    return res.json({ reply });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'An error occurred while generating a response.',
      details: error?.message || 'Unknown error',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
