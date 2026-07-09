import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import OpenAI from 'openai';
import { SummaryResult } from './types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function extractText(path: string, mimetype: string): Promise<string> {
  if (mimetype === 'application/pdf') {
    const data = await pdf(fs.readFileSync(path));
    return data.text;
  }
  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ path });
    return result.value;
  }
  if (mimetype === 'text/markdown' || mimetype === 'text/plain') {
    return fs.readFileSync(path, 'utf-8');
  }
  throw new Error('Unsupported file type. Upload PDF, DOCX, or MD.');
}

export async function generateSummary(text: string): Promise<SummaryResult> {
  const prompt = `Analyze the document below and produce a JSON object with exactly these keys: summary (string), keyPoints (array of strings), questions (array of strings), actionItems (array of strings).\n\nDocument:\n${text.slice(0, 12000)}`;
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });
  const content = res.choices[0].message.content || '{}';
  return JSON.parse(content) as SummaryResult;
}
