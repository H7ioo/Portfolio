import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { TrackType } from "../../Context";
import {
  BackButton,
  BoxContainer,
  FlexContainer,
  SongDataContainer,
  SongLyricsContainer,
} from "../../styles/Styles";
import styles from "./index.module.scss";
type LyricsState = {
  track?: Required<TrackType>["track_list"][0]["track"];
  lyrics?: {
    lyrics_body: string;
  };
};

const fetchLyrics = (track_id: number) => {
  // https://fast-dawn-89938.herokuapp.com
  // https://cors-anywhere.herokuapp.com
  return axios.get(
    `https://fast-dawn-89938.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}
    &apikey=${import.meta.env.VITE_MM_KEY}`
  );
};

const fetchSongData = (track_id: number) => {
  // https://fast-dawn-89938.herokuapp.com
  // https://cors-anywhere.herokuapp.com
  return axios.get(
    `https://fast-dawn-89938.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${track_id}
    &apikey=${import.meta.env.VITE_MM_KEY}`
  );
};

export const Lyrics = () => {
  const [lyrics, setLyrics] = useState<LyricsState>({});
  const params = useParams();
  const navigate = useNavigate();
  const { data: lyricsData, isLoading: lyricsLoading } = useQuery(
    ["Lyrics", params.id],
    () => fetchLyrics(parseInt(params?.id!)),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setLyrics((prevState) => ({
          ...prevState,
          lyrics: data?.data.message.body.lyrics,
        }));
      },
    }
  );
  const { data: songData, isLoading: songLoading } = useQuery(
    ["SongData", params.id],
    () => fetchSongData(parseInt(params?.id!)),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setLyrics((prevState) => ({
          ...prevState,
          track: data?.data.message.body.track,
        }));
      },
    }
  );

  return (
    <>
      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      <h1 className={styles.headingLyrics}>Lyrics</h1>
      {lyricsLoading || songLoading ? (
        <FlexContainer justifyContent="center">
          <ScaleLoader color="#006ffe" speedMultiplier={0.7} />
        </FlexContainer>
      ) : (
        <>
          <SongLyricsContainer flexDirection="column">
            <div className="heading">
              <span>{lyrics?.track?.album_name} by</span>{" "}
              {lyrics.track?.artist_name}
            </div>
            <div className="lyrics">{lyrics?.lyrics?.lyrics_body}</div>
          </SongLyricsContainer>
          <SongDataContainer flexDirection="column">
            <div>
              <span>Album ID:</span> {lyrics?.track?.album_id}
            </div>
            <div>
              <span>Song Genre:</span>{" "}
              {lyrics?.track?.primary_genres.music_genre_list.length
                ? lyrics?.track?.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : "UNKNOWN"}
            </div>
            <div>
              <span>Explicit Words:</span>{" "}
              {lyrics?.track?.explicit === 0 ? "No" : "Yes"}
            </div>
            <div>
              <span>Release Date:</span>{" "}
              {new Date(lyrics?.track?.updated_time!).toLocaleDateString()}
            </div>
          </SongDataContainer>
        </>
      )}
    </>
  );
};
