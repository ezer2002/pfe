import * as actionTypes from './actionTypes';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilisation du stockage localStorage par défaut

const initialState = {

  user: null,

};



const persistedReducer = persistReducer(
  {
    key: 'root', // Clé racine pour la persistance dans le storage
    storage, // Utilisation du localStorage comme stockage
    // Ajoutez d'autres options si nécessaire, comme whitelist ou blacklist
  },
  (state = initialState, action) => {
    switch (action.type) {
    
      case actionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          user: action.user,
          error: null,
        };
    
      case actionTypes.LOGIN_FAILURE:
        return {
          ...state,
          error: action.error,
        };
        case actionTypes.logout_SUCCESS:
            return {
              ...state,
              user: null,
              error: null,
            };
        

      default:
        return state;
    }
  }
);

export default persistedReducer;
