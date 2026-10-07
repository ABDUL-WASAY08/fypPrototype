// ============================================================
// TOM — Mock data store
// All data is static & local. Replace with API calls later.
// ============================================================

export const developers = [
  {
    id: 'dev-1',
    name: 'Ali Khan',
    slug: 'ali-khan',
    title: 'Software Engineer',
    email: 'ali.khan@tom.dev',
    avatar: 'AK',
    color: 'bg-indigo-600',
    bio: 'Full-stack engineer with 6+ years building scalable web platforms. I specialise in React design systems, Node.js APIs and AI-assisted developer tooling.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Docker', 'AI/RAG'],
    experience: '6 years',
    rating: 4.9,
    completedProjects: 34,
    portfolioViews: 1248,
    github: 'github.com/alikhan',
    linkedin: 'linkedin.com/in/alikhan',
    website: 'alikhan.dev',
    location: 'Lahore, Pakistan',
    aiBadge: true,
    status: 'active',
    joined: '2024-03-12',
    education: [
      { degree: 'BS Computer Science', school: 'University of Engineering & Technology', year: '2019' },
      { degree: 'Certified Kubernetes Application Developer', school: 'CNCF', year: '2022' },
    ],
    hourlyRate: 45,
  },
  {
    id: 'dev-2',
    name: 'Sara Ahmed',
    slug: 'sara-ahmed',
    title: 'Full Stack Developer',
    email: 'sara.ahmed@tom.dev',
    avatar: 'SA',
    color: 'bg-fuchsia-600',
    bio: 'Full stack developer blending product design with machine learning. I ship polished interfaces and the intelligent services behind them.',
    skills: ['React', 'Python', 'AI', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    experience: '4 years',
    rating: 4.8,
    completedProjects: 21,
    portfolioViews: 964,
    github: 'github.com/saraahmed',
    linkedin: 'linkedin.com/in/saraahmed',
    website: 'saraahmed.io',
    location: 'Karachi, Pakistan',
    aiBadge: true,
    status: 'active',
    joined: '2024-06-02',
    education: [
      { degree: 'BS Software Engineering', school: 'NED University', year: '2021' },
      { degree: 'Deep Learning Specialization', school: 'Coursera / deeplearning.ai', year: '2023' },
    ],
    hourlyRate: 40,
  },
  {
    id: 'dev-3',
    name: 'Bilal Raza',
    slug: 'bilal-raza',
    title: 'Backend Engineer',
    email: 'bilal.raza@tom.dev',
    avatar: 'BR',
    color: 'bg-emerald-600',
    bio: 'Backend engineer focused on distributed systems, event-driven architecture and reliable payment integrations.',
    skills: ['Node.js', 'Go', 'Redis', 'BullMQ', 'MongoDB', 'Docker'],
    experience: '5 years',
    rating: 4.7,
    completedProjects: 18,
    portfolioViews: 712,
    github: 'github.com/bilalraza',
    linkedin: 'linkedin.com/in/bilalraza',
    website: 'bilalraza.dev',
    location: 'Islamabad, Pakistan',
    aiBadge: false,
    status: 'active',
    joined: '2024-08-19',
    education: [{ degree: 'BS Computer Science', school: 'FAST-NUCES', year: '2020' }],
    hourlyRate: 38,
  },
  {
    id: 'dev-4',
    name: 'Hina Malik',
    slug: 'hina-malik',
    title: 'Frontend Engineer',
    email: 'hina.malik@tom.dev',
    avatar: 'HM',
    color: 'bg-amber-600',
    bio: 'Frontend engineer crafting accessible, high-performance interfaces with React and modern CSS architecture.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'Testing Library'],
    experience: '3 years',
    rating: 4.6,
    completedProjects: 15,
    portfolioViews: 588,
    github: 'github.com/hinamalik',
    linkedin: 'linkedin.com/in/hinamalik',
    website: 'hinamalik.design',
    location: 'Rawalpindi, Pakistan',
    aiBadge: true,
    status: 'active',
    joined: '2025-01-08',
    education: [{ degree: 'BS Information Technology', school: 'PIEAS', year: '2022' }],
    hourlyRate: 32,
  },
  {
    id: 'dev-5',
    name: 'Usman Tariq',
    slug: 'usman-tariq',
    title: 'DevOps & Cloud Engineer',
    email: 'usman.tariq@tom.dev',
    avatar: 'UT',
    color: 'bg-sky-600',
    bio: 'DevOps engineer automating delivery pipelines, infrastructure-as-code and zero-downtime deployments.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker', 'Python'],
    experience: '7 years',
    rating: 4.9,
    completedProjects: 41,
    portfolioViews: 1502,
    github: 'github.com/usmantariq',
    linkedin: 'linkedin.com/in/usmantariq',
    website: 'usmaninfra.cloud',
    location: 'Faisalabad, Pakistan',
    aiBadge: false,
    status: 'active',
    joined: '2023-11-21',
    education: [{ degree: 'MS Computer Science', school: 'ITU Lahore', year: '2018' }],
    hourlyRate: 55,
  },
]

export const clients = [
  { id: 'cli-1', name: 'Nadia Hussain', email: 'nadia@brightlabs.co', company: 'Bright Labs', avatar: 'NH', color: 'bg-violet-600', joined: '2024-02-14', status: 'active' },
  { id: 'cli-2', name: 'Omar Farooq', email: 'omar@nordicRetail.com', company: 'Nordic Retail', avatar: 'OF', color: 'bg-cyan-600', joined: '2024-05-30', status: 'active' },
  { id: 'cli-3', name: 'Fatima Sheikh', email: 'fatima@healthplus.io', company: 'HealthPlus', avatar: 'FS', color: 'bg-rose-600', joined: '2024-09-11', status: 'active' },
  { id: 'cli-4', name: 'Zain Abbas', email: 'zain@fintrack.app', company: 'FinTrack', avatar: 'ZA', color: 'bg-lime-700', joined: '2025-02-03', status: 'suspended' },
  { id: 'cli-5', name: 'Maryam Noor', email: 'maryam@eduspark.pk', company: 'EduSpark', avatar: 'MN', color: 'bg-orange-600', joined: '2025-04-27', status: 'active' },
]

