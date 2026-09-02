---
slug: email-notification
title: E-mailové notifikace
description: "V tomto návodu postavíme vlastní Rule Chain, která sleduje telemetrii (teplotu a vlhkost) z konkrétních zařízení (například „Knihovna\" a „Archiv\"). Když hodnoty překročí předem daný prah, systém vyvolá e-mailovou notifikaci."
---
import Image from '@theme/IdealImage';

# Nastavení e-mailových notifikací {#setting-up-email-notifications}

## Přehled příkladu {#example-overview}
V tomto návodu postavíme vlastní Rule Chain, která sleduje telemetrii (teplotu a vlhkost) z konkrétních zařízení (například „Knihovna" a „Archiv"). Když hodnoty překročí předem daný prah, systém vyvolá e-mailovou notifikaci. 

Vytáhneme také „Label" přiřazený zařízení, abychom ho použili v textu e-mailu, a skriptem převedeme výchozí unixový timestamp na čitelný středoevropský čas (CET). 

Takhle bude výsledná notifikační Rule Chain vypadat:

![Notifikační Rule Chain: labely a filtr zařízení vedou do čtyř prahových skriptů, každý staví Email Info pro jeden uzel Send Email](../../../../../apps/thingsboard/images/email-notification-1.png)

---

## Předpoklady {#prerequisites}
Než začnete, ujistěte se, že má vaše instance ThingsBoardu nastavený odchozí SMTP server. Přejděte na **Settings** -> **Outgoing Mail** a zadejte přihlašovací údaje k SMTP. Tlačítkem „Send Test Mail" si ověříte, že to funguje.

---

## Návod krok za krokem {#step-by-step-guide}

### Krok 1: Enrichment: Originator Fields (přidání labelů) {#step-1-enrichment-originator-fields-adding-labels}
ThingsBoard ve výchozím stavu „Label" zařízení do metadat rule enginu nepředává. Musíme si ho nejdřív načíst, abychom ho mohli použít ve skriptech a e-mailech.
* **Typ uzlu:** `Enrichment` -> `originator fields`
* **Název:** Adding Labels
* **Konfigurace:** Klikněte na „Add mapping".  
  * Source field: `Label`  
  * Target key: `deviceLabel`  
  * Add mapped originator fields to: `Metadata`

### Krok 2: Filter: Script (filtr zařízení) {#step-2-filter-script-device-filter}
Chceme zpracovávat výstrahy jen pro konkrétní zařízení podle jejich labelů.
* **Typ uzlu:** `Filter` -> `script`
* **Název:** Device Filter
* **Jazyk:** Přepněte z TBEL na **`JavaScript`**
* **Kód:**

```javascript
var deviceLabel = metadata.deviceLabel;
// Replace the numbers/strings with your actual device labels or IDs
return deviceLabel === '2159020251' || deviceLabel === '2159020252';
```

* **Spojení:** Spojte uzel Adding Labels s tímto uzlem linkou Success.

### Krok 3: Transformation: Script (formátování dat) {#step-3-transformation-script-formatting-data}
Klíče telemetrie často obsahují tečky (například hygrometer.temperature.avg), což může rozbít výchozí šablonování e-mailů. Výchozí timestamp je navíc v unixových milisekundách (UTC). Tento skript hodnoty bezpečně vytáhne a čas naformátuje do čitelné podoby (přidá 1 hodinu pro CET).

* **Typ uzlu:** `Transformation` -> `script`
* **Název:** Temperature & Humidity Formatting
* **Jazyk:** Přepněte z TBEL na **`JavaScript`**
* **Kód:**

<details>
<summary><b>Zobrazit skript</b></summary>
<p>

```javascript
// Initialize default values to prevent "is not defined" errors in email templates
metadata.formattedTemperature = "N/A";
metadata.formattedHumidity = "N/A";

// Get Temperature
var temp = msg['hygrometer.temperature.avg'];
if (temp != null) {
    metadata.formattedTemperature = temp; 
}

// Get Humidity
var hum = msg['hygrometer.humidity.avg'];
if (hum != null) {
    metadata.formattedHumidity = hum;
}

// Get Timestamp and convert to Date object
var date = metadata.ts ? new Date(Number(metadata.ts)) : new Date();

// Shift time from UTC to local time (+1 hour for CET)
date.setHours(date.getHours() + 1);

// Format to DD.MM.YYYY HH:MM:SS
var pad = function(n) { return n < 10 ? '0' + n : n; };
var day = pad(date.getDate());
var month = pad(date.getMonth() + 1);
var year = date.getFullYear();
var hours = pad(date.getHours());
var minutes = pad(date.getMinutes());
var seconds = pad(date.getSeconds());

metadata.formattedTime = day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds;
return {msg: msg, metadata: metadata, msgType: msgType};
```

