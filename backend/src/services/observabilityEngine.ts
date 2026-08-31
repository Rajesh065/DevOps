import { generateMockMetrics, mockAlerts, mockIncidents } from '../mockData/observabilityData.js';
import { SystemMetricPoint, SystemAlert, IncidentRecord } from '../types/observability.types.js';

export class ObservabilityEngine {
  private alerts: SystemAlert[] = [...mockAlerts];
  private incidents: IncidentRecord[] = [...mockIncidents];

  public getLiveMetrics(): SystemMetricPoint[] {
    return generateMockMetrics(30);
  }

  public getAlerts(): SystemAlert[] {
    return this.alerts;
  }

  public acknowledgeAlert(id: string): SystemAlert {
    const alert = this.alerts.find(a => a.id === id);
    if (!alert) throw new Error(`Alert ${id} not found`);
    alert.status = 'acknowledged';
    return alert;
  }

  public resolveAlert(id: string): SystemAlert {
    const alert = this.alerts.find(a => a.id === id);
    if (!alert) throw new Error(`Alert ${id} not found`);
    alert.status = 'resolved';
    return alert;
  }

  public getIncidents(): IncidentRecord[] {
    return this.incidents;
  }

  public createIncident(data: Partial<IncidentRecord>): IncidentRecord {
    const nextId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInc: IncidentRecord = {
      id: nextId,
      title: data.title || "Unclassified Production Degradation",
      severity: data.severity || "SEV-2",
      status: "Investigating",
      impactedServices: data.impactedServices || ["api-gateway"],
      commander: data.commander || "elena-sre",
      startedAt: new Date().toISOString(),
      summary: data.summary || "Incident initiated through DevPulse Alert Triager.",
      actionItems: []
    };
    this.incidents.unshift(newInc);
    return newInc;
  }
}
