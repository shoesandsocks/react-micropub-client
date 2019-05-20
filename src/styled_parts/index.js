import styled from 'styled-components';

const blueGradient = 'linear-gradient(0deg, #369 50%, #389 100%)';

export const ComposerWrap = styled.div`
  padding: 3rem;
  background: ${blueGradient};
  min-height: 95vh;
  display: flex;
  flex-flow: column nowrap;
  transition: 0.6s;
  @media screen and (min-width: 1100px) {
    flex-flow: row nowrap;
  }
`;

export const LoginWrap = styled(ComposerWrap)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

export const LoginForm = styled.form`
  border: 1px solid #eee;
  border-radius: 4px;
  width: 380px;
  padding: 3rem;
  font-size: 1.5rem;
  color: #eee;
  & label {
    display: block;
    margin: 0.25rem auto;
    width: 100%;
  }
  & input {
    display: block;
    inset: none;
    color: #2d2d2d;
    font-size: 1.125rem;
    padding-left: 0.5rem;
    height: 1.75rem;
    width: 100%;
  }
  & button {
    display: block;
    margin-top: 1rem;
    background: none;
    border: 1px solid #eee;
    border-radius: 4px;
    color: #eee;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem 0.625rem 1rem;
    transition: 0.35s;
    &:hover {
      background: #eee;
      color: #2d2d2d;
    }
    /* width: 100%; */
  }
`;

export const Form = styled.form`
  width: 380px;
  background: linear-gradient(
    10deg,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.05) 100%
  );
  padding: 3rem;
  margin: 0 auto 3rem auto;
`;

export const BodyWrap = styled.div`
  width: 100%;
  min-height: 7vh;
`;

export const OutputWrap = styled(Form)`
  & div {
    min-height: 15vh;
    padding: 0.5rem;
    background: #eee;
  }
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
  padding: 0.5rem;
  background: #eee;
  width: 100%;
  font: 1rem Courier, mono;
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

export const PreviewTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: #2d2d2d;
  background: #eee;
  border-bottom: 1x solid #ccc;
  padding: 0;
`;

export const PreviewBody = styled.div`
  width: 95%;
  margin: 0.5rem auto 0 auto;
  padding: 0;
  /* border: 1px solid #999; */
  & p {
    margin: 0.125rem;
  }
`;

export const PreviewTags = styled.div`
  height: 1.25rem;
  background: white;
  color: #2d2d2d;
  font-size: 0.825rem;
`;
