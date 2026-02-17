# Observability SRE AWS Lab

## Infrastructure

- AWS EC2 (Ubuntu 24.04)
- Kubernetes v1.34.4 (kubeadm)
- containerd runtime
- Flannel CNI

## Monitoring Stack

Deployed via Helm:

- kube-prometheus-stack
  - Prometheus
  - Alertmanager
  - Grafana
- Loki
- Tempo

## Cluster Status

### Nodes

```bash
kubectl get nodes
---

## Progress Tracking

Daily validation and observability setup logs are stored in:

docs/progress-log.md

This file documents:
- Monitoring namespace validation
- Prometheus, Grafana, Loki, Tempo status
- Port-forward verification
- Kubernetes validation commands used
