<template>
  <transition :name="disableTransition ? null : 'progress-circular--transition-fade'">
    <div
      class="progress-circular"
      :class="classes"
      :style="{ 'width': size + 'px', 'height': size + 'px' }"
    >
      <svg
          class="progress-circular__determinate"
          role="progressbar"
          :aria-valuemax="100"
          :aria-valuemin="0"
          :aria-valuenow="progress"
          :height="size"
          :width="size"
          v-if="type === 'determinate'"
      >
        <circle
            class="progress-circular__determinate-path"
            fill="transparent"
            stroke-dashoffset="0"

            :cx="size / 2"
            :cy="size / 2"
            :r="radius"
            :stroke-dasharray="strokeDashArray"
            :style="{ 'stroke-dashoffset': strokeDashOffset, 'stroke-width': calculatedStroke }"
        ></circle>
      </svg>
      <svg
          class="progress-circular__indeterminate"
          role="progressbar"
          viewBox="25 25 50 50"
          :aria-valuemax="100"
          :aria-valuemin="0"
          v-else
      >
        <circle
            class="progress-circular__indeterminate-path"
            cx="50"
            cy="50"
            fill="none"
            r="20"
            stroke-miterlimit="10"
            :stroke-width="calculatedStroke"
        ></circle>
      </svg>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'progress-circular',
  props: {
    type: {
      type: String,
      default: 'indeterminate' // 'indeterminate' or 'determinate'
    },
    color: {
      type: String,
      default: 'primary' // 'primary', 'accent', multi-color', 'black', or 'white'
    },
    progress: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 32
    },
    stroke: Number,
    autoStroke: {
      type: Boolean,
      default: true
    },
    disableTransition: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        `progress-circular--color-${this.color}`,
        `progress-circular--type-${this.type}`
      ]
    },
    strokeDashArray() {
      const circumference = 2 * Math.PI * this.radius
      return Math.round(circumference * 1000) / 1000
    },
    strokeDashOffset() {
      const progress = this.moderateProgress(this.progress)
      const circumference = 2 * Math.PI * this.radius
      return ((100 - progress) / 100) * circumference
    },
    radius() {
      const stroke = this.stroke ? this.stroke : 4
      return (this.size - stroke) / 2
    },
    calculatedStroke() {
      if (this.stroke) {
        return this.stroke
      }
      if (this.autoStroke) {
        return parseInt(this.size / 8, 10)
      }
      return 4
    }
  },
  methods: {
      moderateProgress(progress) {
          if (isNaN(progress) || progress < 0) {
              return 0
          }
          if (progress > 100) {
              return 100
          }
          return progress
      }
  }
}
</script>

<style lang="scss">
$progress-indeterminate-rotation-duration: 0.7s !default;
$progress-indeterminate-color-duration: 6s !default;
$progress-determinate-transition-duration: 0.3s !default;
$brand-primary-color: #2196f3 !default;
$brand-accent-color: #ab47bc !default;
.progress-circular {
  position: relative;
}
.progress-circular__determinate {
  transform: rotate(270deg);
}
.progress-circular__determinate-path {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset $progress-determinate-transition-duration;
}
.progress-circular__indeterminate {
  animation: progress-circular-rotate $progress-indeterminate-rotation-duration linear infinite;
  bottom: 0;
  height: 100%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  transform-origin: center center;
  width: 100%;
}
.progress-circular__indeterminate-path {
  stroke-dasharray: 89,200;
  stroke-dashoffset: -35px;
  stroke-linecap: round;
}
// ================================================
// Colors
// ================================================
.progress-circular--color-multi-color {
  .progress-circular__determinate-path {
    stroke: $brand-primary-color;
  }
  .progress-circular__indeterminate-path {
    animation: progress-circular-color $progress-indeterminate-color-duration ease-in-out infinite;
  }
}
.progress-circular--color-primary {
  .progress-circular__determinate-path,
  .progress-circular__indeterminate-path {
    stroke: $brand-primary-color;
  }
}
.progress-circular--color-accent {
  .progress-circular__determinate-path,
  .progress-circular__indeterminate-path {
    stroke: $brand-accent-color;
  }
}
.progress-circular--color-black {
  .progress-circular__determinate-path,
  .progress-circular__indeterminate-path {
    stroke: #212121;
  }
}
.progress-circular--color-white {
  .progress-circular__determinate-path,
  .progress-circular__indeterminate-path {
    stroke: white;
  }
}
// ================================================
// Toggle transition
// ================================================
.progress-circular--transition-fade-enter-active,
.progress-circular--transition-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.progress-circular--transition-fade-enter,
.progress-circular--transition-fade-leave-active {
  opacity: 0;
  transform: scale(0);
}
// ================================================
// Animations
// ================================================
@keyframes progress-circular-rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes progress-circular-color {
  0%,
  100% {
    stroke: #f44336;
  }
  40% {
    stroke: #2196f3;
  }
  66% {
    stroke: #4caf50;
  }
  80%,
  90% {
    stroke:  #ff9800;
  }
}
</style>
