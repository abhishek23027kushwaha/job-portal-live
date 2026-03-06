import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import companySlice from "./companySlice";
import jobSlice from "./jobSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        company: companySlice,
        job: jobSlice
    }
});
export default store;
