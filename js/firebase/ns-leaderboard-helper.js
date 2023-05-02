// based on 'build leaderboard with firebase'
import {
  collection,
  addDoc,
  getDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

export async function checkUserExist(playerID, firestore) {
  // read all user names from the rating and check if a current user exist
  const docRef = doc(firestore, 'scores', playerID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
}

export async function createScore(score, playerID, firestore) {
  console.log('create scores')
  console.log(firestore)
  return addDoc(collection(firestore, 'scores'), {
    user: playerID,
    score: score,
  })
}

export async function updateScore(playerID, newScore, firestore) {
  const playerSnapshot = await firestore
    .collection('scores')
    .where('user', '==', playerID)
    .get()
  if (playerSnapshot.size !== 1) {
    throw Error(`User not found in leaderboard: ${playerID}`)
  }
  const player = playerSnapshot.docs[0]
  const doc = firestore.doc(player.id)
  return doc.update({
    score: newScore,
  })
}

export async function readRank(playerID, firestore) {
  const scores = await firestore
    .collection('scores')
    .orderBy('score', 'desc')
    .get()
  const player = `${playerID}`
  let rank = 1
  for (const doc of scores.docs) {
    const user = `${doc.get('user')}`
    if (user === player) {
      return {
        user: player,
        rank: rank,
        score: doc.get('score'),
      }
    }
    rank++
  }
  // No user found
  throw Error(`User not found in leaderboard: ${playerID}`)
}
export function testExp() {
  console.log('export is working')
}
