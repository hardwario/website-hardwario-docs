---
title: Install Docker
---

# Install Docker

Required for the [**Dashboard**](dashboard)'s landing page. Not needed on a stock FIBER install.

1. Install Docker and Docker Compose:

   ```sh
   sudo apt install -y docker.io docker-compose
   ```

   :::tip

   Debian's package is named `docker-compose` (not `docker-compose-plugin`, which is Docker's own
   repository naming and is not available from the default Raspberry Pi OS repositories). Both
   the `docker compose` and `docker-compose` command forms work after installing it.

   :::

1. Add your user to the `docker` group so you don't need `sudo` for Docker commands:

   ```sh
   sudo usermod -aG docker $USER
   ```

   :::tip

   Group membership only takes effect on your next login. Log out and back in (or run
   `newgrp docker` in the current shell), then verify with `docker ps` before continuing — if it
   still asks for `sudo`, the group change hasn't taken effect yet.

   :::