export const adminUsers = [
  { id: 'u-101', name: 'Ali Khan', email: 'ali.khan@tom.dev', role: 'Developer', status: 'Active', joined: '2024-03-12' },
  { id: 'u-102', name: 'Sara Ahmed', email: 'sara.ahmed@tom.dev', role: 'Developer', status: 'Active', joined: '2024-06-02' },
  { id: 'u-103', name: 'Bilal Raza', email: 'bilal.raza@tom.dev', role: 'Developer', status: 'Active', joined: '2024-08-19' },
  { id: 'u-104', name: 'Hina Malik', email: 'hina.malik@tom.dev', role: 'Developer', status: 'Active', joined: '2025-01-08' },
  { id: 'u-105', name: 'Usman Tariq', email: 'usman.tariq@tom.dev', role: 'Developer', status: 'Suspended', joined: '2023-11-21' },
  { id: 'u-106', name: 'Nadia Hussain', email: 'nadia@brightlabs.co', role: 'Client', status: 'Active', joined: '2024-02-14' },
  { id: 'u-107', name: 'Omar Farooq', email: 'omar@nordicRetail.com', role: 'Client', status: 'Active', joined: '2024-05-30' },
  { id: 'u-108', name: 'Fatima Sheikh', email: 'fatima@healthplus.io', role: 'Client', status: 'Active', joined: '2024-09-11' },
  { id: 'u-109', name: 'Zain Abbas', email: 'zain@fintrack.app', role: 'Client', status: 'Suspended', joined: '2025-02-03' },
  { id: 'u-110', name: 'Maryam Noor', email: 'maryam@eduspark.pk', role: 'Client', status: 'Active', joined: '2025-04-27' },
  { id: 'u-111', name: 'Hamza Iqbal', email: 'hamza@tom.dev', role: 'Admin', status: 'Active', joined: '2023-09-01' },
  { id: 'u-112', name: 'Ayesha Noor', email: 'ayesha@tom.dev', role: 'Admin', status: 'Active', joined: '2024-01-15' },
]

export const repositories = [
  {
    id: 'repo-1',
    name: 'TOM-Frontend',
    description: 'React frontend for the TOM platform — dashboards, AI assistant UI and marketplace.',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    stars: 42,
    forks: 9,
    updated: '2 hours ago',
    analyzed: true,
    portfolio: true,
    size: '4.2 MB',
    files: 186,
    lines: 24830,
    quality: 88,
    security: 94,
    maintainability: 83,
    coverage: 76,
  },
  {
    id: 'repo-2',
    name: 'TOM-Backend',
    description: 'Node.js/Express API with RAG pipeline, GitHub integration, background jobs and RBAC.',
    language: 'JavaScript',
    languageColor: 'bg-yellow-400',
    stars: 67,
    forks: 14,
    updated: '5 hours ago',
    analyzed: true,
    portfolio: true,
    size: '6.8 MB',
    files: 243,
    lines: 31240,
    quality: 84,
    security: 91,
    maintainability: 79,
    coverage: 71,
  },
  {
    id: 'repo-3',
    name: 'Ecommerce-App',
    description: 'Full-stack MERN e-commerce platform with cart, coupons and Stripe-style checkout.',
    language: 'JavaScript',
    languageColor: 'bg-yellow-400',
    stars: 31,
    forks: 7,
    updated: '1 day ago',
    analyzed: true,
    portfolio: true,
    size: '9.1 MB',
    lines: 41120,
    files: 318,
    quality: 76,
    security: 82,
    maintainability: 74,
    coverage: 58,
  },
  {
    id: 'repo-4',
    name: 'Chat-Application',
    description: 'Real-time chat app with rooms, typing indicators and message history backed by Socket.IO.',
    language: 'Python',
    languageColor: 'bg-emerald-500',
    stars: 24,
    forks: 5,
    updated: '3 days ago',
    analyzed: true,
    portfolio: false,
    size: '3.4 MB',
    files: 97,
    lines: 12470,
    quality: 81,
    security: 86,
    maintainability: 80,
    coverage: 64,
  },
  {
    id: 'repo-5',
    name: 'Portfolio-Website',
    description: 'Personal portfolio built with React and Tailwind, featuring animated project showcases.',
    language: 'HTML',
    languageColor: 'bg-orange-500',
    stars: 18,
    forks: 3,
    updated: '6 days ago',
    analyzed: true,
    portfolio: true,
    size: '1.1 MB',
    files: 44,
    lines: 5820,
    quality: 92,
    security: 96,
    maintainability: 90,
    coverage: 41,
  },
  {
    id: 'repo-6',
    name: 'Invoice-Generator',
    description: 'PDF invoice generator service with templating, tax rules and batch export API.',
    language: 'Go',
    languageColor: 'bg-cyan-500',
    stars: 12,
    forks: 2,
    updated: '2 weeks ago',
    analyzed: false,
    portfolio: false,
    size: '2.0 MB',
    files: 61,
    lines: 7340,
    quality: 0,
    security: 0,
    maintainability: 0,
    coverage: 0,
  },
  {
    id: 'repo-7',
    name: 'ML-Notebooks',
    description: 'Experimentation notebooks for code summarisation and repository embeddings.',
    language: 'Python',
    languageColor: 'bg-emerald-500',
    stars: 9,
    forks: 1,
    updated: '4 days ago',
    analyzed: false,
    portfolio: false,
    size: '18.6 MB',
    files: 38,
    lines: 4120,
    quality: 0,
    security: 0,
    maintainability: 0,
    coverage: 0,
  },
  {
    id: 'repo-8',
    name: 'CLI-Toolkit',
    description: 'Command-line utilities for repository scaffolding, linting and release automation.',
    language: 'Rust',
    languageColor: 'bg-rose-500',
    stars: 27,
    forks: 6,
    updated: '9 days ago',
    analyzed: false,
    portfolio: false,
    size: '2.7 MB',
    files: 74,
    lines: 9260,
    quality: 0,
    security: 0,
    maintainability: 0,
    coverage: 0,
  },
]

