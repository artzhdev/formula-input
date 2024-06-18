import React, { useState } from "react";
import * as SC from "./styled";
import AutocompleteInput from "../AutocompleteInput/input";
import { useFormulas } from "../../hooks/useFormulas";
import FormulaList from "../FormulaList/input";

const Formula = () => {
  const { addFormula } = useFormulas();
  const [newFormulaName, setNewFormulaName] = useState("");
  const [newFormulaValue, setNewFormulaValue] = useState("");
  const [error, setError] = useState<string>("");

  const handleAddFormula = () => {
    if (newFormulaName.length && newFormulaValue.length) {
      addFormula({
        name: newFormulaName,
        value: newFormulaValue,
        id: ~~(Math.random() * 1e8),
      });
      setNewFormulaName("");
      setNewFormulaValue("");
      setError("");
    } else {
      setError("Name or value is empty");
    }
  };

  return (
    <SC.Wrapper>
      <h2>Formulas</h2>
      <div>
        <SC.Container>
          <SC.Input
            type="text"
            value={newFormulaName}
            onChange={(e) => setNewFormulaName(e.target.value)}
            placeholder={"Formula name"}
          />
        </SC.Container>
        <AutocompleteInput
          value={newFormulaValue}
          onChange={setNewFormulaValue}
        />
        {error.length > 0 && <SC.Error>Error: {error}</SC.Error>}
        <SC.Button onClick={handleAddFormula}>Add Formula</SC.Button>
      </div>
      <FormulaList />
    </SC.Wrapper>
  );
};

export default Formula;
