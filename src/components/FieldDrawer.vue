<template>
  <a-drawer
      :visible="visible"
      :title="`编辑（${param}-${title}）`"
      width="600"
      placement="right"
      @close="close"
  >
    <a-descriptions title="搜索">
      <template #extra>
        <a-switch v-model:checked="search" />
      </template>
    </a-descriptions>
    <a-divider />
    <a-descriptions title="表格">
      <template #extra>
        <a-switch v-model:checked="table" />
      </template>
    </a-descriptions>
  </a-drawer>
</template>

<script>
/**
 * @Description
 * @Author youus
 * @Date 00:28
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FieldDrawer',
  props: {
    param: {
      type: String,
      default: 'id'
    },
    title: {
      type: String,
      default: '编号'
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

    const close = () => {
      console.log('close', emit)
      emit('update:visible', false)
    }

    return {
      close,
      search,
      table
    }
  }
})
</script>

<style scoped>

</style>