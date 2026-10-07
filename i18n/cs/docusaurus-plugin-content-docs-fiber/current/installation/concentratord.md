---
title: Instalace ChirpStack Concentratord
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Instalace ChirpStack Concentratord {#install-chirpstack-concentratord}

V této části nainstalujete a nastavíte **ChirpStack Concentratord** pro modul koncentrátoru LoRa.
**Hardwarové připojení se u obou variant liší**, proto níže vyberte záložku podle svého zařízení:

:::info FIBER (CM4)

Připojení přes **USB**, standardní konfigurace ChirpStack Concentratord.

:::

:::info FIBER Lite (Pi 5)

Připojení přes **SPI** pomocí desky HAT RAK2287, jiný postup instalace.

:::

<Tabs groupId="fiber-variant">
<TabItem value="fiber" label="USB (FIBER, CM4)" default>

1. Stáhněte a nainstalujte spustitelný soubor **ChirpStack Concentratord**:

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

1. Vytvořte konfigurační soubor služby **Concentratord**:

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

1. Vytvořte soubor služby **systemd** pro **Concentratord**:

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

1. Znovu načtěte démona **systemd**, aby novou službu rozpoznal:

   ```sh
   sudo systemctl daemon-reload
   ```

1. Povolte a spusťte službu **ChirpStack Concentratord**:

   ```sh
   sudo systemctl enable --now chirpstack-concentratord
   ```

1. V logu služby ověřte, že se úspěšně spustila, a zjistěte Gateway ID:

   ```sh
   sudo journalctl -fu chirpstack-concentratord
   ```

   :::tip

   Zkopírujte si **Gateway ID** z výstupu logu. Budete ho potřebovat při registraci brány
   v ChirpStack.

   :::

</TabItem>
<TabItem value="fiber-lite" label="SPI přes HAT RAK2287 (FIBER Lite, Pi 5)">

Koncentrátor ve FIBER Lite je tatáž karta koncentrátoru LoRaWAN **RAK5146**, je ale osazená na desce
Pi HAT **RAK2287** připojené přes **SPI**. Hardware se tedy připojuje jinak (zařízení SPI + resetovací
pin GPIO) než u varianty s USB výše.

:::tip

**Nepotřebujete** instalátor SX1302 HAL od RAKwireless. ChirpStack Concentratord obsahuje HAL
i profil výrobce pro tento hardware s mapováním pinů (reset na lince 17 čipu `gpiochip0`),
offsety RSSI a tabulkou vysílacího zesílení.

:::

1. Zapněte SPI a ověřte, že systém desku HAT rozpoznal. Řádek `dtparam=spi=on` je v Raspberry
   Pi OS ve výchozím stavu zakomentovaný:

   ```sh
   grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
   ls /dev/spidev*                       # expect: /dev/spidev0.0 and /dev/spidev0.1
   ```

   Pokud je `dtparam=spi=on` zakomentovaný, odkomentujte ho (nebo ho přidejte) v souboru
   `/boot/firmware/config.txt` a restartujte zařízení. Pokud se ani potom žádné zařízení
   `/dev/spidev*` neobjeví, deska HAT není správně nasazená. Dokud to neopravíte, nepokračujte.

1. Stáhněte a nainstalujte spustitelný soubor **ChirpStack Concentratord**. ChirpStack ho
   nezveřejňuje ve svém repozitáři apt ani jako soubor k vydání na GitHubu, jen jako archiv tar
   na serveru artifacts:

   ```sh
   curl -sL https://artifacts.chirpstack.io/downloads/chirpstack-concentratord/chirpstack-concentratord-sx1302_4.7.1_linux_arm64.tar.gz | sudo tar -xzf - -C /usr/bin --no-same-owner chirpstack-concentratord-sx1302
   ```

1. Vytvořte konfigurační adresář:

   ```sh
   sudo mkdir -p /etc/chirpstack-concentratord
   ```

1. Vytvořte konfigurační soubor služby **Concentratord**:

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

   Kanálový plán `[gateway.concentrator]` je **povinný**. Profil výrobce dodává jen mapování
   pinů, offsety RSSI a tabulku zesílení, kanálový plán ne. Bez něj se každé rádio spustí jako
   `enabled: false` na frekvenci 0 a démon se bez jakékoli chybové zprávy natrvalo zasekne na
   `Opening SPI communication interface`. Vypadá to přesně jako chyba zapojení nebo detekce,
   ale jde čistě o problém konfigurace.

   :::

   :::note

   `model="rak_5146"` zde funguje také. Oba profily používají stejný resetovací pin a ani jeden
   neovládá pin pro zapnutí napájení; liší se jen konfigurací SX1261 pro Listen Before Talk,
   kterou pásmo EU868 nepoužívá.

   :::

1. Vytvořte soubor služby **systemd** pro **Concentratord**:

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

   `Group=chirpstack` a `UMask=0007` jsou nezbytné. Na rozdíl od varianty s USB běží tato služba
   jako **root**, aby měla přístup k zařízení SPI a resetovacímu pinu GPIO. Sockety ZeroMQ IPC,
   které vytváří v `/tmp`, by proto ve výchozím stavu měly vlastníka `root:root` a režim 0755.
   MQTT Forwarder se k nim připojuje jako neprivilegovaný uživatel `chirpstack` a připojení
   k unixovému socketu vyžaduje oprávnění k **zápisu**, takže by bylo odmítnuto. Díky těmto dvěma
   řádkům dostanou sockety vlastníka `root:chirpstack` a režim 0770. Obě služby přitom v každém
   případě hlásí `active`; jediným příznakem je, že do MQTT nikdy nedorazí žádný uplink.

   :::

1. Znovu načtěte démona **systemd**, aby novou službu rozpoznal:

   ```sh
   sudo systemctl daemon-reload
   ```

1. Povolte a spusťte službu **ChirpStack Concentratord**:

   ```sh
   sudo systemctl enable --now chirpstack-concentratord
   ```

1. V logu služby ověřte, že se úspěšně spustila, a zjistěte Gateway ID:

   ```sh
   sudo journalctl -u chirpstack-concentratord | grep 'Gateway ID'
   ```

   Bezchybné spuštění vypadá takto. Řádky `Frame received` se objevují samy při jakémkoli provozu
   LoRaWAN v dosahu, ještě než zaregistrujete vlastní zařízení:

   ```text
   INFO [libconcentratord::reset] Triggering sx130x reset
   INFO [...::concentrator] Configuring radio, radio: 0, enabled: true, center_freq: 867500000
   INFO [...::cmd::root] Gateway ID retrieved, gateway_id: "0016c001f13999e8"
   INFO [...::handler::uplink] Frame received, freq: 868100000, bw: 125000, mod: LoRa, dr: SF7
   ```

   :::tip

   Zkopírujte si **Gateway ID** z výstupu logu. Budete ho potřebovat při registraci brány
   v ChirpStack.

   :::

</TabItem>
</Tabs>
