<template>
  <div class="app-wrap">
    <Item
      v-for='item in list'
      :id='item.id'
      :title='item.title'
      :progress='item.progress'
      @delHandle='delHandle(item.id)'
      @progressHandle='progressHandle'
      @titleHandle='titleHandle'
      @upHandle='upHandle'
      @downHandle='downHandle'
    />
    <div class="add-wrap">
      <button
        type="button"
        class="btn-add"
        @click="addHandle"
      >添加</button>
    </div>
  </div>
</template>

<script>
import Item from "../components/Item";

export default {
  components: {
    Item
  },
  data() {
    return {
      list: []
    };
  },
  updated () {
    if (this.list.length === 0) {
      return
    }
    localStorage.setItem('list', JSON.stringify({
      data: this.list
    }))
  },
  mounted () {
    const list = localStorage.getItem('list') 
    this.list = (list && JSON.parse(list).data) || []
  },
  methods: {
    addHandle () {
      this.list.push({
        id: this.list.length,
        title: '',
        progress: 0
      })
    },
    delHandle (id) {
      for (let l = this.list.length; l--; ) {
        const item = this.list[l]
        if (item.id === id) {
          this.list.splice(l, 1)
          break
        }
      }
    },
    progressHandle (value, id) {
      for (let l = this.list.length; l--; ) {
        const item = this.list[l]
        if (item.id === id) {
          item.progress = value
          break
        }
      }
    },
    titleHandle (value, id) {
      for (let l = this.list.length; l--; ) {
        const item = this.list[l]
        if (item.id === id) {
          item.title = value
          break
        }
      }
    },
    upHandle (id) {
      if (id === 0) {
        return
      }
      const temp = this.list[id - 1]
      this.list[id - 1].id = id
      this.list[id].id = id - 1
      this.$set(this.list, id - 1, this.list[id])
      this.$set(this.list, id, temp)
      
    },
    downHandle (id) {
      console.log(id)
      if (id === this.list.length - 1) {
        return
      }
      const temp = this.list[id + 1]
      this.list[id + 1].id = id
      this.list[id].id = id + 1
      this.$set(this.list, id + 1, this.list[id])
      this.$set(this.list, id, temp)
      
    }
  }

};
</script>



<style scoped>
.app-wrap {
  height: 100%;
  padding: 20px;
}
.add-wrap {
  text-align: center;
}
.add-wrap .btn-add {
  color: cadetblue;
  border: 2px solid rgb(173, 11, 11);
  border-radius: 50%;
  padding: 5px;
}
</style>
