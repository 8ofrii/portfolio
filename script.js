/* ==========================================================================
   Mahmoud Abd El-Ghaffar Portfolio - Interactive JavaScript Engine
   Features: Theme Switcher, Resume Renderer, Project Showcase, Modals
   ========================================================================== */

// Interactive Projects Data Matrix
const projectsData = [
  {
    id: "micromind-app-rebort",
    title: "AI MicroMind App & Rebort Bot Framework",
    subtitle: "Conversational Natural Language BI & ERP Analytics Engine",
    category: "arch",
    categoryLabel: "Architecture & System Design",
    icon: "fa-solid fa-chart-line",
    desc: "Built the Rebort Bot Framework allowing enterprise users to ask natural language questions directly to AI agents to query operational data across on-premise ERPs (Oracle, Microsoft Dynamics, SAP, Odoo, SQL) and cloud platforms (Oracle Fusion, Dynamics 365 OData).",
    techStack: ["AI MicroMind App", "Rebort Bot", "Oracle", "Microsoft Dynamics", "SAP", "Odoo", "Oracle Fusion", "SQL"],
    details: {
      overview: "An enterprise-grade Conversational Business Intelligence engine that connects natural language prompts to multi-database SQL & OData generators.",
      architecture: [
        "Natural Language Query Parser converting prompts into safe parametrized SQL & OData requests.",
        "Universal Adapter support for Oracle, Microsoft Dynamics, SAP, Odoo, SQL Server, and Oracle Fusion.",
        "Rebort Bot BI Engine producing dynamic charts, metrics summaries, and automated executive reports.",
        "Role-based security & data access filters for enterprise compliance."
      ],
      impact: "Reduced reporting turnaround time from hours to seconds across operational department teams."
    }
  },
  {
    id: "micromind-core-nodes",
    title: "AI MicroMind Core Native Node Engine",
    subtitle: "30+ Built & Co-Built Native Integration Nodes",
    category: "nodes-mcp",
    categoryLabel: "Custom Nodes & MCP",
    icon: "fa-solid fa-plug",
    desc: "Built and co-built 30+ native custom integration nodes directly inside AI MicroMind Core, enabling native platform-level connections to WAPA (WhatsApp API), Telegram, Gmail, Weather, MCP, Pinecone, Webhooks, and Schedulers.",
    techStack: ["AI MicroMind Core", "30+ Native Nodes", "Node.js", "WAPA API", "Telegram", "Pinecone", "MCP"],
    details: {
      overview: "Deep native extension of AI MicroMind Core architecture providing 30+ production-grade nodes built directly into the platform core.",
      architecture: [
        "Native WAPA (WhatsApp Business API) messaging and automated dialog state handlers.",
        "Model Context Protocol (MCP) Client Node executing backend scripts safely via Claude prompts.",
        "PostgreSQL Logger Node capturing every input, output, tool call, and prompt into structured audit tables.",
        "Custom Webhook & Cron Scheduler nodes managing event-driven workflows."
      ],
      impact: "Expanded platform connectivity by 300% without relying on restrictive third-party SaaS wrappers."
    }
  },
  {
    id: "microapps-ecosystem",
    title: "AI MicroMind MicroApps Ecosystem",
    subtitle: "Modular Integration Layer for Third-Party Applications",
    category: "nodes-mcp",
    categoryLabel: "Custom Nodes & MCP",
    icon: "fa-solid fa-cubes",
    desc: "Engineered AI MicroMind MicroApps to seamlessly bridge any external web, mobile, or enterprise tool to work harmoniously with the entire MicroMind ecosystem.",
    techStack: ["MicroMind MicroApps", "Lark Suite", "Bubble.io", "Teamwork", "ConnectWise", "ClickUp", "Zoom"],
    details: {
      overview: "A lightweight middleware layer that turns external APIs into plug-and-play MicroMind agent nodes.",
      architecture: [
        "Bidirectional webhooks linking Lark Suite, Bubble.io, Teamwork, Teamwork Desk, and ConnectWise.",
        "Automated task creation & ticket escalation for ClickUp, Trello, Zoom, Slack, and Discord.",
        "Mobile App front-end and back-end APIs communicating with central MicroMind AI routers."
      ],
      impact: "Unambiguous end-to-end automation across 12+ enterprise operational tools."
    }
  },
  {
    id: "langchain-langgraph-framework",
    title: "Multi-Agent Graphs (LangChain & LangGraph)",
    subtitle: "Stateful Agent Orchestration & Supervisor Networks",
    category: "ai-agents",
    categoryLabel: "AI Agents & Pinecone RAG",
    icon: "fa-solid fa-diagram-project",
    desc: "Constructed stateful multi-agent supervisor graphs using LangChain (Expert level) and LangGraph (Advanced level) for state persistence and dynamic agent routing.",
    techStack: ["LangChain (Expert)", "LangGraph (Advanced)", "Python", "Node.js", "OpenAI GPT-4o", "Claude 3.5"],
    details: {
      overview: "Advanced multi-agent network where a primary Supervisor Agent routes sub-tasks to specialized sub-agents based on execution state.",
      architecture: [
        "LangGraph state machine maintaining conversation state and execution memory across long threads.",
        "Hierarchical delegation for complex tasks combining web search, database querying, and code evaluation.",
        "Fallback loops for self-correcting agent outputs."
      ],
      impact: "Enabled high-reliability autonomous workflows capable of handling multi-step complex tasks."
    }
  },
  {
    id: "pinecone-rag-audit",
    title: "Pinecone Enterprise RAG & PostgreSQL Audit Logger",
    subtitle: "Vector Knowledge Base + LangSmith Observability",
    category: "ai-agents",
    categoryLabel: "AI Agents & Pinecone RAG",
    icon: "fa-solid fa-database",
    desc: "High-speed semantic document search powered by Pinecone Vector DB paired with a PostgreSQL Agent Logger tracking every node input, output, and tool call.",
    techStack: ["Pinecone Vector DB", "PostgreSQL", "LangSmith", "OpenAI Embeddings", "PGVector"],
    details: {
      overview: "Production RAG engine indexing enterprise documentation into Pinecone while maintaining strict compliance telemetry.",
      architecture: [
        "Pinecone hybrid search combining dense embeddings and sparse keyword matching.",
        "PostgreSQL audit logger writing every prompt token, node execution, and tool output.",
        "LangSmith integration for tracing LLM latency and token cost analysis."
      ],
      impact: "Delivered millisecond-level document search accuracy with 100% audit logging transparency."
    }
  },
  {
    id: "devops-cloud-hosting",
    title: "DevOps, Containerization & Cloud Infrastructure",
    subtitle: "AWS, Docker, DigitalOcean VPS, Render & GitHub Suite",
    category: "infra",
    categoryLabel: "DevOps & Infrastructure",
    icon: "fa-brands fa-docker",
    desc: "Containerized deployment and hosting environment management across AWS, Docker, DigitalOcean Linux VPS, Render, and GitHub Actions.",
    techStack: ["Docker", "AWS", "DigitalOcean VPS", "Render", "GitHub Actions", "Linux Administration"],
    details: {
      overview: "Production hosting pipeline ensuring high availability, automatic deployments, and secure server management for AI microservices.",
      architecture: [
        "Dockerized microservice containers for MicroMind Platform, n8n, and custom Node.js/Python API handlers.",
        "DigitalOcean VPS & AWS instance optimization for zero downtime agent execution.",
        "GitHub Actions CI/CD pipelines deploying live static and backend code to Render and VPS servers."
      ],
      impact: "Achieved 99.9% uptime across production AI workflows and API microservices."
    }
  }
];

