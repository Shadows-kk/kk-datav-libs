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
        y="10"
        width="4"
        height="10"
        :fill="color"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="8"
        y="10"
        width="4"
        height="10"
        :fill="color"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.15s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.15s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.15s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="16"
        y="10"
        width="4"
        height="10"
        :fill="color"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.3s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.3s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.3s"
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
  name: "Loading4",
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