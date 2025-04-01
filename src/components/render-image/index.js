import { add } from '@/utils'

export const renderImage = image => {
  require('./index.css')
  const imageElement = document.createElement('img')
  imageElement.src = image
  // 测试cacheGroup
  add(3, 2)
  return imageElement
}

export default renderImage
