<template>
  <select
    @change="updateData"
    v-model="cStatus"
  >
    <option
      v-for="(item, index) in tag"
      :key="index"
      :value="index"
    >{{item}}</option>
  </select>
</template>

<script>
export default {
  props: {
    status: Number,
    tag: Array
  },
  data () {
    return {
      cStatus: this.status
    }
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
