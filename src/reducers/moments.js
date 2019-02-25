import {
  POST_MOMENT,
  GET_MOMENTS,
  // DELETE_MOMENT_SUCCESS,
  UPDATE_MOMENT_SUCCESS
} from '../actions/moments';

const initialState = {
  user: {},
  moments: []
};

const reducer = (state = initialState, action) => {
  if (action.type === POST_MOMENT) {
    return Object.assign({}, state, {
      moments: [...state.moments, action.payload]
    });
  }

  if (action.type === GET_MOMENTS) {
    return Object.assign({}, state, {
      moments: action.payload
    });
  }

  // if (action.type === DELETE_MOMENT_SUCCESS) {
  //   let momentsArr = [...state.moments];
  //   let deletedItem = momentsArr.findIndex(item => item.id === action.id);

  //   momentsArr.splice(deletedItem, 1);
  //   return Object.assign({}, state, {
  //     moments: momentsArr
  //   });
  // }

  if (action.type === UPDATE_MOMENT_SUCCESS) {
    let momentsArr = [...state.moments];

    momentsArr.forEach(moment => {
      if (moment.id === action.values.id) {
        moment = Object.assign(moment, action.values);
      }
    });
  }

  return state;
};

export default reducer;
