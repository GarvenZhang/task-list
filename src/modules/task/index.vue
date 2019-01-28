<template>
	<div class="app-wrap">
		<TaskItem
			v-for="(item, i) in list"
      :key="item.id"
      :data="item"
      :tags="tagList"
			@delHandle="delHandle(i)"
			@upHandle="upHandle(item, i)"
			@downHandle="downHandle(item, i)"
			@getList="getList"
      
		/>
		<AddIcon from="Index" @addHandle="addHandle"/>
		<Input/>
	</div>
</template>

<script>
import TaskItem from "../../components/TaskItem";
import AddIcon from "../../components/addIcon";
import Input from "../../components/Input";
import idb from "../../lib/indexeddb";

import { tag } from '../../data/tag';
import { type } from '../../data/type';

export default {
	components: {
		TaskItem,
		AddIcon,
		Input
	},
	data() {
		return {
      list: [],
      typeList: [],
      tagList: []
		};
	},
	async created() {

    // 需修改, 不用每次都set
    await this.initDB(tag, 'tag');
    await this.initDB(type, 'type');
	
    // 获取TaskList
    await this.getList();
    // 获取typeList
    await this.getTypeList();
    // 获取tagList
    await this.getTagList();
  },
	methods: {
		async addHandle() {
			let id = this.list.length + 1;
			await idb.set(
				"task",
				{
					id,
					name: "",
					priority: id,
					startTime: +Date.now(),
					endTime: +Date.now(),
					status: 1,
          tag: 1,
          progress: 0,
				},
				id
			);

			this.list = (await idb.getAll("task")) || [];
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
    
		async getList() {
      this.list = this.sort((await idb.getAll("task"))) || [];
    },

    async getTypeList () {
      this.typeList = (await idb.getAll("type")) || [];
    },

    async getTagList () {
      this.tagList = (await idb.getAll("tag")) || [];
    },
    
		async upHandle(data, index) {
      // up，就是减少
      // 找上一项，上一项的priority + 1
      // 当前项，当前项的priority - 1
      // 前提：数组一直都是排序的
      // 目标：当前项
      const priority = data.priority;

			if (priority === 1) {
				return;
      }

      const cur = Object.assign({}, this.list[index], {
        priority: priority - 1
      });
      const prev = Object.assign({}, this.list[index - 1], {
        priority
      });

      await idb.set('task', prev, prev.id);
      await idb.set('task', cur, cur.id);

      this.$set(this.list, index, prev);
      this.$set(this.list, index - 1, cur);
    },
    
		async downHandle(data, index) {
			const priority = data.priority;

			if (priority === this.list.length) {
				return;
      }

      const cur = Object.assign({}, this.list[index], {
        priority: priority + 1
      });
      const next = Object.assign({}, this.list[index + 1], {
        priority
      });

      await idb.set('task', next, next.id);
      await idb.set('task', cur, cur.id);

      this.$set(this.list, index, next);
      this.$set(this.list, index + 1, cur);

    },

    sort (list) {
      return list.sort((a, b) => {
        return a.priority - b.priority;
      });
    },

    async initDB (data, tableName) {
      for (let item of data) {
        await idb.set(tableName, item.name, item.id); 
      }
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
