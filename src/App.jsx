import { useState } from "react"
import CenterSec from "./components/CenterSec"
import Header from "./components/Header"
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardsSlice";
import EmptyBoard from "./components/EmptyBoard";

function App() {
const [modalOpen , setModalOpen ] = useState(false)
const dispatch = useDispatch();
const boards = useSelector((state) => state.boards);
const activeBoard = boards.find((board) => board.isActive);
if (!activeBoard && boards.length > 0)
  dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      {
        boards.length > 0 ? <>
        {/* header section */}
        <Header modalOpen={modalOpen} setModalOpen={setModalOpen}></Header>
        {/* center section */}
        <CenterSec></CenterSec>
      </> : <EmptyBoard type={'add'}></EmptyBoard>
      }
    
    </div>
  )
}

export default App
