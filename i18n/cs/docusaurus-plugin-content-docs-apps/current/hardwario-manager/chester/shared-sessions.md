---
slug: shared-sessions
title: Sdílení terminálové session
description: "Sdílená session zpřístupní konzoli zařízení CHESTER, ke kterému jste připojení,"
---

# Sdílení terminálové session {#share-a-terminal-session}

Sdílená session zpřístupní konzoli zařízení CHESTER, ke kterému jste připojení,
na odkazu, takže kolega — třeba podpora HARDWARIO — vidí výstup a může zadávat
příkazy ze svého prohlížeče nebo telefonu, zatímco zařízení držíte vy.

:::danger Kdokoli s odkazem zařízení ovládá
Sdílená session **nemá heslo**. Kdokoli odkaz otevře, může připojené zařízení
CHESTER **vidět i ovládat**. Sdílejte ho jen s lidmi, kterým věříte, a jakmile
skončíte, sdílení ukončete.
:::

---

## Nasdílení vaší session {#share-your-session}

1. Připojte se k zařízení CHESTER a otevřete [**Terminál**](./terminal.md).
2. Použijte akci sdílení v horní liště.
3. Panel zobrazí číselné **Session ID** a odkaz, spolu s živým stavem:
   *Connecting…*, *Waiting for viewers* nebo počtem připojených diváků.
4. Odkaz pošlete přes **Copy link** nebo **Share**.

Dokud session běží, ikona sdílení mění barvu, takže je jasně vidět, že je zařízení
zpřístupněné.

**Stop sharing** session ukončí. Opuštění obrazovky Terminálu ji ukončí také.

---

## Připojení do cizí session {#join-someone-elses-session}

K připojení nepotřebujete vlastní zařízení.

1. Otevřete **HARDWARIO Manager → CHESTER**.
2. V průvodci nastavením zvolte **Join a shared session**.
3. Zadejte číselné **Session ID**, které vám hostitel dal, a zvolte **Join**.

<img src="/img/hw-manager/hw-manager-chester-join-session.png" alt="Obrazovka Join session s polem Session ID, tlačítkem Join a adresou relay pod ním" width="320" />

Obrazovka pojmenuje **relay**, přes který session běží, takže ještě před
připojením vidíte, kudy provoz konzole jde.

Divák vidí výstup konzole hostitele a má vstupní pole pro spouštění příkazů na
jeho zařízení. Stavový řádek říká, co hostitel dělá — jestli je připojený, ještě
připojuje zařízení, nebo zatím neposlal žádný výstup.

**Leave** ukončí vaši stranu. Pokud hostitel sdílení zastaví, oznámí to pásek
a vstupní pole se zablokuje.

---

## Co odkazem putuje {#what-travels-over-the-link}

Session přenáší konzoli: odeslané příkazy a vrácený výstup. Cokoli byste viděli
v terminálu, vidí i divák — včetně hodnot vypsaných příkazem `config show`. Mějte
to na paměti, než nasdílíte session na zařízení s produkčními klíči.
