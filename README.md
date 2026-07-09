# AI Document Summarizer

A standalone TypeScript service that accepts PDF, Word, or Markdown uploads and returns an AI-generated summary, key points, questions, and action items.

## What's Built

- Express server with a single `/summarize` upload endpoint
- File parsing for PDF (`pdf-parse`), Word (`mammoth`), and Markdown/text
- OpenAI GPT-4o-mini integration with structured JSON output
- Typed core logic and minimal config

## How to Run

1. Install dependencies
   ```bash
   npm install
   ```

2. Add your OpenAI API key to a `.env` file:
   ```env
   OPENAI_API_KEY=sk-...
   PORT=3000
   ```

3. Start the server
   ```bash
   npm start
   ```

4. Test the endpoint
   ```bash
   curl -X POST -F "document=@sample.pdf" http://localhost:3000/summarize
   ```

## API Docs

### POST /summarize
Upload a document.

**Form Data:**
- `document` — file (pdf, docx, md, txt)

**Response:**
```json
{
  "summary": "...",
  "keyPoints": ["..."],
  "questions": ["..."],
  "actionItems": ["..."]
}
```

### GET /health
Health check.

## Env Vars

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key (required) |
| `PORT` | Server port (default: 3000) |
