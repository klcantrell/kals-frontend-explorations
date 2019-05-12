const db = idb.open('posts-store', 1, db => {
  if (!db.objectStoreNames.contains('posts')) {
    db.createObjectStore('posts', { keyPath: 'id' });
  }
});

function writeData(store, data) {
  return db.then(openedDb => {
    const tx = openedDb.transaction(store, 'readwrite');
    const st = tx.objectStore(store);
    st.put(data);
    return tx.complete;
  });
}

function readAllData(store) {
  return db.then(openedDb => {
    const tx = openedDb.transaction(store, 'readonly');
    const st = tx.objectStore(store);
    return st.getAll();
  });
}

function clearAllData(store) {
  return db.then(openedDb => {
    const tx = openedDb.transaction(store, 'readwrite');
    const st = tx.objectStore(store);
    st.clear();
    return tx.complete;
  });
}
