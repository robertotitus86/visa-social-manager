import React from 'react';

function Sidebar({ currentPage, onPageChange, brandColors }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'calendar', label: 'Calendario', icon: '📅' },
    { id: 'analytics', label: 'Analítica', icon: '📈' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' }
  ];

  return (
    <div
      className="w-64 h-screen shadow-lg flex flex-col"
      style={{ backgroundColor: brandColors.darkBlue, color: brandColors.white }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: brandColors.gold }}>
        <h2 className="text-xl font-bold">Visa Global</h2>
        <p className="text-sm opacity-75">Social Manager</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 font-medium ${
              currentPage === item.id
                ? 'bg-opacity-100'
                : 'opacity-75 hover:opacity-90'
            }`}
            style={{
              backgroundColor: currentPage === item.id ? brandColors.gold : 'transparent',
              color: currentPage === item.id ? brandColors.darkBlue : 'white'
            }}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: brandColors.gold }}>
        <p className="text-xs opacity-50">v1.0.0</p>
        <p className="text-xs opacity-75 mt-2">© 2024 Visa Global</p>
      </div>
    </div>
  );
}

export default Sidebar;