export const analysisIssues = [
  {
    id: 'iss-1',
    title: 'Missing input validation on login endpoint',
    severity: 'High',
    category: 'Security',
    file: 'src/routes/auth.routes.js',
    line: 42,
    explanation:
      'The login controller trusts the request body without schema validation. A malformed or malicious payload can reach the database query layer.',
    solution:
      'Validate the payload with Joi/Zod before the controller runs: require email as a valid string and password with a minimum length of 8 characters.',
  },
  {
    id: 'iss-2',
    title: 'Duplicate logic in user serialization',
    severity: 'Medium',
    category: 'Code Quality',
    file: 'src/utils/serializer.js',
    line: 88,
    explanation:
      'The same field-picking logic is repeated in three controllers, which makes future changes error-prone.',
    solution: 'Extract a shared toPublicUser() helper and reuse it across controllers.',
  },
  {
    id: 'iss-3',
    title: 'Potential inefficient query without index',
    severity: 'Medium',
    category: 'Performance',
    file: 'src/models/Project.js',
    line: 31,
    explanation:
      'Projects are filtered by status and sorted by createdAt on every marketplace request, but no compound index exists for that path.',
    solution: 'Add a compound index on { status: 1, createdAt: -1 } to the projects collection.',
  },
  {
    id: 'iss-4',
    title: 'Unused variable refreshToken',
    severity: 'Low',
    category: 'Code Quality',
    file: 'src/services/token.service.js',
    line: 17,
    explanation: 'refreshToken is assigned but never read afterwards, which adds noise for maintainers.',
    solution: 'Remove the variable or prefix it with an underscore if it is intentionally discarded.',
  },
  {
    id: 'iss-5',
    title: 'Missing error handling on payment webhook',
    severity: 'High',
    category: 'Security',
    file: 'src/routes/payment.routes.js',
    line: 120,
    explanation:
      'The webhook handler has no try/catch and no signature verification, so a failed handler crashes the request and forged events could be accepted.',
    solution: 'Wrap the handler in try/catch, verify the provider signature and respond with 200 after idempotent processing.',
  },
  {
    id: 'iss-6',
    title: 'Missing try/catch around async route',
    severity: 'Medium',
    category: 'Code Quality',
    file: 'src/routes/project.routes.js',
    line: 55,
    explanation: 'Unhandled promise rejections inside async Express handlers are silently swallowed.',
    solution: 'Wrap async handlers with an asyncHandler() wrapper or add explicit try/catch blocks.',
  },
]

export const analysisOverview = {
  filesAnalyzed: 243,
  linesOfCode: 31240,
  languages: [
    { name: 'JavaScript', pct: 62, color: 'bg-yellow-400' },
    { name: 'TypeScript', pct: 18, color: 'bg-blue-500' },
    { name: 'SQL', pct: 11, color: 'bg-emerald-500' },
    { name: 'CSS', pct: 6, color: 'bg-pink-500' },
    { name: 'Other', pct: 3, color: 'bg-slate-400' },
  ],
  quality: 84,
  security: 91,
  maintainability: 79,
  documentation: 68,
  complexity: 'Moderate',
  documentationStatus: 'Partial — README present, API docs missing',
}

export const suggestedQuestions = [
  'Where is authentication handled in this project?',
  'Explain the authentication flow.',
  'Where are API routes defined?',
  'How does the database connection work?',
  'Explain the user registration process.',
  'Where is payment handled?',
  'How can I improve this function?',
]

export const chatAnswers = [
  {
    match: ['authentication', 'auth flow', 'login'],
    chunks: 5,
    answer:
      'Authentication is primarily handled in the auth module. The login controller validates the user credentials and generates the authentication token. The protected routes then use authentication middleware to verify the token.\n\nFlow:\n1. POST /api/auth/login → auth.routes.js\n2. validate() schema check → validators.js\n3. comparePassword() → token.service.js\n4. jwt.sign() issues a 15-minute access token + refresh token\n5. requireAuth middleware verifies the token on protected routes',
    sources: ['src/routes/auth.routes.js', 'src/services/token.service.js', 'src/middleware/requireAuth.js'],
  },
  {
    match: ['api routes', 'routes defined', 'endpoints'],
    chunks: 4,
    answer:
      'API routes are defined in src/routes and registered centrally in src/app.js. There are 7 route modules: auth, user, project, bid, payment, repository and notification. Each module is mounted under /api/<resource> and most endpoints are guarded by requireAuth + requireRole middleware.',
    sources: ['src/app.js', 'src/routes/index.js', 'src/routes/project.routes.js'],
  },
  {
    match: ['database', 'mongo', 'connection'],
    chunks: 3,
    answer:
      'The database connection is established in src/config/db.js using Mongoose. It reads MONGODB_URI from the environment, applies a connection pool of 10, logs connected/disconnected events and exits the process on a fatal connection error. Models are registered in src/models.',
    sources: ['src/config/db.js', 'src/models/index.js'],
  },
  {
    match: ['registration', 'register', 'signup'],
    chunks: 4,
    answer:
      'User registration is handled by POST /api/auth/register. The payload is validated, the password is hashed with bcrypt (12 rounds), a verification token is generated and a welcome notification is queued through the notification service. Duplicate emails are rejected with a 409 response.',
    sources: ['src/routes/auth.routes.js', 'src/services/user.service.js'],
  },
  {
    match: ['payment', 'checkout', 'billing'],
    chunks: 5,
    answer:
      'Payment is handled in src/routes/payment.routes.js and src/services/payment.service.js. The client funds an escrow for a project, the payment webhook marks the project active, and funds are released to the developer only after client approval and admin verification. Platform fee is 10%.',
    sources: ['src/routes/payment.routes.js', 'src/services/payment.service.js', 'src/models/Payment.js'],
  },
  {
    match: ['improve', 'better', 'optimi'],
    chunks: 3,
    answer:
      'Based on the retrieved context, the highest-impact improvements in this repository are: (1) add input validation schemas to every route, (2) replace filter()[0] patterns with find(), and (3) add a compound index on projects { status, createdAt }. Each change reduces request latency and removes an entire class of runtime errors.',
    sources: ['src/routes/auth.routes.js', 'src/models/Project.js', 'src/utils/serializer.js'],
  },
]

