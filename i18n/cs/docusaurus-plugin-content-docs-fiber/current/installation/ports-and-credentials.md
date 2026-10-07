---
title: Porty a výchozí přihlašovací údaje
---

# Porty a výchozí přihlašovací údaje {#ports--default-credentials}

| Služba | Port | URL | Výchozí přihlášení |
|---|---|---|---|
| SSH | 22 | `ssh <user>@[TARGET IP ADDRESS]` | nastaveno v Raspberry Pi Imager |
| ChirpStack | 8080 | `http://[TARGET IP ADDRESS]:8080/` | `admin` / `admin` |
| Node-RED | 1880 | `http://[TARGET IP ADDRESS]:1880/` | ve výchozím stavu žádné; po zabezpečení `adminAuth` |
| Mosquitto (MQTT) | 1883 | pouze interně (`localhost`) | — |
| Dashboard | 80 | `http://[TARGET IP ADDRESS]/` | žádné (bez autentizace) |
| InfluxDB | 8086 | `http://[TARGET IP ADDRESS]:8086/` | nastaveno během instalace (`influx setup`) |
| Grafana | 3000 | `http://[TARGET IP ADDRESS]:3000/` | nastaveno během instalace (změněno z `admin`/`admin`) |

:::danger

**Výchozí přihlášení do ChirpStack (`admin` / `admin`) žádný z výše uvedených kroků nemění.** Na
rozdíl od Node-RED a Grafany, kterým heslo nastavíte během instalace, má ChirpStack výchozí heslo
z výroby a žádný krok tohoto návodu ho nemění. Než zařízení připojíte do jakékoli sdílené sítě,
heslo změňte: přihlaste se do webového rozhraní a upravte ho v nastavení uživatelského účtu.

:::

Máte potíže? Běžné problémy a jejich řešení najdete v sekci **Řešení problémů** v postranním panelu.
