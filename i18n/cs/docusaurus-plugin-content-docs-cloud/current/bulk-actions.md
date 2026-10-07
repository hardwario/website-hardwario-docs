---
slug: bulk-actions
title: Hromadné akce
description: "Hromadnými akcemi v HARDWARIO Cloud nastavíte nebo spravujete mnoho zařízení CHESTER najednou, když má celá flotila sdílet stejné nastavení."
---

# Hromadné akce {#bulk-actions}

**Hromadnými akcemi** nastavíte nebo spravujete **mnoho zařízení najednou**, ne jedno po druhém.
Hodí se to při plošném nasazení flotily zařízení CHESTER, která mají mít stejnou konfiguraci, firmware,
tagy nebo labely.

## Výběr zařízení {#selecting-devices}

Na stránce **Devices** zaškrtněte políčko u každého zařízení, které chcete zahrnout (nebo políčkem
v záhlaví vyberte všechna). Tlačítko **BULK ACTIONS** ukazuje, kolik zařízení je vybráno. Kliknutím
na něj otevřete dialog hromadných akcí.

![Stránka Devices se třemi vybranými zařízeními a aktivním tlačítkem BULK ACTIONS](../../../../cloud/images/bulk-actions.png)

## Spuštění akce {#running-an-action}

Dialog zobrazuje počet **vybraných zařízení** a nabízí pět záložek, jednu pro každý druh akce.
Když zaškrtnete **Save as batch (track progress)**, operace se zaznamená jako dávka a její průběh
můžete později sledovat. Tlačítkem **RUN** akci provedete na všech vybraných zařízeních.

### Config {#config}

Odešlete příkazy `app config` do všech vybraných zařízení. Funguje to stejně jako
[**downlink konfigurace**](/cloud/downlink/config), jen hromadně. Příkazy zadejte jako **Text** nebo
**JSON**. U nasazení se zařízeními CHESTER wM-Bus můžete adresy zařízení importovat také ze souboru.

![Dialog hromadných akcí na záložce Config s příkazy app config](../../../../cloud/images/bulk-config.png)

### Firmware {#firmware}

Aktualizujte firmware všech vybraných zařízení bezdrátově. Zadejte **identifikátor firmwaru**, který
chcete nasadit (viz [**Firmware**](/cloud/firmware)).

![Dialog hromadných akcí na záložce Firmware s polem pro identifikátor firmwaru](../../../../cloud/images/bulk-firmware.png)

### Tags {#tags}

Přidejte, odeberte nebo nahraďte [**tagy**](/cloud/tags) na vybraných zařízeních. Zvolte **operaci**
(Add / Remove / Replace) a vyberte tagy, které se mají použít.

![Dialog hromadných akcí na záložce Tags s operacemi Add / Remove / Replace](../../../../cloud/images/bulk-tags.png)

### Comment {#comment}

Nastavte, doplňte nebo smažte komentář u vybraných zařízení (až 500 znaků).

![Dialog hromadných akcí na záložce Comment s operacemi Set / Append / Clear](../../../../cloud/images/bulk-comment.png)

### Labels {#labels}

Přidejte, aktualizujte, odeberte nebo nahraďte **labely** (páry název–hodnota) u vybraných zařízení.

![Dialog hromadných akcí na záložce Labels s poli pro název a hodnotu](../../../../cloud/images/bulk-labels.png)
