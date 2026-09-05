---
title: Konfigurace hardwaru
description: "Tato část nastavuje sběrnici I2C a hodiny reálného času (RTC) na zařízení. Kroky týkající se RTC"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Konfigurace hardwaru {#configure-hardware}

Tato část nastavuje sběrnici I2C a hodiny reálného času (RTC) na zařízení. **Kroky týkající se RTC
se u obou variant liší**, proto až se k nim dostanete, zvolte záložku odpovídající vašemu zařízení:

:::info FIBER (CM4)

Přidává RTC overlay pro externí čip hodin reálného času **PCF85063A**.

:::

:::info FIBER Lite (Pi 5)

RTC overlay se vůbec nepoužívá, protože Raspberry Pi 5 má **vestavěné RTC**, takže tento krok a jeho
ověření vypadají jinak.

:::

1. Nainstalujte balíček **I2C tools** pro diagnostiku sběrnice I2C:

   ```sh
   sudo apt install -y i2c-tools
   ```

1. Nastavte jaderný modul `i2c-dev` tak, aby se automaticky načítal při startu:

   ```sh
   echo 'i2c-dev' | sudo tee -a /etc/modules-load.d/i2c.conf > /dev/null
   ```

1. Přidejte konfiguraci hardwaru do konfiguračního souboru pro boot:

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

   Tím se zapnou rozhraní I2C, vypne se řízení PoE ventilátoru a nastaví se RTC overlay pro
   externí čip RTC **PCF85063A**.

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
   způsobí jen neškodnou, ale rušivou hlášku `error -EREMOTEIO` v logu jádra (pokud na to narazíte,
   podívejte se na **Řešení problémů** v postranním panelu).

   :::

   </TabItem>
   </Tabs>

1. Restartujte systém, aby se konfigurace hardwaru projevila:

   ```sh
   sudo reboot
   ```

1. <Tabs groupId="fiber-variant">
   <TabItem value="fiber" label="FIBER (CM4)" default>

   Ověřte dostupnost sběrnice I2C proskenováním zařízení:

   ```sh
   sudo i2cdetect -y 10
   ```

   :::tip

   Na sběrnici I2C byste měli vidět zařízení RTC.

   :::

   </TabItem>
   <TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

   Není zde žádné externí RTC, které by šlo naskenovat. Vestavěné RTC v Pi 5 tento krok ověření nepotřebuje.

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
