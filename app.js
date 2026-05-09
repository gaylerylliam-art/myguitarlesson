const STORAGE_KEY = "acousticStepsState-v4";

const lessons = [
  {
    id: "parts",
    level: 1,
    title: "Parts of the Guitar",
    minutes: 5,
    summary: "Learn the names of the parts you will touch most often.",
    visual: "guitarMap",
    steps: [
      "Point to the headstock. This is where the tuning pegs live.",
      "Find the neck and frets. Frets are the thin metal strips that divide the notes.",
      "Look at the sound hole and body. The body makes the acoustic guitar louder.",
      "Find the bridge and saddle. The strings are anchored here.",
      "Say each part out loud, then close your eyes and point to it again."
    ],
    practice: "Spend 3 minutes naming the parts from headstock to bridge."
  },
  {
    id: "hold",
    level: 1,
    title: "How to Hold the Guitar",
    minutes: 6,
    summary: "Set up a relaxed posture before playing your first chord.",
    steps: [
      "Sit tall with both feet flat on the floor.",
      "Rest the waist of the guitar on your right leg if you play right-handed.",
      "Keep the guitar close to your body so your shoulders stay relaxed.",
      "Let your fretting thumb rest behind the neck, not over-squeezing it.",
      "Strum gently over the sound hole with your wrist loose."
    ],
    practice: "Hold the guitar for one minute without raising either shoulder."
  },
  {
    id: "tune",
    level: 1,
    title: "How to Tune the Guitar",
    minutes: 8,
    summary: "Tune to E A D G B E before every practice session.",
    steps: [
      "Start with the thickest string. It should be low E.",
      "Use the tuner screen and pluck one string at a time.",
      "Tighten the tuning peg if the note is too low. Loosen it if it is too high.",
      "Tune slowly. Small peg turns make a big difference.",
      "Check all six strings again after you finish because tuning one string can shift another."
    ],
    practice: "Tune all six strings twice, then play one gentle down strum."
  },
  {
    id: "first-chords",
    level: 2,
    title: "Your First Chords",
    minutes: 12,
    summary: "Start with Em, Am, C, G, and D.",
    steps: [
      "Place one finger at a time and press close to the fret wire.",
      "Strum each string slowly and listen for buzzing or muted strings.",
      "Lift your fingers off together, then place them back down together.",
      "Practice Em to Am first because both use simple shapes.",
      "Add C, G, and D when each note rings clearly."
    ],
    practice: "Play Em, Am, C, G, D four times each at a slow tempo."
  },
  {
    id: "diagrams",
    level: 2,
    title: "Reading Chord Diagrams",
    minutes: 7,
    summary: "Understand strings, frets, open strings, muted strings, and finger numbers.",
    steps: [
      "Read diagrams as if the guitar neck is standing upright in front of you.",
      "The vertical lines are strings. The left line is the low E string.",
      "The horizontal lines are frets. Dots show where fingers go.",
      "Numbers inside dots tell you which finger to use: 1 index, 2 middle, 3 ring, 4 pinky.",
      "An O means play the string open. An X means do not play that string."
    ],
    practice: "Open the chord library and explain the C diagram out loud."
  },
  {
    id: "finger-placement",
    level: 2,
    title: "Finger Placement Guide",
    minutes: 9,
    summary: "Make chords cleaner with small finger adjustments.",
    steps: [
      "Use the tips of your fingers, not the flat pads.",
      "Press just behind the fret, close to the metal strip.",
      "Curve each finger so it does not touch a nearby string.",
      "Keep your wrist comfortable and avoid squeezing too hard.",
      "Test one string at a time, then strum the whole chord."
    ],
    practice: "Fix one buzzing note by moving closer to the fret."
  },
  {
    id: "strumming",
    level: 3,
    title: "Basic Strumming Patterns",
    minutes: 10,
    summary: "Play steady down and up strums with relaxed movement.",
    steps: [
      "Count 1, 2, 3, 4 out loud while tapping your foot.",
      "Play four down strums: D D D D.",
      "Add up strums between beats: D U D U D U D U.",
      "Keep your hand moving even when you miss a strum.",
      "Use the metronome at 70 BPM until the rhythm feels steady."
    ],
    practice: "Try D D U U D U for two minutes on Em."
  },
  {
    id: "rhythm",
    level: 3,
    title: "Basic Rhythm and Timing",
    minutes: 10,
    summary: "Learn how beats, bars, and tempo work in simple songs.",
    steps: [
      "A beat is the steady pulse you can tap with your foot.",
      "Most beginner songs use groups of four beats called bars.",
      "Tempo is speed, measured in beats per minute.",
      "Practice slowly first. Clean timing matters more than speed.",
      "Count 1 and 2 and 3 and 4 and while your strumming hand keeps moving."
    ],
    practice: "Set the metronome to 75 BPM and count eight bars without stopping."
  },
  {
    id: "transitions",
    level: 4,
    title: "Chord Transitions",
    minutes: 14,
    summary: "Change chords smoothly without pausing the rhythm.",
    steps: [
      "Choose two chords, such as G and D.",
      "Look for anchor fingers that can stay close to the strings.",
      "Move all fingers together instead of placing them one by one.",
      "Switch on beat 4 at first, then on beat 1 when you improve.",
      "Use slow tempo and repeat the same pair many times."
    ],
    practice: "Do 20 clean switches between C and G."
  },
  {
    id: "easy-songs",
    level: 5,
    title: "Easy Songs",
    minutes: 15,
    summary: "Use simple chord loops to play complete beginner songs.",
    steps: [
      "Preview the chords before singing or playing along.",
      "Practice the strumming pattern on one chord first.",
      "Play the chord progression slowly without lyrics.",
      "Add lyrics only after the chord changes feel steady.",
      "Favorite songs you want to revisit this week."
    ],
    practice: "Play one song from the song library at 80 BPM."
  },
  {
    id: "challenges",
    level: 6,
    title: "Practice Challenges",
    minutes: 12,
    summary: "Build confidence with short daily goals.",
    steps: [
      "Tune the guitar without skipping any strings.",
      "Play five chords with every note clear.",
      "Switch between two chords for one minute.",
      "Strum with a metronome for two minutes.",
      "Record a song attempt and write one thing to improve."
    ],
    practice: "Complete three challenges today and log your minutes."
  }
];

