<template>
  <div class="timeLine__Container">
    <button @click="goBack" class="goBack">Back</button>
    <div class="gridbox">
      <div class="timeLine">
        <div class="block"></div>
        <el-carousel
          direction="vertical"
          indicator-position="none"
          interval="5000"
          @change="setActiveYear"
        >
          <el-carousel-item
            v-for="year in yearListSorted"
            :key="year"
            class="year"

          >
            <div class="index"></div>
            <div>{{ year }}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="eventsBox">
        <div
          v-show="year === activeYear"
          v-for="year in yearListSorted"
          :key="year"
          class="eventsBox__Container"
        >
          <el-card v-for="(event, i) in reFilteredData[year]" :key="i">
            {{ event.PERSON }}
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElCarousel, ElCarouselItem, ElCard,
} from 'element-plus';

export default {
  name: 'TimeLine',
  components: {
    ElCarousel, ElCarouselItem, ElCard,
  },
  props: {
    filteredData: Array,
  },
  data() {
    return {
      yearListSorted: [],
      reFilteredData: {},
      activeYear: 0,
    };
  },
  created() {
    this.reFilterByYear();
  },
  methods: {
    reFilterByYear() {
      // get Year List
      this.filteredData.forEach((record) => {
        // console.log(record.date.getFullYear());
        if (!this.yearListSorted.includes(record.date.getFullYear())) {
          this.yearListSorted.push(record.date.getFullYear());
        }
      });
      // group the filteredData by Year as reFilteredData
      this.yearListSorted.forEach((year) => {
        const eventList = [];
        this.filteredData.forEach((record) => {
          if (year === record.date.getFullYear()) {
            eventList.push(record);
          }
        });
        this.reFilteredData[year] = eventList;
      });
      this.activeYear = this.yearListSorted[0]; // eslint-disable-line
    },
    setActiveYear(index) {
      this.activeYear = this.yearListSorted[index];
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.timeLine__Container {
  width: 100vw;
  height: 100vh;
}

.gridbox {
  height: 100%;
  margin: 0 150px;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
}

.timeLine {
  position: relative;
}

.timeLine ::v-deep(.el-carousel) {
  height: 100vh;
  .el-carousel__container {
    height: 100vh;
  }
}

.block {
  position: absolute;
  left: 14px;
  width: 3px;
  min-height: 100%;
  background-color: red;
}

.year {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: red;
  text-align: start;
  font-size: 100px;
}

.index {
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  z-index: 100;
}

.eventsBox {
  .eventsBox__Container {
    display: flex;
  }
}

.goBack {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
