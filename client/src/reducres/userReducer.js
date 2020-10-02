export const initialState =  null
export const reducer = (state=initialState, action)=>{
    if(action.type == "USER"){
        return action.payload
    }else if(action.type=='CLEAR'){
        return null
    }
    else{
        return state;
    }
}