import { createSlice } from '@reduxjs/toolkit'



const initialState={
    toasterVisible:false,
    modalState:false,

    modalBody:null,

}

export const notify=createSlice({
    name:"notify",
    initialState,
    reducers:{
        SET_NOTIFY:(state,{payload})=>{
            state.toasterVisible=payload
        },
        SET_MODAL:(state,{payload})=>{
            if((typeof payload)==(typeof {})){
                state.modalState=payload.modalState,
                state.modalBody=payload.modalState?payload.modalBody:null 
            }
            else{
                state.modalState=payload

            }
            // console.log(payload)
        },
     
        
    
    }
})

export const {SET_NOTIFY,SET_MODAL} =notify.actions;
export default notify.reducer