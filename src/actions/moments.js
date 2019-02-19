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
  console.log('hello from dispatch newMoment');
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
        console.log('res not ok');
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(json => {
      console.log('dispatched postMomentToList');
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
      return res.json();
    })
    .then(json => {
      dispatch(setMomentsList(json));
    })
    .catch(err => console.error(err));
};

// ===== PUT MOMENT =====
