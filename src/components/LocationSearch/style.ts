import styled from "styled-components";

export const Header = styled.header`
  position: relative;
  display: flex;
`;

export const Form = styled.form`
  min-width: 20rem;
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #bfd6df;
  color: inherit;
  padding: 0 0.75rem;
  width: 72%;
  transition: border-bottom 0.15s linear;

  &:focus {
    border-bottom-color: black;
  }
`;

export const LoadingIcon = styled.span`
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(-360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  width: 100%;
  bottom: -4rem;
  opacity: 1;
  background: #f55100;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  animation: slideIn 0.15s ease-out;

  @keyframes slideIn {
    0% {
      opacity: 0;
      bottom: -3rem;
    }
    100% {
      opacity: 1;
      bottom: -4rem;
    }
  }
`;
