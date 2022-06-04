<template>
  <a-drawer
      :visible="visible"
      :title="`编辑（${field.param}-${field.title}）`"
      width="700"
      placement="right"
      @close="close"
  >
    <a-descriptions title="搜索" :column="2">
      <template #extra>
        <a-switch v-model:checked="field.search.visible" />
      </template>
      <a-descriptions-item label="搜索类型">
        <a-select
            style="width: 140px"
            size="small"
            :options="typeOptions"
            v-model:value="field.search.type"
        />
      </a-descriptions-item>
      <a-descriptions-item label="默认值">
        <a-input size="small" style="width: 140px" v-model:value="field.search.default" />
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <a-descriptions title="表格" :column="2">
      <template #extra>
        <a-switch v-model:checked="field.column.visible" />
      </template>
      <a-descriptions-item label="对齐方式">
        <a-select
            style="width: 140px"
            size="small"
            :options="alignOptions"
            v-model:value="field.column.align"
        />
      </a-descriptions-item>
      <a-descriptions-item label="列宽">
        <a-input-number style="width: 140px" size="small" v-model:value="field.column.width" />
      </a-descriptions-item>
      <a-descriptions-item label="是否自定义列">
        <a-space>
          <a-input size="small" style="width: 140px" v-if="customColumn" v-model:value="field.column.slot"/>
          <a-switch v-model:checked="customColumn" />
        </a-space>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts">
/**
 * @Description filed 相关配置
 * @Author youus
 * @Date 00:28
 * @Version v1.0.0
 *
 * Hello, humor
 */
import {defineComponent, PropType, ref} from 'vue';

export default defineComponent({
  name: 'FieldDrawer',
  props: {
    fieldInfo: {
      type: Object as PropType<Field>,
      default: () => ({
        param: '',
        title: '',
        search: {
          visible: false,
        },
        column: {
          visible: true
        }
      })
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const search = ref(false)
    const table = ref(true)
    const customColumn = ref(false)

    const field = toRef(props, 'fieldInfo')

    const close = () => {
      console.log('close', emit)
      emit('update:visible', false)
    }

    const typeOptions = [
      { label: '输入框', value: 'input' },
      { label: '选择框', value: 'select' },
      { label: '多选', value: 'MultipleSelect' },
      { label: '日期选择', value: 'date' },
      { label: '日期范围选择', value: 'dateRange' },
      { label: '自定义', value: 'slot' },
    ]

    const alignOptions = [
      { label: 'left', value: 'left' },
      { label: 'center', value: 'center' },
      { label: 'right', value: 'right' },
    ]

    return {
      close,
      search,
      table,
      typeOptions,
      alignOptions,
      customColumn,
      field
    }
  }
})
</script>

<style scoped>

</style>