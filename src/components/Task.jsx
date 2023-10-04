import { useDispatch, useSelector } from "react-redux";
import { FaTrash , FaCheckCircle} from "react-icons/fa";
import boardsSlice from "../redux/boardsSlice";
import { useState } from "react";
import DeleteModal from "../modals/DeleteModal";


const Task = ({ taskIndex , colIndex }) => {
  const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
     
    const setStatus = () => {
      dispatch(
        boardsSlice.actions.setTaskStatus({
          taskIndex,
          colIndex,
          newColIndex : 1 ,
          status : 'Done',
        })
      );
      
    }

    const onDeleteBtnClick = (e) => {
      if (e.target.textContent === "Delete") {
        dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
      } else {
        setIsDeleteModalOpen(false);
      }
    };

    return (
        <div>
        <div
          className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
        >
          <p className=" font-bold tracking-wide "> {task.title}</p>
          <div className="w-[100px] ms-auto flex items-center justify-end font-bold space-x-4">
            {task?.status === 'Todo' && <FaCheckCircle onClick={() => setStatus() } className="text-green-500 h-6"></FaCheckCircle>}
            <FaTrash onClick={() => setIsDeleteModalOpen(true)} className="text-red-400 h-6"></FaTrash>
          </div>
        </div>
        {
          deleteModalOpen &&   <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task?.title}
        />
        }
      </div>
    );
};

export default Task;