export const codeImprovement = {
  title: 'getUser lookup in user.service.js',
  file: 'src/services/user.service.js',
  line: 24,
  original: `function getUser(id) {
  const results = users.filter(user => user.id === id);
  return results[0];
}`,
  improved: `function getUser(id) {
  return users.find(user => user.id === id);
}`,
  explanation:
    'find() directly returns the first matching element and avoids creating an unnecessary intermediate array. This is both faster for large collections and easier to read.',
  categories: [
    { name: 'Performance', score: 'High impact', note: 'Avoids allocating a second array on every lookup.' },
    { name: 'Readability', score: 'Improved', note: 'One line expresses the intent clearly.' },
    { name: 'Maintainability', score: 'Improved', note: 'Less code to maintain and test.' },
    { name: 'Security', score: 'Neutral', note: 'No security impact for this change.' },
    { name: 'Best Practices', score: 'Followed', note: 'Matches idiomatic JavaScript array usage.' },
  ],
}

export const readmeContent = `# TOM Backend

> Node.js/Express API powering the TOM platform — repository analysis, RAG-based code assistance, marketplace bidding and escrow payments.

## Description

TOM Backend exposes a REST API for GitHub repository ingestion, AI analysis pipelines, developer portfolios, client projects, bidding and a mocked escrow payment workflow. It is designed around a modular service layer so that AI and payment providers can be swapped without touching route handlers.

## Features

- JWT authentication with role-based access control (Developer / Client / Admin)
- GitHub repository sync, filtering and chunking pipeline
- RAG assistant: embeddings, vector search and grounded answers
- Repository analysis: quality, security, maintainability scoring
- README and project documentation generation
- Marketplace: projects, bids, milestones and messaging
- Escrow payment workflow with admin release
- Notification center with simulated real-time events

## Technologies

| Layer | Technology |
| --- | --- |
| Runtime | Node.js 20 |
| Framework | Express 4 |
| Database | MongoDB + Mongoose |
| Cache / Queue | Redis + BullMQ |
| Auth | JWT + bcrypt |
| AI | LLM provider + embeddings |
| Hosting | Nginx + PM2 |

## Project Structure

\`\`\`
src/
├── config/          # db, env, redis
├── middleware/      # auth, rbac, rate limit, errors
├── models/          # Mongoose schemas
├── routes/          # REST route modules
├── services/        # business logic
├── jobs/            # BullMQ workers
└── app.js           # express bootstrap
\`\`\`

## Installation

\`\`\`bash
git clone https://github.com/ali-khan/tom-backend.git
cd tom-backend
npm install
cp .env.example .env
npm run dev
\`\`\`

## Environment Variables

| Variable | Description |
| --- | --- |
| PORT | Server port (default 5000) |
| MONGODB_URI | MongoDB connection string |
| REDIS_URL | Redis connection URL |
| JWT_SECRET | Access token secret |
| GITHUB_TOKEN | GitHub API token |
| LLM_API_KEY | LLM provider key |

## API Documentation

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /api/auth/register | Register a new account |
| POST | /api/auth/login | Sign in and receive tokens |
| GET | /api/repos | List connected repositories |
| POST | /api/repos/:id/analyze | Queue repository analysis |
| POST | /api/ai/chat | Ask the repository assistant |
| GET | /api/projects | List marketplace projects |
| POST | /api/projects/:id/bids | Submit a bid |
| POST | /api/payments/checkout | Fund escrow |
| POST | /api/payments/release | Admin release |

## Usage

Start the development server, connect a repository from the dashboard, run an analysis, then open the AI Assistant to ask questions grounded in your codebase.

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch and open a Pull Request

## License

MIT © TOM Team
`

