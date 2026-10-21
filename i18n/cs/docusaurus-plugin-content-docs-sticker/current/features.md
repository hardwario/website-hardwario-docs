---
slug: features
title: Funkce
description: "Tato stránka popisuje důležité chování firmwaru STICKER: jak zařízení hospodaří s energií, udržuje rádiové spojení (LoRaWAN nebo P2P) a chrání uložená data."
title_meta: "Funkce (STICKER)"
---
import Image from '@theme/IdealImage';


:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Většinu zde popsaných funkcí přinesl firmware v1.4.0 a verze v2.0.0 je rozšířila.
:::

# Funkce firmwaru {#firmware-features}

Tato stránka popisuje důležité chování firmwaru zařízení STICKER: jak zařízení hospodaří s energií, jak udržuje rádiové spojení (LoRaWAN nebo P2P) v pořádku a jak chrání uložená data. Příkazy shellu a konfigurační parametry, které toto chování řídí, najdete v části [**Přístup pro vývojáře**](developer-mode.md).

---

## Uchování dat {#data-retention}

### Žebříček resetů – identita zachovaná podle úrovně {#the-reset-ladder--identity-preserved-by-tier}

Reset ani aktualizace firmwaru nesmí nasazenému zařízení smazat zprovoznění nad rámec úrovně, kterou výslovně zvolíte. Resety zařízení STICKER tvoří **žebříček podle závažnosti**; každá úroveň zachovává jen část toho, co zachovává úroveň nad ní:

| Reset | Co zachovává |
|---|---|
| **Restart** | Všechno. Obyčejný restart. |
| **Device reset** | Identitu zařízení **a celé zprovoznění LoRaWAN** (klíče i relaci): zařízení zůstává zprovozněné a připojené, na výchozí hodnoty se vrací jen konfigurace. **Jen přes NFC nebo shell**. |
| **Factory reset** | Pouze identitu zařízení: sériové číslo, vendor token, secret key, nonce, claim token, DevEUI a JoinEUI. **Zahodí relaci a klíče LoRaWAN** i spárování P2P, vrátí `radio-mode` na `off` a **vynuluje čítače impulzů a historii senzorů**. Zařízení pak nevysílá, dokud rádio znovu nenastavíte. **Jen přes NFC nebo shell**. Přes rádiový downlink je odmítnut, protože by zničil právě tu relaci, která je potřeba k jeho potvrzení. |
| **Vendor reset** | Pouze sériové číslo a vendor token. Konfigurace, klíče LoRaWAN, DevEUI, JoinEUI, claim token, secret key, čítače impulzů i historie se vymažou a jako součást resetu **je nutné zadat nový secret key**. Okno pro claim se zavře; vlastník ho znovu otevře příkazem `claim_active`, který zároveň vytvoří nový claim token. Autorizuje ho vendor token, a to jen přes shell nebo vyhrazený vendor kanál NFC. |
| **`settings erase`** | Nic. Vymaže vše včetně sériového čísla. Nouzová cesta zpět k prázdnému zařízení, dostupná jen ze shellu. |

Identita (sériové číslo, secret key, čítač nonce, vendor token) i zprovoznění LoRaWAN mají zaznamenáno, které úrovně resetu je zachovávají. Migrace schématu konfigurace při aktualizaci firmwaru proto chráněné údaje po použití nových výchozích hodnot obnoví.

### Vendor token {#the-vendor-token}

Vedle secret key má každé zařízení **vendor token**, privilegovaný přístupový údaj vázaný na konkrétní zařízení, který má u sebe jeho vlastník. Každý z obou údajů slouží k něčemu jinému:

- **Secret key** zabezpečuje běžný šifrovaný kanál NFC pro čtení a zápis konfigurace.
- **Vendor token** autorizuje privilegované operace, na které secret key nestačí: **změnu secret key** (výměnu klíče zařízení) a úroveň **vendor reset** popsanou výše, která vymaže zařízení až na sériové číslo a vendor token a nastaví přitom nový secret key.

