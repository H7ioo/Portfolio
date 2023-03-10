// import original module declarations
import React from "react";
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    primary: React.CSSProperties["color"];
    checkedColor: React.CSSProperties["color"];
    backgroundColor: React.CSSProperties["color"];
    cardBackgroundColor: React.CSSProperties["color"];
    textColor: React.CSSProperties["color"];
    inactiveColor: React.CSSProperties["color"];
    hoverColor: React.CSSProperties["color"];
    checkColor: React.CSSProperties["color"];
    shadowColor: React.CSSProperties["color"];
    plusColor: React.CSSProperties["color"];
  }
}
