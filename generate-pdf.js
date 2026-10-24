/**
 * generate-pdf.js
 * Generates ATS-optimized, Executive Monochrome PDFs matching the FlowCV style:
 * 1. Mahmoud_Abd_El-Ghaffar_CV.pdf (2-Page Mix CV)
 * 2. Mahmoud_Abd_El-Ghaffar_Resume.pdf (1-Page Mix Resume)
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// FlowCV Monochrome Design Tokens
const THEME = {
  heading: '#111111',
  body: '#222222',
  muted: '#444444',
  line: '#111111',
  bullet: '#111111'
};

// Vector Contact Icons
function drawEmailIcon(doc, x, y, size = 8.5) {
  doc.save();
  doc.lineWidth(0.75).strokeColor(THEME.body);
  const h = size * 0.72;
  const top = y + 1.5;
  doc.rect(x, top, size, h).stroke();
  doc.moveTo(x, top).lineTo(x + size / 2, top + h * 0.55).lineTo(x + size, top).stroke();
  doc.restore();
}

function drawPhoneIcon(doc, x, y, size = 8.5) {
  doc.save();
  doc.lineWidth(0.75).strokeColor(THEME.body);
  const w = size * 0.62;
  const h = size * 0.95;
  const top = y + 0.5;
  doc.roundedRect(x + 1, top, w, h, 1.2).stroke();
  doc.fillColor(THEME.body).circle(x + 1 + w / 2, top + h - 1.8, 0.6).fill();
  doc.restore();
}

function drawPinIcon(doc, x, y, size = 8.5) {
  doc.save();
  doc.lineWidth(0.75).strokeColor(THEME.body).fillColor(THEME.body);
  const r = size * 0.32;
  const cx = x + size / 2;
  const cy = y + r + 1;
  doc.circle(cx, cy, r).stroke();
  doc.circle(cx, cy, 0.7).fill();
  doc.moveTo(cx - r * 0.85, cy + r * 0.4)
     .lineTo(cx, y + size + 0.5)
     .lineTo(cx + r * 0.85, cy + r * 0.4)
     .stroke();
  doc.restore();
}

function drawGlobeIcon(doc, x, y, size = 8.5) {
  doc.save();
  doc.lineWidth(0.75).strokeColor(THEME.body);
  const r = size * 0.44;
  const cx = x + size / 2;
  const cy = y + size / 2 + 0.5;
  doc.circle(cx, cy, r).stroke();
  doc.moveTo(cx - r, cy).lineTo(cx + r, cy).stroke();
  doc.ellipse(cx, cy, r * 0.45, r).stroke();
  doc.restore();
}

/**
 * Draw FlowCV-style Section Header with full-width underline rule
 */
function drawSectionHeader(doc, title, x, width, topMargin = 13, bottomMargin = 7, fontSize = 11.5) {
  doc.y += topMargin;
  doc.font('Helvetica-Bold').fontSize(fontSize).fillColor(THEME.heading).text(title, x, doc.y);
  const lineY = doc.y + 3;
  doc.lineWidth(0.8).strokeColor(THEME.line).moveTo(x, lineY).lineTo(x + width, lineY).stroke();
  doc.y = lineY + bottomMargin;
}

/**
 * Draw Job Role Header: Title on Left, Date on Right on the same line
 */
function drawRoleHeader(doc, roleAndCompany, dateText, x, width, fontSize = 9.8) {
  const startY = doc.y;
  doc.font('Helvetica-Bold').fontSize(fontSize).fillColor(THEME.heading).text(roleAndCompany, x, startY, {
    width: width - 110,
    continued: false
  });
  const titleEndY = doc.y;
  doc.font('Helvetica').fontSize(9).fillColor(THEME.muted).text(dateText, x, startY, {
    width: width,
    align: 'right'
  });
  doc.y = Math.max(titleEndY, startY + 12) + 3;
}

/**
 * Draw Hanging Indent Bullet Point
 */
