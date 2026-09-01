import { Platform } from '../types/navigator';

export const platformsData: Platform[] = [
  {
    id: 'plat-jenkins',
    slug: 'jenkins',
    name: 'Jenkins',
    tagline: 'The leading open-source automation server with 1,800+ plugins',
    shortDescription: 'Extensible open-source Java-based automation server supporting building, deploying, and automating any software project.',
    fullDescription: 'Jenkins is the pioneer open-source automation engine written in Java. Created in 2004 (originally Hudson), Jenkins revolutionized continuous integration. It features a master-agent architecture, declarative and scripted Jenkinsfiles (Groovy), and an unmatched ecosystem of over 1,800 plugins integrating with virtually every tool in the DevOps toolchain.',
    category: 'CI/CD',
    difficulty: 'Advanced',
    licenseType: 'Open Source',
    deploymentType: 'Self-Hosted',
    officialUrl: 'https://www.jenkins.io',
    documentationUrl: 'https://www.jenkins.io/doc/',
    releaseYear: 2004,
    primaryLanguage: 'Java / Groovy',
    isOpenSource: true,
    isCloudBased: false,
    isSelfHosted: true,
    hasYamlSupport: false, // Jenkins uses Groovy Jenkinsfile / Declarative Groovy
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      '1,800+ Community Plugins covering every enterprise tool',
      'Master-Agent distributed build execution topology',
      'Declarative and Scripted Groovy Jenkinsfile pipelines',
      'Air-gapped and on-premises high-compliance deployment support',
      'Extensive role-based access control (RBAC) and matrix auth',
      'Blue Ocean visual pipeline editor'
    ],
    pros: [
      '100% Free and Open Source with no licensing fees',
      'Extreme flexibility and customizability for legacy environments',
      'Massive global community with millions of tutorials and solutions',
      'Runs anywhere: bare-metal, VMs, Docker containers, or Kubernetes'
    ],
    cons: [
      'High administrative maintenance overhead (plugin compatibility, master sizing)',
      'Legacy UI compared to modern sleek SaaS CI tools',
      'Groovy DSL has a steep learning curve compared to standard YAML',
      'Security patch management requires active operational effort'
    ],
    sampleYaml: {
      filename: 'Jenkinsfile (Declarative Groovy Pipeline)',
      code: `pipeline {
    agent {
        docker {
            image 'node:20-alpine'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/myorg/myapp.git'
            }
        }
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }
        stage('Build & Push Container') {
            steps {
                sh 'docker build -t myregistry.io/app:\${BUILD_NUMBER} .'
                sh 'docker push myregistry.io/app:\${BUILD_NUMBER}'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        failure {
            mail to: 'devops@myorg.io', subject: "Pipeline Failed: \${env.JOB_NAME}"
        }
    }
}`,
      explanation: 'Declarative Jenkinsfile defining Dockerized build agent, parallel stages, and automated failure notifications.'
    },
    bestFor: 'Large enterprises with strict on-premise security, air-gapped data centers, or complex customized build logic.',
    rating: 4.4
  },
  {
    id: 'plat-github-actions',
    slug: 'github-actions',
    name: 'GitHub Actions',
    tagline: 'Native CI/CD and workflow automation built directly inside GitHub',
    shortDescription: 'Event-driven workflow platform built into GitHub, enabling automation of build, test, and release directly from repo events.',
    fullDescription: 'GitHub Actions is GitHub’s native CI/CD automation engine introduced in 2019. It enables developers to automate workflows triggered by any GitHub event (pull requests, issues, releases, webhooks). Workflows are defined in clean YAML files within the .github/workflows directory and can reuse tens of thousands of community actions from the GitHub Marketplace.',
    category: 'CI/CD',
    difficulty: 'Beginner',
    licenseType: 'Freemium',
    deploymentType: 'Hybrid (Cloud & Self-Hosted)',
    officialUrl: 'https://github.com/features/actions',
    documentationUrl: 'https://docs.github.com/en/actions',
    releaseYear: 2019,
    primaryLanguage: 'YAML / JavaScript / Docker',
    isOpenSource: false,
    isCloudBased: true,
    isSelfHosted: true, // Supports Self-hosted runners
    hasYamlSupport: true,
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      'Native GitHub PR & Issue event triggers (push, pull_request, release)',
      'GitHub Marketplace with 20,000+ ready-to-use community actions',
      'Matrix builds (test across multiple OS and runtime versions simultaneously)',
      'GitHub-hosted runners (Ubuntu, macOS, Windows) and self-hosted runner scale sets',
      'Built-in secret management with GitHub Environment protection rules',
      'Fast dependency caching with actions/cache'
    ],
    pros: [
      'Zero setup required if your code is already hosted on GitHub',
      'Generous free tier (2,000 free runner minutes/month for private repos, unlimited for public)',
      'Modern, intuitive YAML syntax with visual execution DAG',
      'Seamless integration with GitHub Security, Codespaces, and Releases'
    ],
    cons: [
      'Tightly coupled with GitHub; less practical if your code is on GitLab or Bitbucket',
      'Self-hosted runner management requires maintenance for enterprise security',
      'Debugging failed runs locally can be tricky without helper tools like act'
    ],
    sampleYaml: {
      filename: '.github/workflows/deploy.yml',
      code: `name: Production CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies & Run Tests
        run: |
          npm ci
          npm run test:ci

      - name: Build Docker Container
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          tags: app:latest`,
      explanation: 'Production GitHub Actions workflow using actions/checkout, actions/setup-node with caching, and Docker build action.'
    },
    bestFor: 'Modern development teams, open-source projects, and organizations already hosting source code on GitHub.',
    rating: 4.8
  },
  {
    id: 'plat-gitlab-ci',
    slug: 'gitlab-ci',
    name: 'GitLab CI/CD',
    tagline: 'All-in-one DevOps platform with native Auto DevOps and container registry',
    shortDescription: 'Integrated CI/CD component of GitLab offering unified pipeline execution, security scanning, and Kubernetes management.',
    fullDescription: 'GitLab CI/CD is an integral part of GitLab’s single-application DevOps platform. Introduced alongside GitLab, it uses a declarative .gitlab-ci.yml file to define multi-stage pipelines. It stands out with powerful built-in features including Container Registry, Package Registry, SAST/DAST security scanners, Review Apps, and Auto DevOps templates.',
    category: 'CI/CD',
    difficulty: 'Intermediate',
    licenseType: 'Freemium',
    deploymentType: 'Hybrid (Cloud & Self-Hosted)',
    officialUrl: 'https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/',
    documentationUrl: 'https://docs.gitlab.com/ee/ci/',
    releaseYear: 2015,
    primaryLanguage: 'YAML / Ruby / Go',
    isOpenSource: true, // GitLab Community Edition is open source
    isCloudBased: true,
    isSelfHosted: true,
    hasYamlSupport: true,
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      'Unified .gitlab-ci.yml single-file configuration',
      'Auto DevOps: automatic build, test, code quality, and deployment detection',
      'Review Apps: ephemeral live environments spun up for every merge request',
      'Built-in Container Registry, Dependency Proxy, and Helm Repository',
      'Native Kubernetes agent integration and cluster monitoring',
      'Integrated SAST, DAST, Secret Detection, and License Compliance scanning'
    ],
    pros: [
      'Complete end-to-end DevOps suite in a single tool without third-party plugins',
      'GitLab Runner is lightweight, written in Go, and easily deployed to Kubernetes',
      'Available as SaaS (GitLab.com) or 100% Self-Hosted on private clouds',
      'Powerful DAG support using the "needs" keyword for parallel stage execution'
    ],
    cons: [
      'Advanced enterprise security scanning and compliance features require higher-tier paid plans',
      'Managing self-hosted GitLab server (Omnibus / Helm) requires dedicated sysadmin resources'
    ],
    sampleYaml: {
      filename: '.gitlab-ci.yml',
      code: `stages:
  - test
  - build
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

test_app:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm test

build_container:
  stage: build
  image: docker:24
  services:
    - docker:dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE

deploy_prod:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl set image deployment/app app=$DOCKER_IMAGE
  environment:
    name: production
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual`,
      explanation: 'GitLab CI pipeline showcasing stage progression, built-in GitLab Registry authentication, and manual production deployment gate.'
    },
    bestFor: 'Organizations looking for an all-in-one DevOps lifecycle tool (Issue Tracking, Code, CI/CD, Container Registry, Security).',
    rating: 4.7
  },
  {
    id: 'plat-circleci',
    slug: 'circleci',
    name: 'CircleCI',
    tagline: 'High-speed, cloud-native CI/CD platform optimized for performance and concurrency',
    shortDescription: 'Cloud-first continuous integration platform renowned for ultra-fast build times, intelligent caching, and reusable Orbs.',
    fullDescription: 'CircleCI is a dedicated cloud-native CI/CD platform founded in 2011. Built from the ground up for speed, CircleCI offers fine-grained concurrency, test splitting based on execution timing data, and reusable configuration packages called "Orbs". It supports cloud-hosted runners (Docker, Linux VM, macOS, Windows, Arm) and self-hosted runner clusters.',
    category: 'CI/CD',
    difficulty: 'Intermediate',
    licenseType: 'Freemium',
    deploymentType: 'Hybrid (Cloud & Self-Hosted)',
    officialUrl: 'https://circleci.com',
    documentationUrl: 'https://circleci.com/docs/',
    releaseYear: 2011,
    primaryLanguage: 'YAML / Clojure / Go',
    isOpenSource: false,
    isCloudBased: true,
    isSelfHosted: true,
    hasYamlSupport: true,
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      'Reusable configuration packages via CircleCI Orbs registry',
      'Automated test splitting across parallel containers to minimize build time',
      'Resource Classes: easily select exact CPU/RAM specs per job',
      'SSH into failed build containers for instant live interactive debugging',
      'Visual interactive workflow graph with approval gates',
      'Deep insights dashboard with pipeline duration and failure trends'
    ],
    pros: [
      'Extremely fast execution with optimal caching layers',
      'Interactive SSH debugging makes resolving broken builds fast and straightforward',
      'Works seamlessly across multiple VCS providers (GitHub, Bitbucket, GitLab)',
      'Orbs drastically reduce boilerplate pipeline code'
    ],
    cons: [
      'Pricing scales quickly with high concurrency and large compute resource classes',
      'Self-hosted CircleCI Server enterprise edition has a complex installation footprint'
    ],
    sampleYaml: {
      filename: '.circleci/config.yml',
      code: `version: 2.1

orbs:
  node: circleci/node@5.1.0
  docker: circleci/docker@2.2.0

workflows:
  build-test-deploy:
    jobs:
      - node/test:
          version: '20.0'
      - docker/publish:
          image: myorg/app
          tag: << pipeline.git.revision >>
          requires:
            - node/test
          filters:
            branches:
              only: main`,
      explanation: 'Concise CircleCI configuration leveraging reusable Node and Docker Orbs to execute tests and publish container images.'
    },
    bestFor: 'Fast-moving engineering teams demanding high pipeline concurrency, minimal build times, and SSH live debugging.',
    rating: 4.6
  },
  {
    id: 'plat-azure-pipelines',
    slug: 'azure-devops-pipelines',
    name: 'Azure DevOps Pipelines',
    tagline: 'Enterprise-grade multi-platform CI/CD integrating deeply with Microsoft Azure and GitHub',
    shortDescription: 'Cloud-hosted pipeline service supporting any language, platform, and cloud with extensive enterprise governance.',
    fullDescription: 'Azure Pipelines is part of the Microsoft Azure DevOps suite (formerly TFS/VSTS). It provides cloud-hosted and self-hosted build and release pipelines for Linux, macOS, and Windows. It supports any programming language and deploys to any cloud (Azure, AWS, GCP) or on-premises servers with deep enterprise RBAC and compliance controls.',
    category: 'CI/CD',
    difficulty: 'Intermediate',
    licenseType: 'Freemium',
    deploymentType: 'Hybrid (Cloud & Self-Hosted)',
    officialUrl: 'https://azure.microsoft.com/en-us/products/devops/pipelines',
    documentationUrl: 'https://learn.microsoft.com/en-us/azure/devops/pipelines/',
    releaseYear: 2018,
    primaryLanguage: 'YAML / C#',
    isOpenSource: false,
    isCloudBased: true,
    isSelfHosted: true,
    hasYamlSupport: true,
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      'Multi-platform hosted agents (Linux, macOS, Windows) with 10 free parallel jobs for open source',
      'Deployment environments with approval checks and manual release gates',
      'Enterprise integration with Azure Kubernetes Service (AKS), Key Vault, and Active Directory',
      'Release pipelines with automated rollback gates based on Azure Monitor alerts',
      'Visual pipeline designer alongside modern YAML pipeline declarations',
      'Deep integration with Azure Boards and Azure Artifacts'
    ],
    pros: [
      'Best-in-class integration with Microsoft Azure cloud infrastructure',
      'Excellent support for .NET, Windows builds, and enterprise compliance auditing',
      'Can connect to GitHub, Bitbucket, Subversion, and Azure Repos',
      'Free 1,800 build minutes per month for private repositories'
    ],
    cons: [
      'Azure DevOps portal navigation can feel fragmented compared to modern single-page tools',
      'YAML syntax has subtle proprietary terminology differences (tasks vs steps vs stages)'
    ],
    sampleYaml: {
      filename: 'azure-pipelines.yml',
      code: `trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

stages:
  - stage: BuildAndTest
    displayName: 'Build and Test Stage'
    jobs:
      - job: UnitTests
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '20.x'
          - script: |
              npm ci
              npm test
            displayName: 'Execute Automated Tests'

  - stage: DeployToAKS
    displayName: 'Deploy to Kubernetes'
    dependsOn: BuildAndTest
    condition: succeeded()
    jobs:
      - deployment: DeployProd
        environment: 'production-aks'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: KubernetesManifest@0
                  inputs:
                    action: 'deploy'
                    manifests: 'k8s/deployment.yaml'`,
      explanation: 'Azure Pipelines multi-stage YAML demonstrating Node tool installation, automated testing, and KubernetesManifest deployment task.'
    },
    bestFor: 'Enterprises with significant workloads in Microsoft Azure, .NET ecosystems, or regulated corporate governance environments.',
    rating: 4.5
  },
  {
    id: 'plat-argocd',
    slug: 'argocd',
    name: 'ArgoCD (GitOps)',
    tagline: 'Declarative continuous delivery and GitOps operator natively built for Kubernetes',
    shortDescription: 'Kubernetes controller that continuously monitors Git repositories and synchronizes live cluster state with declared manifests.',
    fullDescription: 'ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes and an official CNCF Graduated project. Instead of pushing changes to a cluster from an external CI server, ArgoCD runs inside the Kubernetes cluster as a controller. It continuously pulls declared Helm charts, Kustomize overlays, and plain YAML manifests from Git, reconciling any live state drift automatically.',
    category: 'GitOps',
    difficulty: 'Intermediate',
    licenseType: 'Open Source',
    deploymentType: 'Self-Hosted',
    officialUrl: 'https://argo-cd.readthedocs.io',
    documentationUrl: 'https://argo-cd.readthedocs.io/en/stable/',
    releaseYear: 2018,
    primaryLanguage: 'Go',
    isOpenSource: true,
    isCloudBased: false,
    isSelfHosted: true,
    hasYamlSupport: true,
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      'Automated pull-based GitOps synchronization from Git repositories',
      'Multi-cluster Kubernetes application management from a single control plane',
      'Support for Helm, Kustomize, Jsonnet, and plain YAML manifests',
      'Visual web UI showing live Kubernetes resource dependency tree and sync state',
      'Automated drift detection and self-healing cluster reconciliation',
      'Integration with Argo Rollouts for automated Canary and Blue-Green strategies'
    ],
    pros: [
      '100% Cloud-Native and official CNCF Graduated project',
      'Improves security: CI runners never need direct Kubernetes cluster admin credentials',
      'Git is the single source of truth for all cluster infrastructure and applications',
      'One-click instant rollbacks to any previous Git commit'
    ],
    cons: [
      'Focuses exclusively on Continuous Delivery (CD); requires a separate CI tool for testing and building images',
      'Requires Kubernetes runtime infrastructure to operate'
    ],
    sampleYaml: {
      filename: 'argocd-application.yaml',
      code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: devpulse-app-prod
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/myorg/gitops-manifests.git'
    targetRevision: HEAD
    path: k8s/production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: prod-apps
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
      explanation: 'ArgoCD Application Custom Resource declaring automated Git pull synchronization with self-healing and pruning enabled.'
    },
    bestFor: 'Kubernetes-native organizations adopting GitOps methodologies for immutable, declarative continuous deployment.',
    rating: 4.9
  },
  {
    id: 'plat-drone-ci',
    slug: 'drone-ci',
    name: 'Drone CI',
    tagline: 'Container-native, lightweight continuous delivery platform powered by Docker',
    shortDescription: 'Simple, fast, container-native CI server where every pipeline step executes in an isolated Docker container.',
    fullDescription: 'Drone by Harness is a container-native CI/CD platform built in Go. Drone pioneered the model where every step in a pipeline executes as an ephemeral Docker container. It has zero external dependencies, installs in minutes via a single Docker command, and integrates with GitHub, GitLab, Bitbucket, and Gitea.',
    category: 'CI/CD',
    difficulty: 'Beginner',
    licenseType: 'Open Source',
    deploymentType: 'Self-Hosted',
    officialUrl: 'https://www.drone.io',
    documentationUrl: 'https://docs.drone.io',
    releaseYear: 2014,
    primaryLanguage: 'Go',
    isOpenSource: true,
    isCloudBased: false,
    isSelfHosted: true,
    hasYamlSupport: true,
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      'Every pipeline step runs inside its own isolated Docker container',
      'Extremely lightweight: installs in seconds using a single Docker image',
      'Clean YAML configuration with plug-and-play Docker plugins',
      'Native multi-architecture runner support (ARM, ARM64, AMD64)',
      'Integrates with GitHub, GitLab, Gitea, and Bitbucket'
    ],
    pros: [
      'Minimal resource footprint (runs comfortably on a $5/month VPS or Raspberry Pi)',
      'Clean container isolation prevents runner dependency pollution',
      'Simple, easy-to-read YAML syntax with zero configuration bloat'
    ],
    cons: [
      'Smaller ecosystem of specialized plugins compared to GitHub Actions or Jenkins',
      'Enterprise orchestration features require Harness SaaS subscription'
    ],
    sampleYaml: {
      filename: '.drone.yml',
      code: `kind: pipeline
type: docker
name: default

steps:
  - name: test
    image: node:20-alpine
    commands:
      - npm ci
      - npm test

  - name: publish
    image: plugins/docker
    settings:
      repo: myorg/app
      auto_tag: true
      username:
        from_secret: docker_username
      password:
        from_secret: docker_password
    when:
      branch:
        - main`,
      explanation: 'Ultra-clean Drone CI YAML demonstrating isolated container steps and Docker publish plugin with secret injection.'
    },
    bestFor: 'Developers, startups, and self-hosters wanting a lightweight, container-native CI server without complex infrastructure maintenance.',
    rating: 4.4
  },
  {
    id: 'plat-tekton',
    slug: 'tekton',
    name: 'Tekton Pipelines',
    tagline: 'Standard, cloud-native CI/CD building blocks and CRDs for Kubernetes',
    shortDescription: 'Kubernetes-native framework for creating flexible, composable, and reusable CI/CD pipelines using Custom Resource Definitions (CRDs).',
    fullDescription: 'Tekton is a powerful and flexible open-source framework for creating CI/CD systems, governed by the Continuous Delivery Foundation (CDF). Tekton extends Kubernetes by introducing Custom Resource Definitions (Tasks, TaskRuns, Pipelines, PipelineRuns). It is cloud-native, runs completely inside Kubernetes clusters, and serves as the underlying engine for products like Red Hat OpenShift Pipelines.',
    category: 'CI/CD',
    difficulty: 'Advanced',
    licenseType: 'Open Source',
    deploymentType: 'Self-Hosted',
    officialUrl: 'https://tekton.dev',
    documentationUrl: 'https://tekton.dev/docs/',
    releaseYear: 2019,
    primaryLanguage: 'Go',
    isOpenSource: true,
    isCloudBased: false,
    isSelfHosted: true,
    hasYamlSupport: true,
    hasDockerSupport: true,
    hasK8sSupport: true,
    features: [
      'Kubernetes-native Custom Resource Definitions (CRDs)',
      'Reusable Tasks and Pipelines shared across clusters via Tekton Hub',
      'Runs serverless: compute pods spin up on demand and terminate upon completion',
      'Tekton Triggers: event listener controller that initiates pipelines from Git webhooks',
      'Open-source governance under the Continuous Delivery Foundation (CDF)'
    ],
    pros: [
      'Standardized Kubernetes-native primitives for building custom CI/CD platforms',
      'No persistent agent VMs idling when pipelines are not running',
      'Immense scalability on Kubernetes clusters'
    ],
    cons: [
      'Very verbose Kubernetes YAML manifest definitions',
      'Steep learning curve designed for Platform Engineers building internal tooling rather than casual application developers'
    ],
    sampleYaml: {
      filename: 'tekton-pipeline.yaml',
      code: `apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: build-and-test
spec:
  steps:
    - name: run-unit-tests
      image: node:20-alpine
      script: |
        npm ci
        npm test
---
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: app-ci-pipeline
spec:
  tasks:
    - name: test-task
      taskRef:
        name: build-and-test`,
      explanation: 'Tekton Task and Pipeline Custom Resource Definitions executing containerized test scripts inside Kubernetes pods.'
    },
    bestFor: 'Platform Engineering teams building customized internal developer platforms (IDPs) on top of Kubernetes.',
    rating: 4.3
  }
];
