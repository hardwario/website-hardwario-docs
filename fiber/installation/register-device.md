---
title: Register a Gateway and a Device
---

# Register a Gateway and a Device

Installing the software gets ChirpStack and the concentrator running, but nothing joins the
network until a **gateway** and at least one **device** are registered inside ChirpStack itself.
This part isn't scriptable. It's done through the ChirpStack UI, the same way regardless of
which FIBER variant is running it.

1. Log in to ChirpStack (`http://[TARGET IP ADDRESS]:8080/`, `admin`/`admin` or whatever you
   changed it to). A default tenant named **ChirpStack** already exists. Use it, or create your
   own under **Tenants**.

1. Under **Gateways**, click **Add gateway**:
   - **Gateway ID**: copy this from the Concentratord logs (`sudo journalctl -fu
     chirpstack-concentratord`), printed once the concentrator connects.
   - **Name**: anything descriptive.
   - **Region**: must match one of the `enabled_regions` in `/etc/chirpstack/chirpstack.toml`
     (e.g. `eu868` for Europe).

   Once saved, the gateway's detail page shows a **Last seen at** timestamp that updates
   periodically if the concentrator → MQTT forwarder → ChirpStack chain is actually working.

1. Under **Device profiles**, click **Add device profile**. At minimum set:
   - **Region**: same region as the gateway.
   - **MAC version**: match what your test device (e.g. STICKER, CHESTER) actually speaks
     (LoRaWAN 1.0.x for most HARDWARIO devices; check the device's own documentation).
   - **Regional parameters revision**: leave at ChirpStack's default unless your device needs a
     specific one.
   - **Join type**: **OTAA** for typical HARDWARIO devices.

1. Under **Applications**, click **Add application** to group devices under.

1. Inside that application, click **Add device**:
   - **Device EUI**: the DevEUI printed on the physical device or its documentation.
   - **Device profile**: the one created above.
   - **Device name**: anything descriptive.

   After creating the device, open its **OTAA keys** tab and set the **Application key**
   (`AppKey`), and **Network key** (`NwkKey`) if the device profile is LoRaWAN 1.1, to match
   what is programmed into the physical device. These must match exactly on both sides or the
   join will silently fail.

1. Power on the physical LoRaWAN device. Watch the device's **LoRaWAN frames** tab (live view) in
   the ChirpStack UI. A join-request followed by a join-accept should appear within seconds if
   the gateway is in range and everything above is configured correctly. If nothing appears at
   all, re-check the gateway's **Last seen at** timestamp first, because no traffic reaching the gateway
   means the problem is on the radio/concentrator side, not the device registration.
