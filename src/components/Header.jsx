import { useState } from 'react';
import logo from '../assets/logo.png'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Dropdown from './Dropdown';
import AddBoard from '../modals/AddBoard';
import AddEditTask from '../modals/AddEditTask';
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from '../modals/DeleteModal';
import boardsSlice from '../redux/boardsSlice';
const Header = ({ modalOpen, setModalOpen }) => {

    const [openDropDown, setOpenDropDown] = useState(false)
    const [taskModalOpen, setTaskModalOpen] = useState(false)
    const [deleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);

    const onDeleteBtnClick = (e) => {
        if (e.target.textContent === "Delete") {
          dispatch(boardsSlice.actions.deleteBoard());
          dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
          setIsDeleteModalOpen(false);
        } else {
          setIsDeleteModalOpen(false);
        }
      };

    return (
        <div className="p-4 fixed left-0 right-0 z-50 bg-white dark:bg-slate-700 ">
            <header className="flex justify-between items-center dark:text-white">
                <div className='flex items-center space-x-2 md:space-x-4'>
                    <img className='h-[40px] w-[40px]  rounded-full' src={logo} alt="logo" />
                    <h3 className='hidden md:inline-block font-bold font-sans md:text-4xl'>
                        TODOZ
                    </h3>
                    <div className='flex items-center'>
                        <h3 className='truncate max-w-[250px] font-bold text-xl md:text-2xl md:ml-20 font-sans'>
                            {board?.name || 'Board Name'}
                        </h3>
                        {
                            openDropDown ? <FaAngleUp className='md:hidden cursor-pointer ml-3' onClick={() => setOpenDropDown(state => !state)}></FaAngleUp> : <FaAngleDown className='md:hidden cursor-pointer ml-3' onClick={() => setOpenDropDown(state => !state)}></FaAngleDown>
                        }

                    </div>
                </div>
                <div className='flex space-x-4 items-center md:space-x-6'>
                    <button onClick={() => {
                        setTaskModalOpen(state => !state)
                    }} className='hidden md:block button'>
                        + Add new task
                    </button>
                    <button onClick={() => {
                        setTaskModalOpen(state => !state)
                    }} className='button py-1 px-3 md:hidden'>
                        +
                    </button>
                    <button onClick={() => {
                        setIsDeleteModalOpen(true)
                    }} className='button py-1 px-3 border bg-transparent text-black dark:text-white hover:bg-[#0000001c]'>
                        X
                    </button>
                </div>
            </header>

            {
                openDropDown && <Dropdown setModalOpen={setModalOpen} setOpenDropDown={setOpenDropDown}></Dropdown>
            }

            {
                modalOpen && <AddBoard setModalOpen={setModalOpen}></AddBoard>
            }
            {
                taskModalOpen && <AddEditTask device={'mobile'} setTaskModalOpen={setTaskModalOpen} type={'add'}></AddEditTask>
            }
            {
                deleteModalOpen && <DeleteModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    type="board"
                    title={board.name}
                    onDeleteBtnClick={onDeleteBtnClick}
                ></DeleteModal>
            }
        </div>
    );
};

export default Header;