import { Cards, ChartComponent, CountryPicker } from "./components";
import { createGlobalStyle } from "styled-components";
import { Container, FlexContainer } from "./styles/Styles";
import CovidPNG from "./assets/covid.png";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useRef, useState } from "react";
import { useFetchCountries } from "./hooks/useFetchCountries";
import { AxiosResponse } from "axios";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    font-weight: 500;
  }
  body { 
    background-color: #f9f9f9;
  }
  
`;

function App() {
  const isMounted = useRef(false);
  const [country, setCountry] = useState("Global");
  const {
    data: countryStatus,
    refetch,
    isLoading,
  } = useFetchCountries({
    country: country,
  });

  useEffect(() => {
    refetch();
  }, [country]);

  return (
    <div className="App">
      <GlobalStyles />
      <Container>
        <FlexContainer justifyContent="center" margin="0 0 5px">
          <img src={CovidPNG} alt="" />
        </FlexContainer>
        <Cards countryStatus={countryStatus} isLoading={isLoading} />
        <CountryPicker setCountry={setCountry} />
        <ChartComponent country={country} countryStatus={countryStatus} />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
