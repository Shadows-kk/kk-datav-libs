<template>
  <div id="container" :ref="refName">
    <template v-if="ready">
      <slot>aaa</slot>
    </template>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../../utils";
export default {
  name: "Container",
  props: {
    options: Object,
  },
  setup(ctx) {
    const refName = "container";
    const width = ref(0);
    const height = ref(0);
    // 视口的宽高
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);
    let context, dom, observer;

    // 1.初始化 拿到dom的宽高和画布的宽高
    const initSize = () => {
      return new Promise((resolve) => {
        nextTick(() => {
          dom = context.$refs[refName];
          // a.获取大屏的真实尺寸
          if (ctx.options && ctx.options.width && ctx.options.height) {
            width.value = ctx.options.width;
            height.value = ctx.options.height;
          } else {
            // 没有传入宽高，就从dom上获取
            width.value = dom.clientWidth;
            height.value = dom.clientHeight;
          }
          // 这两个值在resize的时候会反复调用这两个值
          // 避免反复赋值
          if (!originalWidth.value || !originalHeight.value) {
            //b.这里拿到的是整个页面的宽高(画布)
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          console.log(
            "大屏真实宽高：" + width.value,
            height.value,
            "整个画布宽高：" + originalWidth.value,
            originalHeight.value
          );
          resolve();
        });
      });
    };

    // 2.更新DOM的宽高
    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalWidth.value}px`;
        dom.style.height = `${originalHeight.value}px`;
      }
    };

    // 3.根据传入的尺寸进行压缩
    const updateScale = () => {
      // c.拿到实际的视口显示区域宽高
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      console.log("视口显示区域宽高：" + currentWidth, currentHeight);
      // d.获取大屏最终的宽高(有dom拿dom，没dom拿画布宽高)
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      // 宽度的压缩比
      const widthScale = currentWidth / realWidth;
      // 高度的压缩比
      const heightScale = currentHeight / realHeight;
      dom && (dom.style.transform = `scale(${widthScale}, ${heightScale})`);
    };
    const onResize = async (e) => {
      console.log(e);
      await initSize();
      updateScale();
    };
    const initMutationObserver = () => {
      // MutationObserver接口提供了监视对DOM树所做更改的能力
      const mutationObserver = window.MutationObserver;
      observer = new mutationObserver(onResize);
      observer.observe(dom, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });
    };
    const removeMutationObserver = () => {
      if (observer) {
        observer.disconnected();
        observer.takeRecords();
        observer = null;
      }
    };
    onMounted(async () => {
      ready.value = false;
      // 拿到dom节点
      // console.log(getCurrentInstance());
      context = getCurrentInstance().ctx;
      await initSize();
      updateSize();
      updateScale();
      window.addEventListener("resize", debounce(500, onResize));
      initMutationObserver();
      ready.value = true;
    });
    // 查找vue3的api
    console.log(require("vue"));
    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
      removeMutationObserver();
    });
    return {
      refName,
      ready,
    };
  },
};
</script>
<style lang="scss" scoped>
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 99;
}
</style>
