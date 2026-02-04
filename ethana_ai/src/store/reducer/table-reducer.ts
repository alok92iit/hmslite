import { createSlice } from "@reduxjs/toolkit";

// Define the shape of your state
interface TableState {
  employee: any[]; 
  department: any[]; 
  matrix:any
}

// Define the initial state
const initialState: TableState = {
  employee: [],
department:[],
matrix:{}
};

const initialStateWithContent:any=initialState
delete initialStateWithContent.content

// Create the slice
const tableRecords = createSlice({
  name: "tableRecords", // Updated name for clarity
  initialState,
  reducers: {
    
    SET_EMPLOYEE: (state, action) => {

      state.employee = action.payload;
    },
    SET_DEPARTMENT: (state, action) => {

      state.department = action.payload;
    },
    SET_MATRIX:(state, action) => {

      state.matrix = action.payload;
    },
    
    
    
    

    CLEAR_RECORDS: () => initialStateWithContent, // Reset to initial state
  },
});

// Export actions and reducer
export const { SET_EMPLOYEE,SET_MATRIX,CLEAR_RECORDS,SET_DEPARTMENT} = tableRecords.actions;
export default tableRecords.reducer;
