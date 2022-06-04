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

export default defineComponent({
  name: 'FieldsCode',
  components: {
    Codemirror
  },
  setup() {
    const code = ref(`${JSON.stringify({
      id: {
        title: '编号',
      },
      name: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name9: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name8: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name7: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name6: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name5: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name4: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name3: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name2: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      name1: {
        title: '名称',
        search: {
          type: 'input'
        }
      },
      action: {
        title: '操作',
        table: {
          width: 200,
          align: 'center',
          fixed: 'right'
        }
      }
    }, null, 2)}`)
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