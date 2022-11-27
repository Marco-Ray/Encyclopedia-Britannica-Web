<template>
  <div id="welcome_page">
    <div id="home">
      <router-link
        :to="{ path: '/ForceGraph' }">
        ForceGraph
      </router-link>
      <router-link
        :to="{ path: '/TimeLine' }">
        TimeLine
      </router-link>
      <el-date-picker
        v-model="dateStr"
        type="date"
        value-format="YYYY-MM-DD"
        placeholder="Select date"
        @change="goPage"
      >
      </el-date-picker>
      <el-select v-model="filterType" @change="goPage">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import {
  ElDatePicker, ElSelect, ElOption,
} from 'element-plus';

export default {
  name: 'MySelector',
  components: {
    ElDatePicker, ElSelect, ElOption,
  },
  emits: ['updateVariables'],
  data() {
    return {
      dateStr: '',
      filterType: '',
      options: [{
        value: 'PERSON',
        label: 'Person',
      }, {
        value: 'EVENT',
        label: 'Event',
      }, {
        value: 'WORK_OF_ART',
        label: 'Work of Art',
      }],
    };
  },
  methods: {
    goPage() {
      if (this.dateStr.length > 0 && this.filterType.length > 0) {
        this.$emit('updateVariables', [this.dateStr, this.filterType]);
        // this.$router.push('/ForceGraph');
      }
    },
  },
};
</script>

<style scoped>
#welcome_page {
  scroll-behavior: smooth;
  height: 100%;
}

#home {
  height: 100vh;
  width: 100%;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
