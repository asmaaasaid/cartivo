import { type  TLoading} from '@customTypes/shared';
import { createSlice } from '@reduxjs/toolkit/react';
import actAuthRegister from './act/actAuthRegister';
import actAuthLogin from './act/actAuthLogin';
import {isString} from '@customTypes/guards';

interface IAuthState{
    loading: TLoading,
    error: string | null,
    accessToken: string | null,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    } | null
}

const initialState: IAuthState = {
    loading: 'idle',
    error: null,
    accessToken: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: (state)=>{
            state.loading = 'idle';
            state.error = null;
        },
        authLogout: (state)=>{
            state.accessToken = null;
            state.user = null;
        }
    },

    extraReducers:(builder)=>{
        // register
        builder.addCase(actAuthRegister.pending, (state)=>{
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(actAuthRegister.fulfilled, (state)=>{
            state.loading = 'succeeded';
        });
        builder.addCase(actAuthRegister.rejected, (state, action)=>{
            state.loading = 'failed';
            if(isString(action.payload)){
                state.error = action.payload;
            }
        });

        // login
        builder.addCase(actAuthLogin.pending, (state)=>{
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(actAuthLogin.fulfilled, (state, action)=>{
            state.loading = 'succeeded';
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(actAuthLogin.rejected, (state, action)=>{
            state.loading = 'failed';
            if(isString(action.payload)){
                state.error = action.payload;
            }
        });
            
    }
})

export {actAuthRegister, actAuthLogin};
export const {resetAuthState, authLogout} = authSlice.actions;
export default authSlice.reducer;