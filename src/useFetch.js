import { useState, useEffect } from "react";

const useFetch = (url, reload) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could Not Fetch Data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted...");
        } else {
          setError(true);
          setIsPending(false);
        }
      });
    return () => abortCont.abort();
  }, [url, reload]);

  return { data, isPending, error };
};

export default useFetch;
