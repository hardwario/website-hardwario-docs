---
slug: cloud-connection
title: Cloud
description: "V tomto návodu se naučíte, jak připojit svá zařízení k HARDWARIO Cloud vytvořením nového konektoru, transformací dat a jejich odesláním do ThingsBoardu. Na konci vám budou data do platformy plynout automaticky."
---
import Image from '@theme/IdealImage';
import EditCodeBlock from '../../../../../apps/thingsboard/edit-code-block.js';

# Připojení k HARDWARIO Cloud {#connecting-to-the-hardwario-cloud}

V tomto návodu se naučíte, jak připojit svá zařízení k HARDWARIO Cloud vytvořením nového konektoru, transformací dat a jejich odesláním do ThingsBoardu. Na konci vám budou data do platformy plynout automaticky.

---

## Krok 1: Připravte své zařízení {#step-1-prepare-your-device}

Než konektor nastavíte, musíte své zařízení připravit v HARDWARIO Cloud, aby vědělo, kam data posílat a jak se autentizovat:

- **Přiřaďte tag**: otevřete detail svého zařízení a přiřaďte mu tag (vytvořený v pravém menu)
- **Přidejte label s access tokenem**: sjeďte na úplný konec stránky zařízení k sekci `Labels`. Tam vytvořte nový label:
  - `Name`: zadejte název svého tokenu, například `thingsboardtoken`  
    *(Poznámka: Název si můžete zvolit jakýkoli, ale musí být úplně stejný u všech zařízení, která tento konektor sdílejí, a musí odpovídat názvu ve vašem transformačním kódu.)*
  - `Value`: sem vložte svůj access token z ThingsBoardu

:::info Jak získat access token z ThingsBoardu
Přihlaste se do svého ThingsBoardu, přejděte na **Entities > Devices** a klikněte na své konkrétní zařízení. V panelu s detailem zařízení, který vyskočí, klikněte na tlačítko **Copy access token**.
:::

---

## Krok 2: Vytvořte nový konektor {#step-2-create-a-new-connector}

Pro navázání komunikace s ThingsBoardem přejděte v levém menu do sekce `Connectors`.  
Klikněte na `+ New Connector` a nastavte:

- `Name`: pojmenujte svůj konektor
- `Type`: pro integraci s ThingsBoardem zvolte `Webhook`
- `Trigger`: zvolte `Data`
- `Tag`: přiřaďte tag, který jste vytvořili dříve

![ThingsBoard - vytvoření nového konektoru](../../../../../apps/thingsboard/images/thingsboard-cloud-1.png)

---

## Krok 3: Transformujte data do formátu ThingsBoardu {#step-3-transform-data-for-thingsboard-format}

ThingsBoard vyžaduje konkrétní formát dat. Data ze svého zařízení proto musíte upravit **transformačním kódem**.  
Na stránce konektoru sjeďte do sekce `Transformation` a kliknutím na ikonu lupy 📄🔍 otevřete editor kódu.

![ThingsBoard - transformace dat do formátu ThingsBoardu](../../../../../apps/thingsboard/images/thingsboard-cloud-4.png)

---

## Krok 4: Vložte transformační kód {#step-4-insert-the-transformation-code}

Přidejte transformační logiku, která příchozí data převede do formátu kompatibilního s ThingsBoardem.

![ThingsBoard - vložení transformačního kódu](../../../../../apps/thingsboard/images/thingsboard-cloud-6.png)

**Ukázka transformačního kódu:**

