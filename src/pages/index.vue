<template>
	<div class="app-wrap">
		<TaskItem
			v-for="(item, i) in list"
			:id="i"
			:title="item.title"
			:progress="item.progress"
			@delHandle="delHandle(i)"
			@progressHandle="progressHandle"
			@titleHandle="titleHandle"
			@upHandle="upHandle"
			@downHandle="downHandle"
		/>
		<AddIcon from="Index" @addHandle="addHandle"/>
	</div>
</template>

<script>
import TaskItem from "../components/TaskItem";
import AddIcon from "../components/addIcon";
import idb from '../lib/indexeddb'

export default {
	components: {
		TaskItem,
		AddIcon
	},
	data() {
		return {
			list: []
		};
	},
	updated() {
		if (this.list.length === 0) {
			return;
		}
		localStorage.setItem(
			"list",
			JSON.stringify({
				data: this.list
			})
		);
	},
	async mounted() {
		const list = localStorage.getItem("list");
    this.list = (list && JSON.parse(list).data) || [];
    
    // tag
    await idb.set('tag', '事业', 0)
    await idb.set('tag', '生活', 1)
    await idb.set('tag', '家庭', 2)
    await idb.set('tag', '健康', 3)
    await idb.set('tag', '交际', 4)
    await idb.set('tag', '思维', 5)

    // type
    await idb.set('type', '进度记录', 0)
    await idb.set('type', '任务步骤', 1)
    await idb.set('type', '总结反省', 2)

	},
	methods: {
		addHandle() {
			this.list.push({
				title: "",
				progress: 0
			});
		},
		delHandle(id) {
			for (let l = this.list.length; l--; ) {
				const item = this.list[l];
				if (l === id) {
					this.list.splice(l, 1);
					break;
				}
			}
		},
		progressHandle(value, id) {
			for (let l = this.list.length; l--; ) {
				const item = this.list[l];
				if (l === id) {
					item.progress = value;
					break;
				}
			}
		},
		titleHandle(value, id) {
			for (let l = this.list.length; l--; ) {
				const item = this.list[l];
				if (l === id) {
					item.title = value;
					break;
				}
			}
		},
		upHandle(id) {
			if (id === 0) {
				return;
			}
			const temp = this.list[id - 1];
			this.$set(this.list, id - 1, this.list[id]);
			this.$set(this.list, id, temp);
		},
		downHandle(id) {
			console.log(id);
			if (id === this.list.length - 1) {
				return;
			}
			const temp = this.list[id + 1];
			this.$set(this.list, id + 1, this.list[id]);
			this.$set(this.list, id, temp);
		}
	}
};
</script>



<style scoped>
.app-wrap {
	height: 100%;
	padding-top: 10px;
}
</style>
