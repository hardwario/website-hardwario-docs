---
title: Ports & Default Credentials
---

# Ports & Default Credentials

:::tip Running a FIBER Lite?

**You're not done yet.** The table below lists FIBER Lite's own services (Dashboard, InfluxDB,
Grafana) for reference, but the Installation steps you just followed only cover what FIBER and
FIBER Lite share — they don't install those services. Continue with
[**FIBER Lite**](/fiber/fiber-lite/introduction) in the sidebar (Install Docker, InfluxDB,
Grafana, and the Dashboard) before those rows apply to your device.

:::

| Service | Port | URL | Default Login | Variant |
|---|---|---|---|---|
| SSH | 22 | `ssh <user>@[TARGET IP ADDRESS]` | set in Raspberry Pi Imager | Both |
| ChirpStack | 8080 | `http://[TARGET IP ADDRESS]:8080/` | `admin` / `admin` | Both |
| Node-RED | 1880 | `http://[TARGET IP ADDRESS]:1880/` | none by default; `adminAuth` if hardened | Both |
| Mosquitto (MQTT) | 1883 | internal only (`localhost`) | — | Both |
| Dashboard | 80 | `http://[TARGET IP ADDRESS]/` | — (no authentication) | FIBER Lite |
| InfluxDB | 8086 | `http://[TARGET IP ADDRESS]:8086/` | set during installation (`influx setup`) | FIBER Lite |
| Grafana | 3000 | `http://[TARGET IP ADDRESS]:3000/` | set during installation (changed from `admin`/`admin`) | FIBER Lite |

:::danger

**ChirpStack's default login (`admin` / `admin`) is not changed by any step above** — unlike
Node-RED and Grafana, which get a password set during installation, ChirpStack ships with the
stock default and nothing in this guide rotates it. Change it before exposing the device on any
shared network: log in to the web UI and update the password under the user's account settings.

:::

Running into problems? See **Troubleshooting** in the sidebar for common issues and their fixes.
