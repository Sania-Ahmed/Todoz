import { Switch } from "@headlessui/react";
import { FaClipboard, FaSun , FaMoon } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
const Dropdown = ({setOpenDropDown , setModalOpen}) => {
const dispatch = useDispatch()
const boards = useSelector((state) => state.boards);
const [themeColor , setTheme] = useDarkMode()
const [dark , setDark] = useState(
  themeColor === 'light' ? true : false
)
const toogleDark = (checked) => {
  setTheme(themeColor)
  setDark(checked)
}
    return (
        <div className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000028]"
        onClick={
            (e) => {
                if(e.target !== e.currentTarget){
                    return
                }

                setOpenDropDown(false)
            }
        }

        >
            {/* modal */}
            <div
            className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold  mx-4 mb-8 ">
                All boards
              </h3>
              <div>
              {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4 cursor-pointer ${
                board.isActive &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <FaClipboard></FaClipboard>{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}

                 <div className="flex items-center space-x-2 text-teal-600 px-5 py-4" onClick={() => {
                  setModalOpen(true)
                  setOpenDropDown(false)
                 }}>
                     
                    <FaClipboard className="h-6"></FaClipboard>
                    <p className="cursor-pointer text-lg font-bold">Create New Board</p>
                 </div>
                 <div className="mx-2 p-4 space-x-2  bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                   <FaSun className="text-orange-500 h-6 w-6"></FaSun>
                    <Switch
                    checked={dark}
                    onChange={toogleDark}
                    className={`${dark ? 'bg-teal-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className={`${dark ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}></span>
                    </Switch>
                   <FaMoon className="text-cyan-700 dark:text-white h-6 w-6"></FaMoon>
                 </div>
              </div>
            </div>
        </div>
    );
};

export default Dropdown;