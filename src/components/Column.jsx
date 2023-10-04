import {  useSelector } from "react-redux";
import Task from "./Task";

const Column = ({colIndex}) => {

      const boards = useSelector((state) => state.boards);
      const board = boards.find((board) => board.isActive === true);
      const col = board.columns.find((col, i) => i === colIndex);
  
    return (
        <div
        className=" mx-5 pt-[90px] min-w-[280px] "
      >
        <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
          <div className={`rounded-full w-4 h-4 bg-green-400 `} />
          {col.name} ({col.tasks.length})
        </p>
  
        {col.tasks.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
      </div>
    );
};

export default Column;