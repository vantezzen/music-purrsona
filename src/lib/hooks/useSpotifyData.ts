import SpotifyWebApi from "spotify-web-api-node";
import useSessionToken from "./useSessionToken";
import { useEffect, useState } from "react";
import { useAuthGateState } from "@/components/auth/authGateState";
import { fetchSpotifyWithLimitHandling } from "../fetchSpotifyWithLimitHandling";

const spotify = new SpotifyWebApi();

interface Response<T> {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}

type SpotifyDataHookOptions = {
  dependencies: any[];
  skip: boolean;
  updateFrequency?: number;
  clearOnUpdate?: boolean;
};
const defaultOptions: SpotifyDataHookOptions = {
  dependencies: [],
  skip: false,
  clearOnUpdate: false,
};

export default function useSpotifyData<ReturnType, ResponseDataType>(
  callback: (spotify: SpotifyWebApi) => Promise<Response<ResponseDataType>>,
  enhancer?: (data: ResponseDataType) => ReturnType,
  options?: Partial<SpotifyDataHookOptions>
): ReturnType | undefined {
  const { dependencies, skip } = { ...defaultOptions, ...options };

  const token = useSessionToken();
  const [data, setData] = useState<ReturnType | undefined>(undefined);
  const setNeedsReauth = useAuthGateState((state) => state.setNeedsReauth);

  const updateData = () => {
    if (options?.clearOnUpdate) setData(undefined);

    fetchSpotifyWithLimitHandling(() => callback(spotify))
      .then((data) => {
        setData(
          enhancer ? enhancer(data.body) : (data.body as unknown as ReturnType)
        );
      })
      .catch((err: any) => {
        console.error(err);
        if (err.statusCode === 401) {
          console.log("Token expired, reauthing");
          setNeedsReauth(true);
        }
      });
  };

  useEffect(() => {
    if (!token || data || skip) return;
    spotify.setAccessToken(token);
    updateData();
  }, [token, ...dependencies, skip]);

  useEffect(() => {
    if (!skip && data && token) {
      updateData();
    }
  }, [...dependencies, skip]);

  useEffect(() => {
    if (options?.updateFrequency && token && !skip) {
      const interval = setInterval(updateData, options.updateFrequency);
      return () => clearInterval(interval);
    }
  }, [token, ...dependencies, skip, options?.updateFrequency]);

  return data;
}
