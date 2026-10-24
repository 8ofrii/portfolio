const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Design Color Palette (Executive Computer Engineer & Web Specialist)
const COLORS = {
  primary: '#0284c7',       // Electric Brand Blue for Links, Badges & Accents
  primaryDark: '#0369a1',   // Darker Blue
  heading: '#0f172a',       // Deep Slate for Headings & Titles
  body: '#334155',          // Readable Charcoal Slate for Body Text
  muted: '#475569',         // Slate for Dates & Metadata
  borderDark: '#cbd5e1',    // Stronger Divider Line
  tagBg: '#f1f5f9'          // Light Background for Badges
};

/**
 * Draw a vector bullet dot (guaranteed clean across all PDF viewers)
 */
function drawBulletDot(doc, x, y, radius = 2.2, color = COLORS.primary) {
  doc.save();
  doc.circle(x, y, radius).fill(color);
  doc.restore();
}

/**
 * Draw section header with an elegant divider line and controlled spacing
 */
function drawSectionHeader(doc, title, x, width, topPadding = 11, bottomPadding = 6) {
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
 * 1. 2-PAGE COMPREHENSIVE MIX CV (COMPUTER ENGINEER + WEB DESIGN + AUTOMATION)
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
      Subject: 'Computer Engineer | AI Automation & Web Development Specialist CV',
      Keywords: 'Computer Engineer, AI Automation Specialist, Website Designer, Make, Zapier, n8n, Render, Smile Inn, FOE Procurement Portal'
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
  doc.fillColor(COLORS.primary).fontSize(11).font('Helvetica-Bold').text('Computer Engineer  |  AI Automation & Web Development Specialist');
  doc.moveDown(0.08);
  doc.fillColor(COLORS.muted).fontSize(8.8).font('Helvetica-Bold').text('Website Design & UI/UX  |  AI-Assisted Workflows  |  Make, Zapier & n8n  |  Live Render Deployments  |  APIs & CRMs');
  doc.moveDown(0.24);

  // Contact line 1
  doc.fillColor(COLORS.body).fontSize(8.8).font('Helvetica').text('Location: Benha / Cairo, Egypt   •   WhatsApp / Phone: ', x, doc.y, { continued: true });
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
  drawSectionHeader(doc, 'Professional Summary', x, contentWidth, 9, 5);
  doc.fillColor(COLORS.body).fontSize(9.1).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Automation Specialist combining deep expertise in full-stack website design and development with robust systems integration. Experienced in designing visually compelling, mobile-first websites and web portals utilizing modern AI design workflows (Google Antigravity, Claude Code, rapid UI prototyping) to accelerate delivery. Proven portfolio of live concept web design mockups and interactive prototypes deployed on Render (including dental clinic mockups like Smile Inn, sovereign institutional portal concepts like FOE Procurement Portal, task assistant apps, and personal portfolio). Co-built 30+ native integration nodes and automated 30+ production pipelines connecting CRMs (HubSpot, GoHighLevel, Airtable), forms (Typeform, Tally, Fillout), messaging platforms (WhatsApp Cloud API/WAPA, Instagram, Telegram), and databases. Comfortable working under strict NDA and proprietary data standards.',
    x, doc.y,
    { width: contentWidth, lineGap: 2.8 }
  );

  // 2. Core Technical Competencies
  drawSectionHeader(doc, 'Core Technical Competencies', x, contentWidth, 11, 6);
  const skills = [
    { title: 'Website Design & Front-End UI/UX:', desc: 'Responsive Web Design (Mobile/Tablet/Desktop), UI/UX Layouts, Visual Hierarchy, Modern CSS3 (Grid, Flexbox, Animations), HTML5, JavaScript (ES6+), React / Vite, Glassmorphism.' },
    { title: 'AI-Powered Design & Engineering Workflows:', desc: 'Google Antigravity, Claude Code, AI wireframing, prompt-to-UI component generation, rapid design iteration, asset optimization, design-to-code translation.' },
    { title: 'Automation Platforms & Orchestration:', desc: 'Make (Integromat), Zapier, n8n, AI MicroMind (30+ Native Core Nodes), Webhooks, Cron Schedulers, REST APIs, OAuth2.' },
    { title: 'Social & Messaging Automation:', desc: 'Meta WhatsApp Cloud API & WAPA, Instagram DM & Comment Funnels, Facebook Messenger Bots, Telegram Bot API, Slack, Gmail, ClickUp.' },
    { title: 'AI & Multi-Agent Frameworks:', desc: 'LangChain (Expert), LangGraph (Advanced), Model Context Protocol (MCP), Pinecone Vector DB, OpenAI Assistants, Vapi Voice AI.' },
    { title: 'Cloud Infrastructure & Full-Stack:', desc: 'Node.js, TypeScript, Python, Render Web Services, Docker, AWS, DigitalOcean Linux VPS, PostgreSQL, SQL Server, GitHub CI/CD.' }
  ];
  skills.forEach(s => drawBulletItem(doc, s.title, s.desc, x, contentWidth, { fontSize: 8.8, lineGap: 2.5, itemGap: 4.2 }));

  // 3. Professional Experience (AI MicroMind on Page 1)
  drawSectionHeader(doc, 'Professional Experience', x, contentWidth, 11, 6);
  drawRoleHeader(doc, 'AI, Web & Automation Engineer', 'AI MicroMind', '2024 – Present', x, contentWidth, 10);

  const expMicroMind = [
    { title: 'AI-Assisted Web Design & UI Development:', desc: 'Designed and built responsive web applications, micro-apps, and custom UI components utilizing modern AI developer tools (Google Antigravity, Claude Code), accelerating prototyping, styling, and live deployment.' },
    { title: 'Native Integration Nodes:', desc: 'Built and co-built 30+ native integration nodes directly inside AI MicroMind Core (Node.js runtime) for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP Client, Pinecone, Webhooks, Schedulers, and PostgreSQL Audit Loggers using AI coding tools.' },
    { title: 'Multi-Step Business Automations:', desc: 'Designed automated workflows across Zapier, Make, and n8n connecting CRMs (HubSpot, GoHighLevel, Airtable), web forms (Typeform, Tally, Fillout), and social channels (WhatsApp, Instagram, Telegram), eliminating manual data entry.' },
    { title: 'Conversational BI & Report Bot Framework:', desc: 'Architected the AI MicroMind App featuring the Report Bot Framework, enabling non-technical users to query on-premise ERPs (Oracle, SAP, Microsoft Dynamics, Odoo, SQL) and cloud databases via natural language.' },
    { title: 'Proactive Error Handling & 99.9% Uptime:', desc: 'Implemented robust fallback triggers, alert notifications, and webhook retry mechanisms, ensuring zero data loss and fault-tolerant production execution.' },
    { title: 'Multi-Agent Graphs & MCP:', desc: 'Constructed stateful multi-agent graph workflows using LangChain and LangGraph with Model Context Protocol (MCP) server dispatchers for secure backend script execution.' }
  ];
  expMicroMind.forEach(b => drawBulletItem(doc, b.title, b.desc, x, contentWidth, { fontSize: 8.8, lineGap: 2.5, itemGap: 4.5 }));

  // ---------------- PAGE 2 ----------------
  doc.addPage();

  // Page 2 Header Running Banner
  doc.fillColor(COLORS.muted).fontSize(8.8).font('Helvetica-Bold').text('MAHMOUD ABD EL-GHAFFAR', x, 32, { continued: true });
  doc.font('Helvetica').text('   |   Computer Engineer — AI Automation & Web Specialist   |   mahmoudzanaty454@gmail.com', { continued: true });
  doc.text('Page 2 of 2', { width: contentWidth, align: 'right' });
  doc.strokeColor(COLORS.borderDark).lineWidth(0.6).moveTo(x, 46).lineTo(x + contentWidth, 46).stroke();
  doc.y = 54;

  // Prior Experience continued
  drawSectionHeader(doc, 'Professional Experience (Continued)', x, contentWidth, 5, 7);
  
  drawRoleHeader(doc, 'Front-End & Automation Engineer', 'Operatives (IT Services)', 'Jun 2021 – Jan 2022', x, contentWidth, 9.8);
  drawBulletItem(doc, 'Web Portals & Workflow Synchronization:', 'Developed internal web portal interfaces, automated dashboards, and data synchronization pipelines, eliminating repetitive manual bottlenecks and reducing data-entry errors by over 70%.', x, contentWidth, { fontSize: 8.8, lineGap: 2.4, itemGap: 4 });
  drawBulletItem(doc, 'Integration Reliability:', 'Maintained multi-system integrations across internal service catalogs, ticketing systems, and database stores with automated error logging and alerting.', x, contentWidth, { fontSize: 8.8, lineGap: 2.4, itemGap: 5 });

  drawRoleHeader(doc, 'Operation Engineer & Admin', 'Operatives (IT Services)', 'Jan 2020 – Jun 2021', x, contentWidth, 9.8);
  drawBulletItem(doc, 'IT Infrastructure & Operations:', 'Administered IT infrastructure operations, monitored workflow execution logs, enforced strict SLA compliance, and resolved technical service tickets with prompt escalation and root-cause analysis.', x, contentWidth, { fontSize: 8.8, lineGap: 2.4, itemGap: 4 });
  drawBulletItem(doc, 'System Health & Maintenance:', 'Conducted regular preventative maintenance, scheduled automated backup routines, and drafted operational runbooks for technical staff.', x, contentWidth, { fontSize: 8.8, lineGap: 2.4, itemGap: 6 });

  // 4. Featured Projects (The Mix: Web Design on Render + Systems Automation)
  drawSectionHeader(doc, 'Key Technical Architecture Projects', x, contentWidth, 9, 6);
  const projects = [
    { title: 'Smile Inn Dental Clinic Website (Live Concept Mockup — Render):', desc: 'Designed a modern, responsive clinic website concept mockup featuring calming color psychology, interactive before/after treatment sliders, doctor profiles, and appointment booking funnels.' },
    { title: 'FOE Sovereign Procurement Directorate Portal (Concept Prototype — Render):', desc: 'Conceptual digital web portal and dashboard mockup designed for sovereign procurement operations with executive branding, responsive data tables, multi-role navigation, and bilingual Arabic/English layout.' },
    { title: 'Omnichannel Social & Messaging Automation:', desc: 'Multi-platform social funnels connecting WhatsApp Cloud API / WAPA, Instagram DM comment-to-lead triggers, Facebook Messenger support bots, and Telegram channels with HubSpot & GoHighLevel.' },
    { title: 'Advanced Forms & Lead Capture Pipelines:', desc: 'Multi-step conditional form routing across Typeform, Tally, Fillout, and Jotform with automated data enrichment, calendar booking, and instant Slack/WhatsApp sales alerts.' },
    { title: 'AI MicroMind App & Report Bot Framework:', desc: 'Conversational BI reporting engine translating natural language prompts into live SQL/OData queries across Oracle, SAP, Dynamics 365, Odoo, and SQL databases.' },
    { title: 'Smart Task Assistant & Merna Invitation Web Apps (Live Prototypes — Render):', desc: 'AI-powered task management app prototype with sleek dark-mode glassmorphism alongside a bespoke mobile-first animated digital invitation web mockup.' }
  ];
  projects.forEach(p => drawBulletItem(doc, p.title, p.desc, x, contentWidth, { fontSize: 8.8, lineGap: 2.4, itemGap: 4.5 }));

  // 5. Education
  drawSectionHeader(doc, 'Education', x, contentWidth, 9, 6);
  drawRoleHeader(doc, 'B.Sc. in Computer Engineering', 'Faculty of Engineering Shoubra, Benha University', 'Benha, Egypt', x, contentWidth, 9.8);
  drawBulletItem(doc, 'Specialization:', 'Computer Systems Architecture, Database Management Systems, Software Engineering, Web Technologies & AI Systems.', x, contentWidth, { fontSize: 8.8, lineGap: 2.3, itemGap: 6 });

  // 6. Professional Standards & Working Style
  drawSectionHeader(doc, 'Professional Standards & Working Style', x, contentWidth, 9, 6);
  drawBulletItem(doc, 'Full-Cycle Web & Automation Delivery:', 'Capable of taking a digital product from concept, wireframe, and visual styling to responsive code, cloud deployment on Render, and automated backend integrations.', x, contentWidth, { fontSize: 8.8, lineGap: 2.3, itemGap: 4 });
  drawBulletItem(doc, 'AI-Enhanced Speed & Quality:', 'Utilizes AI tools as a force multiplier to accelerate design iterations, optimize assets, and deliver production-ready assets with high fidelity.', x, contentWidth, { fontSize: 8.8, lineGap: 2.3, itemGap: 4 });
  drawBulletItem(doc, 'Autonomous Remote Execution & NDA:', 'Self-driven remote professional who communicates clearly in plain language, solves breaks independently, and strictly respects client confidentiality (NDA).', x, contentWidth, { fontSize: 8.8, lineGap: 2.3, itemGap: 4 });

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => resolve(outputPath));
  });
}

