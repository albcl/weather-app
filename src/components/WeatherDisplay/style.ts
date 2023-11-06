import styled from "styled-components";

export const Panel = styled.article<{ isLoading: boolean }>`
  display: grid;
  gap: 1rem;
  justify-content: center;
  justify-items: center;
  grid-template-rows: repeat(2, 25%) 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  flex: 1;
  min-width: 300px;
  min-height: 600px;

  opacity: ${(props) => (props.isLoading ? ".2" : "1")};
  transition: opacity 0.15s linear;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const CurrentTemperature = styled.h1`
  position: relative;
  font-size: 7rem;
  font-weight: 100;
  color: #f7a300;
  margin: 0;

  &:after {
    content: "ºC";
    font-size: 2rem;
    position: absolute;
    font-weight: bolder;
  }
`;

export const FeelsLike = styled.h4`
  margin: 0;
`;

export const Details = styled.section`
  display: flex;
  height: 100%;
  width: 100%;

  ul {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: grid;
      justify-items: start;
      grid-template-columns: 1fr 1fr;
      font-size: 1.2rem;
    }
  }
`;

export const Value = styled.span`
  display: flex;
  align-items: center;
`;

export const ScaleIcon = styled.span<{ color: string | undefined }>`
  background-color: ${(props) => props.color ?? "transparent"};
  width: 1rem;
  height: 1rem;
  border-radius: 50px;
  margin-right: 0.5rem;
`;
