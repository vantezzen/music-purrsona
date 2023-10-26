export async function fetchSpotifyWithLimitHandling<T>(
  callback: () => Promise<T>
) {
  const fetchData = async (): Promise<T> => {
    try {
      return await callback();
    } catch (e: any) {
      if (e.statusCode === 429) {
        let retryTimeSec = 1;

        const retryAfter = e.headers["Retry-After"];
        if (retryAfter) {
          retryTimeSec = parseInt(retryAfter);
        }

        await new Promise((resolve) =>
          setTimeout(resolve, retryTimeSec * 1000)
        );
        return await fetchData();
      } else {
        throw e;
      }
    }
  };

  return await fetchData();
}
