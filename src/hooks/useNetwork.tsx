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
