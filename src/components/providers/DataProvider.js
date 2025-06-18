import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(null);

  const fetchData = useCallback(async (url) => {
    if (!url) {
      return;
    }

    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    let pageNumber = parseInt(pageParam, 10);

    if (!pageParam || isNaN(pageNumber) || pageNumber < 1) {
      pageNumber = 1;
      params.set('page', '1');
      window.history.replaceState(null, '', `?${params.toString()}`);
    }

    setActivePage(pageNumber - 1);
    setApiURL(`${API_URL}?${params.toString()}`);
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info, fetchData]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
