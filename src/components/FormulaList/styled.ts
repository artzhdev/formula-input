import styled from "styled-components";

export const FormulaList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const FormulaItem = styled.li`
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormulaText = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const FormulaResult = styled.div`
  color: #666;
`;

export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;
