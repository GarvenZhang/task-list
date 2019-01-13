<template>
	<ul class="record-list">
		<li class="record-item" v-for="(item, index) in recordList" :key="index">
			<span class="txt-progress fr">{{ item.progress }}%</span>
			<span class="txt-time">{{ item.time }}</span>
			<select name>
				<option value>1</option>
			</select>
			<p>
				<textarea placeholder="写下任务进度记录~" class="textarea" rows="1" v-model="item.name"></textarea>
			</p>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		id: String,
		/**
     * recordListItem
     * {
				id: String,
				time: String,
				progress: Number,
				type: Number,
				record: String,
				img: Array
			}
     */
		recordList: Array
	}
};
</script>


<style scoped>
.record-list {
	font: 100 12px/1.2 cursive;
	padding-right: 2px;
}
.record-item {
	border-bottom: 1px solid #ccc;
}
.record-item:nth-last-of-type(1) {
	border-bottom: none;
}
.textarea {
	width: 100%;
	background-color: #dcd5d5;
}
</style>

