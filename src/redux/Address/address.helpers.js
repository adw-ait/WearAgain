import { auth, firestore } from "../../firebase/utils";

//ADDRESS

export const handleAddAddress = (address) => {
  console.log(address);
  return new Promise((resolve, reject) => {
    firestore
      .collection("addresses")
      .doc()
      .set(address)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchAddresses = () => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("addresses")
      .where("addressUserUID", "==", auth.currentUser.uid);

    ref
      .get()
      .then((snapshot) => {
        const addressesArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(addressesArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteAddress = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("addresses")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchAddress = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("addresses")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
