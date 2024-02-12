/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef } from "react";
import { useGetCharacterQuery } from "../store/reducers/api";
import { Character } from "../types/character";
import ActivityIndicator from "./loading";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSuggestions, updateChips } from "../store/reducers/input";
import Error from "./error";

export default function Suggestions() {
    const text = useAppSelector((state) => state.input.value);
    const focusedSuggestionIndex = useAppSelector((state) => state.input.focusedSuggestionIndex);
    const dispatch = useAppDispatch();
    const [debouncedText] = useDebounce(text, 500);

    const { data = [], error, isLoading } = useGetCharacterQuery(debouncedText, {
        // The skip option will prevent the query from running if the text is empty
        skip: debouncedText.length === 0,

    });

    dispatch(setSuggestions(data));
    const suggestionsRef = useRef<HTMLUListElement>(null);
    if (error) return <Error />;


    useEffect(() => {
        // always keep the focused suggestion in view
        if (suggestionsRef.current && focusedSuggestionIndex !== null) {
            suggestionsRef.current.children[focusedSuggestionIndex]?.scrollIntoView({ block: 'nearest' });
        }
    }, [focusedSuggestionIndex]);

    return (
        <div className={`suggestions-wrapper ${data.length ? 'active' : ''}`}>
            <ul className="suggestions" ref={suggestionsRef}>
                {!isLoading ? (
                    data.map((suggestion, index) => (
                        <Suggestion
                            isFocused={index === focusedSuggestionIndex}
                            queryParam={debouncedText}
                            key={suggestion.id}
                            suggestion={suggestion}
                        />
                    ))
                ) : (
                    <ActivityIndicator />
                )}
            </ul>
        </div>
    );
}


export function Suggestion({ queryParam, suggestion, isFocused }: { queryParam: string, suggestion: Character, isFocused: boolean }) {
    const dispatch = useAppDispatch();
    const chips = useAppSelector((state) => state.input.chips);
    const selected = chips.includes(suggestion.name);

    const boldQueryName = (name: string) => {
        // This function will bold the queryParam in the name
        const index = name.toLowerCase().indexOf(queryParam.toLowerCase());
        if (index === -1) return name;
        return (
            <>
                {name.slice(0, index)}
                <span className="suggestion-bold">{name.slice(index, index + queryParam.length)}</span>
                {name.slice(index + queryParam.length)}
            </>
        );
    }

    const handleAction = (event: React.MouseEvent<HTMLLIElement> | React.ChangeEvent<HTMLInputElement>, name?: string) => {
        let suggestionName = name;

        if (event.type === 'change' && event.target instanceof HTMLInputElement) {
            if (event.target.checked) {
                suggestionName = suggestionName || event.target.value;

            }
        }
        if (event.type === 'click' && suggestionName) {
            dispatch(updateChips(suggestionName));
        }
    };



    return (
        <li onClick={(e) => handleAction(e, suggestion.name)} className={`suggestion-item ${isFocused ? 'focused' : ''}`}>
            <div className="checkbox">
                <input type="checkbox" name="suggestion" id="suggestion" onChange={(e) => handleAction(e, suggestion.name)} checked={selected} />
                <label htmlFor="suggestion" className="custom-checkbox"></label>
            </div>
            <div className="suggestion-image">
                <img src={suggestion.image} alt={suggestion.name} />
            </div>
            <div className="suggestion-info">
                <span className="suggestion-name">{boldQueryName(suggestion.name)}</span>
                <span className="suggestion-episodes">{suggestion.episode.length} episodes</span>
            </div>

        </li>
    );
}