const chords = [
  { name: "C", frets: ["x", 3, 2, 0, 1, 0], fingers: ["x", 3, 2, "o", 1, "o"], explain: "Bright major chord used in many folk and pop songs.", tips: "Curve finger 1 so the open high E string rings clearly." },
  { name: "G", frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, "o", "o", "o", 3], explain: "Full open chord with a strong, ringing sound.", tips: "Keep fingers 2 and 3 rounded so the open strings stay clean." },
  { name: "D", frets: ["x", "x", 0, 2, 3, 2], fingers: ["x", "x", "o", 1, 3, 2], explain: "Small triangle shape played on the four thinnest strings.", tips: "Start strumming from the open D string, not the low E." },
  { name: "A", frets: ["x", 0, 2, 2, 2, 0], fingers: ["x", "o", 1, 2, 3, "o"], explain: "Compact major chord with three fingers on the same fret.", tips: "Line the fingers up close together and strum from the A string." },
  { name: "E", frets: [0, 2, 2, 1, 0, 0], fingers: ["o", 2, 3, 1, "o", "o"], explain: "Big open major chord that uses all six strings.", tips: "Use E to check that every string can ring without buzzing." },
  { name: "Am", frets: ["x", 0, 2, 2, 1, 0], fingers: ["x", "o", 2, 3, 1, "o"], explain: "Gentle minor chord with the same shape family as E.", tips: "Listen for the open A string; it gives the chord its base." },
  { name: "Em", frets: [0, 2, 2, 0, 0, 0], fingers: ["o", 2, 3, "o", "o", "o"], explain: "One of the easiest full chords for beginners.", tips: "Strum slowly and let all six strings ring." },
  { name: "Dm", frets: ["x", "x", 0, 2, 3, 1], fingers: ["x", "x", "o", 2, 3, 1], explain: "A small minor chord with a thoughtful, soft sound.", tips: "Use a light touch and avoid the two thickest strings." },
  { name: "F", frets: ["x", "x", 3, 2, 1, 1], fingers: ["x", "x", 3, 2, 1, 1], explain: "Beginner-friendly F shape using a mini barre on the first fret.", tips: "Flatten finger 1 across the B and high E strings only." },
  { name: "Bm", frets: ["x", 2, 4, 4, 3, 2], fingers: ["x", 1, 3, 4, 2, 1], explain: "A harder minor chord that introduces a small barre.", tips: "Practice it slowly after D and A feel comfortable." }
];

const songs = [
  {
    id: "morning-road",
    title: "Morning Road",
    difficulty: "Very easy",
    chords: ["G", "D", "Em", "C"],
    pattern: "D D U U D U",
    tempo: 76,
    lyrics: `[G]Morning light on a [D]quiet road
[Em]Step by step as the [C]day unfolds
[G]One more chord and a [D]steady hand
[Em]Little songs help me [C]understand`,
    tip: "Loop G D Em C for the whole song before adding lyrics."
  },
  {
    id: "porch-rain",
    title: "Porch Rain",
    difficulty: "Easy",
    chords: ["Am", "C", "G", "D"],
    pattern: "D U D U",
    tempo: 70,
    lyrics: `[Am]Rain on the porch, [C]soft and slow
[G]Four little beats, then [D]let them go
[Am]Tap with your foot, [C]count every line
[G]Clean little changes, [D]right on time`,
    tip: "Keep the strum small and quiet; this one trains timing."
  },
  {
    id: "campfire-mile",
    title: "Campfire Mile",
    difficulty: "Easy",
    chords: ["C", "G", "Am", "F"],
    pattern: "D D D D",
    tempo: 82,
    lyrics: `[C]Warm little fire, [G]wide open sky
[Am]Play every chord and [F]let it fly
[C]Slow at the start, [G]clear at the end
[Am]One more round and [F]try again`,
    tip: "Use the beginner F shape and slow down when the change appears."
  },
  {
    id: "two-chord-sun",
    title: "Two Chord Sun",
    difficulty: "First song",
    chords: ["Em", "D"],
    pattern: "D D U D",
    tempo: 68,
    lyrics: `[Em]Here comes a simple [D]sun
[Em]Two small shapes and [D]one more run
[Em]Keep your hand in [D]motion
[Em]Steady like the [D]ocean`,
    tip: "Use this song when you only know Em and D."
  },
  {
    id: "open-window",
    title: "Open Window",
    difficulty: "Medium beginner",
    chords: ["E", "A", "Bm", "D"],
    pattern: "D U U D U",
    tempo: 74,
    lyrics: `[E]Open window, [A]evening air
[Bm]Hard new chord, but [D]we are there
[E]Slow transition, [A]light and clean
[Bm]Best small progress [D]ever seen`,
    tip: "Practice Bm by itself before playing the full song."
  }
];

const achievements = [
  { id: "firstLesson", title: "First Lesson", text: "Complete any lesson." },
  { id: "threeDay", title: "Three Sessions", text: "Log practice on three different days." },
  { id: "songFavorite", title: "Song Picker", text: "Favorite your first song." },
  { id: "levelThree", title: "Rhythm Ready", text: "Complete all lessons through Level 3." },
  { id: "hundredMinutes", title: "Hundred Minutes", text: "Log 100 total minutes." }
];

const app = document.querySelector("#app");
const screenTitle = document.querySelector("#screenTitle");
const screenEyebrow = document.querySelector("#screenEyebrow");
const backButton = document.querySelector("#backButton");
const settingsShortcut = document.querySelector("#settingsShortcut");
const navButtons = [...document.querySelectorAll(".nav-item")];

