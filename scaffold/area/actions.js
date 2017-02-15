import { request } from 'shared/utils';

export const actionNames = {
  FETCH_DATA: '__AREA_NAME_CAPITALIZED__:FETCH_DATA'
};

export const fetchData = () => {
  const url = '/api';

  return {
    type: actionNames.FETCH_DATA,
    payload: request({ url, method: 'GET' })
  };
};