Protože odemyká výměnu klíče a nejhlubší reset, není vendor token pro běžnou konfiguraci vůbec potřeba a má ho jen vlastník zařízení. V aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/saved-stickers) se ukládá ke každému zařízení v seznamu **Saved STICKERs** a používá se v nabídce **Tools → Vendor changes**; viz [**Reset zařízení**](/apps/hardwario-manager/sticker/reset).

### Čítače impulzů přežijí ztrátu napájení {#pulse-counters-persist-across-power-loss}

Celkové stavy čítačů impulzů z Hallových spínačů a vstupů se ukládají do flash paměti a po startu se obnovují, takže výměna baterií, pokles napětí, restart ani device reset už naměřený součet nevynulují. Vynuluje je factory reset nebo vendor reset.

### Historie senzorů (store-and-forward) {#sensor-history-store-and-forward}

Když je historie zapnutá, zařízení ukládá měření ze senzorů do flash paměti a na vyžádání dokáže záznamy z požadovaného časového okna znovu odeslat rádiem (LoRaWAN nebo P2P). Uložené záznamy přežijí ztrátu napájení; smaže je factory reset nebo vendor reset. Konfiguraci a příkazy najdete na stránce [**Historie senzorů**](developer-access/sensor-history.md).

---

## Provozní a energetické režimy {#operating-and-power-modes}

Zařízení STICKER vydrží na dvou článcích AA víc než 2 roky. Na zprovozněném zařízení firmware vzorkuje senzory a odesílá rádiové uplinky (LoRaWAN nebo P2P) v nastavených intervalech a mezi nimi spí. Kromě toho chrání baterii ještě několik zvláštních stavů.

### Režim radio-silent {#radio-silent-mode}

S nastavením **`radio-mode off`**, které je výchozí z výroby, se firmware do sítě připojit nezkouší. Rádio přejde do stavu **`DISABLED`** a rádiový stack se vůbec nespustí: sub-GHz rádio se nenapájí, takže zařízení při startu nevysílá žádné pokusy o připojení ani jiné pakety. Vzorkování senzorů a historie přitom běží dál. Nové zařízení tak během přepravy a skladování nevybíjí baterii pokusy o připojení.

Rádio je ve stavu `DISABLED` také tehdy, když:

- `radio-mode` je `p2p`, ale zařízení nemá klíče pro P2P: AppKey složený jen z nul nebo DevEUI, ze kterého nevznikne platná adresa P2P (například DevEUI složené jen z nul).
- Uložený region LoRaWAN obraz firmwaru nepodporuje. Rádio se nikdy nepřepne do jiného pásma.

Zařízení zůstane v režimu radio-silent, dokud `radio-mode` nenastavíte na `lorawan` nebo `p2p` (s odpovídajícími klíči) a zařízení **nerestartujete**. Ve vývojářské konzoli hlásí `ats radio status` stav `DISABLED` a stavová LED každé 3 sekundy jednou žlutě blikne.

### Vypnutí při slabé baterii po zapnutí {#low-battery-shutdown-at-power-up}

Při každém zapnutí firmware nejdřív, ještě než spustí cokoli dalšího, změří napětí baterie. Pod **1,8 V** zařízení nenastartuje: po startovní sekvenci bliká červeně, pak se samo vypne a zůstane vypnuté, dokud nevyměníte baterie nebo ho neresetujete signálem NRST. Zařízení s vybitým článkem se tak už nedostane do smyčky restartů způsobených poklesem napětí. Pokud selže samotné měření baterie, zařízení nastartuje normálně.

### Hluboký spánek v sestavení debug (automatické uspání) {#debug-deep-sleep-auto-suspend}

Sestavení **debug** nechává procesor stále běžet, aby zůstala dostupná konzole RTT, a tím trvale vybíjí baterii. Aby se kus zapomenutý na pracovním stole nevybil, přejde firmware debug po nastavitelné době bez aktivity shellu do **hlubokého spánku** (STM32 Shutdown). Dobu určuje `CONFIG_APP_DEBUG_AUTOSUSPEND_S` (výchozí `7200` sekund, tedy 2 hodiny; `0` funkci vypíná).

