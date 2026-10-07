---
slug: http-api
title: HTTP API
---

# HTTP API {#http-api}

Zařízení provozuje na portu 80 HTTP server s API. Všechny požadavky kromě `/api/v1/ping` vyžadují autentizaci HTTP Basic Auth. Uživatelské jméno je vždy `admin`. Výchozí heslo je také `admin` a změníte ho volbou `password`. API lze vypnout volbou `enable_server` v nastavení.

Data se přenášejí ve formátu JSON. Každá odpověď je objekt JSON s booleovskou vlastností `ok`, která má hodnotu `true`, pokud požadavek uspěl, a jinak `false`. U úspěšného požadavku jsou případná data odpovědi v poli `data`. Když požadavek selže, odpověď obsahuje pole `msg` s jednou chybovou zprávou nebo se seznamem chybových zpráv.

Příklad neúspěšného požadavku:

```json
{
  "ok": false,
  "msg": "An error message"
}
```

Příklad úspěšného požadavku:

```json
{
  "ok": true,
  "data": [1, 2, 3, 4]
}
```

## HTTP endpointy {#http-endpoints}

### GET `/api/v1/ping` {#get-apiv1ping}

Zařízení odpoví hodnotou `"pong"` v poli `data`. Jako jediný endpoint nevyžaduje autentizaci, takže se hodí ke kontrole dostupnosti.

### GET `/api/v1/config` {#get-apiv1config}

Vrátí aktuální konfiguraci.

### POST `/api/v1/config` {#post-apiv1config}

Aktualizuje konfiguraci zařízení. Zařízení se poté automaticky restartuje.

### POST `/api/v1/ota` {#post-apiv1ota}

Nahraje do zařízení aktualizaci firmwaru. Aktualizace se posílá v těle požadavku jako surová binární data (octet stream). Po odeslání odpovědi se zařízení automaticky restartuje.

### POST `/api/v1/rollback` {#post-apiv1rollback}

Spustí návrat k předchozí verzi firmwaru. Po odeslání odpovědi se zařízení automaticky restartuje.

### POST `/api/v1/reboot` {#post-apiv1reboot}

Restartuje zařízení.

### POST `/api/v1/factory_reset` {#post-apiv1factoryreset}

Obnoví tovární konfiguraci zařízení. Po odeslání odpovědi se zařízení automaticky restartuje.

### POST `/api/v1/counter_reset` {#post-apiv1counterreset}

Vynuluje čítače.

### GET `/api/v1/log` {#get-apiv1log}

Vrátí pole nejnovějších záznamů logu.

### GET `/api/v1/meta` {#get-apiv1meta}

Vrátí metadata zařízení.

Příklad odpovědi:

```json
{
  "ok": true,
  "data": {
    "name": "softli-collector-a0764e81f69a",
    "device_id": "a0764e81f69a",
    "uptime": 25215,
    "version": "v1.2.1rc1",
    "fw_name": "Default firmware",
    "rollback_available": false,
    "free_memory": 19.8,
    "wifi_status": "Access point (0 clients)",
    "wifi_ip": "192.168.254.1",
    "wifi_netmask": "255.255.255.0",
    "wifi_gateway": "192.168.254.1",
    "wifi_mac": "a6:76:4e:81:f6:9a",
    "eth_connected": true,
    "eth_ip": "192.168.255.1",
    "eth_netmask": "255.255.255.0",
    "eth_gateway": "192.168.255.1",
    "eth_mac": "a2:76:4e:81:f6:9a",
    "inputs": [
      {
        "active_count": 35980,
        "inactive_count": 35980,
        "active": false
      },
      ...
    ]
  }
}
```
