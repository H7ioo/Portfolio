import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type countryType = {
  countries?: boolean;
  country?: string;
};

const fetchCountry = ({ countries, country }: countryType) => {
  if (countries) {
    return axios.get("https://covid19.mathdro.id/api/countries");
  }
  if (country === "Global") {
    return axios.get("https://covid19.mathdro.id/api");
  }
  return axios.get(`https://covid19.mathdro.id/api/countries/${country}`);
};

export const useFetchCountries = ({
  countries = false,
  country = "",
}: countryType) => {
  let fetchParam = "country";
  if (countries) {
    fetchParam = "countries";
  }
  return useQuery(
    [fetchParam, country],
    () => fetchCountry({ countries, country }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: countries || country.length > 1 ? true : false,
    }
  );
};
