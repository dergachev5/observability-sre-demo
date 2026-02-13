# Observability SRE AWS Lab

## Infrastructure
- AWS EC2 (Ubuntu 24.04)
- Kubernetes v1.34.4 (kubeadm)
- containerd runtime
- Flannel CNI

## Monitoring Stack
- kube-prometheus-stack (Helm)
- Prometheus
- Alertmanager
- Grafana

## Cluster Status

### Nodes
```bash
kubectl get nodes
