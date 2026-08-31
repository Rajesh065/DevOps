import { mockPipelineRuns, mockPipelineDefinitions } from '../mockData/pipelineData.js';
import { PipelineRun, PipelineDefinition, PipelineStage } from '../types/pipeline.types.js';
import { WebSocketBroadcaster } from './websocketBroadcaster.js';

export class PipelineEngine {
  private runs: PipelineRun[] = [...mockPipelineRuns];
  private definitions: PipelineDefinition[] = [...mockPipelineDefinitions];

  public getAllRuns(): PipelineRun[] {
    return this.runs;
  }

  public getRunById(id: string): PipelineRun | undefined {
    return this.runs.find(r => r.id === id);
  }

  public getDefinitions(): PipelineDefinition[] {
    return this.definitions;
  }

  public triggerPipeline(pipelineId: string, branch: string = 'main', environment: 'development' | 'staging' | 'production' = 'production'): PipelineRun {
    const def = this.definitions.find(d => d.id === pipelineId);
    if (!def) {
      throw new Error(`Pipeline definition ${pipelineId} not found`);
    }

    const runId = `run-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRun: PipelineRun = {
      id: runId,
      pipelineId: def.id,
      pipelineName: def.name,
      repository: def.repository,
      branch: branch,
      commitHash: Math.random().toString(36).substring(2, 9),
      commitMessage: `Trigger manual execution on branch ${branch}`,
      author: "sarah-devops",
      status: "running",
      trigger: "manual",
      startedAt: new Date().toISOString(),
      environment: environment,
      stages: def.stages.map((stg, idx) => ({
        id: `stg-${idx + 1}`,
        name: stg.name,
        status: idx === 0 ? "running" : "pending",
        requiresApproval: stg.requiresApproval,
        steps: stg.steps.map((stp, sIdx) => ({
          id: `stp-${idx + 1}-${sIdx + 1}`,
          name: stp.name,
          command: stp.command,
          status: idx === 0 && sIdx === 0 ? "running" : "pending",
          logs: idx === 0 && sIdx === 0 ? [`[EXEC] Running: ${stp.command}...`] : []
        }))
      }))
    };

    this.runs.unshift(newRun);
    WebSocketBroadcaster.getInstance().broadcast('PIPELINE_STATUS_UPDATE', newRun);

    // Simulate async progression of the pipeline in background
    this.simulatePipelineProgression(runId);

    return newRun;
  }

  private simulatePipelineProgression(runId: string): void {
    let currentStageIndex = 0;

    const interval = setInterval(() => {
      const run = this.runs.find(r => r.id === runId);
      if (!run || run.status !== 'running') {
        clearInterval(interval);
        return;
      }

      const stage = run.stages[currentStageIndex];
      if (!stage) {
        run.status = 'success';
        run.completedAt = new Date().toISOString();
        WebSocketBroadcaster.getInstance().broadcast('PIPELINE_STATUS_UPDATE', run);
        clearInterval(interval);
        return;
      }

      stage.status = 'success';
      stage.steps.forEach(stp => {
        stp.status = 'success';
        stp.logs.push(`[SUCCESS] Completed step ${stp.name} successfully.`);
      });

      currentStageIndex++;
      if (currentStageIndex < run.stages.length) {
        run.stages[currentStageIndex].status = 'running';
        if (run.stages[currentStageIndex].steps[0]) {
          run.stages[currentStageIndex].steps[0].status = 'running';
          run.stages[currentStageIndex].steps[0].logs.push(`[EXEC] Initializing ${run.stages[currentStageIndex].steps[0].name}...`);
        }
      } else {
        run.status = 'success';
        run.completedAt = new Date().toISOString();
        clearInterval(interval);
      }

      WebSocketBroadcaster.getInstance().broadcast('PIPELINE_STATUS_UPDATE', run);
    }, 2500);
  }

  public approveStage(runId: string, stageId: string, approver: string): PipelineRun {
    const run = this.runs.find(r => r.id === runId);
    if (!run) throw new Error(`Run ${runId} not found`);
    const stage = run.stages.find(s => s.id === stageId);
    if (!stage) throw new Error(`Stage ${stageId} not found`);

    stage.approvedBy = approver;
    stage.status = 'running';
    WebSocketBroadcaster.getInstance().broadcast('PIPELINE_STATUS_UPDATE', run);
    return run;
  }
}
