---
title: LoRaWAN
title_meta: "LoRaWAN (EMBER)"
description: "Konfigurace zařízení EMBER Hotspot: připojení karty LoRa ke spravované službě HARDWARIO, vlastnímu serveru LoRaWAN nebo Datacake."
---

# LoRaWAN {#lorawan}

:::tip

Výchozí servery **TTN** můžete ignorovat.

:::

```
/iot lora servers add address=192.168.16.1 down-port=1700 name=ember-cloud up-port=1700 protocol=UDP
/iot lora set 0 antenna=uFL disabled=no name=gateway-0 network=private servers=ember-cloud
```

:::caution

Pokud nepoužíváte spravovanou službu HARDWARIO, zadejte IP adresu svého serveru **LoRaWAN**; VPN tunely pak konfigurovat nemusíte.

:::

## Datacake {#datacake}

**Datacake** je platforma IoT s vlastním serverem **LoRaWAN**. Chcete-li zařízení **EMBER** připojit ke službě **Datacake**, zaregistrujte si účet a vytvořte dashboard. Zařízení do dashboardu přidáte takto:

* Přidejte server **Datacake** do seznamu serverů tímto příkazem v **RouterOS**

```
/iot lora servers add address=eu1.datacake-lns.com up-port=1700 name=datacake down-port=1700 protocol=UDP
```

* Přiřaďte server **Datacake** zařízení **LoRa**

```
/iot lora set 0 servers=datacake
```

* Přidejte bránu a zadejte tyto údaje:
    - Název brány (libovolný)
    - `Gateway EUI` (v RouterOS se zobrazuje jako `Gateway ID` v `LoRa` > `Devices` > `gateway`)
    - Frekvence (podle umístění zařízení)
