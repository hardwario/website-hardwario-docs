---
slug: device-states
title: Stavy zařízení
description: "Během svého běhu se zařízení může dostat do několika stavů, přičemž každý z nich je indikován zelenou stavovou LED."
---

# Stavy zařízení {#device-states}

Během svého běhu se zařízení může dostat do několika stavů, přičemž každý z nich je indikován zelenou stavovou LED.

Prvním stavem, do kterého zařízení vstoupí hned po spuštění, je inicializace. V tomto stavu se postupně inicializují všechny podsystémy zařízení. Ve stavu inicializace LED trvale svítí.

Po úspěšné inicializaci zařízení přejde do stavu běhu. Tento stav je indikován občasnými krátkými bliknutími stavové LED. Navíc, dokud je zařízení v tomto stavu, vysílá informace o sobě samém (viz [Vyhledávání zařízení](../operation-instructions/device-discovery.md)).

Pokud zařízení narazí na chybu, nejpravděpodobněji během inicializace (existují i další zdroje chyb, například nezdařené připojení k Wi-Fi), přejde do chybového stavu. V tomto stavu LED bliká v pevných intervalech 500 ms. Chyba je každou sekundu zaznamenána do logu a je součástí vysílaných zpráv. Pokud je to povoleno v sestavení firmwaru, zařízení se po 60 sekundách v chybovém stavu automaticky restartuje. Z tohoto stavu je možné spustit návrat k předchozí verzi firmwaru (viz [Správa firmwaru](../operation-instructions/firmware-management.md)).

Tabulka chování LED podle stavu:

| Stav LED       | Stav zařízení  |
| :------------- | :------------- |
| svítí          | inicializace   |
| krátká bliknutí | běh           |
| rychlé blikání | chyba          |
