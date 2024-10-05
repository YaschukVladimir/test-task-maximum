import { Select, Table, Pagination } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { CarStockItem } from '../../types/types';
import { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import { Tabs } from "antd";
import type { TabsProps } from 'antd';
import axios from 'axios';
import type { SelectProps } from 'antd';

type Mark = {
  _id: string;
  count: number;
}

type Model = {
  _id: string;
}

const { TabPane } = Tabs;


function App() {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<CarStockItem[]>([]);
  const [selectedMark, setSelectedMark] = useState<string>();
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const handleSetModels = (value: string[]) => {
    setSelectedModels(value);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/marks')
      .then((resp) => resp.json())
      .then((res) => {
        setMarks(res);
        setSelectedMark(res[0]._id);
      });
  }, []);

  useEffect(() => {
    if(selectedMark) {
      fetch(`http://localhost:3000/api/models/${selectedMark}`)
      .then((resp) => resp.json())
      .then((res) => setModels(res));
    }
    
  }, [selectedMark]);

  const fetchCars = async (page = 1) => {
    setLoading(true);
    const res = await axios.get('http://localhost:3000/api/stock', {
      params: {
        mark: selectedMark || '',
        models: selectedModels.join(','),
        page,
      },
    });
    setCars(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedMark) {
      fetchCars();
    }
  }, [selectedMark, selectedModels]);

  console.log(marks, 'marks');
  console.log(stock, 'stock');
  console.log(models, 'models');


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
      {marks.length && <Tabs activeKey={marks[0]._id} onChange={(value) => setSelectedMark(value)}>
        {marks?.map((mark) => <TabPane key={mark._id} tab={`${mark._id} ${mark.count}`}></TabPane>)}
      </Tabs>}
      <Select placeholder="Выберите модель" style={{ width: 200 }} mode='multiple' onChange={(value) => handleSetModels(value)}>
        {models?.map(model => <Option key={model._id} value={model._id}>{model._id} </Option>)}
      </Select>

      <Table
        columns={columns}
        dataSource={cars}
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
  )
}

export default App
