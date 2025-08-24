import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  // Helper for styling active NavLinks
  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-border'
    }`;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Admin Sidebar */}
        <aside className="md:w-1/4 lg:w-1/5">
          <h2 className="text-xl font-bold text-text-primary mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <NavLink to="/admin/dashboard" className={navLinkClasses} end>Dashboard</NavLink>
            <NavLink to="/admin/users" className={navLinkClasses}>User Management</NavLink>
            <NavLink to="/admin/vehicles" className={navLinkClasses}>Vehicle Management</NavLink>
            <NavLink to="/admin/bookings" className={navLinkClasses}>All Bookings</NavLink>
            <NavLink to="/admin/issues" className={navLinkClasses}>Reported Issues</NavLink>
          </nav>
        </aside>

        {/* Main Admin Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
