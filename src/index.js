import Test from './components/test/index'
import Test2 from './components/test2/index'
import Test3 from './components/test3/index'
import Icon from './components/icon/index'
import svgAnimation from './components/svgAnimation/index'
import Loading from './components/loading/index'
import Loading2 from './components/loading2/index'
import Loading3 from './components/loading3/index'
import Loading4 from './components/loading4/index'
import flyBox from './components/flyBox/index'
import Container from './components/container/index'
import VueCountTo from './components/VueCountTo/index'
import VueEcharts from './components/VueEcharts/index'
import BaseScrollList from './components/BaseScrollList/index'
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
  Vue.use(flyBox)
  Vue.use(Container)
  Vue.use(VueCountTo)
  Vue.use(VueEcharts)
  Vue.use(BaseScrollList)
}