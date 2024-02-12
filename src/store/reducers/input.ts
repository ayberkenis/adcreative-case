import { createSlice } from "@reduxjs/toolkit";
import { Character } from "../../types/character";

interface InputState {
    value: string;
    chips: string[];
    focusedSuggestionIndex: number | null;
    suggestions: Character[];
    totalSuggestions: number;
} 

export const inputSlice = createSlice({
    name: 'input',
    initialState: {
        value: '',
        chips: [],
        focusedSuggestionIndex: null,
        suggestions: [],
        totalSuggestions: 0,
    } as InputState,
    reducers: {
        updateInput: (state, action) => {
            state.value = action.payload;
            if (action.payload.length === 0) {
                state.focusedSuggestionIndex = null;
            }
        },
        updateChips: (state, action) => {
            console.log(action.payload)
            // Create a new set from current chips for efficient lookup
            const currentChipsSet = new Set(state.chips);
        
            // If the chip is already in the set, remove it, otherwise add it
            if (currentChipsSet.has(action.payload)) {
                currentChipsSet.delete(action.payload);
            } else {
                currentChipsSet.add(action.payload);
                state.value = '';
            }
        
            // Convert the set back to an array and update the state
            state.chips = Array.from(currentChipsSet);
        },
        backspaceChips: (state) => {
            state.chips = state.chips.slice(0, -1);
        },
        incrementFocusIndex: (state) => {
            if (state.focusedSuggestionIndex === null) {
                state.focusedSuggestionIndex = 0;
            } else {
                state.focusedSuggestionIndex = Math.min(state.focusedSuggestionIndex + 1, state.totalSuggestions - 1);
            }
        },
        decrementFocusIndex: (state) => {
            if (state.focusedSuggestionIndex === null) {
                state.focusedSuggestionIndex = 0;
            } else {
                state.focusedSuggestionIndex = Math.max(state.focusedSuggestionIndex - 1, 0);
            }
        },
        setSuggestions: (state, action) => {
            state.suggestions = action.payload;
            state.totalSuggestions = action.payload.length;
        }
    }
});

export const { updateInput, updateChips,backspaceChips, incrementFocusIndex, decrementFocusIndex, setSuggestions } = inputSlice.actions;

export default inputSlice.reducer;
