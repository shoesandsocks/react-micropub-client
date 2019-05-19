import styled from 'styled-components';

const blueGradient = 'linear-gradient(0deg, #369 50%, #389 100%)';

export const Wrap = styled.div`
  padding: 3rem;
  background: ${({ blue }) => (blue ? blueGradient : '#eee')};
  min-height: 95vh;
`;

export const Form = styled.form`
  max-width: 60vw;
  min-width: 380px;
  background: linear-gradient(
    10deg,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.05) 100%
  );
  padding: 3rem;
  margin: 0 auto;
`;

export const InputLabel = styled.label`
  display: block;
  color: #eee;
  margin-bottom: 0.5rem;
`;

export const InputWrap = styled.input`
  padding: 0.5rem;
  background: #eee;
  width: 100%;
  font: 1rem Arial, Helvetica;
  margin-bottom: 0.5rem;
`;

export const InputTextarea = styled.textarea`
  padding: 0.55rem;
  background: #eee;
  width: 100%;
  font: 1rem Arial, Helvetica;
  margin-bottom: 0.5rem;
`;

export const Btn = styled.button`
  padding: 0.5rem;
  background: #eee;
  border: none;
  width: 25%;
  margin: 1rem auto;
  font: italic 1rem Arial, Helvetica;
`;

export const TagBar = styled.div`
  height: 2rem;
`;

export const TagSpan = styled.span`
  font-size: 0.825rem;
  color: #2d2d2d;
  background-color: #eee;
  border-radius: 0.75rem;
  padding: 0.125rem 1rem 0.25rem 1rem;
  margin: 0.25rem 0.25rem 0.25rem 0;
`;
