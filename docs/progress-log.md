# Observability SRE Lab – Progress Log

## Date: 2026-02-16

### Completed Today

- Verified monitoring namespace
- Confirmed Prometheus and Grafana are operational
- Verified Loki deployment and log collection
- Verified Tempo deployment and trace collection
- Successfully port-forwarded:
  - Grafana (13001 → 3000)
  - OTel Demo frontend (10800 → 8080)
- Validated traces in Grafana (Tempo datasource)
- Confirmed service communication in OTel Demo

### Kubernetes Validation Commands Used

```bash
kubectl get pods -A
kubectl -n monitoring get svc
kubectl -n otel-demo get svc
kubectl -n otel-demo port-forward svc/frontend-proxy 10800:8080
