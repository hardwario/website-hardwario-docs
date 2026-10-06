---
slug: features
title: Funkce
description: "Tato stránka popisuje důležité chování firmwaru STICKER: jak zařízení hospodaří s energií, udržuje spojení LoRaWAN a chrání uložená data."
title_meta: "Funkce (STICKER)"
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
Funkce na této stránce přijdou v připravovaném **firmwaru STICKER v1.4.0**.
:::

# Funkce firmwaru {#firmware-features}

Tato stránka popisuje důležité chování firmwaru zařízení STICKER: jak zařízení hospodaří s energií, jak udržuje spojení LoRaWAN v pořádku a jak chrání uložená data. Příkazy shellu a konfigurační parametry, které toto chování řídí, najdete v části [**Přístup pro vývojáře**](developer-mode.md).

---

## Uchování dat {#data-retention}

### Žebříček resetů – identita zachovaná podle úrovně {#the-reset-ladder--identity-preserved-by-tier}

Reset ani aktualizace firmwaru nesmí nasazenému zařízení smazat zprovoznění nad rámec úrovně, kterou výslovně zvolíte. Resety zařízení STICKER tvoří **žebříček podle závažnosti**; každá úroveň zachovává vlastní podmnožinu toho, co zachovává úroveň nad ní:

| Reset | Co zachovává |
|---|---|
| **Restart** | Všechno. Jde o obyčejné restartování. |
| **Device reset** | Identitu zařízení **a celé zprovoznění LoRaWAN** (klíče i relaci): zařízení zůstává zprovozněné a připojené, na výchozí hodnoty se vrací jen konfigurace. Dostupné přes shell, NFC i downlink LoRaWAN. |
| **Factory reset** | Pouze identitu zařízení. Sériové číslo, vendor token, secret key, nonce, claim token, DevEUI a JoinEUI. **Zahodí relaci a klíče LoRaWAN**, takže se zařízení do sítě připojí znovu. **Jen přes NFC nebo shell**. Přes downlink LoRaWAN je odmítnut, protože by zničil právě tu relaci, která je potřeba k jeho potvrzení. |
| **Vendor reset** | Pouze sériové číslo a vendor token. Konfigurace, klíče LoRaWAN i secret key se vymažou a jako součást resetu **je nutné zadat nový secret key**. Autorizuje ho vendor token, a to jen přes shell nebo vyhrazený vendor kanál NFC. |
| **`settings erase`** | Nic. Úplné vymazání do prázdného zařízení včetně sériového čísla. Nouzová cesta zpět k prázdnému zařízení, dostupná jen ze shellu. |

Identita (sériové číslo, secret key, čítač nonce, vendor token) i zprovoznění LoRaWAN mají zaznamenáno, které úrovně resetu je zachovávají. Migrace schématu konfigurace při aktualizaci firmwaru proto chráněné údaje po použití nových výchozích hodnot obnoví.

### Vendor token {#the-vendor-token}

Vedle secret key drží každé zařízení **vendor token**, privilegovaný přístupový údaj vázaný na konkrétní zařízení, který má u sebe jeho vlastník. Každý z těch dvou údajů má jinou roli:

- **Secret key** zabezpečuje běžný šifrovaný kanál NFC pro čtení a zápis konfigurace.
- **Vendor token** autorizuje privilegované operace, na které secret key nestačí: **změnu secret key** (překlíčování zařízení) a úroveň **vendor reset** popsanou výše, která vymaže zařízení až na sériové číslo a vendor token a nastaví přitom nový secret key.

Protože odemyká překlíčování a nejhlubší reset, není vendor token pro běžnou konfiguraci vůbec potřeba a drží ho jen vlastník zařízení. V aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/saved-stickers) se ukládá pro každé zařízení pod **Saved STICKERs** a používá se v **Tools → Vendor changes**; viz [**průvodce resetem**](/apps/hardwario-manager/sticker/reset).

### Pulzní čítače přežijí ztrátu napájení {#pulse-counters-persist-across-power-loss}

Celkové stavy pulzních čítačů z Hallových spínačů a vstupů se ukládají do flash paměti a po startu se obnovují, takže výměna baterií, podpětí ani reset už nevynulují naměřený součet.

### Historie senzorů (store-and-forward) {#sensor-history-store-and-forward}

