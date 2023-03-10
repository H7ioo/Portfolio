import styled from "styled-components";
import { FlexProps, WrapperProps } from "./styleTypes";

export const Container = styled.div`
  max-width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  min-height: 100vh;
`;

export const Wrapper = styled.div<WrapperProps>`
  margin: ${(props) => props.margin};
`;

export const FlexContainer = styled.div<FlexProps>`
  margin: ${(props) => props.margin};
  display: flex;
  gap: ${(props) => props.gap}px;
  justify-content: ${(props) => props.justifyContent};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
`;

export const HeaderText = styled.h1`
  /* color: ${(props) => props.theme.textColor}; */
`;

export const ThemeButton = styled.button`
  background-color: #57545450;
  border-radius: 15px;
  padding: 15px 30px;
  font-weight: 500;
`;

export const InputField = styled.input`
  width: 100%;
`;

export const NotesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
`;

export const NoteCard = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 15px;
  background-color: ${(props) => props.theme.takeNoteCardColor};
  box-shadow: 3px 3px 5px 0px #000000b5;
  gap: 5px;
`;

export const NoteButton = styled(ThemeButton)`
  padding: 10px 15px;
  box-shadow: 1px 1px 3px 0px #000000b5;
`;

export const DoneNoteCard = styled(NoteCard)`
  background-color: ${(props) => props.theme.doneCardBackgroundColor};
`;
