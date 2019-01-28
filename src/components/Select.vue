<template>
  <select
    @change="updateData"
    v-model="cStatus"
  >
    <option
      v-for="(item, index) in list"
      :key="index"
      :value="index"
    >{{item}}</option>
  </select>
</template>

<script>

export default {
  props: {
    status: Number,
    type: String
  },
  data () {
    return {
      cStatus: this.status,
      list: []
    }
  },
  // beforeCreate () {
  //   console.log('beforeCreate')
  // },
  created () {

    // console.log('created')
    this.getData();
    
  },
  // beforeMount () {
  //   console.log('beforeMount')
  // },
  mounted () {
    console.log('mounted')

  },
  // beforeUpdate () {
  //   console.log('beforeUpdate')
  // },
  updated () {
    console.log('updated')
    this.getData();

  },
  // beforeDestroy () {
  //   console.log('beforeDestroy')
  // },
  // destroyed () {
  //   console.log('destroyed')
  // },
  methods: {
    updateData (e) {
      this.$emit('updateData', e, 'status')
    },
    getData () {
     
    }
  }
};
</script>

<style>
</style>
