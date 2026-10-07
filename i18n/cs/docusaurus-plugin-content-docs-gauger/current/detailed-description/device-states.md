---
slug: device-states
title: Stavy zařízení
---

# Stavy zařízení {#device-states}

Během provozu se zařízení může nacházet v několika stavech. Každý z nich signalizuje zelená stavová LED.

Hned po spuštění přejde zařízení do prvního stavu, inicializace. V něm se postupně inicializují všechny podsystémy zařízení. Během inicializace LED trvale svítí.

Po úspěšné inicializaci přejde zařízení do stavu běhu, který signalizují občasná krátká bliknutí stavové LED. V tomto stavu zařízení navíc vysílá informace o sobě (viz [Vyhledání zařízení](../operation-instructions/device-discovery.md)).

Pokud zařízení narazí na chybu, nejčastěji během inicializace (chyba může mít i jiné příčiny, například neúspěšné připojení k Wi-Fi), přejde do chybového stavu. V něm LED bliká v pravidelných intervalech 500 ms. Chyba se každou sekundu zapisuje do logu a je součástí vysílaných zpráv. Pokud to sestavení firmwaru povoluje, zařízení se po 60 sekundách v chybovém stavu automaticky restartuje. Z tohoto stavu lze také spustit návrat k předchozí verzi firmwaru (viz [Správa firmwaru](../operation-instructions/firmware-management.md)).

Chování LED v jednotlivých stavech:

| Stav LED        | Stav zařízení  |
| :-------------- | :------------- |
| svítí           | inicializace   |
| krátce bliká    | běh            |
| rychle bliká    | chyba          |
