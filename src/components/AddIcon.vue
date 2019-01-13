<template>
	<div class="add-wrap">
		<span class="iconfont icon-plus-circle" @click="addHandle"></span>
	</div>
</template>

<script>
export default {
	props: {
		from: String
	},
	methods: {
		addHandle() {
			switch (this.from) {
				case "TaskITEM":
					this.$root.Bus.$emit("addTaskItem");
					break;
				case "Index":
					this.$emit("addHandle");
					break;
			}
		}
	}
};
</script>

<style scoped>
.add-wrap {
	text-align: center;
}
.icon-plus-circle {
	padding: 5px;
}
</style>

<style>
.add-wrap .icon-plus-circle {
	font-size: 34px;
	color: #bdd7d8;
}
</style>

