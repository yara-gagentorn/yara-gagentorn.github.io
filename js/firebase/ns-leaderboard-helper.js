// based on 'build leaderboard with firebase'
import {
  writeBatch,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

// getting all records for the specific number
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
  // adding an automatic ID as id property
  const lastSlashIndex = docRef.path.lastIndexOf('/')
  const lastPart = docRef.path.slice(lastSlashIndex + 1)
  await updateDoc(docRef, { id: lastPart })

  return docRef
}

export async function deleteAllRecordsExcept(
  recordsToKeep,
  numberOfnumbers,
  firestore
) {
  console.log('records to keep: ', recordsToKeep)
  recordsToKeep.forEach((record) => console.log(record.id))
  const allRecords = await getAllRecords(numberOfnumbers, firestore)
  console.log('all records ', allRecords)
  const recordsToDelete = allRecords.filter(
    (record) => !recordsToKeep.some((keepRecord) => keepRecord.id === record.id)
  )
  const batch = writeBatch(firestore)
  console.log('records to delete: ', recordsToDelete)
  recordsToDelete.forEach((record) => {
    const docRef = doc(
      firestore,
      'scores',
      'numberOfnumbers',
      'number' + numberOfnumbers,
      record.id
    )
    batch.delete(docRef)
  })

  await batch.commit()
}
