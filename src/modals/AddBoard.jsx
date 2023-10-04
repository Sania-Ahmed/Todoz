import { useState } from "react";
import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";
const AddBoard = ({ setModalOpen }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const newColumns  = [
        { name: "Todo", tasks: [], id: uuidv4() },
        { name: "Done", tasks: [], id: uuidv4() },
      ]

    const onSubmit = () => {
        setModalOpen(false);
        dispatch(boardsSlice.actions.addBoard({ name , newColumns  }));
    };
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setModalOpen(false)
            }}
            className="fixed left-0 right-0 top-0 bottom-0 px-2 oy -4 overflow-scroll z-50 flex justify-center items-center bg-[#0000001e]"
        >
            <div className=" max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white  font-bold shadow-md  shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl ">
                <h3 className="text-lg ">Add New Board </h3>
                <div className="mt-8  flex flex-col space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">Board Name</label>
                    <input type="text" className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-500 outline-none " placeholder="e.g make coffee"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        id="board-name-input"
                    />
                </div>
                <div>
                    <button className="w-full flex items-center justify-center mt-8 button"
                        onClick={() => {
                            onSubmit()
                        }}
                    >Add Board +</button>
                </div>
            </div>

        </div>
    );
};

export default AddBoard;