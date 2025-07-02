import { useState, useCallback } from 'react';
import { AppState, CelestialObject, User } from '../types';

const initialState: AppState = {
  currentPage: 'home',
  selectedObject: null,
  isModalOpen: false,
  user: null
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>(initialState);

  const setCurrentPage = useCallback((page: AppState['currentPage']) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const setSelectedObject = useCallback((object: CelestialObject | null) => {
    setState(prev => ({ 
      ...prev, 
      selectedObject: object,
      isModalOpen: !!object 
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      selectedObject: null,
      isModalOpen: false 
    }));
  }, []);

  const setUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, user }));
  }, []);

  return {
    state,
    setCurrentPage,
    setSelectedObject,
    closeModal,
    setUser
  };
};