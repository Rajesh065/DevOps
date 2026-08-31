# DevPulse eBPF Kernel Network Security & Microsegmentation

## Overview
DevPulse integrates Linux kernel-level **eBPF (Extended Berkeley Packet Filter)** alongside **Cilium Hubble** to provide line-rate network visibility, transparent encryption (WireGuard/IPsec), and strict Zero-Trust microsegmentation for Kubernetes workloads.

## Security Controls
1. **L3/L4/L7 Policy Enforcement**: Deep packet inspection evaluating DNS FQDNs, HTTP verbs, and gRPC endpoints in the Linux kernel without iptables overhead.
2. **Real-Time Network Flow Telemetry**: Packet verdicts (FORWARDED vs. DROPPED) streamed with millisecond latency metrics.
3. **Automated Threat Mitigation**: Instant XDP/eBPF kernel drop rule injection to block offending CIDRs or compromised workload pods.

## API Endpoints
- `GET /api/network-security/flows`: Stream live network flow events and drop verdicts.
- `POST /api/network-security/drop-rule`: Dynamically attach an eBPF drop filter to isolate malicious IPs or compromised containers.
