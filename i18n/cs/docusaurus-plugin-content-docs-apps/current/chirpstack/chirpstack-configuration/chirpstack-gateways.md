---
slug: chirpstack-gateways
title: "Brány: Semtech UDP"
sidebar_label: Semtech UDP
title_meta: "Brány: Semtech UDP (ChirpStack)"
---
import Image from '@theme/IdealImage';

# Brány: Semtech UDP {#gateways-semtech-udp}

Tento návod ukazuje, jak připojit bránu k serveru **ChirpStack v4** protokolem **Semtech UDP** (packet forwarder) a jak bránu přidat v aplikaci ChirpStack. Semtech UDP se nastavuje snadno, provoz mezi bránou a serverem ale není šifrovaný ani ověřený. Pro šifrované spojení s certifikáty bran použijte místo toho [Basics Station](./chirpstack-basics-station.md).

## Jak to funguje {#how-it-works}
Brána posílá přijaté pakety LoRaWAN jako datagramy UDP na **ChirpStack Gateway Bridge**, ve výchozím stavu na port **1700**. Bridge je předává přes MQTT serveru ChirpStack a downlinky putují stejnou cestou zpět. V chirpstack-docker běží Gateway Bridge s backendem `semtech_udp` ve výchozím stavu, takže pro EU868 není potřeba server nijak nastavovat.

```toml
[backend]
type="semtech_udp"

  [backend.semtech_udp]
  udp_bind="0.0.0.0:1700"
```

- Ve firewallu otevřete **port UDP 1700** pro síť, ze které brány vysílají.
- Témata MQTT na bridge (např. `eu868/gateway/…`) musí souhlasit s regionem na serveru ChirpStack.

---

## Přidejte bránu v aplikaci ChirpStack {#add-the-gateway-in-chirpstack}
V levém navigačním menu zvolte v části tenantu položku **Gateways** a pak klikněte vpravo nahoře na tlačítko **Add Gateway**.

Objeví se formulář pro údaje o bráně, například:
- **Name**
- **Gateway ID**
- **Stats Interval**

Po vyplnění klikněte na **Submit**.

![ChirpStack v4 – brány](../../../../../../apps/chirpstack/chirpstack-configuration/images/chirpstack-tutorial-1.png)

:::info
Pokud používáte naši **bránu EMBER**, **Gateway ID** najdete v **softwaru MikroTik** pod **LoRa → Devices**.
:::

---

## Nastavte bránu {#configure-the-gateway}
Nasměrujte packet forwarder brány na adresu serveru a port UDP 1700 (up i down).

- EMBER: [ChirpStack v4: Semtech UDP](/ember/lorawan-network-server/lorawan-chirpstack)
- Aktualizace RouterOS na zařízení EMBER: [Aktualizace brány](/ember/mikrotik/gateway-update)

Po připojení ukazuje ChirpStack u brány **Last seen** a v grafech brány přibývají přijaté pakety.

## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete další pomoc nebo vizuální ukázku postupu popsaného v tomto návodu, podívejte se na [**videonávod**](/apps/videos-apps/chirpstack-ember).
:::
