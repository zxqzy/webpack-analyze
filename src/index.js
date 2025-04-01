// import { renderAddButton } from "@/components";
// import { renderImage } from "@/components";
import '@/styles/index.css'
import testImage from '@/assets/images/1.webp'
// renderAddButton();
// renderImage(testImage);

const root = document.getElementById('root')
// const fragment = document.createDocumentFragment();
const ul = document.createElement('ul')
ul.classList.add('route-list')
const textItems = [
  {
    text: '查看加载按钮效果',
    element: () => import('@/components/render-add-button'),
  },
  {
    text: '查看加载图片效果',
    element: () => import('@/components/render-image'),
    props: [testImage],
  },
]

textItems.forEach(item => {
  const li = document.createElement('li')
  li.innerHTML = item.text
  ul.appendChild(li)
})

ul.addEventListener('click', e => {
  const target = e.target
  if (target.tagName === 'LI') {
    const item = textItems.find(item => item.text === target.innerHTML)
    if (!item) return
    const { element: renderElement, props } = item
    renderElement().then(module => {
      const el = module.default(...(props ?? []))
      const element = document.createElement('div')
      element.appendChild(el)

      if (root.lastChild.tagName === 'DIV') {
        root.removeChild(root.lastChild)
      }
      // require('@/styles/index.css');
      root.appendChild(element)
    })
  }
})

root.appendChild(ul)
