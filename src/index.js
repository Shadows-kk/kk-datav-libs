import Test from './components/test/index'
import Test2 from './components/test2/index'
import Test3 from './components/test3/index'
import Icon from './components/icon/index'
import svgAnimation from './components/svgAnimation/index'
import Loading from './components/loading/index'
import Loading2 from './components/loading2/index'
import Loading3 from './components/loading3/index'
import Loading4 from './components/loading4/index'
export default function (Vue) {
  Vue.use(Test)
  Vue.use(Test2)
  Vue.use(Test3)
  Vue.use(Icon)
  Vue.use(svgAnimation)
  Vue.use(Loading)
  Vue.use(Loading2)
  Vue.use(Loading3)
  Vue.use(Loading4)
}