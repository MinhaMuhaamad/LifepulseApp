import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import Navbar from '../components/Navbar';
import api from '../utils/axiosInstance';
import questions from '../data/questions';

const CATEGORY_COLORS = {
  social:        '#5cf4fc',
  educational:   '#7c5cfc',
  emotional:     '#fc5c9c',
  cultural:      '#fcc85c',
  digital:       '#5cfc8c',
  environmental: '#8cfc5c'
};

const CATEGORY_LABELS = {
  social:        'Social',
  educational:   'Educational',
  emotional:     'Emotional',
  cultural:      'Cultural',
  digital:       'Digital/Tech',
  environmental: 'Environmental'
};

function normalizeScore(question, rawValue) {
  if (rawValue === undefined || rawValue === null) return 0;
  const { type, min, max, options } = question;
  if (type === 'slider' || type === 'range') {
    return Math.round(((rawValue - min) / (max - min)) * 100);
  }
  if (type === 'emojiscale' || type === 'mcq') {
    return Math.round((rawValue / (options.length - 1)) * 100);
  }
  if (type === 'imagechoice') {
    return Math.round((rawValue / (options.length - 1)) * 100);
  }
  return 0;
}

function computeCategoryScores(answers) {
  const categories = ['social', 'educational', 'emotional', 'cultural', 'digital', 'environmental'];
  return categories.map(cat => {
    const catQuestions = questions.filter(q => q.category === cat);
    const scores = catQuestions.map(q => normalizeScore(q, answers[q.id]));
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return { category: cat, label: CATEGORY_LABELS[cat], score: avg, color: CATEGORY_COLORS[cat] };
  });
}

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/survey/me')
      .then(res => {
        const rawAnswers = res.data?.response?.answers || {};
        setTotalAnswered(Object.keys(rawAnswers).length);
        setCategoryData(computeCategoryScores(rawAnswers));
        setLoading(false);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setError('No survey responses found. Please complete the survey first.');
        } else {
          setError('Failed to load results. Please try again.');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <span>Loading your results...</span>
      </div>
    );
  }

  const radarData = categoryData.map(d => ({ subject: d.label, score: d.score, fullMark: 100 }));

  return (
    <div>
      <Navbar />
      <div className="results-page">
        {error ? (
          <div>
            <div className="error-msg">{error}</div>
            <div className="results-actions">
              <button className="btn-nav next" onClick={() => navigate('/survey')}>
                Take Survey
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h1>Your LifePulse Report</h1>
              <p>Based on {totalAnswered} of {questions.length} answered questions</p>
            </div>

            <div className="chart-grid">
              {/* Radar Chart */}
              <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
                <h3>Life Dimensions Overview</h3>
                <ResponsiveContainer width="100%" height={340}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="#2a2a3d" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#8888a8', fontSize: 12, fontFamily: "'Space Mono', monospace" }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: '#8888a8', fontSize: 10 }}
                      stroke="#2a2a3d"
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#7c5cfc"
                      fill="#7c5cfc"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#12121a',
                        border: '1px solid #2a2a3d',
                        borderRadius: '8px',
                        color: '#e8e8f0',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value}/100`, 'Score']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
                <h3>Category Scores</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={categoryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: '#8888a8', fontSize: 11, fontFamily: "'Space Mono', monospace" }}
                      axisLine={{ stroke: '#2a2a3d' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: '#8888a8', fontSize: 11, fontFamily: "'Space Mono', monospace" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#12121a',
                        border: '1px solid #2a2a3d',
                        borderRadius: '8px',
                        color: '#e8e8f0',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`${value}/100`, 'Score']}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Score breakdown */}
              <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
                <h3>Detailed Breakdown</h3>
                <div className="category-scores">
                  {categoryData.map(d => (
                    <div className="score-row" key={d.category}>
                      <span className="score-label">{d.label}</span>
                      <div className="score-bar-track">
                        <div
                          className="score-bar-fill"
                          style={{ width: `${d.score}%`, background: d.color }}
                        />
                      </div>
                      <span className="score-value">{d.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="results-actions">
              <button className="btn-nav prev" onClick={() => navigate('/survey')}>
                ← Edit Responses
              </button>
              <button
                className="btn-submit"
                onClick={() => window.print()}
              >
                🖨️ Print / Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
