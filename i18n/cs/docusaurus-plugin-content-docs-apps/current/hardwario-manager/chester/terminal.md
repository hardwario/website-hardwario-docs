---
slug: terminal
title: Terminál
---

# Terminál zařízení CHESTER {#chester-terminal}

Terminál zpřístupní shell zařízení přes Bluetooth přímo v telefonu. Je to tatáž
konzole, ke které byste se jinak připojili kabelem.

Otevřete **CHESTER → Open Terminal**. Prázdný terminál napovídá, kde začít: zadejte příkaz, například `help` nebo `config show`.

---

## Spouštění příkazů {#running-commands}

Napište příkaz do pole **Enter a shell command** a odešlete ho. Příkaz se do
logu vypíše jako `$ command` a pod ním se v bloku s neproporcionálním písmem
zobrazí nezměněný výstup zařízení. Výstup lze označit a zkopírovat.

<img src="/img/hw-manager/hw-manager-chester-terminal.png" alt="Terminál zařízení CHESTER s výstupem příkazu config show a tlačítky s návrhy příkazů nad vstupním polem" width="320" />

Pokud se příkaz nepodaří odeslat, zapíše se chyba přímo do logu jako řádek
`[error]`, takže v záznamu toho, co se stalo, nic nechybí.

---

## Návrhy příkazů {#command-suggestions}

Terminál nehádá, ale zjistí si sadu příkazů přímo od zařízení:

- při otevření si aplikace na pozadí vyžádá od zařízení seznam jeho příkazů;
- jakmile dopíšete první slovo, zjistí si podpříkazy daného příkazu.

Odpovídající návrhy se zobrazí jako tlačítka nad vstupním polem. Klepnutím na
návrh se **vyplní vstupní pole**. Příkaz se tím nikdy nespustí, odesíláte ho vždy
sami.

<img src="/img/hw-manager/hw-manager-chester-terminal-help.png" alt="Terminál po spuštění help se seznamem skupin příkazů daného zařízení" width="320" />

Když spustíte `help` sami, vypíše se tentýž seznam, ze kterého návrhy čerpají:
skupiny příkazů, které tento firmware nabízí, každá s jednořádkovým popisem.

Návrhy pocházejí z připojeného zařízení, takže odpovídají jeho firmwaru. Při
odpojení se smažou.

---

## Historie výpisu {#scrollback}

Log se ukládá **pro každé zařízení zvlášť**, takže po opětovném připojení
k zařízení CHESTER uvidíte, co jste s ním dělali naposledy. Když se posunete
nahoru, objeví se tlačítko pro přechod na konec; po odeslání příkazu se výpis
vrátí na nejnovější výstup.

Pokud zařízení obrazovku vymaže samo, vymaže se s ní i log.

---

## Sdílení relace {#sharing-the-session}

Akcí v horní liště terminál nasdílíte někomu dalšímu, kdo pak může zařízení
sledovat a ovládat z prohlížeče. Viz
[**Sdílení relace terminálu**](./shared-sessions.md).

---

:::tip Jak změny zachovat
Nastavení změněná ze shellu jsou jen v pracovní paměti zařízení. Uložte je volbou
**Device info → Save configuration**, aby vydržela i restart, viz
[**Informace o zařízení**](./device-info.md).
:::
