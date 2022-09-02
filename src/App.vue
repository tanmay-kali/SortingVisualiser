<template>
	<div id="app" class="w-screen h-screen bg-gray-700">
		<div id="nav" class="flex w-screen h-auto text-lg text-center">
			<router-link
				class="flex-1 p-4 bg-green-500 border-r border-gray-700 opacity-75 text-bg-gray-700 hover:opacity-100"
				to="/bubble-sort"
				:class="{'opacity-100':$route.fullPath==='/bubble-sort'}"
			>Bubble Sort</router-link>
			<router-link
				class="flex-1 p-4 bg-green-500 border-r border-gray-700 opacity-75 text-bg-gray-700 hover:opacity-100"
				to="/selection-sort"
				:class="{'opacity-100':$route.fullPath==='/selection-sort'}"
			>Selection Sort</router-link>
			<router-link
				class="flex-1 p-4 bg-green-500 border-r border-gray-700 opacity-75 text-bg-gray-700 hover:opacity-100"
				to="/insertion-sort"
				:class="{'opacity-100':$route.fullPath==='/insertion-sort'}"
			>Insertion Sort</router-link>
			<router-link
				class="flex-1 p-4 bg-green-500 border-r border-gray-700 opacity-75 text-bg-gray-700 hover:opacity-100"
				to="/merge-sort"
				:class="{'opacity-100':$route.fullPath==='/merge-sort'}"
			>MergeSort</router-link>
			<router-link
				class="flex-1 p-4 bg-green-500 border-r border-gray-700 opacity-75 text-bg-gray-700 hover:opacity-100"
				to="/quick-sort"
				:class="{'opacity-100':$route.fullPath==='/quick-sort'}"
			>Quick Sort</router-link>
		</div>

		<div class="w-full text-white">
			<p class="p-4 text-5xl text-center">{{sortTitle.find(x=>x.path===$route.path).title}}</p>
			<div class="flex inline-block w-full h-auto p-4 sorting_container" v-if="arrItems">
				<div
					class="flex-1 float-left mx-1 bg-green-500 position-relative"
					v-for="item in arrItems"
					:key="item.id"
					:style="item.style"
				></div>
			</div>
			<FilterComponent
				class="fixed bottom-0 w-screen h-auto bg-green-500"
				:arraySize.sync="arraySize"
				:sortingSpeed.sync="sortingSpeed"
				@onClickStartSorting="sortTitle.find(x=>x.path===$route.path).fn()"
				@onClickResetSorting="onClickResetSort"
			/>
		</div>
	</div>
</template>
<script>
	import Vue from "vue";
	import FilterComponent from "./components/FilterComponent.vue";
	import sortMixin from "./mixins/sortMixin";

	export default Vue.extend({
		name: "App",

		components: {
			FilterComponent,
		},

		mixins: [sortMixin],

		data() {
			return {
				arraySize: 50,
				arrItems: [],
				sortingSpeed: 200,

				sortTitle: [
					{
						path: "/bubble-sort",
						title: "Bubble Sort Algorithm",
						fn: this.bubbleSort,
					},
					{
						path: "/selection-sort",
						title: "Selection Sort Algorithm",
						fn: this.selectionSort,
					},
					{
						path: "/insertion-sort",
						title: "Insertion Sort Algorithm",
						fn: this.insertionSort,
					},
					{
						path: "/merge-sort",
						title: "Merge Sort Algorithm",
						fn: this.mergeSort,
					},
					{
						path: "/quick-sort",
						title: "Quick Sort Algorithm",
						fn: this.quickSort,
					},
				],
			};
		},

		mounted() {
			this.setArrayItems();
			document.title = this.$route.meta.title;
		},

		watch: {
			arraySize() {
				this.setArrayItems();
			},
			$route(to, from) {
				this.shuffle(this.arrItems);
				document.title = to.meta.title;
			},
		},

		methods: {
			setArrayItems() {
				this.arrItems = [];
				for (let i = 1; i <= this.arraySize; i++) {
					const randomNumber = Math.round(
						Math.random() * (this.arraySize - 1) + 1
					);

					this.arrItems.push({
						id: i,
						value: randomNumber,
						style: this.getHeightForArrayItem(randomNumber),
					});
				}
			},

			getHeightForArrayItem(item) {
				const heightOfElement =
					window.innerHeight * 0.58 * (item / this.arraySize);
				return `height:${heightOfElement}px`;
			},

			onClickResetSort() {
				this.shuffle(this.arrItems);
			},

			async bubbleSort() {
				for (let i = 0; i < this.arraySize; i++) {
					for (let j = 0; j < this.arraySize - 1 - i; j++) {
						if (this.arrItems[j].value > this.arrItems[j + 1].value) {
							this.arraySwap(this.arrItems, j, j + 1);
							await this.sleep();
						}
					}
				}
			},

			async selectionSort() {
				for (let i = 0; i < this.arraySize; i++) {
					let min = i;
					for (let j = i + 1; j < this.arraySize; j++) {
						if (this.arrItems[j].value < this.arrItems[min].value) {
							min = j;
						}
					}

					this.arraySwap(this.arrItems, i, min);
					await this.sleep();
				}
			},

			async insertionSort() {
				for (let i = 0; i < this.arraySize; i++) {
					const key = this.arrItems[i];
					let j = i - 1;

					while (j >= 0 && this.arrItems[j].value > key.value) {
						this.arraySwap(this.arrItems, j, j + 1);
						j = j - 1;
						await this.sleep();
					}

					this.arrItems[j + 1] = key;
				}
			},

			mergeSort() {
				this.arrItems = this.runMergeSort(this.arrItems);
			},

			runMergeSort(input) {
				if (input.length <= 1) return input;

				// divide Array in half, figure out middle
				const middle = Math.floor(input.length / 2);
				// divide array into left and right
				const left = input.slice(0, middle);
				const right = input.slice(middle);

				return this.merge(this.runMergeSort(left), this.runMergeSort(right));
			},

			merge(left, right) {
				const resultArray = [];
				let leftIndex = 0;
				let rightIndex = 0;

				while (leftIndex < left.length && rightIndex < right.length) {
					const leftEl = left[leftIndex];
					const rightEl = right[rightIndex];

					if (leftEl.value < rightEl.value) {
						resultArray.push(leftEl);
						leftIndex++;
					} else {
						resultArray.push(rightEl);
						rightIndex++;
					}
				}

				return [
					...resultArray,
					...left.slice(leftIndex),
					...right.slice(rightIndex),
				];
			},

			quickSort() {
				this.arrItems = this.runQuickSort(
					JSON.parse(JSON.stringify(this.arrItems))
				);
			},

			runQuickSort(input) {
				if (input.length <= 1) return input;

				const pivot = input[input.length - 1];
				const leftArr = [];
				const rightArr = [];

				for (const el of input.slice(0, input.length - 1)) {
					if (el.value < pivot.value) {
						leftArr.push(el);
					} else {
						rightArr.push(el);
					}
				}

				return [
					...this.runQuickSort(leftArr),
					pivot,
					...this.runQuickSort(rightArr),
				];
			},
		},
	});
</script>


<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>
