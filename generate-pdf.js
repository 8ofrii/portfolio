const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResumePDF(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 36
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Colors
  const primaryColor = '#0284c7';
  const darkColor = '#0f172a';
  const textColor = '#334155';

  // Header
  doc.fillColor(darkColor).fontSize(21).font('Helvetica-Bold').text('Mahmoud Abd El-Ghaffar (Mahmoud Zanaty)', { align: 'left' });
  doc.moveDown(0.2);
  doc.fillColor(primaryColor).fontSize(11.5).font('Helvetica-Bold').text('AI Agent Architect & Workflow Automation Specialist | Flowise, LangChain & n8n Engineer');
  doc.moveDown(0.3);
  doc.fillColor(textColor).fontSize(9).font('Helvetica').text('Location: Benha / Cairo, Egypt  |  Phone: +20 102 419 0741  |  Email: mahmoudzanaty454@gmail.com');
  doc.fillColor(primaryColor).fontSize(9).font('Helvetica-Bold').text('LinkedIn: https://www.linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219/  |  GitHub: https://github.com/8ofrii/portfolio');
  doc.moveDown(0.6);

  // Divider Line
  doc.strokeColor('#0284c7').lineWidth(1.5).moveTo(36, doc.y).lineTo(559, doc.y).stroke();
  doc.moveDown(0.5);

  // Section Heading Helper
  function addSectionHeader(title) {
    doc.fillColor(darkColor).fontSize(11.5).font('Helvetica-Bold').text(title.toUpperCase());
    doc.strokeColor('#cbd5e1').lineWidth(0.8).moveTo(36, doc.y + 2).lineTo(559, doc.y + 2).stroke();
    doc.moveDown(0.4);
  }

  // Executive Summary
  addSectionHeader('Executive Summary');
  doc.fillColor(textColor).fontSize(9).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Agent Architect with extensive hands-on experience designing, extending, and deploying autonomous AI agent networks, enterprise Pinecone RAG pipelines, and complex multi-platform automation ecosystems. Built and co-built 30+ native integration nodes in AI MicroMind Core and engineered over 30+ production AI workflows bridging enterprise ERP systems (Oracle, Microsoft Dynamics, SAP, Odoo, Oracle Fusion, Dynamics 365 OData, SQL) with cutting-edge LLMs (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 2.0 Flash).',
    { align: 'justify', lineGap: 2 }
  );
  doc.moveDown(0.3);
  doc.fillColor(textColor).fontSize(9).font('Helvetica').text(
    'Architect of the AI MicroMind App featuring the Rebort Bot Framework and Advanced BI & Reporting Tools, empowering enterprise teams to query complex ERP database systems and cloud applications using conversational natural language. Experienced in full-stack mobile application development (front-end & back-end), constructing AI MicroMind MicroApps that integrate any third-party app into the MicroMind ecosystem, and developing custom integration apps across Lark Suite, Bubble.io, Teamwork, Teamwork Desk, ConnectWise, ClickUp, Zoom, Slack, Discord, Telegram, Facebook Messenger, and WAPA (WhatsApp API).',
    { align: 'justify', lineGap: 2 }
  );
  doc.moveDown(0.6);

  // Core Technical Competencies
  addSectionHeader('Core Technical Competencies');
  const skills = [
    '• Workflow & Agent Frameworks: Flowise AI (30+ Native Core Nodes), n8n, LangChain (Expert), LangGraph (Advanced), MCP, Webhooks',
    '• AI Coding Acceleration: Google Antigravity, Claude Code, OpenAI Codex, VS Code AI Suite, GPT-4o, Gemini 2.0 Flash',
    '• ERP & Enterprise Data Systems: Natural Language BI Queries over Oracle, Microsoft Dynamics, SAP, Odoo, Oracle Fusion, Dynamics 365 OData, SQL',
    '• Databases & Vector Search: Pinecone Vector Database, PostgreSQL (LLM-to-SQL & Audit Logger), PGVector, OpenAI Embeddings',
    '• Custom App Dev & Integrations: Lark Suite, Bubble.io, Teamwork, Teamwork Desk, ConnectWise, ClickUp, Zoom, Slack, Discord, WAPA',
    '• Hosting & Light DevOps: Docker, AWS, DigitalOcean, Linux VPS Administration, Render, GitHub Actions & Version Control'
  ];
  skills.forEach(skill => {
    doc.fillColor(textColor).fontSize(8.8).font('Helvetica').text(skill, { lineGap: 1.8 });
  });
  doc.moveDown(0.6);

  // Technical Experience
  addSectionHeader('Technical Work Experience');

  // AI MicroMind
  doc.fillColor(darkColor).fontSize(10.5).font('Helvetica-Bold').text('AI & Automation Engineer — AI MicroMind', { continued: true });
  doc.fillColor(primaryColor).fontSize(9).font('Helvetica-Bold').text('   (2024 – 2026)', { align: 'right' });
  doc.moveDown(0.3);
  const expMicroMind = [
    'Built and co-built 30+ native integration nodes directly in AI MicroMind Core (Flowise node architecture) for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP Client, Pinecone, Webhooks, Schedulers, and PostgreSQL Audit Loggers using AI tools (Antigravity, Claude Code, Codex).',
    'Architected and deployed the AI MicroMind App featuring the Rebort Bot Framework and Advanced BI & Reporting Tools. Enabled enterprise users to ask natural language questions directly to AI agents to extract live operational insights from on-premise ERPs (Oracle, Microsoft Dynamics, SAP, Odoo, SQL) and cloud platforms (Oracle Fusion, Dynamics 365 OData).',
    'Engineered full-stack mobile applications (front-end & back-end) and built AI MicroMind MicroApps, creating modular bridges to integrate third-party applications seamlessly into the MicroMind ecosystem.',
    'Developed custom integration applications and automated workflows across Lark Suite, Bubble.io, Teamwork, Teamwork Desk, ConnectWise, ClickUp, Zoom, Slack, Discord, Telegram, Facebook Messenger, and WAPA.',
    'Built complex multi-agent graphs using LangChain (Expert) and LangGraph (Advanced), implementing Model Context Protocol (MCP) server dispatchers that execute Node.js backend scripts safely via Claude prompts.',
    'Managed containerization, deployment, and cloud infrastructure across AWS, Docker, DigitalOcean, Linux VPS, Render, and GitHub.'
  ];
  expMicroMind.forEach(bullet => {
    doc.fillColor(textColor).fontSize(8.6).font('Helvetica').text(`  •  ${bullet}`, { lineGap: 1.8 });
  });
  doc.moveDown(0.5);

  // Operatives Automation
  doc.fillColor(darkColor).fontSize(10.5).font('Helvetica-Bold').text('Automation Engineer — Operatives (IT Services)', { continued: true });
  doc.fillColor(primaryColor).fontSize(9).font('Helvetica-Bold').text('   (Jun 2021 – Jan 2022)', { align: 'right' });
  doc.moveDown(0.2);
  doc.fillColor(textColor).fontSize(8.6).font('Helvetica').text('  •  Analyzed cross-departmental operational cycles and engineered end-to-end automated workflows, eliminating manual data entry bottlenecks across IT operations teams.', { lineGap: 1.8 });
  doc.moveDown(0.5);

  // Operatives Admin
  doc.fillColor(darkColor).fontSize(10.5).font('Helvetica-Bold').text('Operation Engineer & Admin — Operatives (IT Services)', { continued: true });
  doc.fillColor(primaryColor).fontSize(9).font('Helvetica-Bold').text('   (Jan 2020 – Jun 2021)', { align: 'right' });
  doc.moveDown(0.2);
  doc.fillColor(textColor).fontSize(8.6).font('Helvetica').text('  •  Managed IT infrastructure operations, monitored workflow execution logs, enforced SLA compliance, and administered operational tracking systems.', { lineGap: 1.8 });
  doc.moveDown(0.6);

  // Key Project Architecture Highlights
  addSectionHeader('Detailed Project Architecture Highlights');
  const projectHighlights = [
    '• AI MicroMind App & Rebort Bot Framework: Conversational BI reporting engine over Oracle, SAP, Microsoft Dynamics, Odoo, and Dynamics 365 OData.',
    '• AI MicroMind Core Node Architecture (30+ Built/Co-built Nodes): Native Node.js integrations for WAPA, Telegram, Gmail, Weather, MCP, Pinecone, Webhooks, and Schedulers.',
    '• AI MicroMind MicroApps Ecosystem: Modular integration middleware linking any web or mobile app into the central AI agent network.',
    '• Full-Stack Mobile Application Development: Mobile frontend and backend APIs linked to AI agent execution chains.',
    '• Multi-Agent Graphs with LangChain (Expert) & LangGraph (Advanced): Hierarchical supervisor agents with memory state routing.',
    '• Pinecone Enterprise RAG Architecture: High-speed semantic document retrieval with context verification safeguards.',
    '• DevOps & Hosting Suite: Containerized environments deployed on AWS, Docker, DigitalOcean VPS, Render, and GitHub.'
  ];
  projectHighlights.forEach(proj => {
    doc.fillColor(textColor).fontSize(8.6).font('Helvetica').text(proj, { lineGap: 1.8 });
  });
  doc.moveDown(0.6);

  // Education
  addSectionHeader('Education');
  doc.fillColor(darkColor).fontSize(10).font('Helvetica-Bold').text('B.Sc. in Computer Engineering — Faculty of Engineering Shoubra, Benha University');
  doc.fillColor(textColor).fontSize(8.6).font('Helvetica').text('Location: Benha, Egypt | Specialization: Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.');

  doc.end();

  stream.on('finish', () => {
    console.log(`Successfully generated updated PDF resume at: ${outputPath}`);
  });
}

const portfolioPdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');
const artifactsPdfPath = path.join('C:', 'Users', 'z40', '.gemini', 'antigravity', 'brain', '697546ff-5618-4f4b-93b0-12d99dc8a6b3', 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');

generateResumePDF(portfolioPdfPath);
generateResumePDF(artifactsPdfPath);
