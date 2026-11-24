---
slug: device-info
title: Informace o zařízení
description: "Informace o zařízení CHESTER v aplikaci HARDWARIO Manager: firmware, doba provozu, výrobce, adresa a passkey Bluetooth, hardware a token pro nárokování."
---

# Informace o zařízení CHESTER {#chester-device-info}

Jakmile je zařízení připojené, otevřete **CHESTER → Informace o zařízení**.
Obrazovka se stejným názvem ukazuje, za co se zařízení vydává a jak dlouho
je v provozu.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-device-info.png" alt="Obrazovka Informace o zařízení: nahoře název produktu a sériové číslo, pod nimi Firmware, Název firmwaru, Doba provozu, Výrobce, Adresa Bluetooth, skrytý Passkey Bluetooth, Hardware, Revize a skrytý Token pro nárokování, dole tlačítko Sdílet" width="320" />

---

## Co se zobrazuje {#what-is-shown}

Obrazovku otevírá název produktu a sériové číslo. Pod nimi jsou řádky:

| Řádek | Význam |
|---|---|
| **Firmware** | Běžící verze firmwaru |
| **Název firmwaru** | Aplikace ve firmwaru. Starší firmware ho nemusí hlásit |
| **Doba provozu** | Doba od posledního startu zařízení, průběžně aktualizovaná. Do příchodu první hodnoty drží místo pomlčka |
| **Výrobce** | Výrobce zařízení |
| **Adresa Bluetooth** | Adresa BLE zařízení |
| **Passkey Bluetooth** | Passkey, se kterým se telefon páruje; skrytý, dokud ho nezobrazíte |
| **Hardware** | Varianta hardwaru, tedy celý objednací kód tohoto kusu |
| **Revize** | Revize desky |
| **Token pro nárokování** | Token, kterým se zařízení nárokuje; skrytý, dokud ho nezobrazíte |

Řádky, které zařízení nehlásí, se vynechají, místo aby zůstaly prázdné. Hodnoty
můžete označit a zkopírovat, skryté až po zobrazení.

Passkey a token pro nárokování se zobrazují jako tečky, protože na tuto obrazovku
se často dívá i někdo přes rameno. Tlačítko s okem vedle každého z nich
(**Zobrazit**, pak **Skrýt**) hodnotu ukáže nebo skryje. Tlačítko kopírování
vedle tokenu (**Kopírovat token pro nárokování**) token zkopíruje, i když je
skrytý, a právě to potřebujete při vkládání do formuláře pro nárokování.

---

## Kopírování a sdílení {#copy-or-share-it}

**Sdílet** dole na obrazovce otevře nabídku sdílení telefonu s názvem zařízení
a pod ním jedním řádkem `Label: value` pro každý údaj. Takhle nejrychleji
pošlete identitu zařízení podpoře.

:::caution Sdílený text obsahuje tajné údaje
Sdílený text obsahuje řádky **Passkey Bluetooth** a **Token pro nárokování**
v čitelné podobě, i když jsou na obrazovce skryté. Kdo ho přečte, může se se zařízením
spárovat nebo si ho nárokovat. Posílejte ho jen lidem, kterým důvěřujete, nebo
tyto dva řádky před odesláním smažte.
:::

---

## Ovládání zařízení {#device-controls}

Tato obrazovka jen čte. Akce, které zařízení mění, najdete v sekci
[**Nástroje**](./tools.md): restart, obnovení tovární konfigurace
a aktualizaci firmwaru. Změny konfigurace se ukládají v sekci
[**Konfigurace**](./configuration.md).
