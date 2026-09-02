---
slug: grafana-visualization
title: Vizualizace v Grafaně
description: "Tento návod je určen pro Air Quality Monitor připojený k zařízení Raspberry Pi s nainstalovaným Hubem."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Tento návod je určen pro [**Air Quality Monitor**](https://www.hardwario.store/p/clime-xl-set) připojený k zařízení **Raspberry Pi** s nainstalovaným Hubem.

Můžete použít náš [**předinstalovaný obraz**](../server-raspberry-pi/installation-os.md) nebo [**vlastní Raspberry, na které Hub nainstalujete**](../server-raspberry-pi/installation-clean-os.md)

:::

[**Grafana**](https://grafana.com) je otevřená platforma pro krásnou analytiku a monitoring. Umožňuje vytvářet přehledné dashboardy, které vám dají rychlý přehled o datech ze senzorů.

<Image img={require('../../../../../tower/platform-integrations/images/grafana-for-visualization-grafana.png')} alt="Dashboard climate-station v Grafaně s ukazateli a grafy teploty, vlhkosti, osvětlení a tlaku" />

## Instalace Grafany {#install-grafana}

<Tabs groupId="operating-system">
<TabItem value="linux" label="Linux">

:::info

Nejprve bude potřeba nainstalovat [**InfluxDB**](https://www.influxdata.com).

:::

#### Začněte instalací všech potřebných balíčků {#start-by-installing-all-the-needed-packages}
```bash
sudo apt install apt-transport-https curl -y
```

#### Přidejte klíč repozitáře {#add-the-repository-key}
```bash
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
```

#### Přidejte repozitář do seznamu zdrojů {#add-repository-to-the-source-list}

  <Tabs groupId="linux-type">
  <TabItem value="debian" label="Debian">

  ```bash
  echo "deb https://repos.influxdata.com/debian stretch stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
  ```

  </TabItem>
  <TabItem value="ubuntu" label="Ubuntu">

  ```bash
  echo "deb https://repos.influxdata.com/ubuntu/ xenial stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
  ```

  </TabItem>
  </Tabs>

#### Nainstalujte balíček InfluxDB {#install-the-influxdb-package}
```bash
sudo apt update && sudo apt install influxdb
```

#### Spusťte službu InfluxDB a otestujte ji {#start-the-influxdb-service-to-test-it}
```bash
sudo systemctl start influxdb
```

:::info

Po otestování InfluxDB můžete přejít ke [**Grafaně**](https://grafana.com).

:::

#### Nainstalujte závislosti Grafany {#install-grafana-dependencies}
```bash
sudo apt install adduser libfontconfig -y
```

#### Nainstalujte Grafanu {#install-grafana-1}

<Tabs groupId="device-type">
  <TabItem value="rpi" label="Raspberry Pi">

  #### Stáhněte nejnovější verzi
  ```bash
  wget $(wget "https://api.github.com/repos/fg2it/grafana-on-raspberry/releases/latest" -q -O - | grep browser_download_url | grep armhf.deb | head -n 1 | cut -d '"' -f 4) -O grafana.deb
  ```

  #### Nainstalujte balíček
  ```bash
  sudo dpkg -i grafana.deb
  ```

  </TabItem>
  <TabItem value="desktop" label="Desktop">

  #### Přidejte repozitář do seznamu zdrojů
  ```bash
  curl -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
  echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
  ```

  #### Nainstalujte balíček
  ```bash
  sudo apt update && sudo apt install grafana -y
  ```

  </TabItem>
</Tabs>

#### Povolte Grafanu při startu {#enable-grafana-on-boot}
```bash
sudo systemctl daemon-reload
sudo systemctl enable grafana-server
```

#### Otestujte Grafanu {#test-grafana}
```bash
sudo systemctl start grafana-server
```

</TabItem>
<TabItem value="macOS" label="macOS">

:::caution

Ujistěte se, že máte nainstalovaný [**Homebrew**](https://brew.sh).

:::

:::info

Nejprve bude potřeba nainstalovat [**InfluxDB**](https://www.influxdata.com).

:::

#### Nainstalujte InfluxDB a povolte ji {#install-influxdb-and-enable-it}

```bash
brew install influxdb
brew services start influxdb
```

:::info

Po instalaci InfluxDB můžete přejít ke [**Grafaně**](https://grafana.com).

:::

#### Nainstalujte InfluxDB a povolte ji {#install-influxdb-and-enable-it-1}

```bash
brew install grafana
brew services start grafana
```

</TabItem>
</Tabs>

## Konfigurace Grafany {#configure-grafana}

Pro konfiguraci Grafany ji nejprve otevřete a přihlaste se:

- [**http://localhost:3000/**](http://localhost:3000/) – Grafana běží na vašem **lokálním počítači**
- **http://hub.local:3000/** – Grafana běží na [**vašem Raspberry Pi s nainstalovaným Hubem**](../server-raspberry-pi/installation-os.md)
- **http://"IP adresa":3000/** – Grafana je nainstalována na vašem zařízení, měli byste znát IP adresu tohoto zařízení

:::info

Výchozí **uživatel** je `admin`.
Výchozí **heslo** je `admin`.

:::

:::warning

Aby tato část fungovala bez další konfigurace, je potřeba projít návod pro [**MQTT Strorage (mqtt2influxdb)**](../command-line-tools/mqtt-to-influx-db.md)

:::

#### Vytvoření datového zdroje {#create-a-data-source}

Zvolte **Add Data Source** a vyplňte údaje

<Image img={require('../../../../../tower/platform-integrations/images/add-data-source.png')} alt="Home Dashboard v Grafaně se zástupcem Add data source" />
<br />

- Zadejte Name: `node`
- Zvolte Type: `InfluxDB`
- Zadejte URL: **http://localhost:8086**


<Image img={require('../../../../../tower/platform-integrations/images/grafana-data-source.png')} alt="Formulář nového datového zdroje s Name node, Type InfluxDB a URL http://localhost:8086" />
<br />

- Zadejte Database: `node`
- Klikněte na tlačítko `Save & Test` a zkontrolujte, že je vše v pořádku. Měli byste vidět stejné zelené hlášení jako na obrázku.

<Image img={require('../../../../../tower/platform-integrations/images/set-db-name-and-test.png')} alt="Detaily InfluxDB s databází node a zeleným hlášením Data source is working" />

## Import dashboardu {#import-dashboard}

#### Stáhněte [**dashboard.json**](../../../../../tower/platform-integrations/dashboard.json) a naimportujte jej do Grafany {#download-dashboardjson-and-import-it-to-grafana}

- Klikněte na **ikonu Grafany vlevo nahoře** (1)
- Kliknutím na ikonu **+** rozbalte podmenu (2)
- Klikněte na **Import** (3)

<Image img={require('../../../../../tower/platform-integrations/images/grafana-import-step-1.png')} alt="Boční menu Grafany s vyznačeným logem (1), ikonou plus (2) a položkou Import (3)" />
<br />

- Klikněte na **Upload .json File** (4)

<Image img={require('../../../../../tower/platform-integrations/images/grafana-import-step-2.png')} alt="Stránka Import v Grafaně s vyznačeným tlačítkem Upload .json File (4)" />
<br />

- Vyberte svůj soubor JSON (v našem případě **dashboard.json**) (5)
- Zvolte soubor k nahrání (6)

<Image img={require('../../../../../tower/platform-integrations/images/grafana-import-step-3.png')} alt="Dialog Open File s vybraným dashboard.json (5) a tlačítkem Select (6)" />
<br />

- Zvolte svou databázi (7)
- Klikněte na tlačítko **Import** (8)

<Image img={require('../../../../../tower/platform-integrations/images/grafana-import-step-4.png')} alt="Možnosti importu s vybranou databází node (7) a tlačítkem Import (8)" />
<br />

- Váš dashboard je naimportovaný.

#### Ukázkový výstup pro projekty [**Wireless Climate Monitor**](https://www.hackster.io/jakub-smejkal/radio-climate-monitor-96de57) a [**Wireless CO2 Monitor**](https://www.hackster.io/jakub-smejkal/radio-co2-monitor-311d2c) {#example-output-for-wireless-climate-monitor-and-wireless-co2-monitor-projects}

<Image img={require('../../../../../tower/platform-integrations/images/grafana-dashboard.png')} alt="Naimportovaný dashboard se statistikami climate a CO2 monitoru s grafy teploty a vlhkosti" />
