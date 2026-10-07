---
slug: hardwario-blockly
title: HARDWARIO Blockly
---

import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

K práci s tímto nástrojem potřebujete [**experimentální verzi aplikace HARDWARIO Playground**](https://github.com/SmejkalJakub/hardwario-playground/releases).

:::

:::info

Tento nástroj je stále ve vývoji a občas se může chovat nestabilně. V takovém případě nás můžete kontaktovat na [**GitHubu**](https://github.com/hardwario/hardwario-blockly/issues) nebo přímo na **ask@hardwario.com**.

Problém nejspíš vyřeší už **restart aplikace Playground**.

:::

Na knihovně [**Google Blockly**](https://developers.google.com/blockly) jsme postavili vlastní **prostředí No-Code/Low-Code pro platformu TOWER**.

## Prostředí Blockly {#blockly-environment}

To je hlavní funkce nástroje: prostředí, ve kterém programujete skládáním barevných bloků a nemusíte napsat jediný řádek kódu.

Jde o **prostředí Low-code/No-code**, takže k jeho používání nemusíte umět programovat.

Firmware v něm rychle a snadno vytvoří uživatel s jakoukoli úrovní znalostí.

<Image img={require('../../../../../tower/desktop-programming/images/blockly-showcase.png')} alt="Pracovní plocha HARDWARIO Blockly s inicializačními bloky a bloky událostí publikujícími data přes rádio" />

### Příklady {#examples}

Pokud vás zajímá, jak s tímto prostředím pracovat nebo jak vypadá náš firmware, připravili jsme několik příkladů od jednodušších až po složitější. Díky nim můžete s Blockly začít okamžitě.

:::caution

Mezi klasickým projektem a příkladem je rozdíl. Příklad nelze uložit, takže pokud chcete některý příklad upravit, klikněte na **Project From Example**. Příklad se znovu otevře jako projekt a můžete s ním dělat cokoli.

:::

### Struktura projektu {#project-structure}

Práce s Blockly je poměrně přímočará, ale několik věcí jsme museli upravit.

Na obrázku je základní projekt v HARDWARIO Blockly. Projdeme si na něm nejdůležitější prvky.

<Image img={require('../../../../../tower/desktop-programming/images/blockly-showcase.png')} alt="Pracovní plocha HARDWARIO Blockly s inicializačními bloky a bloky událostí publikujícími data přes rádio" />

#### Pracovní plocha {#workspace}

Zabírá většinu obrazovky. Sem umístíte všechny bloky, které tvoří váš firmware.

První blok, který na tuto plochu přetáhnete, by měl být vždy blok z kategorie **Initialization** s textem **Application Initialization**. Ten slouží jako výchozí bod vaší aplikace.

Snažili jsme se práci s prostředím co nejvíc zjednodušit, takže některé věci probíhají automaticky: neinicializované a osamocené bloky se deaktivují, duplicitní inicializace se mažou atd.

#### Panel nástrojů {#toolbox}

Je na levé straně obrazovky a obsahuje všechny dostupné kategorie, v nich pak samotné bloky.

Pro přehlednost se zobrazují jen inicializované kategorie. Pokud tedy některou kategorii v panelu nástrojů nevidíte, přejděte do kategorie **Initialization** a inicializujte ji pomocí odpovídajícího bloku.

#### Dolní panel {#bottom-panel}

Je ve spodní části stránky a najdete na něm další ovládací prvky Blockly.

Tlačítka na dolním panelu:

- **Compile And Flash**: [**spustí kompilaci a pak přepne na záložku Firmware**](#compiling-and-flashing), abyste mohli vytvořený firmware nahrát do zařízení.
- **Save Workspace**: uloží aktuální pracovní plochu. Automatické ukládání je ve výchozím nastavení zapnuté.
- **Export Workspace**: exportuje pracovní plochu ve formátu **.xml**, abyste ji mohli sdílet nebo později znovu **importovat**.
- **Import Workspace**: importuje pracovní plochu ve formátu **.xml**.
- **Show/Hide Code**: zobrazí nebo skryje **vygenerovaný kód v jazyce C**.
- **Return Home**: vrátí vás na domovskou stránku.

:::note

Aby projekt fungoval, musíte na pracovní plochu přidat blok **Application Initialization**.

:::

### Generování kódu v reálném čase {#live-code-generation}

Nástroj umí **průběžně zobrazovat vygenerovaný kód v C**, který přesně odpovídá blokům na pracovní ploše.

Základní firmware tak můžete poskládat z bloků a kód pak dokončit v editoru [**HARDWARIO Code**](../firmware-development/about-hardwario-code.md).

<Image img={require('../../../../../tower/desktop-programming/images/blockly-code.png')} alt="Pracovní plocha Blockly se zapnutou funkcí Show Code: vygenerovaný kód v C se zobrazuje vedle bloků" />

### Kompilace a nahrání firmwaru {#compiling-and-flashing}

:::caution

Aby to fungovalo, musíte mít v počítači nainstalované nástroje CMake, Ninja a git a musí být v proměnné PATH. Více informací najdete v kapitole [**TOWER VSCode Extension**](../firmware-development/tower-vscode-extension.md#tools-setup).

:::

Až budete s firmwarem hotovi, stačí kliknout na tlačítko **Compile and Flash** ve spodní části stránky. Po chvíli se prostředí přepne na záložku Firmware, kde už jen vyberete své zařízení a firmware nahrajete.

:::tip

Více o nahrávání firmwaru najdete v [**kapitole Nahrání firmwaru**](./firmware-flashing.md).

:::

## Další funkce (pro pokročilé) {#other-features-advanced}

:::tip

Tato část je pro pokročilé. Vůbec ji nemusíte používat, hodí se ale, pokud chcete vytvářet vlastní kategorie a bloky a používat je pak v **HARDWARIO Blockly**.

:::

### Přenositelnost {#portability}

:::info

Uživatelskou složku otevřete kliknutím na **Open Projects Folder** na úvodní stránce Blockly nebo na **Open Blocks Folder** na úvodní stránce Blocks Creatoru.

:::

Pokud chcete své projekty nebo vytvořené bloky předat dál, stačí zkopírovat uživatelskou složku, zabalit ji třeba do archivu ZIP a poslat.
Příjemce ji pak jen rozbalí do své uživatelské složky a v aplikaci Playground znovu načte Blockly.

### Generování bloků {#blocks-generation}

Tuto funkci otevřete kliknutím na tlačítko **Go to Blocks Creator** na úvodní stránce Blockly.

#### Kategorie {#categories}

Kategorie upravíte tlačítkem **Edit your categories** v horní části obrazovky Blocks Creatoru.

Vlastní bloky se umisťují do kategorií, které si musíte nejdřív přidat. Můžete použít i naše předpřipravené kategorie, ale nedoporučujeme to.

:::info

Zde je příklad, jak přidat základní kategorie. Kategorii můžete přidat bez jakékoli další konfigurace, nebo jí můžete přidat barvu (ve formátu RGB).

Tento příklad přidá kategorii **Ultrasound Sensor** s černou barvou (výchozí barva) a kategorii **External Temperature Sensor** s barvou „#CF0514“.

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

Prvním příkladem je náš předpřipravený modul pro [**Button Module**](https://www.hardwario.store/p/button-module) platformy TOWER. Je na něm vidět struktura souboru.

- `category`: určuje, do které kategorie patří bloky tohoto modulu (kategorie musí být mezi předpřipravenými nebo vašimi vlastními kategoriemi).

- `global_variable`: řádek po řádku sem přidáte cokoli, co chcete mít na začátku kódu.

- `application_init`: tady definujete blok, který půjde vždy do **kategorie Initialization**:
  - `block`
    - `text`: text, který se na bloku zobrazí. Znakem `%` označíte části, které se vygenerují z argumentů (**arguments**).
    - `arguments`: jednotlivé argumenty, které v textu nahradí znaky `%` prvkem typu `dropdown/number/variable/etc.`
  - `code`: kód, který se řádek po řádku přidá do `application_init`. Zápisem `{ARGUMENT_NAME}` označíte části, které se nahradí hodnotami z `arguments`.

- `handler`: blok, který představuje obsluhu událostí vašeho modulu. Lze do něj vkládat další bloky (rodičovský blok).

- `action`: sem přidáte všechny akce, které váš modul umí. Každá z nich bude samostatný blok v zadané kategorii.
  - `NAME_OF_THE_ACTION`: název bloku; musí být specifický pro daný modul.
    - `block`: funguje stejně jako v části `application_init`, blok se jen umístí do zadané kategorie.
    - `code`: kód se zapisuje také stejně.
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
