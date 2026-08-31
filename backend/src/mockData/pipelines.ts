import { PipelineRun } from '../types';

export const mockPipelines: PipelineRun[] = [
  {
    id: "run-9842",
    pipelineId: "pipe-core-release",
    pipelineName: "Production Release & Security Gate",
    repository: "deveops/devpulse-platform",
    branch: "main",
    commitHash: "e4f8b91",
    commitMessage: "feat(pipeline): DAG stage orchestration & automated container rollback",
    author: "sarah-devops",
    status: "success",
    trigger: "push",
    startedAt: new Date(Date.now() - 600000).toISOString(),
    completedAt: new Date().toISOString(),
    durationSeconds: 525,
    environment: "production",
    stages: [
      {
        id: "stg-1",
        name: "Lint & Static Analysis",
        status: "success",
        durationMs: 45000,
        steps: [
          {
            id: "stp-1-1",
            name: "ESLint & TypeScript Typecheck",
            command: "npm run lint && tsc --noEmit",
            status: "success",
            durationMs: 22000,
            logs: [
              "[2026-08-31T06:10:01Z] [EXEC] npm run lint",
              "[2026-08-31T06:10:04Z] Checking 111 production source files...",
              "[2026-08-31T06:10:18Z] [SUCCESS] ESLint: 0 errors, 0 warnings",
              "[2026-08-31T06:10:22Z] [SUCCESS] TypeScript v5.5 typecheck passed cleanly"
            ]
          }
        ]
      }
    ]
  }
];
