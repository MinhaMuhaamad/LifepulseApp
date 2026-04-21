import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SliderQuestion from '../components/QuestionTypes/SliderQuestion';
import RangeQuestion from '../components/QuestionTypes/RangeQuestion';
import EmojiScaleQuestion from '../components/QuestionTypes/EmojiScaleQuestion';
import ImageChoiceQuestion from '../components/QuestionTypes/ImageChoiceQuestion';
import MCQQuestion from '../components/QuestionTypes/MCQQuestion';
import questions from '../data/questions';
import api from '../utils/axiosInstance';

const QUESTIONS_PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

const PAGE_CATEGORIES = [
  'Social',
  'Educational',
  'Emotional',
  'Cultural',
  'Digital / Tech',
  'Environmental'
];

// Three distinct css-doodle patterns that rotate on page change
const DOODLE_PATTERNS = [
  `
    :doodle { @grid: 20 / 100% 80px; }
    background: hsl(@r(180,240), @r(50,80)%, @r(15,30)%);
    transform: scaleY(@r(0.5,1.5));
    opacity: @r(0.2,0.6);
    animation: wave @r(2s,5s) @r(0s,3s) infinite alternate;
    @keyframes wave { to { transform: scaleY(@r(0.3,1.8)); opacity: @r(0.1,0.5); } }
  `,
  `
    :doodle { @grid: 15 / 100% 80px; }
    background: hsl(@r(280,340), @r(50,80)%, @r(15,30)%);
    transform: rotate(@r(0,180)deg) scale(@r(0.5,1.2));
    border-radius: @r(0,50%);
    opacity: @r(0.15,0.5);
    animation: spin @r(3s,7s) @r(0s,4s) infinite alternate;
    @keyframes spin { to { transform: rotate(@r(0,360)deg) scale(@r(0.3,1.4)); } }
  `,
  `
    :doodle { @grid: 25 / 100% 80px; }
    background: hsl(@r(80,160), @r(40,70)%, @r(12,28)%);
    clip-path: polygon(@r(0,30)% @r(0,40)%, @r(70,100)% @r(0,30)%, @r(60,100)% @r(70,100)%, @r(0,30)% @r(60,100)%);
    opacity: @r(0.1,0.45);
    animation: morph @r(3s,6s) @r(0s,5s) infinite alternate;
    @keyframes morph { to { clip-path: polygon(@r(0,40)% @r(0,50)%, @r(60,100)% @r(0,40)%, @r(50,100)% @r(60,100)%, @r(0,40)% @r(50,100)%); opacity: @r(0.1,0.4); } }
  `
];

export default function SurveyPage() {
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [doodleKey, setDoodleKey] = useState(0);
  const navigate = useNavigate();

  // Load existing answers if user has submitted before
  useEffect(() => {
    api.get('/survey/me')
      .then(res => {
        if (res.data?.response?.answers) {
          const raw = res.data.response.answers;
          // answers may come as a plain object or Map-like
          const parsed = typeof raw === 'object' ? raw : {};
          setAnswers(parsed);
        }
      })
      .catch(() => {}); // No existing answers — that's fine
  }, []);

  const pageQuestions = questions.slice(page * QUESTIONS_PER_PAGE, (page + 1) * QUESTIONS_PER_PAGE);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const handleAnswer = (id, val) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleNext = () => {
    if (page < TOTAL_PAGES - 1) {
      setPage(p => p + 1);
      setDoodleKey(k => k + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(p => p - 1);
      setDoodleKey(k => k + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await api.post('/survey/submit', { answers });
      navigate('/results');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
      setSubmitting(false);
    }
  };

  const renderQuestion = (q, index) => {
    const globalIndex = page * QUESTIONS_PER_PAGE + index + 1;
    const val = answers[q.id];

    const InputComponent = {
      slider: SliderQuestion,
      range: RangeQuestion,
      emojiscale: EmojiScaleQuestion,
      imagechoice: ImageChoiceQuestion,
      mcq: MCQQuestion
    }[q.type];

    return (
      <div className="question-card" key={q.id}>
        <div className="question-meta">
          <span className="question-index">Q{globalIndex}</span>
          <span className={`question-category-badge cat-${q.category}`}>
            {q.category}
          </span>
        </div>
        <p className="question-text">{q.text}</p>
        {InputComponent && (
          <InputComponent
            question={q}
            value={val}
            onChange={v => handleAnswer(q.id, v)}
          />
        )}
      </div>
    );
  };

  const doodlePattern = DOODLE_PATTERNS[doodleKey % DOODLE_PATTERNS.length];
  const isLastPage = page === TOTAL_PAGES - 1;

  return (
    <div className="survey-page">
      <Navbar />

      {/* Animated header strip — pattern changes on each page navigation */}
      <div className="survey-header">
        <css-doodle key={doodleKey} aria-hidden="true">
          {doodlePattern}
        </css-doodle>
        <div className="survey-header-content">
          <h2>Section {page + 1} of {TOTAL_PAGES}: {PAGE_CATEGORIES[page]}</h2>
          <p>{PAGE_CATEGORIES[page]} — {QUESTIONS_PER_PAGE} questions</p>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-container">
        <div className="progress-info">
          <span>Progress</span>
          <span>{answeredCount} / {questions.length} answered ({progressPercent}%)</span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Page tabs */}
      <div className="page-tabs">
        {PAGE_CATEGORIES.map((cat, i) => (
          <button
            key={i}
            className={`page-tab${page === i ? ' active' : ''}`}
            onClick={() => { setPage(i); setDoodleKey(k => k + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="questions-container">
        {error && <div className="error-msg">{error}</div>}
        {pageQuestions.map((q, i) => renderQuestion(q, i))}
      </div>

      {/* Navigation */}
      <div className="survey-nav">
        {page > 0 && (
          <button className="btn-nav prev" onClick={handlePrev}>
            ← Previous
          </button>
        )}
        {!isLastPage && (
          <button className="btn-nav next" onClick={handleNext}>
            Next →
          </button>
        )}
        {isLastPage && (
          <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : '🚀 Submit Survey'}
          </button>
        )}
      </div>
    </div>
  );
}
