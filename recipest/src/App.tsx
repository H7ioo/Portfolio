// # Styled Components
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./Layouts";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Container } from "./styles/Styles";
import { Theme } from "./styles/Themes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const NoPath = ["login", "sign-up"];
  const checkPathname = NoPath.some((path) => location.pathname.includes(path));
  return (
    <div className="App">
      <Theme>
        <GlobalStyles />
        {!checkPathname ? <Navbar /> : null}
        <Routes>
          <Route path="/(home|users|widgets)/" element={<></>} />
        </Routes>
        {!checkPathname ? <Footer /> : null}
      </Theme>
    </div>
  );
}

export default App;
