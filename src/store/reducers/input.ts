import { createSlice } from "@reduxjs/toolkit";

interface InputState {
    value: string;
    chips: string[];
    focusedSuggestionIndex: number | null;
} 

export const inputSlice = createSlice({
    name: 'input',
    initialState: {
        value: '',
        chips: [],
        focusedSuggestionIndex: null,
    } as InputState,
    reducers: {
        updateInput: (state, action) => {
            state.value = action.payload;
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
        
        updateFocusedSuggestionIndex: (state, action) => {
            state.focusedSuggestionIndex = action.payload;
        }
    }
});

export const { updateInput, updateChips, updateFocusedSuggestionIndex } = inputSlice.actions;

export default inputSlice.reducer;
