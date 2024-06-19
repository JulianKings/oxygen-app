import { populateData } from "../data/dataManager";

export const ADD_UNIT = "ADD_UNIT";
export const REMOVE_UNIT = "REMOVE_UNIT";
export const UPDATE_UNIT_ARRAY = "UPDATE_UNIT_ARRAY";
export const UPDATE_UNIT = "UPDATE_UNIT";
export const UPDATE_GOAL_UNIT = "UPDATE_GOAL_UNIT";
export const UPDATE_UNIT_RESULT = "UPDATE_UNIT_RESULT";
export const UPDATE_SERVER_STATUS = "UPDATE_SERVER_STATUS";

const initialState = {
    units: populateData(),
    unitValue: "km",
    unitGoal: "miles",
    unitResult: 0,
    serverConnected: null
};

const unitReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_UNIT:
            return {
                ...state,
                units: [...state.units, action.payload],
                unitResult: 0
            };
        case REMOVE_UNIT:
            return {
                ...state,
                units: state.units.filter((unit) => {
                    if(unit._id === action.payload)
                    {
                        return false;
                    }
                    return true;
                })
            };
        case UPDATE_UNIT_ARRAY:
            return {
                ...state,
                units: action.payload,
            }
        case UPDATE_UNIT:
            return {
                ...state,
                unitValue: action.payload,
            }
        case UPDATE_GOAL_UNIT:
            return {
                ...state,
                unitGoal: action.payload,
            }
        case UPDATE_UNIT_RESULT:
            return {
                ...state,
                unitResult: action.payload,
            }
        case UPDATE_SERVER_STATUS:
            return {
                ...state,
                serverConnected: action.payload,
            }
        default:
            return state;
    }
};

export default unitReducer;
