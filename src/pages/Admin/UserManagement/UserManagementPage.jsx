import { useState, useCallback } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getAllUsersApiCall } from '../../../services/AdminService';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

const UserManagementPage = () => {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // We need a way to force the useFetch hook to refetch data
  const [refetchIndex, setRefetchIndex] = useState(0);
  const forceRefetch = () => setRefetchIndex(prev => prev + 1);

  const { data: response, isLoading, error } = useFetch(
    () => getAllUsersApiCall(page),
    [page, refetchIndex] // Refetch when page or index changes
  );

  const users = response?.items || [];
  const totalPages = response?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUserActionSuccess = () => {
    forceRefetch(); // Trigger a data refresh
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <AddUserModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={handleUserActionSuccess}
      />
      <EditUserModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUserUpdated={handleUserActionSuccess}
        user={selectedUser}
      />

      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
          <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-hover">
            Add User
          </button>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Name</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Email</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Phone</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Roles</th>
                  <th className="p-4 text-sm font-semibold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-border last:border-b-0">
                    <td className="p-4 text-text-primary">{user.firstName} {user.lastName}</td>
                    <td className="p-4 text-text-secondary">{user.email}</td>
                    <td className="p-4 text-text-secondary">{user.phoneNumber || 'N/A'}</td>
                    <td className="p-4 text-text-secondary">{user.roles.join(', ')}</td>
                    <td className="p-4">
                      <button onClick={() => handleOpenEditModal(user)} className="text-primary hover:underline text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} className="px-4 py-2 bg-border text-text-secondary rounded-md disabled:opacity-50">
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagementPage;