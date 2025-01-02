import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { layoutProcess } from './bpmn-auto-layout/lib/index.js';

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/layout', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read the uploaded file
    const xmlContent = fs.readFileSync(filePath, 'utf8');

    // Apply the layout process
    const layoutedXml = await layoutProcess(xmlContent);

    // Send the layouted BPMN file as a response
    res.set('Content-Type', 'application/xml');
    res.send(layoutedXml);

    // Clean up the uploaded file
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'An error occurred while processing the BPMN file.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