function drawBullet(doc, text, x, width, options = {}) {
  const fontSize = options.fontSize || 9;
  const lineGap = options.lineGap || 2.5;
  const customGap = options.customGap || 5;
  const itemY = doc.y;

  doc.font('Helvetica').fontSize(fontSize).fillColor(THEME.bullet);
  doc.text('•', x + 2, itemY);
  doc.fillColor(THEME.body).text(text, x + 13, itemY, {
    width: width - 13,
    lineGap: lineGap
  });
  doc.y += customGap;
}

/**
 * Draw FlowCV Project Item: Bold Title + Description below
 */
function drawProjectItem(doc, title, desc, x, width, options = {}) {
  const titleSize = options.titleSize || 9.5;
  const descSize = options.descSize || 8.8;
  const customGap = options.customGap || 7;

  doc.font('Helvetica-Bold').fontSize(titleSize).fillColor(THEME.heading).text(title, x, doc.y);
  doc.y += 2;
  doc.font('Helvetica').fontSize(descSize).fillColor(THEME.body).text(desc, x, doc.y, {
    width: width,
    lineGap: 2.3
  });
  doc.y += customGap;
}

/**
 * Draw Contact Row with vector icons
 */
function drawContactLine(doc, x, y, width) {
  let curX = x;
  const items = [
    { icon: drawEmailIcon, text: 'mahmoudzanaty454@gmail.com', link: 'mailto:mahmoudzanaty454@gmail.com' },
    { icon: drawPhoneIcon, text: '+20 102 419 0741', link: 'https://wa.me/201024190741' },
    { icon: drawPinIcon, text: 'Benha / Cairo, Egypt' },
    { icon: drawGlobeIcon, text: 'portfolio-mrt6.onrender.com', link: 'https://portfolio-mrt6.onrender.com/' }
  ];

  items.forEach((item) => {
    item.icon(doc, curX, y, 9);
    curX += 12;
    doc.font('Helvetica').fontSize(9).fillColor(THEME.body);
    const w = doc.widthOfString(item.text);
    if (item.link) {
      doc.text(item.text, curX, y, { link: item.link, continued: false });
    } else {
      doc.text(item.text, curX, y, { continued: false });
    }
    curX += w + 14;
  });
  doc.y = y + 13;
}

