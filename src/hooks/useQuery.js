import { useEffect, useState } from "react";

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const res = await promise(query);
      setData(res.data?.data);
      console.log(res);
    } catch (error) {
      console.log("Error: ", error);
      setError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useQuery;
