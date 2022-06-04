<template>
  <Draggable
      class="field-list-container"
      v-model="fieldStore.fields"
      item-key="param"
  >
    <template #item="{element}">
      <li class="field">
        <span class="drag-icon">
          <HolderOutlined />
        </span>
        {{element.title}}（{{element.param}}）
        <a-button type="link" @click="toModify(element)">
          <EditFilled />
        </a-button>
      </li>
    </template>
  </Draggable>
  <FieldDrawer v-model:visible="visible" :fieldInfo="currentField" />
</template>

<script lang="ts">
/**
 * @Description fields 列表组件
 * @Author youus
 * @Date 21:46
 * @Version v1.0.0
 *
 * Hello, humor
 */
import Draggable from 'vuedraggable';
import { useFieldsStore } from '@/store/fields';

export default defineComponent({
  name: 'FieldList',
  components: { Draggable },
  setup() {
    const fieldStore = useFieldsStore()

    const currentField = ref<Field>({})

    const visible = ref(false)

    const toModify = (field: Field) => {
      currentField.value = field
      visible.value = true
    }
    return {
      fieldStore,
      visible,
      toModify,
      currentField
    }
  }
})
</script>

<style scoped lang="scss">
.field-list-container {
  .field {
    position: relative;
    line-height: 40px;
    height: 40px;
    border: 1px solid #e5e5e5;
    margin: 5px;
    border-radius: 5px;
    padding-left: 10px;
    display: flex;
    align-items: center;

    .drag-icon {
      cursor: move;
      margin-right: 5px;
      &:hover {
        color: #1890ff;
      }
    }

    .ant-btn {
      position: absolute;
      right: 0;
    }
  }
}
</style>
