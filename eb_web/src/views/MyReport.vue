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
      <div>Hi, <span class="emphasize">{{ name }}</span>!</div>
      <div>Your birthday is <span class="emphasize">{{ dateStr }}</span>.</div>
      <div>There are
        <span class="emphasize">21497</span>
        entries in the
      </div>
      <div>
        Encyclopaedia Britannica.
      </div>
      <div>
        Of these,
        <span class="emphasize">{{ nodes_r.length - 1 }}</span> famous people
        are related to
      </div>
      <div>
        your birthday.
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
      arrowUp: require('@/assets/button-b-up@1x.png'), // eslint-disable-line
      arrowDown: require('@/assets/button-b-down@1x.png'), // eslint-disable-line
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
  background: url('@/assets/bg-report@1x.png');
}

.arrow-back {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
}

.arrow-down {
  position: absolute;
  bottom: 30px;
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
  font-family: Baijam;
  font-size: 30px;
  color: white;
  line-height: 40px;
  .emphasize {
    font-weight: bold;
    color: yellow;
  }
}
</style>
