import { Select, Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { CarStockItem } from '../../types/types';
import { useState } from 'react';
import { carStock } from '../../mock-data/mock';
import { Option } from 'antd/es/mentions';


function App() {

  const [marks, setMarks] = useState([])

  const columns: ColumnsType<CarStockItem> = [
    { title: 'ID', dataIndex: '_id', key: '_id' },
    { title: 'Марка', dataIndex: 'mark', key: 'mark' },
    { title: 'Модель', dataIndex: 'model', key: 'model' },
    { title: 'Комплектация', dataIndex: 'equipmentName', key: 'equipmentName' },
    { title: 'Стоимость', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} руб.` },
    { title: 'Дата создания', dataIndex: 'createdAt', key: 'createdAt', render: (date: Date) => new Date(date).toLocaleDateString() },
];

  return (
    <div>
            <Select placeholder="Выберите марку" style={{ width: 200 }}>
                {carStock.map(car => <Option key={car._id} value={car.model}>{car.model} </Option>)}
            </Select>

            {/* <Select
                mode="multiple"
                placeholder="Выберите модели"
                onChange={value => setSelectedModels(value)}
                style={{ width: 200, marginLeft: 10 }}
            >
                {models.map(model => <Option key={model._id} value={model._id}>{model._id}</Option>)}
            </Select> */}

            <Table
                columns={columns}
                dataSource={carStock}
                rowKey="_id"
                pagination={false}
                // loading={loading}
                style={{ marginTop: 20 }}
            />

            <Pagination
                current={1}
                pageSize={20}
                total={10}
                // onChange={page => setPage(page)}
                style={{ marginTop: 20 }}
            />
        </div>
    // <>
    //   <div>hello world</div>
    //   <div className="heading">
    //     <ul className="heading__list">
    //       <li className="heading__item">
    //         <div className="headin__item-carname">Audi</div>
    //         <div className="heading__item-carqty">1</div>
    //       </li>
    //       <li className="heading__item">
    //         <div className="headin__item-carname">Audi</div>
    //         <div className="heading__item-carqty">1</div>
    //       </li>
    //       <li className="heading__item">
    //         <div className="headin__item-carname">Audi</div>
    //         <div className="heading__item-carqty">1</div>
    //       </li>
    //     </ul>
    //   </div>
    // </>
  )
}

export default App
