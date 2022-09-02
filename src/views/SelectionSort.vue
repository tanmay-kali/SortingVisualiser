<template>
	<div class="w-full text-white">
		<p class="p-4 text-5xl text-center">Selection Sort Algorithm</p>
		<div class="flex inline-block w-full h-auto p-4 sorting_container" v-if="arrItems">
			<div
				class="flex-1 float-left bg-green-500 position-relative"
				v-for="item in arrItems"
				:key="item.id"
				:style="item.style"
			></div>
		</div>
		<FilterComponent
			class="fixed bottom-0 w-screen h-auto bg-green-500"
			:arraySize.sync="arraySize"
			:sortingSpeed.sync="sortingSpeed"
			@onClickStartSorting="onClickStartSort"
			@onClickStopSorting="onClickStopSorting"
			@onClickResetSorting="onClickResetSorting"
		/>
	</div>
</template>

<script>
	import Vue from "vue";
	import FilterComponent from "../components/FilterComponent.vue";
	import sortMixin from "../mixins/sortMixin";

	export default Vue.extend({
		name: "Selection sort",

		components: {
			FilterComponent,
		},

		mixins: [sortMixin],

		data() {
			return {
				arraySize: 10,
				arrItems: [],
				sortingSpeed: 200,
			};
		},

		mounted() {
			this.setArrayItems();
		},

		watch: {
			arraySize() {
				this.setArrayItems();
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
					window.innerHeight * 0.6 * (item / this.arraySize);
				return `height:${heightOfElement}px`;
			},

			async onClickStartSort() {
				console.warn('Bubble sort')
			},

			onClickStopSorting() {
				console.warn("Stop sort");
			},

			onClickResetSorting() {
				this.shuffle(this.arrItems);
			},
		},
	});
</script>

<style scoped>
</style>