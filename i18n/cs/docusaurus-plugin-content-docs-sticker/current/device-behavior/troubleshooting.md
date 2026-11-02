---
slug: troubleshooting
title: Řešení problémů
description: Potíže, na které podpora a zákazníci u zařízení STICKER narážejí, co je obvykle způsobuje a jak je vyřešit.
---

# Řešení problémů {#troubleshooting}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Začněte tím, co pozorujete. Každá odpověď uvádí obvyklé příčiny, podle čeho je od sebe rozlišíte a co dělat, a odkazuje na stránku, která chování podrobně vysvětluje. Na většinu otázek odpovědí dva zdroje: stavová LED, která blikne každé 3 s, a uplink **Info**, který zařízení posílá po každém připojení k síti a každých 24 h.

## Připojení a data {#connection-and-data}

### Po vložení baterií zařízení nic neposílá {#the-device-sends-nothing-after-you-insert-the-batteries}

Po skončení startovní sekvence (červená, žlutá a zelená) sledujte 10 s stavovou LED.

- **Jedno velmi krátké žluté bliknutí každé 3 s:** rádio je vypnuté. Výchozí hodnota firmwaru je `radio-mode off`, takže kus, který nikdo nenastavil pro síť, dál měří, ale nevysílá. V aplikaci HARDWARIO Manager nastavte přes NFC `radio-mode` na `lorawan` (nebo `p2p`) a uložte; zařízení se restartuje a připojí. Kusy nastavené výrobní šablonou už mají `lorawan` **[ověřit]**.
- **Krátké žluté a červené bliknutí každé 3 s:** zařízení se snaží připojit, ale nedostává odpověď. Na síťovém serveru zkontrolujte, že zařízení existuje se správnými DevEUI, JoinEUI a AppKey a se správným regionem (u US915 nebo AU915 také se subpásmem nastaveným v `lrw-sub-band`, výchozí je 2) a že je v dosahu brána. Pauza mezi pokusy o připojení se prodlužuje z 60 s až na 1 h, takže po opravě buď počkejte, nebo zařízení restartujte, aby se připojilo hned.
- **LED vůbec nesvítí:** baterie jsou vybité nebo špatně vložené, nebo bylo napětí baterie při startu pod 1,8 V a zařízení se samo vypnulo. Vložte nové baterie.

Podrobnosti: [**Start a inicializace**](startup.md), [**Připojení k síti**](network-connection.md).

### Startovní sekvence LED se zhruba každou minutu opakuje {#the-boot-light-sequence-repeats-about-once-a-minute}

Nepodařilo se spustit některou nezbytnou část zařízení, obvykle rádio. Zařízení pak 60 s počká a restartuje se. Mezi sekvencemi LED nesvítí, NFC se nespustí a nic se neodesílá. Pošlete zařízení do servisu. Pokud LED nesvítí vůbec, a to ani s novými bateriemi, nespustil se watchdog nebo LED. I takové zařízení potřebuje servis.

Podrobnosti: [**Start a inicializace**](startup.md).

### Data chvíli chodila a pak přestala {#data-arrived-for-a-while-and-then-stopped}

Zařízení nejspíš ztratilo rádiové spojení. Dokud je připojené, kontroluje spojení s každým 5. hlášením. Po 3 neúspěšných kontrolách přejde do stavu `WARNING` (dvě velmi krátká žlutá bliknutí každé 3 s), kontroluje spojení s každým hlášením a postupně přechází na odolnější datové rychlosti. S OTAA se připojí znovu, až mu nezbude žádný další stupeň; při výchozím nastavení (EU868, hlášení každých 900 s) to od ztráty spojení trvá asi 4–5 h. S ABP se zařízení znovu připojit nemůže a zůstane ve stavu `WARNING`, dokud některá kontrola znovu neprojde.

Co dělat:

- Nejdřív zkontrolujte bránu a její páteřní připojení; výpadek jedné brány zastaví všechna zařízení za ní.
- Pokud je zařízení od brány daleko, přemístěte bránu nebo zařízení a pak počkejte, až se zařízení znovu připojí, nebo ho restartujte.
- Hodnoty naměřené v době, kdy zařízení nebylo v síti, se později samy neodešlou. Pokud je zapnutá historie senzorů, načtěte chybějící úsek příkazem `req_history`, jakmile je zařízení zpět v síti.

