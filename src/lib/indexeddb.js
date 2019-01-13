import { openDb, deleteDb } from 'idb'

const dbPromise = openDb('tasklist', 1, upgradeDB => {
  upgradeDB.createObjectStore('task')
  upgradeDB.createObjectStore('record')
  upgradeDB.createObjectStore('img')
  upgradeDB.createObjectStore('tag')
  upgradeDB.createObjectStore('type')
})

export default {
  async get (storeName, key) {
    const db = await dbPromise
    return db.transaction(storeName).objectStore(storeName).get(key)
  },
  async set (storeName, val, key) {
    const db = await dbPromise
    const tx = db.transaction(storeName, 'readwrite')
    tx.objectStore(storeName).put(val, key)
    return tx.complete
  },
  async delete (storeName, key) {
    const db = await dbPromise
    const tx = db.transaction(storeName, 'readwrite')
    tx.objectStore(storeName).delete(key)
    return tx.complete
  },
  async clear (storeName) {
    const db = await dbPromise
    const tx = db.transaction(storeName, 'readwrite')
    tx.objectStore(storeName).clear()
    return tx.complete
  },
  async keys (storeName, key) {
    const db = await dbPromise
    return db.transaction(storeName).objectStore(storeName).getAllKeys(key)
  }
}
