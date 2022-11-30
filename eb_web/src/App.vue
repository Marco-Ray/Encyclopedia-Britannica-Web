<template>
  <div>
    <router-view
      v-slot="{ Component, route }"
      :filteredData="filteredData"
      :nodes_r="nodes"
      :links_r="links"
      @updateVariables="updateVariables"
    >
      <transition
        :name='route.meta.transitionName'
      >
        <component
          :is="Component"
          :key="route.path"
        />
      </transition>
    </router-view>
  </div>

</template>

<script lang="js">
import { getJsonDataApi } from '@/api/data';
import { compareDate } from '@/utils/jsonOperator';

export default {
  data() {
    return {
      jsonData: [],
      filteredData: [],
      dateStr: '',
      filterType: 'PERSON',
      name: '',
      nodes: [],
      links: [],
    };
  },
  created() {
    this.getJsonData();
  },
  methods: {
    async getJsonData() {
      const res = await getJsonDataApi();
      this.jsonData = res;
      // transfer str to datetime object
      // eslint-disable-next-line
      for (let i in this.jsonData) {
        this.jsonData[i].date = new Date(this.jsonData[i].date);
      }
    },
    filterByDate() {
      // reset
      this.filteredData = [];
      this.links = [];
      this.nodes = [];
      // filter
      const date1 = new Date(this.dateStr);
      this.jsonData.forEach((record) => {
        const d = record.date;
        if (compareDate(date1, d)) {
          this.filteredData.push(record);
        }
      });
      this.filteredData.sort((a, b) => { return a.date > b.date ? 1 : -1; }); // eslint-disable-line
      const nodes = [];
      nodes.push({ id: 'center', value: this.dateStr });
      this.filteredData.forEach((record, index) => {
        if (record[this.filterType] !== 'nan') {
          nodes.push({ id: index, value: record[this.filterType] });
        }
      });
      this.nodes = this.uniqueFunc(nodes, 'value');
      this.nodes.forEach((node) => {
        if (node.id !== 'center') {
          this.links.push({ source: node.id, target: 'center' });
        }
      });
      console.log(this.filteredData);
    },
    uniqueFunc(arr, uniId) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
    },
    updateVariables(msg) {
      this.dateStr = msg[0]; // eslint-disable-line
      this.name = msg[1];  // eslint-disable-line
      this.filterByDate();
    },
  },
};
</script>

<style lang="scss">
body, html {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow-y: hidden;
  background-color: #F2F2F2;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
}

// slide-up
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.75s ease-out;
}

.slide-up-enter-to {
  position: absolute;
  bottom: 0;
}

.slide-up-enter-from {
  position: absolute;
  bottom: -100%;
}

.slide-up-leave-to {
  position: absolute;
  top: -100%;
}

.slide-up-leave-from {
  position: absolute;
  top: 0;
}

// slide-down
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.75s ease-out;
}

.slide-down-enter-to {
  position: absolute;
  top: 0;
}

.slide-down-enter-from {
  position: absolute;
  top: -100%;
}

.slide-down-leave-to {
  position: absolute;
  bottom: -100%;
}

.slide-down-leave-from {
  position: absolute;
  bottom: 0;
}
</style>