Když je zapnutá, zařízení zaznamenává měření ze senzorů do flash paměti a dokáže požadované časové okno přehrát přes LoRaWAN. Uložené záznamy přežijí ztrátu napájení. Konfiguraci a příkazy najdete na stránce [**Historie senzorů**](developer-access/sensor-history.md).

---

## Provozní a energetické režimy {#operating-and-power-modes}

Zařízení STICKER vydrží na dvou článcích AA víc než 2 roky. Na zprovozněném zařízení firmware vzorkuje senzory a odesílá uplinky LoRaWAN v nastavených intervalech a mezi nimi spí. Kromě toho snižují spotřebu ještě dva zvláštní stavy.

### Režim radio-silent (nezprovozněné zařízení) {#radio-silent-mode-unprovisioned-device}

Pokud je nastavené **DevEUI složené jen z nul** (zařízení, které nikdy nebylo zprovozněné), firmware se do sítě připojit nezkouší. Přejde do stavu **`DISABLED`** a celý start LoRaWAN vynechá: rádiový stack se nikdy nespustí a sub-GHz rádio se vůbec nenapájí, takže zařízení při startu nevysílá žádné pokusy o připojení ani jiné pakety. Prázdné zařízení tím pádem nevybíjí baterii pokusy o připojení, které nemohou uspět.

Zařízení zůstane v režimu radio-silent, dokud nedostane skutečné DevEUI (a zbytek klíčů LoRaWAN) a **nerestartuje se**. Ve vývojářské konzoli hlásí `ats lrw status` stav `DISABLED`.

:::tip
Zařízení lze zprovoznit přes NFC i vypnuté. Viz [**Konfigurace vypnutého zařízení**](/apps/hardwario-manager/sticker/offline-configuration). Po zápisu klíčů opustí zařízení režim radio-silent při dalším startu.
:::

### Debug deep-sleep (automatické uspání) {#debug-deep-sleep-auto-suspend}

Sestavení **debug** nechává procesor stále běžet, aby zůstala dostupná konzole RTT, a tím trvale vybíjí baterii. Aby se kus zapomenutý na pracovním stole nevybil, přejde debug firmware po nastavitelné době bez aktivity shellu do **hlubokého spánku** (STM32 Shutdown). Dobu určuje `CONFIG_APP_DEBUG_AUTOSUSPEND_S` (výchozí `7200` sekund, tedy 2 hodiny; `0` funkci vypíná).

- Jakýkoli vstup do shellu časovač nečinnosti resetuje; příkaz `power suspend` uspí zařízení na vyžádání.
- Probuzení je možné **přes NRST nebo vypnutím a zapnutím napájení**, což je čistý start. Uložená identita a klíče LoRaWAN zůstávají; stav RAM a čas se nastaví znovu (čas se synchronizuje ze sítě).
- Sestavení **release** se to netýká; to mezi činnostmi spí už díky běžné správě napájení.

---

## Správa připojení LoRaWAN {#lorawan-connection-management}

Firmware dohlíží na spojení LoRaWAN a z výpadků se zotavuje sám:

- Periodicky si vyžádá link check (každý N-tý uplink, nastavuje `config lrw-link-check-interval`).
- Jedna chybějící odpověď se toleruje; OTAA **rejoin** spustí až opakovaná selhání při zhoršeném spojení, konkrétně po dalších `config lrw-link-check-fail-rejoin` selháních. Odstup mezi pokusy o rejoin se postupně prodlužuje.
- Zařízení v režimu **ABP** rejoin provést nemohou (nikdy se nepřipojují), takže zůstanou v degradovaném stavu.

Odstraňuje to dřívější chybu, kdy zařízení mohlo po několika zprávách přestat vysílat.

---

## Spolehlivost senzorů {#sensor-reliability}

Měření ze senzorů procházejí kontrolou rozsahu dřív, než se dostanou do telemetrie, historie nebo alarmů, takže chybný vzorek nevyvolá falešný poplach ani nezkreslí uložená data. Nakonfigurovaný senzor, který přestane dávat platné hodnoty, vyvolá alarm. Senzor, který tiše selže, se tak odhalí, místo aby se donekonečna hlásil jako chybějící data.

---

## Hodiny reálného času {#real-time-clock}

Zařízení udržuje reálný čas, synchronizovaný ze sítě při připojení (`DeviceTimeReq` protokolu LoRaWAN) a volitelně nastavený z telefonu přes NFC. Slouží k označení záznamů historie senzorů a alarmových událostí časovou značkou.
