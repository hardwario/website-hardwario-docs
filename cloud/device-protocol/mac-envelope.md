---
slug: mac-envelope
title: FLAP MAC Envelope
description: "The MAC envelope of FLAP: a 64-bit message authentication code keyed with the claim token, the serial number, raw and base64 format and security properties."
---

# FLAP MAC Envelope

The MAC envelope (device setting `flap-hash`) protects a [**FLAP packet**](transfers.md#flap-packet) with a 64-bit **message authentication code** (MAC) keyed with the claim token of the device, and identifies the device by its serial number. All multi-byte fields are **big-endian**.

```
+-------------+-----------------+-------------+----------------------+
| MAC tag     | Serial number   | Header      | Data                 |
| 8 bytes     | 4 bytes         | 2 bytes     | 0 to 494 bytes       |
+-------------+-----------------+-------------+----------------------+
 \___ MAC envelope ___________/ \___ FLAP packet _________________/
```

| Field | Size | Description |
|---|---|---|
| **MAC tag** | 8 B | Message authentication code over the rest of the datagram, see [**Message Authentication Code**](#message-authentication-code) |
| **Serial number** | 4 B | HARDWARIO serial number of the device as an unsigned 32-bit integer, for example `2159017985` is `80 b0 00 01` |
| **FLAP packet** | 2 to n B | Header and data |

The Cloud answers in the same envelope. It carries the serial number of the device and a MAC tag computed with the same key, so the device can verify that the response comes from the Cloud and belongs to it.

| Format | UDP port | Used by |
|---|---|---|
| Raw | 5002 | Devices built on the nRF9160 or nRF9151 |
| Base64 | 5003 | CHESTER (nRF9160) |

## Message Authentication Code

The MAC tag protects the integrity and authenticity of the serial number and the FLAP packet. It is a **secret-prefix MAC** over SHA-256 whose 256-bit output is truncated to 64 bits by XOR folding:

```
digest = SHA-256( key || serial_number || header || data )
tag[i] = digest[i] ^ digest[i + 8] ^ digest[i + 16] ^ digest[i + 24]      for i = 0..7
```

- **key** is the 16-byte **claim token** of the device. The device shows it as 32 hexadecimal characters with the `info claim-token` shell command, and the same value is entered when the device is added to HARDWARIO Cloud.
- **serial_number**, **header** and **data** are the bytes exactly as they appear in the datagram, that is everything after the MAC tag.

A receiver computes the tag over the received bytes and compares it with the received tag. The device must also check that the serial number in a response is its own.

### Example

With the claim token `98a8856ba6534bd5212176b22f3acbb3` and the serial number `2159017985` (`0x80b00001`), an acknowledgement with the sequence number 20 (header `0x2014`, no data) is computed as follows:

```
SHA-256 input  98a8856ba6534bd5212176b22f3acbb3 80b00001 2014
MAC tag        478acfb86b963d2b
Datagram       478acfb86b963d2b 80b00001 2014
Base64         R4rPuGuWPSuAsAABIBQ=
```

## Raw and Base64

On port 5002 the MAC envelope is sent raw, as binary data. On port 5003 the whole MAC envelope, including the MAC tag, is encoded as base64 (RFC 4648, standard alphabet with `=` padding) and sent as ASCII text. The receiver first decodes base64 back to the binary envelope and then processes it the same way as on port 5002. The Cloud answers in the same format.

The base64 format is used only by CHESTER, whose nRF9160 modem is controlled by AT commands. In the AT data mode, the sequence `+++` ends the data, so binary data that happens to contain it would be cut off. CHESTER therefore sends each datagram as the string parameter of `AT#XSEND`, which carries ASCII text only, and base64 makes the binary envelope safe to carry as text.

## Security Properties

- **Authentication and authorization.** Only a sender that knows the claim token is accepted as the device with this serial number, and only the Cloud that knows it can answer the device.
- **Integrity.** Without the claim token, nobody can create a new packet or modify an existing one so that the Cloud or the device accepts it. The chance of guessing a valid tag is 1 in 2<sup>64</sup> per attempt.
- **Replay protection.** The sequence number is covered by the MAC, so nobody can change it without the claim token. The Cloud accepts only the next expected sequence number: a replayed packet with an old sequence number is ignored, and a repeat of the last packet is handled as a retransmission (see [**Transfers**](transfers.md#retransmission-and-duplicates)).
- **No encryption.** The data travels in plain text. Where confidentiality is required, use a private APN with an IPsec tunnel (see [**Platform Security**](/chester/platform-security/platform-security)) or the [**DTLS envelope**](dtls-envelope.md).
- **Keep the claim token secret.** It is both the proof of ownership when the device is added to the Cloud and the MAC key.

## Size Limits

| Format | Maximum datagram | Data per downlink fragment |
|---|---|---|
| Raw (port 5002) | 508 B | 494 B |
| Base64 (port 5003) | 508 characters | 360 B |

- A device should keep its uplink datagrams within 508 bytes as well. CHESTER sends at most 360 bytes of data per fragment as base64.
- The Cloud accepts datagrams of up to 1024 bytes. A longer datagram is truncated and fails verification.

## Device Settings

Devices built on the nRF9151 select the envelope and the server with the `cloud config` shell command. `cloud config show` lists all cloud settings. The settings that apply to the MAC envelope:

| Parameter | Default | Description |
|---|---|---|
| `protocol` | `flap-hash` | Envelope: `flap-hash` selects the MAC envelope |
| `addr` | `157.245.24.13` | Default server IP address |
| `addr2`, `addr3` | Empty | Second and third server IP address, empty means unused |
| `port-flap-hash` | `5002` | UDP port for the MAC envelope |
| `failover` | `3` | Consecutive failed attempts before the device switches to the next address, `0` disables switching |

The defaults of the server addresses, the ports and `failover` come from Kconfig options of the firmware, so they can be changed when the firmware is built.

To switch a device to the MAC envelope, run in the device shell:

```
cloud config protocol flap-hash
config save
```

CHESTER always uses the MAC envelope as base64 text. Its port (5003 by default) is set when the firmware is built, and its server address with `lte config addr`.

## Invalid Envelopes

The Cloud does not respond to invalid base64, an envelope shorter than 14 bytes, the serial number 0 or a serial number unknown to the Cloud.

If the serial number is known but the MAC tag does not match, the Cloud answers with a reset request (see [**Reset**](transfers.md#reset)).
