import { UserAccount, UserRole, InterviewQuestion } from '../types/navigator';

export const predefinedPersonas: Record<UserRole, UserAccount> = {
  student: {
    id: 'user-student',
    name: 'Alex Rivera',
    email: 'alex.student@devopsnav.io',
    role: 'student',
    title: 'Student / Beginner',
    avatarText: 'AR',
    joinedDate: 'Joined Aug 2026',
    bio: 'DevOps beginner learning CAMS philosophy, 8-phase lifecycle, automated testing, and container basics.'
  },
  developer: {
    id: 'user-developer',
    name: 'Sarah Chen',
    email: 'sarah.dev@enterprise.io',
    role: 'developer',
    title: 'Software Developer',
    avatarText: 'SC',
    joinedDate: 'Joined Jul 2026',
    bio: 'Full-Stack Software Engineer building microservices, authoring YAML pipelines, and Dockerizing applications.'
  },
  architect: {
    id: 'user-architect',
    name: 'Marcus Vance',
    email: 'marcus.architect@cloudscale.io',
    role: 'architect',
    title: 'Tech Lead / Architect',
    avatarText: 'MV',
    joinedDate: 'Joined May 2026',
    bio: 'Principal Platform Architect evaluating cloud toolchains, calculating TCO ROI, and designing GitOps security.'
  },
  jobseeker: {
    id: 'user-jobseeker',
    name: 'Priya Sharma',
    email: 'priya.devops@careerhub.io',
    role: 'jobseeker',
    title: 'DevOps Job Aspirant',
    avatarText: 'PS',
    joinedDate: 'Joined Aug 2026',
    bio: 'DevOps & SRE candidate preparing for scenario-based technical interviews, DORA metrics, and resume talking points.'
  }
};

// Role-Based Persona Config
export const rolePermissions: Record<UserRole, {
  roleTitle: string;
  badgeClass: string;
  primaryFocus: string;
  description: string;
  navItems: { id: string; label: string; badge?: string }[];
  keyFeatures: string[];
}> = {
  student: {
    roleTitle: 'Student / Beginner',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    primaryFocus: 'DevOps Foundations & Hands-On Practice',
    description: 'Designed for beginners to master DevOps fundamentals, run interactive simulations, and test their knowledge with quizzes.',
    navItems: [
      { id: 'home', label: 'Home' },
      { id: 'learn', label: 'Curriculum (6 Modules)' },
      { id: 'labs', label: 'Interactive Labs & Simulators', badge: 'Demos' },
      { id: 'master-quiz', label: 'Master Quiz (30 Qs)', badge: 'Score' },
      { id: 'dashboard', label: 'Student Dashboard' }
    ],
    keyFeatures: [
      '6 Comprehensive DevOps Learning Modules with code snippets',
      'Real-Time 8-Stage Lifecycle Terminal Simulator',
      'CI vs CD vs CD+ Interactive Execution Flow Playground',
      'End-of-Lesson Quizzes & 30-Question Assessment with Scorecards',
      'Local learning progress tracking & completion checklists'
    ]
  },
  developer: {
    roleTitle: 'Software Developer',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    primaryFocus: 'CI/CD Pipelines & YAML Automation',
    description: 'Tailored for software engineers building microservices, authoring YAML workflow files, and exploring build engines.',
    navItems: [
      { id: 'home', label: 'Home' },
      { id: 'platforms', label: 'CI/CD Platforms (8 Tools)', badge: 'Engines' },
      { id: 'yaml-gen', label: 'YAML Generator', badge: 'Tool' },
      { id: 'labs', label: 'Execution Playground' },
      { id: 'bookmarks', label: 'Saved Templates' },
      { id: 'dashboard', label: 'Developer Dashboard' }
    ],
    keyFeatures: [
      'Catalog of 8 Industry CI/CD Engines with syntax & pros/cons',
      'Interactive YAML Pipeline Generator for Node, Python, Go, Java',
      'Live execution pipeline runner with staging & production gates',
      'Personal bookmarked platform configs and pipeline templates',
      'Docker container image building & Kubernetes manifests integration'
    ]
  },
  architect: {
    roleTitle: 'Tech Lead / Architect',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    primaryFocus: 'Enterprise Tool Evaluation & Cost Optimization',
    description: 'Engineered for platform architects and team leads deciding tooling, calculating ROI, and reviewing security governance.',
    navItems: [
      { id: 'home', label: 'Home' },
      { id: 'platforms', label: 'Platforms Catalog' },
      { id: 'compare', label: 'Comparison Matrix', badge: 'Compare' },
      { id: 'governance', label: 'TCO & Cost Calculator', badge: 'ROI' },
      { id: 'labs', label: 'ArgoCD Canary Lab' },
      { id: 'dashboard', label: 'Architect Dashboard' }
    ],
    keyFeatures: [
      'Side-by-Side Platform Comparison Matrix (13 Evaluation Criteria)',
      'Cloud SaaS vs Self-Hosted TCO ROI Cost Calculator with team scaling',
      'Enterprise Compliance Checklist: OPA Policy-as-Code, SOC2, Air-Gapped',
      'ArgoCD GitOps Canary Rollout & Prometheus Auto-Rollback Simulation',
      'Executive tooling trade-offs, licensing models, and deployment strategies'
    ]
  },
  jobseeker: {
    roleTitle: 'DevOps Job Aspirant',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    primaryFocus: 'Interview Mastery & DORA Metrics',
    description: 'Built for job candidates preparing for DevOps/SRE interviews, practicing scenario questions, and boosting resumes.',
    navItems: [
      { id: 'home', label: 'Home' },
      { id: 'interview-prep', label: 'Scenario Interview Q&A', badge: '25+ Qs' },
      { id: 'master-quiz', label: 'Interview Readiness Quiz', badge: '30 Qs' },
      { id: 'platforms', label: 'Platforms Review' },
      { id: 'learn', label: 'Foundations Reference' },
      { id: 'dashboard', label: 'Aspirant Career Hub' }
    ],
    keyFeatures: [
      '25+ Real-World Scenario-Based Technical Interview Questions & Answers',
      '4 DORA Metrics Framework & Elite Performance Thresholds',
      '1-Click Copyable Portfolio Resume Talking Points for LinkedIn',
      '30-Question Assessment with detailed concept scorecards',
      'Production incident troubleshooting scenarios and answers'
    ]
  }
};

