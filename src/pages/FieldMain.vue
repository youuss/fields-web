<template>
  <div class="fields-container">
    <div class="field-list">
      <a-form
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-form-item name="param" label="param">
          <a-input />
        </a-form-item>
        <a-form-item name="title" label="title">
          <a-input />
        </a-form-item>
        <a-button block type="primary">添加</a-button>
      </a-form>
      <a-list
          itemLayout="horizontal"
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
    <div class='fields-preview'>
      <FieldsPreview />
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

export default defineComponent({
  name: 'FieldMain',
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
  display: grid;
  grid-template-columns: 250px calc(100vw - 280px);
  grid-column-gap: 10px;

  .field-list {
    width: 100%;
    background: #fff;
    height: 100%;
    padding: 20px;
  }

  .fields-preview {
    padding: 10px;
    background: #fff;
    width: 100%;
  }
}
</style>
