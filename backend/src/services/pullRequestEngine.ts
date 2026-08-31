import { mockPullRequests } from '../mockData/pullRequestData.js';
import { PullRequest, PRStatus } from '../types/pullRequest.types.js';
import { WebSocketBroadcaster } from './websocketBroadcaster.js';

export class PullRequestEngine {
  private pullRequests: PullRequest[] = [...mockPullRequests];

  public getAllPRs(statusFilter?: PRStatus): PullRequest[] {
    if (statusFilter) {
      return this.pullRequests.filter(pr => pr.status === statusFilter);
    }
    return this.pullRequests;
  }

  public getPRById(id: number): PullRequest | undefined {
    return this.pullRequests.find(pr => pr.id === id);
  }

  public getClosedPRs(): PullRequest[] {
    return this.pullRequests.filter(pr => pr.status === 'closed' || pr.status === 'merged');
  }

  public createPR(data: {
    title: string;
    description: string;
    sourceBranch: string;
    targetBranch: string;
    author: { username: string; avatarUrl: string; role: string };
  }): PullRequest {
    const nextId = Math.max(...this.pullRequests.map(p => p.id), 100) + 1;
    const newPR: PullRequest = {
      id: nextId,
      title: data.title,
      description: data.description,
      author: data.author,
      repository: "deveops/devpulse-platform",
      sourceBranch: data.sourceBranch,
      targetBranch: data.targetBranch,
      status: "open",
      createdAt: new Date().toISOString(),
      linesAdded: Math.floor(200 + Math.random() * 800),
      linesDeleted: Math.floor(20 + Math.random() * 100),
      filesChanged: Math.floor(4 + Math.random() * 15),
      labels: ["enhancement", "pending-review"],
      autoMergeEnabled: true,
      checks: [
        {
          id: `chk-${nextId}-1`,
          name: "Security & Secret Scans",
          category: "security",
          status: "in_progress",
          details: "Scanning for hardcoded secrets and known CVEs...",
          durationMs: 1200
        },
        {
          id: `chk-${nextId}-2`,
          name: "Automated Unit Tests",
          category: "unit_tests",
          status: "in_progress",
          details: "Running Vitest and backend test suites...",
          durationMs: 2400
        },
        {
          id: `chk-${nextId}-3`,
          name: "OPA Rego Compliance Gate",
          category: "opa_policy",
          status: "queued",
          details: "Evaluating Kubernetes guardrails & Terraform policy rules.",
          durationMs: 0
        }
      ],
      reviews: [],
      commits: [
        {
          hash: Math.random().toString(36).substring(2, 9),
          author: data.author.username,
          message: data.title,
          timestamp: new Date().toISOString(),
          filesChanged: 6
        }
      ]
    };

    this.pullRequests.unshift(newPR);
    WebSocketBroadcaster.getInstance().broadcast('PR_CREATED', newPR);

    // Simulate checks passing after 3 seconds
    setTimeout(() => {
      newPR.checks.forEach(c => {
        c.status = 'passed';
        c.details = 'Passed with 100% compliance score.';
      });
      WebSocketBroadcaster.getInstance().broadcast('PR_UPDATED', newPR);
    }, 3000);

    return newPR;
  }

  public mergePR(id: number, merger: string): PullRequest {
    const pr = this.pullRequests.find(p => p.id === id);
    if (!pr) throw new Error(`PR #${id} not found`);

    pr.status = 'merged';
    pr.closedAt = new Date().toISOString();
    pr.mergedAt = new Date().toISOString();
    pr.mergedBy = merger;
    pr.reviews.push({
      id: `rev-${Date.now()}`,
      reviewer: merger,
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60",
      state: "APPROVED",
      submittedAt: new Date().toISOString(),
      comment: "Approved and merged into main branch."
    });

    WebSocketBroadcaster.getInstance().broadcast('PR_MERGED', pr);
    return pr;
  }

  public closePR(id: number): PullRequest {
    const pr = this.pullRequests.find(p => p.id === id);
    if (!pr) throw new Error(`PR #${id} not found`);

    pr.status = 'closed';
    pr.closedAt = new Date().toISOString();
    WebSocketBroadcaster.getInstance().broadcast('PR_CLOSED', pr);
    return pr;
  }
}
