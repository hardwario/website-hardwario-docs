---
slug: http-api
title: HTTP API
description: "Zařízení na portu 80 provozuje HTTP server s API. Všechny požadavky musí být autentizovány pomocí HTTP Basic Auth. Uživatelské jméno bude vždy. Heslo je výchozí, ale lze jej nastavit pomocí volby. API lze vypnout pomocí volby v nastavení."
---

# HTTP API {#http-api}

Zařízení na portu 80 provozuje HTTP server s API. Všechny požadavky musí být autentizovány pomocí HTTP Basic Auth. Uživatelské jméno bude vždy. Heslo je výchozí, ale lze jej nastavit pomocí volby. API lze vypnout pomocí volby v nastavení.

Data se odesílají ve formátu JSON. Všechny odpovědi jsou objekt JSON obsahující booleovskou vlastnost. Je-li požadavek úspěšný, jinak. Pokud požadavek uspěl, jsou případná data odpovědi obsažena v poli. Pokud požadavek selhal, bude přítomno pole obsahující jednu chybovou zprávu nebo seznam více chybových zpráv.

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

Zařízení odpoví .

### GET `/api/v1/config` {#get-apiv1config}

Získání aktuální konfigurace.

### POST `/api/v1/config` {#post-apiv1config}

Aktualizace konfigurace zařízení. Zařízení se automaticky restartuje.

### POST `/api/v1/ota` {#post-apiv1ota}

Nahrání aktualizace firmwaru do zařízení. Aktualizace se posílá jako raw octet stream v těle požadavku. Po odeslání odpovědi se zařízení automaticky restartuje.

### POST `/api/v1/rollback` {#post-apiv1rollback}

Zahájení návratu firmwaru na předchozí verzi. Po odeslání odpovědi se zařízení automaticky restartuje.

### POST `/api/v1/reboot` {#post-apiv1reboot}

Restart zařízení.

### POST `/api/v1/factory_reset` {#post-apiv1factoryreset}

Obnovení konfigurace zařízení na výchozí hodnoty. Po odeslání odpovědi se zařízení automaticky restartuje.

### POST `/api/v1/counter_reset` {#post-apiv1counterreset}

Vynulování hodnot počítadel.

### GET `/api/v1/log` {#get-apiv1log}

Odpoví polem nejnovějších záznamů logu.

### GET `/api/v1/meta` {#get-apiv1meta}

Odpoví metadaty o zařízení.

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
