---
slug: mac-envelope
title: Obálka MAC protokolu FLAP
description: "Obálka MAC protokolu FLAP: 64bitový autentizační kód zprávy s klíčem claim token, sériové číslo, formát raw a base64 a bezpečnostní vlastnosti."
---

# Obálka MAC protokolu FLAP {#flap-mac-envelope}

Obálka MAC (nastavení zařízení `flap-hash`) chrání [**paket FLAP**](transfers.md#flap-packet) 64bitovým **autentizačním kódem zprávy** (MAC) s klíčem claim token zařízení a identifikuje zařízení jeho sériovým číslem. Všechna vícebajtová pole jsou ve formátu **big-endian**.

```
+-------------+-----------------+-------------+----------------------+
| MAC tag     | Serial number   | Header      | Data                 |
| 8 bytes     | 4 bytes         | 2 bytes     | 0 to 494 bytes       |
+-------------+-----------------+-------------+----------------------+
 \___ MAC envelope ___________/ \___ FLAP packet _________________/
```

| Pole | Velikost | Popis |
|---|---|---|
| **Tag MAC** | 8 B | Autentizační kód zprávy přes zbytek datagramu, viz [**Autentizační kód zprávy**](#message-authentication-code) |
| **Sériové číslo** | 4 B | Sériové číslo zařízení HARDWARIO jako 32bitové celé číslo bez znaménka, například `2159017985` je `80 b0 00 01` |
| **Paket FLAP** | 2 až n B | Hlavička a data |

Cloud odpovídá ve stejné obálce. Obsahuje sériové číslo zařízení a tag MAC spočítaný stejným klíčem, takže zařízení může ověřit, že odpověď pochází z Cloudu a patří jemu.

| Formát | Port UDP | Používá |
|---|---|---|
| Raw | 5002 | Zařízení postavená na nRF9160 nebo nRF9151 |
| Base64 | 5003 | CHESTER (nRF9160) |

## Autentizační kód zprávy {#message-authentication-code}

Tag MAC chrání integritu a autenticitu sériového čísla a paketu FLAP. Jde o **secret-prefix MAC** nad SHA-256, jehož 256bitový výstup se zkrátí na 64 bitů pomocí XOR foldingu:

```
digest = SHA-256( key || serial_number || header || data )
tag[i] = digest[i] ^ digest[i + 8] ^ digest[i + 16] ^ digest[i + 24]      for i = 0..7
```

- **key** je šestnáctibajtový **claim token** zařízení. Zařízení ho zobrazí jako 32 hexadecimálních znaků příkazem shellu `info claim-token` a stejná hodnota se zadává při přidání zařízení do HARDWARIO Cloud.
- **serial_number**, **header** a **data** jsou bajty přesně tak, jak jsou v datagramu, tedy vše za tagem MAC.

Příjemce spočítá tag z přijatých bajtů a porovná ho s přijatým tagem. Zařízení musí navíc ověřit, že sériové číslo v odpovědi je jeho vlastní.

### Příklad {#example}

S claim tokenem `98a8856ba6534bd5212176b22f3acbb3` a sériovým číslem `2159017985` (`0x80b00001`) se potvrzení se sekvenčním číslem 20 (hlavička `0x2014`, bez dat) spočítá takto:

```
SHA-256 input  98a8856ba6534bd5212176b22f3acbb3 80b00001 2014
MAC tag        478acfb86b963d2b
Datagram       478acfb86b963d2b 80b00001 2014
Base64         R4rPuGuWPSuAsAABIBQ=
```

## Raw a base64 {#raw-and-base64}

Na portu 5002 se obálka MAC posílá surově (raw) jako binární data. Na portu 5003 se celá obálka MAC včetně tagu MAC zakóduje do base64 (RFC 4648, standardní abeceda s doplňováním `=`) a odešle jako text ASCII. Příjemce base64 nejprve dekóduje zpět na binární obálku a tu pak zpracuje stejně jako na portu 5002. Cloud odpovídá ve stejném formátu.

Formát base64 používá jen zařízení CHESTER, jehož modem nRF9160 se ovládá příkazy AT. V datovém režimu AT ukončuje data sekvence `+++`, takže binární data, která ji náhodou obsahují, by se usekla. Zařízení CHESTER proto posílá každý datagram jako řetězcový parametr příkazu `AT#XSEND`, který nese jen text ASCII, a base64 umožní bezpečně přenést binární obálku jako text.

## Bezpečnostní vlastnosti {#security-properties}

- **Autentizace a autorizace.** Jako zařízení s tímto sériovým číslem se přijme jen odesílatel, který zná claim token, a zařízení přijme odpověď jen od Cloudu, který ho zná.
- **Integrita.** Bez claim tokenu nikdo nevytvoří nový paket ani nezmění existující tak, aby ho Cloud nebo zařízení přijaly. Šance uhodnout platný tag je 1 ku 2<sup>64</sup> na pokus.
- **Ochrana proti opakování.** Sekvenční číslo je pokryté kódem MAC, takže ho bez claim tokenu nikdo nezmění. Cloud přijme jen další očekávané sekvenční číslo: přehraný paket se starým sekvenčním číslem ignoruje a zopakování posledního paketu zpracuje jako opakované odeslání (viz [**Přenosy**](transfers.md#retransmission-and-duplicates)).
- **Bez šifrování.** Data putují jako prostý text. Kde je potřeba důvěrnost, použijte privátní APN s tunelem IPsec (viz [**Zabezpečení platformy**](/chester/platform-security/platform-security)) nebo [**obálku DTLS**](dtls-envelope.md).
- **Claim token držte v tajnosti.** Je zároveň důkazem vlastnictví při přidání zařízení do Cloudu i klíčem MAC.

## Limity velikosti {#size-limits}

| Formát | Maximální datagram | Data na fragment downlinku |
|---|---|---|
| Raw (port 5002) | 508 B | 494 B |
| Base64 (port 5003) | 508 znaků | 360 B |

- Zařízení by mělo i své uplinkové datagramy držet do 508 bajtů. Zařízení CHESTER posílá v base64 nejvýše 360 bajtů dat na fragment.
- Cloud přijme datagram o velikosti až 1024 bajtů. Delší datagram se ořízne a neprojde ověřením.

## Nastavení zařízení {#device-settings}

Zařízení postavená na nRF9151 vybírají obálku a server příkazem shellu `cloud config`. Příkaz `cloud config show` vypíše všechna nastavení cloudu. Pro obálku MAC platí:

| Parametr | Výchozí hodnota | Popis |
|---|---|---|
| `protocol` | `flap-hash` | Obálka: `flap-hash` vybere obálku MAC |
| `addr` | `157.245.24.13` | Výchozí IP adresa serveru |
| `addr2`, `addr3` | Prázdné | Druhá a třetí IP adresa serveru, prázdná hodnota znamená nepoužito |
| `port-flap-hash` | `5002` | Port UDP pro obálku MAC |
| `failover` | `3` | Počet po sobě jdoucích neúspěšných pokusů, po kterých zařízení přepne na další adresu, `0` přepínání vypne |

Výchozí hodnoty adres serveru, portů a `failover` pocházejí z voleb Kconfig firmwaru, takže je lze změnit při sestavení firmwaru.

Přepnutí zařízení na obálku MAC v shellu zařízení:

```
cloud config protocol flap-hash
config save
```

Zařízení CHESTER používá vždy obálku MAC jako text base64. Jeho port (výchozí 5003) se nastavuje při sestavení firmwaru a adresu serveru nastavuje příkaz `lte config addr`.

## Neplatné obálky {#invalid-envelopes}

Cloud neodpoví na neplatné base64, obálku kratší než 14 bajtů, sériové číslo 0 ani na sériové číslo, které nezná.

Pokud je sériové číslo známé, ale tag MAC nesouhlasí, Cloud odpoví žádostí o reset (viz [**Reset**](transfers.md#reset)).
