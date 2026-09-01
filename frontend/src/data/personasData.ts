import { UserAccount, UserRole, InterviewQuestion } from '../types/navigator';

export const predefinedPersonas: Record<UserRole, UserAccount> = {
  student: {
    id: 'user-student',
    name: 'Alex Rivera',
    email: 'alex.student@devopsnav.io',
    role: 'student',
    avatarText: 'AR',
    joinedDate: 'Joined Aug 2026',
    bio: 'DevOps Beginner exploring fundamentals, CAMS culture, and basic pipeline syntax.'
  },
  developer: {
    id: 'user-developer',
    name: 'Sarah Chen',
    email: 'sarah.dev@enterprise.io',
    role: 'developer',
    avatarText: 'SC',
    joinedDate: 'Joined Jul 2026',
    bio: 'Full-Stack Software Engineer building microservices and automating CI/CD workflows.'
  },
  architect: {
    id: 'user-architect',
    name: 'Marcus Vance',
    email: 'marcus.architect@cloudscale.io',
    role: 'architect',
    avatarText: 'MV',
    joinedDate: 'Joined May 2026',
    bio: 'Principal Platform Architect designing enterprise multi-cloud infrastructure and GitOps.'
  },
  jobseeker: {
    id: 'user-jobseeker',
    name: 'Priya Sharma',
    email: 'priya.devops@careerhub.io',
    role: 'jobseeker',
    avatarText: 'PS',
    joinedDate: 'Joined Aug 2026',
    bio: 'DevOps & SRE Job Aspirant mastering scenario-based interview questions and DORA metrics.'
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
