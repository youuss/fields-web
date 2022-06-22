<template>
  <a-drawer
      :visible="visible"
      :title="`编辑（${field.key}-${field.title}）`"
      width="700"
      placement="right"
      @close="close"
  >
    <a-descriptions title="基本内容" :column="2">
      <a-descriptions-item label="字段" :labelStyle="{ alignItems: 'center' }">
        <a-input style="width: 140px" v-model:value="field.key" disabled />
      </a-descriptions-item>
      <a-descriptions-item label="字段名称" :labelStyle="{ alignItems: 'center' }">
        <a-input style="width: 140px" v-model:value="field.title" />
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="搜索" :column="2" v-if="!['action'].includes(field.key)">
      <template #extra>
        <a-switch v-model:checked="field._isSearchField" />
      </template>
      <template v-if="field._isSearchField">
        <a-descriptions-item label="搜索类型" :labelStyle="{ alignItems: 'center' }">
          <a-select
              style="width: 140px"
              :options="typeOptions"
              v-model:value="field.search.type"
          />
        </a-descriptions-item>
        <a-descriptions-item label="默认值" :labelStyle="{ alignItems: 'center' }">
          <a-input style="width: 140px" v-model:value="field.search.defaultValue" />
        </a-descriptions-item>
        <a-descriptions-item
            v-if="['MultipleSelect', 'select'].includes(field.search.type)"
            label="选项配置"
            :span="2"
            :labelStyle="{ alignItems: 'center' }"
        >
          <div class="custom-options">
            <div class="options">
              <a-button class="option-add" size="small" @click="addOption" type="link" >
                <PlusOutlined />
                添加选项
              </a-button>
              <Draggable
                  class="options-draggable"
                  v-model="field.search.options"
                  item-key="_id"
              >
                <template #item="{element}">
                  <li
                      class="option"
                      @click="toConfigure(element)"
                      :class="{'active': currentOption && currentOption._id === element._id }"
                  >
                    <span class="drag-icon">
                      <HolderOutlined />
                    </span>
                    {{element.label}}
                  </li>
                </template>
              </Draggable>
            </div>
            <div class="option-config">
              <div class="config-title">配置键值对</div>
              <a-form>
                <a-form-item label="label">
                  <a-input v-model:value="currentOption.label" style="width: 200px"/>
                </a-form-item>
                <a-form-item label="value">
                  <a-input-group compact>
                    <a-input v-if="currentOption._type === 'string'"
                             style="width: 170px"
                             v-model:value="currentOption.value" />
                    <a-input-number v-if="currentOption._type === 'number'"
                                    style="width: 170px"
                                    v-model:value="currentOption.value" />
                    <a-tooltip :title="currentOption._type === 'string' ? '字符' : '数字'">
                      <a-button @click="currentOption._type === 'number' ? currentOption._type = 'string' : currentOption._type = 'number'">
                        <template #icon>
                          <FieldNumberOutlined v-if="currentOption._type === 'number'"/>
                          <FieldStringOutlined v-if="currentOption._type === 'string'"/>
                        </template>
                      </a-button>
                    </a-tooltip>
                  </a-input-group>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </a-descriptions-item>
      </template>
    </a-descriptions>
    <a-descriptions title="表格" :column="2">
      <template #extra>
        <a-switch v-model:checked="field._isTableField" />
      </template>
      <template v-if="field._isTableField">
        <a-descriptions-item label="对齐方式" :labelStyle="{ alignItems: 'center' }">
          <a-select
              style="width: 140px"
              :options="alignOptions"
              v-model:value="field.column.align"
          />
        </a-descriptions-item>
        <a-descriptions-item label="列宽" :labelStyle="{ alignItems: 'center' }">
          <a-input-number style="width: 140px" v-model:value="field.column.width" />
        </a-descriptions-item>
        <a-descriptions-item label="是否自定义列" :labelStyle="{ alignItems: 'center' }">
          <a-space>
            <a-input style="width: 140px" v-if="customColumn" v-model:value="field.column._slot"/>
            <a-switch v-model:checked="customColumn" />
          </a-space>
        </a-descriptions-item>
      </template>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
/**
 * @Description filed 相关配置
 * @Author youus
 * @Date 00:28
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { PropType, watch } from 'vue';
import Draggable from 'vuedraggable';

const props = defineProps({
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
})

const emit = defineEmits(['update:visible'])

const customColumn = ref(false)
// todo 抽象选项配置组件
const currentOption = ref({})

const field = toRef(props, 'fieldInfo')

const close = () => {
  emit('update:visible', false)
}

const addOption = () => {
  if (field.value.search) {
    if (!field.value.search.options) {
      field.value.search.options = [{
        label: '选项1',
        value: uuid(),
        _id: uuid(),
        _type: 'string',
      }]
    } else {
      field.value.search.options.push({
        label: `选项${field.value.search.options.length + 1}`,
        value: uuid(),
        _id: uuid(),
        _type: 'string',
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

watch(() => props.visible, (val) => {
  if (val) {
    currentOption.value = {
      _type: 'string'
    }
  }
})
</script>

<style scoped lang="scss">
.custom-options {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  position: relative;
  .options {
    position: relative;
    .options-draggable {
      width: 200px;
      height: 360px;
      overflow: auto;
      .option {
        position: relative;
        line-height: 30px;
        height: 30px;
        border: 1px solid #e5e5e5;
        margin: 5px;
        border-radius: 5px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .active {
        border-color: #1890ff;
      }
    }
  }
  .option-config {
    background: #f5f5f5;
    width: calc(100% - 200px);
    height: 400px;
    padding: 20px;
    .config-title {
      margin-bottom: 10px;
    }
  }
}
</style>