export const documentationContent = {
  abstract:
    'TOM (Train Optimal Model) is an AI-powered developer platform that combines GitHub repository intelligence with a client–developer marketplace. It ingests repositories, chunks and embeds source code, and exposes a retrieval-augmented generation (RAG) assistant that answers questions grounded in the actual codebase. Alongside analysis, it provides code improvement suggestions, README and documentation generation, developer portfolios, project bidding, milestone management and an escrow-style payment workflow with admin oversight.',
  technologyOverview: [
    { name: 'React 18 + Vite', role: 'Single-page application frontend with component-driven UI and fast refresh.' },
    { name: 'Tailwind CSS', role: 'Utility-first styling for a consistent design system across all portals.' },
    { name: 'React Router', role: 'Client-side routing with role-separated portals and public portfolio routes.' },
    { name: 'Node.js / Express', role: 'REST API layer with middleware for auth, RBAC and rate limiting.' },
    { name: 'MongoDB', role: 'Document storage for users, repositories, projects, bids and payments.' },
    { name: 'Redis / BullMQ', role: 'Queue-backed background processing for analysis and generation jobs.' },
    { name: 'GitHub API', role: 'Repository metadata, file tree retrieval and webhook synchronisation.' },
    { name: 'LLM + Vector Search', role: 'Embeddings, similarity search and grounded natural-language answers.' },
  ],
  repositoryStructure: `fypPrototype/
├── src/
│   ├── components/     # reusable UI + layout components
│   ├── context/        # global application state
│   ├── data/           # mock data seeds
│   ├── pages/          # landing, auth, developer, client, admin
│   └── services/       # mock service layer (auth, github, ai, payment, project)
├── index.html
├── tailwind.config.js
└── vite.config.js`,
  workflow: [
    'Client registers and publishes a project with budget, skills and deliverables.',
    'Developers browse the marketplace and submit bids with price, timeline and proposal.',
    'Client reviews bids, compares portfolios and accepts one bid.',
    'A project workspace is created with milestones, files and messaging.',
    'Client funds the escrow; payment status becomes Paid and the project activates.',
    'Developer completes milestones and marks work as submitted.',
    'Client reviews and approves the work, which flags the payment Pending Release.',
    'Admin verifies delivery and releases the payment to the developer.',
    'Complaints or disputes can be raised at any stage and are handled in the admin portal.',
  ],
  functionalRequirements: [
    'FR-01 The system shall allow developers to authenticate using GitHub OAuth or email/password.',
    'FR-02 The system shall allow clients to authenticate using Google or email/password.',
    'FR-03 The system shall synchronise and list a developer’s GitHub repositories.',
    'FR-04 The system shall analyse a selected repository for quality, security and maintainability.',
    'FR-05 The system shall chunk repository code and build embeddings for retrieval.',
    'FR-06 The system shall answer natural-language questions using retrieved repository context.',
    'FR-07 The system shall suggest concrete code improvements with before/after comparison.',
    'FR-08 The system shall generate a structured README for a selected repository.',
    'FR-09 The system shall generate full project documentation covering requirements and workflow.',
    'FR-10 The system shall publish a developer portfolio containing only selected repositories.',
    'FR-11 The system shall let clients create projects with budget, skills and deliverables.',
    'FR-12 The system shall let developers submit bids with price, delivery time and proposal.',
    'FR-13 The system shall let clients accept or reject bids and open a project workspace.',
    'FR-14 The system shall record an escrow payment, approval and admin release lifecycle.',
    'FR-15 The system shall deliver in-app notifications for all state changes.',
    'FR-16 The system shall let administrators manage users, complaints and bug reports.',
  ],
  nonFunctionalRequirements: [
    'NFR-01 Performance: dashboard pages shall render in under 2 seconds on a standard laptop.',
    'NFR-02 Scalability: background analysis jobs shall run on a queue so API response time is unaffected.',
    'NFR-03 Security: passwords shall be hashed, tokens shall expire and routes shall be RBAC-protected.',
    'NFR-04 Availability: the platform shall target 99.5% uptime with graceful error handling.',
    'NFR-05 Usability: the interface shall be responsive across desktop, laptop and tablet.',
    'NFR-06 Maintainability: services shall be isolated so real providers can replace mocks without UI changes.',
    'NFR-07 Reliability: payment state transitions shall be idempotent and fully audited.',
    'NFR-08 Portability: the frontend shall build to static assets deployable behind Nginx.',
  ],
}

