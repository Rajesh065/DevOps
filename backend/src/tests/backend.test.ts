import { PipelineEngine } from '../services/pipelineEngine.js';
import { PullRequestEngine } from '../services/pullRequestEngine.js';
import { KubernetesClusterManager } from '../services/kubernetesClusterManager.js';
import { IaCDriftEngine } from '../services/iacDriftEngine.js';
import { ObservabilityEngine } from '../services/observabilityEngine.js';
import { PolicyScannerEngine } from '../services/policyScannerEngine.js';

let passed = 0;
let failed = 0;

const assert = (condition: boolean, testName: string) => {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${testName}`);
    failed++;
  }
};

console.log('--- DevPulse Backend Automated Test Suite ---');

// 1. Pipeline Engine Tests
console.log('\n[Testing PipelineEngine]');
const pipeEngine = new PipelineEngine();
const runs = pipeEngine.getAllRuns();
assert(runs.length > 0, 'Pipeline runs retrieved');
const newRun = pipeEngine.triggerPipeline('pipe-core-release', 'main', 'production');
assert(newRun.status === 'running', 'New pipeline run initialized in running status');
assert(newRun.stages.length > 0, 'Pipeline contains valid execution stages');

// 2. Pull Request & GitOps Gatekeeper Tests
console.log('\n[Testing PullRequestEngine]');
const prEngine = new PullRequestEngine();
const closedPRs = prEngine.getClosedPRs();
assert(closedPRs.length >= 7, 'Closed pull requests history is accessible');
const allPRs = prEngine.getAllPRs();
assert(allPRs.some(p => p.id === 108 && p.status === 'merged'), 'PR #108 is verified merged');

// 3. Kubernetes Cluster Manager Tests
console.log('\n[Testing KubernetesClusterManager]');
const k8sManager = new KubernetesClusterManager();
const clusters = k8sManager.getClusters();
assert(clusters.length >= 3, 'Multi-cluster discovery functional (AWS, GCP, Azure)');
const pods = k8sManager.getPods();
assert(pods.length > 0, 'Pod inventory retrieved');
const restartRes = k8sManager.restartDeployment('devpulse-backend', 'devpulse-prod');
assert(restartRes.success === true, 'Deployment rollout restart initiated');

// 4. IaC Drift Detection Tests
console.log('\n[Testing IaCDriftEngine]');
const iacEngine = new IaCDriftEngine();
const workspaces = iacEngine.getWorkspaces();
assert(workspaces.length >= 2, 'Terraform workspaces discovered');
const driftCheck = iacEngine.runDriftDetection('ws-aws-staging');
assert(driftCheck.status === 'drift_detected', 'Stage drift detected accurately');
const reconciled = iacEngine.reconcileDrift('ws-aws-staging', 'aws_security_group.ingress_rules');
assert(reconciled.status === 'synced', 'Terraform resource drift reconciled');

// 5. Observability & Policy Tests
console.log('\n[Testing Observability & Security Engine]');
const obsEngine = new ObservabilityEngine();
const metrics = obsEngine.getLiveMetrics();
assert(metrics.length === 30, 'Generated 30 live telemetry data points');

const policyEngine = new PolicyScannerEngine();
const evalRes = policyEngine.testRegoPolicy('', { spec: { containers: [{ securityContext: { privileged: true } }] } });
assert(evalRes.allowed === false, 'OPA policy rejected privileged container');

console.log(`\n========================================`);
console.log(`Test Results: ${passed} passed, ${failed} failed`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
}
