<template>
  <div class="welcome">
    <div>
      <div id="sub_title">To find the events that happened on your birth-day and celebrities
      that have the same birthday in history</div>
    </div>
    <div id="images_container">
      <img id="title" :src="title" alt="title"/>
      <img id="star" :src="star" alt="star"
           class="animate__animated animate__infinite animate__headShake"/>
      <img id="tellurion" :src="tellurion" alt="tellurion"
           class="animate__animated animate__infinite animate__headShake"/>
    </div>
    <!-- eslint-disable-next-line -->
    <div id="click" @click="goSelector">Click</div>
  </div>
</template>

<script>

export default {
  name: 'WelcomePage',
  data() {
    return {
      star: require('@/assets/star@1x.png'), // eslint-disable-line
      tellurion: require('@/assets/tellurion@1x.png'), // eslint-disable-line
      title: require('@/assets/title@1x.png'), // eslint-disable-line
    };
  },
  methods: {
    goSelector() {
      this.$router.push('/Selector');
    },
  },
};
</script>

<style scoped>
.welcome {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/bg-welcome@1x.png');
  background-size: cover;
}

#star {
  position: absolute;
  top: 152px;
  right: 237px;
  --animate-duration: 1s;
}

#tellurion {
  position: absolute;
  bottom: 97px;
  left: 261px;
  --animate-duration: 2s;
}

#title {
  position: absolute;
  left: 468px;
  top: 294px;
  width: 600px;
  height: 169px;
  text-align: center;
}

#sub_title {
  position: absolute;
  left: 563px;
  top: 507px;
  width: 410px;
  height: 72px;
  color: rgba(51, 51, 51, 1);
  font-size: 19px;
  text-align: center;
  font-family: Baijam;
}

#click {
  cursor: pointer;
  position: absolute;
  left: 731px;
  top: 639px;
  width: 74px;
  height: 29px;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  text-align: left;
  font-family: Arial-700;
}
</style>
