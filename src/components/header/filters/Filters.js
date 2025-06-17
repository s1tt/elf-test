import { Dropdown, Input } from '../../fields';
import {
  genderOptions,
  speciesOptions,
  statusOptions
} from '../../../constants';
import { useCallback, useEffect, useState } from 'react';

import { Actions } from './Actions';
import styled from 'styled-components';
import { useData } from '../../providers';

const initialFiltersState = {
  status: '',
  gender: '',
  species: '',
  name: '',
  type: ''
};

export const Filters = () => {
  const { setApiURL, apiURL, setActivePage, isFetching } = useData();

  const [filtersState, setFiltersState] = useState(initialFiltersState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const newFilters = {};

    for (const key of Object.keys(initialFiltersState)) {
      const value = params.get(key);
      newFilters[key] = value ? value.toLowerCase() : '';
    }

    setFiltersState(newFilters);
  }, []);

  const handlerFiltersStateChange = useCallback((field, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handlerApply = useCallback(() => {
    const url = new URL(apiURL);
    url.search = '';

    Object.entries(filtersState).forEach(([key, value]) => {
      const normalizedValue = value.trim();

      if (normalizedValue) {
        url.searchParams.set(key, encodeURI(normalizedValue));

        return;
      }

      handlerFiltersStateChange(key, '');
    });

    url.searchParams.set('page', 1);
    setActivePage(0);
    setApiURL(url.toString());

    window.history.pushState(null, '', `?${url.searchParams.toString()}`);
  }, [
    filtersState,
    apiURL,
    setApiURL,
    setActivePage,
    handlerFiltersStateChange
  ]);

  const handlerReset = useCallback(() => {
    setFiltersState(initialFiltersState);

    const url = new URL(apiURL);
    url.search = '';
    url.searchParams.set('page', 1);

    setActivePage(0);
    setApiURL(url.toString());

    window.history.pushState(null, '', url.search);
  }, [apiURL, setApiURL, setActivePage]);

  const handlers = {
    status: (value) => handlerFiltersStateChange('status', value),
    gender: (value) => handlerFiltersStateChange('gender', value),
    species: (value) => handlerFiltersStateChange('species', value),
    name: (value) => handlerFiltersStateChange('name', value),
    type: (value) => handlerFiltersStateChange('type', value),
    reset: () => handlerReset(),
    apply: () => handlerApply()
  };

  return (
    <FiltersContainer>
      <Dropdown
        options={statusOptions}
        value={filtersState.status}
        onChange={handlers.status}
        placeholder="Status"
      />
      <Dropdown
        options={genderOptions}
        value={filtersState.gender}
        onChange={handlers.gender}
        placeholder="Gender"
      />
      <Dropdown
        options={speciesOptions}
        value={filtersState.species}
        onChange={handlers.species}
        placeholder="Species"
      />
      <Input
        value={filtersState.name}
        onChange={handlers.name}
        placeholder="Name"
      />
      <Input
        value={filtersState.type}
        onChange={handlers.type}
        placeholder="Type"
      />
      <Actions
        apply={handlers.apply}
        reset={handlers.reset}
        isFetching={isFetching}
      />
    </FiltersContainer>
  );
};

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 180px));
  gap: 10px;

  @media (max-width: 950px) {
    grid-template-columns: repeat(3, minmax(100px, 150px));
    gap: 15px;
  }

  @media (max-width: 530px) {
    grid-template-columns: minmax(100px, 240px);
    gap: 15px;
  }
`;
