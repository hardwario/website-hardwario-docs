---
slug: shared-sessions
title: Sdílení relace terminálu
---

# Sdílení relace terminálu {#share-a-terminal-session}

Sdílená relace zpřístupní přes odkaz konzoli zařízení CHESTER, ke kterému jste
připojeni. Kolega (třeba podpora HARDWARIO) pak vidí výstup a může zadávat
příkazy ze svého prohlížeče nebo telefonu, zatímco zařízení máte u sebe vy.

:::danger Kdo má odkaz, ovládá zařízení
Sdílená relace **nemá heslo**. Kdo odkaz otevře, může připojené zařízení CHESTER
**sledovat i ovládat**. Odkaz sdílejte jen s lidmi, kterým důvěřujete, a jakmile
skončíte, sdílení ukončete.
:::

---

## Sdílení vlastní relace {#share-your-session}

1. Připojte se k zařízení CHESTER a otevřete [**Terminál**](./terminal.md).
2. Použijte akci sdílení v horní liště.
3. Panel zobrazí číselné **Session ID**, odkaz a aktuální stav:
   *Connecting…*, *Waiting for viewers* nebo počet připojených diváků.
4. Odkaz pošlete přes **Copy link** nebo **Share**.

Dokud relace běží, má ikona sdílení jinou barvu, aby bylo jasné, že je zařízení
zpřístupněné.

**Stop sharing** relaci ukončí. Ukončí se také, když opustíte obrazovku terminálu.

---

## Připojení k cizí relaci {#join-someone-elses-session}

K připojení nepotřebujete vlastní zařízení.

1. Otevřete **HARDWARIO Manager → CHESTER**.
2. V průvodci nastavením zvolte **Join a shared session**.
3. Zadejte číselné **Session ID**, které vám poslal hostitel, a zvolte **Join**.

<img src="/img/hw-manager/hw-manager-chester-join-session.png" alt="Obrazovka Join session s polem Session ID, tlačítkem Join a pod nimi adresou přenosového serveru" width="320" />

Na obrazovce je uvedený přenosový server (**relay**), přes který relace běží, takže
ještě před připojením vidíte, kudy provoz konzole půjde.

Divák vidí výstup konzole hostitele a má vstupní pole pro spouštění příkazů na
jeho zařízení. Stavový řádek ukazuje, co hostitel dělá: jestli je připojený,
teprve připojuje zařízení, nebo zatím neposlal žádný výstup.

**Leave** vás od relace odpojí. Pokud hostitel sdílení ukončí, zobrazí se o tom
upozornění a vstupní pole se zablokuje.

---

## Co se přes odkaz přenáší {#what-travels-over-the-link}

Relace přenáší konzoli: odeslané příkazy a vrácený výstup. Cokoli byste viděli
v terminálu, vidí i divák, včetně hodnot vypsaných příkazem `config show`. Mějte
to na paměti, než budete sdílet relaci se zařízením, které má produkční klíče.
