# eslint-plugin-css-logical-property-autofix

ESLint plugin that enforces CSS logical properties, values, and units — with **autofix** support. Built on top of [`@eslint/css`](https://github.com/eslint/css).

## Why this plugin?

The built-in `@eslint/css` rule `prefer-logical-properties` detects physical CSS properties but **does not provide autofix**. This plugin fills that gap by automatically replacing physical properties, values, and units with their logical equivalents via `eslint --fix`.

## Installation

```bash
npm install -D eslint-plugin-css-logical-property-autofix @eslint/css eslint
```

## Usage

### Recommended config (all rules enabled)

```js
// eslint.config.js
import css from "@eslint/css";
import cssLogicalPropertyAutofix from "eslint-plugin-css-logical-property-autofix";

export default [
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
  },
  cssLogicalPropertyAutofix.configs.recommended,
];
```

### Manual configuration

```js
// eslint.config.js
import css from "@eslint/css";
import cssLogicalPropertyAutofix from "eslint-plugin-css-logical-property-autofix";

export default [
  {
    files: ["**/*.css"],
    plugins: {
      css,
      "css-logical-property-autofix": cssLogicalPropertyAutofix,
    },
    language: "css/css",
    rules: {
      "css-logical-property-autofix/autofix-logical-properties": "error",
      "css-logical-property-autofix/autofix-logical-values": "warn",
      "css-logical-property-autofix/autofix-logical-units": "warn",
    },
  },
];
```

### Running autofix

```bash
eslint --fix "**/*.css"
```

## Rules

### `autofix-logical-properties`

Detects physical CSS properties and autofixes them to their logical equivalents.

```css
/* Before */
.box {
  width: 100px;
  margin-left: 10px;
  border-top: 1px solid;
  top: 0;
}

/* After (autofix) */
.box {
  inline-size: 100px;
  margin-inline-start: 10px;
  border-block-start: 1px solid;
  inset-block-start: 0;
}
```

#### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `allowProperties` | `string[]` | `[]` | Physical properties to allow without reporting |

```js
"css-logical-property-autofix/autofix-logical-properties": ["error", {
  allowProperties: ["width", "height"]
}]
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

### `autofix-logical-values`

Detects physical CSS values and autofixes them to their logical equivalents.

```css
/* Before */
.text { text-align: left; }
.float { float: right; }
.resize { resize: horizontal; }

/* After (autofix) */
.text { text-align: start; }
.float { float: inline-end; }
.resize { resize: inline; }
```

#### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `allowValues` | `string[]` | `[]` | Physical values to allow without reporting |

```js
"css-logical-property-autofix/autofix-logical-values": ["error", {
  allowValues: ["left"]
}]
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

### `autofix-logical-units`

Detects physical CSS units and autofixes them to their logical equivalents.

```css
/* Before */
.box {
  block-size: 100vh;
  inline-size: 50vw;
}

/* After (autofix) */
.box {
  block-size: 100vb;
  inline-size: 50vi;
}
```

#### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `allowUnits` | `string[]` | `[]` | Physical units to allow without reporting |

```js
"css-logical-property-autofix/autofix-logical-units": ["error", {
  allowUnits: ["vh", "vw"]
}]
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

## Comparison with `@eslint/css` built-in rule

| Feature | `@eslint/css` `prefer-logical-properties` | This plugin |
|---|---|---|
| Detect physical properties | Yes | Yes |
| Detect physical values | Yes | Yes |
| Detect physical units | Yes | Yes |
| **Autofix** | **No** | **Yes** |
| Granular rule control | Single rule | 3 separate rules |
| Allow-list per category | `allowProperties`, `allowUnits` | `allowProperties`, `allowValues`, `allowUnits` |

## Requirements

- ESLint >= 10.0.0
- @eslint/css >= 1.0.0

## License

MIT
