---
slug: chester-pair-tag
title: Jak spárovat Bluetooth tag se zařízením CHESTER
description: "V tomto průvodci se naučíte, jak spárovat a spravovat až osm tagů se zařízením CHESTER. Ukážeme vám, jak tagy zaregistrovat, zkontrolovat a jak z nich čítat data přímo v konzoli aplikace HARDWARIO Manager."
---

import Image from '@theme/IdealImage';

## Přehled tutoriálu {#tutorial-overview}

V tomto průvodci se naučíte, jak spárovat a spravovat až osm tagů se zařízením CHESTER. Ukážeme vám, jak tagy zaregistrovat, zkontrolovat a jak z nich čítat data přímo v konzoli aplikace HARDWARIO Manager.

---

<div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
  <iframe
    src="https://www.youtube.com/embed/7ita74JSj98?rel=0"
    title="HOW TO PAIR BLUETOOTH TAG WITH CHESTER"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }}
  ></iframe>
</div>


## Podrobný textový průvodce {#step-by-step-text-guide}

1. Vezměte zařízení CHESTER a připojte se pomocí aplikace HARDWARIO Manager.

2. Pokud to děláte poprvé, podívejte se na video v kartě, kde je celý postup ukázán.

3. Po připojení přejděte do Terminálu.

4. Zadejte příkaz config show a zkontrolujte, že je vaše nastavení správné.

5. Ve výstupu najděte položku tag config enabled.

6. Pokud je nastavena na true, můžete následující kroky přeskočit.

7. Pokud je nastavena na false, zadejte tag config enabled true a poté config save.

8. Zařízení CHESTER se restartuje a odpojí vás, proto se připojte znovu.

9. Naskenujte QR kód, klikněte na zařízení a přejděte do Konzole.

10. Se zařízením CHESTER můžete spárovat až 8 tagů.

11. Spárované tagy zobrazíte příkazem tag config devices list.

12. Uvidíte seznam všech osmi slotů, které budou zpočátku prázdné 0000000000.

13. Vezměte tag, který chcete spárovat, a položte jej k zařízení CHESTER.

14. V konzoli zadejte tag enroll. Zařízení CHESTER spustí automatické vyhledávání na 10 sekund.

15. Pokud tag najde, zobrazí jeho MAC adresu: zkontrolujte, že odpovídá (najdete ji na tagu).

16. Pokud bylo párování úspěšné, můžete následující kroky přeskočit.

17. Pokud zařízení CHESTER tag nenajde, zkuste tag enroll dvakrát.

18. Pokud párování stále nefunguje, musíte MAC adresu uložit ručně.

19. Použijte k tomu příkaz tag config device add MAC_address, přičemž adresu najdete na tagu nebo v QR kódu.

20. Po zadání se tag automaticky přidá do prvního volného slotu.

21. Tímto způsobem můžete přidat další tagy (až 8).

22. Pokud zadáte nesprávnou adresu, můžete ji odstranit příkazem tag config devices remove (číslo slotu).

23. Výslednou konfiguraci uložte příkazem config save.

24. Pro kontrolu se znovu připojte k zařízení CHESTER a v konzoli zadejte tag devices list.

25. Měl by se zobrazit seznam vašich spárovaných tagů.

26. Čtení otestujete příkazem tag read. Zařízení CHESTER načte aktuální hodnoty z tagů.

27. A to je vše. Nyní můžete tagy nainstalovat tam, kde je potřebujete.
