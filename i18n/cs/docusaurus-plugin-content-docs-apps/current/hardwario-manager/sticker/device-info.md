---
slug: device-info
title: Informace o zařízení
description: "Přes NFC přečtete firmware, dobu provozu, baterii, aktivní alarmy, stavové příznaky a stav rádia zařízení STICKER."
---

# Informace o zařízení {#device-info}

**Informace o zařízení** přečtou přes NFC během několika sekund stav zařízení
STICKER: jaký firmware běží, jak dlouho je zařízení v provozu, jeho baterii,
alarmy, stav a stav rádiového spojení.

:::info Zařízení nejdřív uložte
Čtení používá šifrovaný kanál, takže zařízení musí být uložené se svým
**tajným klíčem**. Viz [**Uložená zařízení STICKER**](./saved-stickers.md).
:::

---

## Čtení informací o zařízení {#read-device-info}

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Informace o zařízení**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.

<img src="/img/hw-manager/hw-manager-device-info.png" alt="Informace o zařízení přečtené přes NFC: nahoře STICKER a sériové číslo, pod tím Firmware, Doba provozu, Baterie, Aktivní alarmy, Stav a Rádio, sbalená sekce Pokročilé a tlačítko Číst znovu" width="320" />

Obrazovka začíná nápisem **STICKER** a sériovým číslem, tedy číslem vytištěným
na zařízení. Pod ním jsou řádky:

| Řádek | Význam |
|---|---|
| **Firmware** | Běžící verze firmwaru, u ladicího sestavení s *(debug)* |
| **Doba provozu** | Doba od posledního startu |
| **Baterie** | Naměřené napájecí napětí. Zobrazí se, když ho zařízení hlásí |
| **Aktivní alarmy** | *Žádné*, nebo počet spuštěných pravidel alarmů; klepnutím je vypíšete, viz [**Pravidla alarmů**](./alarms.md) |
| **Stav** | *OK*, když zařízení nehlásí žádný problém, jinak počet nastavených příznaků; klepnutím je vypíšete |
| **Rádio** | Stav rádiového spojení, viz [**Stavy rádia**](#radio-states) |
| **Senzory 1-Wire** | *OK*, nebo kolik slotů potřebuje pozornost; klepnutím zobrazíte jednotlivé sloty. Zobrazí se, když jsou sloty 1-Wire nastavené |
| **Poslední pád** | Proč firmware naposledy spadl. Zobrazí se jen po pádu |

**Pokročilé** rozbalí diagnostické podrobnosti:

| Řádek | Význam |
|---|---|
| **Poslední downlink** | Síla signálu, poměr signálu k šumu a stáří posledního downlinku, pokud zařízení nějaký přijalo |
| **Čas (UTC)** | Hodiny zařízení; *nenastaveno*, dokud čas nesynchronizujete, viz [**Nástroje**](./tools.md) |
| **DevEUI** | Identifikátor zařízení v rádiové síti |
| **Sestavení** | Sestavení firmwaru, například *main* nebo *custom* |
| **Příčina resetu** | Proč se zařízení naposledy restartovalo |

**Číst znovu** zopakuje čtení, aniž byste opustili obrazovku. Stačí znovu
přiložit telefon k zařízení.

Pokud má zařízení firmware starší než v2.0.0, obrazovka přidá upozornění:
*Aktualizace tohoto zařízení na firmware 2.0 smaže uloženou historii a zneplatní
pravidla alarmů.*

---

## Stavy rádia {#radio-states}

Řádek **Rádio** ukazuje, co dělá rádiové spojení. Zeleně svítí jen
**V pořádku**.

| Stav | Význam |
|---|---|
| **V pořádku** | Zařízení je v síti a kontroly spojení procházejí |
| **Připojování** | Zařízení se pokouší připojit k síti |
| **Znovu se připojuje** | Zařízení ztratilo síť a připojuje se znovu |
| **Varování (kontrola spojení selhává)** | Zařízení je připojené, ale síť přestala odpovídat na kontroly spojení |
| **Nečinné** | Rádio je zapnuté, ale nevysílá |
| **Vypnuto (rádio mlčí)** | Rádio je v konfiguraci vypnuté a zařízení nic nevysílá |
| **Vypnuto** | Rádio je vypnuté, například v **Režimu rádia** nebo po obnovení továrního nastavení |

Jak rádio zapnout nebo spustit připojení k síti, popisuje stránka
[**Rádio**](./radio.md).

---

## Stavové příznaky {#health-flags}

Když řádek **Stav** ukazuje příznaky, klepnutím zjistíte které. Jejich názvy
pocházejí z hlášení samotného zařízení:

| Příznak | Význam |
|---|---|
| **Slabá baterie** | Zařízení hlásí slabou baterii. Věřte tomu víc než napětí, protože firmware článek zná |
| **Čas nesynchronizován** | Hodiny nejsou nastavené, viz [**Nástroje**](./tools.md) |
| **Historie nefunguje** | Historie senzorů se nezaznamenává |
| **NFC nefunguje**, **NFC mailbox nefunguje** | Selhala část rozhraní NFC |
| **Sběrnice I2C zaseknutá** | Vnitřní sběrnice senzorů se zasekla |
| **Okno pro nárokování otevřeno** | Zařízení čeká na nárokování |

Problémy s rádiem tu nenajdete: ukazuje je řádek **Rádio**.
