import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "2m", target: 30 },
    { duration: "2m", target: 50 },
    { duration: "1m", target: 0 },
  ],
};

const BASE_URL = __ENV.BASE_URL || "http://otel.18.117.226.138.nip.io";

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, { "status is 200/302": (r) => r.status === 200 || r.status === 302 });
  sleep(1);
}
