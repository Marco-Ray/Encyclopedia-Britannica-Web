<template>
  <div class="timeLine__Container">
    <div class="elements_container">
      <img class="mask" :src="mask" alt="mask" />
      <div class="arrow-container">
        <!-- eslint-disable-next-line -->
        <img :src="arrowUp" alt="goBack" class="arrow-back" @click="goBack"/>
      </div>
      <!-- eslint-disable-next-line -->
      <div class="selected_date" @click="goHome">
        <div>{{ date }} / {{ month }}</div>
      </div>
      <div class="gif_box">
        <img :src="book" alt="book" class="book" :class="!isPopover ? 'play': 'stop'"/>
      </div>
      <div class="hint">
        This day in history...
      </div>
    </div>
    <div class="gridbox">
      <div class="timeLine">
        <div class="block"></div>
        <el-carousel
          direction="vertical"
          indicator-position="none"
          interval="3000"
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
        <div class="popover-definition">{{ selectedEvent.definition }}</div>
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
      arrowUp: require('@/assets/button-b-up@1x.png'), // eslint-disable-line
      mask: require('@/assets/mask-timeline@1x.png'), // eslint-disable-line
      book: require('@/assets/book.gif'), // eslint-disable-line
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
    goPage() {
      this.$router.push({ path: '/ForceGraph', query: { dateStr: this.dateStr } });
    },
    goHome() {
      this.$router.push('/');
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
      const monthIndex = parseInt(this.dateStr.split('-')[1], 10);
      return this.monthList[monthIndex - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  pointer-events:none;
}

.timeLine__Container {
  width: 100vw;
  height: 100vh;
}

.arrow-back {
  position: absolute;
  top: 37px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 100;
}

.gif_box {
  position: absolute;
  top: 239px;
  left: 0;
  .book {
    width: 387px;
  }
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
  background-color: rgba(226, 227, 222, 100);
}

.year {
  color: rgba(226, 227, 222, 100);
  text-align: start;
  font-size: 60px;
  font-family: Baijam;
  font-style: italic;
  .yearItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 300px;
    .yearStr {
      margin-left: 38px;
    }
  }
}

.index {
  width: 30px;
  height: 30px;
  background-color: rgba(226, 227, 222, 100);
  border-radius: 50%;
  z-index: 100;
}

.selected_date {
  position: absolute;
  top: 142px;
  left: 64px;
  width: 220px;
  height: 118px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 50px;
  text-align: center;
  font-family: GillSans;
  font-weight: bold;
  background: url('@/assets/bg-selected-date.png');
  background-size: cover;
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
  font-family: Baijam;
  font-style: italic;
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
      overflow: hidden;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .definition {
      margin: 0 20px 10px 20px;
      height: 124px;
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      font-weight: light;
      text-align: left;
      overflow: hidden;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      text-overflow:ellipsis;
      -webkit-line-clamp: 7; //例如超过2行显示省略号
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
  font-family: Baijam;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 51px 53px 52px 53px;
    font-size: 20px;
    height: 390px;
    .popover-lemma {
      height: 68px;
      font-size: 48px;
      font-weight: bold;
    }
    .popover-year {
      height: 33px;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 17px;
    }
    .popover-definition {
      font-size: 24px;
      font-style: italic;
    }
  }
}

.hint {
  position: absolute;
  left: 16px;
  bottom: 61px;
  z-index: 5;
  width: 257px;
  height: 33px;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: left;
  font-family: Baijam;
  font-weight: bold;
}
</style>
