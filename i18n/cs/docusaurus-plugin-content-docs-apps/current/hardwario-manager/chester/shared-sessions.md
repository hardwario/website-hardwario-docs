---
slug: shared-sessions
title: Sdílení relace terminálu
description: "Sdílení terminálu zařízení CHESTER z aplikace HARDWARIO Manager odkazem a ID relace, nebo připojení k cizí relaci, aby kolega mohl zařízení ovládat na dálku."
---

# Sdílení relace terminálu {#share-a-terminal-session}

Sdílená relace zpřístupní konzoli připojeného zařízení CHESTER přes odkaz, takže
kolega (například podpora HARDWARIO) může ve svém prohlížeči nebo telefonu
sledovat výstup a spouštět příkazy, zatímco zařízení máte u sebe vy. Relace běží
přes relay HARDWARIO Terminal na adrese `terminal.hardwario.com`, takže obě
strany potřebují připojení k internetu.

:::danger Kdo má odkaz, ovládá zařízení
Sdílená relace **nemá heslo**. Kdokoli otevře odkaz nebo zadá ID relace, může
připojené zařízení CHESTER **sledovat i ovládat**. Sdílejte ji jen s lidmi,
kterým důvěřujete, a sdílení ukončete, jakmile skončíte.
:::

---

## Sdílení vlastní relace {#share-your-session}

1. Připojte se k zařízení CHESTER a otevřete [**Terminál**](./terminal.md).
2. Klepněte na tlačítko v horní liště, **Sdílet tuto relaci**.
3. Otevře se panel s výše uvedeným varováním, **ID relace** (číslo s nejvýš šesti
   číslicemi) a odkazem, spolu s aktuálním stavem: **Připojování…**,
   **Čeká se na diváky**, nebo počet diváků, například **1 divák**.
4. Odkaz pošlete tlačítkem **Kopírovat odkaz** nebo **Sdílet**, případně
   nadiktujte ID relace.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-share-session.png" alt="Panel sdílení nad terminálem: varování, že kdokoli s odkazem může CHESTER vidět a ovládat, ID relace se stavem Čeká se na diváky, odkaz a tlačítka Kopírovat odkaz a Sdílet" width="320" />

Dokud relace běží, ukazuje tlačítko v horní liště jinou ikonu a jeho popisek se
změní na **Relace sdílena – klepnutím zobrazíte odkaz**; klepnutím panel znovu
otevřete. Řádek nad konzolí stav zopakuje, například
**Sdíleno · Čeká se na diváky**, takže vidíte, že se může někdo dívat.

**Ukončit sdílení** dole v panelu relaci ukončí. Relace skončí i tehdy, když
obrazovku Terminál opustíte.

---

## Připojení k cizí relaci {#join-someone-elses-session}

K připojení nepotřebujete vlastní zařízení.

1. Otevřete **HARDWARIO Manager → CHESTER**.
2. Na obrazovce **Připojit k CHESTER** zvolte **Připojit se ke sdílené relaci**.
3. Zadejte číselné **ID relace**, které vám hostitel dal, a zvolte **Připojit**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-join-session.png" alt="Obrazovka Připojit se k relaci s pokyny, polem ID relace, tlačítkem Připojit a adresou relay pod nimi" width="320" />

Obrazovka uvádí relay, přes který relace běží, **Relay:**
`https://terminal.hardwario.com`, takže ještě před připojením víte, kudy provoz
konzole poteče. Připojit se tu můžete i k relaci sdílené z HARDWARIO Terminal
v prohlížeči.

Po připojení obrazovka ukazuje výstup konzole hostitele a vstupní pole pro
spouštění příkazů na jeho zařízení, **Spustit příkaz na hostiteli**. Stavový
řádek říká, co hostitel dělá: **Hostitel připojen**, **Hostitel připojuje
zařízení…** nebo **Čekání, až hostitel připojí zařízení…**, a vedle něj je ID
relace.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-session-viewer.png" alt="Připojená relace: stav Hostitel připojen s ID relace, výstup konzole hostitele a dole pole Spustit příkaz na hostiteli, v horní liště Opustit" width="320" />

**Opustit** v horní liště ukončí relaci na vaší straně. Pokud hostitel sdílení
ukončí, stavový řádek se změní na **Relace ukončena**, upozornění oznámí
**Hostitel ukončil sdílení této relace.** a vstupní pole se zablokuje.

---

## Co se přes odkaz přenáší {#what-travels-over-the-link}

Relace přenáší konzoli: odeslané příkazy a vrácený výstup. Cokoli byste viděli
v terminálu, uvidí i divák, včetně hodnot vypsaných příkazem `config show`.
Myslete na to, než budete sdílet relaci zařízení, které obsahuje produkční klíče.
