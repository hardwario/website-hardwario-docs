---
slug: features
title: Funkce
description: "Funkce na této stránce přijdou v připravovaném firmwaru STICKER v1.4.0."
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
Funkce na této stránce přijdou v připravovaném **firmwaru STICKER v1.4.0**.
:::

# Funkce firmwaru {#firmware-features}

Tato stránka popisuje důležité chování firmwaru zařízení STICKER: jak zařízení hospodaří s energií, jak si udržuje zdravé připojení k LoRaWAN a jak chrání uložená data. Shell příkazy a konfigurační parametry, které tohle chování řídí, najdete v [**Přístup pro vývojáře**](developer-mode.md).

---

## Uchování dat {#data-retention}

### Žebříček resetů – identita zachovaná podle úrovně {#the-reset-ladder--identity-preserved-by-tier}

Reset ani aktualizace firmwaru nesmí zařízení v provozu odstrojit víc, než o co výslovně požádáte. Resety zařízení STICKER tvoří **žebříček podle závažnosti**; každá úroveň zachovává striktní podmnožinu té nad sebou:

| Reset | Co zachovává |
|---|---|
| **Restart** | Všechno. Jde o obyčejné restartování. |
| **Device reset** | Identitu zařízení **a celé zprovoznění LoRaWAN** (klíče i session): zařízení zůstává zprovozněné a připojené, na výchozí hodnoty se vrací jen konfigurace. Dostupné přes shell, NFC i downlink LoRaWAN. |
| **Factory reset** | Pouze identitu zařízení. Sériové číslo, vendor token, secret key, nonce, claim token, DevEUI a JoinEUI. **Zahazuje session a klíče LoRaWAN**, takže se zařízení do sítě připojí znovu. **Jen přes NFC nebo shell**. Přes downlink LoRaWAN je odmítnut, protože by zničil právě tu session, kterou je potřeba k jeho potvrzení. |
| **Vendor reset** | Pouze sériové číslo a vendor token. Konfigurace, klíče LoRaWAN i secret key se vymažou a jako součást resetu **musí být zadaný nový secret key**. Autorizuje ho vendor token, a to jen přes shell nebo vyhrazený vendor kanál NFC. |
| **`settings erase`** | Nic. Úplné vymazání do prázdného zařízení včetně sériového čísla. Záchranná brzda „návrat do prázdna", dostupná jen ze shellu. |

Sada identity (sériové číslo, secret key, čítač nonce, vendor token) i zprovoznění LoRaWAN si zaznamenávají, které úrovně je zachovávají, takže migrace schématu konfigurace při aktualizaci firmwaru obnoví chráněnou sadu po aplikaci nových výchozích hodnot.

### Vendor token {#the-vendor-token}

Vedle secret key drží každé zařízení **vendor token**, privilegovaný údaj pro dané zařízení, který má u sebe jeho vlastník. Každý z těch dvou údajů má jinou roli:

- **Secret key** zabezpečuje běžný šifrovaný kanál NFC pro čtení a zápis konfigurace.
- **Vendor token** autorizuje privilegované operace, na které secret key nestačí: **změnu secret key** (překlíčování zařízení) a úroveň **vendor reset** popsanou výše, která vymaže zařízení až na sériové číslo a vendor token a nastaví přitom nový secret key.

Protože odemyká překlíčování a nejhlubší reset, není vendor token pro běžnou konfiguraci vůbec potřeba a drží ho jen vlastník zařízení. V aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/saved-stickers) se ukládá pro každé zařízení pod **Saved STICKERs** a používá se v **Tools → Vendor changes**; viz [**průvodce resetem**](/apps/hardwario-manager/sticker/reset).

### Pulzní čítače přežijí ztrátu napájení {#pulse-counters-persist-across-power-loss}

Celkové stavy pulzních čítačů z Hallových kontaktů a vstupů se ukládají do flash paměti a po startu se obnovují, takže výměna baterií, podpětí ani reset už nevynulují naměřený součet.

### Historie senzorů (store-and-forward) {#sensor-history-store-and-forward}

Když je zapnutá, zařízení zaznamenává měření ze senzorů do flash paměti a dokáže požadované časové okno přehrát přes LoRaWAN. Uložené záznamy přežijí ztrátu napájení. Konfiguraci a příkazy najdete v [**Historie senzorů**](developer-access/sensor-history.md).