Pokud data přestala chodit zhruba 2 h po instalaci nebo po odpojení programátoru J-Link, podívejte se na pole `debug` v posledním uplinku **Info**. Pokud je `true`, běží v zařízení obraz debug nebo provisioning, který po 2 h bez aktivity v shellu přejde do hlubokého spánku. Nahrajte místo něj obraz release.

Podrobnosti: [**Připojení k síti**](network-connection.md), [**Historie a čítače**](history-and-counters.md), [**Verze a aktualizace firmwaru**](firmware.md).

### Síťový server ukazuje opakované žádosti o připojení {#the-network-server-shows-repeated-join-requests}

Každá žádost o připojení (join request) znamená, že zařízení přišlo o relaci: při startu, po neúspěšném připojení, po vyčerpání kroků obnovy, když ze zařízení po dobu 4 × `interval-report` neodešel žádný telemetrický uplink, nebo po příkazu `lrw_join`. Opakovaná připojení obvykle ukazují na slabé pokrytí (kontroly spojení stále selhávají), nebo na síťový server, který na připojení neodpovídá (špatné klíče nebo region). Každý pokus o připojení stojí mnohem víc energie než hlášení odeslané při dobré datové rychlosti, takže zařízení, které se pořád znovu připojuje, vybíjí baterie rychleji.

Podrobnosti: [**Připojení k síti**](network-connection.md).

### Žádosti o připojení přicházejí, ale síťový server je odmítá {#join-requests-arrive-but-the-network-server-rejects-them}

Po `factory_reset`, `lrw_reset` nebo `vendor_reset` začíná čítač připojení (DevNonce) v zařízení znovu od nuly a síťový server LoRaWAN 1.0.4 odmítá každou hodnotu DevNonce, kterou od zařízení už jednou dostal. Na síťovém serveru vymažte hodnoty DevNonce, které má pro zařízení uložené. Po factory resetu také zkontrolujte, že jste přes NFC znovu zapsali AppKey a region, protože je reset smaže.

Podrobnosti: [**Připojení k síti**](network-connection.md).

### Funguje zařízení STICKER i v privátní síti LoRaWAN? {#can-sticker-work-with-a-private-lorawan-network}

Ano. Zařízení STICKER funguje s jakýmkoli síťovým serverem LoRaWAN 1.0.x, včetně vlastního serveru ChirpStack. Volba „privátní síť“ v nastavení zařízení (`lrw-network`) se týká jen synchronizačního slova rádia (sync word). Většina privátních síťových serverů používá brány s veřejným synchronizačním slovem, proto ponechte výchozí hodnotu `public`. Hodnotu `private` zvolte, jen když vaše brány používají privátní synchronizační slovo. Toto nastavení lze změnit přes NFC nebo shell, nikdy downlinkem.

Podrobnosti: [**Konfigurace**](configuration.md), [**Přehled konektivity**](../connectivity/index.md).

### Jde nastavit interval hlášení na jednu minutu? {#can-the-report-interval-be-one-minute}

Ano, `interval-report` přijímá 60–86400 s. Platí ale dvě omezení: krátký interval vybíjí baterie rychleji a v pásmu EU868 smí zařízení vysílat jen 36 s za hodinu. Při nejnižších datových rychlostech se hlášení každou minutu do tohoto limitu nevejde, takže hlášení čekají nebo se zahazují. Interval změníte v aplikaci HARDWARIO Manager nebo downlinkem `set_param` s následným uložením.

Podrobnosti: [**Zprávy a časování**](messages.md), [**Baterie a napájení**](battery.md).

## Baterie a napájení {#battery-and-power}

### Jedno zařízení vybíjí baterie mnohem rychleji než ostatní {#one-device-drains-its-batteries-much-faster-than-others}

Porovnejte takové zařízení se zařízením, které je v pořádku, a postupujte v tomto pořadí:

