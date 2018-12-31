<template>
  <section class="section">
    <div class="row row--title clearfix">
      <div class="rt-area fr clearfix">
        <button
          type="button"
          class="btn btn-del fr"
          @click="delHandle"
        >删除</button>
        <button
          type="button"
          class="btn btn-up fr"
          @click="upHandle"
        >上升</button>
        <button
          type="button"
          class="btn btn-bottom fr"
          @click="downHandle"
        >下降</button>
      </div>
      <div class="lt-area">
        <div class="priority-wrap">
          <span class="txt-priority">{{id}}</span>
        </div>
        <input
          type="text"
          class="inp-title"
          placeholder="任务名称"
          :value="title"
          @input="titleHandle"
        >
      </div>
    </div>
    <div class="row row--progress">
      <input
        type="range"
        :id="id"
        class="inp-progress"
        :value="progress"
        @change="progressHandle"
      >
      <label
        :for="id"
        class="label"
      >{{progress}}%</label>
    </div>
    <div class="detail-wrap"></div>
  </section>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    progress: Number
  },
  methods: {
    delHandle () {
      this.$emit('delHandle')
    },
    progressHandle (e) {
      const target = e.target
      this.$emit('progressHandle', parseInt(target.value), this.id)
    },
    titleHandle (e) {
      const target = e.target
      this.$emit('titleHandle', target.value, this.id)
    },
    upHandle (e) {
      const target = e.target
      this.$emit('upHandle', this.id)
    },
    downHandle (e) {
      const target = e.target
      this.$emit('downHandle', this.id)
    }
  }
}
</script>

<style>
.section {
  border: 1px solid transparent;
  border-radius: 0 0 10px 0;
  margin-bottom: 20px;
  background-color: #ccc;
}
.section .row {
  padding: 10px;
}
.section .lt-area {
  position: relative;
  width: 50%;
}
.section .priority-wrap {
  position: absolute;
  top: -20px;
  left: -16px;
  width: 38px;
  height: 38px;
  text-align: center;
  border: 3px dotted rebeccapurple;
  border-radius: 50%;
}
.section .txt-priority {
  font-size: 24px;
  line-height: 38px;
}
.section .inp-title {
  font-size: 18px;
  color: #8c4545;
  margin-left: 40px;
}
.row--title {
  padding-bottom: 5px;
}
.row--title .btn {
  font: 800 14px/25px cursive;
  color: olivedrab;
  margin: 0 3px;
}
.row--title .btn:active,
.add-wrap .btn-add:active {
  color: #39d6d6;
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
</style>


