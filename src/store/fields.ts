/**
 * @Description fields状态管理
 * @Author youus
 * @Date 2022/6/4 13:22
 * @Version v1.0.0
 *
 * Hello, humor
 */

export const useFieldsStore = defineStore('fieldsStore',{
  state: () => ({
    fields: [
      {
        title: '操作',
        param: 'action',
        search: {
          visible: false,
        },
        column: {
          visible: true,
          fixed: 'right'
        }
      }
    ] as Field[]
  }),
  actions: {
    addFiled(field: Field) {
      this.fields.splice(-1, 0, {
        ...field,
        search: {
          visible: false,
        },
        column: {
          visible: true
        }
      })
    }
  },
  getters: {
    columns: (state) => state.fields.map(field => ({
      key: field.param,
      title: field.title,
      dataIndex: field.param,
      ...field.column,
    }))
  }
})