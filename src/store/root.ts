import { configureStore } from '@reduxjs/toolkit'
import { rickandmortyApi } from './reducers/api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { inputSlice } from './reducers/input'

export const rootStore = configureStore({
    reducer: {
        [rickandmortyApi.reducerPath]: rickandmortyApi.reducer,
        input: inputSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rickandmortyApi.middleware),

    })

    setupListeners(rootStore.dispatch)
export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
