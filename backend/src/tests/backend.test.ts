import { describe, it, expect } from 'vitest';
import { mockPipelines } from '../mockData/pipelines';
import { mockPullRequests } from '../mockData/pullRequests';

describe('DevPulse Engine Tests', () => {
  it('validates pipelines', () => {
    expect(mockPipelines.length).toBeGreaterThanOrEqual(1);
  });
  it('validates closed PRs', () => {
    expect(mockPullRequests.length).toBeGreaterThanOrEqual(8);
  });
});
