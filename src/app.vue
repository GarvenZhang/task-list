<template>
	<div>
		<router-view></router-view>
    <Navigator/>
	</div>
</template>

<script>
import Navigator from './components/Navigator'

export default {
  components: {
    Navigator
  }
};
</script>

