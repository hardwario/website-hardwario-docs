---
slug: configuration
title: Konfigurace
description: Jak zařízení STICKER nakonfigurovat přes NFC, downlinkem nebo v shellu, co který kanál nastaví a kdy se změna projeví.
---

# Konfigurace {#configuration}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Zařízení STICKER nemá tlačítka ani displej. Konfiguruje se přes NFC telefonem, na dálku downlinky, nebo u sestavení debug v shellu. Níže najdete, který kanál může změnit které nastavení, kdy se změna projeví, co zařízení ukazuje během relace NFC a jak je přístup přes NFC chráněný. Význam jednotlivých parametrů popisuje referenční stránka [**Konfigurace**](../developer-access/configuration.md).

## Tři způsoby konfigurace {#three-ways-to-configure}

| Kanál | Co potřebujete | K čemu slouží |
|---|---|---|
| NFC s aplikací HARDWARIO Manager | Telefon s NFC, aplikaci a secret key zařízení; zařízení musí být napájené | Uvedení do provozu (klíče LoRaWAN, region, `radio-mode`) a změny většiny nastavení na místě |
| Downlink přes LoRaWAN nebo LoRa P2P | Funkční připojení k síti a přístup k síťovému serveru nebo k hubu ProXimos | Změny intervalů, senzorů a pravidel alarmů na nainstalovaných zařízeních, i hromadně u celé flotily |
| Shell | Image debug nebo image pro zprovoznění a programátor J-Link na padech SWD | Vývoj, zprovoznění ve výrobě a parametry rádia LoRa P2P |

- **NFC** je standardní způsob. Aplikace HARDWARIO Manager konfiguraci přečte, vy ji upravíte a aplikace ji zapíše zpět, vždy s telefonem přiloženým k zařízení. Jednotlivé kroky popisuje stránka [**Konfigurace v aplikaci HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration).
- **Downlinky** se k nainstalovanému zařízení dostanou bez návštěvy na místě, ale nezmění, jak se zařízení připojuje k síti. Downlink je zpráva ze síťového serveru do zařízení, viz [**Zpracování downlinků**](downlinks.md).
- **Shell** mají jen image debug a image pro zprovoznění. Image release, který běží v nainstalovaných zařízeních, shell nemá, takže zařízení je nejdřív potřeba přeprogramovat přes J-Link, viz [**Verze a aktualizace firmwaru**](firmware.md).

## Co který kanál nastaví {#what-each-channel-can-set}

| Nastavení | NFC | Downlink | Shell |
|---|---|---|---|
| Aplikace: `interval-sample`, `interval-report`, `interval-announce`, `history-enable`, `history-channels`, `battery-level` | Ano | Ano | Ano |
| Senzory: schopnosti `cap-*` včetně režimů pinů GP, sloty 1-Wire (`sensor1-rom` až `sensor4-rom`, `sensor1-type` až `sensor4-type`), přepínače čítačů, `accel-motion-sensitivity` | Ano | Ano | Ano |
| Alarmy: pravidla `alarm_0` až `alarm_15`, `alarm-limit`, `alarm-buzzer-mode`, `radio-alarm-ack` | Ano | Ano | Ano |
| LoRaWAN: `radio-mode`, `lrw-region`, `lrw-sub-band`, `lrw-network`, `lrw-activation`, `lrw-adr`, `lrw-datarate`, `radio-link-check-interval`, `radio-link-check-fail-rejoin` | Ano | Ne | Ano |
| Identifikátory a klíče LoRaWAN: DevEUI, JoinEUI, AppKey, NwkKey, DevAddr, NwkSKey, AppSKey | Ano, lze je i číst | Ne; klíče se rádiem nikdy neposílají | Ano |
| Rádio LoRa P2P: `p2p-frequency`, `p2p-spreading-factor`, `p2p-tx-power`, `p2p-modulation` | Ne | Ne | Ano |
| `calibration` (testovací režim pro výrobu) | Ano | Ne | Ano |
| `vendor-reset-allow` | Jen kanálem výrobce | Ne | Ano |
| `secret-key` | Jen příkazem `set_secret_key` | Ne | Ano |
| Claim token | Jen příkazem `claim_active` | Ne | Jednorázový zápis |
| Identita zařízení: `serial-number`, `vendor-token`, `nonce-counter` | Ne | Ne | Jen při zprovoznění |

