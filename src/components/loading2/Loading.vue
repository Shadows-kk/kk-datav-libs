<template>
  <div class="loading">
    <svg :width="width" :height="height" viewBox="0 0 24 30">
      <rect x="0" y="0" width="4" height="10" :fill="colors[0]">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="10" y="0" width="4" height="10" :fill="colors[1]">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="20" y="0" width="4" height="10" :fill="colors[2]">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Loading2",
  props: {
    width: {
      type: [Number, String],
      default: "24",
    },
    height: {
      type: [Number, String],
      default: "30",
    },
    colors: {
      type: Array,
      default: ["#FF6700", "#01E4F2", "#12A3F6"],
    },
    duration: {
      type: [Number, String],
      default: 0.6,
    },
  },
  setup(ctx) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loading-content {
  color: purple;
}
</style>
