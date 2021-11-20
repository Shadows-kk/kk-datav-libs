<template>
  <div class="wrapper">
    <!-- svg配合css实现动画效果 -->
    <div class="container">
      <svg width="440" height="440">
        <circle
          cx="220"
          cy="220"
          r="200"
          stroke-width="20"
          stroke="#d1d3d7"
          fill="transparent"
        ></circle>
        <circle
          class="circle"
          cx="220"
          cy="220"
          r="200"
          stroke-width="20"
          stroke="#00a5e0"
          fill="none"
          transform="matrix(0,-1,1,0,0,440)"
        ></circle>
      </svg>
    </div>
    <div class="container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="none"
          stroke="#d1d3d7"
          stroke-width="8"
        ></rect>
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="none"
          stroke="#00a5e0"
          stroke-width="8"
          class="react"
          transform="matrix(0,1,-1,0,200,0)"
        ></rect>
      </svg>
    </div>
    <div class="container">
      <svg viewBox="0 0 1024 1024" width="200" height="200">
        <path
          class="logo"
          d="M752.4 621.7c18.1 0 32.8-39.3 32.8-87.7 0-48.5-14.7-87.7-32.8-87.7s-32.8 39.3-32.8 87.7c0 48.4 14.7 87.7 32.8 87.7z m-284.1 43.8c18.1 0 32.8-34.4 32.8-76.8s-14.7-76.8-32.8-76.8c-18.1 0-32.8 34.4-32.8 76.8 0 42.5 14.7 76.8 32.8 76.8zM64 555.9c0 218.8 201.2 394.8 448 394.8s448-176 448-394.8-201.2-394.8-448-394.8c3.2 0 4.3 0.5 4.3 0.5-1.9-1.4-4-3.2-9.7-8.4-15.9-14.5-25.8-22.6-41.1-32.4-47.1-30.1-109-47.3-193.9-47.3-12.1 0-21.9 9.8-21.9 21.9s9.8 21.9 21.9 21.9c76.8 0 130.4 14.9 170.4 40.4 10.6 6.8 54.9 47.3 70 47.3 223.9 0 404.3 157.8 404.3 350.9S735.9 906.8 512 906.8 107.7 749 107.7 555.9c0-127.5 79.3-243.5 205.4-305.6 10.8-5.3 15.3-18.5 10-29.3-5.3-10.9-18.4-15.4-29.2-10C153.4 280 64 410.8 64 555.9z"
        ></path>
      </svg>
    </div>
    <!-- SMIL动画 -->
    <div class="container">
      <svg width="200" height="200">
        <rect x="0" y="0" height="50" width="200" fill="red">
          <!-- SMIL作用域哪个标签，就放在哪个标签内部 -->
          <set attributeName="x" attributeType="XML" to="10" begin="1"></set>
          <set attributeName="x" attributeType="XML" to="20" begin="2"></set>
          <set
            attributeName="fill"
            attributeType="XML"
            to="purple"
            begin="3"
          ></set>
        </rect>
      </svg>
    </div>
    <div class="container">
      <svg width="200" height="200">
        <circle
          cx="0"
          cy="0"
          r="30"
          fill="blue"
          stroke="black"
          stroke-width="1"
        >
          <animate
            attributeName="cx"
            attributeType="XML"
            from="0"
            to="100"
            dur="2s"
            repeatCount="2"
            fill="freeze"
          ></animate>
          <animate
            attributeName="cy"
            attributeType="XML"
            from="0"
            to="100"
            dur="2s"
            repeatCount="2"
            fill="freeze"
          ></animate>
          <animate
            attributeName="fill"
            attributeType="XML"
            from="blue"
            to="purple"
            dur="2s"
            repeatCount="2"
            fill="freeze"
          ></animate>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="scale"
            from="1"
            to="2"
            dur="2s"
            repeatCount="2"
            fill="freeze"
          ></animateTransform>
        </circle>
      </svg>
    </div>
    <div class="container">
      <svg width="100" height="100">
        <polygon points="30 30 70 30 90 70 10 70" fill="#fcc" stroke="black">
          <animate
            attributeName="points"
            attributeType="XML"
            to="50 30 70 50 50 90 30 50"
            dur="3s"
            fill="freeze"
            repeatCount="indefinite"
          />
        </polygon>
      </svg>
    </div>
    <div class="container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect x="0" y="0" width="10" height="10" fill="red">
          <animateMotion
            path="M 10 10 L 110 10 L 110 110 L 10 110 Z"
            dur="2s"
            rotate="0"
            fill="freeze"
            repeatCount="indefinite"
          />
        </rect>
        <path
          id="motion-path"
          d="M 10 10 L 110 10 L 110 110 L 10 110 Z"
          fill="none"
          stroke="green"
        />
      </svg>
    </div>
    <div class="container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect x="0" y="0" width="10" height="10" fill="red">
          <animateMotion
            id="forward-animate"
            path="M 10 10 L 110 10 L 110 110 L 10 110 "
            dur="2s"
            rotate="0"
            fill="freeze"
            begin="0; backward-animate.end + 0.1s"
          />
          <animateMotion
            id="backward-animate"
            path="M 10 110 L 110 110 L 110 10 L 10 10 "
            dur="2s"
            rotate="0"
            fill="freeze"
            begin="forward-animate.end + 0.1s"
          />
          <animate
            id="red2blue"
            attributeName="fill"
            attributeType="XML"
            from="red"
            to="blue"
            dur="2s"
            fill="freeze"
            begin="0; blue2red.end + 0.1s"
          />
          <animate
            id="blue2red"
            attributeName="fill"
            attributeType="XML"
            from="blue"
            to="red"
            dur="2s"
            fill="freeze"
            begin="red2blue.end + 0.1s"
          />
        </rect>
        <path
          id="motion-path"
          d="M 10 10 L 110 10 L 110 110 L 10 110 "
          fill="none"
          stroke="green"
        />
      </svg>
    </div>
    点击变色
    <div class="container">
      <svg viewBox="0 0 200 200" width="200" height="200">
        <g id="rect1">
          <rect x="0" y="0" rx="0" ry="0" width="100" height="100" fill="red">
            <animate
              attributeType="XML"
              attributeName="fill"
              from="red"
              to="green"
              begin="rect1.click"
              dur="2s"
              fill="freeze"
            />
          </rect>
        </g>
        <animateTransform
          attributeType="XML"
          attributeName="transform"
          type="translate"
          from="0, 0"
          to="50, 50"
          begin="rect1.click"
          dur="2s"
          fill="freeze"
        />
        <rect x="0" y="100" width="100" height="100" fill="blue">
          <animate
            attributeType="XML"
            attributeName="fill"
            from="blue"
            to="green"
            begin="rect1.click"
            dur="2s"
            fill="freeze"
          />
        </rect>
      </svg>
    </div>
    <div class="container">
      <svg width="400" height="400">
        <defs>
          <mask id="test-mask">
            <rect x="5" y="5" width="390" height="390" fill="red"></rect>
            <circle r="50" cx="200" cy="200" />
          </mask>
          <!-- 渐变方式一 线性渐变-->
          <linearGradient id="test-linearGradient">
            <stop offset="0%" stop-color="red"></stop>
            <stop offset="50%" stop-color="purple"></stop>
            <stop offset="100%" stop-color="blue" stop-opacity="10%"></stop>
          </linearGradient>
          <!-- 渐变方式二 径向渐变-->
          <radialGradient
            id="test-radialGradient"
            r="50%"
            cx="50%"
            cy="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stop-color="red"></stop>
            <stop offset="100%" stop-color="blue"></stop>
          </radialGradient>
        </defs>
        <!-- <rect
          x="5"
          y="5"
          width="390"
          height="390"
          fill="url(#test-linearGradient)"
        ></rect> -->
        <rect
          x="5"
          y="5"
          width="390"
          height="390"
          fill="url(#test-radialGradient)"
        ></rect>
        <!-- 蓝色层注册成蒙版 -->
        <!-- <rect
          x="5"
          y="5"
          width="390"
          height="390"
          fill="blue"
          mask="url(#test-mask)"
        ></rect> -->
      </svg>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "svgAnimation",
  setup() {
    onMounted(() => {
      //获取svg图形的路径长度
      const logo = document.getElementsByClassName("logo")[0];
      console.log(logo.getTotalLength());
    });
  },
};
</script>
<style scoped lang="scss">
.container {
  svg {
    border: 1px solid #333;
  }
}
.circle {
  animation: circle 2s ease-out infinite;
}
.react {
  animation: react 2s ease-out infinite;
}
.logo {
  fill: none;
  stroke: #333;
  stroke-width: 5;
  animation: logo 5s ease-out 1 forwards;
}
@keyframes circle {
  from {
    stroke-dasharray: 0 1257;
  }
  to {
    stroke-dasharray: 1257 0;
  }
}
@keyframes react {
  from {
    stroke-dasharray: 0 800;
  }
  to {
    stroke-dasharray: 800 0;
  }
}
@keyframes logo {
  0% {
    fill: white;
    stroke-dasharray: 6024;
    stroke-dashoffset: 6024;
  }
  50% {
    fill: white;
    stroke-dasharray: 6024;
    stroke-dashoffset: 0;
  }
  75% {
    fill: blue;
    stroke: white;
  }
  100% {
    fill: purple;
    stroke: white;
  }
}
.wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
</style>
