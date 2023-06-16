"use client";

import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  tomatoes: number;
  taskId: string;
};

type ActionType = {
  type: string;
  payload?: {
    taskId: string;
  };
};

const initialState: StateType = {
  tomatoes: 0,
  taskId: "",
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, tomatoes: state.tomatoes + 1 };
    case "START_TASK":
      return { ...state, tomatoes: 0, taskId: action.payload?.taskId || "" };
    case "RESET":
      return { ...state, tomatoes: 0, taskId: "" };
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