- **Pojmy LoRaWAN:** `lrw-activation` volí mezi OTAA (bezdrátová aktivace: zařízení se připojí k síti pomocí svého AppKey) a ABP (aktivace personalizací: pevné klíče relace, žádné připojování). S ADR (adaptivní datová rychlost) ladí datovou rychlost a vysílací výkon zařízení síťový server.
- **Omezení downlinků:** na downlink, který se pokusí zapsat nastavení označené „Ne“, zařízení odpoví `NOT_WRITABLE` a nepoužije z něj žádnou hodnotu. Kodér `ttn.js` pro v2.0.0 neumí zakódovat `alarm-buzzer-mode` a `radio-alarm-ack` z JSON; tyto dva parametry posílejte jako hex, viz [**Příkazy přes downlink**](../connectivity/downlink-commands.md).
- **Pravidla alarmů v shellu** se nastavují příkazem `alarm` místo `config`, viz [**Pravidla alarmů**](../developer-access/alarm-rules.md).

## Kdy se změna projeví {#when-a-change-takes-effect}

Zapsaná změna se jen připraví: zařízení dál běží s dosavadním nastavením, dokud se konfigurace neuloží. Uložení zapíše nastavení do NVS (úložiště nastavení ve flash paměti) a restartuje zařízení; nové nastavení platí od tohoto startu. Aplikace HARDWARIO Manager ukládá při každém zápisu konfigurace, takže se zařízení po každém zápisu restartuje **[ověřit]**.

| Změna | Kdy se projeví |
|---|---|
| Nastavení zapsané přes NFC, downlinkem nebo příkazem `config` v shellu | Po uložení (`save` v `set_param`, `settings_save` nebo `settings save` v shellu), které zařízení restartuje |
| `radio-mode`, region, klíče a ostatní nastavení rádia | Po uložení při dalším startu, protože se rádio nastavuje jen při startu |
| Pravidla alarmů | Hned, bez restartu; pokud je neuložíte, při dalším restartu se ztratí. Příkaz `alarm` v shellu je ukládá hned. |
| `reset_counters` | Hned; čítače se uloží bez restartu |
| `reboot` bez uložení | Všechny připravené změny se zahodí |
| `lrw_join` | Zařízení ho odmítne s `NOT_READY`, dokud jsou změny LoRaWAN připravené, ale neuložené |

Po změně nastavení LoRaWAN `lrw_join` nepotřebujete: uložení zařízení restartuje a k síti se zařízení připojuje při každém startu. Po restartu odešle uplinky Info a settings-info (zprávy ze zařízení do sítě), takže settings-info ukáže klíčová nastavení tak, jak se uložila, viz [**Zprávy a časování**](messages.md). Jak funguje uložení přes downlink, popisuje stránka [**Zpracování downlinků**](downlinks.md).

## Relace NFC {#nfc-sessions}

- **Napájení:** NFC funguje jen na napájeném zařízení. Zařízení bez baterií nebo s vybitými bateriemi se v telefonu ukáže jako prázdný tag, proto nejdřív vložte baterie.
- **Připravenost:** NFC je připravené asi 1,2 s po resetu. Přiložení telefonu během startovní sekvence LED sekvenci přeruší.
- **Jedno přiložení:** držte telefon u zařízení v klidu. Celá výměna dat, například přečtení konfigurace nebo její zápis a uložení, proběhne na jedno přiložení, na Androidu i na iOS.
- **Restart po příkazu:** příkaz, po kterém se zařízení restartuje (uložení, restart, resety, nový secret key, kalibrace), nejdřív ukáže výsledek na LED. Pak se zařízení restartuje a následuje startovní sekvence LED.

