# Infrastructure Overview

## Data Models
- Parsed text is passed as a string to the LLM
- LLM returns structured JSON: summary, keyPoints, questions, actionItems

## API Design
- `POST /summarize` — multipart upload, returns JSON summary
- `GET /health` — liveness check

## Key Decisions
1. **Multer** for file handling with disk storage to `uploads/`
2. **pdf-parse** and **mammoth** for server-side text extraction
3. **OpenAI JSON mode** for reliable structured output
4. **Express + TypeScript** for a single runnable HTTP service
5. **No database** — fully stateless, processing-only
