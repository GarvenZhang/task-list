import Index from '../pages/Index'
import Draft from '../pages/Draft'
import Tag from '../pages/Tag'

const routes = [{
  path: '/',
  component: Index,
  name: 'index'
}, {
  path: '/draft',
  component: Draft,
  name: 'draft'
}, {
  path: '/tag',
  component: Tag,
  name: 'tag'
}]

export default routes