- Každý vstup do shellu časovač nečinnosti vynuluje; příkaz `power suspend` uspí zařízení na vyžádání.
- Zařízení probudí **signál NRST nebo odpojení a připojení napájení**, což znamená čistý start. Uložená identita a klíče LoRaWAN zůstávají; stav RAM a čas se nastaví znovu (čas se synchronizuje ze sítě).
- Sestavení **release** se to netýká; to mezi činnostmi spí už díky běžné správě napájení.

---

## Správa rádiového spojení {#radio-connection-management}

Firmware dohlíží na rádiové spojení, LoRaWAN i P2P, a z výpadků se zotavuje sám:

- Pravidelně kontroluje spojení (link check), a to s každou N-tou zprávou; N nastavuje `config radio-link-check-interval` (výchozí hodnota 5; `0` kontroly vypíná). V LoRaWAN je kontrolou `LinkCheckReq`, v P2P potvrzovaný rámec s telemetrií. Za úspěšnou kontrolu se počítá i každý ověřený downlink.
- Jedna chybějící odpověď se toleruje. Opakovaná selhání převedou spojení do stavu zhoršeného spojení, ve kterém je kontrolou spojení každá zpráva.
- **Žebříček obnovy v LoRaWAN:** ve stavu zhoršeného spojení každá neúspěšná kontrola vrátí vysílací výkon na výchozí (maximální) hodnotu a sníží datovou rychlost o jeden stupeň. Když kontrola na nižší datové rychlosti uspěje, zařízení se vrátí do normálního provozu se stejnou relací. Se zapnutým ADR síť datovou rychlost později zase zvýší.
- Teprve když žebříček dojde k nejnižší datové rychlosti regionu a selže dalších `config radio-link-check-fail-rejoin` kontrol (výchozí hodnota 5), zařízení spojení naváže znovu: v LoRaWAN přes OTAA **rejoin**, v P2P novým připojením k hubu. Odstup mezi pokusy o rejoin se postupně prodlužuje. S výchozím nastavením (EU868, start na DR5, interval odesílání 900 s) trvá od ztráty spojení do rejoinu zhruba 4–5 hodin.
- Zařízení v režimu **ABP** se znovu připojit nemohou (join nikdy neprovádějí), proto zůstanou ve stavu zhoršeného spojení a spojení dál kontrolují.

Odstraňuje to dřívější chybu, kdy zařízení mohlo po několika zprávách přestat vysílat.

### Pravidelné ohlášení {#periodic-announce}

Po každém startu nebo připojení zařízení odešle **Info** a uplink **settings-info** (intervaly, příznaky všech senzorů, nalezené senzory 1-Wire). Stejnou dvojici posílá znovu každých `interval-announce` hodin (výchozí hodnota 24, rozsah 1–168, `0` = vypnuto), takže síť má aktuální kopii konfigurace zařízení, i když se zařízení nikdy nerestartuje.

### Samočinné zotavení po pádu {#self-recovery-from-a-crash}

Při chybě procesoru (CPU fault) se zařízení okamžitě restartuje, místo aby zůstalo zaseknuté až do zásahu watchdogu. Následující Info nahlásí příčinu chyby a obsah registrů PC a LR, takže je chyba vidět i ze sítě.

---

## Spolehlivost senzorů {#sensor-reliability}

Měření ze senzorů procházejí kontrolou rozsahu dřív, než se dostanou do telemetrie, historie nebo alarmů, takže chybný vzorek nevyvolá planý poplach ani nezkreslí uložená data. Nakonfigurovaný senzor, který přestane dávat platné hodnoty, vyvolá alarm. Senzor, který tiše selže, se tak odhalí, místo aby se donekonečna hlásil jako chybějící data.

---

## Hodiny reálného času {#real-time-clock}

Zařízení má vlastní hodiny reálného času, které se synchronizují ze sítě při připojení (`DeviceTimeReq` protokolu LoRaWAN, nebo síťový čas z hubu P2P) a zhruba jednou týdně se synchronizují znovu, ať zařízení používá kterékoli rádio. Nastavit se dají také z telefonu přes NFC. Hodiny přijmou jen čas od 1. 1. 2024 do konce roku 2098. Slouží k časovému označení záznamů historie senzorů a alarmových událostí; záznamy historie si svůj skutečný čas zachovají i přes restarty a ztrátu napájení.
