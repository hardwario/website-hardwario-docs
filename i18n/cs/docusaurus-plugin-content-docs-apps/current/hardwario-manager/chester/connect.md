---
slug: connect
title: Připojení a párování
---

# Připojení k zařízení CHESTER {#connect-to-a-chester}

Otevřete **HARDWARIO Manager → CHESTER**. Pokud není nic připojené, zobrazí
aplikace průvodce **Set up CHESTER**: *Scan QR*, pak *Connect & pair*.

<img src="/img/hw-manager/hw-manager-chester-setup-wizard.png" alt="Průvodce Set up CHESTER s volbami Scan device QR, Scan for nearby devices a Join a shared session" width="320" />

---

## Naskenování QR kódu zařízení – běžný postup {#scan-the-device-qr--the-usual-path}

QR kód na štítku zařízení CHESTER zařízení identifikuje **a** aplikace podle něj
dohledá jeho passkey pro Bluetooth, takže při párování nemusíte nic psát.

1. Zvolte **Scan device QR**.
2. Pokud aplikace požádá o přístup ke kameře, povolte ho a namiřte kameru na QR
   kód na štítku zařízení CHESTER.
3. Pokud aplikace požádá o Bluetooth, povolte ho. Aplikace se k zařízení připojí
   a spáruje ho.

Mezitím průvodce zobrazuje **Connecting to CHESTER…**. Jakmile je passkey
známý, objeví se karta:

> **Pairing automatically**: No need to type anything. If Android shows a
> Bluetooth passkey prompt, it's already filled in, just confirm it.

Passkey je na kartě zobrazený a zároveň zkopírovaný do schránky, takže ho můžete
vložit, kdyby o něj telefon požádal.

:::info Na iOS se passkey zadává ručně
Automatické párování je funkce Androidu. Na iOS zobrazí systém vlastní párovací
dialog a šestimístný passkey z karty zadáte sami.
:::

---

## Vyhledání zařízení v okolí {#scan-for-nearby-devices}

Pokud štítek nemáte po ruce, zvolte **Scan for nearby devices**.

Aplikace vypíše nalezená zařízení seřazená od nejsilnějšího signálu, u každého
s názvem a sílou signálu v dBm. Dlouhý seznam zúžíte pomocí **Filter by serial
number**, tlačítkem **Rescan** spustíte vyhledávání znovu. Klepnutím na zařízení
se k němu připojíte.

<img src="/img/hw-manager/hw-manager-chester-scan.png" alt="Vyhledání zařízení CHESTER se dvěma nalezenými zařízeními, jejich sériovými čísly a sílou signálu" width="320" />

:::caution Bez QR kódu aplikace passkey nezná
U zařízení nalezeného tímto způsobem aplikace passkey nedohledá, takže vás o
šestimístný passkey požádá párovací dialog telefonu. Najdete ho přes QR štítek
zařízení: otevřete QR kód v libovolné aplikaci fotoaparátu a passkey se zobrazí
na stránce, která se otevře. Zařízení připojená tímto způsobem se navíc
nepřidávají do seznamu **Recent devices**.
:::

Pokud se nic neobjeví, zkontrolujte, že je zařízení CHESTER zapnuté a v dosahu, a
spusťte vyhledávání znovu.

---

## Recent devices {#recent-devices}

Zařízení, ke kterým jste se připojili přes QR kód, si aplikace pamatuje. Průvodce
je zobrazuje v seznamu **Recent devices**, každé s volbou **Tap to reconnect**;
ikonou smazání zařízení ze seznamu odeberete.

Ukládá se jen sériové číslo a název, žádné klíče ani tajné údaje.

---

## Připojení ke sdílené relaci {#join-a-shared-session}

**Join a shared session** se k zařízení nepřipojuje vůbec. Napojí se na zařízení
CHESTER, které kolega sdílí ze svého telefonu, takže můžete jeho konzoli ovládat
na dálku. Viz [**Sdílení relace terminálu**](./shared-sessions.md).

---

## Po připojení {#after-connecting}

Místo průvodce se zobrazí menu CHESTER. Pokračujte stránkou
[**Informace o zařízení**](./device-info.md) nebo [**Konfigurace**](./configuration.md).

Pokud připojení selže, podívejte se na [**Řešení problémů**](./troubleshooting.md).
Aplikace určí typ chyby a poradí, co dělat; původní chybové hlášení najdete po
rozbalení **Technical details**.
