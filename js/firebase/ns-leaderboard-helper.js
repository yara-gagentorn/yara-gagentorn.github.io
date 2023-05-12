// based on 'build leaderboard with firebase'
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

export async function getAllRecords(numberOfnumbers, firestore) {
  const colRef = collection(
    firestore,
    'scores',
    'numberOfnumbers',
    'number' + numberOfnumbers
  )
  const docsSnap = await getDocs(colRef)
  let allRecords = []
  await docsSnap.forEach((doc) => {
    allRecords.push(doc.data())
  })
  return allRecords
}

export async function getUserData(playerID, firestore) {
  // read all user names from the rating
  const docRef = doc(firestore, 'scores', playerID)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!')
  }
}

export async function createScore(numberOfnumbers, score, username, firestore) {
  console.log('recording scores...')
  const docRef = await addDoc(
    collection(
      firestore,
      'scores',
      'numberOfnumbers',
      'number' + numberOfnumbers
    ),
    {
      username: username,
      score: score,
    }
  )
  console.log(docRef)
  return docRef
  // console.log('create scores...')
  // return setDoc(doc(firestore, 'scores', playerID), {
  //   user: playerID,
  //   score: score,
  // })

  // return addDoc(collection(firestore, 'scores'), {
  //   user: playerID,
  //   score: score,
  // })
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
