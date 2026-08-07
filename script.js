/* ==========================================================================
   Mahmoud Abd El-Ghaffar Portfolio - Interactive JavaScript Engine
   Features: Live Search, Filter Tabs, Interactive Visualizer, Modal Dialogs
   ========================================================================== */

// Rich Enterprise Projects Data Matrix (8 Deep Showcase Architectures)
const projectsData = [
  {
    id: "micromind-app-rebort",
    title: "AI MicroMind App & Rebort Bot Framework",
    subtitle: "Conversational Natural Language BI & ERP Analytics Engine",
    category: "arch",
    categoryLabel: "Architecture & System Design",
    icon: "fa-solid fa-chart-line",
    desc: "Engineered the Rebort Bot Framework enabling enterprise users to query live operational data across on-premise ERPs (Oracle, Microsoft Dynamics, SAP, Odoo, SQL) and cloud platforms (Oracle Fusion, Dynamics 365 OData) via natural language.",
    techStack: ["AI MicroMind App", "Rebort Bot BI", "Oracle ERP", "Dynamics 365", "SAP", "Odoo", "SQL Server", "Oracle Fusion"],
    details: {
      overview: "An enterprise-grade Conversational Business Intelligence engine bridging natural language user intent with complex ERP relational schemas and OData API endpoints.",
      architecture: [
        "Natural Language Semantic Parser with automated SQL / OData schema introspection.",
        "Universal Database Adapter supporting Oracle, Microsoft Dynamics, SAP, Odoo, PostgreSQL, and SQL Server.",
        "Rebort Bot BI Visualizer generating interactive charts, KPI cards, and automated PDF executive reports.",
        "Enterprise RBAC (Role-Based Access Control) ensuring row-level and column-level security compliance."
      ],
      impact: "Reduced ad-hoc enterprise report turnaround times from 4 hours to under 3 seconds with 99.4% query accuracy."
    }
  },
  {
    id: "micromind-core-nodes",
    title: "AI MicroMind Core Native Node Engine",
    subtitle: "30+ Built & Co-Built Native Integration Nodes",
    category: "nodes-mcp",
    categoryLabel: "Custom Nodes & MCP",
    icon: "fa-solid fa-plug",
    desc: "Built and co-built 30+ native integration nodes directly inside AI MicroMind Core, expanding platform-level capabilities for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP, Pinecone, Webhooks, Schedulers, and PostgreSQL.",
    techStack: ["MicroMind Core", "30+ Native Nodes", "Node.js", "WAPA API", "Telegram", "Pinecone", "MCP Client", "PostgreSQL"],
    details: {
      overview: "Native Node.js extensions designed directly into the core AI execution runtime, removing reliance on brittle third-party middleware.",
      architecture: [
        "Native WAPA (WhatsApp Business API) dialog node with automated webhook payload dispatch.",
        "Model Context Protocol (MCP) Client node executing secure backend scripts through AI agent prompts.",
        "PostgreSQL Audit Logger node writing execution telemetry, latency, and tokens into persistent SQL tables.",
        "Cron Scheduler & Event-driven Webhook ingestion nodes handling asynchronous queue processing."
      ],
      impact: "Expanded platform execution capabilities by 300% and reduced third-party middleware latency."
    }
  },
  {
    id: "microapps-ecosystem",
    title: "AI MicroMind MicroApps & Integrations",
    subtitle: "Modular Middleware Layer for 12+ Enterprise SaaS Tools",
    category: "nodes-mcp",
    categoryLabel: "Custom Nodes & MCP",
    icon: "fa-solid fa-cubes",
    desc: "Constructed AI MicroMind MicroApps to seamlessly bridge external tools (Lark Suite, Bubble.io, Teamwork, Teamwork Desk, ConnectWise, ClickUp, Zoom, Slack, Discord, WAPA) with the central agent network.",
    techStack: ["MicroApps Layer", "Lark Suite", "Bubble.io", "Teamwork", "ConnectWise", "ClickUp", "Zoom", "Slack", "WAPA"],
    details: {
      overview: "A modular integration middleware layer enabling any web or mobile application to interact with AI agent workflows via standard REST & WebSockets.",
      architecture: [
        "Bidirectional sync between Lark Suite / Bubble.io and central MicroMind agent pipelines.",
        "Automated IT service ticket triage and escalation across ConnectWise, Teamwork Desk, and ClickUp.",
        "Conversational AI bot gateways for Zoom, Slack, Discord, Telegram, and WhatsApp.",
        "Secure token authentication and payload encryption across all third-party webhook handshakes."
      ],
      impact: "Unified 12+ fragmented SaaS platforms into an autonomous, interconnected enterprise operating ecosystem."
    }
  },
  {
    id: "langchain-langgraph-framework",
    title: "Stateful Multi-Agent Graphs (LangChain & LangGraph)",
    subtitle: "Hierarchical Supervisor Networks & State Persistence",
    category: "ai-agents",
    categoryLabel: "AI Agents & Pinecone RAG",
    icon: "fa-solid fa-diagram-project",
    desc: "Architected multi-agent graph architectures using LangChain (Expert level) and LangGraph (Advanced level) for state persistence, self-correcting prompt loops, and supervisor routing.",
    techStack: ["LangChain (Expert)", "LangGraph (Advanced)", "Python", "Node.js", "OpenAI GPT-4o", "Claude 3.5 Sonnet"],
    details: {
      overview: "Complex cyclical state machines where a master Supervisor Agent orchestrates specialized research, coding, and validation sub-agents.",
      architecture: [
        "LangGraph StateGraph maintaining conversation history and tool outputs across deep branches.",
        "Deterministic conditional routing edges to switch between fast deterministic logic and LLM reasoning.",
        "Self-correcting feedback loops that re-prompt agents upon syntax or schema validation failures.",
        "Integrated memory checkpoints enabling seamless session resumption across days."
      ],
      impact: "Achieved 98.7% task completion success rate on complex multi-step reasoning workflows."
    }
  },
  {
    id: "pinecone-rag-audit",
    title: "Pinecone Enterprise Hybrid RAG & Telemetry",
    subtitle: "Vector Knowledge Base + LangSmith Observability",
    category: "ai-agents",
    categoryLabel: "AI Agents & Pinecone RAG",
    icon: "fa-solid fa-database",
    desc: "Engineered low-latency semantic document retrieval utilizing Pinecone Vector DB paired with PostgreSQL audit logging and LangSmith observability.",
    techStack: ["Pinecone Vector DB", "PostgreSQL", "LangSmith", "OpenAI text-embedding-3", "PGVector"],
    details: {
      overview: "Enterprise retrieval-augmented generation engine indexing thousands of internal documentation pages into vector spaces with metadata filtering.",
      architecture: [
        "Hybrid search combining dense vector embeddings and BM25 sparse keyword matching.",
        "Contextual chunking strategy preserving header hierarchies and table structures.",
        "PostgreSQL audit trail recording every user query, retrieved document IDs, and confidence scores.",
        "LangSmith tracing for token economics, token latency breakdowns, and prompt versioning."
      ],
      impact: "Reduced document search latency to under 180ms while eliminating LLM hallucination risks."
    }
  },
  {
    id: "mobile-apps-architecture",
    title: "Full-Stack Mobile Applications & MicroMind Clients",
    subtitle: "Cross-Platform Mobile AI Assistants & Field Tools",
    category: "arch",
    categoryLabel: "Architecture & System Design",
    icon: "fa-solid fa-mobile-screen",
    desc: "Engineered full-stack mobile applications (front-end & back-end) providing mobile workforce teams with real-time conversational access to MicroMind agents and ERP metrics.",
    techStack: ["Mobile App Dev", "React Native / Flutter", "Node.js APIs", "WebSockets", "Push Notifications", "OAuth 2.0"],
    details: {
      overview: "Native and cross-platform mobile solutions connecting field operations directly to core AI workflows and ERP intelligence.",
      architecture: [
        "Real-time WebSocket streaming for fluid token-by-token conversational AI responses on mobile screens.",
        "Offline caching and sync queue for operations in remote or low-bandwidth environments.",
        "Biometric authentication and secure local token storage for enterprise data safety.",
        "Voice-to-text integration enabling hands-free field reporting and query execution."
      ],
      impact: "Empowered 100+ field operators to query live database metrics directly from mobile devices."
    }
  },
  {
    id: "mcp-server-infrastructure",
    title: "Model Context Protocol (MCP) Server Infrastructure",
    subtitle: "Standardized Tooling & Execution Environment",
    category: "nodes-mcp",
    categoryLabel: "Custom Nodes & MCP",
    icon: "fa-solid fa-network-wired",
    desc: "Built custom Model Context Protocol (MCP) server dispatchers enabling Claude and GPT models to safely execute backend Node.js scripts and database queries.",
    techStack: ["MCP Protocol", "Claude Code", "Antigravity", "Node.js", "TypeScript", "JSON-RPC"],
    details: {
      overview: "Standardized tool-calling interface implementing Anthropic's Model Context Protocol for secure local and remote tool execution.",
      architecture: [
        "Custom JSON-RPC protocol handlers connecting LLMs to local database and filesystem tools.",
        "Sandboxed script execution environment protecting host servers against arbitrary code execution.",
        "Dynamic tool registration allowing agents to discover available APIs at runtime.",
        "Comprehensive input/output sanitization and rate-limiting safeguards."
      ],
      impact: "Standardized tool-calling infrastructure across all microservices, reducing integration code by 60%."
    }
  },
  {
    id: "devops-cloud-hosting",
    title: "Cloud DevOps, Containerization & CI/CD Pipelines",
    subtitle: "AWS, Docker, DigitalOcean VPS, Render & GitHub Actions",
    category: "infra",
    categoryLabel: "DevOps & Infrastructure",
    icon: "fa-brands fa-docker",
    desc: "Containerized deployment and hosting environment management across AWS, Docker, DigitalOcean Linux VPS, Render, and GitHub Actions CI/CD pipelines.",
    techStack: ["Docker", "AWS ECS / EC2", "DigitalOcean VPS", "Render", "GitHub Actions", "Linux Nginx"],
    details: {
      overview: "Production infrastructure stack ensuring high availability, automated deployments, and zero-downtime microservice execution.",
      architecture: [
        "Docker multi-stage builds optimizing container image sizes for fast startup and low memory footprint.",
        "DigitalOcean VPS and AWS instance clustering with Nginx reverse proxy and SSL termination.",
        "GitHub Actions CI/CD pipelines automating linting, testing, and continuous deployment to Render & VPS.",
        "Automated health checks, container restart policies, and Discord/Telegram alert webhooks."
      ],
      impact: "Maintained 99.95% production uptime across all microservices with automated rollback capabilities."
    }
  }
];

