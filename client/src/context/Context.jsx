import { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Reducer from './Reducer';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
  categories: [],
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        categories,
      }}
    >
      {children}
    </Context.Provider>
  );
};
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