// ==========================================
// 1. GENERATE 2-PAGE MIX CV (FlowCV STYLE)
// ==========================================
function generateTwoPageCV(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 38, bottom: 38, left: 45, right: 45 },
    autoFirstPage: true
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const leftX = 45;
  const contentWidth = 595.28 - 90; // 505.28 pt

  // --- PAGE 1 ---
  // Header
  doc.font('Helvetica-Bold').fontSize(22).fillColor(THEME.heading).text('Mahmoud Abd El-Ghaffar', leftX, 38);
  doc.y += 2;
  doc.font('Helvetica').fontSize(11).fillColor(THEME.body).text('AI Automation & Web Development Engineer', leftX, doc.y);
  doc.y += 5;

  drawContactLine(doc, leftX, doc.y, contentWidth);

  // 1. Professional Summary
  drawSectionHeader(doc, 'Professional Summary', leftX, contentWidth, 12, 7);
  doc.font('Helvetica').fontSize(9.1).fillColor(THEME.body).text(
    'Computer Engineer and AI Automation Specialist combining hands-on expertise in full-stack website design and development with advanced systems integration. Experienced in designing visually compelling, mobile-first websites and web portals utilizing modern AI design workflows (Google Antigravity, Claude Code, rapid UI prototyping) alongside production business automations (Make, Zapier, n8n, CRMs, WhatsApp/Social funnels). Proven portfolio of live concept web design mockups and interactive prototypes deployed on Render (dental clinic mockups like Smile Inn, sovereign institutional portal concepts like FOE Procurement Portal, task assistant apps, and personal portfolio). Proven track record engineering 30+ native integration nodes in AI MicroMind Core and automating 30+ production workflows connecting CRMs (HubSpot, GoHighLevel, Airtable), forms (Typeform, Tally, Fillout), messaging platforms (WhatsApp Cloud API/WAPA, Instagram, Telegram, Slack), and databases. Comfortable working under strict NDA and proprietary data privacy standards.',
    leftX, doc.y,
    { width: contentWidth, lineGap: 2.6 }
  );

  // 2. Professional Experience
  drawSectionHeader(doc, 'Professional Experience', leftX, contentWidth, 13, 7);

  // AI MicroMind
  drawRoleHeader(doc, 'AI & Automation Engineer, AI MicroMind', '2024 – 2026', leftX, contentWidth);
  drawBullet(doc, 'Built and co-built 30+ native integration nodes for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP Client, Pinecone, Webhooks, Schedulers, and PostgreSQL audit logging.', leftX, contentWidth);
  drawBullet(doc, 'Architected and deployed the AI MicroMind App with conversational BI and reporting capabilities, enabling natural-language access to operational data across Oracle, Microsoft Dynamics, SAP, Odoo, SQL, Oracle Fusion, and Dynamics 365 OData.', leftX, contentWidth);
  drawBullet(doc, 'Engineered responsive web applications and interactive client portals leveraging modern AI design workflows (Google Antigravity, Claude Code) for rapid UI iteration, clean UX, and component modularity.', leftX, contentWidth);
  drawBullet(doc, 'Developed AI agents and multi-step automation workflows using LangChain and LangGraph, including MCP-based integrations and backend execution flows.', leftX, contentWidth);
  drawBullet(doc, 'Built modular MicroApps and custom integrations connecting third-party business applications to the MicroMind ecosystem.', leftX, contentWidth);
  drawBullet(doc, 'Worked across deployment and infrastructure using Docker, AWS, DigitalOcean, Linux VPS, Render, and GitHub version-control workflows.', leftX, contentWidth, { customGap: 7 });

  // Operatives - Role 1
  drawRoleHeader(doc, 'Automation Engineer, Operatives (IT Services)', '06/2021 – 01/2022', leftX, contentWidth);
  doc.font('Helvetica').fontSize(9).fillColor(THEME.body).text(
    'Analyzed cross-department operational processes and built end-to-end automations to reduce repetitive manual work and data-entry bottlenecks.',
    leftX, doc.y,
    { width: contentWidth, lineGap: 2.4 }
  );
  doc.y += 7;

  // Operatives - Role 2
  drawRoleHeader(doc, 'Operation Engineer & Admin, Operatives (IT Services)', '01/2020 – 06/2021', leftX, contentWidth);
  doc.font('Helvetica').fontSize(9).fillColor(THEME.body).text(
    'Managed IT operations, monitored workflow execution, supported operational tracking systems, and followed SLA-related processes.',
    leftX, doc.y,
    { width: contentWidth, lineGap: 2.4 }
  );

  // 3. Education
  drawSectionHeader(doc, 'Education', leftX, contentWidth, 13, 7);
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(THEME.heading).text(
    'B.Sc. in Computer Engineering, Faculty of Engineering Shoubra, Benha University',
    leftX, doc.y
  );
  doc.y += 2;
  doc.font('Helvetica').fontSize(8.8).fillColor(THEME.body).text(
    'Specialization: Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.',
    leftX, doc.y,
    { width: contentWidth, lineGap: 2.2 }
  );

  // --- PAGE 2 ---
  doc.addPage();

  // 1. Core Skills (FlowCV 2-Column Grid)
  drawSectionHeader(doc, 'Core Skills', leftX, contentWidth, 0, 9);

  const colGap = 24;
  const colWidth = (contentWidth - colGap) / 2;
  const col1X = leftX;
  const col2X = leftX + colWidth + colGap;

  const leftColYStart = doc.y;

  function drawSkillGroup(colX, title, items, isLast = false) {
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(THEME.heading).text(title, colX, doc.y);
    doc.y += 2;
    doc.font('Helvetica').fontSize(8.8).fillColor(THEME.body).text(items, colX, doc.y, {
      width: colWidth,
      lineGap: 2.2
    });
    if (!isLast) doc.y += 7;
  }

  // Left Column Skills
  doc.y = leftColYStart;
  drawSkillGroup(col1X, 'Automation & AI Platforms', 'AI MicroMind, Flowise, n8n, Make, Zapier, LangChain, LangGraph');
  drawSkillGroup(col1X, 'Website Design & UI/UX (AI-Assisted)', 'Responsive Web Design, Google Antigravity, Claude Code, Rapid UI Prototyping, Glassmorphism, Cross-Browser UI');
  drawSkillGroup(col1X, 'AI, RAG & Data Engineering', 'AI Agents, Multi-Agent Workflows, Pinecone, PostgreSQL, PGVector, OpenAI Embeddings, LLM-to-SQL');
  drawSkillGroup(col1X, 'Deployment & Cloud Infrastructure', 'Node.js / TypeScript, Docker, AWS, DigitalOcean, Linux VPS, Render Web Hosting, GitHub CI/CD', true);
  const leftColEndY = doc.y;

  // Right Column Skills
  doc.y = leftColYStart;
  drawSkillGroup(col2X, 'Integration & Orchestration', 'MCP Client, REST APIs, Webhooks, Schedulers, OAuth2, Third-Party APIs');
  drawSkillGroup(col2X, 'Business & CRM Integrations', 'HubSpot CRM, GoHighLevel (GHL), Airtable, Microsoft 365, Slack, Lark Suite, Teamwork, ConnectWise');
  drawSkillGroup(col2X, 'Social & Messaging Platforms', 'WhatsApp Cloud API / WAPA, Instagram DM Automations, Facebook Messenger, Telegram Bot API');
  drawSkillGroup(col2X, 'Forms & Lead Capture Pipelines', 'Typeform, Tally, Fillout, Jotform, Google Forms, Lead Validation & Multi-Step Conditional Routing', true);
  const rightColEndY = doc.y;

  doc.y = Math.max(leftColEndY, rightColEndY) + 6;

  // 2. Selected Project Highlights
  drawSectionHeader(doc, 'Selected Project Highlights', leftX, contentWidth, 10, 8);

  drawProjectItem(
    doc,
    'AI MicroMind App & Reporting Bot Framework',
    'Conversational BI reporting engine translating natural language prompts into live SQL/OData queries across Oracle, SAP, Dynamics 365, Odoo, and SQL databases.',
    leftX, contentWidth
  );

  drawProjectItem(
    doc,
    '30+ Native Integration Nodes (AI MicroMind Core)',
    'Reusable native integration nodes for WAPA (WhatsApp API), Telegram, Gmail, MCP Client, Pinecone, webhooks, schedulers, and PostgreSQL audit logging.',
    leftX, contentWidth
  );

  drawProjectItem(
    doc,
    'Smile Inn Dental Clinic Website (Live Concept Mockup — Render)',
    'Designed a modern, responsive clinic website concept mockup featuring calming color psychology, interactive before/after treatment sliders, doctor profiles, and appointment booking funnels.',
    leftX, contentWidth
  );

  drawProjectItem(
    doc,
    'FOE Sovereign Procurement Directorate Portal (Concept Prototype — Render)',
    'Conceptual digital web portal and dashboard mockup designed for sovereign procurement operations with executive branding, responsive data tables, multi-role navigation, and bilingual Arabic/English layout.',
    leftX, contentWidth
  );

  drawProjectItem(
    doc,
    'Omnichannel Social & Messaging Automation Systems',
    'Multi-platform social funnels connecting WhatsApp Cloud API / WAPA, Instagram DM comment-to-lead triggers, Facebook Messenger support bots, and Telegram channels with HubSpot & GoHighLevel.',
    leftX, contentWidth
  );

  drawProjectItem(
    doc,
    'Smart Task Assistant & Merna Invitation Web Apps (Live Prototypes — Render)',
    'AI-powered task management app prototype with sleek dark-mode glassmorphism alongside a bespoke mobile-first animated digital invitation web mockup.',
    leftX, contentWidth
  );

  doc.end();
  stream.on('finish', () => {
    console.log(`Generated FlowCV 2-Page CV: ${outputPath}`);
  });
}

