import useFormulaStore from "../store/store";
import { useAutocomplete } from "./useAutocomplete";

export const useFormulas = () => {
  const { formulas, addFormula, removeFormula } = useFormulaStore();
  const { suggestions, isLoading } = useAutocomplete();

  return {
    formulas: formulas,
    suggestions: [...formulas, ...suggestions],
    isLoading,
    addFormula,
    removeFormula,
  };
};
