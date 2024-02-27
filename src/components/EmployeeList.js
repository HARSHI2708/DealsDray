import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CreateUserModal from './CreateUserModal';
import UserList from './UserList';
import "../Styles/EmployeeList.css";

const EmployeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalUsers, setOriginalUsers] = useState([]); 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch or set your original list of users here
    // For example, you can fetch it from a server or set it directly
    const initialUsers = [
      // ... your initial list of users
    ];
    setOriginalUsers(initialUsers);
    setUsers(initialUsers);
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
    closeModal();
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const editUser = (user) => {
    setSelectedUser(user);
    openModal();
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(null);
    closeModal();
  };

  const handleSearch = () => {
    // Implement your search logic based on the searchTerm
    // For example, if your users state is an array, you can filter it based on the search term
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setUsers(filteredUsers);
  };

  const resetSearch = () => {
    setUsers(originalUsers);
    setSearchTerm('');
  };

  return (
    <div>
        <Navbar/>
        <h2>Employee List</h2>
      <button onClick={openModal}>Create User</button>
      <div className="search-container">
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <button onClick={resetSearch} className="reset-button">
          Reset
        </button>
      </div>
      <span>Total Count: {users.length}</span>
      {showModal && (
        <CreateUserModal
          closeModal={closeModal}
          addUser={addUser}
          selectedUser={selectedUser}
          updateUser={updateUser}
        />
      )}
      <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
      {/* Additional components or content go here */}
    </div>
  );
};

export default EmployeeList;
