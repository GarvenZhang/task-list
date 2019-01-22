<template>
	<ul class="record-list">
		<li class="record-item" v-for="(item, index) in recordList" :key="index">
			<span class="txt-progress fr">{{ item.progress }}%</span>
			<span class="txt-time">{{ item.time }}</span>
			<Select type="getTypeList"/>
			<p>
				<textarea placeholder="写下任务进度记录~" class="textarea" rows="1" v-model="item.record" @change="handleOnChange($event, item.id)" @blur="handleOnBlur"></textarea>
			</p>
		</li>
	</ul>
</template>

<script>
import idb from "../lib/indexeddb";
import Select from './Select'

export default {
  components: {
    Select
  },
  data () {
    return {
      tagList: []
    }
  },
	props: {
		taskId: Number,
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
  },
  methods: {
    async handleOnChange (e, id) {
      const value = e.target.value;
      if(this.isEmpty(value)) {
        return;
      }

      const result = this.recordList.map((item) => {
        if (item.id === id) {
          item.record = value.trim()
        }

        return item;
      });

      await idb.set("record", result, this.taskId);
    },
    handleOnBlur (e) {
      const value = e.target.value;

      if(this.isEmpty(value)) {
        alert('请填写任务进度记录！')
        return;
      }
    },
    isEmpty (str) {
      return str.trim() === '';
    },
    
    getTagList () {

    }
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

