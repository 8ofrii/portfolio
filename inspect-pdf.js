const fs = require('fs');
const path = require('path');

const pdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');
const content = fs.readFileSync(pdfPath, 'utf8');

// Extract all parentheses content from Tj and TJ operators
const tjMatches = content.match(/\((.*?)\)/g) || [];
const extractedChars = tjMatches.map(m => m.slice(1, -1)).join('');
console.log('Sample extracted characters from PDF:');
console.log(extractedChars.slice(0, 500));

// Test finding keywords in the assembled character stream
const keywords = [
  'MAHMOUD',
  'AI Agent Architect',
  'MicroMind',
  'LangChain',
  'LangGraph',
  'n8n',
  'Rebort Bot',
  'Pinecone',
  'Oracle',
  'Dynamics',
  'SAP',
  'Odoo',
  'Docker',
  'AWS',
  'portfolio-mrt6.onrender.com'
];

console.log('\nTesting assembled stream search:');
keywords.forEach(kw => {
  const match = extractedChars.includes(kw);
  console.log(`- ${kw}: ${match ? 'FOUND ✅' : 'NOT FOUND ❌'}`);
});
