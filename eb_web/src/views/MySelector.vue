<template>
  <div id="welcome_page">
    <div>
      <img class="star" :src="star" alt="star"/>
    </div>
    <div id="home">
      <div class="title">FILL IN INFO</div>
      <div class="name_input">
        <el-input v-model="name" placeholder="YOUR NAME"></el-input>
      </div>
      <div class="birthday_selector">
        <el-date-picker
          v-model="dateStr"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="YOUR BIRTHDAY"
        >
        </el-date-picker>
      </div>
      <!-- eslint-disable-next-line -->
      <div class="confirm" @click="goPage">CONFIRM</div>
      <!--el-select v-model="filterType" @change="goPage">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select -->
    </div>
  </div>
</template>

<script>
import {
  ElDatePicker,
  ElInput,
  // ElSelect,
  // ElOption,
} from 'element-plus';

export default {
  name: 'MySelector',
  components: {
    ElDatePicker,
    ElInput,
    // ElSelect,
    // ElOption,
  },
  emits: ['updateVariables'],
  data() {
    return {
      dateStr: '',
      filterType: '',
      name: '',
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
      star: require('@/assets/star@1x.png'), // eslint-disable-line
    };
  },
  methods: {
    // TODO
    goPage() {
      if (this.dateStr.length > 0 && this.name.length > 0) {
        this.$emit('updateVariables', [this.dateStr, this.name]);
        this.$router.push({ path: '/TimeLine', query: { dateStr: this.dateStr } });
      }
    },
  },
};
</script>

<style scoped>
#welcome_page {
  scroll-behavior: smooth;
  height: 100vh;
  width: 100vw;
  background: url('@/assets/bg-info@1x.png');
}

#home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 80px 0 16px 0;
  height: 44px;
  color: rgba(242, 242, 242, 1);
  font-size: 47px;
  text-align: left;
  font-family: Raleway-regular;
}

.star {
  position: absolute;
  left: 924px;
  top: 226px;
}

.name_input, .birthday_selector {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 271px;
  height: 41px;
  background-color: rgba(242, 242, 242, 0);
  text-align: left;
}

::v-deep(.el-date-editor) {
  border-color: transparent;
  --el-date-editor-width: 271px;
}

::v-deep .el-input__wrapper {
  border-radius: 0;
  background-color: transparent;
}

::v-deep .el-input__prefix {
  display: none !important;
}

::v-deep .el-input__inner {
  text-align: center;
}

.confirm {
  cursor: pointer;
  margin-top: 55px;
  width: 180px;
  height: 42px;
  line-height: 42px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
