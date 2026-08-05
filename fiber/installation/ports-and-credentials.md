---
title: Ports & Default Credentials
---

# Ports & Default Credentials

| Service | Port | URL | Default Login |
|---|---|---|---|
| SSH | 22 | `ssh <user>@[TARGET IP ADDRESS]` | set in Raspberry Pi Imager |
| ChirpStack | 8080 | `http://[TARGET IP ADDRESS]:8080/` | `admin` / `admin` |
| Node-RED | 1880 | `http://[TARGET IP ADDRESS]:1880/` | none by default; `adminAuth` if hardened |
| Mosquitto (MQTT) | 1883 | internal only (`localhost`) | — |
| Dashboard | 80 | `http://[TARGET IP ADDRESS]/` | — (no authentication) |
| InfluxDB | 8086 | `http://[TARGET IP ADDRESS]:8086/` | set during installation (`influx setup`) |
| Grafana | 3000 | `http://[TARGET IP ADDRESS]:3000/` | set during installation (changed from `admin`/`admin`) |

:::danger

**ChirpStack's default login (`admin` / `admin`) is not changed by any step above** — unlike
Node-RED and Grafana, which get a password set during installation, ChirpStack ships with the
stock default and nothing in this guide rotates it. Change it before exposing the device on any
shared network: log in to the web UI and update the password under the user's account settings.

:::

Running into problems? See **Troubleshooting** in the sidebar for common issues and their fixes.
