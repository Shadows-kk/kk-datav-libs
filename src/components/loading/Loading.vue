<template>
  <div class="loading">
    <svg :width="width" :height="height" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        :stroke="outsideColor"
        stroke-width="4"
        stroke-dasharray="23"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="outsideColorAnimate"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="25"
        cy="25"
        r="10"
        fill="none"
        :stroke="insideColor"
        stroke-width="3"
        stroke-dasharray="10.4"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25;0 25 25"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="outsideColorAnimate"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "Loading",
  props: {
    width: {
      type: [Number, String],
      default: "50",
    },
    height: {
      type: [Number, String],
      default: "50",
    },
    outsideColor: {
      type: String,
      default: "#3be6cb",
    },
    insideColor: {
      type: String,
      default: "#02bcfe",
    },
    duration: {
      type: [Number, String],
      default: 1.5,
    },
  },
  setup(ctx) {
    const outsideColorAnimate = computed(
      () => `${ctx.outsideColor};${ctx.insideColor};${ctx.outsideColor}`
    );
    const insideColorAnimate = computed(
      () => `${ctx.insideColor};${ctx.outsideColor};${ctx.insideColor}`
    );
    return {
      outsideColorAnimate,
      insideColorAnimate,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading-content {
  color: #fff;
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