export const interviewQuestionsData: InterviewQuestion[] = [
  {
    id: 'q1',
    category: 'CI/CD',
    difficulty: 'Mid',
    question: 'What is the exact technical difference between Continuous Delivery and Continuous Deployment?',
    answer: 'In Continuous Delivery, code is automatically tested, built, and staged in a releasable state, but deployment to production requires a manual human approval button. In Continuous Deployment, every passing commit is automatically pushed to production without human intervention.',
    keyKeywords: ['Manual Gate', 'Continuous Delivery', 'Continuous Deployment', 'Staging Environment']
  },
  {
    id: 'q2',
    category: 'Kubernetes',
    difficulty: 'Senior',
    question: 'How does ArgoCD GitOps improve security over traditional push-based CI/CD like Jenkins?',
    answer: 'Traditional push-based CI tools require direct cluster admin credentials (kubeconfig) stored on the CI runner, creating a security blast radius. ArgoCD uses a pull-based model running inside the Kubernetes cluster: it pulls manifests from Git and syncs them locally. No external CI runner ever needs cluster credentials.',
    keyKeywords: ['Pull vs Push', 'Cluster Admin Credentials', 'Git as Single Source of Truth', 'CRD Controllers']
  },
  {
    id: 'q3',
    category: 'Architecture',
    difficulty: 'Senior',
    question: 'What are the 4 DORA metrics and how do top engineering organizations measure them?',
    answer: '1. Deployment Frequency (How often code deploys to production)\n2. Lead Time for Changes (Time from commit to production release)\n3. Change Failure Rate (Percentage of deployments causing production outages)\n4. Mean Time to Recovery - MTTR (Time required to restore service after an incident)',
    keyKeywords: ['DORA Metrics', 'Deployment Frequency', 'Lead Time', 'Change Failure Rate', 'MTTR']
  },
  {
    id: 'q4',
    category: 'CI/CD',
    difficulty: 'Junior',
    question: 'What is Trunk-Based Development and why is it preferred over long-lived GitFlow branches?',
    answer: 'Trunk-Based Development is a branching strategy where developers merge short-lived branches (< 1-2 days) into the main trunk frequently. It eliminates "Merge Hell", enables true Continuous Integration, and uses Feature Flags to release unfinished code safely.',
    keyKeywords: ['Trunk-Based', 'Merge Hell', 'Short-lived branches', 'Feature Flags']
  },
  {
    id: 'q5',
    category: 'Architecture',
    difficulty: 'Senior',
    question: 'Explain Blue-Green Deployment vs Canary Deployment with rollback strategies.',
    answer: 'Blue-Green provisions two identical production environments (Blue is live, Green is new). Traffic flips 100% instantly via load balancer, allowing instant rollback by flipping back. Canary deploys the new version to a tiny subset of users (e.g. 5%), monitors Prometheus golden error signals, and gradually scales to 100% or rolls back automatically if error thresholds are exceeded.',
    keyKeywords: ['Blue-Green', 'Canary Rollout', 'Instant Rollback', 'Prometheus Error Budgets']
  },
  {
    id: 'q6',
    category: 'GitOps',
    difficulty: 'Mid',
    question: 'What is Configuration Drift in Infrastructure as Code (Terraform) and how is it resolved?',
    answer: 'Configuration drift occurs when manual changes are made directly to cloud resources (e.g., via AWS Console) outside of Terraform code. Running `terraform plan` detects differences between actual cloud state and state files. Running `terraform apply` overwrites and reconciles the drift back to Git declared state.',
    keyKeywords: ['Drift Detection', 'State Reconcile', 'Immutable Infrastructure', 'terraform plan']
  }
];
