import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { CarStockItem } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useGetCarsQuery } from "../../store/stock-api";
import { setCurrentPage } from "../../store/app-slice";

function StockTable(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const mark = useAppSelector((state) => state.appSlice.selectedMark);
  const models = useAppSelector((state) => state.appSlice.choosenModels);
  const page = useAppSelector((state) => state.appSlice.currentPage);

  const { data: cars, isLoading } = useGetCarsQuery({mark, models, page})

    const columns: ColumnsType<CarStockItem> = [
        { title: 'ID', dataIndex: '_id', key: '_id' },
        { title: 'Марка', dataIndex: 'mark', key: 'mark' },
        { title: 'Модель', dataIndex: 'model', key: 'model' },
        { title: 'Комплектация', dataIndex: 'equipmentName', key: 'equipmentName' },
        { title: 'Стоимость', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} руб.` },
        { title: 'Дата создания', dataIndex: 'createdAt', key: 'createdAt', render: (date: Date) => new Date(date).toLocaleDateString() },
      ];
    
    return (
        <Table
        columns={columns}
        dataSource={cars}
        rowKey="_id"
        pagination={{
          defaultCurrent: 1,
          pageSize: 20,
          total: cars?.length,
          onChange: (page) => {
            dispatch(setCurrentPage(page))
          },
          style: { marginTop: 20 }
        }}
        loading={isLoading}
        style={{ marginTop: 20 }}
      />
    )
}

export default StockTable;