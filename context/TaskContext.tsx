"use client";

import { Task } from "@prisma/client";
import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  tasks: Task[];
  filteredTasks: Task[];
};

type ActionType = {
  type: string;
  payload?: {
    task?: Task;
    tasks?: Task[];
    FilteredTask?: Task[];
  };
};

const initialState: StateType = {
  tasks: [],
  filteredTasks: [],
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "ADD_TASK":
      if (action.payload?.task) {
        return { ...state, tasks: [...state.tasks, action.payload.task] };
      }
      return state;
    case "SET_ALL_TASKS":
      if (action.payload?.tasks) {
        return { ...state, tasks: action.payload.tasks };
      }
      return state;

    default:
      return state;
  }
};

export const TaskContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
