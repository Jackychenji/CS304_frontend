<script setup lang="ts">
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToTutoringCounseling() {
  router.push('/tutoring/consultation');
}

function goToCourse() {
  router.push('/course/introduction');
}

function goToStudy() {
  router.push('/study/view');
}



const date = ref("");
const time = ref("");

const getDate = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date();

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  return `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
};

const getTime = () => {
  const date = new Date();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  date.value = getDate();
  time.value = getTime();

  setInterval(() => {
    date.value = getDate();
    time.value = getTime();
  }, 1000);
});
</script>

<template>
  <!-- Counter Widgets -->
  <a-row :gutter="24">
    <a-col :span="24" :lg="16">
      <video class="video" autoplay muted loop>
        <source src="/public/background_video.mp4" type="video/mp4" />
      </video>
    </a-col>
    <a-col :span="24" :lg="8">
      <div class="weather-time-card">
        <div class="container">
          <div class="cloud front">
            <span class="left-front"></span>
            <span class="right-front"></span>
          </div>
          <span class="sun sunshine"></span>
          <span class="sun"></span>
          <div class="cloud back">
            <span class="left-back"></span>
            <span class="right-back"></span>
          </div>
        </div>

        <div class="weather-time-card-header">
          <span>SUSTech, Shenzhen<br>China</span>
          <span>{{ date }}</span>
        </div>

        <h2 class="time">{{ time }}</h2>

        <span class="temp">29°</span>

        <div class="temp-scale">
          <span>Celcius</span>
        </div>
      </div>
      <div style="margin-top: 22px">
        <div class="conversation-card">
          <div class="img">
            <img style="width: 50px;" src="/public/face-2.jpg" />
          </div>
          <div class="textBox">
            <div class="textContent">
              <p class="h1">Clans of Clash</p>
              <span class="span">12 min ago</span>
            </div>
            <p class="p">Xhattmahs is not attacking your base!</p>
            <div>
            </div>
          </div>
        </div>
        <div class="conversation-card">
          <div class="img">
            <a-avatar :size="50" shape="square" src="/public/face-3.jpg" />
          </div>
          <div class="textBox">
            <div class="textContent">
              <p class="h1">Clans of Clash</p>
              <span class="span">7 min ago</span>
            </div>
            <p class="p">Xhattmahs is not attacking your base!</p>
            <div>
            </div>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
  <!-- / Counter Widgets -->

  <!-- Cards -->
  <a-row :gutter="24" type="flex" align="stretch" style="margin-top: 28px;">
    <a-col :span="24" :lg="8" class="mb-24">
      <div class="event-card0" @click="goToCourse">
        <img width=100% src="/public/card0.svg" alt="SVG Image">
        <div class="card__content0">
          <p class="card__title0">学业课程辅助</p>
          <p class="card__description0">
            学业课程辅助是为学生提供额外的学习支持，以帮助他们更好地理解课程内容和提高学业成绩。这种辅助形式可以包括课外辅导、学习资源推荐、答疑解惑、学习方法指导等。通过学业课程辅助，学生能够获得个性化的学习帮助，弥补课堂学习中的不足，增强学习效果，提升学术表现。
          </p>
        </div>
      </div>
    </a-col>
    <a-col :span="24" :lg="8" class="mb-24">
      <div class="event-card1" @click="goToStudy">
        <img width=100% src="/public/card1.svg" alt="SVG Image">
        <div class="card__content1">
          <p class="card__title1">学业问题讨论</p>
          <p class="card__description1">
            学业问题讨论是指学生在学业过程中遇到的各种问题进行交流和分析的过程。这些问题可能包括学习方法、时间管理、考试压力、学习动机不足、注意力分散等。通过讨论，学生可以分享经验，获得建议和支持，从而找到解决问题的有效方法，提升学习效果，增强学业信心，实现学业目标。
          </p>
        </div>
      </div>
    </a-col>
    <a-col :span="24" :lg="8" class="mb-24">
      <div class="event-card0" @click="goToTutoringCounseling">
        <img width=100% src="/public/card2.svg" alt="SVG Image">
        <div class="card__content0">
          <p class="card__title0">学业心理咨询</p>
          <p class="card__description0">
            学业心理咨询旨在帮助学生应对学业中的心理困扰，通过情绪管理、压力缓解、学习动机提升等支持，提升学习效率和自信心。咨询师会提供个性化指导，帮助学生克服学习困难，实现学业成功和全面发展。</p>
        </div>
      </div>
    </a-col>
  </a-row>
  <!-- / Cards -->
</template>

<style scoped>
.video {
  position: relative;
  left: 0;
  width: 100%;
  object-fit: cover;
  box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 22px;
  transition: all 0.7s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.video:hover {
  transform: scale(1.05);
}

.weather-time-card {
  width: 350px;
  height: 235px;
  position: relative;
  padding: 25px;
  background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%)
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
    , #FFFFFF;
  box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 22px;
  transition: all 0.7s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.weather-time-card:hover {
  transform: scale(1.05);
}

.container {
  width: 250px;
  height: 250px;
  position: absolute;
  right: -35px;
  top: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.7);
}

.cloud {
  width: 250px;
}

.front {
  padding-top: 45px;
  margin-left: 25px;
  display: inline;
  position: absolute;
  z-index: 11;
  animation: clouds 8s infinite;
  animation-timing-function: ease-in-out;
}

.back {
  margin-top: -30px;
  margin-left: 150px;
  z-index: 12;
  animation: clouds 12s infinite;
  animation-timing-function: ease-in-out;
}

.right-front {
  width: 45px;
  height: 45px;
  border-radius: 50% 50% 50% 0%;
  background-color: #4c9beb;
  display: inline-block;
  margin-left: -25px;
  z-index: 5;
}

.left-front {
  width: 65px;
  height: 65px;
  border-radius: 50% 50% 0% 50%;
  background-color: #4c9beb;
  display: inline-block;
  z-index: 5;
}

.right-back {
  width: 50px;
  height: 50px;
  border-radius: 50% 50% 50% 0%;
  background-color: #4c9beb;
  display: inline-block;
  margin-left: -20px;
  z-index: 5;
}

.left-back {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 0% 50%;
  background-color: #4c9beb;
  display: inline-block;
  z-index: 5;
}

.sun {
  width: 120px;
  height: 120px;
  background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
  background: linear-gradient(to right, #fcbb04, #fffc00);
  border-radius: 60px;
  display: inline;
  position: absolute;
}

.sunshine {
  animation: sunshines 2s infinite;
}

@keyframes sunshines {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes clouds {
  0% {
    transform: translateX(15px);
  }

  50% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(15px);
  }
}

.weather-time-card-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.weather-time-card-header span:first-child {
  word-break: break-all;
  font-weight: 800;
  font-size: 15px;
  line-height: 135%;
  color: rgba(87, 77, 51, 0.66);
}

.weather-time-card-header span:last-child {
  font-weight: 700;
  font-size: 15px;
  line-height: 135%;
  color: rgba(87, 77, 51, 0.33);
}

.time {
  font-weight: 700;
  margin-top: auto;
  font-size: 52px;
  line-height: 77px;
  color: rgba(87, 77, 51, 1);
}

.temp {
  position: absolute;
  left: 25px;
  bottom: 12px;
  font-weight: 700;
  font-size: 64px;
  line-height: 77px;
  color: rgba(87, 77, 51, 1);
}

.temp-scale {
  width: 80px;
  height: 36px;
  position: absolute;
  right: 25px;
  bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 9px;
}

.temp-scale span {
  font-weight: 700;
  font-size: 13px;
  line-height: 134.49%;
  color: rgba(87, 77, 51, 0.66);
}

.conversation-card {
  width: 100%;
  height: 70px;
  background: #353535;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
  margin: 15px 0px;

  .textBox {
    width: calc(100% - 90px);
    margin-left: 10px;
    color: white;
    font-family: 'Poppins' sans-serif;

    .textContent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: -5px;
    }

    .span {
      font-size: 12px;
    }

    .h1 {
      font-size: 17px;
      font-weight: bold;
    }

    .p {
      font-size: 15px;
      font-weight: lighter;
      margin-top: -10px;
    }
  }
}

.conversation-card:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  /* background: linear-gradient(#d7cfcf, #9198e5); */
}

/* .conversation-card:hover>.img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
} */

.event-card0 {
  position: relative;
  width: 100%;
  height: 250px;
  background-color: #f2f2f2;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 0 0 5px #ffffff80;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.event-card0 svg {
  width: 48px;
  fill: #333;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.event-card0:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card__content0 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.event-card0:hover .card__content0 {
  transform: rotateX(0deg);
}

.card__title0 {
  margin: 0;
  font-size: 27px;
  color: #333;
  font-weight: 700;
  letter-spacing: 5.2px;
}

.event-card0:hover svg {
  scale: 0;
}

.card__description0 {
  margin: 10px 0 0;
  font-size: 17px;
  color: #777;
  line-height: 1.4;
  letter-spacing: 5.7px;
}

.event-card1 {
  position: relative;
  width: 100%;
  height: 250px;
  background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  cursor: pointer;
}

.event-card1 svg {
  width: 48px;
  fill: #333;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.event-card1:hover {
  transform: rotate(-5deg) scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card__content1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.event-card1:hover .card__content1 {
  transform: translate(-50%, -50%) rotate(0deg);
  opacity: 1;
}

.card__title1 {
  margin: 0;
  font-size: 27px;
  color: #333;
  font-weight: 700;
  letter-spacing: 5.2px;
}

.card__description1 {
  margin: 10px 0 0;
  font-size: 17px;
  color: #777;
  line-height: 1.4;
  letter-spacing: 2.7px;
}

.event-card1:hover svg {
  scale: 0;
  transform: rotate(-45deg);
}
</style>