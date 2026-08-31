import { Router } from 'express';
import {
  getPipelineRuns,
  getPipelineRunById,
  getPipelineDefinitions,
  triggerPipelineRun,
  approvePipelineStage
} from '../controllers/pipelineController.js';

const router = Router();

router.get('/runs', getPipelineRuns);
router.get('/runs/:id', getPipelineRunById);
router.get('/definitions', getPipelineDefinitions);
router.post('/trigger', triggerPipelineRun);
router.post('/runs/:runId/stages/:stageId/approve', approvePipelineStage);

export default router;
