import React from "react";
import { TrackType } from "../../Context";
import {
  FlexContainer,
  TrackButton,
  TrackContainer,
} from "../../styles/Styles";
import { BiPlay, BiAlbum } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
type TrackProps = {
  track: Required<TrackType>["track_list"][0]["track"];
};
import { Link } from "react-router-dom";

export const Track = ({ track }: TrackProps) => {
  return (
    <TrackContainer flexDirection="column" gap="7.5px">
      <p className="artist">{track.artist_name}</p>
      <FlexContainer justifyContent="center" flexDirection="column">
        <FlexContainer alignItems="center">
          <BiPlay size={20} />
          <span>
            <span className="bolder">Track:</span> {track.track_name}
          </span>
        </FlexContainer>
        <FlexContainer alignItems="center" gap={"4px"}>
          <BiAlbum size={16} />
          <span>
            <span className="bolder">Album:</span> {track.album_name}
          </span>
        </FlexContainer>
      </FlexContainer>
      <TrackButton to={`lyrics/track/${track.track_id}`}>
        <IoIosArrowForward size={16} /> View Lyrics
      </TrackButton>
    </TrackContainer>
  );
};
