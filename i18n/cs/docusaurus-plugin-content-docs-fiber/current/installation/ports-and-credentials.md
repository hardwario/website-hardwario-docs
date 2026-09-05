---
title: Porty a výchozí přihlašovací údaje
description: "rozdíl od Node-RED a Grafana, kterým se heslo nastavuje během instalace, ChirpStack se dodává"
---

# Porty a výchozí přihlašovací údaje {#ports--default-credentials}

| Služba | Port | URL | Výchozí přihlášení |
|---|---|---|---|
| SSH | 22 | `ssh <user>@[TARGET IP ADDRESS]` | nastaveno v Raspberry Pi Imager |
| ChirpStack | 8080 | `http://[TARGET IP ADDRESS]:8080/` | `admin` / `admin` |
| Node-RED | 1880 | `http://[TARGET IP ADDRESS]:1880/` | ve výchozím stavu žádné; `adminAuth` při zabezpečení |
| Mosquitto (MQTT) | 1883 | pouze interně (`localhost`) | — |
| Dashboard | 80 | `http://[TARGET IP ADDRESS]/` |. (bez autentizace) |
| InfluxDB | 8086 | `http://[TARGET IP ADDRESS]:8086/` | nastaveno během instalace (`influx setup`) |
| Grafana | 3000 | `http://[TARGET IP ADDRESS]:3000/` | nastaveno během instalace (změněno z `admin`/`admin`) |

:::danger

**Výchozí přihlášení do ChirpStack (`admin` / `admin`) žádný z výše uvedených kroků nemění**, na
rozdíl od Node-RED a Grafana, kterým se heslo nastavuje během instalace, ChirpStack se dodává
s původním výchozím heslem a nic v tomto průvodci ho nemění. Změňte ho, než zařízení vystavíte do
jakékoli sdílené sítě: přihlaste se do webového rozhraní a upravte heslo v nastavení uživatelského účtu.

:::

Narazili jste na problémy? V bočním panelu najdete **Řešení problémů** s běžnými potížemi a jejich nápravou.
