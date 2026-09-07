---
slug: http-api
title: HTTP API
---

# HTTP API

The device hosts an HTTP server with an API on port 80. All requests except `/api/v1/ping` have to be authenticated using HTTP Basic Auth. The user name will always be `admin`. The password is `admin` by default, but it is configurable using the `password` option. The API can be disabled using the `enable_server` settings option.

Data is sent in a JSON format. All responses are a JSON object containing a boolean property `ok`. It is `true` if the request succeeded, `false` otherwise. If the request succeeded, any response data is contained in the `data` field. If the request failed, there will be a `msg` field containing a single error message, or a list of multiple error messages.

Example of a failed request:

```json
{
  "ok": false,
  "msg": "An error message"
}
```

Example of a successful request:

```json
{
  "ok": true,
  "data": [1, 2, 3, 4]
}
```

## HTTP Endpoints

### GET `/api/v1/ping`

The device will respond with `"pong"` in the `data` field. This is the only endpoint that needs no authentication, so it can be used as a liveness probe.

### GET `/api/v1/config`

Get the current configuration.

### POST `/api/v1/config`

Update the device configuration. The device will automatically reboot.

### POST `/api/v1/ota`

Upload a firmware update to the device. The update is sent as raw octet stream in the request body. The device will automatically reboot after sending a response.

### POST `/api/v1/rollback`

Initiate a firmware rollback. The device will automatically reboot after sending a response.

### POST `/api/v1/reboot`

Reboot the device.

### POST `/api/v1/factory_reset`

Reset the device configuration to factory values. The device will automatically reboot after sending a response.

### POST `/api/v1/counter_reset`

Reset the counter values.

### GET `/api/v1/log`

Responds with an array of the most recent logs.

### GET `/api/v1/meta`

Responds with metadata about the device.

Example response:

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
