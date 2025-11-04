const firebaseConfig = {
  apiKey: "AIzaSyDYQQu4yqhv6SbKWJMYWQlikxxV7OEkoFo",
  authDomain: "jules-invaders.firebaseapp.com",
  projectId: "jules-invaders",
  storageBucket: "jules-invaders.firebasestorage.app",
  messagingSenderId: "430967323203",
  appId: "1:430967323203:web:e9959c5c67cce237a2f2f6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

let sessionId;
let uid;
let scoreUpdateTimeout = null;

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

function setupEventListeners() {
  window.addEventListener('GE_PLAYER_READY', () => {
    const playerStatusRef = db.ref(`sessions/${sessionId}/players/${uid}/status`);
    playerStatusRef.set('ready');
  });

  window.addEventListener('GE_PLAYER_DIED', () => {
    const playerStatusRef = db.ref(`sessions/${sessionId}/players/${uid}/status`);
    playerStatusRef.set('game_over');
  });

  window.addEventListener('GE_SCORE_UPDATE', (e) => {
    const score = e.detail.score;
    if (scoreUpdateTimeout) {
      clearTimeout(scoreUpdateTimeout);
    }
    scoreUpdateTimeout = setTimeout(() => {
      const playerScoreRef = db.ref(`sessions/${sessionId}/players/${uid}/score`);
      playerScoreRef.set(score);
    }, 500);
  });
}

function setupSessionListeners() {
    const sessionRef = db.ref(`sessions/${sessionId}`);
    const playersRef = db.ref(`sessions/${sessionId}/players`);

    playersRef.on('value', (snapshot) => {
        const players = snapshot.val();
        if (!players) {
            dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state: 'WAITING' } }));
            return;
        }

        const playerIds = Object.keys(players);

        if (playerIds.length < 2) {
            dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state: 'WAITING' } }));
        } else if (playerIds.length === 2) {
            const opponentId = playerIds.find(id => id !== uid);
            if (opponentId && players[uid]) { // ensure local player exists before checking status
                const opponent = players[opponentId];
                dispatchEvent(new CustomEvent('NE_OPPONENT_UPDATE', { detail: { score: opponent.score } }));

                if (players[uid].status === 'game_over') {
                    dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state: 'LOSS' } }));
                } else if (opponent.status === 'game_over') {
                    dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state: 'WIN' } }));
                }
            }

            if (playerIds.every(id => players[id].status === 'ready')) {
                sessionRef.child('gameState').set('active');
            } else if (players[uid] && players[uid].status !== 'playing') {
                dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state: 'READY_TO_START' } }));
            }
        }
    });

    sessionRef.child('gameState').on('value', (snapshot) => {
        const gameState = snapshot.val();
        if (gameState === 'active') {
            db.ref(`sessions/${sessionId}/players/${uid}/status`).set('playing');
            dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state: 'PLAYING' } }));
        }
    });
}


function initNetwork() {
  const urlParams = new URLSearchParams(window.location.search);
  sessionId = urlParams.get('session_id');

  if (!sessionId) {
    sessionId = generateSessionId();
    const sessionRef = db.ref('sessions/' + sessionId);
    sessionRef.set({
      gameState: "waiting",
      players: {}
    }).then(() => {
      window.location.href = `game.html?session_id=${sessionId}`;
    });
    return;
  }

  auth.signInAnonymously().then(() => {
    uid = auth.currentUser.uid;
    const sessionRef = db.ref(`sessions/${sessionId}`);

    sessionRef.once('value', (snapshot) => {
        const session = snapshot.val();
        if (!session) {
            console.error("Session not found:", sessionId);
            // Ideally, redirect or show an error message to the user.
            return;
        }

        const players = session.players || {};
        const playerCount = Object.keys(players).length;
        const isPlayerAlreadyIn = !!players[uid];

        if (!isPlayerAlreadyIn) {
            if (session.gameState !== 'waiting') {
                console.error("Cannot join session: Game is already in progress.");
                return;
            }
            if (playerCount >= 2) {
                console.error("Cannot join session: Game is full.");
                return;
            }
        }

        const playerRef = db.ref(`sessions/${sessionId}/players/${uid}`);
        playerRef.onDisconnect().remove();

        playerRef.set({
          score: 0,
          status: 'waiting'
        }).then(() => {
          console.log('Player connected to session:', sessionId);
          dispatchEvent(new CustomEvent('NE_SESSION_STATE', { detail: { state: 'WAITING' } }));
          setupEventListeners();
          setupSessionListeners();
        });
    });
  }).catch((error) => {
    console.error("Firebase auth failed:", error);
  });
}

initNetwork();
