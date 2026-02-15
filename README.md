
# Observability SRE AWS Lab

---

## Infrastructure

- AWS EC2 (Ubuntu 24.04)
- Kubernetes v1.34.4 (kubeadm)
- containerd runtime
- Flannel CNI

---

## Monitoring Stack

Deployed via Helm:

- kube-prometheus-stack
- Prometheus
- Alertmanager
- Grafana
- Loki
- Tempo

---

## Cluster Status

### Nodes

kubectl get nodes

### All Pods

kubectl get pods -A

---

## Logs (Loki)

Deploy:

helm upgrade --install loki grafana/loki-stack \
  -n monitoring \
  --set promtail.enabled=true \
  --set grafana.enabled=false

Check:

kubectl get pods -n monitoring | grep loki
kubectl get svc -n monitoring | grep loki

Loki is used as Grafana datasource for logs.

---

## Traces (Tempo)

Deploy:

helm upgrade --install tempo grafana/tempo \
  -n monitoring

Check:

kubectl get pods -n monitoring | grep tempo
kubectl get svc -n monitoring | grep tempo

Tempo is used as Grafana datasource for traces.

---

## Access to Tools

### Grafana

Port-forward:

kubectl -n monitoring port-forward --address 127.0.0.1 svc/mon-grafana 13000:80

Open:

http://127.0.0.1:13000

Get admin password:

kubectl get secret -n monitoring mon-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

---

### Prometheus

Port-forward:

kubectl -n monitoring port-forward svc/mon-kube-prometheus-stack-prometheus 9090:9090

Open:

http://127.0.0.1:9090

---

### Loki

Internal service only.
Configured as Grafana datasource.

---

### Tempo

Internal service only.
Configured as Grafana datasource for traces.

---
