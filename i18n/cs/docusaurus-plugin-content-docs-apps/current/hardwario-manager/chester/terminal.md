---
slug: terminal
title: Terminál
description: "Terminál vám dá shell zařízení přes Bluetooth, tutéž konzoli, ke které byste se"
---

# Terminál zařízení CHESTER {#chester-terminal}

Terminál vám dá shell zařízení přes Bluetooth, tutéž konzoli, ke které byste se
dostali kabelem, jen z telefonu.

Otevřete **CHESTER → Open Terminal**. Prázdný terminál napovídá, kde začít:

> Type a command below — try "help" or "config show".

---

## Spouštění příkazů {#running-commands}

Napište příkaz do **Enter a shell command** a odešlete ho. Příkaz se do logu
vypíše jako `$ command` a pod ním následuje výstup zařízení beze změny
v monospace bloku. Výstup lze vybrat a zkopírovat.

<img src="/img/hw-manager/hw-manager-chester-terminal.png" alt="Terminál zařízení CHESTER s výstupem příkazu config show a odznaky s návrhy příkazů nad vstupním polem" width="320" />

Pokud se příkaz nepodaří odeslat, zapíše se selhání do logu jako řádek
`[error]`, takže přepis drží úplný záznam toho, co se stalo.

---

## Návrhy příkazů {#command-suggestions}

Terminál se sadu příkazů zařízení naučí, místo aby hádal:

- při otevření se aplikace zařízení tiše zeptá na seznam jeho příkazů;
- jakmile napíšete víc než první slovo, zeptá se daného příkazu na jeho podpříkazy.

Odpovídající návrhy se objeví jako odznaky nad vstupním polem. Klepnutí na některý
**vyplní vstup**. Nikdy příkaz nespustí, takže ho vždycky odesíláte vy sami.

<img src="/img/hw-manager/hw-manager-chester-terminal-help.png" alt="Terminál po spuštění help se seznamem skupin příkazů daného zařízení" width="320" />

Když spustíte `help` sami, vypíše se tentýž seznam, ze kterého návrhy čerpají:
skupiny příkazů, které tento firmware nabízí, každá s jednořádkovým popisem.

Návrhy pocházejí z připojeného zařízení, takže odpovídají jeho firmwaru. Při
odpojení se smažou.

---

## Historie výpisu {#scrollback}

Log se drží **pro každé zařízení zvlášť**, takže při opětovném připojení
k zařízení CHESTER se vrátí to, co jste s ním dělali naposledy. Když odscrollujete
nahoru, objeví se tlačítko pro skok na konec, a odeslání příkazu skočí zpět na
nejnovější výstup.

Pokud zařízení obrazovku vymaže samo, vymaže se s ní i log.

---

## Sdílení session {#sharing-the-session}

Akce v horní liště tenhle terminál nasdílí někomu dalšímu, kdo pak může zařízení
sledovat a ovládat z prohlížeče. Viz
[**Sdílení terminálové session**](./shared-sessions.md).

---

:::tip Uchování toho, co změníte
Nastavení změněná ze shellu žijí v pracovní paměti zařízení. Pomocí
**Device info → Save configuration** je zapište, aby přežila restart, viz
[**Informace o zařízení**](./device-info.md).
:::
