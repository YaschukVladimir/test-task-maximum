import Heading from '../heading/heading';
import SelectModels from '../select-models/select-models';
import StockTable from '../table/table';


function App(): React.JSX.Element {

  return (
    <>
      <Heading />
      <SelectModels />
      <StockTable />
    </>
  )
}

export default App;
