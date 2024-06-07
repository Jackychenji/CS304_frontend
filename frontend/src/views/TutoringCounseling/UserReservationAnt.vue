<template>
  <div id="reservations">
    <a-table :columns="columns" :data-source="formattedReservations" row-key="reservationId">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'consultant'">
          <span>
            <smile-outlined />
            老师
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'consultant'">
          <a>
            {{ record.consultant }}
          </a>
        </template>
        <template v-else-if="column.key === 'type'">
          <span>
            {{ record.type }}
          </span>
        </template>
        <template v-else-if="column.key === 'date'">
          <span>
            {{ record.date }}
          </span>
        </template>
        <template v-else-if="column.key === 'timeSlot'">
          <span>
            {{ timeSlots[record.timeSlot] }}
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="deleteReservation(record)">删除</a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed, reactive} from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/store/modules/user';
import { deleteReservationByIdApi } from '@/api/modules/TutoringCounseling/deleteReservationById.ts';
import { useReservationStore } from '@/store/modules/TutoringCounseling/reservation.ts';
import {toggleAvailableTimeApi} from "@/api/modules/TutoringCounseling/toggleAvailableTime.ts";

const userStore = useUserStore();
const reservationStore = useReservationStore();

const reservations = computed(() => {
  return Object.values(reservationStore.reservationData);
});

const formattedReservations = computed(() => {
  return reservations.value.map(reservation => ({
    reservationId: reservation.reservationId,
    consultant: reservation.reservationConsultation.consultant,
    consultantId: reservation.reservationConsultation.consultationId,
    type: reservation.reservationConsultation.type,
    date: reservation.reservationConsultation.date,
    timeSlot: reservation.reserveTime,
  }));
});

onMounted(async () => {
  await reservationStore.fetchReservations(userStore.userData.userId);
});

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

const columns = [
  {
    title: '老师',
    dataIndex: 'consultant',
    key: 'consultant',
  },
  {
    title: '预约类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '预约日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '预约时间段',
    dataIndex: 'timeSlot',
    key: 'timeSlot',
  },
  {
    title: '操作',
    key: 'action',
  },
];

const deleteReservation = async (record) => {
  try {
    await deleteReservationByIdApi(record.reservationId);
    await toggleAvailableTimeApi(record.consultantId, record.timeSlot);
    await reservationStore.fetchReservations(userStore.userData.userId);
    //refresh the page
    location.reload();
    alert('预约已删除');
  } catch (error) {
    console.error('Error deleting reservation:', error);
    console.log(record.consultantId)
    console.log(record.timeSlot)
    alert('删除预约失败，请重试。');
  }
};
</script>

<style scoped>
#reservations {
  padding: 20px;
}
</style>



<!--<template>-->
<!--  <div id="reservations">-->
<!--    <a-table :columns="columns" :data-source="formattedReservations" row-key="reservationId">-->
<!--      <template #headerCell="{ column }">-->
<!--        <template v-if="column.key === 'consultant'">-->
<!--          <span>-->
<!--            <smile-outlined />-->
<!--            老师-->
<!--          </span>-->
<!--        </template>-->
<!--      </template>-->

<!--      <template #bodyCell="{ column, record }">-->
<!--        <template v-if="column.key === 'consultant'">-->
<!--          <a>-->
<!--            {{ record.consultant }}-->
<!--          </a>-->
<!--        </template>-->
<!--        <template v-else-if="column.key === 'type'">-->
<!--          <span>-->
<!--            {{ record.type }}-->
<!--          </span>-->
<!--        </template>-->
<!--        <template v-else-if="column.key === 'date'">-->
<!--          <span>-->
<!--            {{ record.date }}-->
<!--          </span>-->
<!--        </template>-->
<!--        <template v-else-if="column.key === 'timeSlot'">-->
<!--          <span>-->
<!--            {{ timeSlots[record.timeSlot] }}-->
<!--          </span>-->
<!--        </template>-->
<!--        <template v-else-if="column.key === 'action'">-->
<!--          <span>-->
<!--            <a @click="deleteReservation(record.reservationId)">删除</a>-->
<!--          </span>-->
<!--        </template>-->
<!--      </template>-->
<!--    </a-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { ref, onMounted, computed } from 'vue';-->
<!--import { SmileOutlined } from '@ant-design/icons-vue';-->
<!--import { useUserStore } from '@/store/modules/user';-->
<!--import { deleteReservationByIdApi } from '@/api/modules/TutoringCounseling/deleteReservationById.ts';-->
<!--import { useReservationStore } from '@/store/modules/TutoringCounseling/reservation.ts';-->

<!--const userStore = useUserStore();-->
<!--const reservationStore = useReservationStore();-->

<!--const reservations = computed(() => {-->
<!--  return Object.values(reservationStore.reservationData);-->
<!--});-->

<!--const formattedReservations = computed(() => {-->
<!--  return reservations.value.map(reservation => ({-->
<!--    reservationId: reservation.reservationId,-->
<!--    consultant: reservation.reservationConsultation.consultant,-->
<!--    type: reservation.reservationConsultation.type,-->
<!--    date: reservation.reservationConsultation.date,-->
<!--    timeSlot: reservation.reserveTime,-->
<!--  }));-->
<!--});-->

<!--onMounted(async () => {-->
<!--  await reservationStore.fetchReservations(userStore.userData.userId);-->
<!--});-->

<!--const timeSlots = [-->
<!--  '08:00-09:00',-->
<!--  '09:00-10:00',-->
<!--  '10:00-11:00',-->
<!--  '14:00-15:00',-->
<!--  '15:00-16:00',-->
<!--  '16:00-17:00',-->
<!--  '19:00-20:00',-->
<!--  '20:00-21:00',-->
<!--  '21:00-22:00',-->
<!--];-->

<!--const columns = [-->
<!--  {-->
<!--    title: '老师',-->
<!--    dataIndex: 'consultant',-->
<!--    key: 'consultant',-->
<!--  },-->
<!--  {-->
<!--    title: '预约类型',-->
<!--    dataIndex: 'type',-->
<!--    key: 'type',-->
<!--  },-->
<!--  {-->
<!--    title: '预约日期',-->
<!--    dataIndex: 'date',-->
<!--    key: 'date',-->
<!--  },-->
<!--  {-->
<!--    title: '预约时间段',-->
<!--    dataIndex: 'timeSlot',-->
<!--    key: 'timeSlot',-->
<!--  },-->
<!--  {-->
<!--    title: '操作',-->
<!--    key: 'action',-->
<!--  },-->
<!--];-->

<!--const deleteReservation = async (reservationId: number) => {-->
<!--  try {-->
<!--    await deleteReservationByIdApi(reservationId);-->
<!--    reservationStore.fetchReservations(userStore.userData.userId);-->
<!--    alert('预约已删除');-->
<!--  } catch (error) {-->
<!--    console.error('Error deleting reservation:', error);-->
<!--    alert('删除预约失败，请重试。');-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--#reservations {-->
<!--  padding: 20px;-->
<!--}-->
<!--</style>-->
