

import {
    GET_LIST_PHONE_SUCCESS,
    GET_LIST_PHONE_FAIL,
    ADD_PHONE_SUCCESS,
    EDIT_PHONE,
    DELETE_PHONE}from '../../action/home/home.action';

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
        case EDIT_PHONE:
            return{
                ...state,
            }
        case DELETE_PHONE:
            console.log(" reducer delete phone ", action.data)
            return{
                ...state,
                phoneNumber: action.data,
            }
        default:
            return{
                ...state
            }
    }

    return Object.assign({}, state, { [action.type]: action.value });
}