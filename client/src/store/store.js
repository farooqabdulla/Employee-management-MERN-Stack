import { configureStore } from "@reduxjs/toolkit";
import groupSlice from "./groupSlice";
const store = configureStore({
    reducer : {
        group : groupSlice
    }
})

export default store