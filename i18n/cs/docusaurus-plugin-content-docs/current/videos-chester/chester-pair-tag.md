---
slug: chester-pair-tag
title: Jak spárovat Bluetooth tag se zařízením CHESTER
---

import Image from '@theme/IdealImage';

## Přehled návodu {#tutorial-overview}

Tento návod ukazuje, jak se zařízením CHESTER spárovat a spravovat až osm tagů: jak tagy zaregistrovat, ověřit a číst z nich data přímo v konzoli aplikace HARDWARIO Manager.

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


## Podrobný textový návod {#step-by-step-text-guide}

1. Vezměte zařízení CHESTER a připojte se pomocí aplikace HARDWARIO Manager.

2. Pokud to děláte poprvé, podívejte se na video na kartě, které celý postup ukazuje.

3. Po připojení otevřete Terminal.

4. Zadejte příkaz config show a zkontrolujte nastavení.

5. Ve výstupu najděte položku tag config enabled.

6. Pokud má hodnotu true, můžete následující kroky přeskočit.

7. Pokud má hodnotu false, zadejte tag config enabled true a poté config save.

8. Zařízení CHESTER se restartuje a spojení se přeruší, proto se připojte znovu.

9. Naskenujte QR kód, klepněte na zařízení a přejděte do sekce Console.

10. Se zařízením CHESTER můžete spárovat až 8 tagů.

11. Spárované tagy zobrazíte příkazem tag config devices list.

12. Uvidíte seznam všech osmi slotů; zpočátku jsou prázdné (0000000000).

13. Vezměte tag, který chcete spárovat, a položte ho vedle zařízení CHESTER.

14. V konzoli zadejte tag enroll. Zařízení CHESTER bude 10 sekund automaticky hledat tagy v okolí.

15. Pokud tag najde, zobrazí jeho MAC adresu: zkontrolujte, že odpovídá (najdete ji na tagu).

16. Pokud bylo párování úspěšné, můžete následující kroky přeskočit.

17. Pokud zařízení CHESTER tag nenajde, zkuste tag enroll dvakrát.

18. Pokud párování stále nefunguje, musíte MAC adresu uložit ručně.

19. Použijte příkaz tag config device add MAC_address; adresu najdete na tagu nebo v QR kódu.

20. Po zadání se tag automaticky přidá do prvního volného slotu.

21. Tímto způsobem můžete přidat další tagy (až 8).

22. Pokud zadáte nesprávnou adresu, můžete ji odstranit příkazem tag config devices remove (číslo slotu).

23. Výslednou konfiguraci uložte příkazem config save.

24. Pro kontrolu se znovu připojte k zařízení CHESTER a v konzoli zadejte tag devices list.

25. Měl by se zobrazit seznam spárovaných tagů.

26. Čtení otestujete příkazem tag read. Zařízení CHESTER načte aktuální hodnoty z tagů.

27. Hotovo. Teď můžete tagy rozmístit tam, kde je potřebujete.
