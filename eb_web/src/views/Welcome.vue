<template>
  <div class="welcome">
    <div>
      <div id="sub_title">
        <div>Find your connection to the encyclopedia!</div>
        <div>What happened on your birthday in history?</div>
        <div>We will use your birthday as a medium to match
        you with encyclopedia entries about your birthday.</div>
      </div>
    </div>
    <div id="images_container">
      <img id="title" :src="title" alt="title"/>
      <img id="star" :src="star" alt="star"
           class="animate__animated animate__infinite animate__headShake"/>
      <img id="tellurion" :src="tellurion" alt="tellurion"
           class="animate__animated animate__infinite animate__headShake"/>
    </div>
    <!-- eslint-disable-next-line -->
    <div id="click" @click="goSelector">START</div>
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
  bottom: 91px;
  left: 202px;
  --animate-duration: 2s;
}

#title {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%) translateY(-50%);
  width: 600px;
  height: 169px;
  text-align: center;
}

#sub_title {
  position: absolute;
  top: 507px;
  left: 50%;
  transform: translateX(-50%);
  width: 467px;
  height: 86px;
  color: rgba(51, 51, 51, 1);
  font-size: 19px;
  text-align: center;
  font-family: Baijam;
}

#click {
  cursor: pointer;
  position: absolute;
  top: 639px;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(255, 255, 255, 0);
  text-align: center;
  border: 3px solid rgba(108, 108, 108, 1);
  font-family: Baijam;
  font-size: 20px;
  font-weight: bold;
  color: rgba(16, 16, 16, 1);
}
</style>
