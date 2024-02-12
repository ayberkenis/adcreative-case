import TextInput from "./input";
import Suggestions from "./suggestions";
import { useAppSelector } from "../store/hooks";

export default function Search() {
    const text = useAppSelector((state) => state.input.value);
    const selectedSuggestions = useAppSelector((state) => state.input.chips);

    return (
        <div className="search">
            <TextInput chips={selectedSuggestions}/>
            {
                (selectedSuggestions.length > 0 || text.length > 0) && <Suggestions/>
            }
        </div>
    )
}