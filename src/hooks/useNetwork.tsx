import axios, {
  type AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { useEffect, useState } from "react";

interface ReqHook<T> {
  data: T | null;
  options?: AxiosRequestConfig;
  loading: boolean;
  error: unknown | AxiosError | null;
  onRefetch: () => Promise<void>;
}

// Should be moved to a lib file and config with interceptors, would be overkill here.
// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const nytimesapikey = "PrahXFIItbtPnEqzDancuCdJItdMtUHO";
const guardianapikey = "38ed4779-52a7-4d65-957c-23c1b5ba170b";

const newYorkTimesArticlesUrl = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${nytimesapikey}`;

const theGuardianAPiUrl = `https://content.guardianapis.com/search?&page-size=20&show-fields=thumbnail&api-key=${guardianapikey}`;

export default function useNetwork<T>(
  endPoint: string,
  options = {}
): ReqHook<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown | AxiosError | null>(null);

  const handleFetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res: AxiosResponse<T> = await axios.get(endPoint, {
        headers: { "x-api-key": "38b137ee8e90405d93db3c058c0ad4ff" },
        ...options,
      });
      setData(res.data);
      setLoading(false);
      setError(null);
    } catch (err: unknown | AxiosError) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [endPoint]);

  return { data, loading, error, onRefetch: handleFetchData };
}
