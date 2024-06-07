<template>
  <div id="app" class="app-container">
    <div class="left-panel">
      <a-input-search
          v-model:value="searchQuery"
          placeholder="按名字搜索教师"
          @search="onSearch"
          style="margin-bottom: 20px"
      />

      <!-- 新增筛选框 -->
      <a-select
          v-model:value="selectedType"
          placeholder="筛选类型"
          style="width: 100%; margin-bottom: 20px;"
          @change="onTypeChange"
      >
        <a-select-option value="all">全部</a-select-option>
        <a-select-option value="学业咨询">学业咨询</a-select-option>
        <a-select-option value="心理咨询">心理咨询</a-select-option>
      </a-select>

      <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">

        <a-calendar
            v-model:value="NowSelectedDate"
            :fullscreen="false"
            :disabled-date="mainDisabledDate"
            @panelChange="onPanelChange"
            @select="onDateSelect"
        />
      </div>
    </div>
    <div class="right-panel">
      <a-row :gutter="16">
        <a-col
            v-for="consultation in filteredConsultations"
            :key="consultation.consultationId"
            :span="8"
        >
          <a-card :title="consultation.consultant" style="width: 300px">
            <p>{{ consultation.type }}</p>
            <p>{{ consultation.date }}</p>
            <a-button type="primary" @click="selectConsultation(consultation)">预约</a-button>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <a-modal
        v-model:visible="isModalVisible"
        title="选择日期和时间段"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <div v-if="modalStep === 1">
        <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
          <a-calendar
              v-model:value="modalSelectedDate"
              :fullscreen="false"
              :disabled-date="disabledDate"
              @select="onModalDateSelect"
          />
        </div>
      </div>
      <div v-if="modalStep === 2">
        <p>请选择时间段:</p>
        <a-select v-model:value="selectedTimeSlot" placeholder="选择时间段" style="width: 100%">
          <a-select-option
              v-for="(timeSlot, index) in timeSlots"
              :key="timeSlot"
              :value="index"
              :disabled="!availableTimeSlots[index]"
          >
            <span :style="{ color: availableTimeSlots[index] ? 'black' : 'gray' }">{{ timeSlot }}</span>
          </a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>


<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { Dayjs } from 'dayjs';
import { useConsultationStore } from '@/store/modules/TutoringCounseling/consultation';
import { toggleAvailableTimeApi } from '@/api/modules/TutoringCounseling/toggleAvailableTime';
import { addOneReservationApi } from '@/api/modules/TutoringCounseling/addOneReservation';
import { consultationType } from "@/api/types/TutoringCounseling/consualtation.ts";
import { useUserStore } from "@/store/modules/user.ts";

const searchQuery = ref('');
const NowSelectedDate = ref<Dayjs | null>(null);
const selectedDate = ref<Dayjs | null>(null);
const selectedType = ref('all'); // 新增筛选框的状态
const consultationStore = useConsultationStore();
const user = useUserStore();

const consultationsArray = computed(() => {
  const consultations = consultationStore.consultationData;
  return Object.values(consultations);
});

onMounted(async () => {
  await consultationStore.fetchConsultations();
});

const filteredConsultations = computed(() => {
  let result = consultationsArray.value.filter(consultation => consultation.consultationId !== undefined);
  if (searchQuery.value) {
    result = result.filter(consultation =>
        consultation.consultant.includes(searchQuery.value)
    );
  }
  if (selectedDate.value) {
    const formattedDate = selectedDate.value.format('YYYY/MM/DD');
    result = result.filter(consultation => consultation.date === formattedDate);
  }
  if (selectedType.value !== 'all') {
    result = result.filter(consultation => consultation.type === selectedType.value);
  }
  return result;
});

const isModalVisible = ref(false);
const modalStep = ref(1);
const modalSelectedDate = ref<Dayjs | null>(null);
const selectedConsultation = ref<consultationType | null>(null);
const selectedTimeSlot = ref<number | null>(null);
const availableTimeSlots = ref<boolean[]>([]);
const timeSlots = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '19:00-20:00',
  '20:00-21:00',
  '21:00-22:00',
];


const allAvailableDates = computed(() =>
    selectedType.value === 'all'
        ? consultationsArray.value.map(consultation => consultation.date)
        : consultationsArray.value
            .filter(consultation => consultation.type === selectedType.value)
            .map(consultation => consultation.date)
);

const onSearch = () => {
};

const onTypeChange = () => {
};

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};

const onDateSelect = (date: Dayjs) => {
  const formattedSelectedDate = selectedDate.value ? selectedDate.value.format('YYYY/MM/DD') : null;
  const formattedDate = date.format('YYYY/MM/DD');

  if (formattedSelectedDate === formattedDate) {
    console.log('clear date');
    NowSelectedDate.value = null;
    selectedDate.value = null;
  } else {
    selectedDate.value = date;
    NowSelectedDate.value = date;
    console.log('selected date');
  }
};


const selectConsultation = (consultation: consultationType) => {
  selectedConsultation.value = consultation;
  modalStep.value = 1;
  modalSelectedDate.value = null;
  isModalVisible.value = true;
};

const onModalDateSelect = (date: Dayjs) => {
  modalSelectedDate.value = date;
  const formattedDate = date.format('YYYY/MM/DD');
  if (selectedConsultation.value && selectedConsultation.value.date === formattedDate) {
    availableTimeSlots.value = selectedConsultation.value.availableTime.map(slot => slot === 0);
    modalStep.value = 2;
  }
};

const mainDisabledDate = (current: Dayjs) => {
  const formattedDate = current.format('YYYY/MM/DD');
  return !allAvailableDates.value.includes(formattedDate);
};

const disabledDate = (current: Dayjs) => {
  const formattedDate = current.format('YYYY/MM/DD');
  return !(selectedConsultation.value && selectedConsultation.value.date === formattedDate);
};

const handleOk = async () => {
  if (modalStep.value === 1) {
    // 等待日期选择
  } else if (modalStep.value === 2 && selectedTimeSlot.value !== null && selectedConsultation.value) {
    try {
      // 调用第二个 API 添加预约信息
      await addOneReservationApi(user.userData.userId, selectedConsultation.value.consultationId, selectedTimeSlot.value);
      console.log('addOneReservationApi')
      alert(`预约了 ${selectedConsultation.value.consultant} 老师，日期：${modalSelectedDate.value!.format('YYYY/MM/DD')} 时间段：${timeSlots[selectedTimeSlot.value]}`);
      location.reload();
      isModalVisible.value = false;
      selectedTimeSlot.value = null;
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("预约失败，请重试。");
    }
  } else {
    alert('请选择时间段');
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
  selectedTimeSlot.value = null;
};
</script>


<style scoped>
.app-container {
  display: flex;
  padding: 20px;
}
.left-panel {
  flex: 1;
  margin-right: 20px;
}
.right-panel {
  flex: 3;
}
</style>
