import request from 'utils/api.js';

const actionNames = {
  FETCH_DATA: '__AREA_NAME_CAPITALIZED__:FETCH_DATA'
};

export actionNames;

export const fetchData = () => {
    const url = `/api`;

    return {
      type: actionNames.FETCH_DATA,
      payload: request({ url, method: 'GET' })
    };
  }
};
