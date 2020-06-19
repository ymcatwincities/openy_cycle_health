<template>
  <g>
    <circle
      v-for="dot in dots"
      :cx="dot.x"
      :cy="dot.y"
      :class="{'finished_color' : dot.passed}"
      r="4.5"
      fill="white" stroke="white"/>
  </g>
</template>
<script>
  export default {
    props: [ 'summit', 'vA', 'vB', 'vC' ],
    computed: {
      dots() {
        if (this.summit.climb_exercise_amount === null) {
          this.summit.climb_exercise_amount = Math.round(this.summit.exercises.length/2);
        }
        const bottomSize = this.calcPointDistance(this.vA.x, this.vC.x, this.vA.y, this.vC.y);
        const bottomSizeHalf = bottomSize / 2;
        const leftSize = this.calcPointDistance(this.vA.x, this.vB.x, this.vA.y, this.vB.y);
        const catA = bottomSizeHalf / leftSize;
        const sinA = Math.sqrt(1 - catA*catA);
        const tanA = sinA / Math.sqrt(1 - sinA*sinA);
        const aLen = bottomSizeHalf / (this.summit.climb_exercise_amount-1);
        const goDownAmount = this.summit.exercises.length - this.summit.climb_exercise_amount;
        const downLen = bottomSizeHalf / goDownAmount;

        let dots = [{
          ...this.vA,
          passed: this.isExerciseFinishedByIndex(0)
        }];

        let x = 0;
        let y = 0;

        for (let i = 1; i < this.summit.exercises.length; i++) {
          const prevDot = dots[dots.length-1];
          if (i < this.summit.climb_exercise_amount) {
            x = prevDot.x + aLen;
            y = prevDot.y - (tanA * (x-prevDot.x));
          } else {
            x = prevDot.x + downLen;
            y = prevDot.y + (tanA * (x-prevDot.x));
          }
          dots.push({
            x: x,
            y: y,
            passed: this.isExerciseFinishedByIndex(i)
          })
        }

        return dots;
      }
    },
    methods: {
      isExerciseFinishedByIndex(index) {
        return this.summit.finished_exercises.includes(this.summit.exercises[index].id);
      },
      calcPointDistance(x1, x2, y1, y2) {
        return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
      },
    }
  }
</script>
