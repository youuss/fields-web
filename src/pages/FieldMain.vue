<template>
  <div class="fields-container">
    <div class="field-list">
      <a-form
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-form-item
            label="key"
            v-bind="validateInfos.key"
        >
          <a-input v-model:value="form.key" />
        </a-form-item>
        <a-form-item
            label="title"
            v-bind="validateInfos.title"
        >
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-button block type="primary" @click="onSubmit">添加</a-button>
      </a-form>
      <FieldList />
    </div>
    <div class='fields-preview'>
      <FieldsContainer />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @Description filed主页
 * @Author youus
 * @Date 21:46
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { useFieldsStore } from '@/store/fields';
import { Form, FormProps } from 'ant-design-vue'
import { Rule } from 'ant-design-vue/es/form';

interface StateProps {
  form: {
    key?: string;
    title?: string;
  },
  rules?: FormProps['rules'];
}

const { useForm } = Form
export default defineComponent({
  name: 'FieldMain',
  setup() {
    const fieldsStore = useFieldsStore();

    const validateParam = (_rule: Rule, value: string) => {
      const field = fieldsStore.fields.find((field) => field.key === value)
      if (field) {
        return Promise.reject('请勿添加相同字段');
      }
      if (!value) {
        return Promise.reject('请输入字段');
      } else if (!/^[^\u4e00-\u9fa5]*$/.test(value)) {
        return Promise.reject('请输入英文字符');
      } else {
        return Promise.resolve();
      }
    }

    const state = reactive<StateProps>({
      form: {
        key: undefined,
        title: undefined,
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入字段名称',
          }
        ],
        key: [
          {
            required: true,
            validator: validateParam,
          }
        ]
      }
    });

    const { validate, validateInfos, resetFields } = useForm(state.form, state.rules);

    const onSubmit = () => {
      validate().then(() => {
        fieldsStore.addField({
          ...state.form,
          _status: 'current'
        })
        resetFields()
      }).catch((e) => console.log(e))
    }
    return {
      ...toRefs(state),
      onSubmit,
      validateInfos
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
    background: #fff;
    width: 100%;
    overflow: hidden;
  }
}
</style>
