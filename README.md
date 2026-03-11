# Observability SRE Project – AWS Kubernetes Lab

## 1. Infrastructure

- AWS EC2 (Ubuntu 24.04)
- Kubernetes (kubeadm)
- containerd
- Flannel CNI

Single-node Kubernetes cluster used for observability demonstration.

---

## 2. Namespaces

- ingress-nginx
- otel-demo
- monitoring

---

## 3. Application Layer

OpenTelemetry Demo microservices deployed in `otel-demo` namespace.

All services:

- Type: ClusterIP
- Not externally exposed

---

## 4. Observability Stack (monitoring namespace)

Deployed via Helm:

- kube-prometheus-stack
  - Prometheus
  - Alertmanager
  - Grafana
- Loki
- Tempo

Telemetry flow:

Application → OpenTelemetry Collector

Metrics → Prometheus → Grafana  
Logs → Loki → Grafana  
Traces → Tempo → Grafana

---

## 5. External Access Model

Single external entry point.

Ingress NGINX  
Service Type: NodePort  
Port: 30080

Traffic flow:

Internet → NodePort 30080 → Ingress → frontend-proxy → services

No direct NodePort exposure of internal services.

---

## 6. Security Decisions

- Internal services are ClusterIP only
- Monitoring stack not publicly exposed
- Single ingress surface
- No LoadBalancer (lab environment)

---

## 7. Production Considerations

For production deployment:

- Replace NodePort with LoadBalancer
- Enable HTTPS/TLS
- Add real domain
- Restrict Grafana access
- Implement RBAC hardening

---

## 8. Validation Commands

```bash
kubectl get svc -A
kubectl get ingress -A
helm list -A
kubectl get pods -A
```

---

## 9. Installation Procedure

OpenTelemetry Demo deployment:

```bash
kubectl create namespace otel-demo

helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install otel-demo open-telemetry/opentelemetry-demo -n otel-demo
```

Verify deployment:

```bash
kubectl -n otel-demo get pods
```

All pods must be in Running state.

---

## 10. Monitoring Deployment

Add Helm repositories:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

Install monitoring stack:

```bash
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
helm install loki grafana/loki -n monitoring
helm install tempo grafana/tempo -n monitoring
```

Verify monitoring services:

```bash
kubectl -n monitoring get pods
```

---

## 11. Application Validation

Access the application:

http://<node-ip>.nip.io:30080

Validation flow:

- Add product to cart
- Proceed to checkout
- Complete order
- Confirm order confirmation page

---

## 12. Observability Validation

### Metrics

Confirm in Grafana:

- request rate
- error rate
- latency metrics

### Logs

Verify logs from services:

- checkout
- payment
- product-catalog

### Traces

- Trigger checkout
- Confirm distributed trace in Tempo

---

## 13. Golden Signals Dashboard

Grafana dashboard created to monitor the Four Golden Signals methodology.

Metrics monitored:

- Traffic – HTTP Requests Per Second (RPS)
- Errors – HTTP 5xx error rate
- Latency – HTTP P95 request duration
- Saturation – Container CPU usage

Dashboard name:

Golden Signals Dashboard

Purpose:

The dashboard provides real-time service health visibility and infrastructure pressure detection.

---

## 14. SLO Considerations

Example Service Level Objectives (SLO):

- Availability ≥ 99%
- P95 latency < 500ms
- Error rate < 1%

SLOs are validated through Prometheus metrics and visualized in Grafana.

---

## 15. Demo Readiness Checklist

Before presentation:

```bash
kubectl get pods -n otel-demo
kubectl get pods -n monitoring
kubectl get svc -A
kubectl get ingress -A
```

---

## Grafana Dashboard Import Steps

### Export Dashboard

1. Open Grafana
2. Navigate to the dashboard
3. Click Settings (gear icon)
4. Click Export
5. Save JSON file

### Import Dashboard

1. Go to Grafana → Dashboards → Import
2. Upload the exported JSON file
3. Select the correct data source (Prometheus)
4. Click Import

---

## Repository Versioning

Dashboard JSON files should be stored in:

```
/dashboards/
```

This ensures reproducibility and version control of observability configuration.

---

## Epic 7 – Load Testing (k6)

### EN

- Baseline and stress tests implemented with k6
- Results stored in load-testing/results/
- Tested via port-forward on frontend-proxy
- Average latency ~9–10 ms
- 0% failed requests

### RU

- Реализовано нагрузочное тестирование k6 (baseline + stress)
- Результаты находятся в load-testing/results/
- Тестирование через port-forward на frontend-proxy
- Средняя задержка ~9–10 мс
- Ошибок 0%
