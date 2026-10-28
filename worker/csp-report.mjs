// The site's Worker entry. It runs only for POST /csp-report (wrangler.jsonc
// run_worker_first), the first-party collector of Content-Security-Policy
// reports: one JSON line per distinct violation in Workers Logs, query them with
// the filter kind = csp-report. Every other request is a static asset and never
// reaches this code.
//
// Not the chatbot: worker/index.mjs is the dormant chat Worker and stays unused;
// it needs AI and Vectorize bindings this deployment must not carry.
import { hwioWorker } from '@hubpav/hwio-web-worker';

export default hwioWorker({ canonicalHost: null, cspReport: true });
