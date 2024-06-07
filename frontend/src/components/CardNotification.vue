<template>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0 }">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Authors Table</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="authorsHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">ONLINE</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
		</template>
		<a-table :columns="tableColumns" :data-source="tableData" :pagination="false">

			<template #author="{ author }">
				<div class="table-avatar-info">
					<a-avatar shape="square" :src="author.avatar" />
					<div class="avatar-info">
						<h6>{{ author.name }}</h6>
						<p>{{ author.email }}</p>
					</div>
				</div>
			</template>

			<template #func="{ func }">
				<div class="author-info">
					<h6 class="m-0">{{ func.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ func.department }}</p>
				</div>
			</template>

			<template #status="{ status }">
				<a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ status ? "ONLINE" : "OFFLINE" }}
				</a-tag>
			</template>

			<template #editBtn="{ row }">
				<a-button type="link" :data-id="row.key" class="btn-edit">
					Edit
				</a-button>
			</template>

		</a-table>
	</a-card>
</template>

<script setup lang="ts">

const props = defineProps({
	data: Array,
	columns: Array
})

const tableData = ref(props.data)
const tableColumns = ref(props.columns)

import { ref } from 'vue'

const authorsHeaderBtns = ref<string>('all')
</script>

<style scoped></style>