import { Request, Response } from 'express';
import { ebpfNetworkSecurityEngine } from '../engines/EbpfNetworkSecurityEngine.js';

export const getEbpfFlows = (req: Request, res: Response) => {
  const flows = ebpfNetworkSecurityEngine.getNetworkFlows();
  const status = ebpfNetworkSecurityEngine.getPolicyStatus();
  res.json({
    status,
    totalFlows: flows.length,
    timestamp: new Date().toISOString(),
    flows,
  });
};

export const applyEbpfDropRule = async (req: Request, res: Response) => {
  const { ipAddress, reason } = req.body || {};
  if (!ipAddress) {
    return res.status(400).json({ error: 'BadRequest', message: 'ipAddress is required' });
  }

  const result = await ebpfNetworkSecurityEngine.blockSuspiciousIp(ipAddress, reason || 'Manual security mitigation');
  res.json(result);
};
