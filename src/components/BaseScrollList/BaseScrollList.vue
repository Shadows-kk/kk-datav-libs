<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: actualConfig.headerBg,
        height: `${actualConfig.headerHeight}px`,
        fontSize: `${actualConfig.headerFontSize}px`,
        color: actualConfig.headerColor,
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="{
          width: `${columnWidth[i]}px`,
          ...headerStyle[i],
        }"
        v-html="headerItem"
        headerIndex
        :align="aligns[i]"
      />
    </div>
    <div
      class="base-scroll-list-rows-wrapper"
      :style="{ height: `${height - actualConfig.headerHeight}px` }"
    >
      <div
        class="base-scroll-list-rows"
        v-for="(rowData, index) in currentRowsData"
        :key="rowData.rowIndex"
        :style="{
          height: `${rowHeight[index]}px`,
          lineHeight: `${rowHeight[index]}px`,
          backgroundColor: rowData.rowIndex % 2 === 0 ? rowBg[0] : rowBg[1],
          fontSize: `${actualConfig.rowFontSize}px`,
          color: actualConfig.rowColor,
        }"
      >
        <div
          class="base-scroll-list-columns base-scroll-list-text"
          v-for="(colData, ci) in rowData.data"
          :key="colData + ci"
          v-html="colData"
          :style="{
            width: `${columnWidth[ci]}px`,
            ...rowStyle[ci],
          }"
          :align="aligns[ci]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import useScreen from "../../hooks/useScreen";
// 按需引入需要的lodash方法，全部引入包的体积会很大
import cloneDeep from "lodash/cloneDeep";
import assign from "lodash/assign";

