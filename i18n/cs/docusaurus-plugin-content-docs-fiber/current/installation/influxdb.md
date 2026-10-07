---
title: Instalace InfluxDB
---

# Instalace InfluxDB {#install-influxdb}

K dispozici na zařízení FIBER i FIBER Lite.

1. Stáhněte klíč GPG repozitáře **InfluxData** a dřív, než mu začnete důvěřovat, ověřte jeho otisk (fingerprint):

   ```sh
   curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
   gpg --show-keys --with-fingerprint --with-colons ./influxdata-archive.key 2>&1 \
     | grep -q '^fpr:\+24C975CBA61A024EE1B631787C3D57159FC2F927:$' \
     && echo "fingerprint OK"
   ```

1. Přidejte klíč a repozitář:

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   cat influxdata-archive.key | gpg --dearmor | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
   rm influxdata-archive.key
   echo 'deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main' | sudo tee /etc/apt/sources.list.d/influxdata.list
   ```

1. Aktualizujte seznam balíčků a nainstalujte **InfluxDB 2.x** včetně nástroje CLI:

   ```sh
   sudo apt update
   sudo apt install -y influxdb2 influxdb2-cli
   sudo systemctl enable --now influxdb
   ```

1. Neinteraktivně vytvořte organizaci, bucket a token API:

   ```sh
   influx setup --username fiber --password '<choose a password>' \
     --org fiber --bucket fiber --token "$(openssl rand -hex 32)" --force
   ```

   :::tip

   `openssl rand -hex 32` vygeneruje náhodný 64znakový token, takže si žádný nemusíte vymýšlet.
   Hned potom ho vypište příkazem `influx auth list`. Token i zvolené heslo si uložte;
   budete je znovu potřebovat pro flow v Node-RED výše a pro datový zdroj v Grafaně níže.

   :::
