const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResumePDF(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 40
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Colors
  const primaryColor = '#0284c7';
  const darkColor = '#0f172a';
  const textColor = '#334155';
  const lightBg = '#f1f5f9';

  // Header
  doc.fillColor(darkColor).fontSize(22).font('Helvetica-Bold').text('Mahmoud Abd El-Ghaffar (Mahmoud Zanaty)', { align: 'left' });
  doc.moveDown(0.2);
  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('AI Agent Architect & Workflow Automation Specialist | Flowise & n8n Engineer');
  doc.moveDown(0.3);
  doc.fillColor(textColor).fontSize(9.5).font('Helvetica').text('Location: Benha / Cairo, Egypt  |  Phone: +20 102 419 0741  |  Email: mahmoudzanaty454@gmail.com');
  doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica-Bold').text('LinkedIn: https://www.linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219/');
  doc.moveDown(0.8);

  // Divider Line
  doc.strokeColor('#0284c7').lineWidth(1.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.6);

  // Section Heading Helper
  function addSectionHeader(title) {
    doc.fillColor(darkColor).fontSize(12).font('Helvetica-Bold').text(title.toUpperCase());
    doc.strokeColor('#cbd5e1').lineWidth(0.8).moveTo(40, doc.y + 2).lineTo(555, doc.y + 2).stroke();
    doc.moveDown(0.5);
  }

  // Executive Summary
  addSectionHeader('Executive Summary');
  doc.fillColor(textColor).fontSize(9.5).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Agent Architect with extensive hands-on experience designing, extending, and deploying autonomous AI agent networks, enterprise Pinecone RAG pipelines, and complex multi-platform automation systems. Engineered over 30+ production workflows and 10+ native custom Flowise nodes bridging enterprise tools (HubSpot, Lark, ClickUp, Trello, WhatsApp, Telegram, PostgreSQL) with cutting-edge LLMs (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 2.0 Flash).',
    { align: 'justify', lineGap: 2.5 }
  );
  doc.moveDown(0.4);
  doc.fillColor(textColor).fontSize(9.5).font('Helvetica').text(
    'Utilizes AI-driven development tools (Google Antigravity, Claude Code, OpenAI Codex, VS Code) to rapidly extend low-code platforms (Flowise AI, n8n). Proven capability in engineering 10+ native custom Node.js nodes, implementing Model Context Protocol (MCP) servers, constructing LLM-to-SQL database agents, building custom Webhooks and Schedulers, and embedding PostgreSQL execution loggers for full agent observability and enterprise compliance.',
    { align: 'justify', lineGap: 2.5 }
  );
  doc.moveDown(0.8);

  // Core Technical Competencies
  addSectionHeader('Core Technical Competencies');
  const skills = [
    '• Workflow AI: Flowise AI (10+ Custom Nodes Engine), n8n, MCP, Webhooks, Schedulers (+30 Workflows)',
    '• AI Development Tools: Google Antigravity, Claude Code, OpenAI Codex, VS Code AI Suite',
    '• Databases & RAG: Pinecone Vector Database, PostgreSQL (LLM-to-SQL), PGVector, Embeddings',
    '• Integrations: HubSpot CRM, Lark API, ClickUp API, Trello API, WhatsApp API, Telegram, Gmail'
  ];
  skills.forEach(skill => {
    doc.fillColor(textColor).fontSize(9.5).font('Helvetica').text(skill, { lineGap: 2 });
  });
  doc.moveDown(0.8);

  // Technical Experience
  addSectionHeader('Technical Work Experience');

  // MicroMind
  doc.fillColor(darkColor).fontSize(11).font('Helvetica-Bold').text('AI & Automation Engineer — MicroMind', { continued: true });
  doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica-Bold').text('   (Sep 2023 – Apr 2025)', { align: 'right' });
  doc.moveDown(0.3);
  const expMicroMind = [
    'Applied AI coding tools (Antigravity, Claude Code, Codex) within VS Code to extend Flowise AI and n8n platform capabilities, engineering custom native nodes, custom JS functions, webhooks, and schedulers.',
    'Architected and deployed over 30+ production AI workflows serving retail, real estate, field engineering, operational management, and content publishing.',
    'Engineered over 10+ native Flowise integration nodes for WhatsApp, Telegram, Gmail, Weather API, MCP Client, PostgreSQL Logger, Pinecone Handler, Custom Webhooks, Cron Schedulers, and Custom JS Nodes.',
    'Implemented Model Context Protocol (MCP) agent nodes allowing operations teams to execute backend Node.js scripts dynamically via natural language prompts evaluated by Claude 3.5 Sonnet.',
    'Engineered natural-language-to-SQL query agents over PostgreSQL project databases for Site Engineers & Field Sales Dashboard managers.',
    'Built high-speed semantic document retrieval systems using Pinecone Vector Database and OpenAI Embeddings for enterprise RAG applications.',
    'Constructed a full PostgreSQL Agent Logger capturing every node input, output, tool call, and prompt into a structured audit table with LangSmith telemetry.'
  ];
  expMicroMind.forEach(bullet => {
    doc.fillColor(textColor).fontSize(9).font('Helvetica').text(`  •  ${bullet}`, { lineGap: 2 });
  });
  doc.moveDown(0.6);

  // Operatives Automation
  doc.fillColor(darkColor).fontSize(11).font('Helvetica-Bold').text('Automation Engineer — Operatives (IT Services)', { continued: true });
  doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica-Bold').text('   (Jun 2021 – Jan 2022)', { align: 'right' });
  doc.moveDown(0.3);
  doc.fillColor(textColor).fontSize(9).font('Helvetica').text('  •  Analyzed cross-departmental operational cycles and engineered end-to-end automated workflows, eliminating manual data entry bottlenecks across IT operations teams.', { lineGap: 2 });
  doc.moveDown(0.6);

  // Operatives Admin
  doc.fillColor(darkColor).fontSize(11).font('Helvetica-Bold').text('Operation Engineer & Admin — Operatives (IT Services)', { continued: true });
  doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica-Bold').text('   (Jan 2020 – Jun 2021)', { align: 'right' });
  doc.moveDown(0.3);
  doc.fillColor(textColor).fontSize(9).font('Helvetica').text('  •  Managed IT infrastructure operations, monitored workflow execution logs, enforced SLA compliance, and administered operational tracking systems.', { lineGap: 2 });
  doc.moveDown(0.8);

  // Key Project Architecture Highlights
  addSectionHeader('Detailed Project Architecture Highlights');
  const projectHighlights = [
    '• Flowise Multi-Agent Architecture: Hierarchical supervisor & sequential sub-agent routing network.',
    '• Pinecone Enterprise RAG System Design: Ingestion, hybrid vector search, and context audit verification.',
    '• MCP Server Dispatcher Topology: Natural language command interface to local Node.js backend execution.',
    '• Self-Developed Custom Flowise Nodes (10+ Nodes): Native Node.js integration for WhatsApp, Telegram, Gmail, Weather, MCP, PostgreSQL Logger, Pinecone, Schedulers, and Webhooks.',
    '• Site Engineer Assistant: Secure LLM-to-SQL query generation over PostgreSQL construction databases.',
    '• Field Sales Dashboard Agent: Van-level performance & target KPI query engine with natural language output visualization.',
    '• Retail Support & Installment Eligibility AI: Integrated PostgreSQL, Pinecone, HubSpot CRM, and Gmail follow-up engine.',
    '• Real Estate Sales Assistant: Multi-modal listing search, dynamic recommendations, and instant HubSpot CRM synchronization.',
    '• Chat-Triggered Trello Task Creator: Conversational AI node interpreting team messages into Trello cards.',
    '• AI News & Social Publisher Bot: n8n workflow connecting NewsAPI -> Google Sheets -> Facebook Graph API.',
    '• PostgreSQL Agent Audit Logger & LangSmith: Complete execution audit system logging inputs, outputs, tools, and prompts.'
  ];
  projectHighlights.forEach(proj => {
    doc.fillColor(textColor).fontSize(9).font('Helvetica').text(proj, { lineGap: 2 });
  });
  doc.moveDown(0.8);

  // Education
  addSectionHeader('Education');
  doc.fillColor(darkColor).fontSize(10.5).font('Helvetica-Bold').text('B.Sc. in Computer Engineering — Faculty of Engineering Shoubra, Benha University');
  doc.fillColor(textColor).fontSize(9).font('Helvetica').text('Location: Benha, Egypt | Specialization: Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.');

  doc.end();

  stream.on('finish', () => {
    console.log(`Successfully generated PDF resume at: ${outputPath}`);
  });
}

const portfolioPdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');
const artifactsPdfPath = 'C:\\Users\\z40\\.gemini\\antigravity\\brain\\697546ff-5618-4f4b-93b0-12d99dc8a6b3\\Mahmoud_Abd_El-Ghaffar_Resume.pdf';

generateResumePDF(portfolioPdfPath);
generateResumePDF(artifactsPdfPath);
