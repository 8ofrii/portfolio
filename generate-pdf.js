const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Design Color Palette
const COLORS = {
  primary: '#0284c7',       // Electric Brand Blue for Links, Badges & Accents
  primaryDark: '#0369a1',   // Darker Blue
  heading: '#0f172a',       // Deep Slate for Headings & Titles
  body: '#334155',          // Readable Charcoal Slate for Body Text
  muted: '#475569',         // Slate for Dates & Metadata
  border: '#e2e8f0',        // Subtle Divider Line
  borderDark: '#cbd5e1',    // Stronger Divider Line
  tagBg: '#f1f5f9'          // Light Background for Badges
};

/**
 * Draw a vector bullet dot (guaranteed no encoding issues across any PDF viewer)
 */
function drawBulletDot(doc, x, y, radius = 2.2, color = COLORS.primary) {
  doc.save();
  doc.circle(x, y, radius).fill(color);
  doc.restore();
}

/**
 * Draw section header with an elegant divider line and controlled spacing
 */
function drawSectionHeader(doc, title, x, width, topPadding = 12, bottomPadding = 7) {
  doc.y += topPadding;
  const startY = doc.y;
  doc.fillColor(COLORS.heading).fontSize(10.5).font('Helvetica-Bold').text(title.toUpperCase(), x, startY, {
    characterSpacing: 0.6
  });
  const lineY = doc.y + 3;
  doc.strokeColor(COLORS.borderDark).lineWidth(0.75).moveTo(x, lineY).lineTo(x + width, lineY).stroke();
  doc.y = lineY + bottomPadding;
}

/**
 * Draw role header: Role & Company on the left, Date Badge on the right
 */
