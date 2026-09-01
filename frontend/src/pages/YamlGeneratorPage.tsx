import React, { useState } from 'react';
import { Code2, Copy, Check, FileCode, Play, Sparkles, Terminal, Layers } from 'lucide-react';
import { YamlCodeViewer } from '../components/YamlCodeViewer';

export const YamlGeneratorPage: React.FC = () => {
  const [pipelineFormat, setPipelineFormat] = useState<'github' | 'gitlab'>('github');
  const [runtime, setRuntime] = useState<string>('node');
  const [enableLint, setEnableLint] = useState<boolean>(true);
  const [enableDocker, setEnableDocker] = useState<boolean>(true);
  const [deployTarget, setDeployTarget] = useState<string>('kubernetes');

  const generateYaml = () => {
    if (pipelineFormat === 'github') {
      let setupStep = '';
      let testStep = '';

      if (runtime === 'node') {
        setupStep = `      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'`;
        testStep = `      - name: Install & Run Tests
        run: |
          npm ci
          ${enableLint ? 'npm run lint\n          ' : ''}npm test`;
      } else if (runtime === 'python') {
        setupStep = `      - name: Setup Python Environment
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'`;
        testStep = `      - name: Install & Run Pytest
        run: |
          pip install -r requirements.txt
          pytest --cov=src`;
      } else if (runtime === 'go') {
        setupStep = `      - name: Setup Go Runtime
        uses: actions/setup-go@v5
        with:
          go-version: '1.22'`;
        testStep = `      - name: Run Go Tests
        run: go test -v ./...`;
      } else {
        setupStep = `      - name: Setup Java JDK
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'`;
        testStep = `      - name: Maven Build & Test
        run: mvn clean test`;
      }

      let dockerBlock = '';
      if (enableDocker) {
        dockerBlock = `
  docker-publish:
    name: Build & Push Container Image
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Log in to GitHub Container Registry (ghcr.io)
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - name: Build and push container
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}`;
      }

      let deployBlock = '';
      if (deployTarget === 'kubernetes') {
        deployBlock = `
  deploy-kubernetes:
    name: Deploy to Kubernetes Cluster
    needs: ${enableDocker ? 'docker-publish' : 'build-and-test'}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set Kubernetes Context
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: \${{ secrets.KUBECONFIG }}
      - name: Deploy Kubernetes Manifests
        run: |
          kubectl set image deployment/myapp-deployment myapp=ghcr.io/\${{ github.repository }}:\${{ github.sha }}`;
      } else {
        deployBlock = `
  deploy-staging:
    name: Deploy to Cloud Environment
    needs: ${enableDocker ? 'docker-publish' : 'build-and-test'}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Execute Deployment Script
        run: ./scripts/deploy.sh --env production`;
      }

      return `name: Automated Production CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    name: Lint & Automated Test Suite
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
${setupStep}
${testStep}${dockerBlock}${deployBlock}`;
    } else {
      // GitLab CI format
      return `stages:
  - test
  ${enableDocker ? '- package\n  ' : ''}- deploy

variables:
  CONTAINER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

test_job:
  stage: test
  image: ${runtime === 'python' ? 'python:3.11' : runtime === 'go' ? 'golang:1.22' : 'node:20-alpine'}
  script:
    - ${runtime === 'node' ? 'npm ci && npm test' : runtime === 'python' ? 'pip install -r requirements.txt && pytest' : 'go test ./...'}
${enableDocker ? `
build_image:
  stage: package
  image: docker:24
  services:
    - docker:dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CONTAINER_IMAGE .
    - docker push $CONTAINER_IMAGE
` : ''}
deploy_production:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl set image deployment/app app=$CONTAINER_IMAGE
  environment:
    name: production
  when: manual`;
    }
  };

  const yamlOutput = generateYaml();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono text-[#58a6ff]">
          <Code2 className="w-4 h-4" />
          <span>Developer Tooling & Automation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#e6edf3]">
          Interactive YAML Pipeline Generator
        </h1>
        <p className="text-xs text-[#8b949e]">
          Configure your stack below to generate production-ready GitHub Actions or GitLab CI pipeline files instantly.
        </p>
      </div>

      {/* 2-Column Grid: Config Controls + Live YAML Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Configuration Controls */}
        <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-6 space-y-5 shadow-sm">
          <h2 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
            Pipeline Configuration
          </h2>

          {/* Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#8b949e] block font-semibold">
              CI/CD Format:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPipelineFormat('github')}
                className={`py-2 px-3 rounded text-xs font-mono border transition-all ${
                  pipelineFormat === 'github'
                    ? 'bg-[#58a6ff]/20 text-[#58a6ff] border-[#58a6ff]/50 font-bold'
                    : 'bg-[#0d1117] text-[#8b949e] border-[#30363d]'
                }`}
              >
                GitHub Actions (.yml)
              </button>
              <button
                onClick={() => setPipelineFormat('gitlab')}
                className={`py-2 px-3 rounded text-xs font-mono border transition-all ${
                  pipelineFormat === 'gitlab'
                    ? 'bg-[#58a6ff]/20 text-[#58a6ff] border-[#58a6ff]/50 font-bold'
                    : 'bg-[#0d1117] text-[#8b949e] border-[#30363d]'
                }`}
              >
                GitLab CI (.gitlab-ci.yml)
              </button>
            </div>
          </div>

          {/* Runtime */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#8b949e] block font-semibold">
              Application Runtime:
            </label>
            <select
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs px-3 py-2 rounded-md outline-none cursor-pointer"
            >
              <option value="node">Node.js (TypeScript / JavaScript)</option>
              <option value="python">Python (Pytest / FastAPI / Django)</option>
              <option value="go">Go (Golang 1.22)</option>
              <option value="java">Java (Maven / OpenJDK 17)</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-[#21262d]">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#c9d1d9]">
              <input
                type="checkbox"
                checked={enableLint}
                onChange={(e) => setEnableLint(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-[#0d1117] border-[#30363d] text-[#58a6ff]"
              />
              <span>Include Static Analysis & Linter Stage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#c9d1d9]">
              <input
                type="checkbox"
                checked={enableDocker}
                onChange={(e) => setEnableDocker(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-[#0d1117] border-[#30363d] text-[#58a6ff]"
              />
              <span>Build & Publish Docker Container Image</span>
            </label>
          </div>

          {/* Deployment Target */}
          <div className="space-y-1.5 pt-2 border-t border-[#21262d]">
            <label className="text-xs font-mono text-[#8b949e] block font-semibold">
              Deployment Target:
            </label>
            <select
              value={deployTarget}
              onChange={(e) => setDeployTarget(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-xs px-3 py-2 rounded-md outline-none cursor-pointer"
            >
              <option value="kubernetes">Kubernetes Cluster (kubectl / Helm)</option>
              <option value="cloud">Cloud VM / Bare-Metal Script</option>
            </select>
          </div>
        </div>

        {/* Right: Live Generated YAML */}
        <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-xl p-5 sm:p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider font-mono">
              Live Generated Pipeline
            </h2>
            <span className="text-[10px] font-mono text-[#3fb950]">
              ✓ Ready for production use
            </span>
          </div>

          <YamlCodeViewer
            filename={pipelineFormat === 'github' ? '.github/workflows/deploy.yml' : '.gitlab-ci.yml'}
            code={yamlOutput}
            maxHeight="max-h-[600px]"
          />
        </div>
      </div>
    </div>
  );
};
