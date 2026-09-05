---
title: Nahrání Raspberry Pi OS
description: "FIBER se dodává ve dvou hardwarových variantách a postup nahrání se mezi nimi liší."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Nahrání Raspberry Pi OS {#flash-raspberry-pi-os}

FIBER se dodává ve **dvou hardwarových variantách** a postup nahrání se mezi nimi liší.
**Před začátkem vyberte záložku níže, která odpovídá vašemu zařízení**:

:::info FIBER (CM4)

Průmyslová verze založená na Raspberry Pi Compute Module 4. Používá `rpiboot` a propojku BOOT
pro přepnutí do režimu nahrávání.

:::

:::info FIBER Lite (Pi 5)

Varianta pro testování na stole založená na Raspberry Pi 5. Nahrajte systém přímo na microSD kartu, bez kroku
aktivace bootloaderu.

:::

<Tabs groupId="fiber-variant">
<TabItem value="fiber" label="FIBER (CM4)" default>

1. Otevřete horní kryt zařízení **FIBER**.

   :::tip

   Pod gumovými nožičkami jsou čtyři šrouby.

   :::

1. Přesuňte propojku do polohy **BOOT** (musí být svisle zarovnaná s popiskem `BOOT` na desce plošných spojů).

   :::tip

   To umožní přepnutí zařízení do režimu bootloaderu.

   :::

1. Připojte PoE adaptér (musí odpovídat standardu 802.3af) do zásuvky.

1. Připojte ethernetový kabel mezi port LAN na PoE adaptéru a váš LAN router (pokud nechcete použít připojení přes WiFi).

1. Připojte kabel USB-B do **HOST** a do zadního USB konektoru na **TARGET**.

1. Nainstalujte nástroj **rpiboot**: postupujte podle pokynů v tomto GitHub repozitáři:

   **https://github.com/raspberrypi/usbboot**

1. Připojte ethernetový kabel mezi PoE port na PoE adaptéru a ethernetový konektor (RJ-45) zařízení **TARGET**.

1. Spusťte nástroj `rpiboot`.

   :::tip

   Tím by se měl **TARGET** přepnout do režimu bootloaderu. Na **HOST** se objeví nový USB disk.

   :::

1. Stáhněte, nainstalujte a spusťte nástroj [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager).

1. V kroku **Device** vyberte **Raspberry Pi 4** (zahrnuje i Compute Module 4).

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-select-device.png')} alt="Krok Device v Raspberry Pi Imageru s vybraným Raspberry Pi 4 v seznamu zařízení" />

1. V kroku **OS** vyberte **Raspberry Pi OS (other)**.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-choose-os.png')} alt="Krok OS v Raspberry Pi Imageru s vybranou kategorií Raspberry Pi OS (other)" />

1. Vyberte **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-choose-os-lite.png')} alt="Seznam OS v Raspberry Pi Imageru s vybraným Raspberry Pi OS Lite (64-bit)" />

1. V kroku **Storage** vyberte zařízení **FIBER** (zobrazuje se jako **RPi-MSD-0001 Media**).

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-select-storage.png')} alt="Krok Storage v Raspberry Pi Imageru s vybraným USB zařízením RPi-MSD-0001 Media" />

1. V kroku **Customisation** zadejte hostname pro vaše zařízení **FIBER** (např. `fiber`).

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-hostname.png')} alt="Krok Customisation v Raspberry Pi Imageru s polem hostname nastaveným na fiber" />

1. V sekci **Localisation** vyberte svou lokalitu, časové pásmo a rozložení klávesnice.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-localisation.png')} alt="Sekce Localisation v Raspberry Pi Imageru s volbami hlavního města, časového pásma a rozložení klávesnice" />

1. V sekci **User** zadejte uživatelské jméno a heslo.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-user.png')} alt="Sekce User v Raspberry Pi Imageru s vyplněným uživatelským jménem fiber a poli pro heslo" />

   :::tip

   Můžete použít `fiber` jako uživatelské jméno a `hardwario` jako heslo.

   :::

   :::danger

   Toto se doporučuje pouze při SSH autentizaci veřejným klíčem, jinak použijte silné heslo.

   :::

1. Volitelné: V sekci **Wi-Fi** zadejte SSID a heslo své bezdrátové sítě.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-wifi.png')} alt="Sekce Wi-Fi v Raspberry Pi Imageru s poli SSID, heslo a potvrzení hesla pro zabezpečenou síť" />

1. V sekci **Remote access** zapněte **SSH** a vyberte preferovaný způsob autentizace.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-ssh.png')} alt="Sekce SSH autentizace v Raspberry Pi Imageru se zapnutým Enable SSH a vybranou autentizací heslem" />

1. Volitelné: V sekci **Raspberry Pi Connect** můžete povolit vzdálený přístup přes Raspberry Pi Connect. V tomto návodu jej necháváme vypnutý.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-connect.png')} alt="Sekce Raspberry Pi Connect v Raspberry Pi Imageru s vypnutým přepínačem" />

1. Zkontrolujte souhrn a klikněte na **WRITE** pro spuštění zápisu.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-summary.png')} alt="Souhrn zápisu obrazu v Raspberry Pi Imageru se seznamem zařízení, OS, úložiště a úprav před zápisem" />

1. Potvrďte varovný dialog kliknutím na **I UNDERSTAND, ERASE AND WRITE**.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-confirm.png')} alt="Varovný dialog Raspberry Pi Imageru s potvrzovacím tlačítkem I UNDERSTAND, ERASE AND WRITE" />

1. Počkejte na dokončení zápisu.

   <Image img={require('../../../../../fiber/installation/../images/rpi-imager-writing.png')} alt="Raspberry Pi Imager zapisuje obraz OS na úložiště s ukazatelem průběhu" />

1. Po dokončení stiskněte tlačítko **RESET** na **TARGET** (nachází se vedle USB konektoru).

1. Počkejte, až se **TARGET** nastartuje a připojí k síti.

   :::tip

   IP adresu vašeho **TARGET** najdete v zápůjčkách (leases) vašeho DHCP serveru.

   :::

</TabItem>
<TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

FIBER Lite používá běžné Raspberry Pi 5, není zde krok aktivace bootloaderu, žádná propojka BOOT
ani nástroj `rpiboot`. Systém nahrajete přímo na microSD kartu, stejně jako u kteréhokoliv standardního Raspberry Pi.

:::tip

Snímky obrazovky níže jsou převzaté z průběhu Raspberry Pi Imageru na zařízení FIBER založeném na CM4
(výše), protože nástroj i většina kroků jsou bez ohledu na zařízení identické. Několik kroků vypadá
v praxi mírně jinak: výběr **Device** zvýrazňuje **Raspberry Pi 5** místo
Raspberry Pi 4, krok **Storage** zobrazuje vaši čtečku microSD karet pod jejím vlastním názvem
namísto `RPi-MSD-0001 Media` (tento název je specifický pro režim USB boot přes `rpiboot` u CM4, který se
zde nepoužívá) a zobrazený příklad hostname/uživatelského jména je `fiber`/`fiber` namísto
`fiber-lite`/`fiberlite`. Bez ohledu na to, co ukazuje snímek obrazovky, používejte hodnoty pro FIBER Lite uvedené v krocích níže.

:::

1. Stáhněte, nainstalujte a spusťte nástroj [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager).

1. V kroku **Device** vyberte **Raspberry Pi 5**.

1. V kroku **OS** vyberte **Raspberry Pi OS (other)**.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-choose-os.png')} />

1. Vyberte **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-choose-os-lite.png')} />

1. V kroku **Storage** vyberte microSD kartu pro zařízení FIBER Lite.

1. V kroku **Customisation** (ikona ozubeného kola nebo Ctrl+Shift+X) zadejte hostname pro vaše zařízení FIBER
   Lite (např. `fiber-lite`).

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-hostname.png')} />

1. V sekci **Localisation** vyberte svou lokalitu, časové pásmo a rozložení klávesnice.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-localisation.png')} />

1. V sekci **User** zadejte uživatelské jméno a heslo.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-user.png')} />

   :::tip

   Můžete použít `fiberlite` jako uživatelské jméno a `hardwario` jako heslo.

   :::

   :::danger

   Toto se doporučuje pouze při SSH autentizaci veřejným klíčem, jinak použijte silné
   heslo.

   :::

1. Volitelné: v sekci **Wi-Fi** zadejte SSID a heslo své bezdrátové sítě jako záložní připojení
   k LAN.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-wifi.png')} />

1. V sekci **Remote access** zapněte **SSH** a vyberte preferovaný způsob
   autentizace.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-ssh.png')} />

1. Volitelné: v sekci **Raspberry Pi Connect** můžete povolit vzdálený přístup přes Raspberry
   Pi Connect. V tomto návodu jej necháváme vypnutý.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-connect.png')} />

1. Zkontrolujte souhrn, klikněte na **WRITE** pro spuštění zápisu a potvrďte varovný dialog.

1. Počkejte na dokončení zápisu.

   <Image img={require('../../../../../fiber/installation/../fiber-lite/images/rpi-imager-writing.png')} />

1. Po dokončení zápisu vložte microSD kartu do zařízení FIBER Lite a zapněte jej.

1. Počkejte, až se zařízení nastartuje a připojí k síti (30–90 sekund při prvním startu), a poté
   zjistěte jeho IP adresu. Zkuste postupně tyto možnosti:

   - **Router / DHCP leases**: na administrační stránce routeru najděte klienta pojmenovaného podle
     hostname, které jste nastavili (např. `fiber-lite`).
   - **mDNS**: `ping raspberrypi.local` nebo `ping <hostname>.local` (hostname, které jste nastavili v
     Imageru), pokud se ve vaší síti mDNS překládá.
   - **Skenování sítě**: z jiného počítače ve stejné LAN/podsíti:

     ```sh
     nmap -sn 192.168.1.0/24
     ```

     nahraďte `192.168.1.0/24` svou skutečnou podsítí. Hledejte nový host, který tam před zapnutím
     zařízení nebyl.
   - **Monitor + klávesnice**: jako poslední možnost připojte k Pi přímo displej a klávesnici
     a v konzoli spusťte `hostname -I`.

   :::tip

   **Vyhněte se hádání díky statické IP.** Místo pátrání po adrese, kterou přidělil DHCP,
   si ji nastavte sami před prvním startem: vložte čerstvě nahranou kartu zpět do počítače
   a v kořeni boot oddílu (`bootfs`, malý FAT
   svazek, stejný oddíl jako `meta-data`/`user-data`) vytvořte soubor `network-config`:

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

   Upravte adresu, bránu a podsíť podle své sítě, poté zařízení nastartujte a připojte se přes SSH
   rovnou na `192.168.1.50`, bez hledání v zápůjčkách nebo skenování.

   Toto platí pouze při **prvním** startu instance, stejně jako `user-data`, viz
   upozornění na cloud-init níže. Pokud tento soubor přidáváte na kartu, která už jednou nastartovala
   (a účet tedy už existuje), změňte také `instance-id` v `meta-data` na novou hodnotu,
   jinak cloud-init soubor přeskočí jako „already configured".

   :::

1. Připojte se k zařízení přes SSH pomocí uživatelského jména a IP adresy (nebo hostname) z předchozích kroků:

   ```sh
   ssh fiberlite@<TARGET IP ADDRESS>
   ```

   Při prvním připojení potvrďte dotaz na otisk hostitelského klíče a poté zadejte heslo, které jste nastavili
   v Imageru. Všechny příkazy ve zbytku tohoto návodu se spouštějí z této SSH relace, přímo na
   zařízení.

:::danger

**Upozornění na cloud-init.** Nedávné obrazy Raspberry Pi OS používají **cloud-init** namísto staršího
mechanismu se souborem `ssh`/`userconf.txt`. Pokud budete někdy potřebovat ručně upravit `/boot/firmware/meta-data`
(místo použití dialogu Customisation v Imageru), klíč **musí** být `instance-id`
(s pomlčkou), **ne** `instance_id` (s podtržítkem). Klíč s podtržítkem je tiše ignorován a
cloud-init přeskočí vytvoření uživatele při každém dalším startu, což způsobí trvalé „Permission denied" při SSH
i po opravě `user-data`. Pro nastavení uživatelského jména, hesla a SSH vždy používejte vlastní dialog Imageru;
při běžném použití byste neměli potřebovat sahat na soubory cloud-init ručně. Pokud
jsou SSH připojení rovnou odmítána (bez jakéhokoliv dotazu na heslo) nebo přijata, ale každé heslo
je odmítnuto, podívejte se na **Řešení problémů** v postranním panelu.

:::

</TabItem>
</Tabs>
