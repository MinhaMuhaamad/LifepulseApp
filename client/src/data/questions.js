// src/data/questions.js
// 60 questions across 6 life categories, 10 per category
// Each category uses at least 3 different input types

const questions = [
  // ─────────────────────────── SOCIAL (1–10) ───────────────────────────
  {
    id: 's01', category: 'social',
    text: 'How many meaningful conversations do you have per week?',
    type: 'slider', min: 0, max: 30, step: 1, unit: 'conversations', default: 5
  },
  {
    id: 's02', category: 'social',
    text: 'How comfortable are you in large social gatherings?',
    type: 'emojiscale',
    options: ['😰', '😟', '😐', '😊', '🥳'],
    labels: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Love It']
  },
  {
    id: 's03', category: 'social',
    text: 'Do you prefer working alone or in a group?',
    type: 'mcq',
    options: ['Always alone', 'Mostly alone', 'Depends on the task', 'Mostly in a group', 'Always in a group']
  },
  {
    id: 's04', category: 'social',
    text: 'How many hours per day do you spend on social media?',
    type: 'range', min: 0, max: 12, step: 0.5, unit: 'hrs/day',
    rangeLabels: ['None', '12 hrs']
  },
  {
    id: 's05', category: 'social',
    text: 'Which social environment feels most natural to you?',
    type: 'imagechoice',
    options: [
      { label: 'Coffee Shop', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&h=120&fit=crop' },
      { label: 'House Party', img: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=200&h=120&fit=crop' },
      { label: 'Online Chat', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=120&fit=crop' },
      { label: 'Park Walk', img: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=200&h=120&fit=crop' }
    ]
  },
  {
    id: 's06', category: 'social',
    text: 'How strongly do you feel connected to your local community?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 5
  },
  {
    id: 's07', category: 'social',
    text: 'How well do you resist peer pressure when you disagree with the crowd?',
    type: 'emojiscale',
    options: ['😓', '😕', '😐', '💪', '🦁'],
    labels: ['Easily swayed', 'Often give in', 'Sometimes', 'Usually hold firm', 'Always stand ground']
  },
  {
    id: 's08', category: 'social',
    text: 'How often do you take on a leadership role in group settings?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 4
  },
  {
    id: 's09', category: 'social',
    text: 'How would you describe your social anxiety level?',
    type: 'mcq',
    options: ['None — I thrive socially', 'Mild — occasionally nervous', 'Moderate — often anxious', 'High — frequently anxious', 'Severe — avoids social situations']
  },
  {
    id: 's10', category: 'social',
    text: 'Rate the overall depth of your friendships.',
    type: 'range', min: 1, max: 10, step: 1, unit: '/10',
    rangeLabels: ['Shallow', 'Very deep']
  },

  // ─────────────────────────── EDUCATIONAL (11–20) ───────────────────────────
  {
    id: 'ed01', category: 'educational',
    text: 'How many hours per day do you dedicate to studying or learning?',
    type: 'slider', min: 0, max: 16, step: 0.5, unit: 'hrs/day', default: 3
  },
  {
    id: 'ed02', category: 'educational',
    text: 'Which learning style suits you best?',
    type: 'imagechoice',
    options: [
      { label: 'Visual', img: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=200&h=120&fit=crop' },
      { label: 'Auditory', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=120&fit=crop' },
      { label: 'Reading/Writing', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=120&fit=crop' },
      { label: 'Hands-on', img: 'https://images.unsplash.com/photo-1581092787765-e3feb951d987?w=200&h=120&fit=crop' }
    ]
  },
  {
    id: 'ed03', category: 'educational',
    text: 'Do you prefer self-study or classroom/structured learning?',
    type: 'mcq',
    options: ['Purely self-directed', 'Mostly self-study with some guidance', 'Mix of both', 'Mostly classroom', 'Fully structured/classroom']
  },
  {
    id: 'ed04', category: 'educational',
    text: 'How would you rate your current academic stress level?',
    type: 'range', min: 0, max: 10, step: 1, unit: '/10',
    rangeLabels: ['No stress', 'Extreme stress']
  },
  {
    id: 'ed05', category: 'educational',
    text: 'How curious are you about exploring subjects outside your field?',
    type: 'emojiscale',
    options: ['😴', '🙂', '😊', '🤓', '🚀'],
    labels: ['Not at all', 'A little', 'Moderately', 'Very curious', 'Obsessively curious']
  },
  {
    id: 'ed06', category: 'educational',
    text: 'How many books or long-form articles do you read per month?',
    type: 'slider', min: 0, max: 20, step: 1, unit: 'books/articles', default: 2
  },
  {
    id: 'ed07', category: 'educational',
    text: 'How clear are you about your career path?',
    type: 'mcq',
    options: ['Completely lost', 'Have a vague idea', 'Somewhat clear', 'Mostly clear', 'Crystal clear']
  },
  {
    id: 'ed08', category: 'educational',
    text: 'How often do you engage with online courses or tutorials?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 4
  },
  {
    id: 'ed09', category: 'educational',
    text: 'How accessible is mentorship or academic guidance in your life?',
    type: 'range', min: 0, max: 10, step: 1, unit: '/10',
    rangeLabels: ['No access', 'Excellent access']
  },
  {
    id: 'ed10', category: 'educational',
    text: 'How motivated are you to continue learning throughout your life?',
    type: 'emojiscale',
    options: ['😑', '😕', '🙂', '😃', '🌟'],
    labels: ['Not motivated', 'Low motivation', 'Moderate', 'Motivated', 'Deeply passionate']
  },

  // ─────────────────────────── EMOTIONAL (21–30) ───────────────────────────
  {
    id: 'em01', category: 'emotional',
    text: 'Rate your overall emotional wellbeing this month.',
    type: 'emojiscale',
    options: ['😭', '😔', '😐', '😊', '🌈'],
    labels: ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent']
  },
  {
    id: 'em02', category: 'emotional',
    text: 'How frequently do you experience significant stress?',
    type: 'slider', min: 0, max: 7, step: 1, unit: 'days/week', default: 2
  },
  {
    id: 'em03', category: 'emotional',
    text: 'How well are you able to regulate your emotions in difficult situations?',
    type: 'range', min: 0, max: 10, step: 1, unit: '/10',
    rangeLabels: ['Struggle a lot', 'Excellent control']
  },
  {
    id: 'em04', category: 'emotional',
    text: 'How would you rate your average sleep quality?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 6
  },
  {
    id: 'em05', category: 'emotional',
    text: 'Do you have a journaling or self-reflection habit?',
    type: 'mcq',
    options: ['Never', 'Rarely (a few times a year)', 'Sometimes (monthly)', 'Regularly (weekly)', 'Daily practice']
  },
  {
    id: 'em06', category: 'emotional',
    text: 'How open are you to seeking professional mental health support?',
    type: 'emojiscale',
    options: ['🚫', '😬', '🤔', '👍', '💚'],
    labels: ['Strongly opposed', 'Reluctant', 'Neutral', 'Open', 'Actively seeking']
  },
  {
    id: 'em07', category: 'emotional',
    text: 'How often do you experience feelings of loneliness?',
    type: 'range', min: 0, max: 7, step: 1, unit: 'days/week',
    rangeLabels: ['Never', 'Every day']
  },
  {
    id: 'em08', category: 'emotional',
    text: 'How would you rate your overall optimism about the future?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 6
  },
  {
    id: 'em09', category: 'emotional',
    text: 'How comfortable are you expressing your emotions to others?',
    type: 'imagechoice',
    options: [
      { label: 'Very Private', img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=200&h=120&fit=crop' },
      { label: 'Selective', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=120&fit=crop' },
      { label: 'Open', img: 'https://images.unsplash.com/photo-1516914589923-f105f1535f88?w=200&h=120&fit=crop' },
      { label: 'Very Open', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&h=120&fit=crop' }
    ]
  },
  {
    id: 'em10', category: 'emotional',
    text: 'How well do you practice self-compassion when you make mistakes?',
    type: 'emojiscale',
    options: ['😤', '😞', '😐', '🤗', '💝'],
    labels: ['Very self-critical', 'Often harsh', 'Neutral', 'Kind to self', 'Very compassionate']
  },

  // ─────────────────────────── CULTURAL (31–40) ───────────────────────────
  {
    id: 'cu01', category: 'cultural',
    text: 'Which environment makes you feel most at peace?',
    type: 'imagechoice',
    options: [
      { label: 'City', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=120&fit=crop' },
      { label: 'Nature/Forest', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&h=120&fit=crop' },
      { label: 'Ocean', img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=200&h=120&fit=crop' },
      { label: 'Village', img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&h=120&fit=crop' }
    ]
  },
  {
    id: 'cu02', category: 'cultural',
    text: 'How strongly do you identify with your cultural heritage?',
    type: 'mcq',
    options: ['Not at all', 'Slightly', 'Moderately', 'Strongly', 'It defines me']
  },
  {
    id: 'cu03', category: 'cultural',
    text: 'Where do you fall on the traditional vs modern values spectrum?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10 (0=traditional, 10=modern)', default: 5
  },
  {
    id: 'cu04', category: 'cultural',
    text: 'How comfortable are you interacting with people from very different cultures?',
    type: 'range', min: 0, max: 10, step: 1, unit: '/10',
    rangeLabels: ['Uncomfortable', 'Completely at ease']
  },
  {
    id: 'cu05', category: 'cultural',
    text: 'How much does the culture of media you consume reflect your own background?',
    type: 'emojiscale',
    options: ['🌍', '🌐', '⚖️', '🏠', '🎯'],
    labels: ['Mostly foreign', 'Mix of both', 'Balanced', 'Mostly local', 'Exclusively local']
  },
  {
    id: 'cu06', category: 'cultural',
    text: 'How important are cultural celebrations and traditions to you?',
    type: 'imagechoice',
    options: [
      { label: 'Not important', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=120&fit=crop' },
      { label: 'Somewhat', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&h=120&fit=crop' },
      { label: 'Important', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=120&fit=crop' },
      { label: 'Very important', img: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=200&h=120&fit=crop' }
    ]
  },
  {
    id: 'cu07', category: 'cultural',
    text: 'How diverse is your diet in terms of different cultural cuisines?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 5
  },
  {
    id: 'cu08', category: 'cultural',
    text: 'How open are you to international travel and immersing in foreign cultures?',
    type: 'mcq',
    options: ['Not interested', 'Mildly curious', 'Would love to try', 'Actively plan to travel', 'Passionate traveler / already do']
  },
  {
    id: 'cu09', category: 'cultural',
    text: 'How significant is religious or spiritual practice in your daily life?',
    type: 'range', min: 0, max: 10, step: 1, unit: '/10',
    rangeLabels: ['Not significant', 'Central to life']
  },
  {
    id: 'cu10', category: 'cultural',
    text: 'How much do you value multilingualism — speaking or learning multiple languages?',
    type: 'emojiscale',
    options: ['😑', '🙂', '😊', '🤩', '🌐'],
    labels: ['No value', 'Some interest', 'Fairly important', 'Very valuable', 'Core priority']
  },

  // ─────────────────────────── DIGITAL / TECH (41–50) ───────────────────────────
  {
    id: 'dt01', category: 'digital',
    text: 'How many hours per day do you spend in front of screens (total)?',
    type: 'slider', min: 0, max: 18, step: 0.5, unit: 'hrs/day', default: 6
  },
  {
    id: 'dt02', category: 'digital',
    text: 'How much does social media positively impact your life?',
    type: 'range', min: 0, max: 10, step: 1, unit: '/10',
    rangeLabels: ['Very negative', 'Very positive']
  },
  {
    id: 'dt03', category: 'digital',
    text: 'How dependent on technology do you feel in your daily life?',
    type: 'emojiscale',
    options: ['🧘', '🙂', '📱', '😰', '🤖'],
    labels: ['Not at all', 'Slightly', 'Moderately', 'Highly', 'Completely dependent']
  },
  {
    id: 'dt04', category: 'digital',
    text: 'How often do you deliberately disconnect from all devices (digital detox)?',
    type: 'mcq',
    options: ['Never', 'Rarely (once a year)', 'Occasionally (few times/year)', 'Regularly (monthly)', 'Frequently (weekly or more)']
  },
  {
    id: 'dt05', category: 'digital',
    text: 'How aware are you of AI and its impact on your profession/life?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 5
  },
  {
    id: 'dt06', category: 'digital',
    text: 'How concerned are you about your online privacy and data security?',
    type: 'imagechoice',
    options: [
      { label: 'Not concerned', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=120&fit=crop' },
      { label: 'Slightly', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=120&fit=crop' },
      { label: 'Moderately', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200&h=120&fit=crop' },
      { label: 'Very concerned', img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=200&h=120&fit=crop' }
    ]
  },
  {
    id: 'dt07', category: 'digital',
    text: 'How many hours per week do you spend gaming (video/mobile/PC)?',
    type: 'range', min: 0, max: 40, step: 1, unit: 'hrs/week',
    rangeLabels: ['None', '40+ hrs']
  },
  {
    id: 'dt08', category: 'digital',
    text: 'How comfortable are you with fully remote work or study?',
    type: 'mcq',
    options: ['Prefer in-person only', 'Prefer in-person, open to hybrid', 'No preference', 'Prefer remote, open to hybrid', 'Fully remote only']
  },
  {
    id: 'dt09', category: 'digital',
    text: 'How interested are you in creating digital content (videos, blogs, podcasts, etc.)?',
    type: 'emojiscale',
    options: ['😒', '🤷', '🙂', '🎬', '🌟'],
    labels: ['Not interested', 'Meh', 'Somewhat', 'Very interested', 'Active creator']
  },
  {
    id: 'dt10', category: 'digital',
    text: 'How often do you use technology to improve your personal productivity?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 5
  },

  // ─────────────────────────── ENVIRONMENTAL (51–60) ───────────────────────────
  {
    id: 'ev01', category: 'environmental',
    text: 'How often do you practice eco-conscious habits (recycling, reducing waste)?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 5
  },
  {
    id: 'ev02', category: 'environmental',
    text: 'How frequently do you recycle or sort your household waste?',
    type: 'range', min: 0, max: 7, step: 1, unit: 'days/week',
    rangeLabels: ['Never', 'Every day']
  },
  {
    id: 'ev03', category: 'environmental',
    text: 'How concerned are you about climate change?',
    type: 'mcq',
    options: ['Not concerned', 'Slightly concerned', 'Moderately concerned', 'Very concerned', 'Extremely concerned — it affects my daily decisions']
  },
  {
    id: 'ev04', category: 'environmental',
    text: 'How much time do you spend in nature per week?',
    type: 'imagechoice',
    options: [
      { label: 'Rarely', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&h=120&fit=crop' },
      { label: '1–2 hrs', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=200&h=120&fit=crop' },
      { label: '3–7 hrs', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=120&fit=crop' },
      { label: '8+ hrs', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=120&fit=crop' }
    ]
  },
  {
    id: 'ev05', category: 'environmental',
    text: 'How likely are you to pay more for sustainably sourced or eco-friendly products?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10', default: 5
  },
  {
    id: 'ev06', category: 'environmental',
    text: 'How mindful are you about your household energy usage?',
    type: 'emojiscale',
    options: ['🙈', '😕', '🤔', '♻️', '🌱'],
    labels: ['Not at all', 'Rarely', 'Sometimes', 'Often', 'Always conscious']
  },
  {
    id: 'ev07', category: 'environmental',
    text: 'How often do you use public transport, cycle, or walk instead of driving?',
    type: 'range', min: 0, max: 7, step: 1, unit: 'days/week',
    rangeLabels: ['Never', 'Every day']
  },
  {
    id: 'ev08', category: 'environmental',
    text: 'How open are you to reducing meat/animal products in your diet for the environment?',
    type: 'mcq',
    options: ['Not open at all', 'Slightly open', 'Already reducing', 'Mostly plant-based', 'Fully plant-based / vegan']
  },
  {
    id: 'ev09', category: 'environmental',
    text: 'How would you rate the overall environmental footprint of your lifestyle?',
    type: 'slider', min: 0, max: 10, step: 1, unit: '/10 (0=very low, 10=very high)', default: 5
  },
  {
    id: 'ev10', category: 'environmental',
    text: 'How engaged are you with environmental activism or community environmental efforts?',
    type: 'emojiscale',
    options: ['😶', '👀', '🙋', '📣', '🌍'],
    labels: ['Not engaged', 'Aware only', 'Occasionally involved', 'Actively involved', 'Leading efforts']
  }
];

export default questions;
