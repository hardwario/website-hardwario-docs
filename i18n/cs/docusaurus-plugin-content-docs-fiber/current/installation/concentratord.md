---
title: Instalace ChirpStack Concentratord
description: "Tato část instaluje a konfiguruje ChirpStack Concentratord pro modul LoRa koncentrátoru."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Instalace ChirpStack Concentratord {#install-chirpstack-concentratord}

Tato část instaluje a konfiguruje **ChirpStack Concentratord** pro modul LoRa koncentrátoru.
**Hardwarová cesta se u obou variant liší** — vyberte níže záložku, která
odpovídá vašemu zařízení:

:::info FIBER (CM4)

Připojuje se přes **USB** — standardní konfigurace ChirpStack Concentratord.

:::

:::info FIBER Lite (Pi 5)

Připojuje se přes **SPI** pomocí HAT RAK2287 — jiný postup instalace.

:::

<Tabs groupId="fiber-variant">
<TabItem value="fiber" label="USB — FIBER (CM4)" default>

1. Stáhněte a nainstalujte binárku **ChirpStack Concentratord**:

   ```sh
   curl -sL https://artifacts.chirpstack.io/downloads/chirpstack-concentratord/chirpstack-concentratord-sx1302_4.5.3_linux_arm64.tar.gz | sudo tar -xzf - -C /usr/bin --no-same-owner chirpstack-concentratord-sx1302
   ```

1. Vytvořte konfigurační adresář se správným vlastnictvím:

   ```sh
   sudo install -o chirpstack -g chirpstack -m 0750 -d /etc/chirpstack-concentratord
   ```

1. Vytvořte konfigurační soubor se správným vlastnictvím a oprávněními:

   ```sh
   sudo install -o chirpstack -g chirpstack -m 0640 /dev/null /etc/chirpstack-concentratord/chirpstack-concentratord.toml
   ```

1. Zapište konfigurační soubor **Concentratord**:

   ```sh
   cat << EOF | sudo tee /etc/chirpstack-concentratord/chirpstack-concentratord.toml > /dev/null
   [concentratord]
     log_level="INFO"
     log_to_syslog=false
     stats_interval="30s"
     disable_crc_filter=false

     [concentratord.api]
       event_bind="ipc:///tmp/concentratord_event"
       command_bind="ipc:///tmp/concentratord_command"

   [gateway]
     antenna_gain=0
     lorawan_public=true
     region="EU868"
     model="rak_5146"
     model_flags=["USB"]
     time_fallback_enabled=true
     gateway_id=""

     [gateway.concentrator]
       multi_sf_channels=[
         868100000,
         868300000,
         868500000,
         867100000,
         867300000,
         867500000,
         867700000,
         867900000,
       ]

       [gateway.concentrator.lora_std]
         frequency=868300000
         bandwidth=250000
         spreading_factor=7

       [gateway.concentrator.fsk]
         frequency=868800000
         bandwidth=125000
         datarate=50000

     [gateway.location]
       latitude=0.0
       longitude=0.0
       altitude=0
   EOF
   ```

1. Vytvořte **systemd** service soubor pro **Concentratord**:

   ```sh
   cat << EOF | sudo tee /etc/systemd/system/chirpstack-concentratord.service > /dev/null
   [Unit]
   Description=ChirpStack Concentratord
   Documentation=https://www.chirpstack.io/
   Wants=network-online.target
   After=network-online.target

   [Service]
   User=chirpstack
   Group=chirpstack
   ExecStart=/usr/bin/chirpstack-concentratord-sx1302 -c /etc/chirpstack-concentratord/chirpstack-concentratord.toml
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   EOF
   ```

1. Přidejte uživatele `chirpstack` do skupiny `dialout` pro přístup k sériovému portu:

   ```sh
   sudo usermod -aG dialout chirpstack
   ```

1. Znovu načtěte **systemd** démona, aby rozpoznal novou službu:

   ```sh
   sudo systemctl daemon-reload
   ```

1. Zapněte a spusťte službu **ChirpStack Concentratord**:

   ```sh
   sudo systemctl enable --now chirpstack-concentratord
   ```

1. Zkontrolujte logy služby, abyste ověřili úspěšné spuštění a získali gateway ID:

   ```sh
   sudo journalctl -fu chirpstack-concentratord
   ```

   :::tip

   Zkopírujte si **Gateway ID** z výstupu logu – budete ho potřebovat k registraci brány
   v ChirpStack.

   :::

</TabItem>
<TabItem value="fiber-lite" label="SPI, HAT RAK2287 — FIBER Lite (Pi 5)">

Koncentrátor ve FIBER Lite je tatáž LoRaWAN koncentrátorová karta **RAK5146**, ale nasazená na
Pi HAT **RAK2287** připojený přes **SPI** — jde tedy o jinou hardwarovou cestu (SPI zařízení +
GPIO reset pin) než u výše uvedené varianty připojené přes USB.

:::tip

**Nepotřebujete** instalátor SX1302 HAL od RAKwireless. ChirpStack Concentratord obsahuje HAL
i profil výrobce pro tento hardware, který dodává mapování pinů (reset na lince 17 na
`gpiochip0`), RSSI offsety a tabulku TX zesílení.

:::

1. Zapněte SPI a ověřte, že je HAT detekován. `dtparam=spi=on` je v Raspberry
   Pi OS dodáván zakomentovaný:

   ```sh
   grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
   ls /dev/spidev*                       # expect: /dev/spidev0.0 and /dev/spidev0.1
   ```

   Pokud je `dtparam=spi=on` zakomentovaný, odkomentujte ho (nebo ho přidejte) v souboru
   `/boot/firmware/config.txt` a restartujte. Pokud se poté žádné zařízení `/dev/spidev*`
   neobjeví, HAT není správně nasazen — nepokračujte, dokud nebude.

1. Stáhněte a nainstalujte binárku **ChirpStack Concentratord**. ChirpStack nepublikuje
   Concentratord ve svém apt repozitáři ani jako GitHub release asset, pouze jako tarball na
   artifacts serveru:

   ```sh
   curl -sL https://artifacts.chirpstack.io/downloads/chirpstack-concentratord/chirpstack-concentratord-sx1302_4.7.1_linux_arm64.tar.gz | sudo tar -xzf - -C /usr/bin --no-same-owner chirpstack-concentratord-sx1302
   ```

1. Vytvořte konfigurační adresář:

   ```sh
   sudo mkdir -p /etc/chirpstack-concentratord
   ```

1. Zapište konfigurační soubor **Concentratord**:

   ```sh
   cat << EOF | sudo tee /etc/chirpstack-concentratord/chirpstack-concentratord-sx1302.toml > /dev/null
   [concentratord]
     log_level="INFO"
     log_to_syslog=false
     stats_interval="30s"

     [concentratord.api]
       event_bind="ipc:///tmp/concentratord_event"
       command_bind="ipc:///tmp/concentratord_command"

   [gateway]
     antenna_gain=2
     lorawan_public=true
     region="EU868"
     model="rak_2287"
     model_flags=[]
     gateway_id=""
     time_fallback_enabled=true

     [gateway.concentrator]
       multi_sf_channels=[
         868100000,
         868300000,
         868500000,
         867100000,
         867300000,
         867500000,
         867700000,
         867900000,
       ]

       [gateway.concentrator.lora_std]
         frequency=868300000
         bandwidth=250000
         spreading_factor=7

       [gateway.concentrator.fsk]
         frequency=868800000
         bandwidth=125000
         datarate=50000
   EOF
   ```

   :::warning

   Kanálový plán `[gateway.concentrator]` je **povinný**. Profil výrobce dodává pouze
   mapování pinů, RSSI offsety a tabulku zesílení — kanálový plán nedodává. Bez něj se
   každé rádio nastartuje jako `enabled: false` na frekvenci 0 a démon se natrvalo zablokuje na
   `Opening SPI communication interface` bez jakékoli chybové zprávy, což vypadá naprosto
   stejně jako závada v zapojení nebo detekci, ale jde čistě o problém konfigurace.

   :::

   :::note

   `model="rak_5146"` zde funguje také. Oba profily používají stejný reset pin a ani jeden neřídí
   pin pro zapnutí napájení; liší se pouze konfigurací SX1261 používanou pro Listen Before Talk,
   kterou EU868 nevyužívá.

   :::

1. Vytvořte **systemd** service soubor pro **Concentratord**:

   ```sh
   cat << EOF | sudo tee /etc/systemd/system/chirpstack-concentratord.service > /dev/null
   [Unit]
   Description=ChirpStack Concentratord
   Documentation=https://www.chirpstack.io/
   After=network.target

   [Service]
   Type=simple
   ExecStart=/usr/bin/chirpstack-concentratord-sx1302 -c /etc/chirpstack-concentratord/chirpstack-concentratord-sx1302.toml
   Restart=on-failure
   RestartSec=5
   Group=chirpstack
   UMask=0007

   [Install]
   WantedBy=multi-user.target
   EOF
   ```

   :::warning

   `Group=chirpstack` a `UMask=0007` jsou zásadní. Na rozdíl od varianty s USB běží tato služba
   jako **root**, aby se dostala k SPI zařízení a GPIO reset pinu — což znamená, že ZeroMQ IPC
   sockety, které vytváří v `/tmp`, by měly ve výchozím stavu `root:root` s režimem 0755. MQTT
   Forwarder se k nim připojuje jako neprivilegovaný uživatel `chirpstack` a připojení k unix
   socketu vyžaduje oprávnění pro **zápis**, takže by bylo odmítnuto. Tyto dvě řádky místo toho
   nastaví sockety na `root:chirpstack` s režimem 0770. Obě služby budou hlásit `active` v obou
   případech — jediným symptomem je, že do MQTT nikdy nedorazí žádné uplinky.

   :::

1. Znovu načtěte **systemd** démona, aby rozpoznal novou službu:

   ```sh
   sudo systemctl daemon-reload
   ```

1. Zapněte a spusťte službu **ChirpStack Concentratord**:

   ```sh
   sudo systemctl enable --now chirpstack-concentratord
   ```

1. Zkontrolujte logy služby, abyste ověřili úspěšné spuštění a získali gateway ID:

   ```sh
   sudo journalctl -u chirpstack-concentratord | grep 'Gateway ID'
   ```

   Zdravé spuštění vypadá takto. Řádky `Frame received` se objevují samy z jakéhokoli LoRaWAN
   provozu v dosahu, ještě než zaregistrujete vlastní zařízení:

   ```text
   INFO [libconcentratord::reset] Triggering sx130x reset
   INFO [...::concentrator] Configuring radio, radio: 0, enabled: true, center_freq: 867500000
   INFO [...::cmd::root] Gateway ID retrieved, gateway_id: "0016c001f13999e8"
   INFO [...::handler::uplink] Frame received, freq: 868100000, bw: 125000, mod: LoRa, dr: SF7
   ```

   :::tip

   Zkopírujte si **Gateway ID** z výstupu logu – budete ho potřebovat k registraci brány
   v ChirpStack.

   :::

</TabItem>
</Tabs>
