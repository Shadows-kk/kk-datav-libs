 <template>
  <svg :style="{...style}">
    <use :href="iconName"></use>
  </svg>
</template>
 
 <script>
export default {
  name: "sangeIcon",
  props: {
    name: String,
    style: Object
  },
  setup (ctx) {
    //不能直接通过this拿到props中的值，需要通过一个参数ctx（context）获取
    const iconName = `#${ctx.name}`
    return {
      iconName
    }
  }
}
 </script>