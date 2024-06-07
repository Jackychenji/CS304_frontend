<template>
  <a-table :columns="columns" :row-key="record => record.reservationId" :data-source="dataSource"
    :pagination="pagination" :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'consultant'">{{ text }}</template>
      <template v-else-if="column.dataIndex === 'type'">{{ text }}</template>
      <template v-else-if="column.dataIndex === 'date'">{{ text }}</template>
      <template v-else-if="column.dataIndex === 'timeSlot'">{{ timeSlots[text] }}</template>
      <template v-else-if="column.key === 'action'">
        <a-button type="link" @click="deleteReservation(record)">删除</a-button>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { deleteReservationByIdApi } from '@/api/modules/TutoringCounseling/deleteReservationById.ts';
import { useReservationStore } from '@/store/modules/TutoringCounseling/reservation.ts';
import { toggleAvailableTimeApi } from "@/api/modules/TutoringCounseling/toggleAvailableTime.ts";
import { usePagination } from 'vue-request';
import type { TableProps } from 'ant-design-vue';

const userStore = useUserStore();
const reservationStore = useReservationStore();

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

const formattedReservations = computed(() => {
  return Object.values(reservationStore.reservationData).map(reservation => ({
    reservationId: reservation.reservationId,
    consultant: reservation.reservationConsultation.consultant,
    consultantId: reservation.reservationConsultation.consultationId,
    type: reservation.reservationConsultation.type,
    date: reservation.reservationConsultation.date,
    timeSlot: reservation.reserveTime,
  }));
});

const columns = [
  {
    title: '老师',
    dataIndex: 'consultant',
    key: 'consultant',
    sorter: true,
  },
  {
    title: '预约类型',
    dataIndex: 'type',
    key: 'type',
    sorter: true,
  },
  {
    title: '预约日期',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
  },
  {
    title: '预约时间段',
    dataIndex: 'timeSlot',
    key: 'timeSlot',
    sorter: true,
  },
  {
    title: '操作',
    key: 'action',
  },
];

const queryData = async (params = {}) => {
  await reservationStore.fetchReservations(userStore.userData.userId);
  let data = formattedReservations.value;

  // Sorting logic with default values
  const sortField = params.sortField || '';
  const sortOrder = params.sortOrder === 'ascend' ? 1 : -1;

  if (sortField) {
    data = data.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -sortOrder;
      if (a[sortField] > b[sortField]) return sortOrder;
      return 0;
    });
  }

  return data;
};

const { data: dataSource, run, loading, current, pageSize } = usePagination(queryData, {
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'results',
  },
});

const pagination = computed(() => ({
  total: formattedReservations.value.length,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange: TableProps['onChange'] = (pag, filters, sorter) => {
  run({
    results: pag.pageSize,
    page: pag.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

const deleteReservation = async (record) => {
  try {
    await deleteReservationByIdApi(record.reservationId);
    // await toggleAvailableTimeApi(record.consultantId, record.timeSlot);
    await run(); // 重新获取数据
    alert('预约已成功删除。');
  } catch (error) {
    console.error('Error deleting reservation:', error);
    alert('删除预约失败，请重试。');
  }
};

onMounted(() => {
  run();
});
</script>

<style scoped>
#reservations {
  padding: 20px;
}
</style>
