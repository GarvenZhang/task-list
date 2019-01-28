import Index from '../modules/task'
import Draft from '../modules/draft'
import Tag from '../modules/tag'

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
