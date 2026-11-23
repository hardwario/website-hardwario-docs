---
slug: /device-behavior
title: Chování zařízení
description: Jak se zařízení STICKER chová od zapnutí po každodenní provoz, co znamená blikání LED a kde hledat, když něco nefunguje.
---
import StickerDeviceStates from '@site/src/components/StickerDeviceStates';

# Chování zařízení {#device-behavior}

Tato kapitola popisuje, co zařízení STICKER dělá v běžných situacích a jak to poznáte. Popis odpovídá firmwaru STICKER v2.0.0.

## Stavy zařízení {#device-states}

Co zařízení právě dělá, ukazuje stavová LED. Většina bliknutí je velmi krátká a opakuje se každé 3 s, proto zařízení několik sekund sledujte.

<StickerDeviceStates />

## Běžný den {#a-normal-day}

Připojené zařízení STICKER ve výchozím nastavení:

- při startu se připojí k síti a po ztrátě spojení znovu;
- každých 15 min posílá naměřené hodnoty;
- po každém připojení k síti a jednou denně posílá informace o zařízení a hlavní nastavení;
- s každým 5. hlášením kontroluje rádiové spojení;
- po připojení a pak jednou týdně si seřídí hodiny podle sítě;
- asi 10 s po začátku nebo konci alarmu odešle alarmový report.

## Rozcestník {#find-the-right-page}

| Situace | Stránka |
|---|---|
| LED se po vložení baterií chová nečekaně | [**Start a inicializace**](startup.md) |
| Zařízení se na síťovém serveru neobjeví nebo přestala přicházet data | [**Připojení k síti**](network-connection.md) |
| Chcete vědět, jaké zprávy zařízení posílá a jak často | [**Zprávy a časování**](messages.md) |
| Poslali jste příkaz a nic se nezměnilo | [**Zpracování downlinků**](downlinks.md) |
| Potřebujete naměřené hodnoty z doby, kdy zařízení nebylo v síti | [**Historie a čítače**](history-and-counters.md) |
| Chcete nastavit alarmy | [**Alarmy**](alarms.md) |
| Sonda 1-Wire se odpojila nebo jste ji vyměnili | [**Sondy 1-Wire**](one-wire.md) |
| Nastavujete zařízení telefonem | [**Konfigurace**](configuration.md) |
| Máte dotaz k bateriím | [**Baterie a napájení**](battery.md) |
| Dekódujete data ve vlastním systému | [**Payload a dekodér**](payload.md) |
| Potřebujete zjistit verzi firmwaru nebo ho aktualizovat | [**Verze a aktualizace firmwaru**](firmware.md) |
| Něco nefunguje a hledáte příčinu | [**Řešení problémů**](troubleshooting.md) |
