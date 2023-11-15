import { AnyAction, ThunkDispatch, combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import Persist, { StorageKind } from './persist';
import { rememberEnhancer, rememberReducer } from 'redux-remember';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const sliceFromServer = createSlice({
  name: 'fromServer',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore
        ...action.payload,
      };
    }),
});

export const { increment } = sliceFromServer.actions;

const sliceFromClient = createSlice({
  name: 'fromClient',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

const rootReducer = combineReducers({
  fromServer: sliceFromServer.reducer,
  fromClient: sliceFromClient.reducer,
});

const enhancer = rememberEnhancer(
  // shim to emulate local storage on the server
  Persist(StorageKind.local),
  ['sliceFromClient'],
  { prefix: '~' }
);

export const createStore = () =>
  configureStore({
    reducer: rememberReducer(rootReducer) as typeof rootReducer,
    // reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [enhancer],
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper(createStore, { debug: false });
