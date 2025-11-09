
import { GoogleGenAI, GenerateContentResponse, GenerateContentParameters, Modality } from '@google/genai';
import { IDFComponent, SkillDefinition, ChatMessage } from '../types';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker source to point to the local file
// This assumes pdf.worker.min.js is copied to the `dist` directory by the build script.
// When index.html is loaded from the root, './dist/pdf.worker.min.js' refers to the correct path.
pdfjsLib.GlobalWorkerOptions.workerSrc = './dist/pdf.worker.min.js';

// Utility function to get API key
function getApiKey(): string {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY is not defined in environment variables.');
  }
  return apiKey;
}

// Base 64 encode function
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// --- PDF Processing Service ---
export async function extractTextFromPdf(pdfArrayBuffer: ArrayBuffer): Promise<string> {
  const loadingTask = pdfjsLib.getDocument({ data: pdfArrayBuffer });
  const pdfDocument = await loadingTask.promise;
  let fullText = '';

  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map(item => 'str' in item ? item.str : '')
      .join(' ')
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim();
    fullText += pageText + '\n';
  }
  return fullText;
}


// --- Text Generation Services ---

export async function generateContentPro(prompt: string, config?: Partial<GenerateContentParameters>): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, // Max thinking budget for 2.5-pro
        ...config,
      },
    });
    return response.text;
  } catch (error) {
    console.error('Error generating content with gemini-2.5-pro:', error);
    throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function generateContentFlash(prompt: string, config?: Partial<GenerateContentParameters>): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        ...config,
      },
    });
    return response.text;
  } catch (error) {
    console.error('Error generating content with gemini-2.5-flash:', error);
    throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function generateContentFlashLite(prompt: string, config?: Partial<GenerateContentParameters>): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        ...config,
      },
    });
    return response.text;
  } catch (error) {
    console.error('Error generating content with gemini-flash-lite-latest:', error);
    throw new Error(`Failed to generate content: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// --- Chatbot Services ---

export async function* streamChatMessages(messages: ChatMessage[]): AsyncGenerator<string> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a helpful assistant for a Matatag Lesson Plan Generator app. Provide concise and friendly answers related to the app, the Matatag curriculum, or general educational queries.',
    },
  });

  const chatHistory = messages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const responseStream = await chat.sendMessageStream({ message: messages[messages.length - 1].text });
    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error('Error streaming chat messages:', error);
    throw new Error(`Failed to stream chat: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// --- Image Generation Services ---

export async function generateImage(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    const base64ImageBytes: string | undefined = response.generatedImages[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
      throw new Error('No image bytes received from the API.');
    }
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error('Error generating image with imagen-4.0-generate-001:', error);
    throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : String(error)}`);
  }
}