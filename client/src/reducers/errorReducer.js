import {GET_ERRORS,CLEAR_ERRORS} from '../actions/types';

const initialState={
    msg:{},
    id:null,
    status:null
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_ERRORS:
            return{
                msg:action.payload.msg,
                id:action.payload.id,
                state:action.payload.status
            }
        case CLEAR_ERRORS:
            return{
                msg:{},
                id:null,
                state:null 
            }
        default:
            return{
                state
            }    
        }         
    }       