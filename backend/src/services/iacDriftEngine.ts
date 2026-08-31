import { mockTerraformWorkspaces } from '../mockData/iacData.js';
import { TerraformWorkspace, TerraformResource } from '../types/iac.types.js';

export class IaCDriftEngine {
  private workspaces: TerraformWorkspace[] = [...mockTerraformWorkspaces];

  public getWorkspaces(): TerraformWorkspace[] {
    return this.workspaces;
  }

  public getWorkspaceById(id: string): TerraformWorkspace | undefined {
    return this.workspaces.find(w => w.id === id);
  }

  public runDriftDetection(workspaceId: string): { status: 'in_sync' | 'drift_detected'; driftedResources: TerraformResource[] } {
    const ws = this.workspaces.find(w => w.id === workspaceId);
    if (!ws) throw new Error(`Workspace ${workspaceId} not found`);

    const drifted = ws.resources.filter(r => r.status === 'drifted');
    return {
      status: drifted.length > 0 ? 'drift_detected' : 'in_sync',
      driftedResources: drifted
    };
  }

  public reconcileDrift(workspaceId: string, resourceId: string): TerraformResource {
    const ws = this.workspaces.find(w => w.id === workspaceId);
    if (!ws) throw new Error(`Workspace ${workspaceId} not found`);

    const res = ws.resources.find(r => r.id === resourceId);
    if (!res) throw new Error(`Resource ${resourceId} not found in workspace ${workspaceId}`);

    res.status = 'synced';
    delete res.driftDetails;

    const hasOtherDrift = ws.resources.some(r => r.status === 'drifted');
    ws.driftStatus = hasOtherDrift ? 'drift_detected' : 'in_sync';

    return res;
  }
}
