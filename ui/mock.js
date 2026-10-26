// Фейковое API для проверки интерфейса в обычном браузере: index.html?mock (или ?mock&auth)
(() => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const artists = ['Ночные окна', 'Сигнал', 'Low Tide', 'Мята', 'Kite Club', 'Полосы', 'Северный ветер', 'Glasshouse'];
  const words = ['Неон', 'Тихий', 'город', 'Midnight', 'дождь', 'Echo', 'провода', 'Лето', 'Static', 'огни',
    'Полночь', 'Drift', 'море', 'Satellite', 'утро', 'Paper', 'звёзды', 'Ultra', 'туман', 'Velvet'];
  const colors = ['#61afef', '#c678dd', '#98c379', '#e5c07b', '#e06c75', '#56b6c2', '#d19a66'];
  let rnd = 7;
  const rand = n => { rnd = (rnd * 16807) % 2147483647; return rnd % n; };
  const cover = i => 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><defs><linearGradient id="g" x2="1" y2="1">`
    + `<stop offset="0" stop-color="${colors[i % 7]}"/><stop offset="1" stop-color="#282c34"/></linearGradient></defs>`
    + '<rect width="10" height="10" fill="url(#g)"/></svg>');
  let nextId = 1000;
  const make = n => Array.from({ length: n }, () => {
    const id = nextId++;
    const a = rand(8), b = rand(8);
    const list = [{ id: 500 + a, name: artists[a] }];
    if (rand(5) === 0 && b !== a) list.push({ id: 500 + b, name: artists[b] });
    return {
      id: `${id}:${id * 3}`,
      title: `${words[rand(20)]} ${words[rand(20)].toLowerCase()}`,
      artists: list.map(x => x.name).join(', '),
      artistList: list,
      duration: 120 + rand(180),
      cover: rand(6) ? cover(id) : null,
      available: rand(25) !== 0,
      liked: false,
    };
  });
  const lists = { liked: make(64), 1: make(18), 2: make(7), 3: [] };
  lists.liked.forEach(t => { t.liked = true; });
  const likedIds = new Set(lists.liked.map(t => t.id));
  const artistTracks = {};
  const playlists = [
    { id: '1', title: 'В дорогу', count: 18, icon: 'list' },
    { id: '2', title: 'Фокус и работа без слов', count: 7, icon: 'list' },
    { id: '3', title: 'Пустой', count: 0, icon: 'list' },
  ];

  // 8 секунд тихого тона — хватает, чтобы проверить переход к следующему треку
  function toneUrl(seconds, freq) {
    const rate = 8000, n = rate * seconds, buf = new DataView(new ArrayBuffer(44 + n * 2));
    const str = (o, s) => [...s].forEach((c, i) => buf.setUint8(o + i, c.charCodeAt(0)));
    str(0, 'RIFF'); buf.setUint32(4, 36 + n * 2, true); str(8, 'WAVEfmt ');
    buf.setUint32(16, 16, true); buf.setUint16(20, 1, true); buf.setUint16(22, 1, true);
    buf.setUint32(24, rate, true); buf.setUint32(28, rate * 2, true); buf.setUint16(32, 2, true);
    buf.setUint16(34, 16, true); str(36, 'data'); buf.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) buf.setInt16(44 + i * 2, Math.sin(i / rate * freq * 2 * Math.PI) * 600, true);
    return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
  }

  // текст-заглушка: синхронные строки через каждые 0.8 с
  const placeholderLyrics = synced => ({
    synced,
    lines: Array.from({ length: 14 }, (_, i) => ({
      t: synced ? i * 0.8 : null,
      text: i % 5 === 4 ? '' : `строка ${i + 1} — здесь будет текст песни`,
    })),
    writers: ['Автор Тестовый'],
    source: 'Тестовый источник',
  });

  let authorized = new URLSearchParams(location.search).has('auth');
  const me = { authorized: true, name: 'мой аккаунт', plus: true };

  window.pywebview = {
    api: {
      status: async () => { await sleep(400); return authorized ? me : { authorized: false }; },
      login: async () => { await sleep(1200); authorized = true; return me; },
      set_token: async t => (t.length > 20 ? (authorized = true, me) : { authorized: false, error: 'Не похоже на токен' }),
      logout: async () => { authorized = false; return { authorized: false }; },
      get_library: async () => {
        await sleep(300);
        return [
          { id: 'liked', title: 'Мне нравится', count: lists.liked.length, icon: 'heart' },
          { id: 'wave', title: 'Моя волна', count: null, icon: 'wave' },
          ...playlists,
        ];
      },
      get_tracks: async id => { await sleep(350); return lists[id].slice(); },
      get_stream: async () => { await sleep(150); return { url: toneUrl(8, 220 + rand(200)), codec: 'mp3', bitrate: 320, preview: false }; },
      get_lyrics: async id => { await sleep(300); const n = parseInt(id, 10); return n % 3 === 0 ? null : placeholderLyrics(n % 3 === 1); },
      toggle_like: async id => {
        await sleep(150);
        likedIds.has(id) ? likedIds.delete(id) : likedIds.add(id);
        return likedIds.has(id);
      },
      get_wave_settings: async () => {
        await sleep(300);
        return {
          contexts: [
            { seed: 'activity:wake-up', name: 'Просыпаюсь' }, { seed: 'activity:road-trip', name: 'В дороге' },
            { seed: 'activity:work-background', name: 'Работаю' }, { seed: 'activity:workout', name: 'Тренируюсь' },
            { seed: 'activity:fall-asleep', name: 'Засыпаю' },
          ],
          groups: [
            { key: 'diversity', title: 'Характер', values: [
              { seed: 'settingDiversity:favorite', name: 'Любимое' }, { seed: 'settingDiversity:discover', name: 'Незнакомое' },
              { seed: 'settingDiversity:popular', name: 'Популярное' }] },
            { key: 'mood_energy', title: 'Настроение', values: [
              { seed: 'settingMoodEnergy:active', name: 'Бодрое' }, { seed: 'settingMoodEnergy:fun', name: 'Весёлое' },
              { seed: 'settingMoodEnergy:calm', name: 'Спокойное' }, { seed: 'settingMoodEnergy:sad', name: 'Грустное' }] },
            { key: 'language', title: 'Язык', values: [
              { seed: 'settingLanguage:russian', name: 'Русский' }, { seed: 'settingLanguage:not-russian', name: 'Иностранный' },
              { seed: 'settingLanguage:without-words', name: 'Без слов' }] },
          ],
        };
      },
      wave_start: async seeds => { await sleep(400); console.log('wave_start', seeds); return make(5); },
      wave_playlist: async kind => { await sleep(400); return { seeds: [`playlist:1_${kind}`], tracks: make(5) }; },
      wave_more: async () => { await sleep(300); return make(5); },
      wave_feedback: async (event, id, played) => { console.log('wave_feedback', event, id, played); return true; },
      playlist_add: async (kind, id) => {
        await sleep(200);
        const list = lists[kind];
        if (list.some(t => t.id === id)) return { added: false, count: list.length };
        const t = Object.values(lists).flat().find(x => x.id === id);
        list.unshift({ ...t });
        return { added: true, count: list.length };
      },
      playlist_remove: async (kind, id) => {
        await sleep(200);
        const list = lists[kind];
        const i = list.findIndex(t => t.id === id);
        if (i < 0) return { removed: false, count: list.length };
        list.splice(i, 1);
        return { removed: true, count: list.length };
      },
      playlist_create: async title => {
        await sleep(200);
        const id = String(10 + playlists.length);
        lists[id] = [];
        const p = { id, title, count: 0, icon: 'list' };
        playlists.push(p);
        return { ...p };
      },
      set_title: async t => { document.title = t; },
      set_titlebar: async () => true,
      set_playing: async () => true,
      get_artist: async id => {
        await sleep(300);
        const n = Number(id) - 500;
        return {
          id: String(id),
          name: artists[n] || 'Исполнитель',
          cover: n % 3 ? cover(n) : null,
          genres: ['electronics', 'indie'],
          tracks: 64,
          listeners: 12345 * (n + 1),
          similar: artists.map((name, k) => ({ id: String(500 + k), name, cover: cover(k) }))
            .filter(s => s.id !== String(id)).slice(0, 6),
        };
      },
      get_artist_tracks: async (id, page) => {
        await sleep(300);
        const name = artists[Number(id) - 500] || 'Исполнитель';
        artistTracks[id] = artistTracks[id] || make(64).map(t => ({ ...t, artists: name, artistList: [{ id: Number(id), name }] }));
        return { tracks: artistTracks[id].slice(page * 50, page * 50 + 50), total: artistTracks[id].length };
      },
      get_settings: async () => JSON.parse(localStorage.getItem('odp.mockSettings') || '{}'),
      save_settings: async s => { localStorage.setItem('odp.mockSettings', JSON.stringify(s)); return true; },
    },
  };
})();
