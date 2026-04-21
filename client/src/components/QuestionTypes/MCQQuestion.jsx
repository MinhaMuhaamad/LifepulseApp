import React from 'react';

export default function MCQQuestion({ question, value, onChange }) {
  const { options } = question;

  return (
    <div className="mcq-options">
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          className={`mcq-option${value === i ? ' selected' : ''}`}
          onClick={() => onChange(i)}
          aria-pressed={value === i}
        >
          <span className="mcq-radio" aria-hidden="true" />
          <span>{opt}</span>
        </button>
      ))}
    </div>
  );
}