---

## Provozní a energetické režimy {#operating-and-power-modes}

Zařízení STICKER vydrží na dvou článcích AA víc než 2 roky. Na zprovozněném zařízení firmware vzorkuje senzory a odesílá uplinky LoRaWAN v nastavených intervalech a mezi nimi spí. Kromě toho snižují spotřebu ještě dva zvláštní stavy.

### Režim radio-silent (nezprovozněné zařízení) {#radio-silent-mode-unprovisioned-device}

Pokud je nastavené **DevEUI složené jen z nul** (zařízení, které nikdy nebylo zprovozněné), firmware se do sítě připojit nezkouší. Přejde do stavu **`DISABLED`** a celý start LoRaWAN vynechá: radiový stack se nikdy nespustí a sub-GHz radio se vůbec nenapájí, takže nevzniká žádný provoz při připojování ani radiový výboj při startu. Prázdné zařízení tím pádem nevybíjí baterii pokusy o připojení, které nemohou uspět.

Zařízení zůstane radio-silent, dokud nedostane skutečné DevEUI (a zbytek klíčů LoRaWAN) a **nerestartuje se**. Ve vývojářské konzoli hlásí `ats lrw status` stav `DISABLED`.

:::tip
Zařízení lze zprovoznit přes NFC i vypnuté. Viz [**Konfigurace vypnutého zařízení**](/apps/hardwario-manager/sticker/offline-configuration). Po zápisu klíčů opustí zařízení režim radio-silent při dalším startu.
:::

### Debug deep-sleep (automatické uspání) {#debug-deep-sleep-auto-suspend}

**Debug** build drží procesor vzhůru, aby zůstala dostupná konzole RTT, což trvale vybíjí baterii. Aby zapomenutá jednotka na stole nedopadla špatně, přejde debug firmware po nastavitelné době nečinnosti bez aktivity shellu do **hlubokého spánku** (STM32 Shutdown) (`CONFIG_APP_DEBUG_AUTOSUSPEND_S`, výchozí `7200` sekund, tedy 2 hodiny; `0` funkci vypíná).

- Jakýkoli vstup do shellu časovač nečinnosti resetuje; příkaz `power suspend` uspí zařízení na vyžádání.
- Probuzení je možné **přes NRST nebo vypnutím a zapnutím napájení**, což je čistý start. Uložená identita a klíče LoRaWAN zůstávají; stav v RAM a čas se obnovují znovu (čas se resynchronizuje ze sítě).
- **Release** build se to netýká; ten už mezi činnostmi spí díky běžné správě napájení.

---

## Správa připojení LoRaWAN {#lorawan-connection-management}

Firmware dohlíží na spojení LoRaWAN a z výpadků se zotavuje sám:

- Periodicky si vyžádá link check (každý N-tý uplink, nastavuje `config lrw-link-check-interval`).
- Jedna nedoručená odpověď se toleruje; k OTAA **rejoinu** eskalují jen opakovaná selhání, dokud je spojení degradované, a to po dalších `config lrw-link-check-fail-rejoin` selháních. Pokusy o rejoin se mezi sebou zpožďují.
- Zařízení v režimu **ABP** rejoin provést nemohou (nikdy se nepřipojují), takže zůstanou v degradovaném stavu.

Tím se nahrazuje dřívější chování, kdy zařízení mohlo po několika zprávách přestat vysílat.

---

## Spolehlivost senzorů {#sensor-reliability}

Měření ze senzorů se před předáním do telemetrie, historie nebo alarmů kontrolují na rozsah, takže chybný vzorek nevyvolá falešný poplach ani nezkreslí uložená data. Nakonfigurovaný senzor, který přestane dávat platné hodnoty, vyvolá alarm. Tiše selhaný senzor se tedy ukáže, místo aby se donekonečna hlásil jako chybějící data.

---

## Hodiny reálného času {#real-time-clock}

Zařízení udržuje reálný čas, synchronizovaný ze sítě při připojení (`DeviceTimeReq` protokolu LoRaWAN) a volitelně nastavený z telefonu přes NFC. Používá se k časovým značkám záznamů historie senzorů a alarmových událostí.
