import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resourse");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        //  Useeffect cleanup..
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(error.message);
        }
        /*******/
        setIsPending(false);
        setError(error.message);
      });
    //  Useeffect cleanup..
    return () => abortCont.abort();
  }, [url]);
  return {data, isPending, error}
}
 
export default useFetch;