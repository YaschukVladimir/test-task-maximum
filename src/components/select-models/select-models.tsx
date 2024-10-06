import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Option } from 'antd/es/mentions';
import { useGetModelsQuery } from "../../store/stock-api";
import { setChoosenModels } from "../../store/app-slice";

function SelectModels(): React.JSX.Element {

const dispatch = useAppDispatch();
const currentPage = useAppSelector((state) => state.appSlice.currentPage);
const mark = useAppSelector((state) => state.appSlice.selectedMark);
const choosenModels = useAppSelector((state) => state.appSlice.choosenModels);

const {data: models, isLoading, isSuccess} = useGetModelsQuery({mark, models: choosenModels, page: currentPage});

    return (
        <Select
          placeholder="Выберите модель"
          value={choosenModels}
          style={{ width: 200 }}
          mode='multiple'
          loading={isLoading}
          onChange={(value) => {
            dispatch(setChoosenModels(value))
            }}>
            {isLoading ? <p>Loading...</p> : ''}
            {isSuccess && models?.map(model => <Option key={model._id} value={model._id}>{model._id} </Option>)}
          </Select>
    )
}

export default SelectModels;