import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, update, remove } from "../Store/index";

function TableComponent() {
  const users = useSelector((state) => state.crud.users);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const dispatch = useDispatch();

  const handleUpdateClick = (user) => {
    setIsEditing(true);
    setEditUserId(user.id);
    setId(user.id);
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
  };

  const handleUpdateSubmit = () => {
    dispatch(update({ id: editUserId, data: { id, name, age: age, email } }));
    setIsEditing(false);
    setEditUserId(null);
    setId("");
    setName("");
    setAge("");
    setEmail("");
  };

  return (
    <div className="p-4 mt-6  ">
      <div className="ml-4 p-7  rounded-md">
        <h2 className="text-lg   mb-4">
          {isEditing ? "Update User" : "Add User"}
        </h2>
        <div className="space-y-3">
          <div>
            <label htmlFor="id" className="block text-gray-700">
              ID:
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-3/6 px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-3/6 px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700">
              Age:
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-3/6 px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/6 px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              if (!id || !name || !age || !email) {
                return;
              }
              if (isEditing) {
                handleUpdateSubmit();
              } else {
                dispatch(add({ id, name, age: parseInt(age), email }));
                setId("");
                setName("");
                setAge("");
                setEmail("");
              }
            }}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>

      <table className="min-w-full   divide-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {u.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {u.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {u.age}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {u.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition"
                  onClick={() => dispatch(remove({ id: u.id }))}
                >
                  Delete
                </button>
                <button
                  className="ml-4 text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md transition"
                  onClick={() => handleUpdateClick(u)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