</p>
</details>

* **Spojení:** Spojte uzel Device Filter s tímto uzlem linkou True.

### Krok 4: Filter: Script (prahové filtry) {#step-4-filter-script-threshold-filters}
Teď tok rozdělíme podle konkrétních podmínek. Pro každou podmínku vytvořte filtr. Například kontrola nízké teploty:

* **Typ uzlu:** `Filter` -> `script`
* **Název:** Temperature < 17
* **Jazyk:** **`JavaScript`**
* **Kód:**
```javascript
return msg['hygrometer.temperature.avg'] < 17;
```
*(Tento krok zopakujte a vytvořte paralelní filtry pro další prahy, například Temperature > 20, Humidity < 27, Humidity > 58.)*

* **Spojení:** Spojte uzel Temperature & Humidity Formatting se všemi svými prahovými filtry linkami Success.

### Krok 5: Transformation: To Email (Email Info) {#step-5-transformation-to-email-email-info}
Tento uzel skládá samotný předmět a tělo e-mailu. Můžete si vybrat, jestli poslat jednoduchý e-mail v čistém textu, nebo formátovaný HTML e-mail. Vytvořte jeden pro každý prahový filtr.

* **Typ uzlu:** `Transformation` -> `to email`
* **Název:** Email Info
* **From:** `"System Alert" <dashboards@hardwario.com>`
* **To:** `your.email@example.com` *(Poznámka: E-mailovou adresu napište jako čistý text, u statické adresy NEPOUŽÍVEJTE proměnné `${}`.)*
* **Subject:** `Alert: Device ${deviceName} - Low Temperature`

**Varianta A: e-mail v čistém textu**
Pokud chcete jednoduchý e-mail bez zvláštního formátování, zvolte Plain Text. Zalomení řádků (stisk Enteru) bude fungovat přirozeně.
* **Mail body type:** Zvolte `Plain Text` (nebo podle verze ThingsBoardu odškrtněte volbu HTML)
* **Body:**
```text
Hello, measured values in your facility have exceeded the defined limits:

Facility: ${deviceName}
Device: ${deviceLabel}
Sensor: Temperature
Value: ${formattedTemperature} °C
Measurement Time: ${formattedTime}

Your HARDWARIO IoT Team
```

**Varianta B: HTML e-mail**
Pokud chcete formátovat, zvolte HTML. Pozor, v HTML se běžná zalomení řádků ignorují, takže nový řádek musíte vytvořit tagem `<br>`. Můžete použít i tagy jako `<b>text</b>` pro **tučný** text nebo `<i>text</i>` pro *kurzivu*.
* **Mail body type:** Zvolte `HTML`
* **Body:**
```html
Hello, measured values in your facility have exceeded the defined limits:<br><br>

Facility: <b>${deviceName}</b><br>
Device: <i>${deviceLabel}</i><br>
Sensor: Temperature<br>
Value: <b>${formattedTemperature} °C</b><br>
Measurement Time: ${formattedTime}<br><br>

Your HARDWARIO IoT Team
```

*(U uzlů pro vlhkost text upravte: „Temperature" změňte na „Humidity" a proměnnou na `${formattedHumidity}` %.)*

* **Spojení:** Spojte příslušný prahový filtr (například Temperature < 17) s tímto uzlem linkou True.

### Krok 6: Action: Send Email {#step-6-action-send-email}
Tohle je poslední výkonný uzel, který komunikuje s vaším SMTP serverem a složené e-maily odesílá.

* **Typ uzlu:** `Action` -> `send email`
* **Název:** Send Email
* **Konfigurace:** Nechte výchozí (použije systémové nastavení SMTP).
* **Spojení:** Spojte všechny své uzly Email Info s tímto jediným uzlem Send Email linkami Success.

### Krok 7: Napojení na Root Rule Chain {#step-7-connecting-to-the-root-rule-chain}
Vaše vlastní notifikační Rule Chain je hotová, ale ThingsBoard neví, že do ní má příchozí telemetrii směrovat. Musíme ji napojit uvnitř hlavní Root Rule Chain.

