<template>
  <div class="app-container">
    <!-- 咨询类型卡片 -->
    <div class="card-container">
      <el-card class="card" @click="navigateTo('PsychologyConsultation')" :bordered="false">
        <div slot="header">
          <span>心理咨询</span>
        </div>
        <div>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </div>
      </el-card>
      <el-card class="card" @click="navigateTo('CourseConsultation')" :bordered="false">
        <div slot="header">
          <span>课程咨询</span>
        </div>
        <div>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </div>
      </el-card>
    </div>

    <!-- 跑马灯组件 -->
    <el-carousel :interval="4000" arrow="always" height="240px" class="carousel-container" :items-per-page="3">
      <el-carousel-item v-for="(teacher, index) in teachers" :key="index">
        <el-card class="teacher-card" hoverable>
          <img slot="cover" :src="teacher.image" class="teacher-image" />
          <div>
            <h3>{{ teacher.name }}</h3>
            <p>{{ teacher.description }}</p>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();

    const navigateTo = (routeName: string) => {
      router.push({ name: routeName });
    };

    const teachers = [
      { name: 'Teacher 1', description: 'Description 1', image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
      { name: 'Teacher 2', description: 'Description 2', image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
      { name: 'Teacher 3', description: 'Description 3', image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
      { name: 'Teacher 4', description: 'Description 4', image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
      { name: 'Teacher 5', description: 'Description 5', image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
      { name: 'Teacher 6', description: 'Description 6', image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    ];

    return {
      navigateTo,
      teachers
    };
  }
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  width: 100%;
}

.card {
  width: 300px;
  cursor: pointer;
  border-radius: 10px;
}

.carousel-container {
  width: 80%;
  margin-top: 20px;
}

.teacher-card {
  width: 240px;
  text-align: center;
  border-radius: 10px;
}

.teacher-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>






<!--<template>-->
<!--  <div style="padding: 30px">-->
<!--    <a-row :gutter="16">-->
<!--      <AdvisoryCard span="12" title="学业咨询" description="学业咨询介绍" />-->
<!--      <AdvisoryCard span="12" title="心理咨询" description="心理咨询介绍" />-->
<!--    </a-row>-->
<!--    <p style="margin-top: 20px; text-align: center; font-size: 20px">咨询服务预约老师展示</p>-->
<!--&lt;!&ndash;    <a-row :gutter="16">&ndash;&gt;-->
<!--&lt;!&ndash;      <ImageCard span="6" title="Europe Street beat" description="www.instagram.com" imageSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />&ndash;&gt;-->
<!--&lt;!&ndash;      <ImageCard span="6" title="Europe Street beat" description="www.instagram.com" imageSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />&ndash;&gt;-->
<!--&lt;!&ndash;    </a-row>&ndash;&gt;-->

<!--    <a-carousel arrows :dots="false" :autoplay="false"  :slides-to-show="3" :slides-to-scroll="1">-->
<!--      <ImageCard span="16" title="Europe Street beat" description="www.instagram.com" imageSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />-->
<!--      <ImageCard span="16" title="Europe Street beat" description="www.instagram.com" imageSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />-->
<!--      <ImageCard span="16" title="Europe Street beat" description="www.instagram.com" imageSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />-->
<!--      <ImageCard span="16" title="Europe Street beat" description="www.instagram.com" imageSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />-->
<!--    </a-carousel>-->


<!--  </div>-->
<!--</template>-->


<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <a-carousel autoplay>&ndash;&gt;-->
<!--&lt;!&ndash;    <div><h3>1</h3></div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div><h3>2</h3></div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div><h3>3</h3></div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div><h3>4</h3></div>&ndash;&gt;-->
<!--&lt;!&ndash;  </a-carousel>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--<style scoped>-->
<!--/* For demo */-->
<!--:deep(.slick-slide) {-->
<!--  text-align: center;-->
<!--  height: 480px;-->
<!--  line-height: 160px;-->
<!--  background: #ffffff;-->
<!--  overflow: hidden;-->
<!--}-->
<!--:deep(.slick-slide h3) {-->
<!--  color: #fff;-->
<!--}-->
<!--</style>-->





<!--<script>-->
<!--import AdvisoryCard from '../../components/TutoringCounseling/AdvisoryCard.vue'-->
<!--import ImageCard from '../../components/TutoringCounseling/ImageCard.vue'-->

<!--export default {-->
<!--  components: {-->
<!--    AdvisoryCard,-->
<!--    ImageCard-->
<!--  }-->
<!--}-->
<!--</script>-->