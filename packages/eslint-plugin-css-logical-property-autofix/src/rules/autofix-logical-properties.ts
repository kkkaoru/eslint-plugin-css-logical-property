// ESLint CSS logical properties rule - enforces logical CSS properties with autofix
// Runtime: bun

import type { CSSRuleDefinition, CSSSyntaxElement } from "@eslint/css";
import { PROPERTIES_REPLACEMENTS } from "../replacements.ts";

interface AutofixLogicalPropertiesOptions {
  allowProperties?: string[];
}

type MessageIds = "notLogicalProperty";
type Options = [AutofixLogicalPropertiesOptions];

const rule: CSSRuleDefinition<{
  RuleOptions: Options;
  MessageIds: MessageIds;
}> = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description:
        "Enforce the use of logical CSS properties instead of physical ones",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowProperties: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allowProperties: [] }],
    messages: {
      notLogicalProperty:
        "Expected logical property '{{replacement}}' instead of '{{property}}'.",
    },
  },
  create: (context) => ({
    Declaration(node, parent: CSSSyntaxElement): void {
      if (parent?.type === "SupportsDeclaration") return;

      const replacement = PROPERTIES_REPLACEMENTS.get(node.property);
      const isAllowed = context.options[0].allowProperties?.includes(
        node.property,
      );
      if (!replacement || isAllowed) return;
      /* v8 ignore next */
      if (!node.loc) return;

      context.report({
        loc: node.loc,
        messageId: "notLogicalProperty",
        data: { property: node.property, replacement },
        fix: (fixer) =>
          fixer.replaceText(
            node,
            context.sourceCode
              .getText(node)
              .replace(node.property, replacement),
          ),
      });
    },
  }),
};

export default rule;
export type { AutofixLogicalPropertiesOptions };