| Limit relace | Hodnota |
|---|---|
| Nejdelší relace | 120 s |
| Relace skončí, když po tuto dobu nepřijde žádný požadavek | 3 s |
| Počet odmítnutých rámců za sebou, který relaci ukončí | 8 |
| Telefon ponechaný u zařízení bez výměny dat | Po 120 s zařízení NFC uvolní, a to do chvíle, než telefonem pohnete |

LED ukazuje průběh relace:

| LED | Význam |
|---|---|
| Zelená, svítí (nejvýš 5 s) | Telefon rozpoznán, relace ještě nezačala |
| Zelená, bliká (90 ms) | Relace probíhá |
| Zelená a žlutá, 2 s | Relace skončila, poslední výměna dat se povedla |
| Červená, 2 s | Relace skončila, poslední výměna dat selhala: požadavek byl odmítnut (špatný klíč, zopakovaný nebo poškozený rámec), nebo se odpověď nedostala do telefonu |

Zelená a žlutá znamená, že se výměna dat povedla, i když zařízení odpovědělo chybou, například kvůli hodnotě mimo rozsah; chybu ukáže aplikace. Bzučák při NFC nic nesignalizuje. Všechny signály LED shrnuje [**Rychlý průvodce**](../first-steps.md).

:::note Firmware v1.4.x
Firmware v1.4.x si s telefonem vyměňoval příkazy přes záznamy NDEF v paměti tagu, takže na iOS potřeboval na každý příkaz dvě přiložení. Uměl také uložit konfiguraci zapsanou do zařízení bez baterií a použít ji při dalším startu. Firmware v2.0.0 tuto možnost odstranil, takže konfigurace vypnutého zařízení z aplikace HARDWARIO Manager funguje jen s v1.4.x **[ověřit]**.
:::

## Zabezpečení NFC {#nfc-security}

- **Vlastní klíč:** každé zařízení STICKER má svůj 128bitový secret key. Aplikace HARDWARIO Manager ho potřebuje ke komunikaci se zařízením. Každé zařízení do aplikace přidáte jen jednou, viz [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers).
- **Šifrování:** příkazy i odpovědi se šifrují a ověřují algoritmem AES-128-CCM v hardwaru zařízení. Bez klíče telefon nepřečte konfiguraci ani nic nezmění.
- **Ochrana proti opakovanému odeslání (replay):** každý příkaz nese čítač, který musí být vyšší než u posledního přijatého příkazu, nejvýš však o 1024. Zařízení čítač uloží dřív, než příkaz spustí, takže zaznamenanou výměnu dat nelze zopakovat, a to ani po odpojení a připojení napájení.
- **Bez klíče:** zařízení nešifrovaně odpovídá jen na dva požadavky, které nic nemění: `get_basic_info` (sériové číslo, čítač zpráv NFC a verze konfigurace a firmwaru) a `get_claim_info` (sériové číslo a claim token, jen dokud je otevřené claim okno).
- **Klíče LoRaWAN:** kdo má secret key, může přes NFC přečíst klíče LoRaWAN. Secret key chraňte stejně pečlivě jako klíče LoRaWAN. Rádiem klíče zařízení nikdy neopustí.
- **Změna klíče:** `set_secret_key` nahradí secret key šifrovaným kanálem; zařízení se pak restartuje, aby začalo nový klíč používat.
- **Kanál výrobce:** druhý šifrovaný kanál používá místo secret key vendor token. Přenáší vendor reset a nastavení `vendor-reset-allow`.

## Hlavní parametry {#main-parameters}

Nejdůležitější nastavení a jejich výchozí hodnoty ve firmwaru:

