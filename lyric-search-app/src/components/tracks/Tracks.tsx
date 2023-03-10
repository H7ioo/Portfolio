import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { TrackContext, TrackType } from "../../Context";
import { FlexContainer, TrackGrid } from "../../styles/Styles";
import styles from "./index.module.scss";
import { Track } from "./Track";

const fetchTopTracks = () => {
  // https://fast-dawn-89938.herokuapp.com
  // https://cors-anywhere.herokuapp.com
  return axios.get(
    `https://fast-dawn-89938.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
      import.meta.env.VITE_MM_KEY
    }`
  );
};

export const Tracks = () => {
  const track = useContext(TrackContext);
  const { data: top10TracksData, isLoading } = useQuery(
    ["Top10Tracks"],
    fetchTopTracks,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        track.setTrack((prevState: TrackType) => ({
          ...prevState,
          track_list: data.data.message.body.track_list,
        }));
      },
    }
  );

  return (
    <>
      <h1 className={styles.heading}>{track.track.heading}</h1>
      <TrackGrid>
        {isLoading ? (
          <FlexContainer justifyContent="center">
            <ScaleLoader color="#006ffe" speedMultiplier={0.7} />
          </FlexContainer>
        ) : (
          track?.track?.track_list?.map((track) => {
            return <Track key={track.track.track_id} track={track.track} />;
          })
        )}
      </TrackGrid>
    </>
  );
};
