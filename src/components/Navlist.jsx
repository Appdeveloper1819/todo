import React, {useState} from 'react'

const Navlist = ({selectnote, setSelectNote}) => {
const [iscross, setIsCross] = useState(false);

    const handleCross = () => {
        setIsCross(!iscross);
        setSelectNote([]);
      }


    //   const toggleSelect = (noteId) => {
    //     setSelectNote((prevSelected) =>
    //       prevSelected.includes(noteId)
    //         ? prevSelected.filter((id) => id !== noteId)
    //         : [...prevSelected, noteId]
    //     );
    //     console.log("Toggled selection for note:", noteId);
    //   };
      
    const toolbarItems = [
        {icon: "keep"},
        {icon: "palette"},
        {icon: "add_alert"},
        {icon: "archive"},
        {icon: "more_vert"},
      ];

  return (
    <div className="p-4">
      {selectnote.length > 0 && (
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-4 py-2 mb-4 rounded-md max-w-md mx-auto">
          <i className="material-symbols-rounded text-gray-500 cursor-pointer" onClick={handleCross} >
          close
        </i>
          <span className="text-sm text-gray-700 dark:text-white">
            {selectnote.length} selected
          </span>
          <div className="flex space-x-4 text-gray-500 dark:text-gray-300">
            {toolbarItems.map((toolbarItems , index) => (
              <i
                key={toolbarItems.icon+index} 
                className="material-symbols-rounded cursor-pointer hover:text-blue-500">
                {toolbarItems.icon}
              </i>
            ))}
          </div>
        </div>
      )}
      </div>
  )
}

export default Navlist;
