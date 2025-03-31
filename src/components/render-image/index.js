export const renderImage = (image) => {
  require("./index.css");
  const imageElement = document.createElement("img");
  imageElement.src = image;
  return imageElement;
};

export default renderImage;