// Document Loaded Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initScrollReveal();
  initParticleCanvas();
  loadSavedTheme();
});

// Render Projects Cards
function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

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
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderProjects(category);
}

// Modal Systems
function openProjectModal(projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  const details = document.getElementById('modal-project-details');
  if (!modal || !details) return;

  details.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="card-category-badge" style="margin-bottom: 10px; display:inline-block;">${proj.categoryLabel}</span>
      <h2 style="font-size: 1.8rem; color: var(--text-main); margin-bottom: 6px;">${proj.title}</h2>
      <p style="color: var(--primary-cyan); font-weight: 600;">${proj.subtitle}</p>
    </div>
    <div style="margin-bottom: 24px;">
      <h4 style="color: var(--primary-cyan); margin-bottom: 8px;">System Overview</h4>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${proj.details.overview}</p>
    </div>
    <div style="margin-bottom: 24px;">
      <h4 style="color: var(--primary-cyan); margin-bottom: 10px;">Key Architectural Components</h4>
      <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.92rem; line-height: 1.7;">
        ${proj.details.architecture.map(a => `<li style="margin-bottom: 6px;">${a}</li>`).join('')}
      </ul>
    </div>
    <div>
      <h4 style="color: var(--accent-neon); margin-bottom: 6px;">Business & Technical Impact</h4>
      <p style="color: var(--text-main); font-weight: 600; font-size: 0.95rem;">${proj.details.impact}</p>
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
      <p style="font-size: 0.9rem; color: var(--text-muted);">
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

      <h3 style="color: var(--text-main); margin-top: 16px;">Automation Engineer — Operatives (IT Services) <span style="font-size: 0.85rem; color: var(--primary-cyan); font-weight: normal;">(Jun 2021 – Jan 2022)</span></h3>
      <ul>
        <li>Automated cross-departmental operational cycles, eliminating manual data entry bottlenecks across IT operations teams.</li>
      </ul>

      <h3 style="color: var(--text-main); margin-top: 16px;">Operation Engineer & Admin — Operatives (IT Services) <span style="font-size: 0.85rem; color: var(--primary-cyan); font-weight: normal;">(Jan 2020 – Jun 2021)</span></h3>
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

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
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

        if (dist < 120) {
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
