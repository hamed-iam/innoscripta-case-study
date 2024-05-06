import axios from "axios";

type NewsParam = {
  q?: string;
  from?: string;
  to?: string;
  category?: string;
  sources?: string;
};

const fetchNewApi = async (params: NewsParam) => {
  try {
    const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
      // headers: {
      //   "x-api-key": "38b137ee8e90405d93db3c058c0ad4ff",
      // },
      params: {
        "api-key": "38b137ee8e90405d93db3c058c0ad4ff",
        ...params,
      },
    });
    return data;
  } catch (error) {
    return console.error(error);
  }
};

const fetchNytimes = async (params: NewsParam) => {
  try {
    const { data } = await axios.get(
      "https://api.nytimes.com/svc/news/v3/content/all/all.json",
      {
        params: {
          "api-key": "PrahXFIItbtPnEqzDancuCdJItdMtUHO",
          ...params,
        },
      }
    );
    return data;
  } catch (error) {
    return console.error(error);
  }
};

const fetchGuardians = async (params: NewsParam) => {
  try {
    const { data } = await axios.get(
      "https://content.guardianapis.com/search?&page-size=20&show-fields=thumbnail",
      {
        params: {
          "api-key": "38ed4779-52a7-4d65-957c-23c1b5ba170b",
          ...params,
        },
      }
    );
    return data;
  } catch (error) {
    return console.error(error);
  }
};

export { fetchNewApi, fetchNytimes, fetchGuardians };
