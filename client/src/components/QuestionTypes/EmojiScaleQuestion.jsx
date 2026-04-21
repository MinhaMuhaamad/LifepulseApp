import React from 'react';

export default function EmojiScaleQuestion({ question, value, onChange }) {
  const { options, labels } = question;

  return (
    <div className="emoji-scale">
      {options.map((emoji, i) => (
        <button
          key={i}
          type="button"
          className={`emoji-option${value === i ? ' selected' : ''}`}
          onClick={() => onChange(i)}
          aria-label={labels ? labels[i] : `Option ${i + 1}`}
          aria-pressed={value === i}
        >
          <span className="emoji-icon">{emoji}</span>
          {labels && <span className="emoji-label">{labels[i]}</span>}
        </button>
      ))}
    </div>
  );
}