// ==========================================
// 2. GENERATE 1-PAGE MIX RESUME (FlowCV STYLE)
// ==========================================
function generateOnePageResume(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 32, left: 40, right: 40 },
    autoFirstPage: true
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const leftX = 40;
  const contentWidth = 595.28 - 80; // 515.28 pt

  // Header
  doc.font('Helvetica-Bold').fontSize(20).fillColor(THEME.heading).text('Mahmoud Abd El-Ghaffar', leftX, 32);
  doc.y += 1.5;
  doc.font('Helvetica').fontSize(10.5).fillColor(THEME.body).text('AI Automation & Web Development Engineer', leftX, doc.y);
  doc.y += 4;

  drawContactLine(doc, leftX, doc.y, contentWidth);

  // 1. Professional Summary
  drawSectionHeader(doc, 'Professional Summary', leftX, contentWidth, 8, 5, 11);
  doc.font('Helvetica').fontSize(8.7).fillColor(THEME.body).text(
    'Computer Engineer and AI Automation Specialist combining hands-on expertise in full-stack website design and development with advanced systems integration. Experienced in designing visually compelling, mobile-first websites and web portals utilizing modern AI design workflows (Google Antigravity, Claude Code, rapid UI prototyping) alongside production business automations (Make, Zapier, n8n, CRMs, WhatsApp/Social funnels). Proven portfolio of live concept web design mockups and interactive prototypes deployed on Render (Smile Inn, FOE Procurement Portal, task assistant apps, and personal portfolio). Comfortable working under strict NDA and proprietary data standards.',
    leftX, doc.y,
    { width: contentWidth, lineGap: 2.2 }
  );

  // 2. Core Skills (2 Columns)
  drawSectionHeader(doc, 'Core Technical & Design Skills', leftX, contentWidth, 9, 6, 11);

  const colGap = 20;
  const colWidth = (contentWidth - colGap) / 2;
  const col1X = leftX;
  const col2X = leftX + colWidth + colGap;

  const leftColYStart = doc.y;

  function drawResumeSkill(colX, title, items, isLast = false) {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(THEME.heading).text(title, colX, doc.y);
    doc.y += 1.5;
    doc.font('Helvetica').fontSize(8.3).fillColor(THEME.body).text(items, colX, doc.y, {
      width: colWidth,
      lineGap: 2.0
    });
    if (!isLast) doc.y += 5.5;
  }

  // Left Column
  doc.y = leftColYStart;
  drawResumeSkill(col1X, 'Website Design & UI/UX (AI-Assisted)', 'Responsive Layouts, Google Antigravity, Claude Code, Wireframing, Glassmorphism, Cross-Browser UI');
  drawResumeSkill(col1X, 'Automation & AI Platforms', 'AI MicroMind, Flowise, n8n, Make, Zapier, LangChain, LangGraph');
  drawResumeSkill(col1X, 'Deployment & Cloud Infrastructure', 'Node.js / TypeScript, Docker, AWS, DigitalOcean, Linux VPS, Render, GitHub CI/CD', true);
  const leftColEndY = doc.y;

  // Right Column
  doc.y = leftColYStart;
  drawResumeSkill(col2X, 'Integration & Orchestration', 'MCP Client, REST APIs, Webhooks, Schedulers, OAuth2, Third-Party APIs');
  drawResumeSkill(col2X, 'Social, Forms & CRM Automation', 'WhatsApp Cloud API/WAPA, Instagram DMs, Telegram, Typeform, Tally, Fillout, HubSpot, GoHighLevel');
  drawResumeSkill(col2X, 'AI, RAG & Database Engineering', 'Pinecone, PostgreSQL, PGVector, OpenAI Embeddings, LLM-to-SQL, Oracle, SAP, ERP Data', true);
  const rightColEndY = doc.y;

  doc.y = Math.max(leftColEndY, rightColEndY) + 5;

  // 3. Professional Experience
  drawSectionHeader(doc, 'Professional Experience', leftX, contentWidth, 8, 5, 11);

  // AI MicroMind
  drawRoleHeader(doc, 'AI & Automation Engineer, AI MicroMind', '2024 – 2026', leftX, contentWidth, 9.5);
  drawBullet(doc, 'Engineered 30+ native integration nodes (WhatsApp WAPA, Telegram, Gmail, MCP, Pinecone, Webhooks, Schedulers, PostgreSQL logging).', leftX, contentWidth, { fontSize: 8.5, lineGap: 2.0, customGap: 3.5 });
  drawBullet(doc, 'Architected and deployed AI MicroMind App with natural-language conversational BI across Oracle, SAP, Dynamics 365, and SQL databases.', leftX, contentWidth, { fontSize: 8.5, lineGap: 2.0, customGap: 3.5 });
  drawBullet(doc, 'Designed responsive web applications and client portals leveraging modern AI design workflows (Google Antigravity, Claude Code) for rapid UI iteration.', leftX, contentWidth, { fontSize: 8.5, lineGap: 2.0, customGap: 3.5 });
  drawBullet(doc, 'Managed containerized infrastructure, VPS servers, and CI/CD pipelines across AWS, Docker, DigitalOcean, Render, and GitHub Actions.', leftX, contentWidth, { fontSize: 8.5, lineGap: 2.0, customGap: 5 });

  // Operatives
  drawRoleHeader(doc, 'Automation & Operation Engineer, Operatives (IT Services)', '01/2020 – 01/2022', leftX, contentWidth, 9.5);
  drawBullet(doc, 'Analyzed cross-department operations, built automated workflows to resolve bottlenecks, and maintained SLA-driven tracking systems.', leftX, contentWidth, { fontSize: 8.5, lineGap: 2.0, customGap: 5 });

  // 4. Featured Concept Projects & Live Prototypes
  drawSectionHeader(doc, 'Selected Projects & Live Prototypes (Render)', leftX, contentWidth, 8, 5, 11);

  drawProjectItem(
    doc,
    'Smile Inn Dental Clinic Website (Live Concept Mockup — Render)',
    'Modern clinic concept mockup with calming aesthetics, interactive before/after sliders, doctor profiles, and booking funnels.',
    leftX, contentWidth,
    { titleSize: 9, descSize: 8.3, customGap: 5 }
  );

  drawProjectItem(
    doc,
    'FOE Sovereign Procurement Directorate Portal (Concept Prototype — Render)',
    'Conceptual executive portal mockup with sovereign branding, responsive data tables, and bilingual Arabic/English navigation.',
    leftX, contentWidth,
    { titleSize: 9, descSize: 8.3, customGap: 5 }
  );

  drawProjectItem(
    doc,
    'Omnichannel Social & Messaging Automation Systems',
    'Multi-platform funnels connecting WhatsApp Cloud API, Instagram DMs, Telegram, and Typeform with HubSpot & GoHighLevel.',
    leftX, contentWidth,
    { titleSize: 9, descSize: 8.3, customGap: 5 }
  );

  // 5. Education
  drawSectionHeader(doc, 'Education', leftX, contentWidth, 7, 4, 11);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(THEME.heading).text(
    'B.Sc. in Computer Engineering, Faculty of Engineering Shoubra, Benha University',
    leftX, doc.y
  );
  doc.y += 1.5;
  doc.font('Helvetica').fontSize(8.2).fillColor(THEME.body).text(
    'Specialization: Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.',
    leftX, doc.y,
    { width: contentWidth, lineGap: 2.0 }
  );

  doc.end();
  stream.on('finish', () => {
    console.log(`Generated FlowCV 1-Page Resume: ${outputPath}`);
  });
}

// ==========================================
// CLI Execution
// ==========================================
const cvPath = path.resolve(__dirname, 'Mahmoud_Abd_El-Ghaffar_CV.pdf');
const resumePath = path.resolve(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');

generateTwoPageCV(cvPath);
generateOnePageResume(resumePath);
