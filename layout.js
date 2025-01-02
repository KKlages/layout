import fs from 'fs';
import { layoutProcess } from './bpmn-auto-layout/lib/index.js';

// Input BPMN XML file path
const inputFilePath = './diagram.bpmn';
// Output BPMN XML file path
const outputFilePath = './layouted_diagram.bpmn';

// Read input BPMN XML
const diagramXML = fs.readFileSync(inputFilePath, 'utf8');

// Layout the BPMN diagram
layoutProcess(diagramXML)
  .then((layoutedXML) => {
    // Write the output BPMN XML
    fs.writeFileSync(outputFilePath, layoutedXML, 'utf8');
    console.log('BPMN diagram layouted successfully.');
  })
  .catch((err) => {
    console.error('Error processing BPMN diagram:', err);
  });
