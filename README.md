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

Application → OpenTelemetry Collector →  
Metrics → Prometheus → Grafana  
Logs → Loki → Grafana  
Traces → Tempo → Grafana  

---

## 5. External Access Model

Single external entry point:

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
