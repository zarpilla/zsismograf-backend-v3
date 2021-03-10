import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { auth } from 'strapi-helper-plugin';

const useFetch = () => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    error: false,
    isLoading: true,
    projects: [],
    auth: auth,
    strapi: strapi,
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const token = auth.getToken()
    const headers = { headers: {'Authorization': 'Bearer ' + token }};
    const url = `${strapi.backendURL}/content-manager/collection-types/application::project.project?page=1&pageSize=9999`;

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          url,
          headers
        );
        const projects = data.results
        setState({ isLoading: false, projects, error: false });
      } catch (err) {
        if (isMounted.current) {
          setState({ isLoading: false, error: true, projects: [] });
        }
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
      source.cancel('abort');
    };
  }, []);

  return state;
};

export default useFetch;