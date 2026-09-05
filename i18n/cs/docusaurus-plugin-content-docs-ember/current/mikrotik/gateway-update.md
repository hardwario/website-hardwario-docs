---
slug: gateway-update
title: Aktualizace brány
description: "Tento návod vás provede aktualizací balíčků RouterOS a RouterBOARD (firmware/„BIOS\") pomocí aplikace Winbox 4."
---
import Image from '@theme/IdealImage';

# Aktualizace brány MikroTik {#mikrotik-gateway-update}

Tento návod vás provede aktualizací balíčků RouterOS a RouterBOARD (firmware/„BIOS") pomocí aplikace Winbox 4.

---

## Požadavky {#prerequisites}
- Přístup administrátora (uživatelské jméno a heslo)

---

## 1. Aktualizace softwaru RouterOS {#1-update-routeros-software}

V levém panelu **System → Packages → Check for Updates**. Otevře se nové okno, zkontrolujte, zda se verze shodují. Pokud ne, klikněte na **Download&Install** a několik minut vyčkejte.
![Aktualizace RouterOS v zařízení EMBER](../../../../../ember/mikrotik/images/ember-update-routeros.png)

---

## 2. Aktualizace RouterBOARD (firmware/„BIOS") {#2-update-routerboard-firmwarebios}

1. V levém menu otevřete **System → RouterBOARD**.
2. Porovnejte **Current Firmware** s **Upgrade Firmware**.
3. Pokud je aktualizace dostupná, klikněte na **Upgrade**.
![Aktualizace RouterBOARD v zařízení EMBER](../../../../../ember/mikrotik/images/ember-upgrade-routerboard.png)


---

## 3. Restart pro aplikování firmwaru {#3-reboot-to-apply-firmware}

1. V levém menu otevřete **System → Reboot**.
2. Potvrďte restart, aby se aktualizace firmwaru RouterBOARD aplikovala.

![Restart zařízení EMBER](../../../../../ember/mikrotik/images/ember-reboot.png)

3. Vyčkejte, než se zařízení vrátí online, a poté se znovu přihlaste.




---

## 4. Kontrola aktualizace {#4-verify-the-update}

1. **System → Packages**:  
   - Klikněte na **Check For Updates**: nyní by se mělo zobrazit **up to date** (obě verze by se měly shodovat).
2. **System → RouterBOARD**:  
   - Zkontrolujte, že **Current Firmware** nyní odpovídá **Upgrade Firmware**: to znamená, že firmware byl úspěšně aktualizován.
