---
slug: terminal
title: Terminál
description: "Shell zařízení CHESTER v telefonu přes Bluetooth v aplikaci HARDWARIO Manager: návrhy příkazů podle firmwaru a historie výstupu pro každé zařízení."
---

# Terminál zařízení CHESTER {#chester-terminal}

Terminál zpřístupní shell zařízení přes Bluetooth přímo v telefonu. Je to tatáž
konzole, ke které byste se jinak připojili kabelem.

Otevřete **CHESTER → Terminál**. Prázdný terminál napovídá, kde začít:
*Napište příkaz níže, zkuste třeba „help“ nebo „config show“.*

---

## Spouštění příkazů {#running-commands}

Napište příkaz do pole **Zadejte příkaz shellu** a odešlete ho. Příkaz se do
logu vypíše jako `$ command` a pod ním se v bloku s neproporcionálním písmem
zobrazí nezměněný výstup zařízení. Výstup lze označit a zkopírovat.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-terminal.png" alt="Terminál zařízení CHESTER s příkazem a výstupem zařízení a se vstupním polem Zadejte příkaz shellu dole" width="320" />

Pokud se příkaz nepodaří odeslat, zapíše se chyba přímo do logu: řádek
`[error]` s popisem, co se stalo, a za ním řádek `[detail]` s původním chybovým
hlášením. V záznamu toho, co se stalo, tak nic nechybí.

---

## Návrhy příkazů {#command-suggestions}

Terminál nehádá, ale zjistí si sadu příkazů přímo od zařízení:

- při otevření si aplikace na pozadí vyžádá od zařízení seznam jeho příkazů;
- jakmile dopíšete první slovo, zjistí si podpříkazy daného příkazu.

Ani jeden z těchto dotazů se v logu neobjeví. Odpovídající návrhy se zobrazí
jako tlačítka nad vstupním polem. Klepnutím na návrh se **vyplní vstupní pole**.
Příkaz se tím nikdy nespustí, odesíláte ho vždy sami.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-terminal-help.png" alt="Terminál s rozepsaným příkazem a tlačítky s návrhy nad vstupním polem" width="320" />

Když spustíte `help` sami, vypíše se tentýž seznam, ze kterého návrhy čerpají:
skupiny příkazů, které tento firmware nabízí, každá s jednořádkovým popisem.

Návrhy pocházejí z připojeného zařízení, takže odpovídají jeho firmwaru. Při
odpojení se smažou.

---

## Historie výpisu {#scrollback}

Log se ukládá **pro každé zařízení zvlášť**, takže po opětovném připojení
k zařízení CHESTER uvidíte, co jste s ním dělali naposledy. Terminál se otevře
na nejnovějším výstupu. Když se posunete nahoru, objeví se tlačítko **Přejít
dolů**; po odeslání příkazu se výpis vrátí na nejnovější výstup.

Pokud zařízení obrazovku vymaže samo, vymaže se s ní i log.

---

## Sdílení relace {#sharing-the-session}

Tlačítkem v horní liště (**Sdílet tuto relaci**) terminál nasdílíte někomu
dalšímu, kdo pak může zařízení sledovat a ovládat z prohlížeče nebo z aplikace.
Viz [**Sdílení relace terminálu**](./shared-sessions.md).

---

:::tip Jak změny zachovat
Nastavení změněná ze shellu jsou jen v pracovní paměti zařízení, dokud
nespustíte `config save`. Tento příkaz je uloží, aby vydržela i restart,
a zařízení restartuje, čímž se Bluetooth spojení přeruší. Stejně se ukládají
i změny provedené v sekci [**Konfigurace**](./configuration.md).
:::
