---
slug: nodered-installer-404
title: Node-RED Installer 404
---

**Symptom:** the Node-RED install command downloads a 404 error page instead of running the
installer.

Release asset filenames on the `node-red/linux-installers` GitHub repository have changed
between versions — a URL that worked previously (or that's quoted in an older guide) can 404
later. Before running the install command, verify the URL resolves:

```sh
curl -o /dev/null -w '%{http_code}\n' <installer-url>
```

If it returns anything other than `200`, check the
[node-red/linux-installers releases page](https://github.com/node-red/linux-installers/releases)
for the current asset name and update the command accordingly.
