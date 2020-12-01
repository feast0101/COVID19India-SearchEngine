export const SET_LOADER = 'SET_LOADER';

const setLoader = (isLoading) => {
  return {type: SET_LOADER, payload: isLoading};
};

export {setLoader};