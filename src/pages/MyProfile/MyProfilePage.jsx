import { useState, useEffect } from 'react';
import { getMyProfileApiCall, updateMyProfileApiCall } from '../../services/ProfileService';
import { useFetch } from '../../hooks/useFetch';

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [updateError, setUpdateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Use our custom hook to fetch the initial profile data
  const { data: initialProfile, isLoading, error: fetchError } = useFetch(getMyProfileApiCall);

  // When the data is fetched, set it to our editable profile state
  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUpdateError('');
    setSuccessMessage('');

    updateMyProfileApiCall(profile)
      .then(response => {
        setProfile(response.data);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(err => {
        console.error("Failed to update profile:", err);
        setUpdateError(err.response?.data?.message || "An error occurred while updating your profile.");
      });
  };

  if (isLoading) return <div className="text-center py-20"><p>Loading your profile...</p></div>;
  if (fetchError) return <div className="text-center py-20"><p className="text-red-500">{fetchError}</p></div>;

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-text-primary mb-8">My Profile</h1>
      {profile && (
        <form onSubmit={handleUpdateProfile} className="bg-card p-6 rounded-lg shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary">First Name</label>
              <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Last Name</label>
              <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Email</label>
            <input type="email" name="email" value={profile.email} disabled className="w-full p-2 mt-1 bg-border border-border text-text-secondary rounded-md cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Phone Number</label>
            <input type="tel" name="phoneNumber" value={profile.phoneNumber || ''} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Address</label>
            <input type="text" name="address" value={profile.address || ''} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary">City</label>
              <input type="text" name="city" value={profile.city || ''} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">State</label>
              <input type="text" name="state" value={profile.state || ''} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Postal Code</label>
              <input type="text" name="postalCode" value={profile.postalCode || ''} onChange={handleInputChange} className="w-full p-2 mt-1 bg-background border border-border text-text-primary rounded-md" />
            </div>
          </div>

          {updateError && <p className="text-sm text-red-600">{updateError}</p>}
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MyProfilePage;