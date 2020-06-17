export default {
  methods: {
    getProgress(mountain) {
      const exCount = mountain.exercises.length;
      const finCount = mountain.finished_exercises.length;
      const percentage = (finCount / exCount).toFixed(2) * 100;
      return percentage;
    }
  }
}
