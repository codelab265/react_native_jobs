import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (endPoint, query) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "54601bc948msh37b35064f3eb6e2p1d080cjsna5e95a087dd0",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    params: { ...query },
  };

  const fetchData = async ()=>{
    try {
      setIsLoading(true);
      const response = await axios(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () =>{
    setIsLoading(true);
    fetchData();
  }

  return { data, error, isLoading, refetch };
};

export default useFetch;
