<template>
  <div class="report__container">
    <div class="element__container">
      <div class="arrow-container">
        <!-- eslint-disable-next-line -->
        <img :src="arrowUp" alt="goBack" class="arrow-back" @click="goBack"/>
        <!-- eslint-disable-next-line -->
        <img :src="arrowDown" alt="goPage" class="arrow-down" @click="goPage"/>
      </div>
    </div>
    <div class="report">
      <div>My name is {{ name }}.</div>
      <div>My birthday is {{ dateStr }}.</div>
      <div>There are 21497 entries in the Encyclopaedia Britannica.</div>
      <div>
        Of these,
        {{ nodes_r.length - 1 }} famous people
        are related to my birthday.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyReport',
  props: {
    filteredData: Array,
    nodes_r: Array,
  },
  data() {
    return {
      name: this.$route.query.name,
      dateStr: this.$route.query.dateStr,
      arrowUp: require('@/assets/button-w-up@1x.png'), // eslint-disable-line
      arrowDown: require('@/assets/button-w-down@1x.png'), // eslint-disable-line
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goPage() {
      this.$router.push({ path: '/ForceGraph', query: { dateStr: this.dateStr } });
    },
  },
};
</script>

<style lang="scss" scoped>
.report__container {
  width: 100vw;
  height: 100vh;
  background: black;
}

.arrow-back {
  position: absolute;
  top: 37px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
}

.arrow-down {
  position: absolute;
  bottom: 37px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
}

.report {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
