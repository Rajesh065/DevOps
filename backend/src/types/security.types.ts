export interface OPAPolicy {
  id: string;
  name: string;
  category: 'Kubernetes-Guardrail' | 'Terraform-Security' | 'CI-CD-Gate';
  severity: 'high' | 'medium' | 'low';
  enforcement: 'enforced' | 'advisory' | 'disabled';
  regoCode: string;
  description: string;
  violationsCount: number;
}

export interface SecurityVulnerability {
  id: string;
  cveId: string;
  pkgName: string;
  installedVersion: string;
  fixedVersion: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  serviceTarget: string;
  detectedIn: 'Container Image' | 'NPM Package' | 'IaC Resource';
  description: string;
  remediation: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'DENIED' | 'FAILED';
  ipAddress: string;
  details: Record<string, any>;
}
