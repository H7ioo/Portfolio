import React, { useEffect, useState } from "react";
import { useFetchCountries } from "../../hooks/useFetchCountries";
import { CountrySelect } from "../../styles/Styles";

type Countries = {
  name: string;
};

type Props = {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
};

export const CountryPicker = ({ setCountry }: Props) => {
  const { data: countries } = useFetchCountries({ countries: true });

  const handleSelectingCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setCountry(country);
  };

  return (
    <>
      <CountrySelect onChange={(e) => handleSelectingCountry(e)}>
        <>
          <option value="Global">Global</option>
          {countries?.data.countries.map((country: Countries) => {
            return (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            );
          })}
        </>
      </CountrySelect>
    </>
  );
};