1. Přejděte na **Rule Chains** a otevřete svou **Root Rule Chain** (výchozí řetězec, který obsluhuje všechny příchozí zprávy).
2. Najděte uzel **Message Type Switch**.
3. Sledujte linku **Post telemetry** vycházející z tohoto uzlu. Měla by vést k uzlu **Save Timeseries**.
4. V levém menu najděte uzel **Rule Chain** (v kategorii Rule Chains) a přetáhněte ho na plochu.
5. V nastavení uzlu zvolte novou Rule Chain, kterou jste právě vytvořili (například „EMAIL - Notifications").
6. Tažením vytvořte spojení z uzlu **Save Timeseries** do svého nově přidaného uzlu Rule Chain.
7. Jako popisek linky zvolte **Success**.
8. Klikněte na tlačítko **Apply changes** (fajfka v pravém dolním rohu).

Takhle by spojení v Root Rule Chain mělo vypadat:
*(Data teď úspěšně potečou ze zařízení, uloží se do databáze a půjdou dál do vašeho vlastního řetězce e-mailových notifikací!)*

![Detail Root Rule Chain: uzel Save Timeseries spojený linkou Success s uzlem rule chain pro e-mailové notifikace](../../../../../apps/thingsboard/images/email-notification-2.png)

## Omezení frekvence e-mailů {#limiting-email-frequency}

Pokud zařízení posílá data překračující prah nepřetržitě (například každých 15 minut), posílalo by výše popsané nastavení e-mail každých 15 minut. Abychom zabránili zaplavení e-maily, můžeme zavést mechanismus, který si zapíše čas posledního odeslaného e-mailu a další e-maily blokuje, dokud neuplyne daný interval (například 24 hodin).

Znamená to upravit Rule Chain tak, aby čítala serverový atribut (`lastEmailTime`), zkontrolovala, jestli uplynul dostatek času, a po odeslání e-mailu tento atribut aktualizovala novým timestampem.

Takhle vypadá upravený tok:

![Upravená Rule Chain: Get Last Email Time vede do prahových filtrů; každá větev True navíc ukládá atribut s časem posledního e-mailu](../../../../../apps/thingsboard/images/email-notification-3.png)

### Krok 1: Přečtěte čas posledního e-mailu {#step-1-read-the-last-email-time}
Na úplný začátek toku (před prahové filtry) přidejte uzel, který načte timestamp posledního odeslaného e-mailu.
* **Typ uzlu:** `Enrichment` -> `originator attributes`
* **Název:** Get Last Email Time
* **Server attributes:** Přidejte `lastEmailTime`
* **Spojení:** Spojte tento uzel se začátkem svých prahových filtrů (například místo spojení z předchozích formátovacích uzlů).

### Krok 2: Upravte prahové filtry, aby kontrolovaly čas {#step-2-modify-the-threshold-filters-to-check-the-time}
Upravte své existující skripty prahových filtrů (například `Temperature < 17`) tak, aby kromě telemetrické hodnoty kontrolovaly i to, jestli od `lastEmailTime` uplynula požadovaná prodleva.
* **Typ uzlu:** `Filter` -> `script`
* **Ukázka kódu (kontrola 24hodinové prodlevy = 86400000 milisekund):**

<details>
<summary><b>Zobrazit ukázku skriptu</b></summary>
<p>

```javascript
var currentTime = new Date().getTime();
var lastEmailTime = metadata.ss_lastEmailTime ? Number(metadata.ss_lastEmailTime) : 0;
var delayMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Check if the value exceeds the threshold AND the delay has passed
if (msg['hygrometer.temperature.avg'] < 17) {
    if (currentTime - lastEmailTime >= delayMs) {
        return true; // Send email
    }
}
return false; // Do not send email
```

</p>
</details>

*(Tuto logiku použijte u všech svých prahových filtrů.)*

### Krok 3: Připravte nový timestamp {#step-3-prepare-the-new-timestamp}
Pokud filtr propustí zprávu (e-mail se má poslat), musíme vytvořit novou zprávu, která aktuální čas uloží zpět do serverových atributů zařízení. Tok proto musíme rozvětvit do dvou směrů: jeden odešle e-mail, druhý aktualizuje atribut.
* **Typ uzlu:** `Transformation` -> `script`
* **Název:** Prepare Timestamp - [název podmínky] (například Prepare Timestamp - Temp < 17)
* **Kód:**

```javascript
// Create a new message containing the current timestamp
var newMsg = {
    "lastEmailTime": new Date().getTime()
};
return {msg: newMsg, metadata: metadata, msgType: 'POST_ATTRIBUTES_REQUEST'};
```

* **Spojení:** Spojte konkrétní prahový filtr (například `Temperature < 17`) s tímto uzlem linkou **True**.

### Krok 4: Uložte nový timestamp {#step-4-save-the-new-timestamp}
Nakonec akčním uzlem uložte nový timestamp jako serverový atribut, aby se dal přečíst při další aktualizaci telemetrie.
* **Typ uzlu:** `Action` -> `save attributes`
* **Název:** Save Last Email Time
* **Scope:** Server attributes
* **Spojení:** Spojte uzel „Prepare Timestamp" s tímto uzlem linkou **Success**.
