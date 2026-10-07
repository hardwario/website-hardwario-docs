---
slug: chirpstack-end-devices
title: Koncová zařízení
title_meta: "Koncová zařízení (ChirpStack)"
---
import Image from '@theme/IdealImage';

# Průvodce konfigurací koncových zařízení {#end-devices-configuration-guide}

Tento návod vás provede vytvořením profilů zařízení a přidáním koncových zařízení v ChirpStack v4.

---

## 1. Profily zařízení {#1-device-profiles}

Po přidání bran vytvořte v ChirpStack profily zařízení.  

1. V navigační liště klikněte na **Device Profiles**.  
2. Klikněte na **Add Device Profile** (vpravo nahoře).  

3. Zadejte potřebné údaje, například:  
   - Name  
   - Region  
   - MAC Version  
   - ADR Algorithm  
   - Expected Uplink Interval  

![ChirpStack v4 – profily zařízení](../../../../../../apps/chirpstack/chirpstack-configuration/images/chirpstack-tutorial-5.png)

---

### Příklad pro zařízení HARDWARIO {#example-for-hardwario-devices}

Pokud jako koncové zařízení používáte CHESTER nebo STICKER, najdete příklady konfigurace profilu zařízení na těchto stránkách:

| **Zařízení** | **Odkaz na dokumentaci** |
|-------------|-------------------------|
| **CHESTER** | https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio#chirpstack-configuration |
| **STICKER** | https://docs.hardwario.com/sticker/connectivity/lorawan-chirpstack |

---

## 2. Aplikace – přidání koncových zařízení {#2-applications--adding-end-devices}

Dále vytvořte aplikaci:  

1. V navigační liště zvolte **Applications** (na konci menu).  

2. Vytvořte novou aplikaci a otevřete ji.  

3. Přidejte zařízení a zadejte jeho údaje, například:  
   - **Name**  
   - **Device EUI** 
   - **Join EUI / AppEUI** 
   - **Device Profile**  

Klikněte na **Submit**.  

![ChirpStack v4 – přidání zařízení](../../../../../../apps/chirpstack/chirpstack-configuration/images/chirpstack-tutorial-11.png)

Po vytvoření zařízení přejděte na záložku **Activation** a zadejte:  
- **Device Address**  
- **Network Session Key**  
- **Application Session Key**  

Nakonec klikněte na **(Re)activate Device**.  

![ChirpStack v4 – aktivace zařízení](../../../../../../apps/chirpstack/chirpstack-configuration/images/chirpstack-tutorial-13.png)

## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete další pomoc nebo vizuální ukázku postupu popsaného v tomto návodu, podívejte se na [**videonávod**](/apps/videos-apps/chirpstack-devices).
:::
