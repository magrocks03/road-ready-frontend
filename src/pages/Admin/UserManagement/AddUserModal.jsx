import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { createAdminUserApiCall } from '../../../services/AdminService';

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    roleName: 'Customer',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    setError('');
    // --- ADDED PASSWORD VALIDATION ---
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
      setError('First name, last name, email, and password are required.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newUser.password)) {
      setError('Password must be 8+ characters with uppercase, lowercase, number, and special character.');
      return;
    }
    // --- END OF VALIDATION ---

    const payload = {
      ...newUser,
      phoneNumber: newUser.phoneNumber || null,
    };
    
    console.log("Sending user data to API:", payload);

    createAdminUserApiCall(payload)
      .then(() => {
        onUserAdded();
        onClose();
      })
      .catch(err => {
        console.error("Failed to create user:", err);
        setError(err.response?.data?.message || "An error occurred while creating the user.");
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Add New User</Dialog.Title>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" value={newUser.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
              <input name="lastName" value={newUser.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
            </div>
            <input type="email" name="email" value={newUser.email} onChange={handleInputChange} placeholder="Email" className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
            <input type="password" name="password" value={newUser.password} onChange={handleInputChange} placeholder="Password" className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
            <input name="phoneNumber" value={newUser.phoneNumber} onChange={handleInputChange} placeholder="Phone Number (Optional)" className="w-full p-2 bg-background border border-border text-text-primary placeholder:text-text-secondary rounded-md" />
            <select name="roleName" value={newUser.roleName} onChange={handleInputChange} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
              <option value="Customer">Customer</option>
              <option value="Rental Agent">Rental Agent</option>
            </select>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary bg-border rounded-md hover:bg-slate-gray/20">Cancel</button>
            <button onClick={handleAddUser} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Add User</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddUserModal;
