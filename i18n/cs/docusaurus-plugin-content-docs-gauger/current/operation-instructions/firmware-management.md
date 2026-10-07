---
slug: firmware-management
title: Správa firmwaru
---

# Správa firmwaru {#firmware-management}

Firmware zařízení lze aktualizovat na dálku (OTA). Aktualizaci spustíte tlačítkem **Upload Firmware** v sekci System webového rozhraní. Po nahrání firmwaru se zařízení restartuje, aby se změna projevila. Zda se nahrání povedlo, ověříte v tabulce na kartě Status podle polí s verzí a názvem firmwaru.

V případě potřeby vrátíte předchozí firmware tlačítkem **Rollback Firmware** na kartě System. Zda je návrat k dispozici, ukazuje příslušné pole tabulky Status. Zařízení uchovává jen jednu verzi firmwaru pro návrat. Po návratu tedy vede další návrat (je-li k dispozici) k tovární verzi firmwaru.

Firmware lze vrátit i z chybového stavu (LED rychle bliká). Hodí se to hlavně tehdy, když aktualizace naruší spouštění zařízení a webové rozhraní je nedostupné. Návrat se spouští podobně jako reset zařízení. Podržte tlačítko USER a chybové blikání ustane. Asi po 5 sekundách držení začne LED blikat ještě rychleji než předtím. Uvolněte tlačítko, dokud LED takto bliká, a firmware se vrátí na předchozí verzi. Pokud tlačítko neuvolníte, zařízení se vrátí do chybového stavu.

Některé aktualizace mohou konfiguraci zařízení zneplatnit. Proto doporučujeme nastavení vždy zálohovat tlačítkem **Export** na kartě Settings.
