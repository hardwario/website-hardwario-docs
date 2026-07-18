---
slug: docker-compose-plugin-not-found
title: '"sudo apt install docker-compose-plugin" fails with "Unable to locate package"'
---

`docker-compose-plugin` is Docker's own upstream repository naming, not what Debian's default
repositories ship. Install `docker-compose` instead — Debian's package provides the same
functionality; both the `docker compose` and `docker-compose` command forms work afterward.
