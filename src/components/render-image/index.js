export const renderImage = (image) => {
  const imageElement = document.createElement("img");
  imageElement.src = image;
  const root = document.getElementById("root");
  root.appendChild(imageElement);
}
