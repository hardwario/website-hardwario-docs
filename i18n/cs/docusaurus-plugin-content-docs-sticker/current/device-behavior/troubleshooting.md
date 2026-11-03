---
slug: troubleshooting
title: Řešení problémů
description: Časté problémy se zařízením STICKER, jejich obvyklé příčiny a co s nimi dělat.
---
import LedPattern from '@site/src/components/LedPattern';

# Řešení problémů {#troubleshooting}

Začněte tím, co vidíte. Každá odpověď uvádí obvyklou příčinu i řešení a odkazuje na stránku s podrobnostmi.

## Připojení a data {#connection-and-data}

### Po vložení baterií zařízení nic neposílá {#the-device-sends-nothing-after-you-insert-the-batteries}

Po skončení startovní sekvence sledujte LED ještě 10 s.

- <LedPattern pattern="yellow" /> **Jedno krátké žluté bliknutí každé 3 s:** rádio je vypnuté. Zařízení měří, ale nic neposílá. V aplikaci HARDWARIO Manager rádio zapněte a nastavení uložte. Zařízení se restartuje a připojí k síti.
- <LedPattern pattern="yellow red" /> **Žluté a červené bliknutí každé 3 s:** zařízení se snaží připojit k síti, ale nedostává odpověď. Zkontrolujte, že je zařízení na síťovém serveru zaregistrované se správnými klíči a regionem, že je v dosahu brána a že v regionech US915 a AU915 brána přijímá na stejném sub-bandu jako zařízení (`lrw-sub-band`, výchozí 2). Pokusy o připojení postupně řídnou až na jeden za hodinu, proto zařízení po opravě restartujte, aby se připojilo hned.
- **LED vůbec nesvítí:** baterie jsou vybité nebo obráceně vložené, případně byly při startu už tak slabé, že se zařízení samo vypnulo. Vložte nové baterie.

Podrobnosti: [**Start a inicializace**](startup.md), [**Připojení k síti**](network-connection.md).

### Startovní sekvence se zhruba každou minutu opakuje {#the-boot-sequence-repeats-about-once-a-minute}

Některá část zařízení se nespustila. Zařízení se proto každých 60 s restartuje a nic neposílá. Pošlete ho do servisu.

### Data chvíli chodila a pak přestala {#data-arrived-for-a-while-and-then-stopped}

Zařízení nejspíš ztratilo rádiové spojení. Pozná to při pravidelných kontrolách spojení, přejde do stavu **Slabý signál** (<LedPattern pattern="yellow yellow" />) a zkusí odolnější přenosovou rychlost. Když to nepomůže, zařízení s OTAA se připojí k síti znovu, asi 4–5 h po ztrátě spojení; zařízení s ABP zůstane ve stavu Slabý signál. Nejdřív zkontrolujte bránu a její připojení k internetu. Hodnoty naměřené v době, kdy zařízení nebylo v síti, se později samy neodešlou. Pokud je zapnutá historie senzorů, můžete je dodatečně vyčíst.

Podrobnosti: [**Připojení k síti**](network-connection.md), [**Historie a čítače**](history-and-counters.md).

### Síťový server odmítá žádosti o připojení {#the-network-server-rejects-the-join-requests}

Po obnovení továrního nastavení nebo po vendor resetu začne zařízení počítat žádosti o připojení znovu od nuly. Síťový server, který si pamatuje už přijaté hodnoty, pak připojení odmítne. Na síťovém serveru proto vymažte hodnoty čítače žádostí o připojení (nonce), které si pro zařízení uložil. Oba resety navíc smažou síťové klíče, takže je nejdřív do zařízení znovu zapište.

### Funguje zařízení STICKER i v privátní síti LoRaWAN? {#can-sticker-use-a-private-lorawan-network}

Ano, funguje s jakýmkoli síťovým serverem LoRaWAN 1.0.x, včetně vlastního serveru ChirpStack. Nastavení **privátní síť** (`lrw-network`) mění jen synchronizační slovo (sync word), tedy rádiovou značku, kterou brány očekávají. Většina bran používá veřejné synchronizační slovo, proto ponechte výchozí nastavení, pokud nemáte brány nastavené jako privátní.

### Dá se interval hlášení nastavit na jednu minutu? {#can-the-report-interval-be-one-minute}

