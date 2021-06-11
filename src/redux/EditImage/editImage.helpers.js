import { auth, firestore } from "../../firebase/utils";

export const handleAddEditImage = (imgData) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("editedImage")
      .doc()
      .set(imgData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchEditImage = (payload) => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("editedImage")
      .where("productID", "==", payload);
    // .where("userID", "==", auth.currentUser.uid);

    ref
      .get()
      .then((snapshot) => {
        const editedImageArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(editedImageArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// let ref = firestore
//       .collection("editedImage")
//       .where("userID", "==", auth.currentUser.uid);
//     // .where("productID", "==", productID);
//     ref
//       .get()
//       .then((snapshot) => {
//         if (snapshot.exists) {
//           console.log(snapshot);
//           resolve(snapshot.data());
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
