import React, { useEffect } from "react";
import { Card, CardsContainer } from "../../styles/Styles";
import CountUp from "react-countup";
import { AxiosResponse } from "axios";

type Props = {
  countryStatus: AxiosResponse<any, any> | undefined;
  isLoading: boolean;
};

export const Cards = ({ countryStatus, isLoading }: Props) => {
  const lastUpdated = new Date(countryStatus?.data.lastUpdate).toDateString();
  return (
    <>
      <CardsContainer>
        <Card beforeColor="#8283ff">
          <p className="header">Infected</p>
          <CountUp
            className="number"
            start={0}
            duration={1.25}
            end={countryStatus?.data.confirmed.value}
            separator=","
          ></CountUp>
          <span className="date">{isLoading ? "Loading..." : lastUpdated}</span>
          <p className="text">Number of active cases of COVID-19</p>
        </Card>
        <Card beforeColor="#92fc92">
          <p className="header">Recovered</p>
          <CountUp
            className="number"
            start={0}
            duration={1.25}
            end={countryStatus?.data.recovered.value}
            separator=","
          ></CountUp>

          <span className="date">{isLoading ? "Loading..." : lastUpdated}</span>
          <p className="text">Number of active cases of COVID-19</p>
        </Card>
        <Card beforeColor="#de858f">
          <p className="header">Deaths</p>
          <CountUp
            className="number"
            start={0}
            duration={1.25}
            end={countryStatus?.data.deaths.value}
            separator=","
          ></CountUp>

          <span className="date">{isLoading ? "Loading..." : lastUpdated}</span>
          <p className="text">Number of active cases of COVID-19</p>
        </Card>
      </CardsContainer>
    </>
  );
};
