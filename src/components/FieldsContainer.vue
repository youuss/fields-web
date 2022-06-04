<template>
  <div class="fields-content">
    <div class="content-header">
      <a-radio-group v-model:value="mode" size="small">
        <a-radio-button value="preview">
          <EyeOutlined />
        </a-radio-button>
        <a-radio-button value="code">
          <CodeSandboxOutlined />
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="content-container">
      <FieldsPreview v-if="mode === 'preview'" />
      <FieldsCode v-if="mode === 'code'" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'FieldsContainer',
  setup() {
    const mode = ref('preview')
    return {
      mode
    }
  },
});
</script>

<style lang="scss">
.fields-content {
  height: 100%;
  .content-header {
    height: 30px;
    background: #f5f5f5;
    .ant-radio-group {
      float: right;
    }
  }
  .content-container {
    height: calc(100% - 20px);
    overflow: hidden;
  }
}
</style>