let state = loadState();
let routeStack = [];
let currentRoute = state.seenWelcome ? { screen: "home" } : { screen: "welcome" };
let metronomeTimer = null;
let audioCtx = null;
let tunerStream = null;
let tunerFrame = null;
let backendReady = false;
let authConfigData = null;
let authUser = null;
let saveTimer = null;

const authSession = {
  accessToken: sessionStorage.getItem("auth0AccessToken") || "",
  expiresAt: Number(sessionStorage.getItem("auth0ExpiresAt") || 0)
};

function defaultState() {
  return {
    seenWelcome: false,
    completedLessons: [],
    favorites: [],
    practiceLog: [],
    reminderOn: false,
    reminderTime: "18:30",
    offlineAccess: true,
    dailyGoal: 15
  };
}

function loadState() {
  try {
    return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  queueRemoteSave();
}

function isLoggedIn() {
  return Boolean(authSession.accessToken && authSession.expiresAt > Date.now());
}

function authHeaders() {
  return isLoggedIn() ? { Authorization: `Bearer ${authSession.accessToken}` } : {};
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with ${response.status}`);
  }

  return response.json();
}

async function loadBackendState() {
  try {
    authConfigData = await apiRequest("/api/auth-config");
    const payload = await apiRequest("/api/state");
    backendReady = true;
    authUser = payload.user;
    state = { ...state, ...payload.state, seenWelcome: state.seenWelcome || payload.state.seenWelcome };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
  } catch {
    backendReady = false;
  }
}

function queueRemoteSave() {
  if (!backendReady) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    apiRequest("/api/state", {
      method: "PUT",
      body: JSON.stringify({ state })
    }).catch(() => {
      backendReady = false;
    });
  }, 350);
}

async function persistPractice(minutes, focus) {
  if (!backendReady) return;
  try {
    const payload = await apiRequest("/api/practice", {
      method: "POST",
      body: JSON.stringify({ minutes, focus })
    });
    state = { ...state, ...payload.state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    backendReady = false;
  }
}

function randomString(size = 64) {
  const values = new Uint8Array(size);
  crypto.getRandomValues(values);
  return [...values].map((value) => ("0" + value.toString(16)).slice(-2)).join("");
}

function base64Url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

async function sha256(value) {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
}

async function loginWithAuth0() {
  if (!authConfigData) {
    try {
      authConfigData = await apiRequest("/api/auth-config");
    } catch {
      alert("Auth0 is not available from this preview.");
      return;
    }
  }

  if (!authConfigData.configured) {
    alert("Auth0 is not configured yet. Set AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_AUDIENCE in Vercel.");
    return;
  }

  const verifier = randomString(48);
  const challenge = base64Url(await sha256(verifier));
  const authState = randomString(20);
  sessionStorage.setItem("auth0Verifier", verifier);
  sessionStorage.setItem("auth0State", authState);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: authConfigData.clientId,
    redirect_uri: window.location.origin + window.location.pathname,
    scope: "openid profile email",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state: authState
  });

  if (authConfigData.audience) params.set("audience", authConfigData.audience);
  window.location.href = `https://${authConfigData.domain.replace(/^https?:\/\//, "")}/authorize?${params}`;
}

async function handleAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const returnedState = params.get("state");
  if (!code) return;

  const verifier = sessionStorage.getItem("auth0Verifier");
  const expectedState = sessionStorage.getItem("auth0State");
  if (!verifier || returnedState !== expectedState) return;

  authConfigData = authConfigData || await apiRequest("/api/auth-config");
  const response = await fetch(`https://${authConfigData.domain.replace(/^https?:\/\//, "")}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: authConfigData.clientId,
      code_verifier: verifier,
      code,
      redirect_uri: window.location.origin + window.location.pathname
    })
  });

  if (!response.ok) {
    sessionStorage.removeItem("auth0Verifier");
    sessionStorage.removeItem("auth0State");
    return;
  }

  const tokens = await response.json();
  authSession.accessToken = tokens.access_token || "";
  authSession.expiresAt = Date.now() + Number(tokens.expires_in || 3600) * 1000;
  sessionStorage.setItem("auth0AccessToken", authSession.accessToken);
  sessionStorage.setItem("auth0ExpiresAt", String(authSession.expiresAt));
  sessionStorage.removeItem("auth0Verifier");
  sessionStorage.removeItem("auth0State");
  window.history.replaceState({}, document.title, window.location.pathname);
}

function logout() {
  authSession.accessToken = "";
  authSession.expiresAt = 0;
  authUser = null;
  sessionStorage.removeItem("auth0AccessToken");
  sessionStorage.removeItem("auth0ExpiresAt");

  if (authConfigData?.configured) {
    const params = new URLSearchParams({
      client_id: authConfigData.clientId,
      returnTo: window.location.origin + window.location.pathname
    });
    window.location.href = `https://${authConfigData.domain.replace(/^https?:\/\//, "")}/v2/logout?${params}`;
  } else {
    render();
  }
}

function navigate(screen, params = {}, push = true) {
  stopTuner();
  stopMetronome();
  if (push && currentRoute) routeStack.push(currentRoute);
  currentRoute = { screen, params };
  render();
}

function render() {
  const { screen, params = {} } = currentRoute;
  const views = {
    welcome: renderWelcome,
    home: renderHome,
    lessons: renderLessons,
    lesson: () => renderLessonDetail(params.id),
    chords: renderChords,
    chord: () => renderChordDetail(params.name),
    songs: renderSongs,
    song: () => renderSongDetail(params.id),
    practice: renderPractice,
    progress: renderProgress,
    settings: renderSettings
  };
  views[screen]();
  updateChrome(screen);
  app.focus({ preventScroll: true });
}

