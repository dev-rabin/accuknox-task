import React, { useState, useMemo } from "react";
import Categories from "./components/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faBell,
  faCalendar,
  faEllipsisV,
  faRefresh,
  faStopwatch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: 1, name: "Widget", text: "Text for Widget" },
        { id: 2, name: "Widget", text: "Text for Widget" },
      ],
    },
    {
      id: 2,
      name: "CWPP Dashboard",
      widgets: [
        { id: 3, name: "CWPP Widget ", text: "Text for CWPP Widget " },
        { id: 4, name: "CWPP Widget ", text: "Text for CWPP Widget " },
      ],
    },
    {
      id: 3,
      name: "Ticket",
      widgets: [
        { id: 5, name: "Ticket Widget ", text: "Text for Ticket " },
        { id: 6, name: "Ticket Widget ", text: "Text for Ticket " },
      ],
    },
    {
      id: 4,
      name: "Image",
      widgets: [
        { id: 7, name: "Image Widget ", text: "Text for Image " },
        { id: 8, name: "Image Widget ", text: "Text for Image " },
      ],
    },
  ]);

  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addWidget = (categoryId) => {
    const newWidget = {
      id: new Date().getTime(),
      name: newWidgetName,
      text: newWidgetText,
    };

    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: [...category.widgets, newWidget],
          };
        }
        return category;
      })
    );

    setNewWidgetName("");
    setNewWidgetText("");
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter(
              (widget) => widget.id !== widgetId
            ),
          };
        }
        return category;
      })
    );
  };

  const getFilteredWidgets = useMemo(
    () => (category) => {
      return category.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [searchTerm]
  );

  return (
    <div>
      <div className="flex justify-between items-center p-2 bg-white">
        <div className="ml-2 font-semibold">
          Home /<span className="font-bold"> Dashboard</span>
        </div>
        <input
          type="text"
          placeholder="Search Widgets"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-blue-100 m-2 px-5 py-2 rounded-xl"
        />
        <div className="w-28 flex justify-around items-center">
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faCalendar} />
        </div>
      </div>

      <div className="m-5 flex justify-between">
        <div>
          <p className="font-bold text-lg">CNAPP Dashboard</p>
        </div>

        <div className=" w-96 flex justify-around items-center ">
          <button className="border border-blue-400 rounded-md py-1 px-2 text-sm bg-white">
            {" "}
            + Add Widget
          </button>
          <button className="border border-blue-400 rounded-md py-1 px-2 text-sm bg-white">
            <FontAwesomeIcon icon={faRefresh} />
          </button>
          <button className="border border-blue-400 rounded-md py-1 px-2 text-sm bg-white">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <button className="border border-blue-400 rounded-md py-1 px-3 text-sm bg-white font-bold text-blue-950">
            <FontAwesomeIcon className="mx-2" icon={faStopwatch} />
            Last 2 days{" "}
            <span>
              <FontAwesomeIcon className="mx-2" icon={faArrowDown} />
            </span>
          </button>
        </div>
      </div>

      <div>
        {categories.map((category) => (
          <Categories
            key={category.id}
            categoryName={category.name}
            category={category}
            newWidgetName={newWidgetName}
            setNewWidgetName={setNewWidgetName}
            newWidgetText={newWidgetText}
            setNewWidgetText={setNewWidgetText}
            addWidget={addWidget}
            removeWidget={removeWidget}
            getFilteredWidgets={getFilteredWidgets}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
