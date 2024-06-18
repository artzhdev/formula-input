import React from "react";
import * as SC from "./styled";
import { IFormula } from "../../models/formula";
import { Error } from "../Formula/styled";
import { useFormulas } from "../../hooks/useFormulas";

const calculateFormula = (
  formula: string,
  formulas: IFormula[],
): number | string => {
  const evaluateExpression = (expression: string | number): number | string => {
    try {
      const expString = expression.toString();
      const tokens = expString
        .split(/([+\-*\/^()])/)
        .map((token) => token.trim())
        .filter((token) => token !== "");

      const evaluatedTokens = tokens.map((token) => {
        const numberValue = parseFloat(token);
        if (!isNaN(numberValue)) {
          return numberValue;
        }

        if (/[+\-*\/^()]/.test(token)) {
          return token;
        }

        const foundFormula = formulas.find(
          (f) => f.name.trim() === token.trim(),
        );
        if (foundFormula?.value) {
          return evaluateExpression(foundFormula.value);
        } else {
          //@ts-ignore
          throw new Error(`Variable '${token}' not found`);
        }
      });

      let result: number | string = evaluatedTokens[0] as number | string;
      for (let i = 1; i < evaluatedTokens.length; i += 2) {
        if (evaluatedTokens[i] === undefined) {
          i++;
        } else {
          const operator = evaluatedTokens[i] as string;
          const operand = evaluatedTokens[i + 1] as number;

          switch (operator) {
            case "+":
              result = (result as number) + operand;
              break;
            case "-":
              result = (result as number) - operand;
              break;
            case "*":
              result = (result as number) * operand;
              break;
            case "/":
              result = (result as number) / operand;
              break;
            default:
              //@ts-ignore
              throw new Error(`Unknown operator '${operator}'`);
          }
        }
      }

      return result;
    } catch (error) {
      console.error("Error during expression evaluation:", error);
      return "error";
    }
  };

  try {
    const cleanedFormula = formula.trim();

    const result = evaluateExpression(cleanedFormula);
    return result;
  } catch (error) {
    console.error("Error during formula evaluation:", error);
    return "error";
  }
};

const FormulaList = () => {
  const { formulas, suggestions, removeFormula } = useFormulas();

  return (
    <SC.FormulaList>
      {formulas.map((formula) => (
        <SC.FormulaItem key={formula.id}>
          <SC.FormulaText>
            {formula.name}: {formula.value}
          </SC.FormulaText>
          <SC.FormulaResult>
            {calculateFormula(formula.value, suggestions)}
          </SC.FormulaResult>
          <SC.RemoveButton onClick={() => removeFormula(formula.name)}>
            Remove
          </SC.RemoveButton>
        </SC.FormulaItem>
      ))}
    </SC.FormulaList>
  );
};

export default FormulaList;
