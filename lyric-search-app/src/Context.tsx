import React, { useState, SetStateAction } from "react";
export type TrackType = {
  heading: string;
  track_list?: [
    {
      track: {
        track_name: string;
        explicit: number;
        track_id: number;
        artist_name: string;
        album_name: string;
        album_id: number;
        updated_time: string;
        primary_genres: {
          music_genre_list: [{ music_genre: { music_genre_name: string } }];
        };
      };
    }
  ];
};
export type TrackContextType = {
  track: TrackType;
  setTrack: React.Dispatch<SetStateAction<TrackType>>;
};

const TrackContextDefaultValues: TrackContextType = {
  track: { heading: "Top 10 Tracks" },
  setTrack: () => false,
};
export const TrackContext = React.createContext<TrackContextType>(
  TrackContextDefaultValues
);
export const Context = ({ children }: { children: React.ReactNode }) => {
  const [track, setTrack] = useState<TrackType>({ heading: "Top 10 Tracks" });
  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  );
};
