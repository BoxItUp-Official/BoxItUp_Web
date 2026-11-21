# React Bits components

Animated components from [React Bits](https://reactbits.dev) (MIT + Commons Clause:
free to use in this site; the components themselves may not be resold). They are
copied in as source, so we own and edit them.

| File | Used for | Changes from the original |
|---|---|---|
| `BlurText.tsx` | Hero headline, word by word out of a blur | `segments` (a run can carry its own class, for the orange accent word), Chinese animates per character but only breaks lines after clause punctuation, `as` for the element, plain text once finished so edges stay crisp |
| `ShinyText.tsx` | Hero badge, a soft sheen | none |
| `ClickSpark.tsx` | Sparks when the hero buttons are clicked | none |
| `ScrollReveal.tsx` | About section lead, lights up word by word as you scroll | `as` for the element; the CSS keeps only layout so the site's type applies |
| `CountUp.tsx` | Impact figure counts up when it comes into view | none |

Dependencies: `motion` (BlurText, CountUp) and `gsap` (ScrollReveal).
Every effect respects the reader's "reduce motion" setting.
