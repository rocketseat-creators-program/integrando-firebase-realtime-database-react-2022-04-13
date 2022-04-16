import * as FirebaseApp from "firebase/app";
import * as FirebaseDatabase from "firebase/database";

const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

FirebaseApp.initializeApp(FIREBASE_CONFIG);
const FIREBASE_DATABASE = FirebaseDatabase.getDatabase();

export function createOrUpdateData(pathOnDB, data, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDB);
  FirebaseDatabase.set(PATH_REF, data)
    .then(() => {
      const DATA_RECORDED = { ...data, key: PATH_REF.key };
      callback(null, DATA_RECORDED);
    })
    .catch((error) => {
      callback(error, null);
    });
}

export function createItemToList(pathOnDB, data, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDB);
  const ITEM_REF = FirebaseDatabase.push(PATH_REF);
  FirebaseDatabase.push(ITEM_REF, data)
    .then(() => {
      const DATA_RECORDED = { ...data, key: ITEM_REF.key };
      callback(null, DATA_RECORDED);
    })
    .catch((error) => {
      callback(error, null);
    });
}

export function readData(pathOnDB, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDB);
  FirebaseDatabase.get(PATH_REF)
    .then((data) => {
      if (data.exists()) {
        const DATA = data.val();
        callback(null, DATA);
      } else {
        callback("No data available", null);
      }
    })
    .catch((error) => {
      callback(error, null);
    });
}

export function deleteData(pathOnDB, callback) {
  createOrUpdateData(pathOnDB, null, (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    callback(null, null);
  });
}

export function listenChangeData(pathOnDB, callback) {
  const PATH_REF = FirebaseDatabase.ref(FIREBASE_DATABASE, pathOnDB);
  FirebaseDatabase.onValue(PATH_REF, (data) => {
      const DATA = data.val()
      callback(DATA)
  });
}
