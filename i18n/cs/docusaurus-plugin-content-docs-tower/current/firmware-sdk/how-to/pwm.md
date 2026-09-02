---
slug: how-to-pwm
title: "How To: PWM"
description: "Pulzně šířková modulace (PWM) je metoda, jak z digitálního výstupu mikrokontroléru vytvořit signál podobný analogovému. Dosahuje toho rychlým přepínáním pinu s různým poměrem logické HIGH a LOW úrovně. Tento poměr se nazývá duty cycle (střída)."
---
import Image from '@theme/IdealImage';

[**Pulzně šířková modulace (PWM)**](https://en.wikipedia.org/wiki/Pulse-width_modulation) je metoda, jak z digitálního výstupu mikrokontroléru vytvořit signál podobný analogovému. Dosahuje toho rychlým přepínáním pinu s různým poměrem logické **HIGH** a **LOW** úrovně. Tento poměr se nazývá **duty cycle** (střída).

V **pinoutu modulu Core** si ověřte, které piny **podporují PWM**.

Jako PWM piny lze použít 9 pinů:
```c showLineNumbers
  TWR_PWM_P0
  TWR_PWM_P1
  TWR_PWM_P2
  TWR_PWM_P3
  TWR_PWM_P6
  TWR_PWM_P7
  TWR_PWM_P8
  TWR_PWM_P12
  TWR_PWM_P14
```

## Odkazy {#references}
- [**PWM SDK Module**](https://sdk.hardwario.com/group__twr__pwm.html)
- Ukázka v repozitáři na GitHubu

## Duty cycle {#duty-cycle}

Duty cycle určuje, jak dlouho má být pin ve stavu HIGH; změnou tohoto čísla dosáhnete různých výstupů podobných analogovým.

Hodnoty jsou v rozsahu `0-255`, kde `0` znamená vždy **LOW** a `255` znamená vždy **HIGH**

:::info

Toto je jen jednoduchý příklad, který zapne PWM signál na výstupech **P6, P7 a P8**.
Každý výstup má jiný **duty cycle**: 180, 210 a 255.

:::

<details>
<summary>
<b>
Ukázka kódu pro spuštění PWM na pinech
</b>
</summary>
<p>

  ```c showLineNumbers
  void application_init()
  {
      twr_pwm_init(TWR_PWM_P6);
      twr_pwm_set(TWR_PWM_P6, 180);
      twr_pwm_enable(TWR_PWM_P6);

      twr_pwm_init(TWR_PWM_P7);
      twr_pwm_set(TWR_PWM_P7, 210);
      twr_pwm_enable(TWR_PWM_P7);

      twr_pwm_init(TWR_PWM_P8);
      twr_pwm_set(TWR_PWM_P8, 255);
      twr_pwm_enable(TWR_PWM_P8);
  }
  ```

</p>
</details>
