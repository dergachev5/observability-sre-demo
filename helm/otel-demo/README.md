# OTel Demo – External Access (NodePort)

Helm override to expose OpenTelemetry Demo `frontend-proxy` via NodePort.

## Apply
helm upgrade otel-demo open-telemetry/opentelemetry-demo -n otel-demo -f helm/otel-demo/values-nodeport.yaml

## Verify
kubectl get svc frontend-proxy -n otel-demo
# expected: NodePort 8080:30808/TCP

External URL:
http://<EC2_PUBLIC_IP>:30808
