import { Navbar } from "./components/layout/Navbar";
import { Search } from "./components/tracks/Search";
import { Tracks } from "./components/tracks/Tracks";
import { Context } from "./Context";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Container } from "./styles/Styles";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Lyrics } from "./components/tracks/Lyrics";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Context>
          <GlobalStyles />
          <Navbar />
          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Search />
                    <Tracks />
                  </>
                }
              />
              <Route
                path="/lyrics/track/:id"
                element={
                  <>
                    <Lyrics />
                  </>
                }
              />
            </Routes>
          </Container>
        </Context>
      </QueryClientProvider>
    </div>
  );
}

export default App;
