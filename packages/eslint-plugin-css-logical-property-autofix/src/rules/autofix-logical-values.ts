// ESLint CSS logical values rule - enforces logical CSS values with autofix
// Runtime: bun

import type { CSSRuleDefinition, CSSSyntaxElement } from "@eslint/css";
import { PROPERTY_VALUES_REPLACEMENTS } from "../replacements.ts";

interface AutofixLogicalValuesOptions {
  allowValues?: string[];
}

type MessageIds = "notLogicalValue";
type Options = [AutofixLogicalValuesOptions];

const rule: CSSRuleDefinition<{
  RuleOptions: Options;
  MessageIds: MessageIds;
}> = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description:
        "Enforce the use of logical CSS values instead of physical ones",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowValues: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allowValues: [] }],
    messages: {
      notLogicalValue:
        "Expected logical value '{{replacement}}' instead of '{{value}}'.",
    },
  },
  create: (context) => ({
    Declaration(node, parent: CSSSyntaxElement): void {
      if (parent?.type === "SupportsDeclaration") return;

      const valueReplacements = PROPERTY_VALUES_REPLACEMENTS.get(
        node.property,
      );
      if (!valueReplacements || node.value.type !== "Value") return;

      const firstChild = node.value.children[0];
      if (!firstChild || firstChild.type !== "Identifier") return;

      const nodeValue = firstChild.name;
      const isAllowed = context.options[0].allowValues?.includes(nodeValue);
      const replacement = isAllowed
        ? undefined
        : valueReplacements[nodeValue];
      if (!replacement) return;
      /* v8 ignore next */
      if (!firstChild.loc) return;

      context.report({
        loc: firstChild.loc,
        messageId: "notLogicalValue",
        data: { value: nodeValue, replacement },
        fix: (fixer) => fixer.replaceText(firstChild, replacement),
      });
    },
  }),
};

export default rule;
export type { AutofixLogicalValuesOptions };
