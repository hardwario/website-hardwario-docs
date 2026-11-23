---
slug: one-wire
title: Sondy 1-Wire
description: Jak zařízení STICKER najde sondy DS18B20 a MACHINE PROBE a co se stane, když se sonda odpojí, znovu připojí nebo vymění.
---
import LedPattern from '@site/src/components/LedPattern';

# Sondy 1-Wire {#1-wire-probes}

Tato stránka popisuje, jak zařízení STICKER Input najde své sondy 1-Wire a co uvidíte, když se sonda odpojí, znovu připojí nebo vymění.

## Podporované sondy {#supported-probes}

Zařízení STICKER podporuje teplotní sondy DS18B20 a sondu [**MACHINE PROBE**](../sticker-input-wiring/machine-probe.md). Pro sondy má čtyři sloty (`s1` až `s4`) a od každého typu použije nejvýš dvě sondy. V praxi to jsou 2 sondy DS18B20 a 2 sondy MACHINE PROBE. Zapojení a nastavení popisuje stránka [**Teplotní sondy 1-Wire (Dallas)**](../sticker-input-wiring/one-wire-dallas.md).

Každý slot si pamatuje sériové číslo (ROM) své sondy a určuje, pod jakým názvem se její hodnoty objeví v telemetrii (pravidelných hlášeních s naměřenými hodnotami), v historii a v pravidlech alarmů. Na všech svých zařízeních proto dodržujte stejné pořadí slotů.

## Jak zařízení STICKER hledá sondy {#how-sticker-finds-probes}

Zařízení hledá sondy na sběrnici:

- **při startu,** pokud je některý slot nastavený, tedy má uloženou sondu nebo očekávaný typ sondy (`sensor1-type` až `sensor4-type`);
- **na pozadí,** dokud některý nastavený slot čeká na svou sondu: asi 2, 7, 17 a 32 min po startu, potom každých 15 min;
- **když sloty přečtete** v aplikaci HARDWARIO Manager (**Tools → 1-Wire sensors**) nebo pošlete příkaz `w1_scan`.

Zařízení nalezenou sondu použije hned, bez restartu. Novou sondu, která nepatří žádnému slotu, zařadí do nejnižšího volného slotu. Aby tam zůstala i po restartu, uložte nastavení.

Nové zařízení nemá nastavený žádný slot, takže první sondy nastavte v aplikaci HARDWARIO Manager, viz [**Senzory 1-Wire**](/apps/hardwario-manager/sticker/one-wire-sensors).

## Když se sonda odpojí nebo znovu připojí {#when-a-probe-is-disconnected-or-reconnected}

Když sondu odpojíte nebo sonda selže, projeví se to od příštího čtení senzorů takto:

- její hodnoty jsou v telemetrii i v historii `null`;
- její slot má stav `absent` v uplinku Info, tedy ve zprávě s informacemi o zařízení, kterou STICKER posílá po každém připojení k síti a jednou denně;
- zařízení vyvolá pro celou sondu jeden alarm chybějících dat a ukončí všechny její aktivní prahové alarmy;
- <LedPattern pattern="red" /> LED každé 3 s velmi krátce blikne červeně, dokud je alarm aktivní a zařízení je ve stavu Připojeno.

Jakmile sonda znovu odpoví, slot se vrátí do stavu `ok`, hodnoty se znovu objeví a alarm skončí, a to bez restartu. Pokud se zařízení restartovalo, zatímco byla sonda odpojená, najde ji při kontrole na pozadí nebo když sloty přečtete.

## Výměna sondy {#replacing-a-probe}

Nová sonda má jiné sériové číslo, a proto ji zařízení nikdy samo nezařadí do slotu té staré. Aby zařízení novou sondu našlo, přečtěte sloty v aplikaci HARDWARIO Manager nebo zařízení restartujte. Sondu pak zařadí do volného slotu, pokud nějaký je.

Chcete-li novou sondu zařadit do slotu té staré, aby její hodnoty měly dál stejný název, postupujte takto:

1. Připojte novou sondu ke vstupu, na kterém byla ta stará.
2. V aplikaci HARDWARIO Manager otevřete **STICKER → Tools → 1-Wire sensors**, zvolte **Read slots & scan the 1-Wire bus** a přiložte telefon k zařízení.
3. Přiřaďte novou sondu ke slotu té staré. Sondy od sebe rozlišíte tak, že jednu zahřejete v ruce a sledujete, která hodnota se mění.
4. Vyprázdněte všechny sloty, ve kterých už žádná sonda není.
5. Zvolte **Save to device** a přiložte telefon k zařízení. Zařízení sloty uloží a restartuje se.
6. Zkontrolujte, že další uplink Info ukazuje slot ve stavu `ok` a že telemetrie obsahuje jeho hodnoty.

Pokud je nová sonda jiného typu, nastavte pravidla alarmů slotu znovu, protože pravidla pro starý typ zůstanou neaktivní. Pokud historie ukládá hodnoty tohoto slotu, začne znovu od začátku.

## Stavy slotů v uplinku Info {#slot-states-in-the-info-uplink}

Uplink Info uvádí stav každého slotu:

| Stav | Význam | Co dělat |
|---|---|---|
| `ok` | Sonda odpovídá | Nic |
| `absent` | Sonda chybí | Zkontrolujte sondu a její kabel |
| `replaced` | Sonda chybí a je připojená nová sonda stejného typu | Přiřaďte novou sondu ke slotu |
| `mismatch` | Sonda chybí a je připojená sonda jiného typu, kterou nemůže převzít žádný volný slot | Připojte sondu správného typu nebo slot nastavte znovu |

Nepoužívaný slot má stav `none`. Ve stavu `mismatch` vyvolá slot místo alarmu chybějících dat alarm nesprávné sondy 1-Wire. Pravidla alarmů tohoto slotu přitom zůstanou neaktivní.
