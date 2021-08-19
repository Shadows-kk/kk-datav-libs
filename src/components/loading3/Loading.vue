<template>
  <div class="loading">
    <svg
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 24 30"
      style="enable-background:new 0 0 50 50;"
      xml:space="preserve"
    >
      <rect
        x="0"
        y="0"
        width="4"
        height="20"
        :fill="color"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="7"
        y="0"
        width="4"
        height="20"
        :fill="color"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.2s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="14"
        y="0"
        width="4"
        height="20"
        :fill="color"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="1; .2; 1"
          begin="0.4s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: "Loading3",
  props: {
    width: {
      type: [Number, String],
      default: "24"
    },
    height: {
      type: [Number, String],
      default: "30"
    },
    color: {
      type: String,
      default: '#01E4F2'
    },
    duration: {
      type: [Number, String],
      default: 0.8
    }
  },
  setup (ctx) {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>