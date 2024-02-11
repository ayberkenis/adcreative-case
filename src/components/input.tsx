import React, { useState, useEffect, useRef } from 'react';
import Chip from './chip'; // Adjust the import path as necessary
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateChips, updateInput } from '../store/reducers/input';

interface TextInputProps {
  chips: string[];

}

const TextInput: React.FC<TextInputProps> = ({ chips }) => {
  const text = useAppSelector((state) => state.input.value);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsPlaceholderVisible(text.length === 0 && chips.length === 0);
  }, [chips, text]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || "";
    setIsPlaceholderVisible(newText.length === 0);
    dispatch(updateInput(newText));
  };

  const handleFocus = () => setIsPlaceholderVisible(false);
  const handleBlur = () => setIsPlaceholderVisible(text.length === 0 && chips.length === 0);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        console.log('key down')
        if (!ref.current) return;
        if (e.key === 'Backspace' && (!ref.current.textContent || ref.current.textContent.length === 0) && chips.length > 0) {

          dispatch(updateChips(chips.slice(0, -1)));
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();

        } else if (e.key === 'Enter') {
            e.preventDefault();
        }
      };
    
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = text;
    }
  }, [text]);

  return (
    <div className="text-input">

        {chips.map(chipText => (
          <Chip key={chipText} text={chipText} />
        ))}


      <div
        ref={ref}
        contentEditable
        className={`editable ${isPlaceholderVisible ? 'with-placeholder' : ''}`}
        data-placeholder={isPlaceholderVisible ? 'Type something...' : ''}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}

      ></div>
    </div>
  );
};

export default TextInput;
