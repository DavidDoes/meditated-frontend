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
      console.log('getMoments() res:', res);
      return res.json();
    })
    .then(json => {
      console.log('getMoments() json:', json);
      dispatch(setMomentsList(json));
    })
    .catch(err => console.error(err));
};

// ===== PUT MOMENT =====

export const updateMoment = (authToken, updateMoment) => dispatch => {
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
      return res.json();
    })
    .catch(err => console.error(err));
};

export const UPDATE_MOMENT_SUCCESS = 'UPDATE_MOMENT_SUCCESS';
export const updateMomentSucess = data => ({
  type: UPDATE_MOMENT_SUCCESS,
  values: data
});

// ===== DELETE MOMENT =====
