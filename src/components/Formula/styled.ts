import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: none;
  background: #007bff;
  border-radius: 4px;
  outline: none;
  color: white;
  margin-top: 10px;

  &:active {
    outline: 4px solid #79b7ff;
  }
`;

export const Error = styled.div`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: none;
  box-sizing: border-box;
  text-align: center;
  background: #9a0000;
  border-radius: 4px;
  outline: none;
  color: white;
  margin-top: 10px;
`;
