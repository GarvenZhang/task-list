<template>
  <div class="navigator-wrap">
    <div class="tap-area" @click="clickHandle"></div>
    <ul class="link-list" :class="status ? '' : 'hide'">
      <li class="link-item">
        <router-link to='/'>任务</router-link>
      </li>
      <li class="link-item">
        <router-link to='/draft'>草稿</router-link>
      </li>
      <li class="link-item">
        <router-link to='/tag'>标签</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: false
    }
  },
  methods: {
    clickHandle () {
      this.status = !this.status
      console.log(this.status)
    }
  }
}
</script>

<style scoped>
.navigator-wrap {
  position: fixed;
  bottom: -50px;
  right: -50px;
}
.tap-area {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: aqua;
}
.link-list {
  position: absolute;
  top: 20%;
  left: -133px;
  display: flex;
  background-color: aqua;
}
.link-item {
  margin: 0 10px;
}
</style>
