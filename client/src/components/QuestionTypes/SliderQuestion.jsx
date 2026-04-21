import React from 'react';

export default function SliderQuestion({ question, value, onChange }) {
  const { min, max, step, unit, default: def } = question;
  const current = value !== undefined ? value : def !== undefined ? def : min;

  return (
    <div className="slider-container">
      <div className="slider-value-display">
        {current}<span className="slider-unit">{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={question.text}
      />
      <div className="slider-labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
