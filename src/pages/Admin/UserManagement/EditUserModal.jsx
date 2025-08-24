import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { updateUserRoleApiCall, deactivateUserApiCall } from '../../../services/AdminService';

const EditUserModal = ({ isOpen, onClose, onUserUpdated, user }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setSelectedRole(user.roles[0] || 'Customer');
    }
  }, [user]);

  if (!user) return null;

  const handleUpdateRole = () => {
    setError('');
    updateUserRoleApiCall(user.id, selectedRole)
      .then(() => {
        onUserUpdated();
        onClose();
      })
      .catch(err => {
        console.error("Failed to update role:", err);
        setError(err.response?.data?.message || "An error occurred.");
      });
  };

  const handleDeactivate = () => {
    if (window.confirm(`Are you sure you want to deactivate ${user.firstName}? This will remove all their roles.`)) {
      setError('');
      deactivateUserApiCall(user.id)
        .then(() => {
          onUserUpdated();
          onClose();
        })
        .catch(err => {
          console.error("Failed to deactivate user:", err);
          setError(err.response?.data?.message || "An error occurred.");
        });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text-primary mb-4">Edit User: {user.firstName}</Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Assign Role</label>
              {/* --- CHANGE IS HERE --- */}
              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full p-2 bg-background border border-border text-text-primary rounded-md">
                <option value="Customer">Customer</option>
                <option value="Rental Agent">Rental Agent</option>
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button onClick={handleUpdateRole} className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Update Role</button>
          </div>
          <hr className="my-6 border-border"/>
          <div>
            <h3 className="font-semibold text-text-primary mb-2">Deactivate Account</h3>
            <p className="text-sm text-text-secondary mb-4">This will remove all roles from the user, effectively deactivating their account.</p>
            <button onClick={handleDeactivate} className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Deactivate User</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditUserModal;
