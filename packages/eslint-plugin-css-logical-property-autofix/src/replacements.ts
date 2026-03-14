// CSS physical-to-logical replacement mappings
// Runtime: bun

// Physical CSS properties → Logical CSS properties (52 mappings)
const PROPERTIES_REPLACEMENTS = new Map<string, string>([
  // Inset (top/right/bottom/left → inset-block/inline-start/end)
  ["top", "inset-block-start"],
  ["right", "inset-inline-end"],
  ["bottom", "inset-block-end"],
  ["left", "inset-inline-start"],

  // Size (width/height → inline-size/block-size)
  ["width", "inline-size"],
  ["height", "block-size"],
  ["min-width", "min-inline-size"],
  ["min-height", "min-block-size"],
  ["max-width", "max-inline-size"],
  ["max-height", "max-block-size"],

  // Contain intrinsic size
  ["contain-intrinsic-width", "contain-intrinsic-inline-size"],
  ["contain-intrinsic-height", "contain-intrinsic-block-size"],

  // Margin
  ["margin-top", "margin-block-start"],
  ["margin-right", "margin-inline-end"],
  ["margin-bottom", "margin-block-end"],
  ["margin-left", "margin-inline-start"],

  // Padding
  ["padding-top", "padding-block-start"],
  ["padding-right", "padding-inline-end"],
  ["padding-bottom", "padding-block-end"],
  ["padding-left", "padding-inline-start"],

  // Border shorthand
  ["border-top", "border-block-start"],
  ["border-right", "border-inline-end"],
  ["border-bottom", "border-block-end"],
  ["border-left", "border-inline-start"],

  // Border color
  ["border-top-color", "border-block-start-color"],
  ["border-right-color", "border-inline-end-color"],
  ["border-bottom-color", "border-block-end-color"],
  ["border-left-color", "border-inline-start-color"],

  // Border style
  ["border-top-style", "border-block-start-style"],
  ["border-right-style", "border-inline-end-style"],
  ["border-bottom-style", "border-block-end-style"],
  ["border-left-style", "border-inline-start-style"],

  // Border width
  ["border-top-width", "border-block-start-width"],
  ["border-right-width", "border-inline-end-width"],
  ["border-bottom-width", "border-block-end-width"],
  ["border-left-width", "border-inline-start-width"],

  // Border radius
  ["border-top-left-radius", "border-start-start-radius"],
  ["border-top-right-radius", "border-start-end-radius"],
  ["border-bottom-right-radius", "border-end-end-radius"],
  ["border-bottom-left-radius", "border-end-start-radius"],

  // Overflow
  ["overflow-x", "overflow-inline"],
  ["overflow-y", "overflow-block"],

  // Overscroll behavior
  ["overscroll-behavior-x", "overscroll-behavior-inline"],
  ["overscroll-behavior-y", "overscroll-behavior-block"],

  // Scroll margin
  ["scroll-margin-top", "scroll-margin-block-start"],
  ["scroll-margin-right", "scroll-margin-inline-end"],
  ["scroll-margin-bottom", "scroll-margin-block-end"],
  ["scroll-margin-left", "scroll-margin-inline-start"],

  // Scroll padding
  ["scroll-padding-top", "scroll-padding-block-start"],
  ["scroll-padding-right", "scroll-padding-inline-end"],
  ["scroll-padding-bottom", "scroll-padding-block-end"],
  ["scroll-padding-left", "scroll-padding-inline-start"],
]);

// Physical CSS values → Logical CSS values (6 property groups)
const PROPERTY_VALUES_REPLACEMENTS = new Map<
  string,
  Record<string, string>
>([
  ["text-align", { left: "start", right: "end" }],
  ["float", { left: "inline-start", right: "inline-end" }],
  ["clear", { left: "inline-start", right: "inline-end" }],
  ["resize", { horizontal: "inline", vertical: "block" }],
  ["caption-side", { left: "inline-start", right: "inline-end" }],
  ["box-orient", { horizontal: "inline-axis", vertical: "block-axis" }],
]);

// Physical CSS units → Logical CSS units (10 mappings)
const UNIT_REPLACEMENTS = new Map<string, string>([
  // Standard viewport units
  ["vw", "vi"],
  ["vh", "vb"],

  // Dynamic viewport units
  ["dvw", "dvi"],
  ["dvh", "dvb"],

  // Small viewport units
  ["svw", "svi"],
  ["svh", "svb"],

  // Large viewport units
  ["lvw", "lvi"],
  ["lvh", "lvb"],

  // Container query units
  ["cqw", "cqi"],
  ["cqh", "cqb"],
]);

export {
  PROPERTIES_REPLACEMENTS,
  PROPERTY_VALUES_REPLACEMENTS,
  UNIT_REPLACEMENTS,
};
