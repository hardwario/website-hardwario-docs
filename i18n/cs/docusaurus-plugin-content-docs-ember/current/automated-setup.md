---
slug: automated-setup
title: Automatické nastavení
description: "Nastavení HARDWARIO EMBER jedním skriptem: brána sama provede základní konfiguraci, aktualizaci RouterOS, instalaci balíčku IoT a aktualizaci RouterBOARD."
title_meta: "Automatické nastavení (EMBER)"
---

# Automatické nastavení zařízení EMBER {#ember-automated-setup}

Tato stránka navazuje na stránku [Nastavení hardwaru](hardware-setup.md) a popisuje nastavení zařízení EMBER jedním skriptem. Výsledek je stejný jako při [ručním nastavení](manual-setup.md).

:::warning Pro které zařízení je tento postup?

**Zařízení EMBER, které jste dostali od HARDWARIO, je už nastavené. Z těchto stránek nemusíte nic spouštět.**
RouterOS, balíček iot i základní konfigurace na něm už jsou a heslo uživatele admin najdete v protokolu nastavení,
který k němu dostanete. Začněte stránkou [První kroky](getting-started.md).

Tyto stránky popisují nastavení zařízení EMBER od nuly: po resetu, nebo pokud vám nepřišlo nastavené od HARDWARIO.

:::

Skript provede kroky 1.2 až 1.6 ručního nastavení:
- Nastaví identitu **ember**
- Vytvoří **bridge0** s porty **ether2** a **ether3** a adresou **172.31.255.1/24**
- Zapne klienta DHCP na **ether1** (WAN)
- Vypne poznámku při přihlášení
- Aktualizuje RouterOS na nejnovější stabilní verzi a nainstaluje balíček **iot**, pokud chybí
- Odstraní zbytky výchozí konfigurace MikroTik (`192.168.88.1/24` na ether1, `bridgeLocal`)
- Odstraní předem nastavené záznamy síťového serveru LoRaWAN (LNS)
- Aktualizuje firmware RouterBOARD
- Nastaví nové náhodné heslo uživatele admin a uloží protokol nastavení do **Files** (viz 1.3)

EMBER se sám jednou nebo dvakrát restartuje a po každém restartu pokračuje. Celé nastavení trvá asi 12 minut.

---

## Než začnete {#before-you-start}

