<template>
  <div class="fields-container">
    <div class="field-list">
      <a-form>
        <a-form-item name="param" label="param">
          <a-input />
        </a-form-item>
        <a-form-item name="title" label="title">
          <a-input />
        </a-form-item>
        <a-form-item>
          <a-button block type="primary">添加</a-button>
        </a-form-item>
      </a-form>
      <a-list
          item-layout="horizontal"
          :data-source="dataList"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            {{item.param}}-{{item.title}}
            <template #actions>
              <a @click="toModify(item)">edit</a>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <FieldDrawer v-model:visible="visible" :param="param" :title="title"/>
  </div>
</template>

<script lang="ts">
/**
 * @Description
 * @Author youus
 * @Date 21:46
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Main',
  setup() {
    const dataList = ref([
      { param: 'id', title: '编号' },
      { param: 'name', title: '名称' }
    ])

    const visible = ref(false)
    const param = ref('')
    const title = ref('')

    const toModify = (record: any) => {
      console.log(record)
      param.value = record.param
      title.value = record.title
      visible.value = true
    }

    return {
      dataList,
      toModify,
      visible,
      param,
      title
    }
  }
})
</script>

<style scoped lang="scss">
.fields-container {
  height: 100vh;
  width: 100vw;
  padding: 10px;
  background: #f5f5f5;
  .field-list {
    width: 250px;
    background: #fff;
    height: 100%;
    padding: 20px;
  }
}
</style>