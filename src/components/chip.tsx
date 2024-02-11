import { useAppDispatch } from "../store/hooks";
import { updateChips } from "../store/reducers/input";

export default function Chip({text}: {text: string}) {
    const dispatch = useAppDispatch();

    const handleRemove = () => {
        dispatch(updateChips(text));
    }


    return (
        <div className="chip">
            <span className="chip-text">{text}</span>
            <button className="chip-delete" onClick={() => handleRemove()}>x</button>
        </div>
    );
}