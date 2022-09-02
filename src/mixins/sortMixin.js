export default {
  methods: {
    shuffle(a) {
      let j, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        this.arraySwap(a, i, j);
      }
    },

    sleep() {
      return new Promise((resolve) => setTimeout(resolve, 1000 / this.sortingSpeed));
    },

    arraySetWithoutIndexes(array, index, value) {
      array.splice(index, 1, value);
    },

    arraySwap(array, indexA, indexB) {
      const x = array[indexA];
      this.arraySetWithoutIndexes(array, indexA, array[indexB]);
      this.arraySetWithoutIndexes(array, indexB, x);
    },
  },
};
