// =============================================================
// BACKEND — DevLevelUp Express API Server (Unified)
// This file contains all API logic, routes, and quiz data.
// Deploy this folder (/backend) on Railway.
// =============================================================

const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Quiz Data (Models) ---
const QUIZ_QUESTIONS = {
  'HTML': [
    { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'], answer: 0 },
    { question: 'Which tag is used for the largest heading?', options: ['<h1>', '<h6>', '<head>', '<heading>'], answer: 0 },
    { question: 'Which attribute is used to provide a unique identifier?', options: ['class', 'id', 'name', 'type'], answer: 1 },
    { question: 'What is the correct HTML element for inserting a line break?', options: ['<br>', '<lb>', '<break>', '<line>'], answer: 0 },
    { question: 'Which tag is used to create a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], answer: 1 },
    { question: 'What is the purpose of the alt attribute in <img> tag?', options: ['Alternative text for screen readers', 'Alternative image source', 'Image alignment', 'Image size'], answer: 0 },
    { question: 'Which HTML element defines a table row?', options: ['<table>', '<tr>', '<td>', '<th>'], answer: 1 },
    { question: 'What is the correct way to comment in HTML?', options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'], answer: 2 },
    { question: 'Which input type creates a checkbox?', options: ['text', 'checkbox', 'radio', 'button'], answer: 1 },
    { question: 'What does the <meta> tag do?', options: ['Creates metadata about the document', 'Creates a menu', 'Creates a table', 'Creates a form'], answer: 0 }
  ],
  'CSS': [
    { question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'], answer: 1 },
    { question: 'Which property is used to change text color?', options: ['font-color', 'text-color', 'color', 'foreground-color'], answer: 2 },
    { question: 'How do you select an element with id "demo"?', options: ['.demo', '#demo', 'demo', '*demo'], answer: 1 },
    { question: 'Which property controls the space between elements?', options: ['margin', 'padding', 'border', 'spacing'], answer: 0 },
    { question: 'What is the correct syntax for external CSS?', options: ['<style src="style.css">', '<link rel="stylesheet" href="style.css">', '<css href="style.css">', '<stylesheet>style.css</stylesheet>'], answer: 1 },
    { question: 'Which value of display property hides an element?', options: ['hidden', 'none', 'invisible', 'hide'], answer: 1 },
    { question: 'What does the z-index property control?', options: ['Element size', 'Element position', 'Stacking order', 'Element width'], answer: 2 },
    { question: 'Which pseudo-class selects the first child?', options: [':first', ':first-child', ':child-first', ':initial'], answer: 1 },
    { question: 'What is the default position value?', options: ['static', 'relative', 'absolute', 'fixed'], answer: 0 },
    { question: 'Which property is used for rounded corners?', options: ['corner-radius', 'border-radius', 'round-corner', 'corner-round'], answer: 1 }
  ],
  'JavaScript': [
    { question: 'Which keyword declares a variable in JavaScript?', options: ['var', 'let', 'const', 'All of the above'], answer: 3 },
    { question: 'What is the correct way to write an array in JavaScript?', options: ['var arr = (1,2,3)', 'var arr = [1,2,3]', 'var arr = {1,2,3}', 'var arr = <1,2,3>'], answer: 1 },
    { question: 'Which operator is used for strict equality?', options: ['==', '===', '!=', '!=='], answer: 1 },
    { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Dynamic Object Model'], answer: 0 },
    { question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 0 },
    { question: 'What is a closure in JavaScript?', options: ['A way to close browser', 'Function with access to outer scope', 'A type of loop', 'Error handling mechanism'], answer: 1 },
    { question: 'Which keyword is used for asynchronous operations?', options: ['async', 'await', 'promise', 'All of the above'], answer: 3 },
    { question: 'What does JSON.parse() do?', options: ['Converts object to string', 'Converts string to object', 'Validates JSON', 'Formats JSON'], answer: 1 },
    { question: 'Which method is used to select an element by ID?', options: ['getElementById()', 'querySelector()', 'getElementsByClassName()', 'getElementsByTagName()'], answer: 0 },
    { question: 'What is the purpose of the "this" keyword?', options: ['Refers to current object', 'Refers to global object', 'Creates new object', 'Deletes object'], answer: 0 }
  ],
  'React': [
    { question: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'], answer: 0 },
    { question: 'Which hook manages component state?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], answer: 1 },
    { question: 'What is the purpose of useEffect?', options: ['Manage state', 'Handle side effects', 'Create components', 'Style components'], answer: 1 },
    { question: 'How do you pass data to a child component?', options: ['state', 'props', 'context', 'redux'], answer: 1 },
    { question: 'What is the virtual DOM?', options: ['Copy of real DOM', 'React\'s representation of DOM', 'Browser DOM', 'Component tree'], answer: 1 }
  ],
  'Node.js': [
    { question: 'What is Node.js?', options: ['Web browser', 'JavaScript runtime', 'Database', 'CSS framework'], answer: 1 },
    { question: 'Which module is used for file operations?', options: ['http', 'fs', 'path', 'url'], answer: 1 },
    { question: 'What does npm stand for?', options: ['Node Package Manager', 'New Package Module', 'Node Program Manager', 'Network Package Manager'], answer: 0 },
    { question: 'Which method creates an HTTP server?', options: ['http.createServer()', 'server.create()', 'http.server()', 'create.http()'], answer: 0 },
    { question: 'What is middleware in Express?', options: ['Database', 'Function that processes requests', 'Template engine', 'Authentication system'], answer: 1 }
  ]
};

const TOPICS = Object.keys(QUIZ_QUESTIONS);
let attempts = [];
let users = [];

// --- Routes ---

// Health Check (Required for Railway)
app.get('/', (req, res) => {
  res.send('Backend working');
});

// GET /analyze/:username
app.get('/analyze/:username', async (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400).json({ error: 'Username required' });
  if (!GITHUB_TOKEN) return res.status(500).json({ error: 'GITHUB_TOKEN missing' });

  try {
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'devlevelup-backend'
    };

    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) throw new Error('User not found');
    const userData = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, { headers });
    const repos = await repoRes.json();
    const topRepos = repos.map(r => ({ name: r.name, language: r.language, stars: r.stargazers_count }));

    // Mock AI Analysis for minimal deployment
    const analysis = JSON.stringify({
      skillScore: 85,
      skillLevel: 'Advanced',
      strongSkills: topRepos.map(r => r.language).filter(Boolean),
      weakAreas: ['Unit Testing', 'CI/CD'],
      suggestions: ['Add more documentation to your top repos.']
    });

    res.json({
      github: {
        login: userData.login,
        name: userData.name,
        public_repos: userData.public_repos,
        followers: userData.followers,
        bio: userData.bio,
        html_url: userData.html_url,
        avatar_url: userData.avatar_url
      },
      repos: topRepos,
      analysis
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verification API
app.get('/api/verification/topics', (req, res) => {
  res.json({ topics: TOPICS, count: TOPICS.length });
});

app.get('/api/verification/test/:topic', (req, res) => {
  const { topic } = req.params;
  const questions = QUIZ_QUESTIONS[topic];
  if (!questions) return res.status(404).json({ error: 'Topic not found' });

  const sanitized = questions.map((q, i) => ({ id: `${topic}-${i}`, question: q.question, options: q.options }));
  res.json({ topic, questions: sanitized, totalQuestions: sanitized.length });
});

app.post('/api/verification/submit', (req, res) => {
  const { topic, answers, username = 'demo_user' } = req.body;
  const questions = QUIZ_QUESTIONS[topic];
  if (!questions) return res.status(404).json({ error: 'Topic not found' });

  let score = 0;
  const results = Object.entries(answers).map(([id, answer]) => {
    const idx = parseInt(id.split('-')[1]);
    const isCorrect = questions[idx].answer === answer;
    if (isCorrect) score++;
    return { question: questions[idx].question, isCorrect };
  });

  const passed = score >= 7;
  const attempt = { id: Date.now(), username, topic, score, passed, createdAt: new Date() };
  attempts.push(attempt);

  if (passed) {
    let user = users.find(u => u.username === username);
    if (!user) { user = { username, verifiedSkills: [] }; users.push(user); }
    if (!user.verifiedSkills.includes(topic)) user.verifiedSkills.push(topic);
  }

  res.json({ topic, score, passed, verifiedSkills: users.find(u => u.username === username)?.verifiedSkills || [] });
});

app.get('/api/verification/skills', (req, res) => {
  const username = req.query.username || 'demo_user';
  const user = users.find(u => u.username === username);
  res.json({ username, verifiedSkills: user ? user.verifiedSkills : [], count: user ? user.verifiedSkills.length : 0 });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
