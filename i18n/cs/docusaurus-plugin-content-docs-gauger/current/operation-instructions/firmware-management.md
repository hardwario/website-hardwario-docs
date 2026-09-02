---
slug: firmware-management
title: Správa firmwaru
description: "Zařízení umožňuje vzdálenou aktualizaci firmwaru přes vzduch (over-the-air). Spustíte ji stisknutím tlačítka Upload Firmware v sekci System webového rozhraní. Po nahrání firmwaru se zařízení restartuje, aby se změna uplatnila. Nahrání můžete ověřit v…"
---

# Správa firmwaru {#firmware-management}

Zařízení umožňuje vzdálenou aktualizaci firmwaru přes vzduch (over-the-air). Spustíte ji stisknutím tlačítka **Upload Firmware** v sekci System webového rozhraní. Po nahrání firmwaru se zařízení restartuje, aby se změna uplatnila. Nahrání můžete ověřit v tabulce na kartě Status, konkrétně v polích s verzí a názvem firmwaru.

V případě potřeby lze firmware vrátit zpět stisknutím tlačítka **Rollback Firmware** na kartě System. Dostupnost návratu je uvedena v příslušném poli tabulky Status. Zařízení umí uchovat pouze jeden firmware pro návrat. Pokud už byl návrat proveden, další návrat (je-li dostupný) bude na výrobní verzi firmwaru.

Návrat firmwaru je možné provést i ze chybového stavu (LED rychle bliká). To je užitečné zejména tehdy, když aktualizace poškodí některou část procesu spouštění a webové rozhraní není dostupné. Návrat se spouští podobně jako reset zařízení. Podržte tlačítko USER, chybové blikání se zastaví. Po přibližně 5 sekundách držení tlačítka začne LED blikat ještě rychleji než předtím. Během tohoto blikání tlačítko uvolněte a firmware se vrátí zpět. Pokud tlačítko neuvolníte, zařízení se vrátí do chybového stavu.

Některé aktualizace mohou zneplatnit konfiguraci zařízení. Z tohoto důvodu vždy doporučujeme zálohovat nastavení pomocí tlačítka **Export** na kartě Settings.
