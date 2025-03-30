export const renderImage = (image) => {
  const imageElement = document.createElement("img");
  imageElement.src = image;
  return imageElement;
}

export default renderImage;