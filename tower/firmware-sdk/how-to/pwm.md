---
slug: how-to-pwm
title: "How To: PWM"
---
import Image from '@theme/IdealImage';

[**Pulse Width Modulation (PWM)**](https://en.wikipedia.org/wiki/Pulse-width_modulation) is a method to create an analog-like signal from the microcontroller's digital output. It achieves that by fast toggling of the pin with a different ratio of logic **HIGH** and **LOW**. This ratio is called the **duty cycle**.

Please check the **Core Module pinout** to see which pins **allow PWM**.

9 pins can be used as PWM pins:
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

## References
- [**PWM SDK Module**](https://sdk.hardwario.com/group__twr__pwm.html)
- GitHub Repository Example

## Duty Cycle

The duty cycle stands for how long should the pin be in the HIGH state, by changing this number you will achieve different analog-like outputs.

The values range from `0-255` where `0` means always **LOW** and `255` means always **HIGH**.

:::info

This is just a simple example that will enable PWM signal on **P6, P7 and P8** outputs.
Every output has a different **duty cycle**: 180, 210 and 255.

:::

<details>
<summary>
<b>
Run PWM on Pins Code Example
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
