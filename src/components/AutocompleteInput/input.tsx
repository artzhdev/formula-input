import React, { useState, useEffect } from "react";
import * as SC from "./styled";
import { useAutocomplete } from "../../hooks/useAutocomplete";
import { useFormulas } from "../../hooks/useFormulas";
import { IFormula } from "../../models/formula";

function getAutocompleteSuggestions(
  input: string,
  formulas: IFormula[],
): string[] {
  const tokens = input
    .split(/([+\-*\/^()])/)
    .filter((token) => token.trim() !== "");

  if (tokens.length === 0 || tokens.every((token) => token.trim() === "")) {
    return [];
  }

  if (tokens.length > 0 && tokens[0].trim() === "") {
    tokens.shift();
  }

  let lastToken = tokens[tokens.length - 1].trim();

  if (lastToken && /^[a-zA-Z]+$/.test(lastToken)) {
    return formulas
      .filter((formula) =>
        formula.name.toLowerCase().startsWith(lastToken.toLowerCase()),
      )
      .map((formula) => formula.name);
  }

  return [];
}

const AutocompleteInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (newValue: string) => void;
}) => {
  const { suggestions, error, isLoading } = useAutocomplete();
  const { formulas } = useFormulas();
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      const filtered = getAutocompleteSuggestions(value, [
        ...formulas,
        ...suggestions,
      ]);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [value, suggestions]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading suggestions</div>;

  const handleSuggestionClick = (suggestion: string) => {
    const tokens = value.split(/([+\-*\/^()])/);
    let prefix = "";
    for (let i = tokens.length - 1; i >= 0; i--) {
      if (!/^[+\-*\/^()]/.test(tokens[i])) {
        prefix = tokens.slice(0, i).join("");
        break;
      }
    }

    const newValue = prefix + suggestion;
    onChange(newValue);
  };

  return (
    <SC.Container>
      <SC.DropdownInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Formula value"}
      />
      {filteredSuggestions.length > 0 && (
        <SC.SuggestionsList>
          {filteredSuggestions.map((suggestion: string, index) => (
            <SC.SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SC.SuggestionItem>
          ))}
        </SC.SuggestionsList>
      )}
    </SC.Container>
  );
};

export default AutocompleteInput;
