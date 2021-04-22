const initialState = {
    something: undefined,
};

const mapKey = new Map([
    ["1",()=>{}],
    ["2",()=>{}]
]);

export default function homeReducer(state = initialState, action) {
    console.log("[homeReducers " + action.type + "]", action.value);
    return Object.assign({}, state, { [action.type]: action.value });
}