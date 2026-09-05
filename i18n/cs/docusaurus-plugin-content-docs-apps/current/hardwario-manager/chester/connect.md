---
slug: connect
title: Připojení a párování
description: "Otevřete HARDWARIO Manager → CHESTER. Pokud není nic připojené, zobrazí"
---

# Připojení k zařízení CHESTER {#connect-to-a-chester}

Otevřete **HARDWARIO Manager → CHESTER**. Pokud není nic připojené, zobrazí
aplikace průvodce **Set up CHESTER**: *Scan QR*, pak *Connect & pair*.

<img src="/img/hw-manager/hw-manager-chester-setup-wizard.png" alt="Průvodce Set up CHESTER s volbami Scan device QR, Scan for nearby devices a Join a shared session" width="320" />

---

## Naskenování QR kódu zařízení – běžná cesta {#scan-the-device-qr--the-usual-path}

QR kód na etiketě zařízení CHESTER zařízení identifikuje **a** umožňuje aplikaci
dohledat jeho Bluetooth passkey, takže párování nevyžaduje žádné psaní.

1. Zvolte **Scan device QR**.
2. Pokud si o to aplikace řekne, povolte kameru, a namiřte ji na QR kód na etiketě
   zařízení CHESTER.
3. Pokud si o to řekne, povolte Bluetooth. Aplikace se připojí a spáruje.

Během práce zobrazuje průvodce **Connecting to CHESTER…**. Jakmile je passkey
známý, objeví se karta:

> **Pairing automatically**: No need to type anything. If Android shows a
> Bluetooth passkey prompt, it's already filled in, just confirm it.

Passkey je na kartě zobrazený a zároveň zkopírovaný do schránky, takže ho můžete
vložit, kdyby si o něj telefon řekl.

:::info Na iOS se passkey zadává ručně
Automatické párování je funkce Androidu. Na iOS zobrazí systém vlastní párovací
dialog a šestimístný passkey z karty zadáte sami.
:::

---

## Vyhledání zařízení v okolí {#scan-for-nearby-devices}

Pokud etiketu nemáte po ruce, zvolte **Scan for nearby devices**.

Aplikace vyhledá a vypíše, co najde, od nejsilnějšího signálu, s názvem každého
zařízení a jeho sílou signálu v dBm. Pomocí **Filter by serial number** zúžíte
zaplněný seznam a **Rescan** vyhledá znovu. Klepnutím na zařízení se připojíte.

<img src="/img/hw-manager/hw-manager-chester-scan.png" alt="Vyhledání zařízení CHESTER se dvěma nalezenými zařízeními, jejich sériovými čísly a sílou signálu" width="320" />

:::caution Bez QR kódu není passkey
K zařízení dosaženému touhle cestou se žádný passkey nedohledá, takže si párovací
dialog telefonu o šestimístný passkey řekne. Přečtete ho z QR etikety zařízení:
otevřete QR kód v jakékoli aplikaci kamery a stránka, kterou otevře, passkey
zobrazí. Zařízení připojená touto cestou se navíc nepřidávají do
**Recent devices**.
:::

Pokud se nic neobjeví, zkontrolujte, že je zařízení CHESTER zapnuté a v dosahu, a
vyhledejte znovu.

---

## Recent devices {#recent-devices}

Zařízení, ke kterým jste se připojili přes QR kód, si aplikace pamatuje. Průvodce
je vypisuje pod **Recent devices**, každé s **Tap to reconnect**; ikona koše
zařízení ze seznamu odebere.

Ukládá se jen sériové číslo a název, žádné klíče ani tajné údaje.

---

## Join a shared session {#join-a-shared-session}

**Join a shared session** se k zařízení nepřipojuje vůbec. Napojí se na zařízení
CHESTER, které kolega sdílí ze svého telefonu, takže můžete jeho konzoli ovládat
na dálku. Viz [**Sdílení terminálové session**](./shared-sessions.md).

---

## Po připojení {#after-connecting}

Průvodce vystřídá menu CHESTER. Pokračujte na
[**Informace o zařízení**](./device-info.md) nebo [**Konfiguraci**](./configuration.md).

Pokud připojení selže, podívejte se na [**Řešení problémů**](./troubleshooting.md).
Aplikace selhání klasifikuje a řekne, co dělat, přičemž surová chyba zůstává pod
rozbalovacím prvkem **Technical details**.
