<template>
	<ul>
		<li v-for="item in data" :key="item">{{item}}</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				data: [1,2,3,4,5]
			};
		}
	}
</script>

<style>

</style>
