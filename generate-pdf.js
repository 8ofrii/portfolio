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
      Subject: 'AI Automation Engineer & Systems Integration Specialist Resume',
      Keywords: 'AI Automation Specialist, Make, Zapier, n8n, AI Automation Engineer, Systems Integration, HubSpot, Airtable, Multi-Agent Systems, LangChain, LangGraph, Report Bot, REST APIs, Webhooks, Pinecone, Docker, AWS, Node.js'
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
  doc.fillColor(darkColor).fontSize(19).font('Helvetica-Bold').text('MAHMOUD ABD EL-GHAFFAR', { align: 'left' });
  doc.moveDown(0.12);
  doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text('AI Automation Engineer & Systems Integration Specialist  |  Make, Zapier, n8n, APIs & Multi-Agent Workflows');
  doc.moveDown(0.2);

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
  doc.moveDown(0.12);
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

  doc.moveDown(0.35);
  // Header Divider Rule
  doc.strokeColor(primaryColor).lineWidth(1.2).moveTo(margin, doc.y).lineTo(pageWidth - margin, doc.y).stroke();
  doc.moveDown(0.3);

  // Section Heading Helper
  function addSectionHeader(title) {
    doc.fillColor(darkColor).fontSize(10).font('Helvetica-Bold').text(title.toUpperCase());
    doc.strokeColor(ruleColor).lineWidth(0.6).moveTo(margin, doc.y + 1.5).lineTo(pageWidth - margin, doc.y + 1.5).stroke();
    doc.moveDown(0.25);
  }

  // ==========================================
  // 2. PROFESSIONAL SUMMARY
  // ==========================================
  addSectionHeader('Professional Summary');
  doc.fillColor(bodyTextColor).fontSize(8.2).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Automation Specialist with hands-on expertise building end-to-end automated workflows, multi-agent systems, and production integrations across Zapier, Make, n8n, and custom APIs. Built and co-built 30+ native integration nodes and 30+ production workflows connecting CRMs (HubSpot, Airtable), web forms, messaging platforms (Slack, Gmail, WhatsApp/WAPA), and enterprise databases. Recognized for strong systems thinking, proactive error handling, and the ability to articulate complex technical workflows into clear, actionable terms for non-technical business clients. Comfortable working under strict NDA and data privacy standards.',
    { align: 'justify', lineGap: 1.5 }
  );
  doc.moveDown(0.35);

  // ==========================================
  // 3. CORE TECHNICAL COMPETENCIES
  // ==========================================
  addSectionHeader('Core Technical Competencies');
  const skills = [
    { label: 'Automation Platforms & Orchestration:', text: 'Make (Integromat), Zapier, n8n, AI MicroMind (30+ Native Core Nodes), Webhooks, Cron Schedulers, REST APIs, OAuth2' },
    { label: 'Business & CRM Integrations:', text: 'HubSpot, Airtable, Gmail, Microsoft 365, Slack, Meta/WhatsApp (WAPA), Telegram, ClickUp, Teamwork, ConnectWise, Typeform/Jotform' },
    { label: 'AI & Multi-Agent Frameworks:', text: 'LangChain (Expert), LangGraph (Advanced), Model Context Protocol (MCP), Pinecone Vector DB, OpenAI Embeddings, LLM-to-SQL' },
    { label: 'Systems Reliability & Delivery:', text: 'Systems Architecture, Automated Error Handling & Retries, Real-Time Alerting, SOPs & Plain-Language Client Documentation' },
    { label: 'Enterprise ERPs & Database BI:', text: 'Conversational BI over Oracle ERP, Oracle Fusion, Dynamics 365 OData, SAP, Odoo, PostgreSQL, SQL Server' },
    { label: 'Backend, Cloud & Acceleration:', text: 'Node.js / TypeScript, Python, Docker, AWS, DigitalOcean Linux VPS, Render, GitHub CI/CD, Google Antigravity, Claude Code' }
  ];

  skills.forEach(s => {
    doc.fillColor(darkColor).fontSize(8).font('Helvetica-Bold').text(`• ${s.label} `, { continued: true });
    doc.fillColor(bodyTextColor).font('Helvetica').text(s.text, { lineGap: 1.3 });
  });
  doc.moveDown(0.35);

  // ==========================================
  // 4. PROFESSIONAL EXPERIENCE
  // ==========================================
  addSectionHeader('Professional Experience');

  // Role 1: AI MicroMind
  doc.fillColor(darkColor).fontSize(9.2).font('Helvetica-Bold').text('AI & Automation Engineer', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — AI MicroMind', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.2).font('Helvetica-Bold').text('   (2024 – Present)', { align: 'right' });
  doc.moveDown(0.18);

  const expMicroMind = [
    'Built and co-built 30+ native integration nodes directly inside AI MicroMind Core (Node.js runtime) for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP Client, Pinecone, Webhooks, Schedulers, and PostgreSQL Audit Loggers using AI coding tools (Antigravity, Claude Code, Codex).',
    'Designed multi-step business automations across Zapier, Make, and n8n connecting CRMs (HubSpot, Airtable), web forms, and messaging tools, eliminating manual data entry and accelerating client operational pipelines.',
    'Architected the AI MicroMind App featuring the Report Bot Framework and conversational BI tools, enabling non-technical users to query on-premise ERPs (Oracle, SAP, Microsoft Dynamics, Odoo, SQL) and cloud platforms via natural language.',
    'Implemented robust error-handling, fallback triggers, and webhook retry mechanisms, ensuring zero data loss and 99.9% uptime across production integrations.',
    'Developed client-facing documentation, visual workflow diagrams, and SOPs, translating intricate technical pipelines into plain-language guides for non-technical stakeholders.',
    'Constructed multi-agent graph workflows using LangChain and LangGraph with Model Context Protocol (MCP) server dispatchers for secure backend execution.'
  ];
  expMicroMind.forEach(bullet => {
    doc.fillColor(bodyTextColor).fontSize(7.9).font('Helvetica').text(`•  ${bullet}`, { align: 'justify', lineGap: 1.3 });
  });
  doc.moveDown(0.3);

  // Role 2: Operatives Automation
  doc.fillColor(darkColor).fontSize(9.2).font('Helvetica-Bold').text('Automation Engineer', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — Operatives (IT Services)', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.2).font('Helvetica-Bold').text('   (Jun 2021 – Jan 2022)', { align: 'right' });
  doc.moveDown(0.12);
  doc.fillColor(bodyTextColor).fontSize(7.9).font('Helvetica').text('•  Analyzed cross-departmental business workflows and engineered automated data synchronization pipelines, eliminating repetitive manual bottlenecks and reducing data-entry errors by over 70%.', { align: 'justify', lineGap: 1.3 });
  doc.moveDown(0.3);

  // Role 3: Operatives Admin
  doc.fillColor(darkColor).fontSize(9.2).font('Helvetica-Bold').text('Operation Engineer & Admin', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — Operatives (IT Services)', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.2).font('Helvetica-Bold').text('   (Jan 2020 – Jun 2021)', { align: 'right' });
  doc.moveDown(0.12);
  doc.fillColor(bodyTextColor).fontSize(7.9).font('Helvetica').text('•  Administered IT infrastructure operations, monitored workflow execution logs, enforced strict SLA compliance, and resolved technical service tickets with prompt escalation.', { align: 'justify', lineGap: 1.3 });
  doc.moveDown(0.35);

  // ==========================================
  // 5. KEY TECHNICAL ARCHITECTURE PROJECTS
  // ==========================================
  addSectionHeader('Key Technical Architecture Projects');
  const projectHighlights = [
    { title: 'AI MicroMind App & Report Bot Framework:', desc: 'Conversational BI reporting engine translating natural language prompts into live SQL/OData queries across Oracle, SAP, Dynamics 365, Odoo, and SQL databases.' },
    { title: 'AI MicroMind Core Node Architecture (30+ Native Nodes):', desc: 'Custom Node.js native nodes extending core platform capabilities for WAPA, Telegram, Gmail, Weather, MCP, Pinecone, and Cron Schedulers.' },
    { title: 'End-to-End Business Automation Pipelines:', desc: 'Multi-platform automations across Make, Zapier, and n8n connecting web forms, HubSpot/Airtable CRMs, email sequences, and Slack notifications with automated error alerts.' },
    { title: 'AI MicroMind MicroApps & Mobile Architecture:', desc: 'Modular middleware connecting cross-platform mobile apps and 12+ SaaS platforms (Lark, Bubble.io, Teamwork, ConnectWise, ClickUp, Zoom, Slack).' },
    { title: 'Stateful Multi-Agent Graphs (LangChain & LangGraph):', desc: 'Hierarchical supervisor agent graphs featuring state persistence, conditional branching, and self-correcting prompt loops.' },
    { title: 'Cloud DevOps & Containerization Suite:', desc: 'Multi-stage Dockerized environments deployed across AWS, DigitalOcean Linux VPS, and Render with automated CI/CD.' }
  ];
  projectHighlights.forEach(proj => {
    doc.fillColor(darkColor).fontSize(7.9).font('Helvetica-Bold').text(`• ${proj.title} `, { continued: true });
    doc.fillColor(bodyTextColor).font('Helvetica').text(proj.desc, { align: 'justify', lineGap: 1.2 });
  });
  doc.moveDown(0.35);

  // ==========================================
  // 6. EDUCATION
  // ==========================================
  addSectionHeader('Education');
  doc.fillColor(darkColor).fontSize(8.8).font('Helvetica-Bold').text('B.Sc. in Computer Engineering', { continued: true });
  doc.fillColor(primaryColor).font('Helvetica-Bold').text(' — Faculty of Engineering Shoubra, Benha University', { continued: true });
  doc.fillColor(mutedColor).fontSize(8.2).font('Helvetica').text('   (Benha, Egypt)', { align: 'right' });
  doc.moveDown(0.1);
  doc.fillColor(bodyTextColor).fontSize(7.8).font('Helvetica').text('Specialization: Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.');

  doc.end();

  stream.on('finish', () => {
    console.log(`Successfully generated ATS-compliant PDF resume with direct hyperlinks at: ${outputPath}`);
  });
}

const portfolioPdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');
const cvPdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_CV.pdf');

generateResumePDF(portfolioPdfPath);
generateResumePDF(cvPdfPath);
