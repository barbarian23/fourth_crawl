

import {
    GET_LIST_PHONE_SUCCESS,
    GET_LIST_PHONE_FAIL,
    ADD_PHONE_SUCCESS,
    EDIT_PHONE,
    DELETE_PHONE,
    DELETE_PHONE_SUCCESS,
    EDIT_PHONE_SUCCESS,
    SET_INTERVAL_PHONE,
    SET_INTERVAL_PHONE_SUCCESS} from '../../action/home/home.action';

const initialState = {
    something: undefined,
    listPhone:[],
    phoneNumber:{
        index:"",
        phone:"",
        money:"",
        info:""
    }
};

const mapKey = new Map([
    ["1",()=>{}],
    ["2",()=>{}]
]);

export default function homeReducer(state = initialState, action) {
    // console.log("[homeReducers " + action.type + "]", action.value);

    switch(action.type){
        case GET_LIST_PHONE_SUCCESS:
            return{
                ...state,
                listPhone: action.value,
            }
        case GET_LIST_PHONE_FAIL:
            return{
                ...state,
                listPhone: [],
            }
        case ADD_PHONE_SUCCESS:
            return{
                ...state,
                listPhone: [
                    ...state.listPhone,
                    {
                        ...action.value,
                        info: ''
                    }
                ]
            }
        case DELETE_PHONE:
            console.log(" reducer delete phone ", action.data);
            return{
                ...state,
                phoneNumber: action.data,
            }
        case DELETE_PHONE_SUCCESS:
            console.log(" reducer after delete phone ", action.data)
            return{
                ...state,
                listPhone: action.data,
            }
        case EDIT_PHONE:
            console.log(" reducer edit phone ", action.data);
            return{
                ...state,
                phoneNumber: action.data,
            }
        case EDIT_PHONE_SUCCESS:
            console.log(" reducer after edit phone ", action.data);
            return{
                ...state,
                listPhone: action.data,
            }
        case SET_INTERVAL_PHONE:
            console.log("reducer set interval listphone", action.data);
            return{
                ...state,
                listPhone: action.data,
            }
        case SET_INTERVAL_PHONE_SUCCESS:
            console.log("reducer set interval phone", action.data);
            return{
                ...state,
                listPhone: action.data,
            }
        default:
            return{
                ...state
            }
    }

    return Object.assign({}, state, { [action.type]: action.value });
}