/**
 * =========================================================================
 * 2. 1-PAGE TAILORED MIX RESUME (FOCUSED, HARMONIOUS, ZERO SQUISHING)
 * =========================================================================
 */
function generateOnePageResume(outputPath) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 28, bottom: 28, left: 34, right: 34 },
    autoFirstPage: true,
    compress: false,
    info: {
      Title: 'Mahmoud Abd El-Ghaffar - Resume',
      Author: 'Mahmoud Abd El-Ghaffar',
      Subject: 'Computer Engineer | AI Automation & Web Development Resume',
      Keywords: 'Computer Engineer, AI Automation Specialist, Website Designer, Make, Zapier, n8n, Render, Smile Inn, FOE Procurement Portal'
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const x = 34;
  const pageWidth = 595.28;
  const contentWidth = pageWidth - 68; // 527.28

  // Header
  doc.fillColor(COLORS.heading).fontSize(19.5).font('Helvetica-Bold').text('MAHMOUD ABD EL-GHAFFAR', x, 28);
  doc.moveDown(0.12);
  doc.fillColor(COLORS.primary).fontSize(10.2).font('Helvetica-Bold').text('Computer Engineer  |  AI Automation & Web Development Specialist');
  doc.moveDown(0.08);
  doc.fillColor(COLORS.muted).fontSize(8.4).font('Helvetica-Bold').text('Website Design & UI/UX  |  AI-Assisted Workflows  |  Make, Zapier & n8n  |  Render Deployments  |  APIs & CRMs');
  doc.moveDown(0.2);

  // Contact line 1
  doc.fillColor(COLORS.body).fontSize(8.4).font('Helvetica').text('Location: Benha / Cairo, Egypt   •   WhatsApp / Phone: ', x, doc.y, { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('+20 102 419 0741', { link: 'tel:+201024190741', underline: true, continued: true });
  doc.fillColor(COLORS.body).font('Helvetica').text('   •   Email: ', { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('mahmoudzanaty454@gmail.com', { link: 'mailto:mahmoudzanaty454@gmail.com', underline: true });

  // Contact line 2
  doc.moveDown(0.15);
  doc.fillColor(COLORS.body).fontSize(8.4).font('Helvetica').text('LinkedIn: ', x, doc.y, { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219', { link: 'https://www.linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219/', underline: true, continued: true });
  doc.fillColor(COLORS.muted).font('Helvetica').text('   •   Live Portfolio: ', { continued: true });
  doc.fillColor(COLORS.primary).font('Helvetica-Bold').text('https://portfolio-mrt6.onrender.com/', { link: 'https://portfolio-mrt6.onrender.com/', underline: true });

  doc.moveDown(0.25);
  doc.strokeColor(COLORS.primary).lineWidth(1.2).moveTo(x, doc.y).lineTo(x + contentWidth, doc.y).stroke();
  doc.y += 3.5;

  // 1. Summary
  drawSectionHeader(doc, 'Professional Summary', x, contentWidth, 7, 4);
  doc.fillColor(COLORS.body).fontSize(8.6).font('Helvetica').text(
    'Accomplished Computer Engineer and AI Automation Specialist combining hands-on expertise in full-stack website design and development with advanced systems integration. Experienced in designing visually compelling, mobile-first websites and web portals utilizing modern AI design workflows (Google Antigravity, Claude Code, rapid UI prototyping) alongside production business automations (Make, Zapier, n8n, CRMs, WhatsApp/Social funnels). Proven portfolio of live concept web design mockups and interactive prototypes deployed on Render (Smile Inn, FOE Procurement Portal, task assistant apps, and personal portfolio). Comfortable working under strict NDA.',
    x, doc.y,
    { width: contentWidth, lineGap: 2.2 }
  );

  // 2. Core Skills
  drawSectionHeader(doc, 'Core Technical Competencies', x, contentWidth, 8, 4);
  const skills = [
    { title: 'Website Design & Front-End UI/UX:', desc: 'Responsive Design (Mobile-First), HTML5, Modern CSS3 (Grid/Flexbox/Animations), JavaScript (ES6+), React/Vite, Glassmorphism.' },
    { title: 'AI-Powered Design & Dev Workflows:', desc: 'Google Antigravity, Claude Code, AI wireframing, prompt-to-UI component generation, rapid design iteration, asset optimization.' },
    { title: 'Automation Platforms & Orchestration:', desc: 'Make (Integromat), Zapier, n8n, AI MicroMind (30+ Native Core Nodes), Webhooks, Cron Schedulers, REST APIs, OAuth2.' },
    { title: 'Social & Forms Lead Capture:', desc: 'WhatsApp Cloud API / WAPA, Instagram DM Funnels, Messenger Bots, Telegram Bot API, Typeform, Tally, Fillout, HubSpot, GHL, Airtable.' },
    { title: 'Cloud Infrastructure & Full-Stack:', desc: 'Node.js, Python, Docker, AWS, DigitalOcean VPS, Render Web Services, PostgreSQL, SQL Server, GitHub CI/CD, Strict NDA.' }
  ];
  skills.forEach(s => drawBulletItem(doc, s.title, s.desc, x, contentWidth, { fontSize: 8.5, lineGap: 2.1, itemGap: 3.0 }));

  // 3. Featured Render Projects & Workflows
  drawSectionHeader(doc, 'Key Technical Architecture Projects', x, contentWidth, 8, 4);
  const projects = [
    { title: 'Smile Inn Clinic Website (Live Concept Mockup — Render):', desc: 'Designed modern dental clinic concept mockup with calming aesthetics, before/after interactive sliders, doctor profiles, and booking funnels.' },
    { title: 'FOE Sovereign Procurement Portal (Concept Prototype — Render):', desc: 'Conceptual portal mockup for Future of Egypt Directorate with sovereign branding, responsive tables, and bilingual Arabic/English layout.' },
    { title: 'Omnichannel Social & Messaging Automation:', desc: 'Lead funnels across WhatsApp (WAPA), Instagram DMs, Messenger, and Telegram synced to HubSpot & GoHighLevel.' },
    { title: 'Advanced Forms & Lead Capture Pipelines:', desc: 'Multi-step conditional forms (Typeform, Tally, Fillout) with instant validation, CRM enrichment, and Slack alerts.' },
    { title: 'AI MicroMind App & Report Bot Framework:', desc: 'Conversational BI reporting engine translating natural language prompts into live SQL/OData queries across ERPs and SQL databases.' }
  ];
  projects.forEach(p => drawBulletItem(doc, p.title, p.desc, x, contentWidth, { fontSize: 8.5, lineGap: 2.1, itemGap: 3.0 }));

  // 4. Experience
  drawSectionHeader(doc, 'Professional Experience', x, contentWidth, 8, 4);
  drawRoleHeader(doc, 'AI, Web & Automation Engineer', 'AI MicroMind', '2024 – Present', x, contentWidth, 9.4);
  const expMicroMind = [
    { title: 'AI-Assisted Web Design & UI:', desc: 'Built responsive web applications, micro-apps, and custom UI components utilizing modern AI developer tools (Google Antigravity, Claude Code).' },
    { title: 'Native Integration Nodes:', desc: 'Built 30+ native integration nodes inside AI MicroMind Core for WhatsApp/WAPA, Telegram, Gmail, Pinecone, Webhooks, and Schedulers.' },
    { title: 'Social & Business Funnels:', desc: 'Designed multi-step automations across Zapier, Make, and n8n connecting social channels, forms, and CRMs (HubSpot, GoHighLevel).' }
  ];
  expMicroMind.forEach(b => drawBulletItem(doc, b.title, b.desc, x, contentWidth, { fontSize: 8.5, lineGap: 2.1, itemGap: 3.2 }));

  drawRoleHeader(doc, 'Front-End & Automation Engineer', 'Operatives (IT Services)', 'Jun 2021 – Jan 2022', x, contentWidth, 9.1);
  drawBulletItem(doc, 'Web Portals & Workflows:', 'Developed internal web portal interfaces and automated synchronization pipelines, cutting data errors by 70%.', x, contentWidth, { fontSize: 8.5, lineGap: 2.1, itemGap: 3.2 });

  // 5. Education
  drawSectionHeader(doc, 'Education', x, contentWidth, 8, 4);
  drawRoleHeader(doc, 'B.Sc. in Computer Engineering', 'Faculty of Engineering Shoubra, Benha University', 'Egypt', x, contentWidth, 9.1);

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
  console.log(`Generated Mix 2-Page CV: ${cvPdfPath}`);
  await generateOnePageResume(portfolioPdfPath);
  console.log(`Generated Mix 1-Page Resume: ${portfolioPdfPath}`);
})();
