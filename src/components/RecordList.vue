<template>
  <ul class="record-list">
    <li class="record-item">
      <span class="txt-progress fr">49%</span>
      <span class="txt-time">01-12 14:30</span>
      <p>
        <textarea
          placeholder="写下任务进度记录~"
          class="textarea"
          rows="1"
        ></textarea>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    id: String
  },
  
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

