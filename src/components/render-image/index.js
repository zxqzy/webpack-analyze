export const renderImage = (image) => {
  import("./index.css");
  const imageElement = document.createElement("img");
  imageElement.src = image;
  return imageElement;
};

export default renderImage;
