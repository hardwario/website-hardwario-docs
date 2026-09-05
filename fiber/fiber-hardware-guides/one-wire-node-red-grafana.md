---
title: Reading 1-Wire Sensors into Grafana
---

# Reading 1-Wire Sensors into Grafana

**FIBER only**: FIBER Lite has no 1-Wire hub (see [What's Different](/fiber/fiber-lite/introduction#whats-different)).

FIBER's eight isolated 1-Wire ports appear in Linux as eight independent bus masters, so a probe
on port 3 is visible at a different path than one on port 5. Reading them needs no driver setup
and no configuration, because the kernel already exposes them.

## How the eight ports are wired

The ports are **not** bit-banged GPIO. They sit behind a **DS2482** I2C-to-1-Wire bridge at
address `0x18` on bus `i2c-10`, which the `ds2482` kernel module drives. Each physical port gets
its own master:

```sh
ls /sys/bus/w1/devices/
```

```text
w1_bus_master1  w1_bus_master2  w1_bus_master3  w1_bus_master4
w1_bus_master5  w1_bus_master6  w1_bus_master7  w1_bus_master8
```

`w1_bus_masterN` corresponds to physical port *N*. The bridge and the `ds2482`, `wire` and
`w1_therm` modules are part of the shipped image, so there is nothing to install or enable.

## Finding which ports have probes

Every detected sensor also appears as a symlink directly under `/sys/bus/w1/devices/`, named by
its family code and unique ROM ID (`28-…` is the DS18B20 family):

```sh
ls -d /sys/bus/w1/devices/28-*
```

To see which port each one is on, ask the masters:

```sh
for m in /sys/bus/w1/devices/w1_bus_master*; do
  echo "$(basename "$m"): $(cat "$m/w1_master_slave_count") -> $(cat "$m/w1_master_slaves" | tr '\n' ' ')"
done
```

```text
w1_bus_master1: 0 ->
w1_bus_master2: 0 ->
w1_bus_master3: 1 -> 28-00000bc830e0
w1_bus_master4: 0 ->
...
```

An empty port reports `0` and lists nothing. A port with a sensor that has gone missing keeps its
last known ROM ID but stops updating, see [Troubleshooting](#troubleshooting) below.

## Reading a temperature

Each sensor exposes a `temperature` file in **milli-degrees Celsius**:

```sh
cat /sys/bus/w1/devices/28-00000bc830e0/temperature
```

```text
24625
```

That is 24.625 °C. Divide by 1000.

The raw `w1_slave` file gives the same value plus the CRC status, which is what you want when
diagnosing a flaky probe or long cable:

```sh
cat /sys/bus/w1/devices/28-00000bc830e0/w1_slave
```

```text
8a 01 4b 46 7f ff 06 10 2c : crc=2c YES
8a 01 4b 46 7f ff 06 10 2c t=24625
```

`crc=2c YES` means the reading is trustworthy. A `NO` means the value on the second line is
garbage and must be discarded, not averaged in.

:::note

Reading these files triggers a conversion on the bus, which takes up to ~750 ms per sensor. The
FIBER application is already sampling the same probes every 2 seconds, so keep any polling of
your own modest. A few seconds between reads is plenty, and it keeps the bus free for the
application that drives the alarms.

:::

## Getting the readings into Node-RED

A single `exec` node is enough, with no contrib package and no extra dependency. Point it at a small
shell command and let Node-RED parse the output.

Use an **inject** node on a repeating interval → an **exec** node running:

```sh
for d in /sys/bus/w1/devices/28-*; do echo "$(basename $d) $(cat $d/temperature)"; done
```

then a **function** node to turn the lines into one message per sensor:

```javascript
// exec output: one "28-<romid> <milli-degC>" line per sensor
var out = [];
(msg.payload || "").trim().split("\n").forEach(function (line) {
    var parts = line.trim().split(/\s+/);
    if (parts.length !== 2) { return; }
    var milli = parseInt(parts[1], 10);
    if (isNaN(milli)) { return; }
    out.push({
        measurement: "onewire",
        tags: { sensor: parts[0] },
        fields: { temperature: milli / 1000 }
    });
});
return [{ payload: out }];
```

Feed that into an **influxdb batch** node and the readings land as a `onewire` measurement tagged
by ROM ID, ready to graph.

:::tip

Tag by **ROM ID**, not by port number. The ROM ID is burned into the probe, so a sensor keeps its
identity in the database even if someone moves it to another port, which is exactly what you
want when comparing a week of history.

:::

## Storing and visualizing the readings

Node-RED, InfluxDB and Grafana are part of the same shared stack on both variants, see
[Install Node-RED](/fiber/installation/node-red), [Install InfluxDB](/fiber/installation/influxdb)
and [Install Grafana](/fiber/installation/grafana). The flow above therefore writes to InfluxDB on
the same device, and Grafana reads it back locally.

A time series of `temperature` grouped by the `sensor` tag is the usual starting point for a
panel.

:::note

Check that the stack is present before wiring the flow up:

```sh
command -v influxd grafana-server node-red
```

If those come back empty, the unit is running an image built before they were included. Point the
flow at another host that has them. FIBER runs **Mosquitto**, so publishing the readings to MQTT
and subscribing from that machine is the path of least resistance.

:::

## Troubleshooting

**A port shows `0` slaves.** Nothing is detected on that physical port. Check the probe's wiring
first. 1-Wire needs data and ground, and a parasitic-power probe also needs a pull-up. The ports
are isolated from each other, so a fault on one does not disturb the others.

**`crc=... NO`.** The sensor answered but the frame was corrupt. Usually cable length,
interference, or a marginal connection. Discard those samples rather than averaging them in.

**A sensor disappears after being unplugged.** The kernel removes the device node once it stops
answering. Code that reads a fixed path must tolerate the file vanishing, not crash on it.
