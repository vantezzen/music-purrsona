import { z } from "zod";

export const TargetMusicFeaturesSchema = z.object({
  acousticness: z.number(),
  danceability: z.number(),
  energy: z.number(),
  instrumentalness: z.number(),
  liveness: z.number(),
  loudness: z.number(),
  speechiness: z.number(),
  tempo: z.number(),
  valence: z.number(),
});

export const TrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  artists: z.string(),
  audioFeatures: TargetMusicFeaturesSchema,
});

export const TrackListSchema = z.array(TrackSchema);

export type Track = z.infer<typeof TrackSchema>;
export type TrackList = z.infer<typeof TrackListSchema>;
export type TargetMusicFeatures = z.infer<typeof TargetMusicFeaturesSchema>;
