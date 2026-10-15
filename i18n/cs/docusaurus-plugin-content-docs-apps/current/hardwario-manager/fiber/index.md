---
slug: /hardwario-manager/fiber
title: FIBER
description: "Nastavení brány FIBER přes Bluetooth v aplikaci HARDWARIO Manager: síť, role a zařízení STICKER a Beacony, ze kterých sbírá data."
title_meta: "FIBER (HARDWARIO Manager)"
---

# FIBER přes Bluetooth {#fiber-over-bluetooth}

HARDWARIO Manager nastaví bránu **FIBER** přes **Bluetooth**: pojmenujete ji,
připojíte k Wi-Fi nebo Ethernetu, zvolíte její roli a připojíte k ní zařízení
STICKER a Beacony, ze kterých sbírá data. U brány nepotřebujete kabel,
klávesnici ani notebook.

:::info Která sestavení obsahují FIBER
Nastavení brány FIBER je součástí **ProXimos App**, sestavení této aplikace pro
ProXimos, ve kterém se FIBER jmenuje **Hub** a STICKER **Node**. Veřejné vydání
aplikace HARDWARIO Manager FIBER zatím neobsahuje. Obrazovky i kroky jsou v obou
stejné; tento návod používá názvy HARDWARIO.
:::

---

## Jak telefon získá přístup {#how-the-phone-gets-access}

FIBER nemá pevný PIN ani párovací kód. Místo toho zobrazí na displeji
**jednorázový QR kód**:

1. **Podržte tlačítko ENTER** na bráně FIBER, dokud se QR kód neobjeví.
2. V aplikaci zvolte **Scan device QR** a namiřte fotoaparát na kód.
3. Aplikace se připojí přes Bluetooth. Může to trvat až minutu.

Naskenováním kódu prokážete, že stojíte u zařízení, a token v kódu platí jen pro
jednu relaci. Relace skončí, když obrazovky brány FIBER opustíte, když se
spojení Bluetooth přeruší nebo po zhruba **5 minutách** nečinnosti. Aplikace pak
zobrazí **Authorization expired**: znovu podržte ENTER a zvolte **Reauthorize**.

---

## Domovská stránka brány FIBER {#the-fiber-home-page}

Otevřete **FIBER** z domovské obrazovky. Vždy se otevře domovská stránka, ať je
brána FIBER připojená, nebo ne. Když žádná připojená není, nabídne
**Connect a FIBER**.

<img src="/img/hw-manager/hw-manager-fiber-home.png" alt="Domovská stránka brány FIBER s volbami Connect a FIBER, Provisioning, Network, Connected STICKERs a Connected Beacons" width="320" />

| Sekce | Co ukazuje |
|---|---|
| **Connected FIBER** | Název brány FIBER a jestli je aplikace **Authorized**. **Show details** přidá název hostitele, firmware, IP adresu, MAC a dobu běhu (ke stavu při posledním připojení). Akce: **Authorize** / **Unauthorize**, **Rename**, **Close connection** |
| **Provisioning** | **Run the FIBER setup wizard**, viz [**Nastavení brány FIBER**](./setup.md) |
| **Network** | Stav Wi-Fi a Ethernetu s volbou **Manage Connection**, viz [**Připojení k síti**](./network.md) |
| **Connected STICKERs** | Kolik zařízení STICKER je připojeno, **+** připojí další, viz [**Připojení zařízení STICKER**](./stickers.md) |
| **Connected Beacons** | Kolik Beaconů je připojeno, **+** připojí další, viz [**Připojení Beaconů**](./beacons.md) |

V ProXimos App nabízí domovská stránka navíc **View in ProXimos Portal**. Otevře
portál běžící na bráně FIBER; pokud telefon není v síti brány, aplikace ukáže
adresu, kterou otevřete na počítači připojeném do té sítě.

:::caution Close connection bránu zapomene
**Close connection** odebere bránu FIBER z aplikace, takže ji pro další práci
musíte nastavit znovu. Její zařízení STICKER zůstanou zachovaná a po opětovném
připojení se znovu objeví.
:::

---

## V této sekci {#in-this-section}

1. [**Nastavení brány FIBER**](./setup.md): průvodce prvním spuštěním.
2. [**Připojení k síti**](./network.md): Wi-Fi a Ethernet, DHCP nebo statická IP.
3. [**Připojení zařízení STICKER**](./stickers.md): registrace zařízení STICKER
   v bráně FIBER přes NFC a Bluetooth.
4. [**Připojení Beaconů**](./beacons.md): přidání Beaconů Bluetooth do brány FIBER.
