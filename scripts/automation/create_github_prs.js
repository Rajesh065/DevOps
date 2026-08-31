import https from 'https';

/**
 * DevPulse Automated GitHub Pull Request Creator & Merger
 * Usage: node scripts/automation/create_github_prs.js <GITHUB_TOKEN> <GITHUB_USERNAME> <REPO_NAME>
 */

const [,, token, owner, repo] = process.argv;

if (!token || !owner || !repo) {
  console.log(`
===========================================================================
DevPulse Automated GitHub PR Creator & Merger
===========================================================================
Usage:
  node scripts/automation/create_github_prs.js <GITHUB_TOKEN> <GITHUB_OWNER> <REPO_NAME>

Example:
  node scripts/automation/create_github_prs.js ghp_abc123 myusername devpulse-platform
===========================================================================
  `);
  process.exit(1);
}

const prList = [
  {
    title: "feat(core): REST API Gateway, JWT authentication, RBAC & structured audit logging",
    body: "PR #101: Initial foundation PR establishing Express backend architecture, secure token authentication, role-based authorization, rate limiting, request validation, and tamper-proof audit trails.",
    head: "feat/core-gateway-auth"
  },
  {
    title: "feat(pipeline): Distributed DAG pipeline orchestration engine & step runners",
    body: "PR #102: Core execution engine capable of parsing pipeline YAMLs, scheduling dependent stages, running step commands, handling retry policies, and emitting logs over WebSockets.",
    head: "feat/pipeline-dag-engine"
  },
  {
    title: "feat(iac): Multi-cloud Terraform modules (AWS/GCP/Azure) & state drift analyzer",
    body: "PR #103: Delivers production Terraform modules for VPC, EKS/GKE/AKS, RDS, IAM, S3, and ALB, alongside an automated state parser and drift detection engine.",
    head: "feat/terraform-modules-drift"
  },
  {
    title: "feat(k8s): Multi-cluster Kubernetes explorer, Helm chart templates & Pod log streamer",
    body: "PR #104: Provides cluster topology discovery across EKS, GKE, and AKS, including interactive Pod inspection, Deployments, StatefulSets, Ingress controllers, and real-time pod log tailing.",
    head: "feat/k8s-cluster-explorer"
  },
  {
    title: "feat(security): OPA Rego policy engine, Checkov IaC guardrails & Trivy CVE scanner",
    body: "PR #105: Adds Open Policy Agent (OPA) validation gatekeeper, blocking non-compliant Kubernetes manifests (privileged containers, missing resource limits) and Terraform security misconfigurations.",
    head: "feat/opa-policies-gatekeeper"
  },
  {
    title: "feat(observability): Real-time Prometheus telemetry stream, alert triager & postmortem engine",
    body: "PR #106: Built the high-throughput WebSocket telemetry broadcaster delivering live CPU/Memory/Network metrics, Prometheus alert rules, and automated SEV-1/SEV-2 incident postmortem logging.",
    head: "feat/telemetry-alerts"
  },
  {
    title: "feat(sre): Chaos engineering engine, automated failover & cluster backup playbooks",
    body: "PR #107: Introduces latency injection, pod disruption simulation, automated cross-region database failover, and Velero-compatible S3 snapshot backup routines.",
    head: "feat/sre-chaos-failover"
  },
  {
    title: "feat(frontend): Enterprise DevOps dashboard & live Monaco code editor",
    body: "PR #108: Implements the unified React 18 frontend dashboard featuring DAG pipeline visualizer, K8s cluster inspector, Terraform drift viewer, and real-time observability telemetry streaming.",
    head: "feat/frontend-dashboard-v2"
  }
];

function githubRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path,
      method,
      headers: {
        'User-Agent': 'DevPulse-GitOps-Bot',
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log(`Starting automated PR creation & closure for ${owner}/${repo}...`);
  for (const pr of prList) {
    console.log(`\nCreating PR: "${pr.title}"...`);
    const createRes = await githubRequest('POST', `/repos/${owner}/${repo}/pulls`, {
      title: pr.title,
      body: pr.body,
      head: pr.head,
      base: 'main'
    });

    if (createRes.status === 201) {
      const prNumber = createRes.data.number;
      console.log(`  [CREATED] PR #${prNumber}`);
      console.log(`  Merging PR #${prNumber}...`);
      const mergeRes = await githubRequest('PUT', `/repos/${owner}/${repo}/pulls/${prNumber}/merge`, {
        commit_title: `${pr.title} (#${prNumber})`,
        commit_message: pr.body,
        merge_method: 'merge'
      });
      if (mergeRes.status === 200) {
        console.log(`  [CLOSED & MERGED] PR #${prNumber} is now marked as CLOSED / MERGED on GitHub!`);
      } else {
        console.log(`  [NOTICE] Merge response:`, mergeRes.data);
      }
    } else {
      console.log(`  [NOTICE] PR creation response:`, createRes.data?.message || createRes.data);
    }
  }
  console.log('\n--- All Pull Requests Processed Successfully ---');
}

run().catch(console.error);
