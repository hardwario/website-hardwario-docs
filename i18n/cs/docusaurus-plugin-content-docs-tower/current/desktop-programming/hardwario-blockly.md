---
slug: hardwario-blockly
title: HARDWARIO Blockly
description: "Pro práci s tímto nástrojem je potřeba stáhnout experimentální HARDWARIO Playground"
---

import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

Pro práci s tímto nástrojem je potřeba [**stáhnout experimentální HARDWARIO Playground**](https://github.com/SmejkalJakub/hardwario-playground/releases)

:::

:::info

Tento nástroj je stále ve vývoji a občas se může chovat nestabilně. V takovém případě nás můžete kontaktovat na [**GitHubu**](https://github.com/hardwario/hardwario-blockly/issues) nebo přímo na **ask@hardwario.com**.

Aktuální problém se pravděpodobně podaří vyřešit jen **restartem aplikace Playground**.

:::

K vytvoření naší implementace **No-Code/Low-Code prostředí pro TOWER** jsme použili [**Google Blockly**](https://developers.google.com/blockly).

## Prostředí Blockly {#blockly-environment}

Toto je hlavní funkce nástroje. Poskytuje prostředí pro programování pomocí barevných bloků bez nutnosti napsat jediný řádek kódu.

Jde o **Low-code/No-code prostředí**, což znamená, že k jeho používání nemusíte umět psát kód.

Je navrženo tak, aby tvorba firmwaru byla rychlá a snadná pro uživatele na jakékoli úrovni znalostí.

<Image img={require('../../../../../tower/desktop-programming/images/blockly-showcase.png')} alt="Pracovní plocha HARDWARIO Blockly s inicializačními bloky a bloky událostí publikujícími data přes radio" />

### Příklady {#examples}

Pokud vás zajímá, jak s tímto prostředím pracovat nebo jak vypadá náš firmware, připravili jsme několik příkladů od jednodušších až po složitější. Díky nim můžete s Blockly začít okamžitě.

:::caution

Mezi klasickým projektem a příkladem je rozdíl. Příklad nelze uložit, takže pokud chcete některý příklad upravit, klikněte na **Project From Example**. Příklad se znovu otevře jako projekt a můžete s ním dělat cokoli.

:::

### Struktura projektu {#project-structure}

Práce s Blockly je poměrně přímočará, ale museli jsme provést několik změn.

Tento obrázek ukazuje základní projekt v HARDWARIO Blockly, projdeme si na něm několik důležitých prvků.

<Image img={require('../../../../../tower/desktop-programming/images/blockly-showcase.png')} alt="Pracovní plocha HARDWARIO Blockly s inicializačními bloky a bloky událostí publikujícími data přes radio" />

#### Pracovní plocha {#workspace}

Většina obrazovky. Sem umístíte všechny bloky, které budou představovat váš firmware.

První blok, který na tuto plochu přetáhnete, by měl být vždy blok z kategorie **Initialization** s textem **Application Initialization**. Ten slouží jako výchozí bod vaší aplikace.

Snažili jsme se uživateli práci s prostředím zjednodušit. Je zde zavedena částečná automatizace, například zakazování neinicializovaných bloků, zakazování osamocených bloků, mazání duplicitních inicializací atd.

#### Nástrojová lišta {#toolbox}

Na levé straně obrazovky. Obsahuje všechny dostupné kategorie a v nich samotné bloky.

Trochu jsme to zjednodušili tím, že se zobrazují pouze inicializované kategorie. Pokud tedy některou kategorii v nástrojové liště nevidíte, přejděte do kategorie **Initialization** a inicializujte ji pomocí odpovídajícího bloku.

#### Dolní panel {#bottom-panel}

Ve spodní části stránky. Zde najdete další ovládací prvky pro Blockly.

Tlačítka na dolním panelu:

- **Compile And Flash** – [**spustí kompilaci a poté přepne na kartu firmwaru**](#compiling-and-flashing), abyste mohli vytvořený firmware nahrát do zařízení.
- **Save Workspace** – uloží aktuální pracovní plochu. Automatické ukládání je zapnuto ve výchozím nastavení.
- **Export Workspace** – pracovní plochu můžete exportovat ve formátu **.xml**, abyste ji mohli distribuovat nebo později **importovat**.
- **Import Workspace** – zde můžete importovat pracovní plochu ve formátu **.xml**.
- **Show/Hide Code** – **zobrazí/skryje kód**, takže vidíte **vygenerovaný kód v jazyce C**.
- **Return Home** – vrátí vás na domovskou stránku.

:::note

Aby váš projekt fungoval, musíte na pracovní plochu přidat blok **Application Initialization**

:::

### Generování kódu v reálném čase {#live-code-generation}

Tento nástroj umožňuje **zobrazit průběžně generovaný kód v C**, který je identický s bloky na pracovní ploše.

Díky tomu můžete vytvořit základní firmware pomocí bloků, kód si pak vzít a dokončit ho v [**HARDWARIO Code**](../firmware-development/about-hardwario-code.md).

<Image img={require('../../../../../tower/desktop-programming/images/blockly-code.png')} alt="Pracovní plocha Blockly se zapnutou funkcí Show Code: vygenerovaný kód v C se zobrazuje vedle bloků" />

### Kompilace a nahrání firmwaru {#compiling-and-flashing}

:::caution

Aby to fungovalo, musíte mít na zařízení nainstalované CMake, Ninja a git, a to v cestě PATH. Více informací najdete v kapitole [**TOWER VSCode Extension**](../firmware-development/tower-vscode-extension.md#tools-setup).

:::

Až budete s firmwarem hotovi, stačí kliknout na tlačítko **Compile and Flash** ve spodní části stránky. Po chvíli se prostředí přepne na kartu firmwaru a vy jen vyberete své zařízení a nahrajete firmware.

:::tip

Více o nahrávání firmwaru v [**kapitole Firmware Flashing**](./firmware-flashing.md)

:::

## Další funkce (POKROČILÉ) {#other-features-advanced}

:::tip

Toto je pokročilá část nástroje. Vůbec ji nemusíte používat, ale může vás zajímat, pokud chcete vytvářet vlastní kategorie a vlastní bloky, které pak můžete použít v **HARDWARIO Blockly**.

:::

### Přenositelnost {#portability}

:::info

Uživatelskou složku otevřete kliknutím na **Open Projects Folder** na úvodní stránce Blockly nebo na **Open Blocks Folder** na úvodní stránce Blocks Creatoru.

:::

Pokud chcete distribuovat své projekty nebo vytvořené bloky, stačí zkopírovat uživatelskou složku ze svého souborového systému, zabalit ji například do zip souboru a odeslat.
Na druhé straně si ji uživatel jen rozbalí do své uživatelské složky a poté v aplikaci Playground znovu načte Blockly.

### Generování bloků {#blocks-generation}

Tuto funkci otevřete kliknutím na tlačítko **Go to Blocks Creator** na úvodní stránce Blockly.

#### Kategorie {#categories}

Pro úpravu kategorií klikněte na tlačítko **Edit your categories** v horní části obrazovky Blocks Creatoru.

Kategorie musíte přidat, abyste do nich mohli umístit vlastní bloky. Můžete také použít předpřipravené kategorie, které používáme my, ale není to doporučeno.

:::info

Zde je příklad, jak přidat základní kategorie. Kategorii můžete přidat bez jakékoli další konfigurace, nebo jí můžete přidat barvu (ve formátu RGB).

Tento příklad přidá kategorii **Ultrasound Sensor** s černou barvou (výchozí barva) a kategorii **External Temperature Sensor** s barvou "#CF0514".

:::

<details>
<summary>
<b>
Příklad základních kategorií
</b>
</summary>
<p>

  ```yml showLineNumbers
  ---
  categories:
    Ultrasound Sensor:
    External Temperature Sensor:
      colour: '#CF0514'
  ```

</p>
</details>


#### Bloky {#blocks}

Vlastní bloky můžete přidávat pomocí nástroje **Blocks Creator**.

:::info

První příklad je jeden z našich předpřipravených modulů pro [**Button Module**](https://www.hardwario.store/p/button-module) systému TOWER. Zde vidíte strukturu souboru.

- `category` – určuje, která kategorie bude použita pro bloky tohoto modulu (kategorie musí být obsažena mezi předpřipravenými nebo vašimi kategoriemi).

- `global_variable` – zde můžete řádek po řádku přidat cokoli, co chcete umístit na začátek kódu.

- `application_init` – zde definujete blok, který půjde vždy do **kategorie Initialization** –
  - `block`
    - `text` – zde uvedete, jaký text bude na bloku zobrazen. Pomocí `%` můžete některé části generovat z **arguments**.
    - `arguments` – zde musíte jeden po druhém uvést argumenty, které nahradí `%` v textu pomocí `dropdown/number/variable/atd.`
  - `code` – zde řádek po řádku uvedete kód, který bude přidán do `application_init`. Pomocí `{ARGUMENT_NAME}` můžete některé části nechat nahradit podle `arguments`.

- `handler` – tento blok bude představovat obsluhu událostí vašeho modulu. Bude to blok, do kterého lze vkládat další bloky (rodičovský blok)

- `action` – zde přidáte každou možnou akci, kterou váš modul umí. Každý z těchto prvků bude samostatný blok přidaný do vámi zadané kategorie.
  - `NAME_OF_THE_ACTION` – uvedete jen název bloku, musí být specifický pro daný modul.
    - `block` – funguje stejně jako v části `application_init`, blok se jen umístí do zadané kategorie.
    - `code` – kód funguje také stejně.
:::

<details>
<summary>
<b>
Předpřipravený modul Button
</b>
</summary>
<p>

  ```yaml showLineNumbers
  ---
  button:
    category:
      - Button
    global_variable:
      - twr_button_t button;
    application_init:
      block:
        text:
          - Initialize Button %1
          - Button GPIO %2 %3
          - Button Pull %4 %5
          - Default State %6
        arguments:
          X:
            type: new_line
          GPIO:
            type: dropdown
            options:
              - ["BUTTON", "TWR_GPIO_BUTTON"]
          Y:
            type: new_line
          PULL:
            type: dropdown
            options:
              - ["DOWN", "TWR_GPIO_PULL_DOWN"]
              - ["NONE", "TWR_GPIO_PULL_NONE"]
              - ["UP", "TWR_GPIO_PULL_UP"]
          Z:
            type: new_line
          DEFAULT_STATE:
            type: dropdown
            options:
              - ["TRUE", "TRUE"]
              - ["FALSE", "FALSE"]
      code:
        - twr_button_init(&button, {GPIO}, {PULL}, 0);
        - twr_button_set_event_handler(&button, button_event_handler, NULL);
    handler:
      block:
        text: On Button %1
      declaration: void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
      events:
        prefix: TWR_BUTTON_EVENT_
        enum:
          PRESS:
          RELEASE:
          CLICK:
            - button_click_count++;
          HOLD:
            - button_hold_count++;
    action:
      publish_click_count:
        block:
          text:
            - Publish Button Click Count Over the Radio
        code:
          - twr_radio_pub_push_button(&button_click_count);
      publish_hold_count:
        block:
          text:
            - Publish Button Hold Count Over the Radio
        code:
          - twr_radio_pub_event_count(TWR_RADIO_PUB_EVENT_HOLD_BUTTON, &button_hold_count);
  ```

</p>
</details>
