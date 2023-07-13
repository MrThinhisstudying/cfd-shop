import { useState } from "react";

const useMutation = (promise, { onSuccess, onFail }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const excute = async (payload) => {
    try {
      setLoading(true);
      const res = await promise(payload);
      setData(res.data?.data || []);
      onSuccess();
    } catch (error) {
      console.log("Error: ", error);
      setError(error);
      onFail(error);
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
    excute,
  };
};

export default useMutation;
