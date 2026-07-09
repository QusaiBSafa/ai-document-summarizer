import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { extractText, generateSummary } from './summarizer';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/summarize', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const text = await extractText(req.file.path, req.file.mimetype);
    const result = await generateSummary(text);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