Ano, nejkratší interval hlášení je 60 s. Výdrž baterií se ale zkrátí a v pásmu EU868 smí rádio vysílat jen omezenou dobu za hodinu. Daleko od brány proto zařízení může některá hlášení odeslat se zpožděním nebo je vynechat.

## Baterie {#battery}

### Jednomu zařízení se baterie vybíjejí mnohem rychleji než ostatním {#one-device-drains-its-batteries-much-faster-than-others}

Porovnejte ho se zařízením, které funguje správně:

1. **Stav rádia:** zařízení, které se pořád znovu připojuje nebo je ve stavu Slabý signál, vysílá mnohem víc.
2. **Vzdálenost od brány:** vzdálené zařízení vysílá nízkou přenosovou rychlostí a každé hlášení ho pak stojí mnohonásobně víc energie.
3. **Interval hlášení a měření:** kratší intervaly znamenají častější měření a vysílání.
4. **Hardwarová varianta:** varianty s Hallovými spínači odebírají trvale větší proud.

Pokud nic z toho rozdíl nevysvětlí, pošlete zařízení do servisu.

Podrobnosti: [**Baterie a napájení**](battery.md).

## Nastavení a příkazy {#settings-and-commands}

### Změna nastavení se neprojevila {#a-changed-setting-did-not-take-effect}

Většina nastavení začne platit až po uložení, při kterém se zařízení restartuje. Výjimkou jsou pravidla alarmů: platí hned, ale když je neuložíte, při dalším restartu se ztratí. Síťová nastavení včetně režimu rádia změníte jen přes NFC, downlinkem nikdy.

Podrobnosti: [**Konfigurace**](configuration.md).

### Zařízení odpovídá na downlink chybou {#a-downlink-is-answered-with-an-error}

Odpověď nese chybový kód, který udává důvod, například nastavení, které přes rádio změnit nelze, nebo hodnotu mimo povolený rozsah. Tabulku chybových kódů najdete na stránce [**Zpracování downlinků**](downlinks.md).

### Telefon zařízení přes NFC nenačte {#the-phone-cannot-read-the-device-over-nfc}

Zařízení musí mít funkční baterie. Držte telefon u zařízení po celou dobu přenosu dat a používejte nejnovější verzi aplikace HARDWARIO Manager.

## Hodnoty senzorů {#sensor-values}

### V dekódovaných datech je `null` {#the-decoded-data-shows-null}

Senzor je zapnutý, ale nemá platnou hodnotu: sonda je odpojená nebo senzor selhal. Pokud hodnota v datech úplně chybí, je tento senzor v nastavení vypnutý.

### Po výměně sondy 1-Wire chybí hodnoty {#a-replaced-1-wire-probe-shows-no-values}

Zařízení novou sondu nikdy samo nezařadí na místo té staré. Postupujte podle návodu na výměnu sondy na stránce [**Sondy 1-Wire**](one-wire.md).

### Čítače se vynulovaly {#counters-went-back-to-zero}

Počty pohybů ze senzoru PIR a z akcelerometru začínají po každém restartu od nuly. Čítače Hallových spínačů a vstupů vydrží restart i výměnu baterií. Vynuluje je jen reset čítačů, obnovení továrního nastavení nebo vendor reset.

Podrobnosti: [**Historie a čítače**](history-and-counters.md).

### Chybí alarmový report {#an-alarm-report-is-missing}

Alarmové reporty se ve výchozím nastavení neopakují, takže když se uplink ztratí, report už nedorazí. Stav alarmů ale nese každá telemetrie. Pokud potřebujete každý report, zapněte potvrzované alarmy a zkontrolujte, že jsou pravidla alarmů uložená.

Podrobnosti: [**Alarmy**](alarms.md).

## Čas a verze firmwaru {#time-and-version}

### Záznamy v historii nemají čas {#history-records-have-no-time}

Po vyjmutí baterií se hodiny zastaví a znovu se nastaví ze sítě až při dalším připojení. Záznamy pořízené mezitím dostanou čas dodatečně, jakmile se hodiny nastaví. Pokud zařízení po některém startu čas vůbec nezíská, zůstanou záznamy z této doby bez času.

### Jak zjistím verzi firmwaru? {#which-firmware-version-runs-on-the-device}

Verzi obsahuje uplink Info a aplikace HARDWARIO Manager ji ukazuje v informacích o zařízení. Podrobnosti najdete na stránce [**Verze a aktualizace firmwaru**](firmware.md).