function updateChrome(screen) {
  const titles = {
    welcome: ["Beginner guitar", "Acoustic Steps"],
    home: ["Today", "Home Dashboard"],
    lessons: ["Learning flow", "Lessons"],
    lesson: ["Step by step", "Lesson Detail"],
    chords: ["Reference", "Chord Library"],
    chord: ["Finger placement", "Chord Detail"],
    songs: ["Play along", "Song Library"],
    song: ["Lyrics and chords", "Song Detail"],
    practice: ["Tools", "Practice Tracker"],
    progress: ["Your growth", "Progress"],
    settings: ["Preferences", "Settings"]
  };
  screenEyebrow.textContent = titles[screen][0];
  screenTitle.textContent = titles[screen][1];
  document.querySelector(".app-shell").classList.toggle("home-screen", screen === "home");
  backButton.disabled = routeStack.length === 0 || screen === "welcome";
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.screen === screen));
}

function renderWelcome() {
  app.innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">Acoustic guitar for day one</p>
        <h2>Learn one clear step at a time</h2>
      </div>
      <p>Follow beginner lessons, see chord diagrams, play simple songs, and build a daily practice habit.</p>
      <div class="hero-actions">
        <button class="primary-button" data-action="start">Start learning</button>
        <button class="secondary-button" data-action="preview">Preview lessons</button>
      </div>
    </section>
    <section class="grid-2">
      ${summaryCard("6", "levels", "From guitar basics to practice challenges.")}
      ${summaryCard("10", "chords", "Common acoustic shapes with diagrams.")}
    </section>
  `;
  bind("[data-action='start']", "click", () => {
    state.seenWelcome = true;
    saveState();
    navigate("home", {}, false);
  });
  bind("[data-action='preview']", "click", () => navigate("lessons"));
}

function renderHome() {
  const nextLesson = lessons.find((lesson) => !state.completedLessons.includes(lesson.id)) || lessons[0];
  const percent = Math.round((state.completedLessons.length / lessons.length) * 100);
  const recentFavorite = songs.find((song) => state.favorites.includes(song.id));
  const lessonThree = lessons.find((lesson) => lesson.id === "first-chords") || nextLesson;
  const path = [
    ["Getting Started", true],
    ["Parts of Guitar", state.completedLessons.includes("parts")],
    ["Basic Chords", state.completedLessons.includes("first-chords")],
    ["Strumming Basics", state.completedLessons.includes("strumming")],
    ["Simple Songs", state.completedLessons.includes("easy-songs")]
  ];
  app.innerHTML = `
    <section class="premium-header">
      <button class="glass-icon" aria-label="Menu"><span></span><span></span><span></span></button>
      <div>
        <h2>Good Morning, ${authUser?.name || "Alex"}!</h2>
        <p>Let's continue your guitar journey</p>
      </div>
      <button class="streak-badge" data-auth-action="${isLoggedIn() ? "logout" : "login"}">
        <span aria-hidden="true">&#9830;</span> ${isLoggedIn() ? "Synced" : "Sign in"}
      </button>
    </section>

    <section class="premium-hero-card">
      <div class="hero-copy">
        <span class="hero-kicker">Featured lesson</span>
        <h2>Lesson 3 &ndash; Basic Chords</h2>
        <p>Build your first clean chord shapes with calm, guided practice.</p>
      </div>
      <div class="hero-guitar" aria-hidden="true"></div>
      <div class="hero-glass-panel">
        <div class="hero-progress-label">
          <span>Progress</span>
          <strong>60%</strong>
        </div>
        <div class="progress-track premium-progress" aria-label="Featured lesson progress">
          <div class="progress-bar" style="--value:60%"></div>
        </div>
        <button class="primary-button gold-button" data-lesson="${lessonThree.id}">Continue Lesson</button>
      </div>
    </section>

    <section class="section-title premium-title">
      <div>
        <h2>Continue Learning</h2>
        <p>${state.completedLessons.length} of ${lessons.length} lessons complete</p>
      </div>
      <span class="badge">${percent}%</span>
    </section>
    <button class="continue-card" data-lesson="${nextLesson.id}">
      <span class="continue-thumb" aria-hidden="true"></span>
      <span class="continue-body">
        <strong>${nextLesson.title}</strong>
        <small>${nextLesson.minutes} min lesson</small>
        <span class="progress-track mini-track">
          <span class="progress-bar" style="--value:${percent}%"></span>
        </span>
      </span>
      <span class="continue-time">8 min left</span>
    </button>

    <section class="section-title premium-title">
      <div>
        <h2>Lesson Path</h2>
        <p>Step-by-step beginner roadmap</p>
      </div>
    </section>
    <section class="path-timeline">
      ${path.map(([label, done], index) => `
        <button class="path-node ${done ? "done" : index === 2 ? "current" : ""}" data-screen-target="${index < 3 ? "lessons" : index === 4 ? "songs" : "practice"}">
          <span class="node-dot">${done ? "✓" : index + 1}</span>
          <span>${label}</span>
        </button>
      `).join("")}
    </section>

    <section class="section-title premium-title">
      <div>
        <h2>Quick Practice</h2>
        <p>Tactile tools for short daily sessions.</p>
      </div>
    </section>
    <section class="quick-practice-grid">
      <button class="practice-tile tile-wood" data-screen-target="chords"><span class="tile-icon">C</span><strong>Chord Library</strong></button>
      <button class="practice-tile tile-lavender" data-screen-target="practice"><span class="tile-icon">&#9684;</span><strong>Metronome</strong></button>
      <button class="practice-tile tile-sage" data-screen-target="lesson:strumming"><span class="tile-icon">&#9834;</span><strong>Strumming Patterns</strong></button>
      <button class="practice-tile tile-gold" data-screen-target="practice"><span class="tile-icon">&#9837;</span><strong>Guitar Tuner</strong></button>
    </section>

    <section class="section-title premium-title">
      <div>
        <h2>Beginner tip</h2>
        <p>Small, clean practice beats long rushed sessions.</p>
      </div>
    </section>
    <section class="card premium-tip-card">
      <p>Before changing chords faster, make sure each string rings clearly. Speed grows from relaxed hands and steady counting.</p>
    </section>

    <section class="section-title premium-title">
      <div>
        <h2>Easy Songs</h2>
        <p>${recentFavorite ? "Your favorite song is ready." : "Choose a first song to favorite."}</p>
      </div>
    </section>
    <section class="grid-2">
      <button class="lesson-card premium-soft-card" data-screen-target="songs"><span class="tag">Songs</span><h3>${recentFavorite ? recentFavorite.title : "Song Library"}</h3><p>Lyrics, chords, tempo, and play-along.</p></button>
      <button class="lesson-card premium-soft-card" data-screen-target="progress"><span class="tag">Profile</span><h3>Your Progress</h3><p>Badges, streaks, and practice totals.</p></button>
    </section>
  `;
  bind("[data-lesson]", "click", (event) => navigate("lesson", { id: event.currentTarget.dataset.lesson }));
  bind("[data-auth-action]", "click", (event) => {
    if (event.currentTarget.dataset.authAction === "logout") logout();
    else loginWithAuth0();
  });
  bindAll("[data-screen-target]", "click", (event) => {
    const target = event.currentTarget.dataset.screenTarget;
    if (target.startsWith("song:")) navigate("song", { id: target.split(":")[1] });
    else if (target.startsWith("lesson:")) navigate("lesson", { id: target.split(":")[1] });
    else navigate(target);
  });
}

function renderLessons() {
  const grouped = [1, 2, 3, 4, 5, 6].map((level) => {
    const levelLessons = lessons.filter((lesson) => lesson.level === level);
    return `
      <section class="section-title">
        <div>
          <h2>Level ${level}: ${levelName(level)}</h2>
          <p>${levelLessons.length} lesson${levelLessons.length === 1 ? "" : "s"}</p>
        </div>
      </section>
      <section class="list">
        ${levelLessons.map(lessonCard).join("")}
      </section>
    `;
  }).join("");
  app.innerHTML = grouped;
  bindAll("[data-lesson]", "click", (event) => navigate("lesson", { id: event.currentTarget.dataset.lesson }));
}

function renderLessonDetail(id) {
  const lesson = lessons.find((item) => item.id === id) || lessons[0];
  const complete = state.completedLessons.includes(lesson.id);
  app.innerHTML = `
    <section class="card">
      <div class="lesson-meta">
        <span class="level-pill">Level ${lesson.level}</span>
        <span class="tag">${lesson.minutes} min</span>
        ${complete ? `<span class="badge">Complete</span>` : ""}
      </div>
      <h2>${lesson.title}</h2>
      <p class="subtle">${lesson.summary}</p>
    </section>
    ${lesson.visual === "guitarMap" ? `<section class="section-title"><h3>Visual guide</h3></section><div class="guitar-map" role="img" aria-label="Labeled parts of an acoustic guitar"></div>` : ""}
    <section class="section-title"><h3>Steps</h3></section>
    <ol class="step-list">
      ${lesson.steps.map((step) => `<li>${step}</li>`).join("")}
    </ol>
    <section class="section-title"><h3>Practice exercise</h3></section>
    <section class="card">
      <p>${lesson.practice}</p>
      <div class="action-row" style="margin-top:14px">
        <button class="${complete ? "secondary-button" : "primary-button"}" data-complete="${lesson.id}">${complete ? "Mark incomplete" : "Mark complete"}</button>
        <button class="secondary-button" data-screen-target="practice">Open practice tools</button>
      </div>
    </section>
  `;
  bind("[data-complete]", "click", () => toggleLesson(lesson.id));
  bind("[data-screen-target='practice']", "click", () => navigate("practice"));
}

function renderChords() {
  app.innerHTML = `
    <section class="card">
      <h2>Common acoustic chords</h2>
      <p class="subtle">Tap a chord to see the diagram, finger numbers, explanation, and practice tip.</p>
    </section>
    <section class="chord-grid" style="margin-top:12px">
      ${chords.map(chordTile).join("")}
    </section>
  `;
  bindAll("[data-chord]", "click", (event) => navigate("chord", { name: event.currentTarget.dataset.chord }));
}

function renderChordDetail(name) {
  const chord = chords.find((item) => item.name === name) || chords[0];
  app.innerHTML = `
    <section class="card">
      <div class="chord-name">
        <strong>${chord.name}</strong>
        <span class="tag">${stringsLabel(chord)}</span>
      </div>
      ${diagram(chord)}
    </section>
    <section class="section-title"><h3>Finger placement</h3></section>
    <section class="card">
      <p>${fingerText(chord)}</p>
    </section>
    <section class="section-title"><h3>Simple explanation</h3></section>
    <section class="card"><p>${chord.explain}</p></section>
    <section class="section-title"><h3>Practice tip</h3></section>
    <section class="card">
      <p>${chord.tips}</p>
      <div class="action-row" style="margin-top:14px">
        <button class="primary-button" data-screen-target="practice">Practice with metronome</button>
        <button class="secondary-button" data-screen-target="songs">Find songs</button>
      </div>
    </section>
  `;
  bindAll("[data-screen-target]", "click", (event) => navigate(event.currentTarget.dataset.screenTarget));
}

function renderSongs() {
  app.innerHTML = `
    <section class="card">
      <h2>Beginner song library</h2>
      <p class="subtle">Each song uses basic chords and includes lyrics, chord placement, strumming pattern, tempo, and play-along.</p>
    </section>
    <section class="list" style="margin-top:12px">
      ${songs.map(songCard).join("")}
    </section>
  `;
  bindAll("[data-song]", "click", (event) => navigate("song", { id: event.currentTarget.dataset.song }));
  bindAll("[data-favorite]", "click", (event) => {
    event.stopPropagation();
    toggleFavorite(event.currentTarget.dataset.favorite);
    renderSongs();
  });
}

function renderSongDetail(id) {
  const song = songs.find((item) => item.id === id) || songs[0];
  const favorite = state.favorites.includes(song.id);
  app.innerHTML = `
    <section class="card">
      <div class="song-meta">
        <span class="level-pill">${song.difficulty}</span>
        <span class="tag">${song.tempo} BPM</span>
      </div>
      <h2>${song.title}</h2>
      <p class="subtle">${song.tip}</p>
      <div class="chip-row" style="margin-top:12px">
        ${song.chords.map((name) => `<button class="chip" data-chord="${name}">${name}</button>`).join("")}
      </div>
    </section>
    <section class="section-title"><h3>Strumming pattern</h3></section>
    <section class="card"><p><strong>${song.pattern}</strong></p></section>
    <section class="section-title"><h3>Lyrics with chord placement</h3></section>
    <pre class="lyrics">${formatLyrics(song.lyrics)}</pre>
    <section class="section-title"><h3>Play along</h3></section>
    <section class="tool-card">
      <div class="metronome-display">
        <div class="pulse" id="songPulse">${song.tempo}</div>
        <div>
          <h3>${song.tempo} BPM</h3>
          <p>Start the click, count four beats, then begin the first line.</p>
        </div>
      </div>
      <div class="action-row">
        <button class="primary-button" data-song-metro="${song.tempo}">Play along</button>
        <button class="${favorite ? "danger-button" : "secondary-button"}" data-toggle-favorite="${song.id}">${favorite ? "Remove favorite" : "Favorite song"}</button>
      </div>
    </section>
  `;
  bindAll("[data-chord]", "click", (event) => navigate("chord", { name: event.currentTarget.dataset.chord }));
  bind("[data-toggle-favorite]", "click", () => {
    toggleFavorite(song.id);
    renderSongDetail(song.id);
  });
  bind("[data-song-metro]", "click", (event) => startMetronome(Number(event.currentTarget.dataset.songMetro), "songPulse"));
}

function renderPractice() {
  const today = dateKey(new Date());
  const todayLog = state.practiceLog.find((entry) => entry.date === today);
  app.innerHTML = `
    <section class="stats-row">
      ${summaryCard(String(todayLog?.minutes || 0), "today", "Minutes logged")}
      ${summaryCard(String(totalMinutes()), "total", "All practice")}
      ${summaryCard(String(currentStreak()), "streak", "Day streak")}
    </section>

    <section class="section-title"><h2>Metronome</h2></section>
    <section class="tool-card">
      <div class="metronome-display">
        <div class="pulse" id="metroPulse">80</div>
        <div class="form-row">
          <label for="tempoRange">Tempo: <span id="tempoValue">80</span> BPM</label>
          <input id="tempoRange" type="range" min="45" max="140" value="80" />
        </div>
      </div>
      <div class="action-row">
        <button class="primary-button" id="metroStart">Start</button>
        <button class="secondary-button" id="metroStop">Stop</button>
      </div>
    </section>

    <section class="section-title"><h2>Tuner</h2></section>
    <section class="tool-card">
      <h3 id="tunerNote">E A D G B E</h3>
      <p id="tunerStatus">Allow microphone access, then pluck one string at a time.</p>
      <div class="chip-row">
        ${["E2", "A2", "D3", "G3", "B3", "E4"].map((note) => `<span class="chip">${note}</span>`).join("")}
      </div>
      <div class="action-row">
        <button class="primary-button" id="tunerStart">Start tuner</button>
        <button class="secondary-button" id="tunerStop">Stop</button>
      </div>
    </section>

    <section class="section-title"><h2>Log practice</h2></section>
    <section class="tool-card">
      <div class="form-row">
        <label for="minutesInput">Minutes practiced</label>
        <input id="minutesInput" type="number" min="1" max="240" value="${state.dailyGoal}" />
      </div>
      <div class="form-row">
        <label for="focusSelect">Focus</label>
        <select id="focusSelect">
          <option>Lessons</option>
          <option>Chords</option>
          <option>Strumming</option>
          <option>Songs</option>
          <option>Tuning</option>
        </select>
      </div>
      <button class="primary-button" id="logPractice">Log session</button>
    </section>
  `;
  const tempoRange = document.querySelector("#tempoRange");
  const tempoValue = document.querySelector("#tempoValue");
  tempoRange.addEventListener("input", () => {
    tempoValue.textContent = tempoRange.value;
    document.querySelector("#metroPulse").textContent = tempoRange.value;
  });
  bind("#metroStart", "click", () => startMetronome(Number(tempoRange.value), "metroPulse"));
  bind("#metroStop", "click", stopMetronome);
  bind("#tunerStart", "click", startTuner);
  bind("#tunerStop", "click", stopTuner);
  bind("#logPractice", "click", () => {
    const minutes = Math.max(1, Number(document.querySelector("#minutesInput").value || 1));
    const focus = document.querySelector("#focusSelect").value;
    if (backendReady) {
      persistPractice(minutes, focus).then(() => renderPractice());
    } else {
      logPractice(minutes, focus);
      renderPractice();
    }
  });
}

function renderProgress() {
  const lessonPercent = Math.round((state.completedLessons.length / lessons.length) * 100);
  const earned = getEarnedAchievements();
  app.innerHTML = `
    <section class="stats-row">
      ${summaryCard(`${lessonPercent}%`, "lessons", "Lessons complete")}
      ${summaryCard(String(totalMinutes()), "minutes", "Practice total")}
      ${summaryCard(String(earned.length), "badges", "Badges earned")}
    </section>
    <section class="section-title"><h2>Lesson progress</h2></section>
    <section class="card">
      <div class="progress-track"><div class="progress-bar" style="--value:${lessonPercent}%"></div></div>
      <p class="subtle" style="margin-top:10px">${state.completedLessons.length} of ${lessons.length} lessons complete.</p>
    </section>
    <section class="section-title"><h2>Achievement badges</h2></section>
    <section class="list">
      ${achievements.map((badge) => `
        <article class="card">
          <div class="lesson-meta">
            <span class="${earned.includes(badge.id) ? "badge" : "tag"}">${earned.includes(badge.id) ? "Earned" : "Locked"}</span>
            <strong>${badge.title}</strong>
          </div>
          <p class="subtle" style="margin-top:8px">${badge.text}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function renderSettings() {
  app.innerHTML = `
    <section class="tool-card">
      <h3>Account sync</h3>
      <p>${backendReady ? `Storage: SQLite backend (${authUser?.authMode || "local"})` : "Storage: local device only"}</p>
      <p class="subtle">${isLoggedIn() ? `Signed in${authUser?.name ? ` as ${authUser.name}` : ""}. Progress syncs to SQLite.` : "Sign in with Auth0 to sync progress, favorites, and practice logs."}</p>
      <div class="action-row">
        <button class="primary-button" id="authButton">${isLoggedIn() ? "Sign out" : "Sign in with Auth0"}</button>
        <button class="secondary-button" id="syncButton">Sync now</button>
      </div>
    </section>
    <section class="section-title"><h2>Preferences</h2></section>
    <section class="tool-card">
      <div class="toggle-row">
        <div>
          <strong>Daily practice reminders</strong>
          <p class="subtle">Ask for a browser notification reminder.</p>
        </div>
        <button class="switch ${state.reminderOn ? "on" : ""}" id="reminderToggle" aria-label="Toggle reminders"><span></span></button>
      </div>
      <div class="form-row">
        <label for="reminderTime">Reminder time</label>
        <input id="reminderTime" type="time" value="${state.reminderTime}" />
      </div>
      <div class="form-row">
        <label for="dailyGoal">Daily goal minutes</label>
        <input id="dailyGoal" type="number" min="5" max="180" value="${state.dailyGoal}" />
      </div>
      <div class="toggle-row">
        <div>
          <strong>Offline lesson access</strong>
          <p class="subtle">Cache app files for study without internet.</p>
        </div>
        <button class="switch ${state.offlineAccess ? "on" : ""}" id="offlineToggle" aria-label="Toggle offline access"><span></span></button>
      </div>
      <button class="primary-button" id="saveSettings">Save settings</button>
    </section>
    <section class="section-title"><h2>Beginner tips</h2></section>
    <section class="list">
      ${[
        "Tune before every session.",
        "Practice five clean minutes rather than thirty tense minutes.",
        "Keep your strumming hand moving while counting.",
        "Use fingertips and press close to the fret.",
        "End by playing something easy so practice feels complete."
      ].map((tip) => `<article class="card"><p>${tip}</p></article>`).join("")}
    </section>
  `;
  bind("#authButton", "click", () => {
    if (isLoggedIn()) logout();
    else loginWithAuth0();
  });
  bind("#syncButton", "click", async () => {
    await loadBackendState();
    alert(backendReady ? "Synced with SQLite backend." : "Backend is not available right now.");
  });
  bind("#reminderToggle", "click", async () => {
    if (!state.reminderOn && "Notification" in window) await Notification.requestPermission();
    state.reminderOn = !state.reminderOn;
    saveState();
    renderSettings();
  });
  bind("#offlineToggle", "click", () => {
    state.offlineAccess = !state.offlineAccess;
    saveState();
    renderSettings();
  });
  bind("#saveSettings", "click", () => {
    state.reminderTime = document.querySelector("#reminderTime").value || "18:30";
    state.dailyGoal = Math.max(5, Number(document.querySelector("#dailyGoal").value || 15));
    saveState();
    alert("Settings saved.");
  });
}

function lessonCard(lesson) {
  const complete = state.completedLessons.includes(lesson.id);
  return `
    <button class="lesson-card" data-lesson="${lesson.id}">
      <div class="lesson-meta">
        <span class="level-pill">Level ${lesson.level}</span>
        <span class="tag">${lesson.minutes} min</span>
        ${complete ? `<span class="badge">Complete</span>` : ""}
      </div>
      <h3>${lesson.title}</h3>
      <p>${lesson.summary}</p>
    </button>
  `;
}

function chordTile(chord) {
  return `
    <button class="chord-tile" data-chord="${chord.name}">
      <div class="chord-name"><strong>${chord.name}</strong><span class="tag">${stringsLabel(chord)}</span></div>
      ${diagram(chord)}
    </button>
  `;
}

function songCard(song) {
  const favorite = state.favorites.includes(song.id);
  return `
    <button class="song-card" data-song="${song.id}">
      <div class="song-meta">
        <span class="level-pill">${song.difficulty}</span>
        <span class="tag">${song.tempo} BPM</span>
        <span class="badge">${song.chords.join(" ")}</span>
      </div>
      <h3>${song.title}</h3>
      <p>${song.pattern}</p>
      <span class="small-button" data-favorite="${song.id}">${favorite ? "Favorited" : "Favorite"}</span>
    </button>
  `;
}

function summaryCard(value, label, text) {
  return `<article class="stat-card"><strong>${value}</strong><span class="subtle">${label}</span><p class="subtle">${text}</p></article>`;
}

function diagram(chord) {
  const strings = chord.frets.map((fret, index) => {
    const col = index + 1;
    if (fret === 0) return `<span class="open-string" style="grid-column:${col};grid-row:1">O</span>`;
    if (fret === "x") return `<span class="muted-string" style="grid-column:${col};grid-row:1">X</span>`;
    return `<span class="marker" style="grid-column:${col};grid-row:${Number(fret) + 1}">${chord.fingers[index]}</span>`;
  }).join("");
  const lines = Array.from({ length: 6 }, (_, index) => `<span class="string-line" style="grid-column:${index + 1}"></span>`).join("");
  return `<div class="diagram" aria-label="${chord.name} chord diagram">${lines}${strings}</div>`;
}

function stringsLabel(chord) {
  const played = chord.frets.filter((fret) => fret !== "x").length;
  return `${played} strings`;
}

function fingerText(chord) {
  const names = ["low E", "A", "D", "G", "B", "high E"];
  return chord.frets.map((fret, index) => {
    if (fret === "x") return `${names[index]}: do not play`;
    if (fret === 0) return `${names[index]}: open`;
    return `${names[index]}: fret ${fret}, finger ${chord.fingers[index]}`;
  }).join(". ") + ".";
}

function levelName(level) {
  return ["", "Guitar basics", "First chords", "Strumming", "Chord transitions", "Easy songs", "Practice challenges"][level];
}

function formatLyrics(text) {
  return escapeHtml(text).replace(/\[([A-G][m]?)\]/g, `<span class="chord-token">[$1]</span>`);
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function bind(selector, event, handler) {
  const element = document.querySelector(selector);
  if (element) element.addEventListener(event, handler);
}

function bindAll(selector, event, handler) {
  document.querySelectorAll(selector).forEach((element) => element.addEventListener(event, handler));
}

function toggleLesson(id) {
  state.completedLessons = state.completedLessons.includes(id)
    ? state.completedLessons.filter((lessonId) => lessonId !== id)
    : [...state.completedLessons, id];
  saveState();
  renderLessonDetail(id);
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((songId) => songId !== id)
    : [...state.favorites, id];
  saveState();
}

function logPractice(minutes, focus) {
  const today = dateKey(new Date());
  const existing = state.practiceLog.find((entry) => entry.date === today);
  if (existing) {
    existing.minutes += minutes;
    existing.focus = focus;
  } else {
    state.practiceLog.push({ date: today, minutes, focus });
  }
  saveState();
}

function totalMinutes() {
  return state.practiceLog.reduce((sum, entry) => sum + Number(entry.minutes || 0), 0);
}

function currentStreak() {
  const dates = new Set(state.practiceLog.map((entry) => entry.date));
  let streak = 0;
  const cursor = new Date();
  while (dates.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getEarnedAchievements() {
  const earned = [];
  if (state.completedLessons.length > 0) earned.push("firstLesson");
  if (state.practiceLog.length >= 3) earned.push("threeDay");
  if (state.favorites.length > 0) earned.push("songFavorite");
  if (lessons.filter((lesson) => lesson.level <= 3).every((lesson) => state.completedLessons.includes(lesson.id))) earned.push("levelThree");
  if (totalMinutes() >= 100) earned.push("hundredMinutes");
  return earned;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function startMetronome(bpm, pulseId) {
  stopMetronome();
  const pulse = document.querySelector(`#${pulseId}`);
  let beat = 1;
  const tick = () => {
    if (!pulse) return;
    pulse.textContent = beat;
    pulse.classList.add("on");
    playClick(beat === 1 ? 880 : 660);
    setTimeout(() => pulse.classList.remove("on"), 110);
    beat = beat === 4 ? 1 : beat + 1;
  };
  tick();
  metronomeTimer = setInterval(tick, 60000 / bpm);
}

function stopMetronome() {
  if (metronomeTimer) clearInterval(metronomeTimer);
  metronomeTimer = null;
}

function playClick(freq) {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.frequency.value = freq;
  gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);
  oscillator.connect(gain).connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.08);
}

