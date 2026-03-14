// ESLint CSS logical units rule - enforces logical CSS units with autofix
// Runtime: bun

import type { CSSRuleDefinition } from "@eslint/css";
import { UNIT_REPLACEMENTS } from "../replacements.ts";

interface AutofixLogicalUnitsOptions {
  allowUnits?: string[];
}

type MessageIds = "notLogicalUnit";
type Options = [AutofixLogicalUnitsOptions];

const rule: CSSRuleDefinition<{
  RuleOptions: Options;
  MessageIds: MessageIds;
}> = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description:
        "Enforce the use of logical CSS units instead of physical ones",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowUnits: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allowUnits: [] }],
    messages: {
      notLogicalUnit:
        "Expected logical unit '{{replacement}}' instead of '{{unit}}'.",
    },
  },
  create: (context) => ({
    Dimension(node): void {
      const replacement = UNIT_REPLACEMENTS.get(node.unit);
      const isAllowed = context.options[0].allowUnits?.includes(node.unit);
      if (!replacement || isAllowed) return;
      /* v8 ignore next */
      if (!node.loc) return;

      context.report({
        loc: node.loc,
        messageId: "notLogicalUnit",
        data: { unit: node.unit, replacement },
        fix: (fixer) =>
          fixer.replaceText(
            node,
            context.sourceCode
              .getText(node)
              .replace(node.unit, replacement),
          ),
      });
    },
  }),
};

export default rule;
export type { AutofixLogicalUnitsOptions };
