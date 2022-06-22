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
        key: 'action',
        _status: 'always',
        _isSearchField: false,
        _isTableField: true,
        search: {},
        column: {
          fixed: 'right',
          _slot: 'action'
        }
      }
    ] as Field[]
  }),
  actions: {
    addField(field: Field) {
      this.fields.splice(-1, 0, {
        ...field,
        search: {},
        column: {},
        _isSearchField: false,
        _isTableField: true,
      })
    },
    deleteField(key?: string) {
      const index = this.fields.findIndex(field => field.key === key && field._status !== 'always')
      if (index > -1) {
        this.fields.splice(index, 1)
      }
    },
  },
  getters: {
    columns: (state) => state.fields
      .filter(field => field._isTableField)
      .map(field => ({
        key: field.key,
        title: field.title,
        dataIndex: field.key,
        defaultValue: undefined,
        ...field.column,
      })),
    searchItems: (state) => {
      return (lineCount: number) => {
        const item = state.fields
          .filter(field => field._isSearchField)
          .map(field => ({
            key: field.key,
            title: field.title,
            ...field.search
          }))
        let arr: any[] = [];
        for (let i = 0; i < item.length / lineCount; i += 1) {
          arr = arr.concat([item.slice(i * lineCount, (i + 1) * lineCount)]);
        }
        return arr
      }
    }
  },
})