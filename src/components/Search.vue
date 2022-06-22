<template>
  <div class="search-bar">
    <a-row
        v-for="(row, index) in items"
        :key="index"
        :gutter="24"
    >
      <a-col
          v-for="item in row"
          :key="item.key"
          :span="24 / lineCount"
      >
        <SearchItem
            :item="item"
            @change="changeHandler"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col
          :span="24"
          :style="{ textAlign: 'right' }"
          class="action-buttons"
      >
        <a-button
            v-if="actions.includes('search')"
            type="primary"
            @click="toSearch"
        >
          搜索
        </a-button>
        <a-button
            v-if="actions.includes('add')"
            @click="toAdd"
        >
          新增
        </a-button>
        <slot
            name="btn"
            :search-result="searchResult"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description
 * @Author youus
 * @Date 21:24
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { useFieldsStore } from '@/store/fields';

const props = defineProps({
  lineCount: {
    type: Number,
    default: 4
  },
  actions: {
    type: Array,
    default: () => ['search','add']
  }
});

const emit = defineEmits(['search', 'add'])

const fieldsStore = useFieldsStore()

const { lineCount } = props;

const searchMap = ref(new Map())
const searchResult = ref({})

const items = computed(() => fieldsStore.searchItems(lineCount))


const isEmpty = (val: any) => val === null || val === undefined || val === '' || val.length === 0

const changeHandler = (arg: any) => {
  Object.keys(arg).forEach(key => {
    if (isEmpty(arg[key])) {
      searchMap.value.delete(key)
    } else {
      searchMap.value.set(key, arg[key])
    }
  });

  searchResult.value = Object.fromEntries(searchMap.value.entries())
}

const toSearch = () => {
  emit('search', Object.fromEntries(searchMap.value.entries()))
}

const toAdd = () => emit('add')

</script>

<style scoped lang="scss">
.search-bar {
  padding: 20px;

  .action-buttons {
    .ant-btn {
      margin-right: 20px;
    }
  }
}
</style>