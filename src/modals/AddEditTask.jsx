import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

const AddEditTask = ({ 
  type,
  device,
  setTaskModalOpen,
  prevColIndex = 0,
  taskIndex }) => {

  const [title, setTitle] = useState('')

  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
    );
    const columns = board.columns;
    const [status, setStatus] = useState(columns[prevColIndex].name);

  const dispatch = useDispatch();

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };


  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          status,
          newColIndex
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          status,
          taskIndex,
          newColIndex,
          prevColIndex
        })
      );
    }
  };
  return (
    <div
      onClick={
        (e) => {
          if (e.target !== e.currentTarget) {
            return
          }

          setTaskModalOpen(false)
        }
      }
      className={
        `${device === 'mobile' ? ' px-6 py-6 pb-40 absolute left-0 right-0 flex bottom-[-100vh] top-0 bg-[#0000001c] ' : ' px-6 py-6 pb-40 absolute left-0 right-0 flex bottom-0 top-0 bg-[#0000001c]'}`
      }>
      <div
        className="max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-md"
      >
        <h3 className="text-lg">
          {type === 'edit' ? 'Edit' : 'Add new'} Task
        </h3>
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500" >
          </label>
          <input className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-500 outline-none " placeholder="e.g Take coffee from store" value={title} type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }} />
          <div className="mt-8 flex flex-col space-y-3">
            <label className="  text-sm dark:text-white text-gray-500">
              Current Status
            </label>
            <select
              value={status}
              onChange={onChangeStatus}
              className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            >
              {columns.map((column, index) => (
                <option key={index}>{column.name}</option>
              ))}
            </select>
            <button
              onClick={() => {
                onSubmit(type);
                setTaskModalOpen(false);
                type === "edit" && setTaskModalOpen(false);

              }}
              className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
            >
              {type === "edit" ? " save edit" : "Create task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;