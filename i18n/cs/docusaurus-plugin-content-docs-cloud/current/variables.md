---
slug: variables
title: Proměnné
description: "V sekci Proměnné můžete nahrát dešifrovací klíče používané k dekódování dat v případě, že je použito šifrování. Některá přenášená data mohou být zašifrována kvůli zajištění bezpečné nebo efektivní komunikace a v takovém případě jsou pro čitelnost dat…"
---
import Image from '@theme/IdealImage';

V sekci Proměnné můžete nahrát **dešifrovací klíče** používané k dekódování dat v případě, že je použito šifrování. Některá přenášená data mohou být zašifrována kvůli zajištění bezpečné nebo efektivní komunikace a v takovém případě jsou pro čitelnost dat potřeba dešifrovací klíče. Tato sekce vysvětluje, jak do HARDWARIO Cloud přidat jednotlivé dešifrovací klíče prostřednictvím sekce Proměnné.

---

## Nastavení dešifrovacích klíčů {#setting-up-decryption-keys}

### Postup krok za krokem {#step-by-step-instructions}

1. V levém panelu vyberte **Variables**.  
2. Klikněte na tlačítko **+ NEW VARIABLE** v pravém horním rohu.  

![Proměnné v Cloudu](../../../../cloud/images/cloud-variables-0.png)

3. Vyplňte následující informace:  
   - **Device** → vyberte své zařízení  
   - **Name of Variable** → zadejte wM-Bus adresu zařízení  
   - **Value of Variable** → zadejte dešifrovací klíč přiřazený vašemu zařízení  
   - **Environment** → vyberte `wmbus`  
   - **Comment** → nepovinné, můžete přidat komentář, pokud je potřeba  

:::info
Pokud je zařízení specifikováno, dešifrovací klíč se použije **pouze pro toto konkrétní zařízení**.  
Pokud není vybráno žádné zařízení, klíč se použije **pro celý prostor**.
:::

![Proměnné – informace](../../../../cloud/images/cloud-variables-1.png)

4. Vaše data by se nyní v HARDWARIO Cloud měla zobrazovat **dešifrovaná**.
