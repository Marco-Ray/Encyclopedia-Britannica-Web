<template>
  <div class="timeLine__Container">
    <!-- eslint-disable-next-line -->
    <div @click="goBack" class="selected_date">
      {{ date }} / {{ month }}
    </div>
    <div class="gridbox">
      <div class="timeLine">
        <div class="block"></div>
        <el-carousel
          direction="vertical"
          indicator-position="none"
          interval="5000"
          :autoplay="!isPopover"
          @change="setActiveYear"
        >
          <el-carousel-item
            v-for="year in yearListSorted"
            :key="year"
            class="year"

          >
            <div class="yearItem">
              <div class="index"></div>
              <div class="yearStr">{{ year }}</div>
            </div>
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
          <el-scrollbar>
            <!-- eslint-disable-next-line -->
            <div
              v-for="(event, i) in reFilteredData[year]"
              :key="i" class="eventCard"
              @click="setPopover(event)"
            >
              <img class="card-bg" :src="bgBorder" alt="card-bg" />
              <div class="card_content">
                <div class="lemma">
                {{ event.headers }}
              </div>
                <div class="definition">
                  <div class="definition_box">
                    <span class="definition_str">
                      {{ event.definition }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="isPopover"
      custom-class="popover-card"
      :show-close="false"
    >
    <!-- eslint-disable-next-line -->
      <div slot="title">
        <div class="popover-lemma"> {{ selectedEvent.headers }} </div>
        <div class="popover-year"> {{ activeYear }} </div>
      </div>
      <el-scrollbar class="popover-definition__container">
        <div>{{ selectedEvent.definition }}</div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import {
  ElCarousel, ElCarouselItem, ElScrollbar, ElDialog,
} from 'element-plus';

export default {
  name: 'TimeLine',
  components: {
    ElCarousel, ElCarouselItem, ElScrollbar, ElDialog,
  },
  props: {
    filteredData: Array,
  },
  data() {
    return {
      dateStr: this.$route.query.dateStr,
      yearListSorted: [],
      reFilteredData: {},
      activeYear: 0,
      bgBorder: require('@/assets/bg-border@1x.png'), // eslint-disable-line
      monthList: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
      isPopover: false,
      selectedEvent: {},
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
        let eventList = [];
        this.filteredData.forEach((record) => {
          if (year === record.date.getFullYear()) {
            eventList.push(record);
          }
        });
        eventList = this.uniqueFunc(eventList, 'headers');
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
    uniqueFunc(arr, uniId) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
    },
    setPopover(event) {
      this.isPopover = true;
      this.selectedEvent = event;
    },
  },
  computed: {
    date() {
      return this.dateStr.split('-')[2];
    },
    month() {
      return this.monthList[this.dateStr.split('-')[1]];
    },
  },
};
</script>

<style lang="scss" scoped>
.timeLine__Container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/bg-timeline@1x.png');
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
  margin-left: 280px;
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
  background-color: white;
}

.year {
  color: white;
  text-align: start;
  font-size: 60px;
  .yearItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 276px;
    .yearStr {
      margin-left: 38px;
    }
  }
}

.index {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  z-index: 100;
}

.selected_date {
  cursor: pointer;
  position: absolute;
  left: 55px;
  top: 75px;
  height: 71px;
  color: rgba(255, 255, 255, 1);
  font-size: 60px;
  text-align: center;
  font-family: Raleway-regular;
}

.eventsBox {
  .eventsBox__Container {
    height: 400px;
    width: 700px;
    ::v-deep .el-scrollbar__view {
      display: flex;
      flex-direction: row;
      gap: 86px;
      height: 100%;
      justify-content: start;
      align-items: center;
    }
    ::v-deep .el-scrollbar__bar {
      bottom: -10px;
    }
  }
}

.eventCard {
  cursor: pointer;
  display: inline-block;
  position: relative;
  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 176px;
    height: 237px;
  }
  .card_content {
    width: 176px;
    height: 237px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .lemma {
      margin: 36px 0 10px 0;
      width: 176px;
      height: 37px;
      color: rgba(255, 255, 255, 1);
      font-size: 30px;
      text-align: left;
      font-family: Raleway-regular;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .definition {
      margin: 0 20px 10px 20px;
      height: 133px;
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      text-align: left;
      overflow: hidden;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      text-overflow:ellipsis;
      -webkit-line-clamp:8;//例如超过2行显示省略号
      ::v-deep .el-scrollbar__bar {
        right: -10px;
      }
      .definition_str {
        padding-top: 18px;

      }
    }
  }
}
</style>
<style lang="scss">
.popover-card {
  margin-left: 627px !important;
  margin-right: 111px !important;
  width: 798px;
  height: 605px;
  border-radius: 25px 25px 25px 25px !important;
  background-color: rgba(250, 251, 245, 1);
  color: rgba(16, 16, 16, 1);
  text-align: left;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 51px 53px 52px 53px;
    font-size: 20px;
    height: 390px;
    .popover-lemma {
      height: 68px;
      font-size: 58px;
    }
    .popover-year {
      height: 33px;
      font-size: 28px;
      margin-bottom: 17px;
    }

  }
}
</style>