async function startTuner() {
  const noteEl = document.querySelector("#tunerNote");
  const statusEl = document.querySelector("#tunerStatus");
  if (!navigator.mediaDevices?.getUserMedia) {
    statusEl.textContent = "Microphone tuning is not available in this browser.";
    return;
  }
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    tunerStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioCtx.createMediaStreamSource(tunerStream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    const buffer = new Float32Array(analyser.fftSize);
    const update = () => {
      analyser.getFloatTimeDomainData(buffer);
      const frequency = autoCorrelate(buffer, audioCtx.sampleRate);
      if (frequency > 0) {
        const nearest = nearestStringNote(frequency);
        noteEl.textContent = `${nearest.note} ${nearest.cents > 0 ? "+" : ""}${nearest.cents} cents`;
        statusEl.textContent = Math.abs(nearest.cents) <= 8 ? "In tune. Nice and steady." : nearest.cents < 0 ? "Tune slightly higher." : "Tune slightly lower.";
      }
      tunerFrame = requestAnimationFrame(update);
    };
    update();
  } catch {
    statusEl.textContent = "Microphone permission was not granted.";
  }
}

function stopTuner() {
  if (tunerFrame) cancelAnimationFrame(tunerFrame);
  tunerFrame = null;
  if (tunerStream) tunerStream.getTracks().forEach((track) => track.stop());
  tunerStream = null;
}