// Active filter and search state
let currentFilter = 'all';
let currentSearch = '';

// Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initScrollReveal();
  initParticleCanvas();
  loadSavedTheme();
  setupSearchInput();
});

// Setup Live Search
function setupSearchInput() {
  const searchInput = document.getElementById('workflow-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }
}

// Render Projects with Filtering & Search
function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = projectsData.filter(p => {
    const matchesCategory = currentFilter === 'all' || p.category === currentFilter;
    const matchesSearch = !currentSearch || 
      p.title.toLowerCase().includes(currentSearch) ||
      p.desc.toLowerCase().includes(currentSearch) ||
      p.techStack.some(t => t.toLowerCase().includes(currentSearch));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid var(--border-color);">
        <i class="fa-solid fa-search" style="font-size: 2rem; color: var(--text-dim); margin-bottom: 12px;"></i>
        <h3 style="color: var(--text-main); margin-bottom: 6px;">No workflows found matching "${currentSearch}"</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try searching for ERP, nodes, mobile, LangGraph, or Docker.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="project-card reveal active">
      <div class="card-header-top">
        <span class="card-category-badge">${p.categoryLabel}</span>
        <div class="card-icon"><i class="${p.icon}"></i></div>
      </div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="card-tech-stack">
        ${p.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
      </div>
      <div class="card-footer">
        <span class="card-link" onclick="openProjectModal('${p.id}')">
          View Architecture <i class="fa-solid fa-arrow-right"></i>
        </span>
      </div>
    </div>
  `).join('');
}

// Filter Category Tabs
function filterProjects(category) {
  currentFilter = category;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.target) {
    event.target.classList.add('active');
  }
  renderProjects();
}

// Project Architecture Modal
function openProjectModal(projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  const details = document.getElementById('modal-project-details');
  if (!modal || !details) return;

  details.innerHTML = `
    <div style="margin-bottom: 22px;">
      <span class="card-category-badge" style="margin-bottom: 10px; display:inline-block;">${proj.categoryLabel}</span>
      <h2 style="font-size: 1.85rem; color: var(--text-main); margin-bottom: 6px;">${proj.title}</h2>
      <p style="color: var(--primary-cyan); font-weight: 600; font-size: 1.05rem;">${proj.subtitle}</p>
    </div>
    
    <div style="margin-bottom: 24px;">
      <h4 style="color: var(--primary-cyan); margin-bottom: 8px; font-size: 1rem;"><i class="fa-solid fa-circle-info"></i> System Overview</h4>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">${proj.details.overview}</p>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="color: var(--primary-cyan); margin-bottom: 10px; font-size: 1rem;"><i class="fa-solid fa-layer-group"></i> Key Architectural Components</h4>
      <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.93rem; line-height: 1.75;">
        ${proj.details.architecture.map(a => `<li style="margin-bottom: 8px;">${a}</li>`).join('')}
      </ul>
    </div>

    <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); padding: 16px 20px; border-radius: 12px; margin-bottom: 24px;">
      <h4 style="color: var(--accent-neon); margin-bottom: 4px; font-size: 0.95rem;"><i class="fa-solid fa-bolt"></i> Business & Technical Impact</h4>
      <p style="color: var(--text-main); font-weight: 600; font-size: 0.94rem; margin: 0;">${proj.details.impact}</p>
    </div>

    <div>
      <h4 style="color: var(--text-muted); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Technologies Employed</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${proj.techStack.map(t => `<span class="tech-chip" style="background: rgba(255,255,255,0.06); color: var(--primary-cyan); font-weight: 600;">${t}</span>`).join('')}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

// CV Modal
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  const content = document.getElementById('resume-body-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="resume-rendered">
      <h1>Mahmoud Abd El-Ghaffar (Mahmoud Zanaty)</h1>
      <p style="color: var(--primary-cyan); font-weight: 700; margin-bottom: 12px;">
        AI Agent Architect & Workflow Automation Specialist | MicroMind Platform, LangChain & n8n Engineer
      </p>
      <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">
        📍 Benha / Cairo, Egypt | 📞 <a href="tel:+201024190741" style="color: var(--primary-cyan);">+20 102 419 0741</a> | ✉️ mahmoudzanaty454@gmail.com | 🔗 <a href="https://www.linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219/" target="_blank" style="color: var(--primary-cyan);">LinkedIn Profile</a>
      </p>

      <h2>Executive Summary</h2>
      <p>Accomplished Computer Engineer and AI Agent Architect with extensive hands-on experience designing, extending, and deploying autonomous AI agent networks, enterprise Pinecone RAG pipelines, and complex multi-platform automation ecosystems. Built and co-built 30+ native integration nodes in AI MicroMind Core and engineered over 30+ production AI workflows bridging enterprise ERP systems (Oracle, Microsoft Dynamics, SAP, Odoo, Oracle Fusion, Dynamics 365 OData, SQL) with cutting-edge LLMs (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 2.0 Flash).</p>

      <h2>Work Experience</h2>
      <h3 style="color: var(--text-main);">AI & Automation Engineer — AI MicroMind <span style="font-size: 0.85rem; color: var(--primary-cyan); font-weight: normal;">(2024 – 2026)</span></h3>
      <ul>
        <li>Built and co-built 30+ native integration nodes directly in AI MicroMind Core for WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP Client, Pinecone, Webhooks, Schedulers, and PostgreSQL Audit Loggers using AI tools (Antigravity, Claude Code, Codex).</li>
        <li>Architected and deployed the AI MicroMind App featuring the Rebort Bot Framework and Advanced BI & Reporting Tools for querying on-premise ERPs (Oracle, Microsoft Dynamics, SAP, Odoo, SQL) and cloud platforms (Oracle Fusion, Dynamics 365 OData).</li>
        <li>Engineered full-stack mobile applications (front-end & back-end) and built AI MicroMind MicroApps connecting any third-party app into the MicroMind ecosystem.</li>
        <li>Developed custom integration applications across Lark Suite, Bubble.io, Teamwork, Teamwork Desk, ConnectWise, ClickUp, Zoom, Slack, Discord, Telegram, Facebook Messenger, and WAPA.</li>
        <li>Built complex multi-agent graphs using LangChain (Expert) and LangGraph (Advanced), implementing MCP server dispatchers.</li>
        <li>Managed Docker, AWS, DigitalOcean VPS, Linux Administration, Render, and GitHub CI/CD pipelines.</li>
      </ul>

      <h3 style="color: var(--text-main); margin-top: 18px;">Automation Engineer — Operatives (IT Services) <span style="font-size: 0.85rem; color: var(--primary-cyan); font-weight: normal;">(Jun 2021 – Jan 2022)</span></h3>
      <ul>
        <li>Automated cross-departmental operational cycles, eliminating manual data entry bottlenecks across IT operations teams.</li>
      </ul>

      <h3 style="color: var(--text-main); margin-top: 18px;">Operation Engineer & Admin — Operatives (IT Services) <span style="font-size: 0.85rem; color: var(--primary-cyan); font-weight: normal;">(Jan 2020 – Jun 2021)</span></h3>
      <ul>
        <li>Managed IT infrastructure operations, monitored workflow execution logs, enforced SLA compliance, and administered operational tracking systems.</li>
      </ul>
    </div>
  `;

  modal.classList.add('active');
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.classList.remove('active');
}

// Copy Email Utility
function copyEmail() {
  const email = "mahmoudzanaty454@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("Email address copied to clipboard!");
  }).catch(() => {
    showToast("Email: mahmoudzanaty454@gmail.com");
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Theme Switcher Logic
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = savedTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// Mobile Menu
function toggleMobileMenu() {
  const links = document.getElementById('nav-links');
  if (links) links.classList.toggle('mobile-active');
}

// Scroll Reveal Observer
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Particle Canvas Background
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 48 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(0, 242, 254, 0.25)';
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > width) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}
