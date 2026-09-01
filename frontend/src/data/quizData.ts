import { QuizQuestion } from '../types/navigator';

export const comprehensiveQuizQuestions: QuizQuestion[] = [
  // --- Lesson 1: Introduction to DevOps & CAMS (5 Questions) ---
  {
    id: 'qz-1-1',
    topicId: 'topic-1',
    question: 'What is the primary cultural problem DevOps was invented to solve?',
    options: [
      'Replacing software developers with artificial intelligence bots',
      'The "Wall of Confusion" and opposing incentives between Developers and Operations',
      'Eliminating the need for cloud infrastructure and servers',
      'Forcing all organizations to switch strictly to Java programming'
    ],
    correctAnswerIndex: 1,
    explanation: 'DevOps solves the "Wall of Confusion" where Developers wanted rapid feature delivery while Operations resisted changes to preserve system stability.',
    conceptKey: 'Culture & Collaboration'
  },
  {
    id: 'qz-1-2',
    topicId: 'topic-1',
    question: 'What does the acronym "CAMS" stand for in mature DevOps philosophy?',
    options: [
      'Code, Architecture, Memory, Speed',
      'Culture, Automation, Measurement, Sharing',
      'Continuous, Agile, Microservices, Security',
      'Cloud, AWS, Monitoring, Serverless'
    ],
    correctAnswerIndex: 1,
    explanation: 'Coined by John Willis and Damon Edwards, CAMS stands for Culture, Automation, Measurement, and Sharing.',
    conceptKey: 'CAMS Framework'
  },
  {
    id: 'qz-1-3',
    topicId: 'topic-1',
    question: 'Why does automation alone NOT guarantee a successful DevOps transformation?',
    options: [
      'Automation is illegal in enterprise software',
      'Automating broken, siloed processes without cultural collaboration only produces broken releases faster',
      'Automation makes software run 100 times slower',
      'DevOps bans all forms of automated scripts'
    ],
    correctAnswerIndex: 1,
    explanation: 'Tools alone do not create DevOps. Automating dysfunctional processes without shared ownership just ships defects at higher velocity.',
    conceptKey: 'Automation vs Culture'
  },
  {
    id: 'qz-1-4',
    topicId: 'topic-1',
    question: 'What is a "Blameless Post-Mortem" in DevOps culture?',
    options: [
      'Firing the engineer who introduced a bug to teach the team a lesson',
      'An analysis focusing on systematic and process improvements after an incident rather than assigning individual fault',
      'A policy of ignoring all production outages',
      'Deleting all logs so no one can trace what happened'
    ],
    correctAnswerIndex: 1,
    explanation: 'Blameless post-mortems assume humans act in good faith and investigate what systemic safety guards failed, fostering psychological safety.',
    conceptKey: 'Blameless Culture'
  },
  {
    id: 'qz-1-5',
    topicId: 'topic-1',
    question: 'How do release cadences differ between Waterfall and modern DevOps?',
    options: [
      'Waterfall deploys every hour; DevOps deploys once a year',
      'DevOps deploys small, frequent, automated changes daily instead of massive, risky 6-month batch releases',
      'DevOps requires stopping all deployments permanently',
      'Waterfall uses Docker while DevOps uses manual floppy disks'
    ],
    correctAnswerIndex: 1,
    explanation: 'DevOps replaces massive high-risk release windows with frequent, automated, low-risk micro-deployments.',
    conceptKey: 'Deployment Frequency'
  },

  // --- Lesson 2: 8-Stage Lifecycle & Shift-Left (5 Questions) ---
  {
    id: 'qz-2-1',
    topicId: 'topic-2',
    question: 'What are the 8 sequential phases in the DevOps infinite loop?',
    options: [
      'Buy, Install, Run, Crash, Reboot, Pray, Sleep, Repeat',
      'Plan, Code, Build, Test, Release, Deploy, Operate, Monitor',
      'Frontend, Backend, Database, Cloud, Network, Linux, Windows, Mac',
      'HTML, CSS, JS, React, Node, Docker, Kubernetes, Terraform'
    ],
    correctAnswerIndex: 1,
    explanation: 'The 8 iterative stages are Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor.',
    conceptKey: 'DevOps Lifecycle'
  },
  {
    id: 'qz-2-2',
    topicId: 'topic-2',
    question: 'What does the "Shift-Left" philosophy mean in DevOps and DevSecOps?',
    options: [
      'Moving your mouse exclusively to the left side of the screen',
      'Moving testing, security vulnerability scans, and quality checks earlier in the development cycle (IDE and Code phases)',
      'Deferring all security auditing until after software has run in production for 6 months',
      'Only allowing left-handed software engineers to write pipelines'
    ],
    correctAnswerIndex: 1,
    explanation: 'Shift-Left introduces security, linting, and unit tests directly into the developer workflow, catching bugs when they are cheapest to fix.',
    conceptKey: 'Shift-Left Security'
  },
  {
    id: 'qz-2-3',
    topicId: 'topic-2',
    question: 'Which toolchain matches the "Plan" and "Code" phases of the lifecycle?',
    options: [
      'Prometheus and Datadog',
      'Jira, Linear, Git, GitHub, GitLab',
      'Terraform and CloudFormation only',
      'VMware ESXi and Bare-Metal BIOS'
    ],
    correctAnswerIndex: 1,
    explanation: 'Agile backlog planning uses Jira/Linear while coding and version control utilize Git, GitHub, and GitLab.',
    conceptKey: 'DevOps Toolchain'
  },
  {
    id: 'qz-2-4',
    topicId: 'topic-2',
    question: 'How does Continuous Feedback connect the "Monitor" phase back to "Plan"?',
    options: [
      'It sends automated spam emails to customers',
      'Real-time metrics, user telemetry, and error rates feed directly into sprint backlog prioritization',
      'It shuts down developer laptops automatically',
      'It prevents developers from planning new features'
    ],
    correctAnswerIndex: 1,
    explanation: 'Operational telemetry and production metrics provide quantitative insights to help product teams plan bug fixes and performance improvements.',
    conceptKey: 'Continuous Feedback'
  },
  {
    id: 'qz-2-5',
    topicId: 'topic-2',
    question: 'In which lifecycle stage does container packaging (e.g. Docker Build) occur?',
    options: [
      'Plan phase',
      'Build & Package phase',
      'Operate phase',
      'Monitor phase'
    ],
    correctAnswerIndex: 1,
    explanation: 'Compiling code and packaging binaries into immutable Docker container images takes place during the Build phase.',
    conceptKey: 'Build Phase'
  },

  // --- Lesson 3: CI Fundamentals & Testing (5 Questions) ---
  {
    id: 'qz-3-1',
    topicId: 'topic-3',
    question: 'What is the core principle of Continuous Integration (CI)?',
    options: [
      'Developers work in complete isolation on separate branches for 6 months without merging',
      'Developers merge code changes into a shared mainline repository frequently, triggering automated builds and tests',
      'Manual compilation of code by system administrators on weekends',
      'Buying more physical hard drives for the server room'
    ],
    correctAnswerIndex: 1,
    explanation: 'CI requires integrating code frequently so that automated tests verify every single commit immediately.',
    conceptKey: 'CI Core Principle'
  },
  {
    id: 'qz-3-2',
    topicId: 'topic-3',
    question: 'What is "Trunk-Based Development" and why is it preferred for CI?',
    options: [
      'Storing your code inside a wooden trunk',
      'Creating short-lived branches (< 1-2 days) that merge directly into the main trunk, avoiding merge conflicts',
      'Maintaining 50 permanent long-lived feature branches for years',
      'A branching strategy where no code is ever merged'
    ],
    correctAnswerIndex: 1,
    explanation: 'Trunk-Based Development minimizes divergence between branches, eliminating merge conflicts and enabling continuous integration.',
    conceptKey: 'Trunk-Based Development'
  },
  {
    id: 'qz-3-3',
    topicId: 'topic-3',
    question: 'What is the ideal maximum duration for an automated CI build and test feedback loop?',
    options: [
      '48 to 72 hours',
      'Under 10 to 15 minutes',
      '1 full calendar month',
      'It does not matter if builds take several days'
    ],
    correctAnswerIndex: 1,
    explanation: 'Fast builds (< 10-15 mins) ensure developers receive immediate feedback before context-switching to another task.',
    conceptKey: 'Fast Feedback Loop'
  },
  {
    id: 'qz-3-4',
    topicId: 'topic-3',
    question: 'What is a "Self-Testing Build" in Continuous Integration?',
    options: [
      'A build that asks the user to manually click buttons to see if it works',
      'A build script that automatically executes a comprehensive suite of unit and integration tests with a non-zero exit code on failure',
      'A build that always passes even if the code contains syntax errors',
      'A test that runs only when code is uninstalled'
    ],
    correctAnswerIndex: 1,
    explanation: 'A self-testing build executes tests programmatically; if any test fails, the build breaks and alerts the team immediately.',
    conceptKey: 'Self-Testing Builds'
  },
  {
    id: 'qz-3-5',
    topicId: 'topic-3',
    question: 'Which tool is NOT a Continuous Integration runner/server?',
    options: [
      'GitHub Actions',
      'Jenkins',
      'Adobe Photoshop',
      'GitLab CI Runner'
    ],
    correctAnswerIndex: 2,
    explanation: 'GitHub Actions, Jenkins, and GitLab CI are CI automation runners; Adobe Photoshop is graphic design software.',
    conceptKey: 'CI Tools'
  },

  // --- Lesson 4: Continuous Delivery vs Deployment & Rollouts (5 Questions) ---
  {
    id: 'qz-4-1',
    topicId: 'topic-4',
    question: 'What is the key difference between Continuous Delivery and Continuous Deployment?',
    options: [
      'They are 100% identical with no difference',
      'Continuous Delivery maintains code in a releasable state with manual sign-off; Continuous Deployment ships automatically to production with zero human gates',
      'Continuous Delivery is only for Mac OS; Continuous Deployment is only for Windows',
      'Continuous Delivery requires tape drives; Continuous Deployment requires paper punch cards'
    ],
    correctAnswerIndex: 1,
    explanation: 'In Continuous Delivery, the final production push requires human approval. In Continuous Deployment, every passing commit deploys straight to production autonomously.',
    conceptKey: 'Delivery vs Deployment'
  },
  {
    id: 'qz-4-2',
    topicId: 'topic-4',
    question: 'How does a "Blue-Green Deployment" achieve zero-downtime releases?',
    options: [
      'By turning off all servers for 4 hours during maintenance',
      'By maintaining two identical environments; new code deploys to Green, and the router flips 100% traffic from Blue to Green instantly',
      'By painting physical server racks blue and green',
      'By deleting the production database and restoring from yesterday'
    ],
    correctAnswerIndex: 1,
    explanation: 'Blue-Green runs two identical production stacks, allowing instant traffic switching and near-instant rollback if an issue is discovered.',
    conceptKey: 'Blue-Green Deployment'
  },
  {
    id: 'qz-4-3',
    topicId: 'topic-4',
    question: 'What is a "Canary Deployment" strategy?',
    options: [
      'Sending physical birds into the data center',
      'Routing a tiny fraction of user traffic (e.g. 5-10%) to the new release to monitor error rates before rolling out to 100%',
      'Deploying code exclusively between 3:00 AM and 4:00 AM on Sundays',
      'Encrypting all source code with a password'
    ],
    correctAnswerIndex: 1,
    explanation: 'Canary deployments expose a small percentage of live users to new changes while observing Prometheus error rates, mitigating blast radius.',
    conceptKey: 'Canary Deployment'
  },
  {
    id: 'qz-4-4',
    topicId: 'topic-4',
    question: 'What is an "Automated Rollback" in CD systems?',
    options: [
      'A feature where the system automatically reverts to the previous healthy version when error rate thresholds are breached',
      'Manually rewriting the code by hand from memory',
      'Rolling physical servers down a hill',
      'Deleting the Git repository'
    ],
    correctAnswerIndex: 0,
    explanation: 'Automated rollback restores the last known good deployment when health checks or Prometheus SLO metrics fail.',
    conceptKey: 'Automated Rollback'
  },
  {
    id: 'qz-4-5',
    topicId: 'topic-4',
    question: 'Which tool is an industry standard for Kubernetes Canary Rollouts and progressive delivery?',
    options: [
      'Argo Rollouts',
      'Microsoft Excel',
      'Notepad.exe',
      'VLC Media Player'
    ],
    correctAnswerIndex: 0,
    explanation: 'Argo Rollouts is a specialized Kubernetes controller supporting declarative Canary and Blue-Green deployment steps.',
    conceptKey: 'Progressive Delivery Tools'
  },

  // --- Lesson 5: Pipeline Topology, DAG & YAML (5 Questions) ---
  {
    id: 'qz-5-1',
    topicId: 'topic-5',
    question: 'What is a DAG (Directed Acyclic Graph) in CI/CD pipeline execution?',
    options: [
      'A circular loop that never finishes running',
      'A non-circular dependency graph allowing independent pipeline jobs to execute in parallel as soon as their prerequisites finish',
      'A database query language for MongoDB',
      'A physical Ethernet cable standard'
    ],
    correctAnswerIndex: 1,
    explanation: 'DAG execution allows non-dependent jobs to run concurrently across available runners, drastically reducing total build duration.',
    conceptKey: 'DAG Execution'
  },
  {
    id: 'qz-5-2',
    topicId: 'topic-5',
    question: 'What is the structural hierarchy of a modern CI/CD pipeline?',
    options: [
      'Pipeline -> Stages -> Jobs -> Steps -> Shell Commands',
      'Database -> Table -> Row -> Column',
      'Computer -> Monitor -> Keyboard -> Mouse',
      'File -> Folder -> Disk -> Network'
    ],
    correctAnswerIndex: 0,
    explanation: 'Pipelines contain logical Stages, which contain parallel Jobs, which contain sequential Steps executing commands.',
    conceptKey: 'Pipeline Hierarchy'
  },
  {
    id: 'qz-5-3',
    topicId: 'topic-5',
    question: 'Why are "Build Artifacts" necessary between isolated CI runner jobs?',
    options: [
      'To make the hard drive fill up faster',
      'Because each job runs on an ephemeral container/VM and artifacts persist compiled binaries or test reports across jobs',
      'Artifacts are required by law in California',
      'To prevent developers from seeing build logs'
    ],
    correctAnswerIndex: 1,
    explanation: 'Since CI runner containers are destroyed after each job, artifacts allow passing compiled output to downstream deployment jobs.',
    conceptKey: 'Build Artifacts'
  },
  {
    id: 'qz-5-4',
    topicId: 'topic-5',
    question: 'What is "Pipeline Caching" (e.g. actions/cache or npm cache)?',
    options: [
      'Reusing downloaded package dependencies across workflow runs to eliminate redundant downloads and speed up builds',
      'Hiding passwords in plain text files',
      'Deleting all node_modules on every single commit',
      'Storing Bitcoin inside the runner memory'
    ],
    correctAnswerIndex: 0,
    explanation: 'Caching preserves downloaded third-party libraries across pipeline runs, speeding up install times from minutes to seconds.',
    conceptKey: 'Pipeline Caching'
  },
  {
    id: 'qz-5-5',
    topicId: 'topic-5',
    question: 'Where are GitHub Actions workflows stored in a Git repository by standard convention?',
    options: [
      'C:\\Program Files\\GitHub\\',
      '.github/workflows/*.yml',
      '/var/log/syslog',
      'Inside the README.md file'
    ],
    correctAnswerIndex: 1,
    explanation: 'GitHub automatically parses YAML workflow definitions placed inside the `.github/workflows/` directory.',
    conceptKey: 'GitHub Workflow Convention'
  },

  // --- Lesson 6: Infrastructure as Code & GitOps (5 Questions) ---
  {
    id: 'qz-6-1',
    topicId: 'topic-6',
    question: 'What is "Infrastructure as Code" (IaC) and what tool is widely used for it?',
    options: [
      'Managing servers by manually clicking buttons in the AWS web console',
      'Defining and provisioning cloud infrastructure using declarative configuration files (e.g. Terraform HCL)',
      'Writing Python code that shuts down servers permanently',
      'Using pen and paper to document server IPs'
    ],
    correctAnswerIndex: 1,
    explanation: 'IaC allows infrastructure (VPCs, databases, clusters) to be version-controlled, tested, and provisioned idempotently via tools like Terraform.',
    conceptKey: 'Infrastructure as Code'
  },
  {
    id: 'qz-6-2',
    topicId: 'topic-6',
    question: 'What is "Configuration Drift" in cloud infrastructure?',
    options: [
      'When servers physically slide across the data center floor',
      'When manual changes made to cloud resources cause live state to diverge from the declared Terraform code',
      'When Git repositories run out of commit hashes',
      'When DNS servers update within 5 seconds'
    ],
    correctAnswerIndex: 1,
    explanation: 'Drift occurs when manual tweaks are made directly in the cloud console without updating the Terraform source code.',
    conceptKey: 'Configuration Drift'
  },
  {
    id: 'qz-6-3',
    topicId: 'topic-6',
    question: 'How does "GitOps" (e.g. ArgoCD) differ from traditional push-based CI deployment?',
    options: [
      'GitOps requires zero Git commits',
      'GitOps uses an in-cluster controller that continuously pulls and reconciles cluster state from Git, rather than CI pushing credentials outward',
      'GitOps only works on Windows 98',
      'GitOps deletes all Kubernetes clusters on push'
    ],
    correctAnswerIndex: 1,
    explanation: 'GitOps uses pull-based controllers running inside Kubernetes, using Git as the immutable single source of truth.',
    conceptKey: 'GitOps Paradigm'
  },
  {
    id: 'qz-6-4',
    topicId: 'topic-6',
    question: 'What is a "Helm Chart" in the Kubernetes ecosystem?',
    options: [
      'A pirate treasure map',
      'A package manager and templating framework for defining, installing, and upgrading complex Kubernetes applications',
      'A hardware cooling fan for CPUs',
      'A database management tool for SQLite'
    ],
    correctAnswerIndex: 1,
    explanation: 'Helm is the package manager for Kubernetes that bundles YAML templates into versioned, parameterized releases.',
    conceptKey: 'Helm Package Manager'
  },
  {
    id: 'qz-6-5',
    topicId: 'topic-6',
    question: 'What is Open Policy Agent (OPA) used for in DevSecOps?',
    options: [
      'Playing audio files inside containers',
      'Enforcing declarative security and compliance policies as code (e.g. blocking root containers or unencrypted storage)',
      'Generating random passwords for users',
      'Formatting JavaScript files with prettier'
    ],
    correctAnswerIndex: 1,
    explanation: 'OPA uses the Rego language to enforce guardrails and compliance rules across Kubernetes and CI/CD pipelines.',
    conceptKey: 'Policy as Code'
  }
];
