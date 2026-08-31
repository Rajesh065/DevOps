import { Request, Response } from 'express';
import { supplyChainSecurityEngine } from '../engines/SupplyChainSecurityEngine.js';

export const listSupplyChainAttestations = (req: Request, res: Response) => {
  const attestations = supplyChainSecurityEngine.listAttestations();
  res.json({
    total: attestations.length,
    timestamp: new Date().toISOString(),
    attestations,
  });
};

export const getSupplyChainAttestationById = (req: Request, res: Response) => {
  const { id } = req.params;
  const attestation = supplyChainSecurityEngine.getAttestationById(id);
  if (!attestation) {
    return res.status(404).json({ error: 'NotFound', message: `Attestation ${id} not found.` });
  }
  res.json(attestation);
};

export const verifyImage = async (req: Request, res: Response) => {
  const { imageDigest } = req.body || {};
  if (!imageDigest) {
    return res.status(400).json({ error: 'BadRequest', message: 'imageDigest is required.' });
  }

  const result = await supplyChainSecurityEngine.verifyImageSignature(imageDigest);
  res.json(result);
};
