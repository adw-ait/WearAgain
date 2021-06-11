import editImageTypes from "./editImage.types";

export const addNewEditImageStart = (imgData) => ({
  type: editImageTypes.ADD_NEW_EDITIMAGE_START,
  payload: imgData,
});

export const fetchImagesStart = () => ({
  type: editImageTypes.FETCH_EDITIMAGES_START,
});

export const setEditImages = (images) => ({
  type: editImageTypes.SET_EDITIMAGES,
  payload: images,
});

export const deleteEditImageStart = (imageId) => ({
  type: editImageTypes.DELETE_EDITIMAGE_START,
  payload: imageId,
});

export const fetchImageStart = (productID) => ({
  type: editImageTypes.FETCH_EDITIMAGE_START,
  payload: productID,
});

export const setEditImage = (image) => ({
  type: editImageTypes.SET_IMAGE,
  payload: image,
});
