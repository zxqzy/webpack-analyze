export const renderImage = image => {
  // 不会动态分割
  require('./index.css')
  const imageElement = document.createElement('img')
  imageElement.src = image
  return imageElement
}

export default renderImage
