import React from 'react';

function Calendar({ posts }) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const getPostsForDay = (day) => {
    return posts.filter((post) => {
      const postDate = new Date(post.createdAt);
      return postDate.getDate() === day &&
        postDate.getMonth() === currentMonth &&
        postDate.getFullYear() === currentYear;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {monthNames[currentMonth]} {currentYear}
      </h1>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'].map((day) => (
          <div key={day} className="text-center font-bold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const postsForDay = day ? getPostsForDay(day) : [];
          return (
            <div
              key={index}
              className={`min-h-24 p-2 rounded-lg border-2 ${
                day === today.getDate() && currentMonth === today.getMonth()
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              } ${day ? 'bg-white' : 'bg-gray-100'}`}
            >
              {day && (
                <div>
                  <p className="font-bold text-gray-800 mb-1">{day}</p>
                  <div className="space-y-1">
                    {postsForDay.map((post) => (
                      <div
                        key={post.id}
                        className={`text-xs p-1 rounded truncate text-white text-center ${
                          post.published ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      >
                        Post
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Publicado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Programado</span>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
