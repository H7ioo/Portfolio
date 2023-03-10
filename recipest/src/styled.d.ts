// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: React.CSSProperties["color"];
      text: React.CSSProperties["color"];
      link: React.CSSProperties["color"];
      primary: React.CSSProperties["color"];
    };
    borderRadius: {
      light: React.CSSProperties["borderRadius"];
      heavy: React.CSSProperties["borderRadius"];
      circle: React.CSSProperties["borderRadius"];
    };
    elevation: {
      dp01: React.CSSProperties["color"];
      dp02: React.CSSProperties["color"];
      dp03: React.CSSProperties["color"];
      dp04: React.CSSProperties["color"];
      dp06: React.CSSProperties["color"];
      dp08: React.CSSProperties["color"];
      dp12: React.CSSProperties["color"];
      dp16: React.CSSProperties["color"];
      dp24: React.CSSProperties["color"];
    };
    shadow: {
      dp00: React.CSSProperties["boxShadow"];
      dp01: React.CSSProperties["boxShadow"];
      dp02: React.CSSProperties["boxShadow"];
      dp03: React.CSSProperties["boxShadow"];
      dp04: React.CSSProperties["boxShadow"];
      dp06: React.CSSProperties["boxShadow"];
      dp08: React.CSSProperties["boxShadow"];
      dp12: React.CSSProperties["boxShadow"];
      dp16: React.CSSProperties["boxShadow"];
      dp24: React.CSSProperties["boxShadow"];
    };
    transition: {
      fast: React.CSSProperties["transition"];
      slow: React.CSSProperties["transition"];
    };
    padding: {
      containedButton: React.CSSProperties["padding"];
      outlinedButton: React.CSSProperties["padding"];
      textButton: React.CSSProperties["padding"];
    };
    outline: React.CSSProperties["color"];
  }
}
