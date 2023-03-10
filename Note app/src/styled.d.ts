import React from "react";
import "styled-components";
interface IPalette {
  main: string;
  contrastText: string;
}
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: React.CSSProperties["color"];
    backgroundColor: React.CSSProperties["color"];
    takeNoteCardColor: React.CSSProperties["color"];
    doneCardBackgroundColor: React.CSSProperties["color"];
  }
}
