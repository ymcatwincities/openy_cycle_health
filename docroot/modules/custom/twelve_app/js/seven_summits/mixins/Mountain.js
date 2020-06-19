export default {
  computed: {
    progress() {
      return this.getProgress(this.summit);
    }
  },
  methods: {
    getProgress(mountain) {
      const exCount = mountain.exercises.length;
      const finCount = mountain.finished_exercises.length;
      const percentage = (finCount / exCount) * 100;
      return Math.round(percentage);
    }
  }
}
