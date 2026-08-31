import { mockOPAPolicies, mockVulnerabilities, mockAuditLogs } from '../mockData/securityData.js';
import { OPAPolicy, SecurityVulnerability, AuditLog } from '../types/security.types.js';

export class PolicyScannerEngine {
  private policies: OPAPolicy[] = [...mockOPAPolicies];
  private vulnerabilities: SecurityVulnerability[] = [...mockVulnerabilities];
  private auditLogs: AuditLog[] = [...mockAuditLogs];

  public getPolicies(): OPAPolicy[] {
    return this.policies;
  }

  public getVulnerabilities(): SecurityVulnerability[] {
    return this.vulnerabilities;
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public recordAuditLog(actor: string, action: string, resource: string, status: 'SUCCESS' | 'DENIED' | 'FAILED', details: Record<string, any>): AuditLog {
    const log: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      resource,
      status,
      ipAddress: "127.0.0.1",
      details
    };
    this.auditLogs.unshift(log);
    return log;
  }

  public testRegoPolicy(regoCode: string, inputJson: any): { allowed: boolean; evaluationMs: number; violations: string[] } {
    // Deterministic mock Rego validator
    const violations: string[] = [];
    if (inputJson?.spec?.containers?.some((c: any) => c?.securityContext?.privileged === true)) {
      violations.push("Privileged container execution is disallowed");
    }
    if (inputJson?.spec?.containers?.some((c: any) => !c?.resources?.limits?.cpu)) {
      violations.push("Missing CPU resource limit");
    }

    return {
      allowed: violations.length === 0,
      evaluationMs: 1.4,
      violations
    };
  }
}
