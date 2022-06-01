/**
 * @Description
 * @Author youus
 * @Date 2022/6/1 23:56
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { ref } from 'vue';
import { TableColumnType } from 'ant-design-vue';

export default function useTable() {
  const columns = ref<TableColumnType[]>([]);
  
  const addColumn = (column: TableColumnType) => {
    columns.value.push(column)
  }
  
  return {
    columns,
    addColumn
  }
}