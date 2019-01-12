let db = null
const defaultObjectStore = new Map([
  'default', {
    keyPath: 'id',
    autoIncrement: true
  }
])

export const init = ({
  name,
  version,
  objectStore = defaultObjectStore
} = {
  name: 'default',
  version: '1',
  objectStore: defaultObjectStore
}) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, version)
    request.addEventListener('error', e => {
      console.error(`indexedDB-打开数据库错误: ${e}`)
      reject(e)
    }, false)
    request.addEventListener('upgradeneeded', e => {
      db = e.target.result
      objectStore.forEach((item, i) => {
        if (!db.objectStoreNames.contains(i)) {
          db.createObjectStore(i, item)
        }
      })
    }, false)
    request.addEventListener('success', e => {
      db = e.target.result
      console.info('indexedDB-连接成功!')
      resolve(db)
    }, false)
  })
}

export const add = () => {

}