function autoCorrelate(buffer, sampleRate) {
  let rms = 0;
  for (const value of buffer) rms += value * value;
  rms = Math.sqrt(rms / buffer.length);
  if (rms < 0.01) return -1;
  let bestOffset = -1;
  let bestCorrelation = 0;
  for (let offset = 32; offset < 1000; offset += 1) {
    let correlation = 0;
    for (let index = 0; index < buffer.length - offset; index += 1) {
      correlation += 1 - Math.abs(buffer[index] - buffer[index + offset]);
    }
    correlation /= buffer.length - offset;
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }
  return bestCorrelation > 0.85 ? sampleRate / bestOffset : -1;
}

function nearestStringNote(frequency) {
  const notes = [
    { note: "E2", hz: 82.41 },
    { note: "A2", hz: 110 },
    { note: "D3", hz: 146.83 },
    { note: "G3", hz: 196 },
    { note: "B3", hz: 246.94 },
    { note: "E4", hz: 329.63 }
  ];
  const nearest = notes.reduce((best, note) => Math.abs(note.hz - frequency) < Math.abs(best.hz - frequency) ? note : best, notes[0]);
  return { ...nearest, cents: Math.round(1200 * Math.log2(frequency / nearest.hz)) };
}

backButton.addEventListener("click", () => {
  const previous = routeStack.pop();
  if (previous) {
    currentRoute = previous;
    render();
  }
});

settingsShortcut.addEventListener("click", () => navigate("settings"));

navButtons.forEach((button) => {
  button.addEventListener("click", () => navigate(button.dataset.screen));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

async function initApp() {
  render();
  await handleAuthCallback();
  await loadBackendState();
}

initApp();
