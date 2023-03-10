import styled, { css } from "styled-components";
import { FlexContainerType } from "./StylesTypes";
import { Link } from "react-router-dom";

const GRAY_COLOR = "#2d3338";
const BLUE_COLOR = "#006ffe";
const BORDER_COLOR = "#00000042";
export const FlexContainer = styled.div<FlexContainerType>`
  margin: ${(props) => props.margin};
  gap: ${(props) => props.gap};
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  padding: ${(props) => props.padding};
`;

export const NavbarContainer = styled(FlexContainer)`
  width: 100%;
  height: 35px;
  background-color: ${GRAY_COLOR};
  color: white;
  font-weight: 500;
`;

export const Container = styled.div`
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const BoxContainer = styled(FlexContainer)`
  border: 1.5px solid ${BORDER_COLOR};
  border-radius: 5px;
  padding: 15px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  border-color: ${BORDER_COLOR};
  border-width: 1px;
  margin-bottom: 5px;
  &:focus {
    border-color: #0000006f;
  }
`;

const Box = css`
  width: 100%;
  text-align: center;
  padding: 5px;
  font-weight: 500;
  background-color: ${BLUE_COLOR};
  color: white;
  border-radius: 5px;
`;

export const SubmitSearchButton = styled.button`
  ${Box}
`;

export const TrackGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

export const TrackContainer = styled(BoxContainer)`
  font-weight: 500;
  & .bolder {
    font-weight: 700;
  }
  > div {
    height: 100%;
  }
`;

export const TrackButton = styled(Link)`
  ${Box}
  background-color: ${GRAY_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export const BackButton = styled.button`
  background-color: ${GRAY_COLOR};
  color: white;
  border-radius: 5px;
  padding: 3px 10px;
  margin-bottom: 10px;
`;

export const SongLyricsContainer = styled(BoxContainer)`
  margin-bottom: 10px;
  padding: 0;
  .heading {
    background-color: #f7f7f7;
    border-bottom: 1px solid ${BORDER_COLOR};
    padding: 15px;
    font-size: 1.1rem;
    > span {
      font-weight: 600;
      color: #000;
    }
    font-weight: 500;
    color: #000000b2;
  }
  .lyrics {
    padding: 15px;
  }
`;

export const SongDataContainer = styled(BoxContainer)`
  padding: 0;
  > div {
    padding: 15px;
    :not(:last-child) {
      border-bottom: 1px solid ${BORDER_COLOR};
    }
    > span {
      font-weight: 600;
    }
  }
`;
