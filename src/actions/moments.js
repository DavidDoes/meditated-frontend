import { API_BASE_URL } from '../config';

export const GET_MOMENTS = 'GET_MOMENTS';
export const setMomentsList = moments => ({
  type: GET_MOMENTS,
  payload: moments
});

// ===== POST MOMENT =====

export const POST_MOMENT = 'POST_MOMENT';
export const postMomentToList = moment => ({
  type: POST_MOMENT,
  payload: moment
});

export const newMoment = (authToken, moment) => dispatch => {
  fetch(`${API_BASE_URL}/moments`, {
    body: JSON.stringify(moment),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(json => {
      dispatch(postMomentToList(json));
    })
    .catch(err => console.error(err));
};

// ===== GET MOMENTS =====

export const getMoments = authToken => dispatch => {
  fetch(`${API_BASE_URL}/moments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(json => {
      console.log('json:', json);
      dispatch(setMomentsList(json));
    })
    .catch(err => console.error(err));
};

// ===== PUT MOMENT =====

export const updateMoment = authToken => dispatch => {
  fetch(`${API_BASE_URL}/moments/${updateMoment.id}`, {
    body: JSON.stringify(updateMoment),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      console.log(res.json());
      return res.json();
    })
    .catch(err => console.error(err));
};
