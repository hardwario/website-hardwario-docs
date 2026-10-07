---
slug: configuration-parameters
title: Konfigurační parametry
---
import Image from '@theme/IdealImage';

# Konfigurační parametry {#configuration-parameters}

Tato kapitola popisuje všechny parametry `lte config`: jaké hodnoty přijímají a kdy je změnit. Hotová nastavení pro jednotlivé poskytovatele SIM karet najdete v kapitole [**Nastavení SIM karty**](sim-card-setup.md).

Všechny parametry vypíše příkaz `lte config show` a uloží příkaz `config save`.

---

### `antenna` – Typ antény {#antenna--antenna-type}
Určuje typ antény připojené k zařízení:

- `internal`: Použít vestavěnou anténu.
- `external`: Použít externě připojenou anténu.

---

### `mode` – Výběr režimu sítě {#mode--network-mode-selection}
Určuje preferované režimy síťového připojení a jejich prioritu:

- `lte-m,nb-iot`: Preferovat **LTE-M**, záložně NB-IoT.
- `nb-iot,lte-m`: Preferovat **NB-IoT**, záložně LTE-M.
- `lte-m`: Použít **pouze LTE-M**.
- `nb-iot`: Použít **pouze NB-IoT**.

> ⚠️ Ověřte, že zvolený režim podporuje vaše SIM karta i místní operátor.

---

### `bands` – Uzamčení frekvenčních pásem {#bands--frequency-band-lock}
Omezuje modem na podmnožinu podporovaných frekvenčních pásem:

- Ponechte prázdné (`""`), aby modem **prohledával všechna podporovaná pásma**. To je výchozí a doporučené nastavení.
- Zadejte čísla pásem oddělená mezerami (například `"3 8 20"`) a modem bude používat jen tato pásma.

Uzamčení pásem zkracuje počáteční vyhledávání sítě, ale zařízení se **nezaregistruje**, pokud operátor používá pásmo, které v seznamu není. Nastavujte je až poté, co si u operátora ověříte pásma používaná v místě nasazení.

---

### `network` – Výběr PLMN {#network--plmn-selection}
Vynutí registraci u konkrétního operátora podle jeho **PLMN ID** (MCC + MNC, například `23003`):

- Prázdná hodnota (`""`) znamená **automatický** výběr operátora. To je výchozí nastavení.
- Zadáním PLMN ID vynutíte **ruční** výběr. Ten je obvykle potřeba u roamingových SIM karet, které by se jinak připojily k nevhodné partnerské síti.

PLMN ID roamingových partnerů, které používají SIM karty Vodafone od **HARDWARIO**, najdete v tabulce [**Vodafone SIM EU28+2**](vodafone-coverage.md).

---

### `apn` – Síťové APN (Access Point Name) {#apn--network-apn-access-point-name}
Definuje APN potřebné pro připojení k mobilní síti:

- **APN** poskytuje **poskytovatel SIM karty**.
- Ponechte prázdné pro **automatickou konfiguraci**, pokud ji síť a modem podporují.

---

### `auth` – Metoda ověřování {#auth--authentication-method}
Definuje metodu ověřování APN:

- `"none"`: Bez ověřování.
- `"pap"`: Použít ověřování PAP (pokud je podporováno).
- `"chap"`: Použít ověřování CHAP (pokud je podporováno).

> Pokud SIM karta ověřování nevyžaduje, použijte `"none"`.

---

### `username` – Uživatelské jméno APN {#username--apn-username}
Uživatelské jméno použité pro ověřování APN.  
Ponechte prázdné (`""`), pokud ověřování není vyžadováno.

---

### `password` – Heslo APN {#password--apn-password}
Heslo použité pro ověřování APN.  
Ponechte prázdné (`""`), pokud ověřování není vyžadováno.

---

### `addr` – Statická IP adresa {#addr--static-ip-address}
Určuje statickou IP adresu přiřazenou síťovému rozhraní LTE.
Pro globální připojení použijte `"157.245.24.13"`.

---

## Starší verze: konfigurace Cloud v1 {#legacy-cloud-v1-configuration}

Starší firmware pro [HARDWARIO Cloud v1](https://legacy.hardwario.cloud) (obvykle katalogový firmware CHESTER verze 2.x.x) potřebuje u těchto dvou konfiguračních položek jiné hodnoty:

- **IP** s SIM kartou Vodafone: `lte config addr 192.168.168.1`
- **IP** s SIM kartou jiného operátora: `lte config addr 165.227.146.193`
- **APN**: `lte config apn hardwario.com`

Všimněte si, že APN má příponu `.com` a IP adresa vede na UDP server Cloud v1.

Nezapomeňte **uložit změny konfigurace zadáním `config save`.**
