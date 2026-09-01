import { LearningTopic } from '../types/navigator';

export const learningTopicsData: LearningTopic[] = [
  {
    id: 'topic-1',
    slug: 'intro-to-devops',
    title: 'Introduction to DevOps',
    shortDescription: 'Understand the core philosophy, cultural shift, and history bridging software development and IT operations.',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    estimatedTime: '10 mins',
    order: 1,
    overview: 'DevOps is a set of practices, cultural philosophies, and tools that increases an organization’s ability to deliver applications and services at high velocity, evolving and improving products faster than traditional software development processes.',
    keyTakeaways: [
      'DevOps is primarily a cultural shift supported by automated tooling (CAMS framework).',
      'Breaks down silos between software developers (Dev) and system operators (Ops).',
      'Shortens the systems development life cycle while delivering features, fixes, and updates frequently in close alignment with business objectives.'
    ],
    sections: [
      {
        heading: '1. The Problem DevOps Solves: The "Wall of Confusion"',
        body: 'Traditionally, Software Developers (Dev) were rewarded for shipping new features rapidly, while IT Operations (Ops) were measured on infrastructure stability and uptime. This created opposing incentives: Dev threw code over the wall, and Ops resisted deployments to prevent outages. DevOps removes this wall by creating shared accountability across the entire software delivery lifecycle.'
      },
      {
        heading: '2. The CAMS Framework',
        body: 'John Willis and Damon Edwards coined the CAMS model to define the pillars of a mature DevOps culture:\n• Culture: Shared ownership, psychological safety, and blameless post-mortems.\n• Automation: Automating repetitive tasks across testing, provisioning, and deployment.\n• Measurement: Tracking actionable metrics like Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Recovery (DORA metrics).\n• Sharing: Open communication and cross-functional feedback loops.',
        tipOrNote: 'Tip: Tools alone do not equal DevOps. Automating broken processes without cultural collaboration will only produce broken deployments faster.'
      },
      {
        heading: '3. Real-World Workflow Comparison',
        body: 'In traditional models, releases happened every 6 to 12 months with massive multi-day manual deployment windows. In DevOps, code is integrated multiple times per day and deployed automatically in small, low-risk increments.',
        codeSnippet: {
          language: 'bash',
          filename: 'traditional-vs-devops.sh',
          code: `# Traditional Waterfall/Siloed Workflow:
# Plan (3 months) -> Code (4 months) -> QA Testing (2 months) -> Manual Deploy (High Risk Outage)

# Modern DevOps Workflow:
# Small Commit -> Automated Test Suite (< 5 mins) -> Auto Deploy to Staging -> Canary to Production (< 1 hour)`
        }
      }
    ]
  },
  {
    id: 'topic-2',
    slug: 'devops-lifecycle',
    title: 'The DevOps Lifecycle & Continuous Feedback',
    shortDescription: 'Explore the 8 interconnected phases of the DevOps infinite loop from planning and coding to monitoring.',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    estimatedTime: '12 mins',
    order: 2,
    overview: 'The DevOps lifecycle is depicted as an infinite loop comprising eight iterative phases. Rather than a linear waterfall path, teams continuously iterate through planning, building, releasing, operating, and monitoring.',
    keyTakeaways: [
      'The 8 stages: Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor.',
      'Continuous Feedback loops feed operational insights back into the planning stage.',
      'Shift-Left strategy introduces testing and security scans early in the Code/Build phases.'
    ],
    sections: [
      {
        heading: '1. Left Loop: Development Phases',
        body: '• Plan: Agile sprint planning, user stories, and backlog management (Jira, Linear, GitHub Issues).\n• Code: Writing source code, branch management, and peer pull requests (Git, GitHub, GitLab).\n• Build: Compiling code, packaging binaries, and creating container images (Maven, npm, Docker).\n• Test: Automated unit tests, integration tests, and security vulnerability scans (Vitest, Jest, Trivy).'
      },
      {
        heading: '2. Right Loop: Operations Phases',
        body: '• Release: Version tagging, changelog generation, and pre-deployment verification (Semantic Versioning, Helm charts).\n• Deploy: Automated rollout to cloud infrastructure (ArgoCD, Kubernetes, Terraform).\n• Operate: Managing runtime infrastructure, scaling, and secret rotations (Kubernetes, AWS ECS, Vault).\n• Monitor: Real-time telemetry, golden signals, and alert triaging (Prometheus, Grafana, Datadog).'
      },
      {
        heading: '3. The Shift-Left Security Philosophy',
        body: 'Shift-Left means moving testing, compliance checks, and security auditing earlier in the lifecycle (into the Developer IDE and PR checks) rather than discovering vulnerabilities in production.'
      }
    ]
  },
  {
    id: 'topic-3',
    slug: 'ci-fundamentals',
    title: 'Continuous Integration (CI) Fundamentals',
    shortDescription: 'Master the practice of merging code changes frequently with automated builds and unit test verification.',
    category: 'CI/CD',
    difficulty: 'Beginner',
    estimatedTime: '15 mins',
    order: 3,
    overview: 'Continuous Integration (CI) is a software development practice where developers regularly merge their code changes into a central repository, after which automated builds and tests are executed.',
    keyTakeaways: [
      'CI eliminates "Merge Hell" by encouraging frequent, small code integrations.',
      'Every commit triggers an automated build and test runner.',
      'Fast feedback (< 10 mins) allows developers to fix defects immediately while context is fresh.'
    ],
    sections: [
      {
        heading: '1. Core Tenets of Effective CI',
        body: '• Maintain a Single Source Repository: Everything required to build the product lives in Git.\n• Automate the Build: A single command should compile, bundle, and package the entire software.\n• Make Your Build Self-Testing: Unit and integration tests must run automatically without human intervention.\n• Keep the Build Fast: Builds taking longer than 10-15 minutes cause developers to context-switch and ignore test failures.'
      },
      {
        heading: '2. Trunk-Based Development vs GitFlow',
        body: 'Modern CI strongly favors Trunk-Based Development over long-lived feature branches. Developers create short-lived branches (< 1-2 days) and merge into the main branch frequently, using Feature Flags to toggle unfinished functionality safely in production.'
      },
      {
        heading: '3. A Basic CI Configuration Anatomy',
        body: 'Here is what an automated CI workflow definition looks like in standard YAML:',
        codeSnippet: {
          language: 'yaml',
          filename: '.github/workflows/ci.yml',
          code: `name: Continuous Integration
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Static Analysis & Linter
        run: npm run lint

      - name: Execute Automated Unit Tests
        run: npm test -- --coverage`
        }
      }
    ]
  },
  {
    id: 'topic-4',
    slug: 'cd-fundamentals',
    title: 'Continuous Delivery vs Continuous Deployment',
    shortDescription: 'Understand automated release strategies, environment stages, and safe deployment patterns.',
    category: 'CI/CD',
    difficulty: 'Intermediate',
    estimatedTime: '14 mins',
    order: 4,
    overview: 'While Continuous Integration focuses on building and validating code, Continuous Delivery (CD) ensures that code is always in a releasable state. Continuous Deployment takes it one step further by automatically releasing validated changes straight to end-users.',
    keyTakeaways: [
      'Continuous Delivery: Code is automatically tested and staged; production release requires manual human sign-off.',
      'Continuous Deployment: Every passing change is automatically deployed to production with zero manual approval.',
      'Deployment strategies (Blue-Green, Canary, Rolling) minimize downtime and prevent catastrophic blast radius.'
    ],
    sections: [
      {
        heading: '1. The Key Difference: Delivery vs Deployment',
        body: '• Continuous Delivery: Automated testing -> Automated staging deployment -> [Manual Approval Button] -> Production.\n• Continuous Deployment: Automated testing -> Automated staging deployment -> Automated production deployment (No human gates).'
      },
      {
        heading: '2. Modern Deployment Strategies',
        body: '• Rolling Deployment: Progressively replaces old container instances with new ones across a cluster (Zero downtime, default Kubernetes behavior).\n• Blue-Green Deployment: Provisions two identical environments. Production points to "Blue"; new version deploys to "Green". Once Green is verified, load balancer router flips traffic instantly to Green.\n• Canary Deployment: Routes a tiny fraction of user traffic (e.g., 5%) to the new release. Observes error rates and latency. If metrics remain healthy, traffic scales to 100%; otherwise, automatically rolls back.'
      },
      {
        heading: '3. Canary Release Configuration Example',
        body: 'Canary deployments are commonly orchestrated via Argo Rollouts or Kubernetes Ingress rules:',
        codeSnippet: {
          language: 'yaml',
          filename: 'k8s/canary-rollout.yaml',
          code: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api-service-rollout
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10   # Route 10% traffic to new version
        - pause: { duration: 5m } # Monitor Prometheus error metrics for 5 mins
        - setWeight: 50   # If healthy, increase traffic to 50%
        - pause: { duration: 10m }
        - setWeight: 100  # Promote to 100% production traffic`
        }
      }
    ]
  },
  {
    id: 'topic-5',
    slug: 'cicd-pipelines-dag',
    title: 'Anatomy of a CI/CD Pipeline & DAG Execution',
    shortDescription: 'Deep dive into Stages, Jobs, Steps, Artifacts, Caching, and Directed Acyclic Graph (DAG) dependencies.',
    category: 'Pipelines',
    difficulty: 'Intermediate',
    estimatedTime: '16 mins',
    order: 5,
    overview: 'A CI/CD Pipeline is the automated sequence of execution stages that code undergoes from commit to production. Understanding pipeline topology, caching layers, and Directed Acyclic Graphs (DAGs) is critical for optimizing build speeds and reliability.',
    keyTakeaways: [
      'Pipelines are structured hierarchically: Pipeline -> Stages -> Jobs -> Steps -> Commands.',
      'DAG (Directed Acyclic Graph) allows independent jobs to run concurrently in parallel instead of sequentially.',
      'Artifacts persist build outputs (binaries, test reports) across isolated runner environments.'
    ],
    sections: [
      {
        heading: '1. Pipeline Hierarchy & Components',
        body: '• Triggers: Events that initiate execution (Git push, PR opened, cron schedule, webhook).\n• Stages: High-level logical phases (e.g., Lint, Test, Package, Deploy).\n• Jobs: Sets of steps that execute on an isolated runner/virtual machine. Jobs in the same stage run in parallel.\n• Steps: Individual command-line tasks executed inside a job container.\n• Runners/Agents: The underlying compute instances (VMs, Docker containers, Kubernetes pods) that execute the jobs.'
      },
      {
        heading: '2. DAG (Directed Acyclic Graph) Execution',
        body: 'In traditional sequential pipelines, Stage 2 must wait for all Stage 1 jobs to finish. In a DAG pipeline, a job starts as soon as its specific parent dependencies are met, significantly reducing total pipeline duration.'
      },
      {
        heading: '3. Comprehensive Multi-Stage Pipeline Example',
        body: 'Here is a production-grade multi-stage pipeline utilizing caching and parallelization:',
        codeSnippet: {
          language: 'yaml',
          filename: '.gitlab-ci.yml',
          code: `stages:
  - lint
  - test
  - package
  - deploy

lint_code:
  stage: lint
  image: node:20-alpine
  script:
    - npm ci
    - npm run lint

unit_tests:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm test
  artifacts:
    reports:
      junit: test-results.xml

docker_build:
  stage: package
  image: docker:24
  services:
    - docker:dind
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push myapp:$CI_COMMIT_SHA

deploy_production:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl set image deployment/myapp myapp=myapp:$CI_COMMIT_SHA
  environment:
    name: production
  when: manual`
        }
      }
    ]
  },
  {
    id: 'topic-6',
    slug: 'cicd-platforms-ecosystem',
    title: 'CI/CD Platform Ecosystem & Selection Guide',
    shortDescription: 'Compare modern CI/CD engines: Jenkins, GitHub Actions, GitLab CI, CircleCI, Azure Pipelines, and GitOps tools.',
    category: 'CI/CD',
    difficulty: 'Intermediate',
    estimatedTime: '12 mins',
    order: 6,
    overview: 'Choosing the right CI/CD platform depends on where your code lives, compliance requirements (Self-hosted vs SaaS), Kubernetes ecosystem alignment, and pipeline complexity.',
    keyTakeaways: [
      'GitHub Actions is the premier choice for GitHub-hosted open-source and enterprise repositories.',
      'GitLab CI/CD provides a unified single-application DevOps platform with built-in registry and monitoring.',
      'Jenkins remains dominant for highly customized on-premise enterprise environments with strict legacy requirements.',
      'ArgoCD and Flux represent the modern GitOps paradigm for declarative Kubernetes deployment.'
    ],
    sections: [
      {
        heading: '1. Platform Archetypes',
        body: '• Integrated Git Platforms (GitHub Actions, GitLab CI, Azure DevOps): Built directly into your source code repository, offering native pull request integration, secret management, and zero server maintenance.\n• Standalone Orchestrators (Jenkins, TeamCity): Self-hosted Java-based tools with 1,800+ community plugins, best suited for air-gapped data centers.\n• Cloud-Native GitOps (ArgoCD, Tekton): Pull-based controllers running inside Kubernetes clusters that continuously reconcile live cluster state with Git declarations.'
      },
      {
        heading: '2. Selection Decision Matrix',
        body: '• Team is already on GitHub? -> Choose GitHub Actions for seamless workflow integration.\n• Need all-in-one Issue Tracker, Code, CI, Registry, Security? -> Choose GitLab CI/CD.\n• Need Kubernetes-native continuous deployment with automated rollbacks? -> Choose ArgoCD.\n• Highly custom on-premises enterprise with legacy mainframe dependencies? -> Jenkins.'
      }
    ]
  }
];
