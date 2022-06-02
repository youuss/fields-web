<template>
  <a-table>
    <Draggable v-model="columns" itemKey="key">
      <template #item="{element}">
        <a-table-column
          :key="element.key"
          :title="element.title"
          :dataIndex="element.dataIndex" />
      </template>
    </Draggable>
  </a-table>
</template>

<script lang='ts'>
import Draggable from 'vuedraggable'

export default {
  name: 'DragTable',
  components: {
    Draggable
  },
  setup() {
    const columns = [
      {
        key: 'name',
        title: '名称',
        dataIndex: 'name'
      },
      {
        key: 'sex',
        title: '性别',
        dataIndex: 'sex'
      },
      {
        key: 'address',
        title: '地址',
        dataIndex: 'address'
      },
      {
        key: 'city',
        title: '城市',
        dataIndex: 'city'
      },
      {
        key: 'country',
        title: '国家',
        dataIndex: 'country'
      }
    ]

    return {
      columns
    }
  }
};
</script>

<style scoped>

</style>
