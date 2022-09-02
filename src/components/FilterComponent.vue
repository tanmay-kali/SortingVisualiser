<template>
	<div class="w-auto text-white">
		<div class="w-screen mt-2 text-xl text-center">
			<button
				class="px-4 py-2 mx-1 font-semibold text-white bg-transparent border border-white rounded focus:outline-none hover:bg-green-800 hover:text-white hover:border-transparent"
				@click="$emit('onClickResetSorting')"
			>
				<img class="relative float-left mt-1 icon" src="../assets/icon-shuffle.svg" />
				<span class="relative float-right">Reshuffle</span>
			</button>
			<button
				class="px-4 py-2 mx-1 font-semibold text-white bg-transparent border border-white rounded focus:outline-none hover:bg-green-800 hover:text-white hover:border-transparent"
				@click="$emit('onClickStartSorting')"
			>
				<img class="relative float-left mt-1 icon" src="../assets/icon-play.svg" />
				<span class="relative float-right">Play</span>
			</button>
		</div>
		<div class="text-lg text-center">
			<div class="inline-block p-2">
				<label class="relative w-2/12 px-6 text-center">Array Size</label>
				<input
					type="number"
					class="w-3/12 text-center text-white bg-green-700"
					:placeholder="400"
					max="1000"
					step="1"
					v-model.number="sizeOfArray"
				/>
			</div>
			<div class="p-2">
				<label class="relative w-2/12 px-6 text-center">Sorting Speed</label>
				<input
					class="h-3 overflow-hidden bg-gray-400 rounded-lg appearance-none w-128"
					type="range"
					min="1"
					max="500"
					step="5"
					v-model.number="sortSpeed"
				/>
			</div>

			<a class href="https://github.com/VanwildemeerschBrent/SortingVisualizer" target="_blank">
				<img class="absolute bottom-0 right-0 p-3" src="../assets/github-icon.png" />
			</a>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "FilterComponent",

		props: {
			arraySize: { required: true, type: Number, default: 10 },
			sortingSpeed: { required: true, type: Number, default: 500 },
		},

		data() {
			return {
				sizeOfArray: this.arraySize,
				sortSpeed: this.sortingSpeed,
			};
		},

		watch: {
			sizeOfArray() {
				this.$emit("update:arraySize", this.sizeOfArray);
			},
			sortSpeed() {
				this.$emit("update:sortingSpeed", this.sortSpeed);
			},
		},
	});
</script>