const defaultConfig = {
  // 标题格式： ['a','b','c']
  headerData: [],
  // 标题样式： [{},{},{}]
  headerStyle: [],
  // 标题字体大小
  headerFontSize: 28,
  //行字体大小
  rowFontSize: 28,
  //标题颜色
  headerColor: "#fff",
  // 行颜色
  rowColor: "#000",
  //行样式
  rowStyle: [],
  // 行bg
  rowBg: [],
  // 标题背景色
  headerBg: "rgb(90,90,90)",
  // 标题高度
  headerHeight: 35,
  // 标题是否展示序号
  headerIndex: false,
  // 序号列标题的内容
  headerIndexContent: "#",
  // 序号列标题的样式
  headerIndexStyle: {
    width: "50px",
  },
  //序号列的数据内容
  headerIndexData: [],
  // 序号列内容的样式
  rowIndexStyle: {
    width: "50px",
  },
  // 数据项， 二维数组
  data: [],
  // 每页显示的数据量
  rowNum: 10,
  // 居中方式的配置项
  aligns: [],
  //移动的位置
  moveNum: 1,
  //动画间隔时间
  duration: 2000,
};
export default {
  name: "BaseScrollList",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const id = `base-scroll-list-${uuidv4()}`;
    const { width, height } = useScreen(id);
    const headerData = ref([]);
    const headerStyle = ref({});
    const rowStyle = ref({});
    const rowBg = ref([]);
    const actualConfig = ref([]);
    const columnWidth = ref([]);
    const rowsData = ref([]);
    const currentRowsData = ref([]); //当前行数据,在animation中展示
    const currentIndex = ref(0); //动画的指针，指向当前展示动画的元素
    const rowHeight = ref([]);
    const rowNum = ref(defaultConfig.rowNum);
    const aligns = ref([]);
    const isAnimationStart = ref(true);
    let avgHeight; //行高

    // 处理标题样式
    const handleHeader = (config) => {
      // 深拷贝数组 不要直接处理数组或者对象
      const _headerData = cloneDeep(config.headerData);
      const _headerStyle = cloneDeep(config.headerStyle);
      const _rowsData = cloneDeep(config.data);
      const _rowStyle = cloneDeep(config.rowStyle);
      const _aligns = cloneDeep(config.aligns);
      if (_headerData.length === 0) {
        return;
      }
      if (config.headerIndex) {
        // 有索引的情况下，往标题和样式数组最前面插入内容
        _headerData.unshift(config.headerIndexContent);
        _headerStyle.unshift(config.headerIndexStyle);
        _rowStyle.unshift(config.rowIndexStyle);
        _rowsData.forEach((rows, index) => {
          if (
            config.headerIndexData &&
            config.headerIndexData.length > 0 &&
            config.headerIndexData[index]
          ) {
            rows.unshift(config.headerIndexData[index]);
          } else {
            rows.unshift(index + 1);
          }
        });
        _aligns.unshift("center");
      }
      // 动态计算header中每一列的宽度
      let usedWidth = 0;
      let usedColumnNum = 0;
      // 动态计算列宽时，使用剩余的列数 / 剩余的列数
      const avgWidth =
        (width.value - usedWidth) / (_headerData.length - usedColumnNum);
      const _columnWidth = new Array(_headerData.length).fill(avgWidth);
      _headerStyle.forEach((style, index) => {
        if (style.width) {
          // 如果有自定义的width，则按自定义width逆行渲染
          const headerWidth = +style.width.replace("px", "");
          _columnWidth[index] = headerWidth;
        }
      });
      columnWidth.value = _columnWidth;
      headerData.value = _headerData;
      headerStyle.value = _headerStyle;
      rowStyle.value = _rowStyle;
      const { rowNum } = config;
      // 如果总数据量 >= 每页显示的数据量，尾部就会出现新插入内容的问题
      if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
        const newRowData = [..._rowsData, ..._rowsData];
        rowsData.value = newRowData.map((item, index) => ({
          data: item,
          rowIndex: index,
        }));
      } else {
        rowsData.value = _rowsData.map((item, index) => ({
          data: item,
          rowIndex: index,
        }));
      }

      aligns.value = _aligns;
    };
    // 处理数据行
    const handleRows = (config) => {
      // 动态计算每行数据的高度
      const { headerHeight } = config;
      rowNum.value = config.rowNum;
      // 容器高度 - 头部高度
      const unUsedHeight = height.value - headerHeight;
      // 如果rowNum大于实际数据长度，则以实际数据长度为准
      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length;
      }
      avgHeight = unUsedHeight / rowNum.value;
      rowHeight.value = new Array(rowNum.value).fill(avgHeight);
      if (config.rowBg) {
        rowBg.value = config.rowBg;
      }
    };
    // 动画
    const startAnimation = async () => {
      if (!isAnimationStart.value) return;
      const config = actualConfig.value;
      const { rowNum, moveNum, duration } = config;
      const totalLength = rowsData.value.length;
      if (totalLength < rowNum) return;
      const index = currentIndex.value;
      const _rowsData = cloneDeep(rowsData.value);
      //将数据重新进行头尾连接
      //[a,b,c,d,e,f] -> [b,c,d,e,f,a]
      const rows = _rowsData.slice(index);
      rows.push(..._rowsData.slice(0, index));
      currentRowsData.value = rows;

      // 行高度的变化一定在currentIndex值变更以前
      //先将所有行的高度还原
      rowHeight.value = new Array(totalLength).fill(avgHeight);
      const waitTime = 300;
      if (!isAnimationStart.value) return;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      // 将moveNus的行高度设为0
      rowHeight.value.splice(0, moveNum, ...new Array(moveNum).fill(0));
      currentIndex.value += moveNum;
      // 判断是否到达最后一组数据
      const isLast = currentIndex.value - totalLength;
      if (isLast >= 0) {
        currentIndex.value = isLast;
      }
      if (!isAnimationStart.value) return;
      await new Promise((resolve) => setTimeout(resolve, duration - waitTime));
      await startAnimation();
    };
    const stopAnimation = () => {
      isAnimationStart.value = false;
    };
    const update = () => {
      stopAnimation();
      // 合并默认的config配置和组件传入的config配置
      const _actualConfig = assign(defaultConfig, props.config);
      // 赋值rowsData
      rowsData.value = _actualConfig.data || [];
      handleHeader(_actualConfig);
      handleRows(_actualConfig);
      // 修改响应式对象，触发更新
      actualConfig.value = _actualConfig;
      isAnimationStart.value = true;
      startAnimation();
    };
    // onMounted(() => {
    //   update();
    // });
    watch(
      () => props.config,
      () => {
        update();
      }
    );
    return {
      id,
      headerData,
      headerStyle,
      rowStyle,
      rowBg,
      columnWidth,
      rowsData,
      currentRowsData,
      currentIndex,
      rowHeight,
      aligns,
      actualConfig,
      height,
    };
  },
};
</script>

<style lang="scss" scoped>
.base-scroll-list {
  width: 100%;
  height: 100%;
  .base-scroll-list-text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    padding: 0 10px;
    box-sizing: border-box;
  }
  .base-scroll-list-header {
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  .base-scroll-list-rows-wrapper {
    overflow: hidden;
    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
      .base-scroll-list-columns {
        height: 100%;
      }
    }
  }
}
</style>
