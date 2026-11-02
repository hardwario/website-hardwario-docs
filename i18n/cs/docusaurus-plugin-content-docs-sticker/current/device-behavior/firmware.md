---
slug: firmware
title: Verze a aktualizace firmwaru
description: "Jak zjistit verzi firmwaru v zařízení STICKER, jak firmware aktualizovat přes SWD a co se mezi jednotlivými verzemi mění."
---

# Verze a aktualizace firmwaru {#firmware-versions-and-updates}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Tato stránka ukazuje, jak zjistit, jaký firmware v zařízení STICKER běží, jak se firmware aktualizuje a co se změní při přechodu z jedné verze na další. Na verzi firmwaru záleží, který dekodér, která verze aplikace HARDWARIO Manager a které příkazy se zařízením fungují, a proto ji podpora obvykle potřebuje znát jako první.

## Jak zjistit verzi firmwaru {#find-the-firmware-version}

| Kde | Jak | Co uvidíte |
|---|---|---|
| Uplink Info na fPort 85 | Odchází po každém připojení k síti a pak každých `interval-announce` hodin (výchozí 24 h) | `info.fw_version`, například `"2.0.0"`, spolu s `build_type_name` a `debug` |
| Downlink `get_info` | Zařaďte do fronty `08032200` na fPort 85 (`seq` 3) | Info se `seq` 3, které přijde po dalším uplinku zařízení |
| Aplikace HARDWARIO Manager | **STICKER → Device info**, pole **Firmware** **[ověřit]** | Běžící verzi |
| Shell v sestavení debug | `ats device info` | Řádky `FW version` a `Build type` |

- **Pojmy:** uplink je zpráva ze zařízení do sítě, downlink zpráva ze síťového serveru do zařízení. fPort je číslo portu, podle kterého se pozná, co zpráva LoRaWAN nese. Zprávu Info popisuje stránka [**Zprávy a časování**](messages.md), obrazovku aplikace s informacemi o zařízení stránka [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info).
- **Bez klíče:** přes NFC hlásí zařízení verzi firmwaru v nešifrovaných základních informacích, takže ji telefon zjistí ještě dřív, než zná secret key zařízení.
- **LED:** připojené zařízení s obrazem debug nebo provisioning bliká každé 3 s zeleně a hned potom žlutě, ne jen zeleně. Od zařízení s obrazem release ho tak poznáte na první pohled.

## Typy sestavení {#build-types}

| Pole Info | Hodnota | Význam |
|---|---|---|
| `build_type_name` | `main` | Sestavení vydání z tagu verze, stejné jako na GitHubu |
| `build_type_name` | `dev` | Testovací sestavení větve nebo pull requestu. Hlásí verzi vydání, ke kterému směřuje, takže sestavení `dev`, které hlásí 2.0.0, není vydání 2.0.0 |
| `build_type_name` | `custom` | Sestavené lokálně nebo upravené |
| `debug` | `false` | Obraz release: bez shellu, řízení spotřeby zapnuté |
| `debug` | `true` | Obraz debug nebo provisioning: shell přes J-Link, řízení spotřeby vypnuté |

Do nainstalovaného zařízení patří jen sestavení `main` s `debug: false`. Obraz debug kvůli shellu nenechá procesor usnout, což vybíjí baterie, a po 2 h bez aktivity v shellu přejde do hlubokého spánku. Viz [**Nastavení firmwaru**](../developer-access/firmware-setup.md).

## Jak aktualizovat firmware {#how-to-update-the-firmware}

Firmware zařízení STICKER lze vyměnit jen ladicí sondou J-Link připojenou k programovacím ploškám SWD na zařízení. Aktualizace přes LoRaWAN, přes NFC ani přes bootloader neexistuje. Je to tak záměrně: nikdo nemůže firmware na dálku vyměnit ani vrátit na starší verzi. Znamená to ale také, že oprava firmwaru vyžaduje fyzický přístup ke každému zařízení.

