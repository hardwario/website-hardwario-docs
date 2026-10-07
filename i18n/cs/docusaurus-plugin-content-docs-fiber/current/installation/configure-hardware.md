---
title: Konfigurace hardwaru
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Konfigurace hardwaru {#configure-hardware}

V této části nastavíte sběrnici I2C a hodiny reálného času (RTC) zařízení. **Kroky pro RTC se u obou
variant liší**, proto až k nim dojdete, zvolte záložku podle svého zařízení:

:::info FIBER (CM4)

Přidává overlay RTC pro externí čip hodin reálného času **PCF85063A**.

:::

:::info FIBER Lite (Pi 5)

Overlay RTC se vůbec nepřidává, protože Raspberry Pi 5 má **vestavěné RTC**; tento krok i jeho
ověření proto vypadají jinak.

:::

1. Nainstalujte balíček **I2C tools** pro diagnostiku sběrnice I2C:

   ```sh
   sudo apt install -y i2c-tools
   ```

1. Nastavte jaderný modul `i2c-dev` tak, aby se automaticky načítal při startu:

   ```sh
   echo 'i2c-dev' | sudo tee -a /etc/modules-load.d/i2c.conf > /dev/null
   ```

1. Přidejte konfiguraci hardwaru do zaváděcího konfiguračního souboru:

   <Tabs groupId="fiber-variant">
   <TabItem value="fiber" label="FIBER (CM4)" default>

   ```sh
   cat << EOF | sudo tee -a /boot/firmware/config.txt > /dev/null
   dtparam=i2c_arm=on
   dtparam=i2c_vc=on
   disable_poe_fan=1
   force_eeprom_read=0
   camera_auto_detect=0
   dtoverlay=i2c-rtc,pcf85063a,i2c_csi_dsi
   EOF
   ```

   :::tip

   Tím se zapnou rozhraní I2C, vypne řízení ventilátoru PoE a nastaví overlay RTC pro
   externí čip **PCF85063A**.

   :::

   </TabItem>
   <TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

   ```sh
   cat << EOF | sudo tee -a /boot/firmware/config.txt > /dev/null
   dtparam=i2c_arm=on
   dtparam=i2c_vc=on
   disable_poe_fan=1
   force_eeprom_read=0
   camera_auto_detect=0
   EOF
   ```

   :::danger

   **Nepřidávejte overlay pro externí RTC.** FIBER (CM4) přidává
   `dtoverlay=i2c-rtc,pcf85063a,i2c_csi_dsi` kvůli externímu čipu hodin reálného času PCF85063A.
   **Na zařízení FIBER Lite tento řádek nepřidávejte.** Raspberry Pi 5 má **nativní vestavěné RTC**,
   které se automaticky registruje jako `rtc0`. Externí overlay nemá s jakým čipem komunikovat a
   v logu jádra jen způsobí neškodnou, ale rušivou hlášku `error -EREMOTEIO` (pokud na ni narazíte,
   podívejte se do sekce **Řešení problémů** v postranním panelu).

   :::

   </TabItem>
   </Tabs>

1. Restartujte systém, aby se konfigurace hardwaru projevila:

   ```sh
   sudo reboot
   ```

1. <Tabs groupId="fiber-variant">
   <TabItem value="fiber" label="FIBER (CM4)" default>

   Proskenováním zařízení ověřte, že je sběrnice I2C dostupná:

   ```sh
   sudo i2cdetect -y 10
   ```

   :::tip

   Na sběrnici I2C byste měli vidět zařízení RTC.

   :::

   </TabItem>
   <TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

   Externí RTC tu není, takže není co skenovat. Vestavěné RTC v Pi 5 tento krok ověření nepotřebuje.

   </TabItem>
   </Tabs>

1. Nainstalujte doplňkové nástroje pro přístup k hardwarovým hodinám:

   ```sh
   sudo apt install util-linux-extra
   ```

1. Ověřte, že jsou hardwarové hodiny dostupné:

   ```sh
   sudo hwclock -v
   ```
