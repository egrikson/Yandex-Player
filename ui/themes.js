'use strict';

// Темы оформления. Палитры навеяны одноимёнными темами редакторов и Obsidian.
// border — разделители, field — фон полей ввода и «чипов», accent-fg — текст на акцентном цвете.
const THEMES = {
  onedark: {
    name: 'One Dark',
    dark: true,
    vars: {
      bg: '#282c34', 'bg-panel': '#21252b', 'bg-deep': '#181a1f', field: '#1d2026',
      line: '#2c313c', hover: '#2c313a', selection: '#3e4451', 'btn-hover': '#4b5263',
      fg: '#abb2bf', 'fg-bright': '#d7dae0', muted: '#7f848e', comment: '#5c6370', gutter: '#495162',
      red: '#e06c75', orange: '#d19a66', yellow: '#e5c07b', green: '#98c379',
      cyan: '#56b6c2', blue: '#61afef', purple: '#c678dd', accent: '#568af2', 'accent-fg': '#ffffff',
    },
  },
  gruvbox: {
    name: 'Gruvbox',
    dark: true,
    vars: {
      bg: '#282828', 'bg-panel': '#1d2021', 'bg-deep': '#141617', field: '#191b1c',
      line: '#32302f', hover: '#3c3836', selection: '#504945', 'btn-hover': '#665c54',
      fg: '#ebdbb2', 'fg-bright': '#fbf1c7', muted: '#a89984', comment: '#928374', gutter: '#665c54',
      red: '#fb4934', orange: '#fe8019', yellow: '#fabd2f', green: '#b8bb26',
      cyan: '#8ec07c', blue: '#83a598', purple: '#d3869b', accent: '#d79921', 'accent-fg': '#1d2021',
    },
  },
  bluetopaz: {
    name: 'Blue Topaz',
    dark: true,
    vars: {
      bg: '#1b2232', 'bg-panel': '#161c29', 'bg-deep': '#0f141e', field: '#121824',
      line: '#222b3d', hover: '#242e42', selection: '#2f3b55', 'btn-hover': '#3b4a69',
      fg: '#c9d4e5', 'fg-bright': '#eef3fb', muted: '#8a98b0', comment: '#5f6c84', gutter: '#46536b',
      red: '#f07178', orange: '#f0a45d', yellow: '#f2d479', green: '#9ccc8a',
      cyan: '#6ed0e0', blue: '#5fb3f3', purple: '#b49cf0', accent: '#3d8fd6', 'accent-fg': '#ffffff',
    },
  },
  wasp: {
    name: 'Wasp',
    dark: true,
    vars: {
      bg: '#1a1a1a', 'bg-panel': '#121212', 'bg-deep': '#0a0a0a', field: '#0e0e0e',
      line: '#222222', hover: '#262626', selection: '#333333', 'btn-hover': '#404040',
      fg: '#d6d6d6', 'fg-bright': '#f5f5f5', muted: '#8f8f8f', comment: '#6b6b6b', gutter: '#4d4d4d',
      red: '#ff6b6b', orange: '#ffa94d', yellow: '#ffd43b', green: '#8ce99a',
      cyan: '#66d9e8', blue: '#ffd43b', purple: '#da77f2', accent: '#fcc419', 'accent-fg': '#121212',
    },
  },
  githubdark: {
    name: 'GitHub Dark',
    dark: true,
    vars: {
      bg: '#0d1117', 'bg-panel': '#161b22', 'bg-deep': '#010409', field: '#0d1117',
      line: '#161b22', hover: '#1f242c', selection: '#2d333b', 'btn-hover': '#373e47',
      fg: '#c9d1d9', 'fg-bright': '#f0f6fc', muted: '#8b949e', comment: '#6e7681', gutter: '#484f58',
      red: '#ff7b72', orange: '#ffa657', yellow: '#e3b341', green: '#7ee787',
      cyan: '#a5d6ff', blue: '#79c0ff', purple: '#d2a8ff', accent: '#1f6feb', 'accent-fg': '#ffffff',
    },
  },
  githublight: {
    name: 'GitHub Light',
    dark: false,
    vars: {
      bg: '#ffffff', 'bg-panel': '#f6f8fa', 'bg-deep': '#d0d7de', field: '#ffffff',
      line: '#f6f8fa', hover: '#eaeef2', selection: '#ddf4ff', 'btn-hover': '#d0d7de',
      fg: '#424a53', 'fg-bright': '#1f2328', muted: '#656d76', comment: '#8c959f', gutter: '#afb8c1',
      red: '#cf222e', orange: '#bc4c00', yellow: '#9a6700', green: '#1a7f37',
      cyan: '#1b7c83', blue: '#0969da', purple: '#8250df', accent: '#0969da', 'accent-fg': '#ffffff',
    },
  },
  min: {
    name: 'Min',
    dark: true,
    vars: {
      bg: '#1e1e1e', 'bg-panel': '#191919', 'bg-deep': '#111111', field: '#161616',
      line: '#252525', hover: '#262626', selection: '#333333', 'btn-hover': '#3d3d3d',
      fg: '#bababa', 'fg-bright': '#dadada', muted: '#8a8a8a', comment: '#666666', gutter: '#4a4a4a',
      red: '#e5786d', orange: '#d7a564', yellow: '#d8c26a', green: '#9ac17c',
      cyan: '#7fbfbf', blue: '#9b8cec', purple: '#b29ad6', accent: '#8a74e0', 'accent-fg': '#ffffff',
    },
  },
};

function applyThemeVars(id) {
  const theme = THEMES[id] || THEMES.onedark;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) root.style.setProperty(`--${key}`, value);
  root.style.colorScheme = theme.dark ? 'dark' : 'light';
  root.dataset.theme = THEMES[id] ? id : 'onedark';
  return theme;
}

// сразу при загрузке, чтобы не мигала тема по умолчанию
try { applyThemeVars(JSON.parse(localStorage.getItem('odp.theme'))); } catch { /* тема по умолчанию */ }