- **Obrazy:** každé [**vydání na GitHubu**](https://github.com/hardwario/sticker-firmware/releases) obsahuje tři obrazy firmwaru a soubor s kontrolními součty. Pro v2.0.0 jsou to `hio-sticker-v2.0.0-release.hex` pro nainstalovaná zařízení, `hio-sticker-v2.0.0-debug.hex` se shellem pro diagnostiku, `hio-sticker-v2.0.0-provisioning.hex` pro výrobní linku a `SHA256SUMS`. Stažené soubory zkontrolujete příkazem `sha256sum -c SHA256SUMS`.
- **Postup:** nástroje, sestavení a příkazy pro nahrání firmwaru popisuje stránka [**Nastavení firmwaru**](../developer-access/firmware-setup.md).
- **Co zůstane:** běžné nahrání nahradí jen program. Zachová NVS (úložiště nastavení ve flash paměti) a v něm nastavení, identitu, klíče, čítače impulzů a čítače rámců LoRaWAN.
- **Historie:** obraz release uloženou historii senzorů ponechá. Obraz debug nebo provisioning je větší a oblast historie přepíše, proto si historii, kterou potřebujete, přečtěte dřív, než ho nahrajete.

| Údaje | Nahrání bez mazání | Smazání čipu |
|---|---|---|
| Nastavení, identita, secret key, klíče LoRaWAN | Zachová | Smaže |
| Čítače impulzů | Zachová | Smaže |
| Čítače rámců LoRaWAN a čítač připojení (DevNonce) | Zachová | Smaže |
| Historie senzorů | Obraz release ji zachová, obraz debug nebo provisioning ji přepíše | Smaže |

:::warning Nikdy nemažte celý čip
Smazání celého čipu (označované také jako mass erase) odstraní sériové číslo, secret key, claim token i klíče LoRaWAN. Aplikace HARDWARIO Manager pak se zařízením už nedokáže komunikovat. Síťový server navíc může odmítat zařízení, které se k síti už dřív připojilo přes OTAA (bezdrátovou aktivaci), dokud se na serveru nevymažou čítače připojení (DevNonce), které zařízení už použilo.
:::

### HARDWARIO STICKER Flash Tool {#hardwario-sticker-flash-tool}

HARDWARIO STICKER Flash Tool je aplikace pro počítače s Windows a Linuxem, která přes J-Link nahrává do zařízení STICKER firmware a zprovozňuje je. Její vydání pro firmware v2.0.0 obsahuje obrazy v2.0.0 a nabízí volbu **Migrate from / to**, ve výchozím stavu z v1.4.0 na v2.0.0, která převede přejmenovaná nastavení. Umí také vytvořit QR kód se secret key zařízení, který naimportuje aplikace HARDWARIO Manager. Migrace skutečného zařízení z v1.4.0 na v2.0.0 nebyla v době vydání této verze nástroje otestovaná **[ověřit]**. Jak se nástroj dostane k zákazníkům, je také potřeba potvrdit **[ověřit]**.

## Přechod z v1.4.x na v2.0.0 {#upgrade-from-v14x-to-v200}

Firmware v2.0.0 není s v1.4.x v několika ohledech kompatibilní. Než aktualizujete jedno zařízení nebo celou flotilu, projděte si tento seznam:

1. **HARDWARIO Manager:** aktualizujte aplikaci spolu s firmwarem. Starší aplikace zařízení s v2.0.0 nenakonfiguruje a NFC teď funguje jen na napájeném zařízení.
2. **Staré záznamy NFC:** zařízení aktualizované z v1.4.x si v paměti tagu ponechá staré záznamy NDEF, mezi nimi i claim token v nešifrované podobě. Jednou je smažte: spusťte `nfc clear` v sestavení debug, nebo z telefonu zapište prázdnou zprávu NDEF.
3. **Přejmenovaná a resetovaná nastavení:** z `lrw-deveui` a `lrw-appkey` jsou `radio-deveui` a `radio-appkey` a hodnoty se zachovají. Z `lrw-link-check-interval` a `lrw-link-check-fail-rejoin` jsou `radio-link-check-interval` a `radio-link-check-fail-rejoin` a vrátí se na 5 a 5. Ze schopností pro vstupy, PIR a bzučák jsou `cap-gpio-mode`, `cap-gpio-input-a` a `cap-gpio-input-b` a vrátí se na `none`; nastavte je znovu, jinak budou v telemetrii chybět hodnoty vstupů a čítače. Hostitel, který ještě posílá stará pole schopností, dostane `BAD_REQUEST`.
4. **Pravidla alarmů:** zapište všechna pravidla alarmů znovu. Pravidlo má nově 18 B a hodnotu určuje slotem a kanálem, čísla typů 1-Wire se změnila (2 pro DS18B20, 3 pro MACHINE PROBE) a stará pravidla se při prvním nebo druhém startu smažou. Viz [**Alarmy**](alarms.md).
5. **Prahový `dwell`:** u prahových pravidel je `dwell` nově pásmo necitlivosti v jednotkách hodnoty, například 0,5 °C, a už ne čas v sekundách. U četnostních pravidel je `dwell` nově okno, ve kterém se počítá.
6. **Historie senzorů:** znovu vyberte kanály historie parametrem `history-channels`, který nahrazuje `history-sensors`. Hostitel, který ještě zapisuje staré pole `history_sensors`, dostane `Ack`, ale nic se nezmění. Po aktualizaci začíná uložená historie prázdná, takže si nejdřív přečtěte, co z ní potřebujete. Návrat na starší verzi není podporovaný.
7. **Dekodér:** přejděte na `ttn.js` z v2.0.0 a ve smíšené flotile vybírejte dekodér podle verze firmwaru v Info. Info už nenese stav spojení, který firmware v1.4.x hlásil přes NFC; zjistíte ho příkazem `get_radio_state`, který funguje přes všechny kanály. Bity `device_status` jsou nově seskupené jinak. Viz [**Payload a dekodér**](payload.md).
8. **Příkazy:** `lrw_reset`, `enter_calibration` a nastavení `calibration` už přes LoRaWAN nefungují, viz [**Zpracování downlinků**](downlinks.md).
9. **Resety:** `factory_reset` nově maže i čítače impulzů a historii senzorů.
10. **Jen LoRa P2P:** uzly a hub ProXimos aktualizujte současně; každý uzel se po aktualizaci připojí znovu.

## Změny chování podle verzí {#behavior-changes-by-version}

Tabulka uvádí změny mezi verzemi, které mění to, co uživatel vidí.

| Oblast | v1.3.x | v1.4.x | v2.0.0 |
|---|---|---|---|
| Formát uplinků | Bitmapa na fPort 1 | Protobuf na fPortech 2, 3 a 85, bajt verze `0x01` | Stejné porty i bajt verze; nové kódování alarmů, hodnot 1-Wire a `device_status`; dlouhé odpovědi po stránkách |
| Rádio po prvním zapnutí | Nastavení `radio-mode` neexistuje | Ve výchozím stavu `radio-mode off` (režim Radio-Silent) | Stejně jako v1.4.x |
| NFC | Bez šifrování | Šifrované záznamy NDEF; funguje i na zařízení bez baterií; na iOS dvě přiložení na příkaz | Šifrovaný mailbox; jedno přiložení; zařízení musí být napájené; připravené asi 1,2 s po resetu |
| Ovládání na dálku | Bez příkazového protokolu | Příkazy na fPort 85 | Stejně, navíc `get_settings`, `get_radio_state` a stránkované odpovědi; `lrw_reset` a kalibrace jen přes NFC |
| Alarmy | Pevná nastavení prahů pro každý senzor | 16 pravidel, alarmová hlášení na fPort 3; `dwell` v sekundách | 16 pravidel určených slotem a kanálem; `dwell` u prahových pravidel je pásmo necitlivosti |
| Čítače impulzů po restartu nebo ztrátě napájení | Ztratí se | Zachovají se | Zachovají se; `factory_reset` je vynuluje |
| Historie senzorů | Žádná | Kruhový buffer ve flash paměti, čtení na vyžádání | Volitelné kanály; po přechodu z v1.4.x začíná prázdná |
| Od ztráty spojení po nové připojení, výchozí nastavení | Nezdokumentováno | Asi 9–10 h | Asi 4–5 h |
| Baterie pod 1,8 V při zapnutí | Nezdokumentováno | Zařízení se pořád dokola restartuje | Zařízení zabliká červeně a samo se vypne |

Všechny změny shrnuje stránka [**Seznam změn**](../changelog.md). Jak se zařízení připojuje a jak obnovuje ztracené spojení, popisuje stránka [**Připojení k síti**](network-connection.md).
