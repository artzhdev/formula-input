import { create } from "zustand";
import { IFormula } from "../models/formula";

interface IState {
  formulas: IFormula[];
  addFormula: (formula: IFormula) => void;
  removeFormula: (name: string) => void;
}

const useFormulaStore = create<IState>((set) => ({
  formulas: [],
  addFormula: (formula: IFormula) =>
    set((state: IState) => ({
      formulas: [...state.formulas, formula],
    })),
  removeFormula: (name: string) =>
    set((state: IState) => ({
      formulas: state.formulas.filter((formula) => formula.name !== name),
    })),
}));

export default useFormulaStore;