<EditCodeBlock initialText={`function main(job) {
    let body = job.message.body;
    const timemultiply = 1000;
    const sharedtimestamp = new Date(job.message.created_at).getTime();
    const sn = job.device.serial_number;
    const accesstoken = job.device.label.thingsboardtoken;

    const dataMap = {};
    function getTimestamp(possibleTimestamp) {
        return (typeof possibleTimestamp === 'number' && !isNaN(possibleTimestamp)) ? possibleTimestamp * timemultiply : sharedtimestamp;
    }
    function pushToData(ts, values) {
        if (!dataMap[ts]) {
            dataMap[ts] = {};
        }
        Object.assign(dataMap[ts], values);
    }

    // Common CHESTER parameters
    pushToData(sharedtimestamp, {
        'current_load': body.system?.current_load,
        'voltage_load': body.system?.voltage_load,
        'voltage_rest': body.system?.voltage_rest,
        'uptime': body.system?.uptime,
        'message.version': body.message?.version,
        'message.sequence': body.message?.sequence,
        'message.timestamp': body.message?.timestamp,
        'attribute.vendor_name': body.attribute?.vendor_name,
        'attribute.product_name': body.attribute?.product_name,
        'attribute.hw_variant': body.attribute?.hw_variant,
        'attribute.hw_revision': body.attribute?.hw_revision,
        'attribute.fw_name': body.attribute?.fw_name,
        'attribute.fw_version': body.attribute?.fw_version,
        'attribute.serial_number': body.attribute?.serial_number,
        'backup.line_voltage': body.backup?.line_voltage,
        'backup.batt_voltage': body.backup?.batt_voltage,
        'backup.state': body.backup?.state,
        'thermometer.temperature': body.thermometer?.temperature,
        'accelerometer.accel_x': body.accelerometer?.accel_x,
        'accelerometer.accel_y': body.accelerometer?.accel_y,
        'accelerometer.accel_z': body.accelerometer?.accel_z,
        'accelerometer.orientation': body.accelerometer?.orientation,
        'network.parameter.eest': body.network?.parameter?.eest,
        'network.parameter.ecl': body.network?.parameter?.ecl,
        'network.parameter.rsrp': body.network?.parameter?.rsrp,
        'network.parameter.rsrq': body.network?.parameter?.rsrq,
        'network.parameter.snr': body.network?.parameter?.snr,
        'network.parameter.plmn': body.network?.parameter?.plmn,
        'network.parameter.cid': body.network?.parameter?.cid,
        'network.parameter.band': body.network?.parameter?.band,
        'network.parameter.earfcn': body.network?.parameter?.earfcn,
        'network.imei': body.network?.imei,
        'network.imsi': body.network?.imsi
    });

    // BLE Tags - use index instead of addr
    body.ble_tags?.forEach((tag, tagIndex) => {
        tag.humidity?.measurements.forEach(m => {
            const ts = getTimestamp(m.timestamp);
            pushToData(ts, {
                [\`ble_tags.\${tagIndex}.humidity.measurement.min\`]: m?.min,
                [\`ble_tags.\${tagIndex}.humidity.measurement.max\`]: m?.max,
                [\`ble_tags.\${tagIndex}.humidity.measurement.avg\`]: m?.avg,
                [\`ble_tags.\${tagIndex}.humidity.measurement.mdn\`]: m?.mdn
            });
        });
        tag.temperature?.measurements.forEach(m => {
            const ts = getTimestamp(m.timestamp);
            pushToData(ts, {
                [\`ble_tags.\${tagIndex}.temperature.measurement.min\`]: m?.min,
                [\`ble_tags.\${tagIndex}.temperature.measurement.max\`]: m?.max,
                [\`ble_tags.\${tagIndex}.temperature.measurement.avg\`]: m?.avg,
                [\`ble_tags.\${tagIndex}.temperature.measurement.mdn\`]: m?.mdn
            });
        });
    });

    const sensorTypes = [
        'w1_thermometers', 'analog_channels', 'rtd_thermometer', 'weight', 'counter', 'current', 'voltage'
    ];

    sensorTypes.forEach(sensorType => {
        body[sensorType]?.forEach((entry, index) => {
            entry.measurements?.forEach(measurement => {
                const ts = getTimestamp(measurement.timestamp);
                const prefix = \`\${sensorType}.\${entry.serial_number || entry.channel || index}.measurement\`;
                const values = {};
                for (const key in measurement) {
                    if (key !== 'timestamp') {
                        values[\`\${prefix}.\${key}\`] = measurement[key];
                    }
                }
                pushToData(ts, values);
            });
        });
    });

    // Buttons
    body.buttons?.forEach((btn, index) => {
        pushToData(sharedtimestamp, {
            [\`button_\${index}.button\`]: btn?.button,
            [\`button_\${index}.count_click\`]: btn?.count_click,
            [\`button_\${index}.count_hold\`]: btn?.count_hold,
            [\`button_\${index}.events\`]: btn?.events
        });
    });

    // Weather Station, Hygrometer, Barometer, Radon Probe, IAQ Sensor, Soil Sensors
    const nestedSensors = [
        ['weather_station', ['wind_speed', 'wind_direction', 'rainfall']],
        ['hygrometer', ['temperature', 'humidity']],
        ['barometer', ['pressure']],
        ['radon_probe', ['chamber_humidity', 'chamber_temperature', 'concentration_daily', 'concentration_hourly']],
        ['iaq_sensor', ['temperature', 'humidity', 'illuminance', 'altitude', 'pressure', 'co2_conc', 'motion_count', 'press_count']],
        ['soil_sensors', ['moisture', 'temperature']]
    ];

    nestedSensors.forEach(([sensorKey, subkeys]) => {
        const sensor = body[sensorKey];
        if (!sensor) return;

        subkeys.forEach(subkey => {
            sensor?.[subkey]?.measurements?.forEach(m => {
                const ts = getTimestamp(m.timestamp);
                const prefix = \`\${sensorKey}.\${subkey}.measurements\`;
                const values = {};
                for (const k in m) {
                    if (k !== 'timestamp') {
                        values[\`\${prefix}.\${k}\`] = m[k];
                    }
                }
                pushToData(ts, values);
            });
        });
    });

    const data = Object.entries(dataMap).map(([ts, values]) => ({
        ts: Number(ts),
        values: values
    }));

    const url = "https://thingsboard.hardwario.com/api/v1/" + accesstoken + '/telemetry';
    return {
        method: "POST",
        url: url,
        header: {
            "Content-Type": "application/json"
        },
        data: data
    };
}`} />

---

---

## Krok 5: Přiřaďte zařízení ke konektoru {#step-5-assign-devices-to-connector}

Sjeďte níž a zvolte, která zařízení (s odpovídajícím tagem) se mají připojit.  
Na levé straně uvidíte **příchozí data** ze zařízení.  
Na pravé straně uvidíte **transformovaná data** odesílaná do ThingsBoardu.


![ThingsBoard - přiřazení zařízení ke konektoru](../../../../../apps/thingsboard/images/thingsboard-cloud-7.png)

---

Až bude všechno správně nastavené, měla by data z vašeho zařízení začít do ThingsBoardu plynout automaticky.

:::tip
Data si můžete otestovat tak, že si své zařízení otevřete v ThingsBoardu a zkontrolujete, jestli se proměnné aktualizují v reálném čase. Najdete je po kliknutí na zařízení na kartě **Latest Telemetry**.
:::

![Thingsboard - Latest Telemetry](../../../../../apps/thingsboard/images/thingsboard-device-6.png)

## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete další pomoc nebo vizuální ukázku postupu popsaného v tomto návodu, podívejte se na [videonávod](https://docs.hardwario.com/apps/videos-apps/thingsboard-cloud-connection).
:::
