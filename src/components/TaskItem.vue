<template>
  <section class="section">
    <div class="section-inner">
      <div class="section-main">
        <div class="main-area">
          <div class="row row--title clearfix">
            <div class="rt-area fr clearfix">
              <span
                class="iconfont icon-up-circle"
                @click="upHandle"
              ></span>
              <span
                class="iconfont icon-down-circle"
                @click="downHandle"
              ></span>
            </div>
            <div class="lt-area">
              <div class="priority-wrap">
                <span class="txt-priority">{{data.priority}}</span>
              </div>
              <input
                type="text"
                class="inp-title"
                placeholder="任务名称"
                :value="data.name"
                @input="updateData($event, 'name')"
              >
              <Select :status="data.status" type="getTagList" @updateData="updateData"/>
            </div>
          </div>
          <div class="row row--progress">
            <input
              type="range"
              :id="data.id"
              class="inp-progress"
              :value="data.progress"
              @change="updateData($event, 'progress')"
            >
            <label
              :for="data.id"
              class="label"
            >{{data.progress}}%</label>
          </div>
          <!-- <div class="detail-wrap">
						<div class="icon-wrap">
							<div class="icon-inner">
								<span class="iconfont icon-down"></span>
								<span class="iconfont icon-down"></span>
							</div>
						</div>
					</div>-->
          <div class="option-wrapper">
            <a
              href="javascript:;"
              @click="addRecord"
            >添加</a>
            <span class="txt-endTime">{{timeFormat(data.endTime)}}</span>
          </div>
          <!-- <div class="cover-wrap hide"></div> -->
        </div>
        <div class="del-area">
          <span
            class="iconfont icon-close-circle"
            @click="delHandle"
          ></span>
        </div>
      </div>
      <div class="section-aside">
        <RecordList :recordList="recordList" :taskId="data.id"/>
      </div>
    </div>
  </section>
</template>

<script>
import AddIcon from "../components/AddIcon";
import RecordList from "../components/RecordList";
import Select from '../components/Select'
import idb from "../lib/indexeddb";

export default {
  props: {
    data: {
      type: Object,
      default: {
        id: Number,
        name: String,
        progress: Number,
        priority: Number,
        endTime: Number,
        status: Number,
        tag: Number
      }
    },
  },
  components: {
    AddIcon,
    RecordList,
    Select
  },
  data() {
    return {
      recordList: [],
      tags: [],
      type: []
    };
  },
  async created() {
    this.recordList = (await idb.get("record", this.data.id)) || []
    this.tags = (await idb.getAll("tag")) || []
    this.type = (await idb.getAll('type')) || []
  },
  methods: {
    timeFormat(time) {
      return time
    },
    async addRecord() {
      const copy = this.recordList;
      const len = this.recordList.length;
      const { id, progress } = this.data;

      if (len > 0) {
        const lastItem = this.recordList[len - 1];

        if (this.isEmpty(lastItem.record)) {
          alert('请填写任务进度记录！')
          return;
        }
      }

      const cur = {
        id: len,
        taskId: id,
        time: "11111",
        progress,
        type: '2',
        record: "",
        img: []
      };

      // 请求
      await idb.set("record", cur, len);

      // update
      this.recordList.push(cur);
    },
    delHandle() {
      if (confirm("确定删除?")) {
        this.$emit("delHandle");
      }
    },
    async updateData(e, name) {
      let val = e.target.value;

      switch (name) {
        case 'progress':
        case 'status':
          val = parseInt(val)
          break
      
        default:
          break;
      }

      await idb.set(
        "task",
        {
          ...this.data,
          [name]: val
        },
        this.id
      );
      this.$emit("getList");
    },

    upHandle(e) {
      const target = e.target;
      this.$emit("upHandle", this.id);
    },
    downHandle(e) {
      const target = e.target;
      this.$emit("downHandle", this.id);
    },
    isEmpty (str) {
      return str.trim() === '';
    }
  }
};
</script>

<style scoped>
.section {
  border: 1px solid transparent;
  border-radius: 0 0 10px 0;
  margin: 0 20px 10px 0;
  padding: 10px 0 0 20px;
  overflow-x: hidden;
}
.section-inner {
  /* transform: translateX(-80px); */
}
.section-main {
  width: calc(100% + 80px);
  height: 115px;
  display: flex;
}
.section .main-area {
  position: relative;
  flex: 1;
  background-color: #61a9ab61;
}

.section .detail-wrap {
}
.section .icon-wrap {
  height: 20px;
  width: 100%;
  text-align: center;
}
.section .icon-inner {
  display: inline-block;
  line-height: 1;
  border: 4px double #c3afaf;
  border-bottom: none;
}
.icon-wrap .icon-down {
  color: #692323;
}
.section .del-area {
  width: 80px;
  color: #f0f8ff;
  background-color: #6f4949;
  text-align: center;
}
.del-area .icon-close-circle {
  font-size: 38px;
  line-height: 115px;
}
.section .row {
  padding: 10px;
}
.section .lt-area {
  position: relative;
}
.section .priority-wrap {
  position: absolute;
  top: -20px;
  left: -16px;
  width: 38px;
  height: 38px;
  text-align: center;
  border: 3px dashed #a593a2;
  border-radius: 50%;
}
.section .txt-priority {
  font-size: 24px;
  line-height: 38px;
  color: #d29e9e;
}
.section .inp-title {
  width: 150px;
  font-size: 18px;
  color: #8c4545;
  margin-left: 40px;
  border-right: 1px solid;
}
.row--title {
  position: relative;
}
.row--title .rt-area {
  position: absolute;
  top: -6px;
  right: 0;
  line-height: 1.3;
  padding: 0 5px;
  background-image: linear-gradient(
    to bottom,
    #5f9ea0 10%,
    transparent 10%,
    #5f9ea0 15%,
    #5f9ea0 20%,
    #61a9ab61 80%
  );
}
.row--title {
  padding-bottom: 5px;
}
.row--title .iconfont {
  font-size: 24px;
  color: #8b00007a;
}
.section .row--progress {
  padding-bottom: 0;
}
.row--progress .inp-progress {
  width: 80%;
  height: 40px;
  margin: 0 10px;
}
.row--progress .inp-progress,
.row--progress .label {
  vertical-align: middle;
}
.main-area .cover-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.addicon-wrap {
  padding-top: 3px;
}
.addicon-wrap >>> .icon-plus-circle {
  font-size: 18px;
  color: #6da995;
}
.option-wrapper {
  display: flex;
}
.section-aside {
  max-height: 200px;
  overflow: auto;
}
</style>




