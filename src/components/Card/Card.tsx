import styled, { css } from "styled-components";

const commonStyle = css`
  display: flex;
  flex-direction: column;
  align-self: center;
  background: #fff;
  height: 100vh;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0px 2px 10px 2px rgb(0 0 0 / 25%);
  overflow: scroll;
`;

export const CurrentWeather = styled.article`
  ${commonStyle}
  width: 400px;
  max-height: 850px;
  min-height: 750px;
  z-index: 1;
`;

export const Forecast = styled.article`
  ${commonStyle}
  text-align: center;
  max-height: 800px;
  min-height: 500px;
  padding-left: 7rem;
  margin-left: -4rem;
`;
