# biome-plugin-css-prefer-logical-property

Biome plugin that detects physical CSS properties, values, and units and suggests their logical equivalents. Built with [GritQL](https://biomejs.dev/linter/plugins/) for [Biome](https://biomejs.dev) v2.0+.

> **Note:** This plugin is diagnostic-only (detect and warn). Autofix is not yet supported by Biome's plugin system. For autofix support, see [eslint-plugin-css-logical-property-autofix](https://www.npmjs.com/package/eslint-plugin-css-logical-property-autofix).

## Installation

```bash
npm install -D biome-plugin-css-prefer-logical-property @biomejs/biome
```

## Usage

Add the plugin to your `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "plugins": [
    "./node_modules/biome-plugin-css-prefer-logical-property/rules/prefer-logical.grit"
  ]
}
```

You can also enable individual rules instead of the combined one:

```json
{
  "plugins": [
    "./node_modules/biome-plugin-css-prefer-logical-property/rules/prefer-logical-properties.grit",
    "./node_modules/biome-plugin-css-prefer-logical-property/rules/prefer-logical-values.grit",
    "./node_modules/biome-plugin-css-prefer-logical-property/rules/prefer-logical-units.grit"
  ]
}
```

Then run:

```bash
biome lint "**/*.css"
```

## Rules

### `prefer-logical-properties.grit`

Detects physical CSS properties and suggests logical alternatives.

```css
/* Warns */
.box {
  width: 100px;        /* Use 'inline-size' */
  margin-left: 10px;   /* Use 'margin-inline-start' */
  border-top: 1px solid; /* Use 'border-block-start' */
  top: 0;              /* Use 'inset-block-start' */
}

/* OK */
.box {
  inline-size: 100px;
  margin-inline-start: 10px;
  border-block-start: 1px solid;
  inset-block-start: 0;
}
```

<details>
<summary>Full property mapping (52 properties)</summary>

| Physical | Logical |
|---|---|
| `top` | `inset-block-start` |
| `right` | `inset-inline-end` |
| `bottom` | `inset-block-end` |
| `left` | `inset-inline-start` |
| `width` | `inline-size` |
| `height` | `block-size` |
| `min-width` | `min-inline-size` |
| `min-height` | `min-block-size` |
| `max-width` | `max-inline-size` |
| `max-height` | `max-block-size` |
| `contain-intrinsic-width` | `contain-intrinsic-inline-size` |
| `contain-intrinsic-height` | `contain-intrinsic-block-size` |
| `margin-top` | `margin-block-start` |
| `margin-right` | `margin-inline-end` |
| `margin-bottom` | `margin-block-end` |
| `margin-left` | `margin-inline-start` |
| `padding-top` | `padding-block-start` |
| `padding-right` | `padding-inline-end` |
| `padding-bottom` | `padding-block-end` |
| `padding-left` | `padding-inline-start` |
| `border-top` | `border-block-start` |
| `border-right` | `border-inline-end` |
| `border-bottom` | `border-block-end` |
| `border-left` | `border-inline-start` |
| `border-top-color` | `border-block-start-color` |
| `border-right-color` | `border-inline-end-color` |
| `border-bottom-color` | `border-block-end-color` |
| `border-left-color` | `border-inline-start-color` |
| `border-top-style` | `border-block-start-style` |
| `border-right-style` | `border-inline-end-style` |
| `border-bottom-style` | `border-block-end-style` |
| `border-left-style` | `border-inline-start-style` |
| `border-top-width` | `border-block-start-width` |
| `border-right-width` | `border-inline-end-width` |
| `border-bottom-width` | `border-block-end-width` |
| `border-left-width` | `border-inline-start-width` |
| `border-top-left-radius` | `border-start-start-radius` |
| `border-top-right-radius` | `border-start-end-radius` |
| `border-bottom-right-radius` | `border-end-end-radius` |
| `border-bottom-left-radius` | `border-end-start-radius` |
| `overflow-x` | `overflow-inline` |
| `overflow-y` | `overflow-block` |
| `overscroll-behavior-x` | `overscroll-behavior-inline` |
| `overscroll-behavior-y` | `overscroll-behavior-block` |
| `scroll-margin-top` | `scroll-margin-block-start` |
| `scroll-margin-right` | `scroll-margin-inline-end` |
| `scroll-margin-bottom` | `scroll-margin-block-end` |
| `scroll-margin-left` | `scroll-margin-inline-start` |
| `scroll-padding-top` | `scroll-padding-block-start` |
| `scroll-padding-right` | `scroll-padding-inline-end` |
| `scroll-padding-bottom` | `scroll-padding-block-end` |
| `scroll-padding-left` | `scroll-padding-inline-start` |

</details>

### `prefer-logical-values.grit`

Detects physical CSS values and suggests logical alternatives.

```css
/* Warns */
.text { text-align: left; }   /* Use 'start' */
.float { float: right; }      /* Use 'inline-end' */
.resize { resize: horizontal; } /* Use 'inline' */

/* OK */
.text { text-align: start; }
.float { float: inline-end; }
.resize { resize: inline; }
```

<details>
<summary>Full value mapping (6 properties)</summary>

| Property | Physical value | Logical value |
|---|---|---|
| `text-align` | `left` | `start` |
| `text-align` | `right` | `end` |
| `float` | `left` | `inline-start` |
| `float` | `right` | `inline-end` |
| `clear` | `left` | `inline-start` |
| `clear` | `right` | `inline-end` |
| `resize` | `horizontal` | `inline` |
| `resize` | `vertical` | `block` |
| `caption-side` | `left` | `inline-start` |
| `caption-side` | `right` | `inline-end` |
| `box-orient` | `horizontal` | `inline-axis` |
| `box-orient` | `vertical` | `block-axis` |

</details>

### `prefer-logical-units.grit`

Detects physical CSS units and suggests logical alternatives.

```css
/* Warns */
.box {
  block-size: 100vh;   /* Use 'vb' */
  inline-size: 50vw;   /* Use 'vi' */
}

/* OK */
.box {
  block-size: 100vb;
  inline-size: 50vi;
}
```

<details>
<summary>Full unit mapping (10 units)</summary>

| Physical | Logical | Description |
|---|---|---|
| `vw` | `vi` | Viewport inline size |
| `vh` | `vb` | Viewport block size |
| `dvw` | `dvi` | Dynamic viewport inline size |
| `dvh` | `dvb` | Dynamic viewport block size |
| `svw` | `svi` | Small viewport inline size |
| `svh` | `svb` | Small viewport block size |
| `lvw` | `lvi` | Large viewport inline size |
| `lvh` | `lvb` | Large viewport block size |
| `cqw` | `cqi` | Container query inline size |
| `cqh` | `cqb` | Container query block size |

</details>

## Comparison with ESLint plugin

| Feature | This plugin (Biome) | eslint-plugin-css-logical-property-autofix |
|---|---|---|
| Detect physical properties | Yes | Yes |
| Detect physical values | Yes | Yes |
| Detect physical units | Yes | Yes |
| Autofix | No (not yet supported by Biome plugins) | **Yes** |
| Configuration | GritQL `.grit` files | ESLint flat config |
| Allow-list options | Not available | `allowProperties`, `allowValues`, `allowUnits` |

## Requirements

- Biome >= 2.0.0

## License

MIT
