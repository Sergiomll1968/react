import { useState } from 'react';

export function useAPIRequest() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const arrowUp = String.fromCodePoint(0x21E7);
  const arrowDown = String.fromCodePoint(0x21E9);
  const deletefilterIcon = String.fromCodePoint(0x26D2);
  const [order, setOrder] = useState([0,arrowUp]) // 0 -> Not ordered, 1 -> Ascending, 2 -> Descending

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
          const users = [
            { Name: 'Kevin', Age: 42, Profits: 500, Expenses: 200, Gap: 300 },
            { Name: 'Peter', Age: 30, Profits: 250, Expenses: 50, Gap: 200 },
            { Name: 'Luise', Age: 50, Profits: 150, Expenses: 30, Gap: 120 },
            { Name: 'Jules', Age: 18, Profits: 425, Expenses: 180, Gap: 245 },
            { Name: 'Carol', Age: 37, Profits: 800, Expenses: 425, Gap: 375 }
          ];
          setData(users);
        } else {
          setError(new Error(`${response.status}: ${response.statusText}`));
          // error === { message: '401: Unathorized' }
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
      setOrder(order[0] === 0? [1,arrowDown] : order[0] === 1 ? [2,deletefilterIcon] : [0,arrowUp]);
      return { getData, data, error, loading, order };
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
