import useSpotifyData from "./useSpotifyData";

export default function useSpotifyUser() {
  return useSpotifyData(
    (spotify) => spotify.getMe(),
    (data) => data
  );
}
