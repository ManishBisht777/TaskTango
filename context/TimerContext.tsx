"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  tomatoes: number;
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  tomatoes: 0,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, tomatoes: state.tomatoes + 1 };
    case "RESET":
      return { ...state, tomatoes: 0 };
    default:
      return state;
  }
};

export const TimerContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const TimerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