export const initialProjects = [
  {
    id: 'prj-1',
    title: 'AI Code Review Assistant',
    description:
      'Build an ML-assisted code review service that scans pull requests for bugs, style drift and security issues, then posts inline comments back to GitHub.',
    clientId: 'cli-1',
    client: 'Nadia Hussain',
    company: 'Bright Labs',
    skills: ['Python', 'FastAPI', 'AI', 'GitHub API'],
    budget: 4500,
    delivery: '4 weeks',
    requirements: 'REST API, GitHub App integration, rule-based + ML scoring, dashboard for reviewers.',
    deliverables: ['Source repository', 'Deployment guide', 'Admin dashboard', 'Unit test suite'],
    status: 'open',
    createdAt: '2025-09-24',
    milestones: [],
  },
  {
    id: 'prj-2',
    title: 'E-commerce Analytics Dashboard',
    description:
      'Real-time analytics dashboard for an online store: sales funnel, cohort retention, top products and inventory alerts with exportable reports.',
    clientId: 'cli-2',
    client: 'Omar Farooq',
    company: 'Nordic Retail',
    skills: ['React', 'Node.js', 'MongoDB', 'Charting'],
    budget: 3200,
    delivery: '3 weeks',
    requirements: 'Live metrics, CSV export, role-based access, responsive layout.',
    deliverables: ['Web application', 'API documentation', 'CI pipeline'],
    status: 'in-progress',
    createdAt: '2025-09-10',
    acceptedBidId: 'bid-1',
    developer: 'Ali Khan',
    developerId: 'dev-1',
    milestones: [
      { name: 'Data model & API', done: true },
      { name: 'Dashboard UI', done: true },
      { name: 'Charts & export', done: false },
      { name: 'Deployment', done: false },
    ],
    progress: 55,
  },
  {
    id: 'prj-3',
    title: 'Patient Booking Portal',
    description:
      'Appointment booking portal for clinics with doctor schedules, SMS reminders and an admin panel for staff management.',
    clientId: 'cli-3',
    client: 'Fatima Sheikh',
    company: 'HealthPlus',
    skills: ['React', 'Express', 'PostgreSQL', 'Twilio'],
    budget: 5600,
    delivery: '6 weeks',
    requirements: 'Doctor availability calendar, patient auth, reminder jobs, admin reporting.',
    deliverables: ['Web app', 'SMS integration', 'Admin panel', 'Handover session'],
    status: 'in-progress',
    createdAt: '2025-08-28',
    acceptedBidId: 'bid-3',
    developer: 'Sara Ahmed',
    developerId: 'dev-2',
    milestones: [
      { name: 'Scheduling engine', done: true },
      { name: 'Booking UI', done: true },
      { name: 'Reminders', done: false },
    ],
    progress: 60,
  },
  {
    id: 'prj-4',
    title: 'CI/CD Pipeline Modernisation',
    description:
      'Migrate legacy Jenkins pipelines to GitHub Actions with matrix builds, caching, artifact publishing and automated release tagging.',
    clientId: 'cli-1',
    client: 'Nadia Hussain',
    company: 'Bright Labs',
    skills: ['DevOps', 'GitHub Actions', 'Docker'],
    budget: 2800,
    delivery: '2 weeks',
    requirements: 'Pipeline migration, build cache, secret management, rollback strategy.',
    deliverables: ['Workflow files', 'Runbook', 'Training notes'],
    status: 'submitted',
    createdAt: '2025-08-15',
    acceptedBidId: 'bid-6',
    developer: 'Usman Tariq',
    developerId: 'dev-5',
    milestones: [
      { name: 'Audit', done: true },
      { name: 'Workflow migration', done: true },
      { name: 'Release automation', done: true },
    ],
    progress: 100,
  },
  {
    id: 'prj-5',
    title: 'Inventory Microservice',
    description:
      'Event-driven inventory service with Redis-backed stock reservations, idempotent consumers and an operations dashboard.',
    clientId: 'cli-2',
    client: 'Omar Farooq',
    company: 'Nordic Retail',
    skills: ['Node.js', 'Redis', 'BullMQ', 'Docker'],
    budget: 3900,
    delivery: '4 weeks',
    requirements: 'Reservation API, event consumers, audit log, monitoring endpoints.',
    deliverables: ['Service code', 'Docker compose stack', 'Load test report'],
    status: 'completed',
    createdAt: '2025-07-02',
    acceptedBidId: 'bid-8',
    developer: 'Bilal Raza',
    developerId: 'dev-3',
    milestones: [
      { name: 'Reservation API', done: true },
      { name: 'Event consumers', done: true },
      { name: 'Dashboard', done: true },
    ],
    progress: 100,
  },
  {
    id: 'prj-6',
    title: 'Learning Management Portal',
    description:
      'Portal for institutes with course builder, quizzes, student progress tracking and certificate generation.',
    clientId: 'cli-5',
    client: 'Maryam Noor',
    company: 'EduSpark',
    skills: ['React', 'Node.js', 'MongoDB'],
    budget: 6200,
    delivery: '8 weeks',
    requirements: 'Course authoring, quiz engine, progress analytics, PDF certificates.',
    deliverables: ['Web platform', 'Admin console', 'Documentation'],
    status: 'open',
    createdAt: '2025-09-30',
    milestones: [],
  },
]

export const initialBids = [
  { id: 'bid-1', projectId: 'prj-2', developer: 'Ali Khan', developerId: 'dev-1', price: 3000, delivery: '3 weeks', proposal: 'I have delivered four analytics dashboards in React + Node. I will start with the data model, ship the dashboard UI in week two and finish charts/export in week three.', rating: 4.9, status: 'accepted', createdAt: '2025-09-12' },
  { id: 'bid-2', projectId: 'prj-2', developer: 'Hina Malik', developerId: 'dev-4', price: 3150, delivery: '4 weeks', proposal: 'Frontend-focused proposal: I will build a pixel-accurate responsive dashboard and integrate the charting layer with your existing API.', rating: 4.6, status: 'rejected', createdAt: '2025-09-13' },
  { id: 'bid-3', projectId: 'prj-3', developer: 'Sara Ahmed', developerId: 'dev-2', price: 5300, delivery: '6 weeks', proposal: 'Experience building clinic scheduling systems. Includes SMS reminder jobs and staff admin panel with reporting.', rating: 4.8, status: 'accepted', createdAt: '2025-08-30' },
  { id: 'bid-4', projectId: 'prj-3', developer: 'Ali Khan', developerId: 'dev-1', price: 5400, delivery: '7 weeks', proposal: 'Full-stack delivery with React frontend, Express API and Postgres schema, plus Twilio reminder workflow.', rating: 4.9, status: 'rejected', createdAt: '2025-08-31' },
  { id: 'bid-5', projectId: 'prj-3', developer: 'Bilal Raza', developerId: 'dev-3', price: 5000, delivery: '8 weeks', proposal: 'Backend-heavy approach with strong emphasis on the reminder job reliability and audit logging.', rating: 4.7, status: 'rejected', createdAt: '2025-09-01' },
  { id: 'bid-6', projectId: 'prj-4', developer: 'Usman Tariq', developerId: 'dev-5', price: 2600, delivery: '2 weeks', proposal: 'Migrated 12 repos from Jenkins to GitHub Actions last quarter. Includes caching, matrix builds and rollback runbook.', rating: 4.9, status: 'accepted', createdAt: '2025-08-17' },
  { id: 'bid-7', projectId: 'prj-4', developer: 'Bilal Raza', developerId: 'dev-3', price: 2750, delivery: '3 weeks', proposal: 'I will migrate pipelines, containerise build steps and document the secret management strategy.', rating: 4.7, status: 'rejected', createdAt: '2025-08-18' },
  { id: 'bid-8', projectId: 'prj-5', developer: 'Bilal Raza', developerId: 'dev-3', price: 3700, delivery: '4 weeks', proposal: 'Event-driven architecture with Redis reservations is my core speciality. Includes idempotent consumers and ops dashboard.', rating: 4.7, status: 'accepted', createdAt: '2025-07-05' },
  { id: 'bid-9', projectId: 'prj-1', developer: 'Sara Ahmed', developerId: 'dev-2', price: 4300, delivery: '4 weeks', proposal: 'Built a similar PR reviewer using AST parsing plus an LLM scorer. I can deliver the GitHub App and dashboard within four weeks.', rating: 4.8, status: 'pending', createdAt: '2025-09-26' },
  { id: 'bid-10', projectId: 'prj-6', developer: 'Ali Khan', developerId: 'dev-1', price: 5900, delivery: '7 weeks', proposal: 'Complete LMS delivery: course builder, quiz engine, progress analytics and PDF certificate generation.', rating: 4.9, status: 'pending', createdAt: '2025-10-01' },
]

