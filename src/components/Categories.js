import React, { useState, memo } from 'react';
import "../App.css"

const Categories = memo(({
    category, newWidgetName, setNewWidgetName, newWidgetText,
    setNewWidgetText, addWidget, removeWidget, getFilteredWidgets, categoryName
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const filteredWidgets = getFilteredWidgets(category);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAddWidget = () => {
        if (newWidgetName.trim() === '' || newWidgetText.trim() === '') {
            return (
                alert("Please fill all details.")
            )
        }
        addWidget(category.id);
        toggleDrawer();
    };
    

    return (
        <div className="mx-20 my-5">
            <h2 className='font-bold my-3'>{categoryName}</h2>

            <div className="flex justify-between gap-6 scrollbar-hide shadow-2xl p-2 rounded-xl">
                {filteredWidgets.map(widget => (
                    <div key={widget.id} className='bg-white border rounded-xl cursor-pointer'>
                        <div className="w-96 h-60 p-4">
                            <div className="flex justify-between items-center">
                                <h4>{widget.name}</h4>
                                <button
                                    className='border p-2 text-sm rounded-md text-white ease-in-out hover:bg-red-600 bg-red-500'
                                    onClick={() => removeWidget(category.id, widget.id)}
                                >
                                    Remove
                                </button>
                            </div>
                            <p className="h-full w-full flex justify-center items-center">{widget.text}</p>
                        </div>
                    </div>
                ))}
                <button
                    className="w-96 text-black bg-white p-2 border rounded-xl"
                    onClick={toggleDrawer}
                >
                    + Add Widget
                </button>
            </div>

            <div
                className={`fixed top-0 right-0 h-full bg-white border-l shadow-lg transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex-col justify-between h-full'>
                    <div>
                        <div className='bg-blue-900 p-2'>
                            <h2 className="text-lg text-white">Add New Widget</h2>
                        </div>
                        <p className='text-sm p-1'>Personalize your dashboard by adding the following widgets</p>

                        <div className='flex gap-2 p-1 font-semibold'>
                            <p>CSPM</p>
                            <p>CWPP</p>
                            <p>Image</p>
                            <p>Ticket</p>
                        </div>

                        <div className='p-2'>
                            <input
                                type="text"
                                placeholder="Widget Name"
                                value={newWidgetName}
                                onChange={(e) => setNewWidgetName(e.target.value)}
                                className="border mb-4 w-full p-2"
                            />
                            <input
                                type="text"
                                placeholder="Widget Text"
                                value={newWidgetText}
                                onChange={(e) => setNewWidgetText(e.target.value)}
                                className="border mb-4 w-full p-2"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 space-x-2">
                        <button
                            onClick={handleAddWidget}
                            className="bg-blue-900 text-white px-5 py-1 rounded-md"
                            disabled={newWidgetName.trim() === '' || newWidgetText.trim() === ''}
                        >
                            Add
                        </button>
                        <button
                            onClick={toggleDrawer}
                            className="bg-white border border-blue-900 text-black px-3 py-1 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {drawerOpen && (
                <div
                    className="fixed"
                    onClick={toggleDrawer}
                />
            )}
        </div>
    );
});

export default Categories;