function drawRoleHeader(doc, role, company, date, x, width, fontSize = 9.8) {
  const startY = doc.y;
  
  // Left: Job Title & Company
  doc.fillColor(COLORS.heading).fontSize(fontSize).font('Helvetica-Bold').text(role, x, startY, { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text(` — ${company}`);
  const leftEndY = doc.y;

  // Right: Date Badge with rounded soft background
  const dateStr = date;
  doc.fontSize(fontSize - 1.2).font('Helvetica-Bold');
  const dateWidth = doc.widthOfString(dateStr);
  const badgePaddingX = 6;
  const badgePaddingY = 2;
  const badgeWidth = dateWidth + (badgePaddingX * 2);
  const badgeHeight = (fontSize - 1.2) + (badgePaddingY * 2) + 2;
  const badgeX = x + width - badgeWidth;
  const badgeY = startY - 1;

  doc.save();
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 3).fill(COLORS.tagBg);
  doc.fillColor(COLORS.muted).text(dateStr, badgeX + badgePaddingX, startY + 0.5);
  doc.restore();

  doc.y = Math.max(leftEndY, badgeY + badgeHeight) + 4.5;
}

/**
 * Draw bullet item with hanging indent
 */
function drawBulletItem(doc, title, desc, x, width, options = {}) {
  const {
    bulletOffset = 4,
    indent = 13,
    fontSize = 8.8,
    lineGap = 2.4,
    itemGap = 4
  } = options;

  const textX = x + indent;
  const textWidth = width - indent;
  const startY = doc.y;

  // Draw bullet dot vertically aligned to first line
  drawBulletDot(doc, x + bulletOffset, startY + (fontSize * 0.55), 2.2, COLORS.primary);

  doc.y = startY;
  if (title) {
    doc.fillColor(COLORS.heading).fontSize(fontSize).font('Helvetica-Bold').text(title + ' ', textX, startY, {
      continued: !!desc,
      width: textWidth
    });
  }
  if (desc) {
    doc.fillColor(COLORS.body).fontSize(fontSize).font('Helvetica').text(desc, title ? undefined : textX, title ? undefined : startY, {
      width: textWidth,
      lineGap: lineGap
    });
  }

  doc.y += itemGap;
}

/**
 * =========================================================================
 * 1. 2-PAGE COMPREHENSIVE CURRICULUM VITAE (EXECUTIVE, IMMACULATE LAYOUT)
 * =========================================================================
 */
function generateTwoPageCV(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 32, left: 36, right: 36 },
    autoFirstPage: true,
    compress: false,
    info: {
      Title: 'Mahmoud Abd El-Ghaffar - Curriculum Vitae',
      Author: 'Mahmoud Abd El-Ghaffar',
      Subject: 'AI Automation Specialist & Systems Integration Engineer CV',
      Keywords: 'AI Automation Specialist, Make, Zapier, n8n, APIs, Multi-Agent Systems'
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const x = 36;
  const pageWidth = 595.28;
  const contentWidth = pageWidth - 72; // 523.28

  // ---------------- PAGE 1 ----------------
  // Header Block
  doc.fillColor(COLORS.heading).fontSize(22).font('Helvetica-Bold').text('MAHMOUD ABD EL-GHAFFAR', x, 32);
  doc.moveDown(0.12);
  doc.fillColor(COLORS.primary).fontSize(11).font('Helvetica-Bold').text('AI Automation Engineer & Systems Integration Specialist');
  doc.moveDown(0.08);
  doc.fillColor(COLORS.muted).fontSize(9).font('Helvetica-Bold').text('Make  |  Zapier  |  n8n  |  Custom REST APIs  |  Webhooks  |  Multi-Agent Workflows');
  doc.moveDown(0.24);

  // Contact line 1
  doc.fillColor(COLORS.body).fontSize(8.8).font('Helvetica').text('Location: Benha / Cairo, Egypt   •   Phone: ', x, doc.y, { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('+20 102 419 0741', { link: 'tel:+201024190741', underline: true, continued: true });
  doc.fillColor(COLORS.body).font('Helvetica').text('   •   Email: ', { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('mahmoudzanaty454@gmail.com', { link: 'mailto:mahmoudzanaty454@gmail.com', underline: true });

  // Contact line 2
  doc.moveDown(0.16);
  doc.fillColor(COLORS.body).fontSize(8.8).font('Helvetica').text('LinkedIn: ', x, doc.y, { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219', { link: 'https://www.linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219/', underline: true, continued: true });
  doc.fillColor(COLORS.muted).font('Helvetica').text('   •   Live Portfolio: ', { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('https://portfolio-mrt6.onrender.com/', { link: 'https://portfolio-mrt6.onrender.com/', underline: true });

  doc.moveDown(0.32);
  doc.strokeColor(COLORS.primary).lineWidth(1.2).moveTo(x, doc.y).lineTo(x + contentWidth, doc.y).stroke();
  doc.y += 4;

  // 1. Professional Summary
  drawSectionHeader(doc, 'Professional Summary', x, contentWidth, 10, 6);
  doc.fillColor(COLORS.body).fontSize(9.2).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Automation Specialist with deep hands-on expertise engineering production workflows, multi-agent pipelines, and cloud integrations across Make, Zapier, n8n, and custom REST APIs. Built and co-built 30+ native integration nodes inside the AI MicroMind core runtime and automated 30+ end-to-end business workflows connecting CRMs (HubSpot, Airtable), web forms, messaging platforms (Slack, Gmail, WhatsApp/WAPA), and enterprise databases. Known for strong systems thinking, proactive error handling, and the ability to articulate technical architectures in plain, non-technical language for business stakeholders. Comfortable working under strict NDA and proprietary client data privacy standards.',
    x, doc.y,
    { width: contentWidth, lineGap: 3.0 }
  );

  // 2. Core Technical Competencies
  drawSectionHeader(doc, 'Core Technical Competencies', x, contentWidth, 12, 7);
  const skills = [
    { title: 'Automation Platforms & Orchestration:', desc: 'Make (Integromat), Zapier, n8n, AI MicroMind (30+ Native Core Nodes), Webhooks, Cron Schedulers, REST APIs, OAuth2.' },
    { title: 'Business & CRM Integrations:', desc: 'HubSpot, Airtable, Gmail, Microsoft 365, Slack, Meta/WhatsApp (WAPA), Telegram, ClickUp, Teamwork, ConnectWise, Typeform.' },
    { title: 'AI & Multi-Agent Frameworks:', desc: 'LangChain (Expert), LangGraph (Advanced), Model Context Protocol (MCP), Pinecone Vector DB, OpenAI Embeddings, LLM-to-SQL.' },
    { title: 'Systems Reliability & Delivery:', desc: 'Systems Architecture, Automated Error Handling & Retries, Real-Time Alerting, SOPs & Plain-Language Client Documentation.' },
    { title: 'Enterprise ERPs & Database BI:', desc: 'Conversational BI over Oracle ERP, Oracle Fusion, Dynamics 365 OData, SAP, Odoo, PostgreSQL, SQL Server.' },
    { title: 'Backend, Cloud & Acceleration:', desc: 'Node.js / TypeScript, Python, Docker, AWS, DigitalOcean Linux VPS, Render, GitHub CI/CD, Google Antigravity, Claude Code.' }
  ];
  skills.forEach(s => drawBulletItem(doc, s.title, s.desc, x, contentWidth, { fontSize: 8.9, lineGap: 2.6, itemGap: 4.5 }));

  // 3. Professional Experience (AI MicroMind on Page 1)
  drawSectionHeader(doc, 'Professional Experience', x, contentWidth, 12, 7);
  drawRoleHeader(doc, 'AI & Automation Engineer', 'AI MicroMind', '2024 – Present', x, contentWidth, 10);

  const expMicroMind = [
    { title: 'Native Integration Nodes:', desc: 'Built and co-built 30+ native integration nodes directly inside AI MicroMind Core (Node.js runtime) for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP Client, Pinecone, Webhooks, Schedulers, and PostgreSQL Audit Loggers using AI coding tools (Antigravity, Claude Code, Codex).' },
    { title: 'Multi-Step Business Automations:', desc: 'Designed automated workflows across Zapier, Make, and n8n connecting CRMs (HubSpot, Airtable), web forms, and messaging tools, eliminating manual data entry and accelerating client operational pipelines.' },
    { title: 'Conversational BI & Report Bot:', desc: 'Architected the AI MicroMind App featuring the Report Bot Framework, enabling non-technical users to query on-premise ERPs (Oracle, SAP, Microsoft Dynamics, Odoo, SQL) and cloud databases via natural language.' },
    { title: 'Proactive Error Handling & 99.9% Uptime:', desc: 'Implemented robust fallback triggers, alert notifications, and webhook retry mechanisms, ensuring zero data loss and fault-tolerant production execution.' },
    { title: 'Client Communication & Plain-Language SOPs:', desc: 'Authored client-facing visual workflow diagrams, SOPs, and user guides, translating intricate technical pipelines into plain-language instructions for non-technical stakeholders.' },
    { title: 'Multi-Agent Graphs & MCP:', desc: 'Constructed multi-agent graph workflows using LangChain and LangGraph with Model Context Protocol (MCP) server dispatchers for secure backend script execution.' }
  ];
  expMicroMind.forEach(b => drawBulletItem(doc, b.title, b.desc, x, contentWidth, { fontSize: 8.9, lineGap: 2.6, itemGap: 5 }));

  // ---------------- PAGE 2 ----------------
  doc.addPage();

  // Page 2 Header Running Banner
  doc.fillColor(COLORS.muted).fontSize(8.8).font('Helvetica-Bold').text('MAHMOUD ABD EL-GHAFFAR', x, 32, { continued: true });
  doc.font('Helvetica').text('   |   Curriculum Vitae — AI Automation Specialist   |   mahmoudzanaty454@gmail.com', { continued: true });
  doc.text('Page 2 of 2', { width: contentWidth, align: 'right' });
  doc.strokeColor(COLORS.borderDark).lineWidth(0.6).moveTo(x, 46).lineTo(x + contentWidth, 46).stroke();
  doc.y = 54;

  // Prior Experience continued
  drawSectionHeader(doc, 'Professional Experience (Continued)', x, contentWidth, 6, 8);
  
  drawRoleHeader(doc, 'Automation Engineer', 'Operatives (IT Services)', 'Jun 2021 – Jan 2022', x, contentWidth, 9.8);
  drawBulletItem(doc, 'Workflow Synchronization:', 'Analyzed cross-departmental business workflows and engineered automated data synchronization pipelines, eliminating repetitive manual bottlenecks and reducing data-entry errors by over 70%.', x, contentWidth, { fontSize: 8.9, lineGap: 2.5, itemGap: 4 });
  drawBulletItem(doc, 'Integration Reliability:', 'Maintained multi-system integrations across internal service catalogs, ticketing systems, and database stores with automated error logging and alerting.', x, contentWidth, { fontSize: 8.9, lineGap: 2.5, itemGap: 6 });

  drawRoleHeader(doc, 'Operation Engineer & Admin', 'Operatives (IT Services)', 'Jan 2020 – Jun 2021', x, contentWidth, 9.8);
  drawBulletItem(doc, 'IT Infrastructure & Operations:', 'Administered IT infrastructure operations, monitored workflow execution logs, enforced strict SLA compliance, and resolved technical service tickets with prompt escalation and root-cause analysis.', x, contentWidth, { fontSize: 8.9, lineGap: 2.5, itemGap: 4 });
  drawBulletItem(doc, 'System Health & Maintenance:', 'Conducted regular preventative maintenance, scheduled automated backup routines, and drafted operational runbooks for technical staff.', x, contentWidth, { fontSize: 8.9, lineGap: 2.5, itemGap: 7 });

  // 4. Key Technical Architecture Projects
  drawSectionHeader(doc, 'Key Technical Architecture & Integration Projects', x, contentWidth, 10, 7);
  const projects = [
    { title: 'AI MicroMind App & Report Bot Framework:', desc: 'Conversational BI reporting engine translating natural language prompts into live SQL/OData queries across Oracle, SAP, Dynamics 365, Odoo, and SQL databases.' },
    { title: 'AI MicroMind Core Node Architecture (30+ Native Nodes):', desc: 'Custom Node.js native nodes extending core platform capabilities for WAPA, Telegram, Gmail, Weather, MCP, Pinecone, and Cron Schedulers.' },
    { title: 'End-to-End Business Automation Pipelines:', desc: 'Multi-platform automations across Make, Zapier, and n8n connecting web forms, HubSpot/Airtable CRMs, email sequences, and Slack notifications with automated error alerts.' },
    { title: 'AI MicroMind MicroApps & Mobile Architecture:', desc: 'Modular middleware connecting cross-platform mobile apps and 12+ SaaS platforms (Lark, Bubble.io, Teamwork, ConnectWise, ClickUp, Zoom, Slack).' },
    { title: 'Stateful Multi-Agent Graphs (LangChain & LangGraph):', desc: 'Hierarchical supervisor agent graphs featuring state persistence, conditional branching, and self-correcting prompt loops.' },
    { title: 'Cloud DevOps & Containerization Suite:', desc: 'Multi-stage Dockerized environments deployed across AWS, DigitalOcean Linux VPS, and Render with automated CI/CD.' }
  ];
  projects.forEach(p => drawBulletItem(doc, p.title, p.desc, x, contentWidth, { fontSize: 8.9, lineGap: 2.5, itemGap: 5 }));

  // 5. Education
  drawSectionHeader(doc, 'Education', x, contentWidth, 10, 7);
  drawRoleHeader(doc, 'B.Sc. in Computer Engineering', 'Faculty of Engineering Shoubra, Benha University', 'Benha, Egypt', x, contentWidth, 9.8);
  drawBulletItem(doc, 'Specialization:', 'Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.', x, contentWidth, { fontSize: 8.9, lineGap: 2.4, itemGap: 7 });

  // 6. Professional Standards & Working Style
  drawSectionHeader(doc, 'Professional Standards & Working Style', x, contentWidth, 10, 7);
  drawBulletItem(doc, 'Plain-Language Client Communication:', 'Skilled in communicating complex technical workflows and automation logic in simple, plain language to non-technical business clients and non-technical stakeholders.', x, contentWidth, { fontSize: 8.9, lineGap: 2.4, itemGap: 4.5 });
  drawBulletItem(doc, 'Data Privacy & Strict NDA Adherence:', 'Experienced and completely comfortable working under strict Non-Disclosure Agreements (NDA) and safeguarding sensitive proprietary client data.', x, contentWidth, { fontSize: 8.9, lineGap: 2.4, itemGap: 4.5 });
  drawBulletItem(doc, 'Autonomous Troubleshooting & Proactivity:', 'Proactive engineer skilled in identifying edge cases, tracing webhook logs, and troubleshooting integration breaks independently without hand-holding.', x, contentWidth, { fontSize: 8.9, lineGap: 2.4, itemGap: 4.5 });

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => resolve(outputPath));
  });
}

/**
 * =========================================================================
 * 2. 1-PAGE TAILORED RESUME (FOCUSED, HARMONIOUS, ZERO SQUISHING)
 * =========================================================================
 */
function generateOnePageResume(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 30, bottom: 30, left: 34, right: 34 },
    autoFirstPage: true,
    compress: false,
    info: {
      Title: 'Mahmoud Abd El-Ghaffar - Resume',
      Author: 'Mahmoud Abd El-Ghaffar',
      Subject: 'AI Automation Specialist Resume',
      Keywords: 'AI Automation Specialist, Make, Zapier, n8n, APIs, HubSpot, Airtable'
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const x = 34;
  const pageWidth = 595.28;
  const contentWidth = pageWidth - 68; // 527.28

  // Header
  doc.fillColor(COLORS.heading).fontSize(20).font('Helvetica-Bold').text('MAHMOUD ABD EL-GHAFFAR', x, 30);
  doc.moveDown(0.12);
  doc.fillColor(COLORS.primary).fontSize(10.5).font('Helvetica-Bold').text('AI Automation Engineer & Systems Integration Specialist');
  doc.moveDown(0.08);
  doc.fillColor(COLORS.muted).fontSize(8.6).font('Helvetica-Bold').text('Make  |  Zapier  |  n8n  |  REST APIs  |  HubSpot & Airtable  |  Multi-Agent Workflows');
  doc.moveDown(0.22);

  // Contact line 1
  doc.fillColor(COLORS.body).fontSize(8.5).font('Helvetica').text('Location: Benha / Cairo, Egypt   •   Phone: ', x, doc.y, { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('+20 102 419 0741', { link: 'tel:+201024190741', underline: true, continued: true });
  doc.fillColor(COLORS.body).font('Helvetica').text('   •   Email: ', { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('mahmoudzanaty454@gmail.com', { link: 'mailto:mahmoudzanaty454@gmail.com', underline: true });

  // Contact line 2
  doc.moveDown(0.16);
  doc.fillColor(COLORS.body).fontSize(8.5).font('Helvetica').text('LinkedIn: ', x, doc.y, { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219', { link: 'https://www.linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219/', underline: true, continued: true });
  doc.fillColor(COLORS.muted).font('Helvetica').text('   •   Portfolio: ', { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('https://portfolio-mrt6.onrender.com/', { link: 'https://portfolio-mrt6.onrender.com/', underline: true });

  doc.moveDown(0.28);
  doc.strokeColor(COLORS.primary).lineWidth(1.2).moveTo(x, doc.y).lineTo(x + contentWidth, doc.y).stroke();
  doc.y += 4;

  // 1. Summary
  drawSectionHeader(doc, 'Professional Summary', x, contentWidth, 8, 5);
  doc.fillColor(COLORS.body).fontSize(8.8).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Automation Specialist with hands-on expertise building production workflows, multi-agent pipelines, and cloud integrations across Make, Zapier, n8n, and custom REST APIs. Built 30+ native integration nodes inside AI MicroMind and engineered 30+ business workflows connecting CRMs (HubSpot, Airtable), web forms, messaging platforms (Slack, Gmail, WhatsApp/WAPA), and databases. Known for systems thinking, proactive error handling, and explaining technical workflows in plain language to non-technical business clients. Comfortable working under strict NDA.',
    x, doc.y,
    { width: contentWidth, lineGap: 2.4 }
  );

  // 2. Core Skills
  drawSectionHeader(doc, 'Core Technical Competencies', x, contentWidth, 9, 5);
  const skills = [
    { title: 'Automation Platforms & APIs:', desc: 'Make (Integromat), Zapier, n8n, Webhooks, Cron Schedulers, REST APIs, OAuth2, Postman.' },
    { title: 'CRMs & Business Tools:', desc: 'HubSpot, Airtable, Gmail, Microsoft 365, Slack, Meta/WhatsApp (WAPA), Telegram, ClickUp, Typeform.' },
    { title: 'AI & Multi-Agent Frameworks:', desc: 'LangChain, LangGraph, Model Context Protocol (MCP), Pinecone Vector DB, OpenAI, LLM-to-SQL.' },
    { title: 'Systems Reliability & Delivery:', desc: 'Automated Error Handling, Fallback Triggers, Retry Logic, SOPs & Plain-Language Client Documentation.' },
    { title: 'Backend & Cloud Stack:', desc: 'Node.js, TypeScript, Python, Docker, AWS, DigitalOcean Linux VPS, Render, GitHub CI/CD.' }
  ];
  skills.forEach(s => drawBulletItem(doc, s.title, s.desc, x, contentWidth, { fontSize: 8.7, lineGap: 2.2, itemGap: 3.2 }));

  // 3. Experience
  drawSectionHeader(doc, 'Professional Experience', x, contentWidth, 9, 5);
  drawRoleHeader(doc, 'AI & Automation Engineer', 'AI MicroMind', '2024 – Present', x, contentWidth, 9.6);
  const expMicroMind = [
    { title: 'Core Integration Nodes:', desc: 'Built 30+ native integration nodes inside AI MicroMind Core (Node.js) for WAPA, Telegram, Gmail, Pinecone, Webhooks, Schedulers, and PostgreSQL Audit Loggers using AI tools (Antigravity, Claude Code).' },
    { title: 'Business Workflows:', desc: 'Designed multi-step automations across Zapier, Make, and n8n connecting CRMs (HubSpot, Airtable), web forms, and messaging apps, eliminating manual data entry.' },
    { title: 'Report Bot & BI:', desc: 'Architected the AI MicroMind Report Bot Framework, enabling non-technical users to query on-premise ERPs (Oracle, SAP, Dynamics 365, Odoo) and SQL databases via plain language.' },
    { title: 'Error Handling & Reliability:', desc: 'Implemented robust fallback triggers, alert notifications, and webhook retry mechanisms, ensuring zero data loss and 99.9% uptime.' },
    { title: 'Client SOPs & Handover:', desc: 'Authored visual workflow diagrams and plain-language documentation to train and onboard non-technical business clients.' }
  ];
  expMicroMind.forEach(b => drawBulletItem(doc, b.title, b.desc, x, contentWidth, { fontSize: 8.6, lineGap: 2.2, itemGap: 3.5 }));

  drawRoleHeader(doc, 'Automation Engineer', 'Operatives (IT Services)', 'Jun 2021 – Jan 2022', x, contentWidth, 9.2);
  drawBulletItem(doc, 'Workflow Automation:', 'Engineered cross-departmental automated synchronization pipelines, eliminating manual bottlenecks and cutting data errors by 70%.', x, contentWidth, { fontSize: 8.6, lineGap: 2.2, itemGap: 3.5 });

  drawRoleHeader(doc, 'Operation Engineer & Admin', 'Operatives (IT Services)', 'Jan 2020 – Jun 2021', x, contentWidth, 9.2);
  drawBulletItem(doc, 'Operations & SLA Compliance:', 'Administered IT operations, monitored automated workflow execution logs, and enforced strict SLA compliance.', x, contentWidth, { fontSize: 8.6, lineGap: 2.2, itemGap: 4 });

  // 4. Projects
  drawSectionHeader(doc, 'Key Technical Architecture Projects', x, contentWidth, 9, 5);
  const projects = [
    { title: 'AI MicroMind App & Report Bot Framework:', desc: 'Natural language to SQL/OData reporting engine across Oracle ERP, SAP, Dynamics 365, and SQL databases.' },
    { title: 'End-to-End Business Automation Pipelines:', desc: 'Automations across Make, Zapier, and n8n connecting forms, HubSpot/Airtable, email sequences, and Slack.' },
    { title: 'Core Node Architecture (30+ Native Nodes):', desc: 'Custom Node.js native nodes extending platform capabilities for WhatsApp, Telegram, Gmail, and MCP.' },
    { title: 'Cloud DevOps & Multi-Agent Graphs:', desc: 'Dockerized multi-agent LangChain/LangGraph pipelines deployed on AWS, DigitalOcean VPS, and Render.' }
  ];
  projects.forEach(p => drawBulletItem(doc, p.title, p.desc, x, contentWidth, { fontSize: 8.6, lineGap: 2.2, itemGap: 3.2 }));

  // 5. Education
  drawSectionHeader(doc, 'Education', x, contentWidth, 9, 5);
  drawRoleHeader(doc, 'B.Sc. in Computer Engineering', 'Faculty of Engineering Shoubra, Benha University', 'Egypt', x, contentWidth, 9.2);

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => resolve(outputPath));
  });
}

// Generate both
const portfolioPdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');
const cvPdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_CV.pdf');

(async () => {
  await generateTwoPageCV(cvPdfPath);
  console.log(`Generated 2-Page CV: ${cvPdfPath}`);
  await generateOnePageResume(portfolioPdfPath);
  console.log(`Generated 1-Page Resume: ${portfolioPdfPath}`);
})();
