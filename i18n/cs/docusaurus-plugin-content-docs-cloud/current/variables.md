---
slug: variables
title: Proměnné
description: "V sekci Variables můžete nahrát dešifrovací klíče, kterými se dešifrují data ze zařízení, která používají šifrování."
title_meta: "Proměnné (HARDWARIO Cloud)"
---
import Image from '@theme/IdealImage';

V sekci **Variables** můžete nahrát **dešifrovací klíče** k šifrovaným datům. Některá přenášená data mohou být kvůli bezpečné nebo efektivní komunikaci zašifrovaná a bez dešifrovacích klíčů je nelze přečíst. Tato stránka popisuje, jak v sekci Variables přidat do HARDWARIO Cloud jednotlivé dešifrovací klíče.

---

## Nastavení dešifrovacích klíčů {#setting-up-decryption-keys}

### Postup krok za krokem {#step-by-step-instructions}

1. V levém panelu vyberte **Variables**.  
2. Klikněte na tlačítko **+ NEW VARIABLE** v pravém horním rohu.  

![Sekce Variables v HARDWARIO Cloud](../../../../cloud/images/cloud-variables-0.png)

3. Vyplňte tyto údaje:  
   - **Device** → vyberte své zařízení  
   - **Name of Variable** → zadejte adresu wM-Bus zařízení  
   - **Value of Variable** → zadejte dešifrovací klíč přidělený zařízení  
   - **Environment** → vyberte `wmbus`  
   - **Comment** → nepovinný komentář  

:::info
Pokud zařízení vyberete, dešifrovací klíč platí **jen pro toto zařízení**.  
Pokud žádné zařízení nevyberete, klíč platí **pro celý prostor**.
:::

![Sekce Variables: vyplněné údaje](../../../../cloud/images/cloud-variables-1.png)

4. Data by se teď v HARDWARIO Cloud měla zobrazovat **dešifrovaná**.
