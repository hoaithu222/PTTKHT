import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    cover_photo: "",
    bio: "",
    phone_number: "",
    onlineUser: [],
    role: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profile_pic = action.payload.profile_pic;
            state.cover_photo = action.payload.cover_photo;
            state.bio = action.payload.bio;
            state.phone_number = action.payload.phone_number;
            state.role = action.payload.role;
        },
        updateUser: (state, action) => {
            if (action.payload.name) state.name = action.payload.name;
            if (action.payload.email) state.email = action.payload.email;
            if (action.payload.profile_pic) state.profile_pic = action.payload.profile_pic;
            if (action.payload.cover_photo) state.cover_photo = action.payload.cover_photo;
            if (action.payload.bio) state.bio = action.payload.bio;
            if (action.payload.phone_number) state.phone_number = action.payload.phone_number;
        },
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload;
        },
        logout: (state) => {
            return initialState;
        }
    }
});

export const { setUser, updateUser, logout, setOnlineUser } = userSlice.actions;
export default userSlice.reducer;
