import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyBoard from "./EmptyBoard";

import Column from "./Column";
import Sidebar from "./Sidebar";

const CenterSec = () => {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);
      useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
    
        window.addEventListener("resize", handleWindowResize);
    
        return () => {
          window.removeEventListener("resize", handleWindowResize);
        };
      });
      const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

      const boards = useSelector((state) => state.boards);
      const board = boards.find((board) => board.isActive === true);
      const columns = board.columns;
    
      const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    return (
        <div
        className={
          windowSize[0] >= 768 && isSideBarOpen
            ? " bg-[#f4f7fd]   h-screen flex  dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]"
            : "bg-[#f4f7fd]   h-screen flex  flex-col md:flex-row  dark:bg-[#20212c] overflow-x-scroll gap-6 "
        }
      >
        {windowSize[0] >= 768 && (
          <Sidebar
            setIsBoardModalOpen={setIsBoardModalOpen}
            isBoardModalOpen={isBoardModalOpen}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
        )}
  
        {/* Columns Section */}
  
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}
            
          </>
        ) : (
          <>
            <EmptyBoard type="edit" />
          </>
        )}
      </div>
    );
};

export default CenterSec;