
import {GFOX_STORE_DATA} from './GfoxActions'

const startState = {
 data: []
};

export const gfoxReducer = (state=startState, action) => {
   switch (action.type) {
       case GFOX_STORE_DATA: return { ...state, data: action.data}
       default: return state;
   }
}

