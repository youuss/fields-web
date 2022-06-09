/**
 * @Description 字段核心转译
 * @Author youus
 * @Date 2022/6/4 16:02
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { useFieldsStore } from '@/store/fields';

const ignoreRex = /^_/

export default function useCore(version: string) {
  const fieldStore = useFieldsStore()
  
  const fields: Field[] = JSON.parse(JSON.stringify(fieldStore.fields));
  
  const keys = fields.map(field => field.key)
  
  const schema = reactive<Record<string, any>>({})
  
  const customFormat = (key: string, obj: Record<string, any>) => {
    const customMap = {
      _isSearchField: () => {
        if (!obj._isSearchField) {
          delete obj.search
        }
        delete obj._isSearchField
      },
      _isTableField: () => {
        if (!obj._isTableField) {
          obj.table.hidden = true
        }
        delete obj._isTableField
      },
      _slot: () => {
        if (version === 'v2') {
          obj.scopeSlot = {
            customRender: obj._slot
          }
          delete obj._slot
        }
      },
      _type: () => delete obj._type,
      _id: () => delete obj._id,
      _status: () => delete obj._status
    }
    customMap[key]();
  }
  
  const travelObject = (obj: Record<string, any>) => {
    for(let key in obj) {
      if (key.match(ignoreRex)) {
        customFormat(key, obj);
      }
      if (typeof obj[key] === 'object') {
        if (Object.keys(obj[key]).length > 1) {
          travelObject(obj[key])
        } else {
          delete obj[key]
        }
      }
    }
    
    return obj
  }
  
  const fieldFormat = (field: Field) => {
    return travelObject(field)
  }
  
  keys.forEach(key => {
    const field = fields.find(f => f.key === key);
    if (field) {
      schema[key as string] = fieldFormat(field)
    }
  })
  
  return {
    schema
  }
}