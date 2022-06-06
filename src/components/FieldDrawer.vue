<template>
  <a-drawer
      :visible="visible"
      :title="`编辑（${field.key}-${field.title}）`"
      width="700"
      placement="right"
      @close="close"
  >
    <a-descriptions title="基本内容" :column="2">
      <a-descriptions-item label="字段">
        <a-input size="small" style="width: 140px" v-model:value="field.key" disabled />
      </a-descriptions-item>
      <a-descriptions-item label="字段名称">
        <a-input size="small" style="width: 140px" v-model:value="field.title" />
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <a-descriptions title="搜索" :column="2">
      <template #extra>
        <a-switch v-model:checked="field._isSearchField" />
      </template>
      <template v-if="field._isSearchField">
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
        <a-descriptions-item
            v-if="['MultipleSelect', 'select'].includes(field.search.type)"
            label="选项配置"
            :span="2"
        >
          <div class="custom-options">
            <div class="options">
              <a-button size="small" @click="addOption" type="link" >
                <PlusOutlined />
                添加选项
              </a-button>
              <Draggable
                  class="options-draggable"
                  v-model="field.search.options"
                  item-key="value"
              >
                <template #item="{element}">
                  <li class="option" @click="toConfigure(element)">
                    <span class="drag-icon">
                      <HolderOutlined />
                    </span>
                    {{element.label}}
                  </li>
                </template>
              </Draggable>
            </div>
            <div class="option-config"></div>
          </div>
        </a-descriptions-item>
      </template>
    </a-descriptions>
    <a-divider />
    <a-descriptions title="表格" :column="2">
      <template #extra>
        <a-switch v-model:checked="field._isTableField" />
      </template>
      <template v-if="field._isTableField">
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
      </template>
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
import { defineComponent, PropType, ref } from 'vue';
import Draggable from 'vuedraggable';

export default defineComponent({
  name: 'FieldDrawer',
  components: { Draggable },
  props: {
    fieldInfo: {
      type: Object as PropType<Field>,
      default: () => ({
        key: '',
        title: '',
        _isSearchField: false,
        _isTableField: true,
        search: {},
        column: {}
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
    // todo 抽象选项配置组件
    const currentOption = ref({})

    const field = toRef(props, 'fieldInfo')

    const close = () => {
      console.log('close', emit)
      emit('update:visible', false)
    }

    const addOption = () => {
      if (field.value.search) {
        if (!field.value.search.options) {
          field.value.search.options = [{
            label: '选项1',
            value: uuid()
          }]
        } else {
          field.value.search.options.push({
            label: `选项${field.value.search.options.length + 1}`,
            value: uuid()
          })
        }
      }
    }

    const uuid = () => {
      let d = Date.now();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
      }
      return 'xxxx7xxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
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

    // todo 抽象选项配置组件
    const toConfigure = (option: any) => {
      currentOption.value = option
    }

    return {
      close,
      search,
      table,
      typeOptions,
      alignOptions,
      customColumn,
      field,
      toConfigure,
      addOption
    }
  }
})
</script>

<style scoped lang="scss">
.custom-options {
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  .options-draggable {
    width: 200px;
    .option {
      position: relative;
      line-height: 40px;
      height: 40px;
      border: 1px solid #e5e5e5;
      margin: 5px;
      border-radius: 5px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .option-config {
    background: #f5f5f5;
    width: calc(100% - 200px);
  }
}
</style>