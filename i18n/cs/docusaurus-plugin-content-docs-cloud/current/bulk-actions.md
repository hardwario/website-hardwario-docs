---
slug: bulk-actions
title: Hromadné akce
description: "což se hodí při nasazení celé flotily zařízení CHESTER, která mají mít stejnou konfiguraci, firmware,"
---

# Hromadné akce {#bulk-actions}

**Hromadné akce** umožňují konfigurovat nebo spravovat **mnoho zařízení najednou** místo jednoho po druhém,
což se hodí při nasazení celé flotily zařízení CHESTER, která mají mít stejnou konfiguraci, firmware,
tagy nebo labely.

## Výběr zařízení {#selecting-devices}

Na stránce **Devices** zaškrtněte políčko u každého zařízení, které chcete zahrnout (nebo políčko
v záhlaví pro výběr všech). Tlačítko **BULK ACTIONS** ukazuje, kolik zařízení je vybráno. Kliknutím
na něj otevřete dialog hromadných akcí.

![Stránka Devices se třemi vybranými zařízeními a aktivním tlačítkem BULK ACTIONS](../../../../cloud/images/bulk-actions.png)

## Spuštění akce {#running-an-action}

Dialog zobrazuje počet **vybraných zařízení** a nabízí pět karet, jednu pro každý druh akce.
Zaškrtnutím **Save as batch (track progress)** se operace zaznamená jako dávka, takže můžete
následně sledovat její průběh. Kliknutím na **RUN** akci aplikujete na všechna vybraná zařízení.

### Config {#config}

Odešle příkazy `app config` do všech vybraných zařízení, stejně jako
[**Config downlink**](/cloud/downlink/config), ale hromadně. Příkazy zadejte jako **Text** nebo
**JSON**. U nasazení CHESTER wM-Bus můžete adresy zařízení také importovat ze souboru.

![Dialog hromadných akcí na kartě Config s příkazy app config](../../../../cloud/images/bulk-config.png)

### Firmware {#firmware}

Aktualizuje firmware všech vybraných zařízení bezdrátově. Zadejte **identifikátor firmwaru**, který
se má nasadit (viz [**Firmware**](/cloud/firmware)).

![Dialog hromadných akcí na kartě Firmware s polem pro identifikátor firmwaru](../../../../cloud/images/bulk-firmware.png)

### Tags {#tags}

Přidání, odebrání nebo náhrada [**tagů**](/cloud/tags) na vybraných zařízeních. Zvolte **operaci**
(Add / Remove / Replace) a vyberte tagy, které se mají použít.

![Dialog hromadných akcí na kartě Tags s operacemi Add / Remove / Replace](../../../../cloud/images/bulk-tags.png)

### Comment {#comment}

Nastavení, doplnění nebo smazání komentáře na vybraných zařízeních (až 500 znaků).

![Dialog hromadných akcí na kartě Comment s operacemi Set / Append / Clear](../../../../cloud/images/bulk-comment.png)

### Labels {#labels}

Přidání/aktualizace, odebrání nebo náhrada **labelů** (párů název–hodnota) na vybraných zařízeních.

![Dialog hromadných akcí na kartě Labels s poli pro název a hodnotu](../../../../cloud/images/bulk-labels.png)
