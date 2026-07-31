/* ==========================================================================
   Mahmoud Abd El-Ghaffar Portfolio - Interactive JavaScript Engine
   Features: Theme Switcher, Heavy CV Renderer, Scroll Reveal, Canvas Physics
   ========================================================================== */

// 1. Projects Data (+30 Total Workflows Highlight Matrix)
const projectsData = [
  {
    id: "nodes-mcp-1",
    category: "nodes-mcp",
    title: "Self-Developed Flowise Communication Nodes",
    subtitle: "Native integrations for WhatsApp, Telegram, Gmail, & Weather",
    icon: "fa-brands fa-whatsapp",
    summary: "Built native Flowise nodes for WhatsApp, Telegram, Gmail, and Weather using AI coding tools (Antigravity, Claude Code) to enable direct message alerts without third-party platform limitations.",
    tech: ["Flowise AI", "Antigravity", "Claude Code", "WhatsApp API", "Telegram API", "Gmail API"],
    details: {
      overview: "Standard low-code tools rely on complex webhook wrappers. I engineered native custom nodes directly within Flowise node architecture for WhatsApp, Telegram, Gmail, and Weather API using AI coding assistants.",
      architecture: [
        "Built custom Node.js node handlers using Antigravity and Claude Code.",
        "Integrated native parameters directly into Flowise canvas UI.",
        "Built-in credential management and direct webhook handling."
      ],
      impact: "Streamlined team coordination, automated customer outreach, and reduced messaging latency with 100% platform control."
    }
  },
  {
    id: "nodes-mcp-2",
    category: "nodes-mcp",
    title: "MCP Agent with Claude",
    subtitle: "Model Context Protocol Node.js execution inside Flowise",
    icon: "fa-solid fa-robot",
    summary: "Integrated Model Context Protocol (MCP) to let operations teams trigger backend tasks using natural language via Claude, securely executing scripts.",
    tech: ["MCP Server", "Anthropic Claude", "Antigravity", "Flowise AI", "Task Automation"],
    details: {
      overview: "Unlocks backend script automation from inside conversational AI assistants. Operations teams type natural language requests; Claude interprets intent and invokes local Node.js script execution via MCP.",
      architecture: [
        "MCP Client node embedded in Flowise flow.",
        "Secure script execution sandbox for backend tasks.",
        "Claude 3.5 Sonnet prompt interpretation layer."
      ],
      impact: "Eliminates manual terminal commands for non-technical operations staff while maintaining security sandboxing."
    }
  },
  {
    id: "ai-agents-1",
    category: "ai-agents",
    title: "Field Sales Dashboard Agent",
    subtitle: "Natural Language SQL Queries over PostgreSQL",
    icon: "fa-solid fa-chart-line",
    summary: "Sales managers instantly retrieve van-level data, targets, and product KPIs using natural language. Generates and validates secure SQL queries automatically.",
    tech: ["PostgreSQL", "OpenAI / Gemini", "LLM-to-SQL", "Data Visualization", "Flowise"],
    details: {
      overview: "Field sales leads needed instant access to van performance, inventory, and target KPIs without relying on database engineers.",
      architecture: [
        "Natural language prompt parser to SQL schema mapping.",
        "PostgreSQL query validation and execution layer.",
        "Rich markdown response renderer with optional chart visualization."
      ],
      impact: "Removed analyst dependencies and provided real-time field sales metrics on-demand."
    }
  },
  {
    id: "ai-agents-2",
    category: "ai-agents",
    title: "Site Engineer Assistant",
    subtitle: "On-Site Natural Language Construction Data Retrieval",
    icon: "fa-solid fa-helmet-safety",
    summary: "Enables site engineers to access live PostgreSQL project databases using natural language. Validates queries and returns contextualized findings via OpenAI or Gemini.",
    tech: ["PostgreSQL", "Gemini 2.0 Flash", "OpenAI", "Antigravity / VS Code", "Flowise"],
    details: {
      overview: "Engineered a dedicated assistant for on-site construction managers to check material status, timelines, and structural specs without DB expertise.",
      architecture: [
        "Custom JS Function node defining DB connection pool.",
        "Sequential model chain evaluating user queries.",
        "PostgreSQL schema validation safeguards."
      ],
      impact: "Dramatically reduced field decision turnaround time by putting live DB answers in field engineers' hands."
    }
  },
  {
    id: "ai-agents-3",
    category: "ai-agents",
    title: "AI Customer Assistant for Retail",
    subtitle: "Product inquiries, eligibility checks & lead capture",
    icon: "fa-solid fa-store",
    summary: "Automated customer support workflow combining PostgreSQL database queries, Pinecone vector document search, installment plan eligibility checks, and HubSpot CRM logging.",
    tech: ["Pinecone Vector DB", "PostgreSQL", "HubSpot CRM", "Gmail API", "OpenAI"],
    details: {
      overview: "Comprehensive support workflow that handles product specs, installment plan qualification, lead capture, and automated follow-up emails.",
      architecture: [
        "Pinecone vector store for store policies, product catalogs, and FAQ.",
        "PostgreSQL database node for live inventory management.",
        "HubSpot CRM tool integration for lead assignment."
      ],
      impact: "Reduced customer support wait time while improving lead conversion efficiency."
    }
  },
  {
    id: "ai-agents-4",
    category: "ai-agents",
    title: "Real Estate Sales Assistant",
    subtitle: "Interactive Property Exploration & Tailored Funnel",
    icon: "fa-solid fa-building",
    summary: "Interactive real estate funnel allowing clients to explore compound listings via rich media, ask detailed questions, and receive personalized recommendations logged to HubSpot CRM.",
    tech: ["HubSpot CRM", "Flowise Agent", "Pinecone Vector Store", "Gmail Follow-up"],
    details: {
      overview: "Allows potential home buyers to inspect flats and compounds through media links, receive instant price quotes, and schedule viewings.",
      architecture: [
        "Pinecone vector database indexing real estate catalog & specs.",
        "Condition nodes evaluating user budget & location preference.",
        "Automated email quote generation and CRM contact creation."
      ],
      impact: "Automated top-of-funnel lead qualification for real estate sales agents."
    }
  },
  {
    id: "ai-agents-5",
    category: "ai-agents",
    title: "Pinecone Vector RAG Agent",
    subtitle: "High-Speed Pinecone Vector Store & Embeddings Intelligence",
    icon: "fa-solid fa-brain",
    summary: "Enterprise RAG pipeline utilizing Pinecone vector databases and OpenAI embeddings to index document collections and answer business queries with high precision.",
    tech: ["Pinecone Vector DB", "OpenAI Embeddings", "Vector Search", "RAG Pipeline"],
    details: {
      overview: "Indexes large enterprise documentation and knowledge bases into Pinecone vector databases for instant semantic search and Q&A.",
      architecture: [
        "Document ingestion and chunking pipeline.",
        "Pinecone Vector Database indexing embeddings.",
        "Conversational Retrieval QA chain with context verification."
      ],
      impact: "Delivers rapid, verifiable answers from complex enterprise knowledge bases."
    }
  },
  {
    id: "n8n-1",
    category: "n8n",
    title: "n8n AI News Publisher Bot",
    subtitle: "Automated NewsAPI -> Google Sheets -> Facebook Pipeline",
    icon: "fa-solid fa-newspaper",
    summary: "Daily automated bot fetching AI headlines from NewsAPI, curating top stories, logging them into Google Sheets, and publishing posts directly to Facebook.",
    tech: ["n8n", "NewsAPI", "Google Sheets", "Facebook Graph API", "Schedule Trigger"],
    details: {
      overview: "Automated social media curation pipeline running on scheduled cron triggers to keep brand channels updated.",
      architecture: [
        "Schedule trigger running daily at designated times.",
        "HTTP Request node querying NewsAPI endpoints.",
        "Code node filtering and formatting post content.",
        "Google Sheets & Facebook Graph API posting nodes."
      ],
      impact: "Eliminated manual content planning and posting effort for marketing teams."
    }
  },
  {
    id: "n8n-2",
    category: "n8n",
    title: "n8n RSS Feed Aggregator to Airtable",
    subtitle: "Multi-source RSS feed curation and filtering",
    icon: "fa-solid fa-rss",
    summary: "Merges and filters multiple RSS news sources into a daily curated Airtable database for newsletters or content marketing dashboards.",
    tech: ["n8n", "RSS Feed Parser", "Date Transform", "Airtable API"],
    details: {
      overview: "Collects articles from tech blogs and industry feeds, transforms published dates, filters stories older than 7 days, and sorts into Airtable.",
      architecture: [
        "Multiple RSS Read nodes merging into unified array.",
        "Date transform and filter nodes.",
        "Airtable record creation node."
      ],
      impact: "Ensures stakeholders receive curated daily digest feeds effortlessly."
    }
  },
  {
    id: "n8n-3",
    category: "n8n",
    title: "Chat-Triggered Trello Task Creator",
    subtitle: "Conversational AI to Trello Project Management",
    icon: "fa-solid fa-trello",
    summary: "Interprets chat messages using OpenAI models and automatically generates structured Trello cards with context stored for project managers.",
    tech: ["n8n", "OpenAI Chat Model", "Trello API", "Simple Memory"],
    details: {
      overview: "Converts casual team chat discussions into actionable project cards without leaving the chat app.",
      architecture: [
        "Chat webhook trigger capturing incoming message.",
        "OpenAI Tools Agent extracting task title, description, and priority.",
        "Trello card creation tool execution."
      ],
      impact: "Prevents action items from being lost in team chat threads."
    }
  },
  {
    id: "infra-1",
    category: "infra",
    title: "PostgreSQL Agent Logger & Observability Suite",
    subtitle: "Full auditability, node inputs/outputs, & trace monitoring",
    icon: "fa-solid fa-database",
    summary: "Logs every node input, output, tool call, and prompt into a PostgreSQL database table. Integrated with LangSmith for complete trace monitoring and rate-limiting security.",
    tech: ["PostgreSQL", "LangSmith", "Whisper Voice", "Audit Logging"],
    details: {
      overview: "Enterprise-grade observability suite ensuring transparency, security rate-limiting, and detailed prompt audit logs across agent runs.",
      architecture: [
        "PostgreSQL checkpoint logging table storing JSON thread execution.",
        "LangSmith trace telemetry integration.",
        "Rate limiting and domain control policies."
      ],
      impact: "Provides full debugging clarity and enterprise compliance for deployed AI agents."
    }
  }
];