1. **Stav rádia:** zařízení, které se pořád připojuje (krátké žluté a červené bliknutí) nebo zůstává ve stavu `WARNING`, vysílá mnohem víc než připojené zařízení.
2. **Datová rychlost:** zařízení daleko od brány vysílá nízkou datovou rychlostí (s vysokým spreading factorem). Jedno hlášení při SF12 potřebuje mnohonásobně víc energie než hlášení při SF7: samotné vysílání spotřebuje zhruba 50krát větší náboj (asi 85 mC oproti 1,7 mC). Po každém uplinku navíc zařízení čeká na odpověď, což stojí dalších 8–11 mC, takže celé hlášení při SF12 spotřebuje zhruba 8krát víc než při SF7 **[ověřit]**. Datovou rychlost každého uplinku ukazuje síťový server.
3. **Interval hlášení:** zkontrolujte `interval-report` v uplinku settings-info.
4. **Interval vzorkování:** krátký `interval-sample` přidává další čtení senzorů; i ten najdete v uplinku settings-info.
5. **Hardwarová varianta:** Hallovy spínače odebírají proud nepřetržitě, takže varianty s nimi spotřebují víc energie.
6. **Obraz firmwaru:** obraz debug nebo provisioning (`debug: true` v uplinku **Info**) drží procesor vzhůru, takže zařízení odebírá mnohem větší proud než s obrazem release.
7. **Zapomenuté vybavení z testování:** programátor J-Link, který zůstal připojený, představuje trvalou zátěž.

Pokud nic z toho rozdíl nevysvětlí, pošlete zařízení do servisu.

Podrobnosti: [**Baterie a napájení**](battery.md).

### LED každé 3 s dvakrát blikne červeně a žlutě {#the-led-shows-a-red-and-yellow-double-flash-every-3-s}

Tento vzor znamená, že zařízení nedokázalo načíst uložené nastavení a běží na výchozích hodnotách z výroby **[ověřit]**. Přišlo tak o svou identitu v síti i o konfiguraci. Spolu s nimi mohl zmizet i klíč NFC, který má každé zařízení vlastní, a pak aplikace HARDWARIO Manager novou konfiguraci nezapíše **[ověřit]**. Zařízení jednou restartujte. Pokud se vzor vrátí, pošlete zařízení do servisu.

Podrobnosti: [**Start a inicializace**](startup.md).

## Nastavení a příkazy {#settings-and-commands}

### Změna nastavení se neprojevila {#i-changed-a-setting-but-nothing-happened}

Většina nastavení se při změně jen připraví. Platit začne až po uložení, které zařízení restartuje. Zkontrolujte, že:

- změna byla uložena (`save` v `set_param` nebo samostatný příkaz `settings_save`);
- nastavení jde měnit kanálem, který jste použili: nastavení LoRaWAN včetně `radio-mode` lze změnit jen přes NFC nebo shell, nikdy downlinkem;
- jste počkali na restart a nové připojení k síti. Uplink **settings-info** i odpověď na `get_settings` ukazují už i hodnotu, která je zatím jen připravená, proto ověřte, že se zařízení restartovalo: příští telemetrie má `boot: true` a **Info** malé `uptime_s`.

Výjimkou jsou pravidla alarmů: platí hned, ale pokud je neuložíte, při dalším restartu se ztratí.

Podrobnosti: [**Konfigurace**](configuration.md), [**Zpracování downlinků**](downlinks.md).

### Zařízení odpovídá na downlink chybou {#a-downlink-is-answered-with-an-error}

Odpověď na fPort 85 nese kód chyby a u odmítnutého pole také číslo `fault_field`, podle kterého pole poznáte.

| Chyba | Obvyklá příčina |
|---|---|
| `NOT_WRITABLE` | Příkaz se snaží změnit nastavení, které přes rádio měnit nejde, například klíč LoRaWAN nebo `radio-mode`. Zařízení odmítne celý příkaz. |
| `NOT_READY` | Příkaz není přes rádio povolený, ještě se odesílá jiná stránkovaná odpověď, nebo přišel `lrw_join` v době, kdy změny LoRaWAN nebyly uložené. |
| `OUT_OF_RANGE` | Hodnota nebo pravidlo alarmu je mimo povolený rozsah. |
| `BUDGET_TOO_SMALL` | Odpověď se při aktuální datové rychlosti nevejde. Zkuste to znovu, až zařízení bude vysílat vyšší datovou rychlostí. |
| `BAD_REQUEST` | Downlink nejde dekódovat, nebo používá pole, které firmware v2.0.0 už nepřijímá. |

Podrobnosti: [**Zpracování downlinků**](downlinks.md).

### Aplikace zařízení přes NFC nepřečte {#the-nfc-app-cannot-read-the-device}

NFC ve firmwaru v2.0.0 potřebuje napájené zařízení: s vybitými bateriemi se tag tváří jako prázdný. Držte telefon u zařízení po celou dobu výměny dat; relace skončí po 3 s bez požadavku a trvá nejvýš 120 s. Používejte verzi aplikace HARDWARIO Manager, která firmware v2.0.0 podporuje.

