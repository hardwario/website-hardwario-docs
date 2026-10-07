---
title: Nahrání Raspberry Pi OS
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nahrání Raspberry Pi OS {#flash-raspberry-pi-os}

FIBER se dodává ve **dvou hardwarových variantách** a postup nahrání se mezi nimi liší.
**Než začnete, vyberte níže záložku podle svého zařízení**:

:::info FIBER (CM4)

Průmyslová verze s modulem Raspberry Pi Compute Module 4. Do režimu nahrávání se přepíná nástrojem
`rpiboot` a propojkou BOOT.

:::

:::info FIBER Lite (Pi 5)

Varianta pro testování na stole postavená na Raspberry Pi 5. Systém nahrajete přímo na kartu microSD,
bootloader není třeba aktivovat.

:::

<Tabs groupId="fiber-variant">
<TabItem value="fiber" label="FIBER (CM4)" default>

1. Otevřete horní kryt zařízení **FIBER**.

   :::tip

   Pod gumovými nožičkami jsou čtyři šrouby.

   :::

1. Přesuňte propojku do polohy **BOOT** (musí být svisle zarovnaná s popiskem `BOOT` na desce plošných spojů).

   :::tip

   Díky tomu půjde zařízení přepnout do režimu bootloaderu.

   :::

1. Zapojte adaptér PoE (musí odpovídat standardu 802.3af) do zásuvky.

1. Ethernetovým kabelem propojte port LAN adaptéru PoE s routerem v místní síti (pokud nechcete použít Wi-Fi).

1. Kabelem USB-B propojte počítač **HOST** se zadním konektorem USB na zařízení **TARGET**.

1. Nainstalujte nástroj **rpiboot**: postupujte podle pokynů v tomto repozitáři na GitHubu:

   **https://github.com/raspberrypi/usbboot**

1. Ethernetovým kabelem propojte port PoE adaptéru PoE s ethernetovým konektorem (RJ-45) zařízení **TARGET**.

1. Spusťte nástroj `rpiboot`.

   :::tip

   Tím by se měl **TARGET** přepnout do režimu bootloaderu. Na počítači **HOST** se objeví nový disk USB.

   :::

1. Stáhněte, nainstalujte a spusťte nástroj [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager).

1. V kroku **Device** vyberte **Raspberry Pi 4** (zahrnuje i Compute Module 4).

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-select-device.png')} alt="Krok Device v nástroji Raspberry Pi Imager s vybraným Raspberry Pi 4 v seznamu zařízení" />

1. V kroku **OS** vyberte **Raspberry Pi OS (other)**.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-choose-os.png')} alt="Krok OS v nástroji Raspberry Pi Imager s vybranou kategorií Raspberry Pi OS (other)" />

1. Vyberte **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-choose-os-lite.png')} alt="Seznam OS v nástroji Raspberry Pi Imager s vybraným Raspberry Pi OS Lite (64-bit)" />

1. V kroku **Storage** vyberte zařízení **FIBER** (zobrazuje se jako **RPi-MSD-0001 Media**).

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-select-storage.png')} alt="Krok Storage v nástroji Raspberry Pi Imager s vybraným USB zařízením RPi-MSD-0001 Media" />

1. V kroku **Customisation** zadejte název hostitele (hostname) zařízení **FIBER** (např. `fiber`).

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-hostname.png')} alt="Krok Customisation v nástroji Raspberry Pi Imager s polem hostname nastaveným na fiber" />

1. V sekci **Localisation** vyberte svou lokalitu, časové pásmo a rozložení klávesnice.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-localisation.png')} alt="Sekce Localisation v nástroji Raspberry Pi Imager s volbami hlavního města, časového pásma a rozložení klávesnice" />

1. V sekci **User** zadejte uživatelské jméno a heslo.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-user.png')} alt="Sekce User v nástroji Raspberry Pi Imager s vyplněným uživatelským jménem fiber a poli pro heslo" />

   :::tip

   Můžete použít `fiber` jako uživatelské jméno a `hardwario` jako heslo.

   :::

   :::danger

   Tuto volbu doporučujeme jen při ověřování SSH veřejným klíčem, jinak použijte silné heslo.

   :::

1. Volitelně: v sekci **Wi-Fi** zadejte SSID a heslo své bezdrátové sítě.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-wifi.png')} alt="Sekce Wi-Fi v nástroji Raspberry Pi Imager s poli SSID, heslo a potvrzení hesla pro zabezpečenou síť" />

1. V sekci **Remote access** zapněte **SSH** a vyberte preferovaný způsob autentizace.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-ssh.png')} alt="Sekce SSH autentizace v nástroji Raspberry Pi Imager se zapnutým Enable SSH a vybranou autentizací heslem" />

1. Volitelně: v sekci **Raspberry Pi Connect** můžete povolit vzdálený přístup přes Raspberry Pi Connect. V tomto návodu ho necháváme vypnutý.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-connect.png')} alt="Sekce Raspberry Pi Connect v nástroji Raspberry Pi Imager s vypnutým přepínačem" />

1. Zkontrolujte souhrn a zápis spusťte tlačítkem **WRITE**.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-summary.png')} alt="Souhrn zápisu obrazu v nástroji Raspberry Pi Imager se seznamem zařízení, OS, úložiště a úprav před zápisem" />

1. Potvrďte varovný dialog kliknutím na **I UNDERSTAND, ERASE AND WRITE**.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-confirm.png')} alt="Varovný dialog nástroje Raspberry Pi Imager s potvrzovacím tlačítkem I UNDERSTAND, ERASE AND WRITE" />

1. Počkejte na dokončení zápisu.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-writing.png')} alt="Raspberry Pi Imager zapisuje obraz OS na úložiště s ukazatelem průběhu" />

1. Po dokončení stiskněte tlačítko **RESET** na zařízení **TARGET** (je vedle konektoru USB).

1. Počkejte, až **TARGET** nastartuje a připojí se k síti.

   :::tip

   IP adresu zařízení **TARGET** najdete v seznamu přidělených adres (leases) na serveru DHCP.

   :::

</TabItem>
<TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

FIBER Lite používá běžné Raspberry Pi 5, takže odpadá aktivace bootloaderu, propojka BOOT
i nástroj `rpiboot`. Systém nahrajete přímo na kartu microSD jako u každého jiného Raspberry Pi.

:::tip

Snímky obrazovky níže jsou převzaté z postupu pro zařízení FIBER s modulem CM4 (výše), protože
nástroj Raspberry Pi Imager i většina kroků jsou pro obě zařízení stejné. Několik kroků ve skutečnosti
vypadá trochu jinak: ve výběru **Device** je zvýrazněné **Raspberry Pi 5** místo Raspberry Pi 4,
krok **Storage** zobrazuje čtečku karet microSD pod jejím vlastním názvem místo `RPi-MSD-0001 Media`
(ten patří režimu USB boot přes `rpiboot` u CM4, který se tu nepoužívá) a ukázkový název hostitele
a uživatelské jméno jsou `fiber`/`fiber` místo `fiber-lite`/`fiberlite`. Bez ohledu na snímky
používejte hodnoty pro FIBER Lite uvedené v krocích níže.

:::

1. Stáhněte, nainstalujte a spusťte nástroj [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager).

1. V kroku **Device** vyberte **Raspberry Pi 5**.

1. V kroku **OS** vyberte **Raspberry Pi OS (other)**.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-choose-os.png')} />

1. Vyberte **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-choose-os-lite.png')} />

1. V kroku **Storage** vyberte kartu microSD pro zařízení FIBER Lite.

1. V kroku **Customisation** (ikona ozubeného kola nebo Ctrl+Shift+X) zadejte název hostitele zařízení
   FIBER Lite (např. `fiber-lite`).

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-hostname.png')} />

1. V sekci **Localisation** vyberte svou lokalitu, časové pásmo a rozložení klávesnice.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-localisation.png')} />

1. V sekci **User** zadejte uživatelské jméno a heslo.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-user.png')} />

   :::tip

   Můžete použít `fiberlite` jako uživatelské jméno a `hardwario` jako heslo.

   :::

   :::danger

   Tuto volbu doporučujeme jen při ověřování SSH veřejným klíčem, jinak použijte silné
   heslo.

   :::

1. Volitelně: v sekci **Wi-Fi** zadejte SSID a heslo své bezdrátové sítě jako záložní připojení
   k LAN.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-wifi.png')} />

1. V sekci **Remote access** zapněte **SSH** a vyberte preferovaný způsob
   autentizace.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-ssh.png')} />

1. Volitelně: v sekci **Raspberry Pi Connect** můžete povolit vzdálený přístup přes Raspberry
   Pi Connect. V tomto návodu ho necháváme vypnutý.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-connect.png')} />

1. Zkontrolujte souhrn, spusťte zápis tlačítkem **WRITE** a potvrďte varovný dialog.

1. Počkejte na dokončení zápisu.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-writing.png')} />

1. Po dokončení zápisu vložte kartu microSD do zařízení FIBER Lite a zařízení zapněte.

1. Počkejte, až zařízení nastartuje a připojí se k síti (při prvním startu 30–90 sekund), a zjistěte
   jeho IP adresu. Zkuste postupně:

   - **Router / DHCP leases**: v administraci routeru najděte klienta pojmenovaného podle nastaveného
     názvu hostitele (např. `fiber-lite`).
   - **mDNS**: `ping raspberrypi.local` nebo `ping <hostname>.local` (název hostitele nastavený
     v nástroji Imager), pokud ve vaší síti funguje překlad mDNS.
   - **Skenování sítě**: z jiného počítače ve stejné LAN/podsíti:

     ```sh
     nmap -sn 192.168.1.0/24
     ```

     a místo `192.168.1.0/24` zadejte svou skutečnou podsíť. Hledejte nový host, který tam před
     zapnutím zařízení nebyl.
   - **Monitor + klávesnice**: jako poslední možnost připojte k Pi přímo displej a klávesnici
     a v konzoli spusťte `hostname -I`.

   :::tip

   **Se statickou IP adresou nemusíte hádat.** Místo hledání adresy, kterou přidělil DHCP,
   si ji před prvním startem nastavte sami: vložte čerstvě nahranou kartu zpět do počítače
   a v kořeni zaváděcího oddílu (`bootfs`, malý svazek FAT, tentýž oddíl, kde jsou
   `meta-data`/`user-data`) vytvořte soubor `network-config`:

   ```yaml title="network-config"
   version: 2
   ethernets:
     eth0:
       dhcp4: false
       addresses:
         - 192.168.1.50/24
       gateway4: 192.168.1.1
       nameservers:
         addresses: [192.168.1.1, 1.1.1.1]
   ```

   Upravte adresu, bránu a podsíť podle své sítě, zařízení nastartujte a připojte se přes SSH
   rovnou na `192.168.1.50`, bez hledání v seznamu přidělených adres a bez skenování.

   Soubor se stejně jako `user-data` uplatní jen při **prvním** startu instance, viz
   upozornění na cloud-init níže. Pokud ho přidáváte na kartu, ze které už systém jednou
   nastartoval (a účet tedy existuje), změňte také `instance-id` v `meta-data` na novou hodnotu,
   jinak ho cloud-init přeskočí jako „already configured“.

   :::

1. Připojte se k zařízení přes SSH s uživatelským jménem a IP adresou (nebo názvem hostitele) z předchozích kroků:

   ```sh
   ssh fiberlite@<TARGET IP ADDRESS>
   ```

   Při prvním připojení potvrďte dotaz na otisk klíče hostitele a zadejte heslo nastavené v nástroji
   Imager. Všechny další příkazy v tomto návodu spouštíte v této relaci SSH přímo na zařízení.

:::danger

**Pozor na cloud-init.** Novější obrazy Raspberry Pi OS používají místo staršího mechanismu se souborem
`ssh`/`userconf.txt` nástroj **cloud-init**. Pokud budete někdy ručně upravovat `/boot/firmware/meta-data`
(místo dialogu Customisation v nástroji Imager), klíč **musí** být `instance-id` (se spojovníkem),
**ne** `instance_id` (s podtržítkem). Klíč s podtržítkem se tiše ignoruje a cloud-init pak při každém
dalším startu přeskočí vytvoření uživatele. SSH proto trvale hlásí „Permission denied“, i když `user-data`
opravíte. Uživatelské jméno, heslo a SSH vždy nastavujte v dialogu nástroje Imager; při běžném použití
byste soubory cloud-init ručně upravovat neměli potřebovat. Pokud SSH připojení rovnou odmítá (vůbec se
nezeptá na heslo), nebo ho přijme, ale odmítne každé heslo, podívejte se do sekce **Řešení problémů**
v postranním panelu.

:::

</TabItem>
</Tabs>
