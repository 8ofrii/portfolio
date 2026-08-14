const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResumePDF(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 34,
    compress: false,
    info: {
      Title: 'Mahmoud Abd El-Ghaffar - Resume',
      Author: 'Mahmoud Abd El-Ghaffar',
      Subject: 'AI Agent Architect & Enterprise Workflow Specialist Resume',
      Keywords: 'AI Agent Architect, MicroMind Platform, LangChain, LangGraph, n8n, Pinecone, RAG, Rebort Bot, Oracle ERP, Microsoft Dynamics, SAP, Odoo, SQL, Docker, AWS, Python, Node.js'
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Design Tokens
  const primaryColor = '#0284c7';      // Professional Blue for Links & Highlights
  const darkColor = '#0f172a';         // Dark Slate for Headings
  const bodyTextColor = '#334155';     // Slate for Body Text
  const mutedColor = '#64748b';        // Muted Slate for Separators
  const ruleColor = '#cbd5e1';         // Light Gray for Dividers

  // Page Width calculation
  const pageWidth = 595.28;
  const margin = 34;

  // ==========================================
  // 1. HEADER SECTION (WITH DIRECT HYPERLINKS)
  // ==========================================
  doc.fillColor(darkColor).fontSize(20).font('Helvetica-Bold').text('MAHMOUD ABD EL-GHAFFAR', { align: 'left' });
  doc.moveDown(0.15);
  doc.fillColor(primaryColor).fontSize(10.5).font('Helvetica-Bold').text('AI Agent Architect & Enterprise Workflow Specialist  |  MicroMind, LangChain & n8n Engineer');
  doc.moveDown(0.25);

  // Contact line 1: Location, Phone (Hyperlinked), Email (Hyperlinked)
  doc.fillColor(bodyTextColor).fontSize(8.5).font('Helvetica').text('Location: Benha / Cairo, Egypt   •   Phone: ', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text('+20 102 419 0741', {
    link: 'tel:+201024190741',
    underline: true,
    continued: true
  });
  doc.fillColor(bodyTextColor).font('Helvetica').text('   •   Email: ', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text('mahmoudzanaty454@gmail.com', {
    link: 'mailto:mahmoudzanaty454@gmail.com',
    underline: true
  });
  
  // Contact line 2: LinkedIn (Hyperlinked) & Live Portfolio (Hyperlinked)
  doc.moveDown(0.15);
  doc.fillColor(bodyTextColor).fontSize(8.5).font('Helvetica').text('LinkedIn: ', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text('linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219', {
    link: 'https://www.linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219/',
    underline: true,
    continued: true
  });
  doc.fillColor(mutedColor).font('Helvetica').text('   •   ', { continued: true });
  doc.fillColor(bodyTextColor).font('Helvetica').text('Live Portfolio: ', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text('https://portfolio-mrt6.onrender.com/', {
    link: 'https://portfolio-mrt6.onrender.com/',
    underline: true
  });

  doc.moveDown(0.4);
  // Header Divider Rule
  doc.strokeColor(primaryColor).lineWidth(1.2).moveTo(margin, doc.y).lineTo(pageWidth - margin, doc.y).stroke();
  doc.moveDown(0.35);

  // Section Heading Helper
  function addSectionHeader(title) {
    doc.fillColor(darkColor).fontSize(10.5).font('Helvetica-Bold').text(title.toUpperCase());
    doc.strokeColor(ruleColor).lineWidth(0.6).moveTo(margin, doc.y + 1.5).lineTo(pageWidth - margin, doc.y + 1.5).stroke();
    doc.moveDown(0.3);
  }

  // ==========================================
  // 2. PROFESSIONAL SUMMARY
  // ==========================================
  addSectionHeader('Professional Summary');
  doc.fillColor(bodyTextColor).fontSize(8.4).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Agent Architect with extensive expertise designing, scaling, and deploying autonomous AI agent networks, enterprise Pinecone RAG pipelines, and multi-platform automation ecosystems. Built and co-built 30+ native integration nodes in AI MicroMind Core and engineered 30+ production AI workflows connecting enterprise ERPs (Oracle, Microsoft Dynamics, SAP, Odoo, Oracle Fusion, Dynamics 365 OData, SQL) with advanced LLMs (GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash). Architect of the AI MicroMind App & Rebort Bot Conversational BI Framework, full-stack mobile applications, MicroMind MicroApps middleware, and custom integrations across 12+ enterprise platforms (Lark Suite, Bubble.io, Teamwork, ConnectWise, Zoom, Slack, WAPA). Proficient in Docker, AWS, Linux VPS, Render, and GitHub CI/CD.',
    { align: 'justify', lineGap: 1.6 }
  );
  doc.moveDown(0.4);

  // ==========================================
  // 3. CORE TECHNICAL COMPETENCIES
  // ==========================================
  addSectionHeader('Core Technical Competencies');
  const skills = [
    { label: 'Agent & Workflow Frameworks:', text: 'MicroMind Platform (30+ Native Core Nodes), n8n, LangChain (Expert), LangGraph (Advanced), MCP, Webhooks, Schedulers' },
    { label: 'Enterprise ERPs & Database BI:', text: 'Conversational BI over Oracle ERP, Oracle Fusion, Dynamics 365 OData, SAP, Odoo, PostgreSQL, SQL Server, LLM-to-SQL' },
    { label: 'Vector Databases & RAG:', text: 'Pinecone Vector DB (Hybrid Dense+Sparse Search), OpenAI Embeddings, PGVector, Contextual Chunking & Retrieval' },
    { label: 'Custom App Dev & Integrations:', text: 'Lark Suite, Bubble.io, Teamwork, Teamwork Desk, ConnectWise, ClickUp, Zoom, Slack, Discord, Telegram, WAPA (WhatsApp API)' },
    { label: 'Mobile & Full-Stack Engineering:', text: 'Full-Stack Mobile Applications (Front-End & Back-End), AI MicroMind MicroApps Middleware, Node.js, Python, REST, WebSockets' },
    { label: 'DevOps, Cloud & AI Acceleration:', text: 'Docker, AWS, DigitalOcean Linux VPS, Render, GitHub CI/CD, Google Antigravity, Claude Code, OpenAI Codex' }
  ];

  skills.forEach(s => {
    doc.fillColor(darkColor).fontSize(8.2).font('Helvetica-Bold').text(`• ${s.label} `, { continued: true });
    doc.fillColor(bodyTextColor).font('Helvetica').text(s.text, { lineGap: 1.4 });
  });
  doc.moveDown(0.4);

  // ==========================================
  // 4. PROFESSIONAL EXPERIENCE
  // ==========================================
  addSectionHeader('Professional Experience');

  // Role 1: AI MicroMind
  doc.fillColor(darkColor).fontSize(9.5).font('Helvetica-Bold').text('AI & Automation Engineer', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — AI MicroMind', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.5).font('Helvetica-Bold').text('   (2024 – 2026)', { align: 'right' });
  doc.moveDown(0.2);

  const expMicroMind = [
    'Built and co-built 30+ native integration nodes directly inside AI MicroMind Core (Node.js runtime) for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP Client, Pinecone, Webhooks, Schedulers, and PostgreSQL Audit Loggers using AI coding tools (Antigravity, Claude Code, Codex).',
    'Architected the AI MicroMind App featuring the Rebort Bot Framework and Advanced BI & Reporting Tools, enabling non-technical users to query on-premise ERPs (Oracle, SAP, Microsoft Dynamics, Odoo, SQL) and cloud platforms (Oracle Fusion, Dynamics 365 OData) via natural language.',
    'Engineered full-stack mobile applications (frontend & backend) and constructed AI MicroMind MicroApps, establishing plug-and-play middleware to integrate third-party applications into the MicroMind ecosystem.',
    'Developed custom integration applications and automated event pipelines across Lark Suite, Bubble.io, Teamwork, Teamwork Desk, ConnectWise, ClickUp, Zoom, Slack, Discord, Telegram, Facebook Messenger, and WAPA.',
    'Constructed multi-agent graph workflows using LangChain (Expert) and LangGraph (Advanced), implementing Model Context Protocol (MCP) server dispatchers for safe backend script execution via Claude and GPT prompts.',
    'Managed containerization, deployment, server monitoring, and continuous integration across AWS, Docker, DigitalOcean Linux VPS, Render, and GitHub Actions.'
  ];
  expMicroMind.forEach(bullet => {
    doc.fillColor(bodyTextColor).fontSize(8.1).font('Helvetica').text(`•  ${bullet}`, { align: 'justify', lineGap: 1.4 });
  });
  doc.moveDown(0.35);

  // Role 2: Operatives Automation
  doc.fillColor(darkColor).fontSize(9.5).font('Helvetica-Bold').text('Automation Engineer', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — Operatives (IT Services)', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.5).font('Helvetica-Bold').text('   (Jun 2021 – Jan 2022)', { align: 'right' });
  doc.moveDown(0.15);
  doc.fillColor(bodyTextColor).fontSize(8.1).font('Helvetica').text('•  Analyzed cross-departmental business workflows and engineered automated data synchronization pipelines, eliminating manual operational bottlenecks and accelerating cross-functional service delivery.', { align: 'justify', lineGap: 1.4 });
  doc.moveDown(0.35);

  // Role 3: Operatives Admin
  doc.fillColor(darkColor).fontSize(9.5).font('Helvetica-Bold').text('Operation Engineer & Admin', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — Operatives (IT Services)', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.5).font('Helvetica-Bold').text('   (Jan 2020 – Jun 2021)', { align: 'right' });
  doc.moveDown(0.15);
  doc.fillColor(bodyTextColor).fontSize(8.1).font('Helvetica').text('•  Administered IT infrastructure operations, monitored workflow execution logs, enforced strict SLA compliance, and resolved technical service tickets.', { align: 'justify', lineGap: 1.4 });
  doc.moveDown(0.4);

  // ==========================================
  // 5. KEY TECHNICAL ARCHITECTURE PROJECTS
  // ==========================================
  addSectionHeader('Key Technical Architecture Projects');
  const projectHighlights = [
    { title: 'AI MicroMind App & Rebort Bot Framework:', desc: 'Conversational BI reporting engine translating natural language prompts into live SQL/OData queries across Oracle, SAP, Dynamics 365, Odoo, and SQL databases.' },
    { title: 'AI MicroMind Core Node Architecture (30+ Native Nodes):', desc: 'Custom Node.js native nodes extending core platform capabilities for WAPA, Telegram, Gmail, Weather, MCP, Pinecone, and Cron Schedulers.' },
    { title: 'AI MicroMind MicroApps & Mobile Architecture:', desc: 'Modular middleware connecting cross-platform mobile apps and 12+ SaaS platforms (Lark, Bubble.io, Teamwork, ConnectWise, ClickUp, Zoom, Slack).' },
    { title: 'Stateful Multi-Agent Graphs (LangChain & LangGraph):', desc: 'Hierarchical supervisor agent graphs featuring state persistence, conditional branching, and self-correcting prompt loops.' },
    { title: 'Pinecone Enterprise RAG & Telemetry Suite:', desc: 'Hybrid dense/sparse semantic retrieval pipeline paired with PostgreSQL audit logging and LangSmith observability.' },
    { title: 'Cloud DevOps & Containerization Suite:', desc: 'Multi-stage Dockerized environments deployed across AWS, DigitalOcean Linux VPS, and Render with automated CI/CD.' }
  ];
  projectHighlights.forEach(proj => {
    doc.fillColor(darkColor).fontSize(8.1).font('Helvetica-Bold').text(`• ${proj.title} `, { continued: true });
    doc.fillColor(bodyTextColor).font('Helvetica').text(proj.desc, { align: 'justify', lineGap: 1.3 });
  });
  doc.moveDown(0.4);

  // ==========================================
  // 6. EDUCATION
  // ==========================================
  addSectionHeader('Education');
  doc.fillColor(darkColor).fontSize(9).font('Helvetica-Bold').text('B.Sc. in Computer Engineering', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — Faculty of Engineering Shoubra, Benha University', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.5).font('Helvetica').text('   (Benha, Egypt)', { align: 'right' });
  doc.moveDown(0.1);
  doc.fillColor(bodyTextColor).fontSize(8).font('Helvetica').text('Specialization: Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.');

  doc.end();

  stream.on('finish', () => {
    console.log(`Successfully generated ATS-compliant PDF resume with direct hyperlinks at: ${outputPath}`);
  });
}

const portfolioPdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');
const artifactsPdfPath = path.join('C:', 'Users', 'z40', '.gemini', 'antigravity', 'brain', '697546ff-5618-4f4b-93b0-12d99dc8a6b3', 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');

generateResumePDF(portfolioPdfPath);
generateResumePDF(artifactsPdfPath);
