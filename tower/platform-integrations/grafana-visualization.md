---
slug: grafana-visualization
title: Grafana Visualization
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

This tutorial is made for the [**Air Quality Monitor**](https://www.hardwario.store/indoor-air-quality-tester/) connected to the **Raspberry Pi** with the Hub installed on it.

You can use our [**Pre-Installed Image**](../server-raspberry-pi/installation-os.md) or your [**own Raspberry where you will install the Hub**](../server-raspberry-pi/installation-clean-os.md)

:::

[**Grafana**](https://grafana.com) is an open platform for beautiful analytics and monitoring. It allows you to create nice-looking dashboards that will give you quick insights into your sensor data.

<Image img={require('./images/grafana-for-visualization-grafana.png')} />

## Install Grafana

<Tabs groupId="operating-system">
<TabItem value="linux" label="Linux">

:::info

First, you will need to install [**InfluxDB**](https://www.influxdata.com).

:::

#### Start by installing all the needed packages
```bash
sudo apt install apt-transport-https curl -y
```

#### Add the repository key
```bash
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
```

#### Add repository to the source list

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

#### Install the InfluxDB Package
```bash
sudo apt update && sudo apt install influxdb
```

#### Start the InfluxDB Service to test it
```bash
sudo systemctl start influxdb
```

:::info

After you tested the InfluxDB, you can move to [**Grafana**](https://grafana.com).

:::

#### Install Grafana Dependencies
```bash
sudo apt install adduser libfontconfig -y
```

#### Install Grafana

<Tabs groupId="device-type">
  <TabItem value="rpi" label="Raspberry Pi">

  #### Download the Latest Version
  ```bash
  wget $(wget "https://api.github.com/repos/fg2it/grafana-on-raspberry/releases/latest" -q -O - | grep browser_download_url | grep armhf.deb | head -n 1 | cut -d '"' -f 4) -O grafana.deb
  ```

  #### Install the Package
  ```bash
  sudo dpkg -i grafana.deb
  ```

  </TabItem>
  <TabItem value="desktop" label="Desktop">

  #### Add Repository to Source List
  ```bash
  curl -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
  echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
  ```

  #### Install the Package
  ```bash
  sudo apt update && sudo apt install grafana -y
  ```

  </TabItem>
</Tabs>

#### Enable Grafana on Boot
```bash
sudo systemctl daemon-reload
sudo systemctl enable grafana-server
```

#### Test Grafana
```bash
sudo systemctl start grafana-server
```

</TabItem>
<TabItem value="macOS" label="macOS">

:::caution

Make sure you have [**Homebrew**](https://brew.sh) installed.

:::

:::info

First, you will need to install [**InfluxDB**](https://www.influxdata.com).

:::

#### Install InfluxDB and Enable It

```bash
brew install influxdb
brew services start influxdb
```

:::info

After you installed InfluxDB, you can move to [**Grafana**](https://grafana.com).

:::

#### Install InfluxDB and Enable It

```bash
brew install grafana
brew services start grafana
```

</TabItem>
</Tabs>

## Configure Grafana

To configure Grafana, you will first have to open it and log in:

- [**http://localhost:3000/**](http://localhost:3000/) - Grafana is running on your **local machine**
- **http://hub.local:3000/** - Grafana is running on [**your Raspberry Pi with our Hub installed**](../server-raspberry-pi/installation-os.md)
- **http://"IP address":3000/** - Grafana is installed on your device, you should know the IP address of that device

:::info

Default **User** is `admin`.
Default **Password** is `admin`.

:::

:::warning

To make this part work without any additional configuration you need to follow the tutorial for [**MQTT Strorage (mqtt2influxdb)**](../command-line-tools/mqtt-to-influx-db.md)

:::

#### Create a Data Source

Select **Add Data Source** and fill in the data

<Image img={require('./images/add-data-source.png')} />
<br />

- Enter the Name: `node`
- Select the Type: `InfluxDB`
- Enter the URL: **http://localhost:8086**


<Image img={require('./images/grafana-data-source.png')} />
<br />

- Enter the Database: `node`
- Click on `Save & Test` button to check if everything is OK. You should see the same green notification as in the picture.

<Image img={require('./images/set-db-name-and-test.png')} />

## Import dashboard

#### Download [**dashboard.json**](./dashboard.json) and import it to Grafana

- Click the **Grafana icon on the top left** (1)
- Click on the **+** icon to expand the submenu (2)
- Click on the **Import** (3)

<Image img={require('./images/grafana-import-step-1.png')} />
<br />

- Click on the **Upload .json File** (4)

<Image img={require('./images/grafana-import-step-2.png')} />
<br />

- Choose your JSON file (in our case **dashboard.json**) (5)
- Select the file to upload (6)

<Image img={require('./images/grafana-import-step-3.png')} />
<br />

- Select your database (7)
- Click on the **Import** button (8)

<Image img={require('./images/grafana-import-step-4.png')} />
<br />

- Your dashboard is imported.

#### Example output for [**Wireless Climate Monitor**](https://www.hackster.io/jakub-smejkal/radio-climate-monitor-96de57) and [**Wireless CO2 Monitor**](https://www.hackster.io/jakub-smejkal/radio-co2-monitor-311d2c) projects

<Image img={require('./images/grafana-dashboard.png')} />


