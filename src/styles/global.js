import styled from 'styled-components';

export const DefaultButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #84c698;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 100px;
  min-height: 30px;
  height: auto;
  font-size: 12px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #e6e6e6;
  }
`;