// 2. Render Projects Grid
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card reveal active';
    card.innerHTML = `
      <div>
        <div class="card-header-top">
          <span class="card-category-badge">${getCategoryName(project.category)}</span>
          <div class="card-icon"><i class="${project.icon}"></i></div>
        </div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
      </div>
      <div>
        <div class="card-tech-stack">
          ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
        <div class="card-footer">
          <span class="card-link" onclick="openProjectModal('${project.id}')">
            View Architecture <i class="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function getCategoryName(cat) {
  switch(cat) {
    case 'nodes-mcp': return 'Custom Nodes & MCP';
    case 'ai-agents': return 'AI Agent & Pinecone';
    case 'n8n': return 'n8n Automation';
    case 'infra': return 'Infrastructure';
    default: return 'Project';
  }
}

function filterProjects(cat) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderProjects(cat);
}

// 3. Theme Toggle Engine (Dark / Light Mode)
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

// 4. Scroll Reveal Motion Observer
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

// 5. Modal Handlers
function openProjectModal(id) {
  const project = projectsData.find(p => p.id === id);
  if (!project) return;

  const detailsContainer = document.getElementById('modal-project-details');
  detailsContainer.innerHTML = `
    <span class="card-category-badge" style="margin-bottom: 12px; display: inline-block;">${getCategoryName(project.category)}</span>
    <h2 style="font-size: 2rem; margin-bottom: 8px;">${project.title}</h2>
    <p style="color: var(--primary-cyan); font-weight: 600; margin-bottom: 24px;">${project.subtitle}</p>
    
    <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 24px;">
      <h4 style="color: var(--text-main); margin-bottom: 8px;"><i class="fa-solid fa-circle-info"></i> Project Overview</h4>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${project.details.overview}</p>
    </div>

    <h4 style="color: var(--text-main); margin-bottom: 12px;"><i class="fa-solid fa-sitemap"></i> Key Architectural Features</h4>
    <ul style="padding-left: 20px; color: var(--text-muted); margin-bottom: 24px; font-size: 0.95rem;">
      ${project.details.architecture.map(item => `<li style="margin-bottom: 8px;">${item}</li>`).join('')}
    </ul>

    <div style="background: rgba(0, 242, 254, 0.08); border-left: 4px solid var(--primary-cyan); padding: 16px; border-radius: 8px; margin-bottom: 24px;">
      <strong style="color: var(--primary-cyan); display: block; margin-bottom: 4px;">Measurable Impact:</strong>
      <span style="color: var(--text-main); font-size: 0.95rem;">${project.details.impact}</span>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
    </div>
  `;

  document.getElementById('project-modal').classList.add('active');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
}

// 6. Heavy, Detailed CV Renderer Modal
function openResumeModal() {
  const resumeContainer = document.getElementById('resume-body-content');
  resumeContainer.innerHTML = `
    <div style="border-bottom: 2px solid var(--border-color); padding-bottom: 18px; margin-bottom: 24px;">
      <h1 style="font-size: 2.4rem; font-weight: 800; color: var(--text-main);">Mahmoud Abd El-Ghaffar (Mahmoud Zanaty)</h1>
      <p style="color: var(--primary-cyan); font-weight: 700; font-size: 1.15rem; margin-top: 4px;">
        AI Agent Architect & Workflow Automation Specialist | Flowise & n8n Engineer
      </p>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 6px;">
        📍 Benha / Cairo, Egypt | ✉️ mahmoudzanaty454@gmail.com | 💼 Available for Part-Time & Contract Roles
      </p>
    </div>

    <h2>Executive Summary</h2>
    <p style="color: var(--text-muted); font-size: 0.98rem; line-height: 1.7;">
      Accomplished <strong>Computer Engineer</strong> and <strong>AI Agent Architect</strong> with extensive hands-on experience designing, extending, and deploying autonomous AI agent networks, enterprise <strong>Pinecone</strong> RAG pipelines, and complex multi-platform automation systems. Engineered over <strong>30+ production workflows</strong> bridging enterprise tools (<strong>HubSpot, Lark, ClickUp, Trello, WhatsApp, Telegram, PostgreSQL</strong>) with cutting-edge LLMs (<strong>OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 2.0 Flash</strong>).
      <br><br>
      Distinguished by an AI-accelerated engineering methodology: utilizing state-of-the-art AI development environments (<strong>Google Antigravity, Claude Code, OpenAI Codex, VS Code</strong>) to rapidly extend low-code/no-code platforms (<strong>Flowise AI, n8n</strong>) beyond default boundaries. Proven capability in engineering native custom Node.js nodes, implementing Model Context Protocol (MCP) servers, constructing LLM-to-SQL database agents, building custom Webhooks and Schedulers, and embedding PostgreSQL execution loggers for full agent observability and enterprise compliance.
    </p>

    <h2>Core Technical Competencies</h2>
    <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; list-style: none; padding-left: 0; margin-bottom: 24px;">
      <li style="background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color);">
        ⚡ <strong>Workflow AI:</strong> Flowise AI (Custom Node Engine), n8n, MCP, Custom Webhooks, Schedulers (+30 Workflows)
      </li>
      <li style="background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color);">
        🤖 <strong>AI Coding Acceleration:</strong> Google Antigravity, Claude Code, OpenAI Codex, VS Code AI Suite
      </li>
      <li style="background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color);">
        🗄️ <strong>Databases & RAG:</strong> Pinecone Vector Database, PostgreSQL (LLM-to-SQL), PGVector, Embeddings
      </li>
      <li style="background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color);">
        🔌 <strong>Integrations:</strong> HubSpot CRM, Lark API, ClickUp API, Trello API, WhatsApp API, Telegram, Gmail
      </li>
    </ul>

    <h2>Technical Work Experience</h2>
    
    <div style="margin-bottom: 24px; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);">
      <h3 style="font-size: 1.3rem; font-weight: 700;">AI & Automation Engineer — <em>AI MicroMind</em></h3>
      <span style="color: var(--primary-cyan); font-weight: 600; font-size: 0.9rem;">Sep 2023 – Apr 2025</span>
      <ul style="margin-top: 10px; padding-left: 20px; color: var(--text-muted); font-size: 0.95rem;">
        <li style="margin-bottom: 8px;">Applied AI coding tools (<strong>Antigravity, Claude Code, Codex</strong>) within VS Code to extend Flowise AI and n8n platform capabilities, engineering custom native nodes, custom JS functions, webhooks, and schedulers.</li>
        <li style="margin-bottom: 8px;">Architected and deployed <strong>over 30+ production AI workflows</strong> serving retail, real estate, field engineering, operational management, and content publishing.</li>
        <li style="margin-bottom: 8px;">Engineered 4 native Flowise integration nodes for <strong>WhatsApp, Telegram, Gmail, and Weather API</strong>, removing third-party service dependencies and granting 100% platform-level control.</li>
        <li style="margin-bottom: 8px;">Implemented Model Context Protocol (MCP) agent nodes allowing operations teams to execute backend Node.js scripts dynamically via natural language prompts evaluated by Claude 3.5 Sonnet.</li>
        <li style="margin-bottom: 8px;">Engineered natural-language-to-SQL query agents over PostgreSQL project databases for Site Engineers & Field Sales Dashboard managers.</li>
        <li style="margin-bottom: 8px;">Built high-speed semantic document retrieval systems using <strong>Pinecone Vector Database</strong> and OpenAI Embeddings for enterprise RAG applications.</li>
        <li style="margin-bottom: 8px;">Constructed a full <strong>PostgreSQL Agent Logger</strong> capturing every node input, output, tool call, and prompt into a structured audit table. Integrated <strong>LangSmith</strong> telemetry.</li>
      </ul>
    </div>

    <div style="margin-bottom: 24px; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);">
      <h3 style="font-size: 1.3rem; font-weight: 700;">Automation Engineer — <em>Operatives (IT Services)</em></h3>
      <span style="color: var(--primary-cyan); font-weight: 600; font-size: 0.9rem;">Jun 2021 – Jan 2022</span>
      <ul style="margin-top: 10px; padding-left: 20px; color: var(--text-muted); font-size: 0.95rem;">
        <li>Analyzed cross-departmental operational cycles and engineered end-to-end automated workflows, eliminating manual data entry bottlenecks across IT operations teams.</li>
      </ul>
    </div>

    <div style="margin-bottom: 24px; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);">
      <h3 style="font-size: 1.3rem; font-weight: 700;">Operation Engineer & Admin — <em>Operatives (IT Services)</em></h3>
      <span style="color: var(--primary-cyan); font-weight: 600; font-size: 0.9rem;">Jan 2020 – Jun 2021</span>
      <ul style="margin-top: 10px; padding-left: 20px; color: var(--text-muted); font-size: 0.95rem;">
        <li>Managed IT infrastructure operations, monitored workflow execution logs, enforced SLA compliance, and administered operational tracking systems.</li>
      </ul>
    </div>

    <h2>Detailed Project Architecture Highlights</h2>
    <ol style="padding-left: 20px; color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
      <li style="margin-bottom: 6px;"><strong>Self-Developed Communication Nodes (Flowise):</strong> Native TypeScript/Node.js integration for WhatsApp, Telegram, Gmail, and Weather.</li>
      <li style="margin-bottom: 6px;"><strong>MCP Agent with Claude:</strong> Model Context Protocol node triggering local backend Node.js script execution via natural language.</li>
      <li style="margin-bottom: 6px;"><strong>Site Engineer Assistant:</strong> Secure LLM-to-SQL query generation over PostgreSQL construction databases.</li>
      <li style="margin-bottom: 6px;"><strong>Field Sales Dashboard Agent:</strong> Van-level performance & target KPI query engine with natural language output visualization.</li>
      <li style="margin-bottom: 6px;"><strong>Pinecone Enterprise RAG Agent:</strong> High-precision document indexing and semantic vector search powered by Pinecone & OpenAI.</li>
      <li style="margin-bottom: 6px;"><strong>Retail Support & Installment Eligibility AI:</strong> Integrated PostgreSQL, Pinecone, HubSpot CRM, and Gmail follow-up engine.</li>
      <li style="margin-bottom: 6px;"><strong>Real Estate Sales Assistant:</strong> Multi-modal listing search, dynamic recommendations, and instant HubSpot CRM synchronization.</li>
      <li style="margin-bottom: 6px;"><strong>Chat-Triggered Trello Task Creator:</strong> Conversational AI node interpreting team messages into Trello cards.</li>
      <li style="margin-bottom: 6px;"><strong>AI News & Social Publisher Bot:</strong> n8n workflow connecting NewsAPI -> Google Sheets -> Facebook Graph API.</li>
      <li style="margin-bottom: 6px;"><strong>RSS Feed Aggregator to Airtable:</strong> Multi-feed curation pipeline with date transformation and Airtable storage.</li>
      <li style="margin-bottom: 6px;"><strong>PostgreSQL Agent Audit Logger & LangSmith:</strong> Complete execution audit system logging inputs, outputs, tools, and prompts.</li>
    </ol>

    <h2>Education</h2>
    <p style="color: var(--text-main); font-weight: 600;">B.Sc. in Computer Engineering</p>
    <p style="color: var(--text-muted); font-size: 0.95rem;">
      Faculty of Engineering Shoubra — Benha University | Location: Benha, Egypt <br>
      Specialization: Computer Systems Architecture, Database Management Systems, Software Engineering & AI Systems.
    </p>
  `;

  document.getElementById('resume-modal').classList.add('active');
}

function closeResumeModal() {
  document.getElementById('resume-modal').classList.remove('active');
}

// 7. Toast & Copy Email
function copyEmail() {
  const email = "mahmoudzanaty454@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });
}

function toggleMobileMenu() {
  document.getElementById('nav-links').classList.toggle('mobile-active');
}

// 8. Interactive Canvas Motion (Particle Constellation + Mouse Physics)
let mouseX = -1000;
let mouseY = -1000;

function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 18), 70);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse attraction
      const mdx = mouseX - p.x;
      const mdy = mouseY - p.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.25 * (1 - mdist / 140)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
      ctx.fill();

      for (let j = index + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Global Modal Close on Outside Click
window.onclick = function(event) {
  const projectModal = document.getElementById('project-modal');
  const resumeModal = document.getElementById('resume-modal');
  if (event.target === projectModal) closeProjectModal();
  if (event.target === resumeModal) closeResumeModal();
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjects('all');
  initParticleBackground();
  initScrollReveal();
});
