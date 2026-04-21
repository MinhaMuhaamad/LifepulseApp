import React from 'react';

export default function ImageChoiceQuestion({ question, value, onChange }) {
  const { options } = question;

  return (
    <div className="image-choice-grid">
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          className={`image-option${value === i ? ' selected' : ''}`}
          onClick={() => onChange(i)}
          aria-label={opt.label}
          aria-pressed={value === i}
        >
          <img
            src={opt.img}
            alt={opt.label}
            loading="lazy"
            onError={e => { e.target.style.display = 'none'; }}
          />
          <div className="image-option-label">{opt.label}</div>
        </button>
      ))}
    </div>
  );
}