- Jste připojeni k zařízení EMBER přes Winbox, viz [Nastavení hardwaru → Krok 2](hardware-setup.md#step-2-connect-for-local-access).
- Port **WAN** (ether1) je připojený do sítě s DHCP a přístupem k internetu a váš počítač je ve stejné síti.
- Stáhněte si skript: [ember-first-steps.rsc](pathname:///download/ember-first-steps.rsc)

---

## Krok 1: Spuštění konfiguračního skriptu {#step-1-run-the-setup-script}

### 1.1 První přihlášení {#11-first-login}

**Přihlaste se.** Ve Winboxu se přihlaste jako `admin`. Heslo je `admin`, u zařízení EMBER s RouterOS 6 je prázdné.

**Odstraňte výchozí konfiguraci MikroTik.** Po prvním spuštění Winbox nejdřív zobrazí okno **RouterOS Default Configuration**. Klikněte na **Remove Configuration**, aby EMBER začal s prázdnou konfigurací. EMBER se restartuje: připojte se znovu ze seznamu **Neighbors** (podle MAC adresy) a přihlaste se jako `admin` s prázdným heslem.

![EMBER: okno výchozí konfigurace](../../../../ember/images/ember-auto-default-config.png)

Pokud se vám toto okno nezobrazí nebo jste klikli na **OK**, nevadí: konfigurační skript výchozí konfiguraci MikroTik odstraní.

**Nastavte nové heslo.** Po přihlášení vás Winbox požádá o změnu hesla. Vyplňte staré heslo (to, se kterým jste se přihlásili), dvakrát nové heslo a klikněte na **Change Now**. Konfigurační skript ho později nahradí náhodným heslem (viz 1.3).

![EMBER: změna hesla](../../../../ember/images/ember-auto-change-password.png)

Pokud se vám toto okno nezobrazí, nastavte heslo ručně. Otevřete **nové okno terminálu** (**New Terminal**; pokud se
zeptá na softwarovou licenci, napište `n`; pokud se zeptá na **Login** a **Password**, zadejte `admin` a své heslo; u zařízení EMBER s vymazanou konfigurací je heslo prázdné, stačí stisknout **Enter**) a vložte:

```
/user set admin password=YOUR_NEW_PASSWORD
```

Nebo to udělejte ručně ve Winboxu:

1. V levém panelu otevřete **System → Password**.

   ![Winbox 4: změna hesla](../../../../ember/images/winbox-change-pass-1.png)

2. Vyplňte pole a klikněte na **Change**:
   - Old Password: to, se kterým jste se přihlásili (u zařízení EMBER s vymazanou konfigurací prázdné, u nového zařízení EMBER od HARDWARIO **ember**)
   - New Password: `<YOUR_PASSWORD>`
   - Confirm Password: `<YOUR_PASSWORD>`

   ![Winbox 4: nové heslo](../../../../ember/images/winbox-change-pass-2.png)

**Potom** se ve Winboxu odpojte a připojte se znovu s novým heslem. Winbox ho pak použije k opětovnému připojení po každém restartu.

### 1.2 Nahrání skriptu {#12-upload-the-script}

V levém panelu otevřete **Files**:

![Winbox 4: Files v levém panelu](../../../../ember/images/ember-auto-files-open.png)

Přetáhněte do okna soubor `ember-first-steps.rsc` ze svého počítače, nebo klikněte na **Upload...** a soubor vyberte:

![EMBER: nahraný skript ve Files](../../../../ember/images/ember-auto-files-upload.png)

### 1.3 Spuštění skriptu {#13-run-the-script}

1. Otevřete **nové okno terminálu** (**New Terminal**). Pokud se terminál zeptá `Do you want to see the software license? [Y/n]`, napište `n`. Pokud se zeptá na **Login** a **Password**, zadejte `admin` a své heslo.

   ![Winbox 4: otevření nového terminálu](../../../../ember/images/winbox-open-terminal.png)

2. Vložte tento příkaz a stiskněte **Enter**:

   ```routeros
   /import file-name=ember-first-steps.rsc
   ```

   Terminál potvrdí, že nastavení začalo. I když napíše **Script file loaded and executed successfully**,
   nastavení ještě není hotové: pokračuje na pozadí (viz 1.4).

   Terminál také zobrazí **nové heslo uživatele admin**. Poznamenejte si ho hned: nastavení se spustí až po 2 minutách
   a od té doby se s ním Winbox přihlašuje, i po každém restartu. Heslo je uložené také ve **Files**, ve složce
   **flash**, jako **ember-protocol.txt**. Každý import nastaví nové heslo.

### 1.4 Počkejte na dokončení {#14-wait-until-it-is-done}

V levém panelu otevřete **Log**. Když se EMBER restartuje, Winbox se odpojí: připojte se znovu ze seznamu **Neighbors**. Během nastavení neodpojujte napájení.

Nastavení je hotové, když se v logu objeví řádek, který začíná **ember-first-steps: DONE**, a za ním nainstalované verze RouterOS a firmwaru RouterBOARD. Pokud se místo něj objeví řádek, který začíná **ember-first-steps: STOPPED**, najdete v něm, co dělat dál.

### 1.5 Kontrola výsledku {#15-check-the-result}

- **System → RouterBOARD**: **Current Firmware** je stejný jako **Upgrade Firmware**.
- **System → Packages → Check for Updates**: *System is already up to date*.
- **Files → flash → ember-protocol.txt**: přetáhněte ho do počítače a uschovejte. Tento protokol nastavení obsahuje heslo
  uživatele admin a vše, co skript nastavil.

Samotné rozhraní LoRa včetně volby antény a hodnoty `antenna-gain` pro připojenou
anténu nastavíte spolu s backendem v kroku 3, viz
[Konfigurace hotspotu → LoRaWAN](hotspot-configuration/lorawan.md) a
[Zisk antény a výstupní výkon](mikrotik/antenna-gain.md).

---

## Krok 2: Kontrola nastavení {#step-2-check-the-setup}

Než zvolíte backend, zkontrolujte:

| Hotovo | Co zkontrolovat |
|:---:|---|
| ☐ | Ke kartě LoRa je připojená anténa: vnitřní z výroby, nebo externí na **LRW** |
| ☐ | Napájení je připojené (24 V DC nebo pasivní PoE 24 V přes WAN) |
| ☐ | Venkovní instalace: konektory směřují dolů |
| ☐ | Počítač je připojený k portu **LAN** (ether2 nebo ether3) se statickou IP adresou z rozsahu `172.31.255.0/24` a dosáhne na `172.31.255.1` (změněno z výchozí hodnoty) |
| ☐ | Přihlášení do RouterOS funguje (`admin` / heslo z protokolu nastavení) |
| ☐ | Výchozí konfigurace MikroTik je odstraněná (žádná adresa `192.168.88.1/24`, žádný `bridgeLocal`) |
| ☐ | Počáteční konfigurační skript je hotový (krok 1) |
| ☐ | RouterOS je aktualizovaný na nejnovější stabilní verzi |
| ☐ | Balíček IoT je nainstalovaný |
| ☐ | Firmware RouterBOARD je aktualizovaný |

---

## Krok 3: Výběr backendu LoRaWAN {#step-3-choose-your-lorawan-backend}

### Spravovaný síťový server HARDWARIO (spravovaný backend) {#hardwario-managed-network-server-managed-backend}

HARDWARIO může síťový server LoRaWAN provozovat za vás jako plně **spravovanou službu**.  
Služba je určená pro rychlý start bez vlastní infrastruktury.

Služba obvykle zahrnuje:
- **The Things Stack**: síťový server LoRaWAN  
- **Node-RED**: zpracování dat, dekódování payloadu a přeposílání  
- Předem nastavené propojení brány, LNS a integrací

K zařízení EMBER může HARDWARIO volitelně dodat také **SIM kartu s konektivitou** pro páteřní připojení LTE a **bezpečný vzdálený přístup přes OpenVPN**.

Tuto možnost doporučujeme, pokud chcete **rychle získat data ze zařízení** a předávat je do aplikací nebo dashboardů.

#### Klíčové odkazy {#key-links}
- Přehled a koncept služby:  
  **https://docs.hardwario.com/ember/cloud-service/**

- Webový portál (správa služby):  
  https://docs.hardwario.com/ember/cloud-service/#web-management

- Node-RED ve spravované službě:  
  https://docs.hardwario.com/ember/cloud-service/#node-red-application

---

### ChirpStack (na vlastním serveru) {#chirpstack-self-hosted}

**Dokumentace:**
- ChirpStack (přehled síťového serveru LoRaWAN):  
  **https://docs.hardwario.com/ember/lorawan-network-server/lorawan-chirpstack**

Další zdroje:
- Přidání brány EMBER do ChirpStack v4 (návod HARDWARIO):  
  https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-gateways/

- (Volitelně) Instalace ChirpStack v4 (Debian/Ubuntu):  
  https://docs.hardwario.com/apps/chirpstack/chirpstack-installation/

---

### The Things Stack {#the-things-stack}

**Dokumentace**
- The Things Stack (přehled síťového serveru LoRaWAN):  
  **https://docs.hardwario.com/ember/lorawan-network-server/lorawan-tts**


---

### Vlastní server LoRaWAN {#self-hosted-lorawan-server}
Pokud už provozujete jiný server LoRaWAN, můžete EMBER nastavit tak, aby na něj přeposílal pakety.

Důležitá poznámka ze stránky Konfigurace hotspotu:
- Pokud **nepoužíváte spravovanou službu HARDWARIO**, zadejte **IP adresu svého serveru LoRaWAN**;
  **VPN tunely pak konfigurovat nemusíte**.

Viz: https://docs.hardwario.com/ember/hotspot-configuration/lorawan/

---

## Rychlé řešení problémů {#troubleshooting-quick}

#### Adresa `172.31.255.1` není dostupná {#cant-reach-172312551}
- Zkontrolujte, že je kabel zapojený do portu **LAN** (ether2 nebo ether3), ne do WAN. Po spuštění konfiguračního skriptu je adresa `172.31.255.1` na rozhraní bridge0 (LAN) a port WAN (ether1) je jen klient DHCP.
- Nastavte počítači statickou IP adresu z rozsahu `172.31.255.0/24` (např. `172.31.255.10`): konfigurační skript nespouští server DHCP.
- Zkontrolujte kontrolky linky na ethernetovém portu.
- Pokud jste ještě nespustili konfigurační skript, výchozí IP adresa může být stále `172.31.255.254`.
- Po **Remove Configuration** nemá EMBER až do spuštění konfiguračního skriptu žádnou IP adresu: připojte se podle MAC adresy ze seznamu **Neighbors**.

#### Brána je zapnutá, ale server LoRaWAN ji „nevidí“ {#gateway-is-powered-but-not-seen-in-the-lorawan-server}
- Zkontrolujte, zda je propojka vyjmutá. Obrázek najdete [zde](hardware-setup.md#21-connect-to-ember-using-winbox-4).
- Ověřte, kam brána přeposílá data (adresa serveru / porty / protokol).
- Zkontrolujte připojení k internetu přes WAN/LTE.
- Ověřte, že je nainstalovaný balíček IoT (příkazem `/system package print`).
- Ověřte, že je rozhraní LoRa nakonfigurované (příkazem `/iot lora print`).
- Pokud používáte spravovanou službu HARDWARIO, ověřte, že používáte URL služby, kterou jste od nás dostali, a správné konfigurační pokyny.

#### Reset zařízení {#reset-device}
Odpojte napájecí kabel, stiskněte a držte tlačítko reset a kabel znovu zapojte. Asi po 5 sekundách začne LED blikat: tlačítko hned uvolněte. Kde je tlačítko reset, ukazuje obrázek [zde](hardware-setup.md#21-connect-to-ember-using-winbox-4).

#### Základní konfigurace RouterOS {#want-to-understand-the-baseline-routeros-configuration}
- Referenční konfiguraci popisuje stránka:  
  https://docs.hardwario.com/ember/hotspot-configuration/
