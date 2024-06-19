import { ADD_UNIT, REMOVE_UNIT, UPDATE_GOAL_UNIT, UPDATE_UNIT, UPDATE_UNIT_RESULT } from "./unitReducer";

export const addUnit = (unit) => {
    return {
        type: ADD_UNIT,
        payload: unit,
    };
};

export const removeUnit = (value) => {
    return {
        type: REMOVE_UNIT,
        payload: value,
    };
};

export const updateUnit = (value) => {
    return {
        type: UPDATE_UNIT,
        payload: value,
    };
};

export const updateGoalUnit = (value) => {
    return {
        type: UPDATE_GOAL_UNIT,
        payload: value,
    };
};

export const updateUnitResult = (value) => {
    return {
        type: UPDATE_UNIT_RESULT,
        payload: value,
    };
};