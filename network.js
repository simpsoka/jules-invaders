// network.js - Jules Invaders Networking Layer

// --- 1. Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyDYQQu4yqhv6SbKWJMYWQlikxxV7OEkoFo",
  authDomain: "jules-invaders.firebaseapp.com",
  databaseURL: "https://jules-invaders-default-rtdb.firebaseio.com",
  projectId: "jules-invaders",
  storageBucket: "jules-invaders.firebasestorage.app",
  messagingSenderId: "430967323203",
  appId: "1:430967323203:web:e9959c5c67cce237a2f2f6"
};

// --- 2. State Variables ---
let sessionId = null;
let playerId = null;
let opponentId = null;
let sessionRef = null;
let playerRef = null;
let opponentRef = null;
let lastScoreUpdateTime = 0;

// --- 3. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().signInAnonymously().then(() => {
    playerId = firebase.auth().currentUser.uid;
    handleSession();
  }).catch((error) => {
    console.error("Anonymous auth failed:", error);
  });
});

// --- 4. Session Management ---
function handleSession() {
  const params = new URLSearchParams(window.location.search);
  sessionId = params.get('session_id');

  if (!sessionId) {
    sessionId = generateSessionId();
    const newSession = {
      gameState: "waiting",
      players: {}
    };
    firebase.database().ref('sessions/' + sessionId).set(newSession).then(() => {
      window.location.search = `?session_id=${sessionId}`;
    });
  } else {
    sessionRef = firebase.database().ref('sessions/' + sessionId);
    playerRef = sessionRef.child('players').child(playerId);

    playerRef.set({ score: 0, status: "waiting" });
    playerRef.onDisconnect().remove();

    attachFirebaseListeners();
    dispatchSessionState("WAITING");
  }
}

// --- 5. Game -> Network Event Listeners ---
window.addEventListener('GE_PLAYER_READY', (e) => {
  if (playerRef) {
    playerRef.update({ status: "ready" });
  }
});

window.addEventListener('GE_SCORE_UPDATE', (e) => {
  if (playerRef) {
    const now = Date.now();
    if (now - lastScoreUpdateTime > 500) {
      lastScoreUpdateTime = now;
      playerRef.update({ score: e.detail.score });
    }
  }
});

window.addEventListener('GE_PLAYER_DIED', (e) => {
  if (playerRef) {
    playerRef.update({ status: "game_over" });
  }
});

// --- 6. Network -> Game Event Dispatchers ---
function dispatchSessionState(state) {
  window.dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state } }));
}

function dispatchOpponentUpdate(data) {
  window.dispatchEvent(new CustomEvent('NE_OPPONENT_UPDATE', { detail: data }));
}

// --- 7. Firebase Listeners ---
function attachFirebaseListeners() {
  sessionRef.child('players').on('value', (snapshot) => {
    const players = snapshot.val() || {};
    const playerIds = Object.keys(players);

    if (opponentId && !players[opponentId]) {
      dispatchSessionState("WAITING");
      opponentRef.off();
      opponentId = null;
      opponentRef = null;
      playerRef.update({ status: 'waiting' });
      sessionRef.child('gameState').set('waiting');
      return;
    }

    if (playerIds.length === 2 && !opponentId) {
      opponentId = playerIds.find(id => id !== playerId);
      if (opponentId) {
        opponentRef = sessionRef.child('players').child(opponentId);
        opponentRef.on('value', (opponentSnapshot) => {
          const opponentData = opponentSnapshot.val();
          if (opponentData) {
            dispatchOpponentUpdate(opponentData);
            if (opponentData.status === 'game_over') {
              dispatchSessionState("WIN");
              sessionRef.child('gameState').set('finished');
            }
          }
        });
        dispatchSessionState("READY_TO_START");
      }
    }

    if (playerIds.length === 2) {
      const p1 = players[playerIds[0]];
      const p2 = players[playerIds[1]];
      if (p1.status === 'ready' && p2.status === 'ready') {
        sessionRef.child('gameState').transaction((currentGameState) => {
          return currentGameState === 'waiting' ? 'active' : void 0;
        });
      }
    }
  });

  sessionRef.child('gameState').on('value', (snapshot) => {
    const gameState = snapshot.val();
    if (gameState === 'active') {
      dispatchSessionState("PLAYING");
      playerRef.update({ status: 'playing' });
    }
  });
}

// --- 8. Helper Functions ---
function generateSessionId() {
  return 'sid-' + Math.random().toString(36).substr(2, 9);
}
