import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint for Cloud Run and monitoring probes
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'healthy', app: 'I-EXPLR' });
  });

  // Server-side Gemini API route for "Plan with AI"
  app.post('/api/plan-trip', async (req: Request, res: Response) => {
    try {
      const { prompt } = (req.body as any) || {};
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Structured fallback when no API key is provided
        return res.json({
          title: 'The Whispering Mist & Mountain Hearth',
          tagline: 'Where early dawn clouds meet village aromas and campfire embers.',
          destination: 'Western Ghats & Coorg',
          duration: '3 Days / 2 Nights',
          vibe: 'Soulful, unrushed, acoustic and nature-immersed',
          sakiNote: "I've tailored this route for slow mornings and unhurried steps. Let the cedar breeze clear the mind, and never rush a cup of filter kaapi on a misty ridge.",
          itinerary: [
            {
              day: 1,
              title: 'Trade Traffic for Trails & Hilltop Sunset',
              highlight: 'Arrive at an off-grid plantation homestay, brew fresh mountain filter kaapi, and take a twilight ridge walk.',
              activities: 'Wade across crystal streams with local naturalist; listen to evening bird calls.',
            },
            {
              day: 2,
              title: 'Dawn Clouds & Sizzling Benne Dosa Feast',
              highlight: 'Start before the alarm; stand above floating sea of clouds as the sky turns gold.',
              activities: 'Descent to the village hearth for hot Davanagere Benne Dosa; afternoon tea-picking masterclass.',
            },
            {
              day: 3,
              title: 'Campfire Harmonies & The Stories That Stay',
              highlight: 'Gather around glowing cedar embers with fellow travelers under the Milky Way.',
              activities: 'Acoustic folk songs, sharing stories, and leaving as friends with memories to tell for years.',
            },
          ],
          localFoodNote: 'Crispy Benne Dosa, fresh harvested cardamom tea, and clay-pot village biryani.',
          guideAdvice: 'Travel with a born-and-raised local tracker who knows trails beyond Google Maps.',
          companionVibe: 'Ideal for 2-4 easygoing travelers who cherish laughter and slow mornings.',
        });
      }

      const ai = new GoogleGenAI();
      const systemInstruction = `You are Saki, the soulful AI travel companion and lead itinerary architect for I-EXPLR ("Where Every Journey Finds Meaning").
As Saki, your tone is warm, poetic, evocative yet grounded, and deeply encouraging. You know India's remote trails, indigenous sherpas and guides, village culinary traditions, and vibrant creative workshops (pottery, painting, acoustic jamming, standup comedy) inside out.

I-EXPLR features six core pillars:
1. Local Experiences (village cooking like Kashmiri dum biryani, tea picking in Munnar, Theyyam in Kannur, Pabbas ice cream in Mangalore)
2. Weekend/Weekday Treks (trading traffic for trails, hot Benne Dosa on hilltops, campfire music)
3. Local Guides (navigators for no-network zones, reading forest trails)
4. Events (open-air cinema under stars, acoustic jam circles, pottery & painting workshops, standup comedy)
5. Companions (finding your people, sharing plans, human connection)
6. Plan with Saki (this AI travel architect feature)

Output valid JSON matching this schema:
{
  "title": string (evocative, editorial title),
  "tagline": string (soulful, poetic one-liner),
  "destination": string,
  "duration": string (e.g. "2 Days / 1 Night" or "3 Days / 2 Nights"),
  "vibe": string,
  "sakiNote": string (a warm, heartfelt personal message from Saki to the traveler),
  "itinerary": [
    {
      "day": number,
      "title": string,
      "highlight": string,
      "activities": string
    }
  ],
  "localFoodNote": string (specific regional foods e.g. Benne Dosa, Mangalore buns, Kahwa),
  "guideAdvice": string (specific no-network and local guide guidance),
  "companionVibe": string (ideal travel buddy dynamics)
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Create a soulful, realistic I-EXPLR itinerary as Saki based on the user request: "${prompt}". Return ONLY JSON.`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text || '{}';
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (parseError) {
        return res.json({
          title: 'Custom I-EXPLR Trail Odyssey',
          tagline: 'Where every journey finds meaning.',
          destination: 'India Wilderness Trails',
          duration: '3 Days / 2 Nights',
          vibe: 'Adventurous, authentic & community-driven',
          itinerary: [
            {
              day: 1,
              title: 'Arrival into the Sanctuary',
              highlight: 'Meeting local hosts and sharing welcoming herbal tea.',
              activities: 'Gentle forest trail walk and settling into cozy camp.',
            },
            {
              day: 2,
              title: 'Sunrise Ridge & Local Feast',
              highlight: 'Catching sunrise above the clouds and enjoying local specialty breakfast.',
              activities: 'Guided trekking through hidden streams and ancient forest paths.',
            },
            {
              day: 3,
              title: 'Campfire Reflections & Farewell',
              highlight: 'Acoustic fireside circle with fellow travelers.',
              activities: 'Packing up with Leave-No-Trace principles and lifelong friends.',
            },
          ],
          localFoodNote: 'Fresh local farm dishes and hot clay hearth specialties.',
          guideAdvice: 'Accompanied by a certified local custodian.',
          companionVibe: 'Curious, warm, respectful fellow explorers.',
        });
      }
    } catch (error: any) {
      console.error('Error generating AI plan, using Saki curated fallback:', error);
      return res.json({
        title: 'The Whispering Mist & Mountain Hearthstone',
        tagline: 'Where early dawn clouds meet village aromas and crackling embers.',
        destination: 'Western Ghats & Coorg Highlands',
        duration: '3 Days / 2 Nights',
        vibe: 'Soulful, unrushed, acoustic & nature-immersed',
        sakiNote: "I've tailored this route for slow mornings and unhurried steps. Let the cedar breeze clear the mind, and never rush a cup of fresh filter kaapi on a misty ridge.",
        itinerary: [
          {
            day: 1,
            title: 'Trade Traffic for Trails & Hilltop Sunset',
            highlight: 'Arrive at an off-grid plantation homestay, brew fresh mountain filter kaapi, and take a twilight ridge walk.',
            activities: 'Wade across crystal streams with local naturalist; listen to evening bird calls and share stories over simple hearth food.',
          },
          {
            day: 2,
            title: 'Dawn Clouds & Sizzling Benne Dosa Feast',
            highlight: 'Start before the alarm; stand above floating sea of clouds as the sky turns gold.',
            activities: 'Descent to the village hearth for hot Davanagere Benne Dosa; afternoon artisan pottery or tea-plucking masterclass.',
          },
          {
            day: 3,
            title: 'Campfire Harmonies & The Stories That Stay',
            highlight: 'Gather around glowing cedar embers with fellow travelers under the Milky Way.',
            activities: 'Acoustic folk songs, sharing travel lore, and leaving as friends with memories to tell for years.',
          },
        ],
        localFoodNote: 'Crispy Benne Dosa, fresh harvested cardamom tea, and slow clay-pot village dum biryani.',
        guideAdvice: 'Travel with a born-and-raised local tracker who knows trails beyond Google Maps and cellular networks.',
        companionVibe: 'Ideal for 2-4 easygoing explorers who cherish laughter, photography, and slow mornings.',
      });
    }
  });

  // Vite development middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`I-EXPLR server listening on port ${port} (0.0.0.0)`);
  });
}

startServer();
