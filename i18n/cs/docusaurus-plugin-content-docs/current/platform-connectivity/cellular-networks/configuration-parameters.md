---
slug: configuration-parameters
title: Konfigurační parametry
description: "Tato kapitola popisuje každý parametr lte config, hodnoty, které přijímá, a kdy jej změnit. Hotová nastavení podle poskytovatele SIM karty najdete v kapitole Nastavení SIM karty."
---
import Image from '@theme/IdealImage';

# Konfigurační parametry {#configuration-parameters}

Tato kapitola popisuje každý parametr `lte config`, hodnoty, které přijímá, a kdy jej změnit. Hotová nastavení podle poskytovatele SIM karty najdete v kapitole [**Nastavení SIM karty**](sim-card-setup.md).

Všechny parametry se zobrazí příkazem `lte config show` a uloží příkazem `config save`.

---

### `antenna` – Typ antény {#antenna--antenna-type}
Určuje typ antény připojené k zařízení:

- `internal` – Použije vestavěnou anténu.
- `external` – Použije externě připojenou anténu.

---

### `mode` – Výběr režimu sítě {#mode--network-mode-selection}
Určuje preferované režimy síťového připojení a jejich prioritu:

- `lte-m,nb-iot` – Preferovat **LTE-M**, záložně NB-IoT.
- `nb-iot,lte-m` – Preferovat **NB-IoT**, záložně LTE-M.
- `lte-m` – Použít **pouze LTE-M**.
- `nb-iot` – Použít **pouze NB-IoT**.

> ⚠️ Ověřte, že je zvolený režim podporován vaší SIM kartou i místním operátorem.

---

### `bands` – Uzamčení frekvenčních pásem {#bands--frequency-band-lock}
Omezuje modem na podmnožinu podporovaných frekvenčních pásem:

- Ponechte prázdné (`""`), aby modem **prohledával všechna podporovaná pásma** — to je výchozí a doporučené nastavení.
- Zadejte mezerami oddělený seznam čísel pásem (například `"3 8 20"`), čímž modem uzamknete pouze na tato pásma.

Uzamčení pásem zkracuje počáteční vyhledávání sítě, ale zařízení se **nepřihlásí**, pokud operátor používá pásmo, které v seznamu není. Nastavujte je až poté, co si u operátora ověříte pásma používaná v místě nasazení.

---

### `network` – Výběr PLMN {#network--plmn-selection}
Vynutí registraci ke konkrétnímu operátorovi určenému jeho **PLMN ID** (MCC + MNC, například `23003`):

- Ponechte prázdné (`""`) pro **automatický** výběr operátora — to je výchozí nastavení.
- Zadejte PLMN ID pro vynucení **ručního** výběru, což je obvykle potřeba u roamingových SIM karet, které by se jinak připojily k nevhodné partnerské síti.

PLMN ID roamingových partnerů používaných SIM kartami Vodafone od **HARDWARIO** jsou uvedena v tabulce [**Vodafone SIM EU28+2**](vodafone-coverage.md).

---

### `apn` – Síťové APN (Access Point Name) {#apn--network-apn-access-point-name}
Definuje APN potřebné pro připojení k mobilní síti:

- **APN** poskytuje **poskytovatel SIM karty**.
- Ponechte prázdné pro **automatickou konfiguraci**, pokud ji síť a modem podporují.

---

### `auth` – Metoda ověřování {#auth--authentication-method}
Definuje metodu ověřování APN:

- `"none"` – Bez ověřování.
- `"pap"` – Použít ověřování PAP (pokud je podporováno).
- `"chap"` – Použít ověřování CHAP (pokud je podporováno).

> Pokud vaše SIM karta ověřování nevyžaduje, použijte `"none"`.

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
Pro globální připojení použijte `"157.245.24.13"`

---

## Legacy: Konfigurace Cloud v1 {#legacy-cloud-v1-configuration}

Pro naše starší firmwary [HARDWARIO Cloud v1](https://legacy.hardwario.cloud) (obvykle katalogový firmware CHESTER verze 2.x.x) potřebujete u těchto dvou konfiguračních položek jiné hodnoty:

- **IP** s SIM kartou Vodafone: `lte config addr 192.168.168.1`
- **IP** s SIM kartou jiného operátora: `lte config addr 165.227.146.193`
- **APN**: `lte config apn hardwario.com`

Všimněte si, že APN má příponu `.com` a IP adresa vede na UDP server Cloud v1.

Nezapomeňte **uložit změny konfigurace zadáním `config save`.**
