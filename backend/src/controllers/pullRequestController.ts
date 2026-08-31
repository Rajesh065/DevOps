import { Request, Response } from 'express';
import { PullRequestEngine } from '../services/pullRequestEngine.js';

const prEngine = new PullRequestEngine();

export const getPullRequests = (req: Request, res: Response) => {
  const status = req.query.status as any;
  const prs = prEngine.getAllPRs(status);
  res.json({ success: true, count: prs.length, data: prs });
};

export const getClosedPullRequests = (req: Request, res: Response) => {
  const closedPrs = prEngine.getClosedPRs();
  res.json({ success: true, count: closedPrs.length, data: closedPrs });
};

export const getPullRequestById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const pr = prEngine.getPRById(id);
  if (!pr) {
    return res.status(404).json({ success: false, error: 'Pull request not found' });
  }
  res.json({ success: true, data: pr });
};

export const createPullRequest = (req: Request, res: Response) => {
  const { title, description, sourceBranch, targetBranch, author } = req.body;
  if (!title || !sourceBranch) {
    return res.status(400).json({ success: false, error: 'Title and source branch are required.' });
  }

  const newPr = prEngine.createPR({
    title,
    description: description || '',
    sourceBranch,
    targetBranch: targetBranch || 'main',
    author: author || { username: 'devops-engineer', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60', role: 'DevOps Engineer' }
  });

  res.status(201).json({ success: true, message: 'Pull request created', data: newPr });
};

export const mergePullRequest = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { merger } = req.body;
  try {
    const merged = prEngine.mergePR(id, merger || 'sarah-devops');
    res.json({ success: true, message: `PR #${id} successfully merged`, data: merged });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const closePullRequest = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const closed = prEngine.closePR(id);
    res.json({ success: true, message: `PR #${id} closed`, data: closed });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
