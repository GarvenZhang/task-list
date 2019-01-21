<template>
  <select
    @change="updateData"
    v-model="cStatus"
  >
    <option
      v-for="(item, index) in tagList"
      :key="index"
      :value="index"
    >{{item}}</option>
  </select>
</template>

<script>
import bus from '../components/Bus'

export default {
  props: {
    status: Number
  },
  data () {
    return {
      cStatus: this.status,
      tagList: []
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },
  methods: {
    updateData (e) {
      this.$emit('updateData', e, 'status')
    }
  }
};
</script>

<style>
</style>