| Parametr | Výchozí | Význam |
|---|---|---|
| `radio-mode` | `off` | Rádio: `off`, `lorawan` nebo `p2p`; načítá se při startu |
| `lrw-region` | `eu868` | Region LoRaWAN; dále `us915`, `au915` a `as923` |
| `lrw-activation` | `otaa` | OTAA nebo ABP |
| `lrw-adr` | `true` | ADR zapnuté |
| `radio-link-check-interval` | `5` | Každé 5. hlášení zkontroluje spojení žádostí LinkCheckReq (na kterou odpoví síťový server); `0` kontroly vypne |
| `radio-link-check-fail-rejoin` | `5` | Počet neúspěšných kontrol spojení, po kterých se zařízení připojí znovu |
| `interval-report` | `900` s | Interval hlášení, 60–86400 s |
| `interval-sample` | `0` | `0` přečte senzory těsně před každým hlášením; 5–3600 s vzorkuje podle vlastního časovače |
| `interval-announce` | `24` h | Jak často se znovu posílají Info a settings-info; `0` opakování vypne, 1–168 h |
| `history-enable` | `false` | Historie senzorů vypnutá |
| `battery-level` | `2400` mV | Práh alarmu slabé baterie, 1000–3600 mV |
| `alarm-limit` | `10` s | Okno pro sběr alarmů, 0–3600 s |
| `cap-sht` | `true` | Senzor teploty a vlhkosti na desce zapnutý; všechny ostatní schopnosti `cap-*` jsou `false` a `cap-gpio-mode` je `none` |

Všechny parametry s jejich rozsahy a syntaxí v shellu najdete na referenční stránce [**Konfigurace**](../developer-access/configuration.md). Úpravu nastavení v aplikaci popisuje stránka [**Konfigurace v aplikaci HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration).

:::note Firmware v1.4.x
Firmware v2.0.0 několik nastavení přejmenoval a aliasy pro staré názvy nemá. Z `lrw-deveui` a `lrw-appkey` jsou `radio-deveui` a `radio-appkey` a hodnoty zůstávají zachované; z `lrw-link-check-*` je `radio-link-check-*` a vrací se na 5 a 5; ze schopností vstupů, PIR a bzučáku jsou `cap-gpio-mode`, `cap-gpio-input-a` a `cap-gpio-input-b` a vracejí se na `none`. Pravidla alarmů a výběr kanálů historie je potřeba zapsat znovu, viz [**Verze a aktualizace firmwaru**](firmware.md).
:::

## Stav z výroby {#factory-state}

Výchozí hodnota `radio-mode` ve firmwaru je `off`. Zařízení, do kterého se nastavení nikdy nezapisovalo, měří, zaznamenává historii (pokud je zapnutá) a vyhodnocuje alarmy, ale nevysílá. Ve výrobě se identita, klíče a nastavení každého kusu zapisují pomocí image pro zprovoznění ještě před nahráním image release a v tomto kroku se nastavuje i režim rádia. Kus proto může z výroby odejít v kterémkoli ze dvou stavů: tichý na skladě (`off`), nebo připravený připojit se k síti hned při prvním startu (`lorawan`). Druhý stav nastavuje nástroj HARDWARIO STICKER Flash Tool i postup na stránce [**Nastavení firmwaru**](../developer-access/firmware-setup.md). V jakém stavu jsou dodávané kusy, je ještě potřeba potvrdit **[ověřit]**; [**Rychlý průvodce**](../first-steps.md) uvádí, že nové kusy nevysílají. Než zařízení nainstalujete, zkontrolujte `radio-mode` v aplikaci HARDWARIO Manager.

Device reset zachová `radio-mode` i klíče a nastavení LoRaWAN, kromě `radio-link-check-interval` a `radio-link-check-fail-rejoin`, které se vrátí na 5. Factory reset zachová jen identitu (sériové číslo, secret key, claim token a vendor token), `vendor-reset-allow`, DevEUI a JoinEUI. Nastaví `radio-mode` na `off` a smaže AppKey, region i ostatní nastavení LoRaWAN a LoRa P2P, takže je před zapnutím rádia musíte zapsat znovu. Také vynuluje čítač připojení (DevNonce), takže síťový server může další pokusy zařízení o připojení odmítat, dokud na něm použité hodnoty DevNonce nevymažete, viz [**Připojení k síti**](network-connection.md). Příkazy pro reset popisují stránky [**Údržba**](../developer-access/maintenance.md) a [**Reset zařízení**](/apps/hardwario-manager/sticker/reset).
