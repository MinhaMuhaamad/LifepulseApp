import React from 'react';

export default function RangeQuestion({ question, value, onChange }) {
  const { min, max, step, rangeLabels } = question;
  // For range questions we store a single value representing user's self-rating
  const current = value !== undefined ? value : Math.round((min + max) / 2);

  return (
    <div className="range-container">
      <div className="range-display">
        <span>{current}</span>
        <em>{question.unit}</em>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step || 1}
        value={current}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={question.text}
      />
      <div className="slider-labels">
        <span>{rangeLabels ? rangeLabels[0] : min}</span>
        <span>{rangeLabels ? rangeLabels[1] : max}</span>
      </div>
    </div>
  );
}
