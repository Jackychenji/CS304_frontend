<template>
  <div id="app" class="app-container">
    <div class="left-panel">
      <a-input-search
          v-model:value="searchQuery"
          placeholder="按名字搜索教师"
          @search="onSearch"
          style="margin-bottom: 20px"
      />
      <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
        <a-calendar
            v-model:value="selectedDate"
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
import {consultationType} from "@/api/types/TutoringCounseling/consualtation.ts";
import {useUserStore} from "@/store/modules/user.ts";

const searchQuery = ref('');
const selectedDate = ref<Dayjs | null>(null);
const consultationStore = useConsultationStore();
const user = useUserStore();
// const consultationsArray = ref<consultationType[]>([]);

const consultationsArray = computed(() => {
  const consultations = consultationStore.consultationData;
  console.log(Object.values(consultations))
  return Object.values(consultations);
});


onMounted(async () => {
  await consultationStore.fetchConsultations();
  // consultationsArray.value = Object.values(consultationStore.consultationData);
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
    consultationsArray.value.map(consultation => consultation.date)
);

const onSearch = () => {
  // 该函数不再需要，因为我们使用的是计算属性 filteredConsultations
};

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};

const onDateSelect = (date: Dayjs) => {
  selectedDate.value = date;
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
      // 调用第一个 API 切换时间段的状态
      console.log(selectedConsultation.value.consultationId,selectedTimeSlot.value)
      await toggleAvailableTimeApi(selectedConsultation.value.consultationId, selectedTimeSlot.value);
      console.log('toggleAvailableTimeApi')
      // 调用第二个 API 添加预约信息
      await addOneReservationApi(user.userData.userId, selectedConsultation.value.consultationId, selectedTimeSlot.value);
      console.log('addOneReservationApi')

      await consultationStore.fetchConsultations();
      console.log(selectedConsultation.value.availableTime)

      alert(`预约了 ${selectedConsultation.value.consultant} 老师，日期：${modalSelectedDate.value!.format('YYYY/MM/DD')} 时间段：${timeSlots[selectedTimeSlot.value]}`);
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
