<template>
  <svg>
    <circle
      stroke="white"
      stroke-opacity="0.3"
      fill="transparent"
      :stroke-width="stroke"
      :r="normalizedRadius"
      cx="50%"
      cy="50%"
    />
    <circle
      stroke="white"
      fill="transparent"
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{ strokeDashoffset }"
      :stroke-width="stroke"
      :r="normalizedRadius"
      cx="50%"
      cy="50%"
    />
    <text class="progress-ring__percentage" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{{ progress }}%</text>
  </svg>
</template>

<script>
  export default {
    props: {
      radius: String,
      progress: String,
      stroke: String,
    },
    data() {
      const normalizedRadius = this.radius - this.stroke * 2;
      const circumference = normalizedRadius * 2 * Math.PI;

      return {
        normalizedRadius,
        circumference
      };
    },
    computed: {
      strokeDashoffset() {
        return this.circumference - this.progress / 100 * this.circumference;
      }
    },
  }
</script>
