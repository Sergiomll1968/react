import { useState } from 'react';

export function useAPIRequest() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);


  async function getData({ route, method = 'GET', searchType, searchString, body, headers = {} }) {
    setData();
    setError();
    setLoading(true);
    // *******************************************************************************************
    if (searchType === 'order') {
      try {
        const response = await fetch('https://api-hairs-deploy.onrender.com/services/all', {
          method,
          headers: { 'Content-Type': 'application/json', ...headers },
          body,
        });

        if (response.ok) { // response.ok === response.status.200
          const responseAsJson = await response.json();
          let filteredData;

          switch (searchString) {
            case 0:
              filteredData = responseAsJson.sort(function (a,b) {
                return (a.name<b.name) ? -1 : 1;
              });
              break;
            case 1:
              filteredData = responseAsJson.sort(function (a,b) {
                return (a.name>b.name) ? -1 : 1;
              });
              break;
            case 2:
              filteredData = responseAsJson;
              break;
          }
          setData(filteredData);
          // setData(responseAsJson);
        } else {
          setError(new Error(`${response.status}: ${response.statusText}`));
          // error === { message: '401: Unathorized' }
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
      
      return { getData, data, error, loading };
    }
    // *******************************************************************************************
    if (searchType === 'filter') {
      try {
        const response = await fetch('https://api-hairs-deploy.onrender.com/services/all', {
          method,
          headers: { 'Content-Type': 'application/json', ...headers },
          body,
        });

        if (response.ok) { // response.ok === response.status.200
          const responseAsJson = await response.json();
          const filteredData = responseAsJson.filter(element => element.name.toLowerCase().includes(searchString.toLowerCase()));
          setData(filteredData);
          // setData(responseAsJson);
        } else {
          setError(new Error(`${response.status}: ${response.statusText}`));
          // error === { message: '401: Unathorized' }
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
      return { getData, data, error, loading };
    }
    // *******************************************************************************************
    try {
      const response = await fetch(`https://api-hairs-deploy.onrender.com/${route}`, {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body,
      });

      if (response.ok) { // response.ok === response.status.200
        const responseAsJson = await response.json();
        setData(responseAsJson);
      } else {
        setError(new Error(`${response.status}: ${response.statusText}`));
        // error === { message: '401: Unathorized' }
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }

  }

  return { getData, data, error, loading };

}
