import { Tabs } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useGetMarksQuery } from "../../store/stock-api";
import { setChoosenModels, setCurrentPage, setSelectedMark } from "../../store/app-slice";

function Heading(): React.JSX.Element {

    const dispatch = useAppDispatch();
    const selectedMark = useAppSelector((state) => state.appSlice.selectedMark);
    const { data: marks, isSuccess } = useGetMarksQuery();

    useEffect(() => {
      if (isSuccess) {
        dispatch(setSelectedMark(marks[0]._id))
      }
    }, [isSuccess]);

    function handleTabClick(evt: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>): void {
      const textContent = evt.currentTarget.textContent;
      if (textContent && textContent.split(' ').length > 2) {
        dispatch(setSelectedMark(evt.currentTarget.textContent?.split(' ').slice(0, 2).join(' ') as string))
      } else {
        dispatch(setSelectedMark(evt.currentTarget.textContent?.split(' ').slice(0, 1).join('') as string))
      }
      dispatch(setChoosenModels([]));
      dispatch(setCurrentPage(1));
    }

    return (
        <Tabs defaultActiveKey={selectedMark} items={marks?.map((mark, index) => {
            return {key: index.toString(), label: `${mark._id} ${mark.count}`}
          })}
          onTabClick={(_, evt) => {
            handleTabClick(evt);
          }}
        />
    )
}

export default Heading;