Podrobnosti: [**Konfigurace**](configuration.md).

:::note Firmware v1.4.x
Zařízení s firmwarem v1.4.x šlo přes NFC nastavit i bez baterií. Firmware v2.0.0 tuto možnost odstranil, takže zařízení musí být napájené.
:::

## Hodnoty senzorů {#sensor-values}

### V dekódovaném payloadu jsou hodnoty `null` {#the-decoded-payload-shows-null-values}

Hodnota `null` znamená, že senzor je zapnutý, ale nemá platnou hodnotu: sonda je odpojená, senzor selhal nebo byla naměřená hodnota mimo rozsah. Chybějící klíč znamená něco jiného: schopnost je v nastavení vypnutá.

Podrobnosti: [**Payload a dekodér**](payload.md), [**Sondy 1-Wire**](one-wire.md).

### Po výměně sondy 1-Wire zůstávají její hodnoty `null` {#a-1-wire-probe-was-replaced-and-its-values-stay-null}

Zařízení novou sondu nikdy samo nepřesune do slotu té staré, protože si slot pamatuje sériové číslo své sondy. Dokud se starý slot dál považuje za obsazený, zařízení novou sondu samo ani nehledá, proto nové přiřazení vyvolejte příkazem `w1_scan` (v aplikaci HARDWARIO Manager přes **STICKER → Tools → 1-Wire sensors**), nebo zařízení restartujte. Pokud novou sondu může převzít některý volný slot, zařízení ji do něj přiřadí a její hodnoty se objeví pod tímto slotem. Starý slot pak uplink Info hlásí jako `replaced` (stejný typ sondy) nebo `absent` (jiný typ), případně jako `mismatch`, když sondu jiného typu nemohl převzít žádný volný slot. Chcete-li zachovat původní slot, smažte nebo aktualizujte jeho uložené sériové číslo a nastavení uložte, jak popisuje postup pro výměnu sondy.

Podrobnosti: [**Sondy 1-Wire**](one-wire.md).

### Čítače se vynulovaly {#counters-went-back-to-zero}

- Počty pohybů z PIR a akcelerometru se drží jen v RAM a po každém restartu začínají od nuly. To je očekávané chování.
- Čítače Hallových spínačů a vstupů se ukládají do flash paměti a přežijí restart i výměnu baterií. Vynuluje je jen `reset_counters`, `factory_reset` nebo `vendor_reset`.
- Po aktualizaci z v1.4.x se schopnosti vstupů vrátí na výchozí hodnoty, takže čítače vstupů z telemetrie zmizí, dokud vstupy znovu nenastavíte.

Podrobnosti: [**Historie a čítače**](history-and-counters.md).

### Chybí alarmová hlášení {#alarm-reports-are-missing}

Alarmová hlášení jsou ve výchozím stavu nepotvrzovaná a neopakují se, takže jeden ztracený uplink znamená jedno ztracené hlášení; stav alarmů ale nese každý telemetrický uplink. Chcete-li, aby se alarmová hlášení potvrzovala a opakovala, zapněte `radio-alarm-ack`. Zkontrolujte také, že jsou pravidla uložená (neuložená pravidla při dalším restartu zmizí). Po každém restartu zařízení znovu nahlásí všechny podmínky alarmů, které stále trvají.

Podrobnosti: [**Alarmy**](alarms.md).

## Data a čas {#data-and-time}

### Záznamy historie nemají čas, nebo mají špatný {#history-records-have-no-time-or-the-time-is-wrong}

Po vyjmutí baterií se čas ztratí a znovu se nastaví ze sítě při dalším připojení. Záznamy pořízené předtím dostanou správný čas dodatečně, jakmile se hodiny nastaví. Záznamy ze startu, při kterém zařízení čas nikdy nedostalo, zůstanou bez časové značky a dekódují se s `time: null`. S `radio-mode off` zařízení získá čas jen z příkazu `clock_sync` přes NFC.

Podrobnosti: [**Historie a čítače**](history-and-counters.md), [**Zprávy a časování**](messages.md).

### Jak zjistím verzi firmwaru v zařízení? {#which-firmware-version-runs-on-the-device}

Verzi nese uplink Info (`fw_version`). Chcete-li ji znát hned, pošlete `get_info`.

Podrobnosti: [**Verze a aktualizace firmwaru**](firmware.md).
