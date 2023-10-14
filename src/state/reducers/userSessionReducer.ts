import { IUserAction } from "../../models/IUserAction";
import { SIGN_IN } from "../types";

const initialState = {
    username:'',
    password: '',
}

export default function userSessionReducer(state = initialState, action: IUserAction){
    switch (action.type) {
        case SIGN_IN:
            return{
                ...state,
                username: action.payload.username,
                password: action.payload.password
            }
        default:
            return state;
    }
}