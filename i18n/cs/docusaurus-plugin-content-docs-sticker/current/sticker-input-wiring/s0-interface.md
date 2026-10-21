---
slug: s0-interface
title: Rozhraní S0 (impulzní výstup)
---

# Rozhraní S0 (impulzní výstup) {#s0-interface-pulse-output}

**Rozhraní S0** je standardizovaný impulzní výstup, který používá mnoho **měřičů energií a médií**: elektroměry, plynoměry, vodoměry a měřiče tepla. Každý impulz odpovídá definovanému množství spotřebované energie nebo média; zařízení STICKER Input tyto impulzy počítá, takže spotřebu lze odečítat na dálku přes síť LoRaWAN.

## Zapojení {#wiring}

Výstup S0 měřiče připojte ke vstupu A nebo B jako bezpotenciálový kontakt: přepínač DIP S1 v poloze **2+4** pro vstup A nebo **5+7** pro vstup B (viz [Zapojení vstupů STICKER Input](./index.md#dip-switch-s1-settings)).

## Konfigurace {#configuration}

Firmware v2.0.0 a novější počítá impulzy S0 v režimu vstupu `pulse`:

```
config cap-gpio-mode inputs
config cap-gpio-input-a pulse
```

Pro vstup B použijte `cap-gpio-input-b pulse`.

## Jak se impulzy počítají {#how-pulses-are-counted}

- Impulzy S0 trvají nejméně 30 ms, proto je vstup v režimu `pulse` počítá v přerušení, a ne při běžném dotazování vstupů každých 100 ms.
- Funguje libovolná polarita: úroveň vstupu při startu se bere jako klidová a každý odklon od ní se počítá jako jeden impulz, ať měřič linku stahuje k zemi, nebo ji budí do kladné úrovně.
- Hrana se započítá, jen pokud byl vstup před ní 20 ms stabilní, takže zákmity kontaktu se započítají jen jednou.
- Vstup v režimu `pulse` počítá vždy: nastavení `input-a-counter` / `input-b-counter` se ignoruje.
- Vstup v režimu `pulse` nemá stav: nevyvolává stavový alarm a hodnota `input_a_is_active` / `input_b_is_active` zůstává `false`.

Celkový počet přichází v telemetrii jako `input_a_count` / `input_b_count`. Kanál čítače (`input-a-count` / `input-b-count`) lze také ukládat do historie a použít v pravidle alarmu RATE, například *100 impulzů za 15 sekund* (`hi 100 dwell 15`).

:::warning Známé omezení

Čítač impulzů zatím ve firmwaru v2.0.0 nebyl otestován na hardwaru (časování impulzů a zákmity v obou polaritách).

:::
