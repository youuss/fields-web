<template>
  <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '100%' }"
      :autofocus="false"
      :indent-with-tab="false"
      :tabSize="2"
      :extensions="extensions"
  />
</template>

<script lang="ts">
/**
 * @Description fields schema Json预览，可复制
 * @Author youus
 * @Date 23:24
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import useCore from '@/composables/useCore';

export default defineComponent({
  name: 'FieldsCode',
  components: {
    Codemirror
  },
  setup() {
    const { schema } = useCore('v2')
    const code = ref(`${JSON.stringify(schema, null, 2)}`)
    const extensions = [json(), oneDark]
    return {
      code,
      extensions,
    }
  }
})
</script>

<style scoped>

</style>