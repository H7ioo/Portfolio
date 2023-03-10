import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { FiMusic } from "react-icons/fi";
import { TrackContext, TrackType } from "../../Context";
import {
  BoxContainer,
  FlexContainer,
  SearchInput,
  SubmitSearchButton,
} from "../../styles/Styles";
export const Search = () => {
  const track = useContext(TrackContext);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const fetchSearch = () => {
    // https://fast-dawn-89938.herokuapp.com
    // https://cors-anywhere.herokuapp.com
    return axios.get(
      `https://fast-dawn-89938.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
        searchRef?.current?.value
      }&page_size=10&page=1&s_track_rating=desc&s_artist_rating=desc
    &apikey=${import.meta.env.VITE_MM_KEY}`
    );
  };

  const { data: searchData, refetch } = useQuery(
    ["search", searchRef?.current?.value],
    fetchSearch,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess(data) {
        track.setTrack((prevState: TrackType) => ({
          ...prevState,
          heading: "Search Results",
          track_list: data.data.message.body.track_list,
        }));
      },
    }
  );

  const handleClick = () => {
    refetch();
  };
  return (
    <>
      <BoxContainer
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="5px"
        margin="0 0 20px 0"
      >
        <FlexContainer alignItems="center" gap="10px">
          <FiMusic size={34} />
          <h1>Search For A Song</h1>
        </FlexContainer>
        <p>Get the lyrics for any track</p>
        <SearchInput ref={searchRef} placeholder="Song title..." />
        <SubmitSearchButton onClick={handleClick}>
          Get Track Lyrics
        </SubmitSearchButton>
      </BoxContainer>
    </>
  );
};
