---
slug: connect
title: Připojení a párování
description: "Spárování zařízení CHESTER v aplikaci HARDWARIO Manager přes QR kód na štítku s passkey nebo hledáním v okolí a opětovné připojení z nedávných zařízení."
---

# Připojení k zařízení CHESTER {#connect-to-a-chester}

Otevřete **HARDWARIO Manager → CHESTER**. Pokud není nic připojené, zobrazí
aplikace obrazovku **Připojit k CHESTER**. Plochu zaplní zařízení, ke kterým jste
se už připojili, a tři tlačítka dole nabízejí cesty k novému zařízení:
**Naskenovat QR kód zařízení**, **Vyhledat zařízení v okolí** a **Připojit se ke
sdílené relaci**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-connect.png" alt="Obrazovka Připojit k CHESTER s jedním zařízením v seznamu Nedávná zařízení a tlačítky Naskenovat QR kód zařízení, Vyhledat zařízení v okolí a Připojit se ke sdílené relaci dole" width="320" />

---

## Naskenování QR kódu zařízení – běžný postup {#scan-the-device-qr--the-usual-path}

QR kód na štítku zařízení CHESTER zařízení identifikuje **a** aplikace podle něj
dohledá jeho passkey pro Bluetooth, takže při párování nemusíte nic psát.

1. Zvolte **Naskenovat QR kód zařízení**.
2. Pokud aplikace požádá o přístup ke kameře, povolte ho a namiřte kameru na QR
   kód na štítku zařízení CHESTER.
3. Pokud aplikace požádá o Bluetooth, povolte ho. Aplikace dohledá passkey,
   najde zařízení a spáruje se s ním.

Mezitím obrazovka ukazuje **Připojování k CHESTER…**. Jakmile je passkey známý,
objeví se upozornění:

> **Automatické párování**: Nemusíte nic psát. Pokud Android zobrazí výzvu
> k zadání kódu Bluetooth, je již vyplněná – stačí ji potvrdit.

Tlačítko v upozornění, **Kód** následovaný šesti číslicemi, passkey zkopíruje.
Aplikace ho do schránky vložila už sama, takže ho můžete vložit, kdyby o něj
telefon požádal.

QR kód je odkaz na stránku, která passkey zařízení zobrazuje, a aplikace si ho
z ní přečte. K tomu potřebuje připojení k internetu. Bez něj, nebo se starším
štítkem, na kterém je jen sériové číslo, se aplikace k zařízení připojí také,
ale o passkey vás požádá telefon.

Aplikace zařízení hledá 30 sekund. Když se neozve, obrazovka ohlásí
**Zařízení nenalezeno**, viz [**Řešení problémů**](./troubleshooting.md).

:::info Na iOS se passkey zadává ručně
Automatické párování je funkce Androidu. Na iOS zobrazí systém vlastní párovací
dialog a šestimístný passkey z upozornění zadáte sami.
:::

---

## Vyhledání zařízení v okolí {#scan-for-nearby-devices}

Pokud štítek nemáte po ruce, zvolte **Vyhledat zařízení v okolí**. Obrazovka
**Vyhledat CHESTER** začne hned hledat a vypisuje nalezená zařízení, u každého
název a sílu signálu v dBm.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-scan.png" alt="Vyhledat CHESTER se seznamem několika zařízení CHESTER v okolí podle sériového čísla, u každého síla signálu v dBm" width="320" />

Nahoře je zařízení s nejsilnějším signálem. Pořadí se při prohlížení nehýbe
a změní se, jen když se signál některého zařízení znatelně změní, třeba když
k němu přejdete. Zařízení, se kterým je telefon už spárovaný, ale které
nevysílá, je na konci seznamu jako **Žádný signál, nevysílá**.

Dlouhý seznam zúžíte pomocí **Filtrovat podle sériového čísla**. Vyhledávání
se samo zastaví asi po 30 sekundách; znovu ho spustíte tlačítkem **Vyhledat
znovu** nebo tlačítkem obnovení nahoře (**Znovu vyhledat**). Klepnutím na
zařízení se k němu připojíte. Obrazovka ukáže **Připojování… Zadejte kód
zařízení, pokud budete vyzváni.**

:::caution Bez QR kódu aplikace passkey nezná
U zařízení nalezeného tímto způsobem aplikace passkey nedohledá, takže vás o
šestimístný passkey požádá párovací dialog telefonu. Najdete ho přes QR štítek
zařízení: otevřete QR kód v libovolné aplikaci fotoaparátu a passkey se zobrazí
na stránce, která se otevře. Zařízení připojená tímto způsobem se navíc
nepřidávají do seznamu **Nedávná zařízení**.
:::

Pokud se nic neobjeví, zkontrolujte, že je zařízení CHESTER zapnuté a v dosahu, a
spusťte vyhledávání znovu.

---

## Nedávná zařízení {#recent-devices}

Každé zařízení, ke kterému se připojíte z obrazovky **Připojit k CHESTER**, ať
přes QR kód, nebo z tohoto seznamu, si aplikace zapamatuje. Až 20 takových
zařízení ukazuje v seznamu **Nedávná zařízení**, naposledy použité nahoře,
každé s textem **Klepnutím se znovu připojíte**. Ikonou koše (**Odebrat**)
zařízení ze seznamu odstraníte.

Připojení ze seznamu žádný QR kód neskenuje, takže se nedohledává ani passkey.
Spoléhá na spárování, které už telefon má. Pokud jste zařízení v nastavení
Bluetooth telefonu odebrali, připojte se znovu přes QR kód.

Ukládá se jen sériové číslo a název, žádné klíče ani tajné údaje.

---

## Připojení ke sdílené relaci {#join-a-shared-session}

**Připojit se ke sdílené relaci** se k zařízení nepřipojuje vůbec. Napojí se na
zařízení CHESTER, které kolega sdílí ze svého telefonu, takže můžete jeho konzoli
ovládat na dálku. Viz [**Sdílení relace terminálu**](./shared-sessions.md).

---

## Po připojení {#after-connecting}

Místo obrazovky **Připojit k CHESTER** se zobrazí menu CHESTER. Pokračujte
stránkou [**Informace o zařízení**](./device-info.md) nebo
[**Konfigurace**](./configuration.md).

Pokud připojení selže, obrazovka řekne, co se stalo a co dělat. Původní chybové
hlášení najdete po rozbalení **Technické podrobnosti**, i s tlačítkem pro
zkopírování. Tlačítkem **Zpět** se vrátíte k tlačítkům. Viz
[**Řešení problémů**](./troubleshooting.md).

Pokud odmítnete oprávnění ke kameře nebo k Bluetooth, obrazovka oznámí, že
oprávnění chybí, a nabídne **Zkusit znovu**. Jakmile se telefon přestane ptát,
nabídne místo toho **Otevřít nastavení**.