export const initialPayments = [
  { id: 'pay-1', project: 'Inventory Microservice', client: 'Omar Farooq', developer: 'Bilal Raza', amount: 3900, status: 'Released', date: '2025-08-02' },
  { id: 'pay-2', project: 'E-commerce Analytics Dashboard', client: 'Nadia Hussain', developer: 'Ali Khan', amount: 3200, status: 'Paid', date: '2025-09-14' },
  { id: 'pay-3', project: 'Patient Booking Portal', client: 'Fatima Sheikh', developer: 'Sara Ahmed', amount: 5600, status: 'Paid', date: '2025-09-02' },
  { id: 'pay-4', project: 'CI/CD Pipeline Modernisation', client: 'Nadia Hussain', developer: 'Usman Tariq', amount: 2800, status: 'Pending Release', date: '2025-08-20' },
  { id: 'pay-5', project: 'Chat Widget Integration', client: 'Maryam Noor', developer: 'Hina Malik', amount: 1450, status: 'Refunded', date: '2025-07-19' },
  { id: 'pay-6', project: 'Search Index Rebuild', client: 'Omar Farooq', developer: 'Usman Tariq', amount: 2100, status: 'Released', date: '2025-06-11' },
  { id: 'pay-7', project: 'Mobile API Gateway', client: 'Fatima Sheikh', developer: 'Bilal Raza', amount: 4700, status: 'Pending Release', date: '2025-09-28' },
  { id: 'pay-8', project: 'Design System Upgrade', client: 'Nadia Hussain', developer: 'Hina Malik', amount: 1900, status: 'Paid', date: '2025-10-02' },
]

export const initialComplaints = [
  { id: 'CMP-1041', project: 'Chat Widget Integration', reportedBy: 'Maryam Noor', against: 'Hina Malik', reason: 'Delivered scope did not match the agreed requirements.', status: 'Open', date: '2025-07-22' },
  { id: 'CMP-1042', project: 'Search Index Rebuild', reportedBy: 'Omar Farooq', against: 'Usman Tariq', reason: 'Two-day delay without prior communication.', status: 'Under Review', date: '2025-06-14' },
  { id: 'CMP-1043', project: 'Mobile API Gateway', reportedBy: 'Fatima Sheikh', against: 'Bilal Raza', reason: 'Payment release dispute after milestone approval.', status: 'Under Review', date: '2025-09-30' },
  { id: 'CMP-1044', project: 'Inventory Microservice', reportedBy: 'Bilal Raza', against: 'Omar Farooq', reason: 'Client unresponsive during final acceptance review.', status: 'Resolved', date: '2025-08-06' },
  { id: 'CMP-1045', project: 'E-commerce Analytics Dashboard', reportedBy: 'Hina Malik', against: 'Nadia Hussain', reason: 'Unfair bid rejection without feedback.', status: 'Resolved', date: '2025-09-16' },
]

export const initialBugs = [
  { id: 'BUG-217', bug: 'Repository sync occasionally duplicates file chunks after re-analysis.', reportedBy: 'Ali Khan', severity: 'High', status: 'Open', date: '2025-10-01' },
  { id: 'BUG-218', bug: 'Notification badge count does not clear when all items are read.', reportedBy: 'Sara Ahmed', severity: 'Low', status: 'In Progress', date: '2025-09-27' },
  { id: 'BUG-219', bug: 'README preview mis-renders nested code fences.', reportedBy: 'Hina Malik', severity: 'Medium', status: 'In Progress', date: '2025-09-25' },
  { id: 'BUG-220', bug: 'Payment release button remains enabled for non-admin roles.', reportedBy: 'Hamza Iqbal', severity: 'High', status: 'Resolved', date: '2025-09-18' },
  { id: 'BUG-221', bug: 'Portfolio share link copies with a trailing slash on tablet widths.', reportedBy: 'Bilal Raza', severity: 'Low', status: 'Resolved', date: '2025-09-05' },
]

export const initialNotifications = [
  { id: 'ntf-1', role: 'developer', title: 'Your bid was accepted.', detail: 'Nadia Hussain accepted your bid on E-commerce Analytics Dashboard.', time: '12 min ago', read: false, type: 'success' },
  { id: 'ntf-2', role: 'developer', title: 'Repository synchronization completed.', detail: 'TOM-Backend synced 14 changed files.', time: '1 hour ago', read: false, type: 'info' },
  { id: 'ntf-3', role: 'developer', title: 'AI documentation generated successfully.', detail: 'Project documentation for TOM-Frontend is ready to download.', time: '3 hours ago', read: true, type: 'ai' },
  { id: 'ntf-4', role: 'developer', title: 'Payment has been released.', detail: '$3,510 released for Inventory Microservice after admin verification.', time: '1 day ago', read: true, type: 'payment' },
  { id: 'ntf-5', role: 'developer', title: 'New project matches your skills.', detail: 'AI Code Review Assistant requires Python, FastAPI and AI.', time: '2 days ago', read: true, type: 'info' },
  { id: 'ntf-6', role: 'client', title: 'New bid received on your project.', detail: 'Sara Ahmed submitted a $4,300 proposal for AI Code Review Assistant.', time: '8 min ago', read: false, type: 'info' },
  { id: 'ntf-7', role: 'client', title: 'Developer submitted the project.', detail: 'Usman Tariq marked CI/CD Pipeline Modernisation as submitted.', time: '4 hours ago', read: false, type: 'success' },
  { id: 'ntf-8', role: 'client', title: 'Milestone completed.', detail: 'Ali Khan completed “Charts & export” on your analytics dashboard.', time: '1 day ago', read: true, type: 'info' },
  { id: 'ntf-9', role: 'admin', title: 'Payment pending release.', detail: 'CI/CD Pipeline Modernisation — $2,800 awaiting verification.', time: '30 min ago', read: false, type: 'payment' },
  { id: 'ntf-10', role: 'admin', title: 'New complaint filed.', detail: 'CMP-1043 filed against a developer on Mobile API Gateway.', time: '2 hours ago', read: false, type: 'warning' },
]

