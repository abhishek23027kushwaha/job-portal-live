import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar fixed hai, isliye iski width (w-64) jitni margin left mein deni hogi */}
      <AdminSidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;