// src/components/Calendar.tsx
import { getCalendarData, getDateButtonStyle, formatDateString } from '@/utils/calendar';

interface CalendarProps {
  year: number;
  month: number;
  onDateClick: (dateStr: string) => void;
  mode: 'view' | 'write';
  selectedDate?: string;
  startDate?: string;
  endDate?: string;
  reservations?: any[];
}

export default function Calendar({
  year,
  month,
  onDateClick,
  mode,
  selectedDate,
  startDate,
  endDate,
  reservations = []
}: CalendarProps) {
  const today = new Date();
  const { calendarDays, monthNames, dayNames } = getCalendarData(year, month);

  const handleDateClick = (day: number | null) => {
    if (!day) return;
    const dateStr = formatDateString(year, month, day);
    onDateClick(dateStr);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {year}년 {monthNames[month]}
      </h2>
      <p className="text-center text-gray-600 mb-6">
        {mode === 'view' 
          ? '날짜를 클릭하여 예약 정보를 확인하세요'
          : '시작일을 먼저 선택하고, 종료일을 선택해주세요'
        }
      </p>
      
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-bold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* 캘린더 날짜들 */}
      <div className="grid grid-cols-7 gap-1 mb-8">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            disabled={!day || (day < today.getDate() && month === today.getMonth())}
            className={`h-12 rounded-lg font-medium transition-colors duration-200 ${
              getDateButtonStyle(day, today, month, year, {
                selectedDate,
                startDate,
                endDate,
                reservations: mode === 'view' ? reservations : undefined
              })
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 선택된 날짜 표시 (작성 모드일 때만) */}
      {mode === 'write' && (
        <div className="mt-6 space-y-2">
          {startDate && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="font-medium">시작일: {startDate}</span>
            </div>
          )}
          {endDate && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="font-medium">종료일: {endDate}</span>
            </div>
          )}
        </div>
      )}

      {/* 범례 (조회 모드일 때만) */}
      {mode === 'view' && (
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-100 rounded"></div>
            <span>예약 가능</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-100 rounded"></div>
            <span>예약 있음</span>
          </div>
        </div>
      )}
    </div>
  );
}