export const systemActivity = [
  { id: 'act-1', event: 'Repository analysis job completed', target: 'TOM-Backend', actor: 'BullMQ worker', time: '2025-10-06 14:22' },
  { id: 'act-2', event: 'Payment released to developer', target: 'Inventory Microservice', actor: 'Hamza Iqbal', time: '2025-10-06 11:04' },
  { id: 'act-3', event: 'User suspended', target: 'zain@fintrack.app', actor: 'Ayesha Noor', time: '2025-10-05 17:48' },
  { id: 'act-4', event: 'Project published', target: 'Learning Management Portal', actor: 'Maryam Noor', time: '2025-10-05 09:31' },
  { id: 'act-5', event: 'Complaint status updated → Resolved', target: 'CMP-1045', actor: 'Hamza Iqbal', time: '2025-10-04 16:12' },
  { id: 'act-6', event: 'RAG index rebuilt (12,844 chunks)', target: 'TOM-Backend', actor: 'System', time: '2025-10-04 03:00' },
]

export const ragSteps = [
  { key: 'repo', label: 'GitHub Repository', hint: 'Clone / webhook sync' },
  { key: 'filter', label: 'File Filtering', hint: 'Drop binaries & lockfiles' },
  { key: 'chunk', label: 'Code Chunking', hint: 'AST-aware 512-token chunks' },
  { key: 'embed', label: 'Embeddings', hint: 'Vector representation' },
  { key: 'search', label: 'Vector Search', hint: 'Top-k similarity' },
  { key: 'context', label: 'Relevant Context', hint: 'Ranked source snippets' },
  { key: 'llm', label: 'LLM', hint: 'Grounded generation' },
  { key: 'response', label: 'AI Response', hint: 'Answer + citations' },
]

export const architectureLayers = [
  { title: 'React Frontend', desc: 'SPA with role-based portals, built by Vite and served as static assets.', tone: 'bg-brand-50 text-brand-700 border-brand-200' },
  { title: 'Nginx', desc: 'Reverse proxy, TLS termination, static caching and rate limiting at the edge.', tone: 'bg-slate-100 text-slate-700 border-slate-200' },
  { title: 'Node.js / Express', desc: 'REST API with auth, RBAC, validation and service-layer business logic.', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { title: 'MongoDB', desc: 'Document store for users, repositories, projects, bids, payments and logs.', tone: 'bg-lime-50 text-lime-700 border-lime-200' },
  { title: 'Redis / BullMQ', desc: 'Queue and cache powering background analysis, generation and notification jobs.', tone: 'bg-rose-50 text-rose-700 border-rose-200' },
  { title: 'GitHub API', desc: 'Repository metadata, file trees and webhook-driven synchronisation.', tone: 'bg-slate-900 text-white border-slate-800' },
  { title: 'LLM', desc: 'Generates grounded answers, improvements, README and documentation.', tone: 'bg-violet-50 text-violet-700 border-violet-200' },
  { title: 'Vector Search', desc: 'Similarity search over code embeddings to retrieve relevant context.', tone: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
]

export const crossCutting = [
  { title: 'Authentication', desc: 'JWT access + refresh tokens, OAuth placeholders for GitHub and Google.' },
  { title: 'RBAC', desc: 'Developer, Client and Admin role guards on every protected route.' },
  { title: 'Rate Limiting', desc: 'Sliding-window limits per API key and per user session.' },
  { title: 'Background Processing', desc: 'Queue workers for analysis, embeddings and document generation.' },
  { title: 'Notifications', desc: 'Event-driven in-app notification feed simulated in this prototype.' },
]

export const features = [
  { icon: 'Github', title: 'Repository AI', desc: 'Connect GitHub repositories and keep them synchronised with one click.' },
  { icon: 'ScanSearch', title: 'Code Analysis', desc: 'Quality, security and maintainability scoring across your whole codebase.' },
  { icon: 'Sparkles', title: 'AI Code Improvement', desc: 'Before/after rewrites with explanations across five improvement categories.' },
  { icon: 'FileText', title: 'README Generation', desc: 'Structured, formatted README generated from your repository structure.' },
  { icon: 'BookOpen', title: 'Project Documentation', desc: 'Abstract, workflow, functional and non-functional requirements on demand.' },
  { icon: 'UserRound', title: 'Developer Portfolio', desc: 'A shareable public portfolio built from your selected repositories.' },
  { icon: 'Store', title: 'Client Marketplace', desc: 'Post projects, receive bids and hire verified developers with ratings.' },
]

export const platformStats = [
  { label: 'Repositories analyzed', value: '12,847' },
  { label: 'Active developers', value: '1,240' },
  { label: 'Projects delivered', value: '683' },
  { label: 'AI questions answered', value: '94,510' },
]
