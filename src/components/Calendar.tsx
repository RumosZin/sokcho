// src/components/Calendar.tsx
import { getCalendarData, getDateButtonStyle, formatDateString } from '@/utils/calendar';

interface CalendarProps {
  year: number;
  month: number;
  onDateClick: (dateStr: string) => void;
  onYearMonthChange?: (year: number, month: number) => void; // 추가
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
  onYearMonthChange, // 추가
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

  const handlePrevMonth = () => {
    if (onYearMonthChange) {
      if (month === 0) {
        onYearMonthChange(year - 1, 11);
      } else {
        onYearMonthChange(year, month - 1);
      }
    }
  };

  const handleNextMonth = () => {
    if (onYearMonthChange) {
      if (month === 11) {
        onYearMonthChange(year + 1, 0);
      } else {
        onYearMonthChange(year, month + 1);
      }
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onYearMonthChange) {
      onYearMonthChange(parseInt(e.target.value), month);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onYearMonthChange) {
      onYearMonthChange(year, parseInt(e.target.value));
    }
  };

  // 년도 옵션 생성 (현재 년도 기준 ±5년)
  const yearOptions = [];
  for (let i = year - 5; i <= year + 5; i++) {
    yearOptions.push(i);
  }

  return (
    <div>
      {/* 년월 선택 헤더 */}
      <div className="flex items-center justify-between mb-4">
        {onYearMonthChange && (
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            ←
          </button>
        )}
        
        <div className="flex items-center gap-2">
          {onYearMonthChange ? (
            <>
              <select
                value={year}
                onChange={handleYearChange}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {yearOptions.map(yearOption => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}년
                  </option>
                ))}
              </select>
              <select
                value={month}
                onChange={handleMonthChange}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {monthNames.map((monthName, index) => (
                  <option key={index} value={index}>
                    {monthName}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <h2 className="text-2xl font-bold text-center">
              {year}년 {monthNames[month]}
            </h2>
          )}
        </div>

        {onYearMonthChange && (
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            →
          </button>
        )}
      </div>

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
            disabled={!day || (day < today.getDate() && month === today.getMonth() && year === today.getFullYear())}
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