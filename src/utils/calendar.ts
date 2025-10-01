// src/utils/calendar.ts
export interface CalendarDay {
	day: number | null;
	dateStr: string;
  }
  
  export interface CalendarData {
	calendarDays: (number | null)[];
	monthNames: string[];
	dayNames: string[];
  }
  
  export const getCalendarData = (year: number, month: number): CalendarData => {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();
	const startingDayOfWeek = firstDay.getDay();
  
	const calendarDays: (number | null)[] = [];
	
	// 빈 칸 추가 (이전 달 마지막 날들)
	for (let i = 0; i < startingDayOfWeek; i++) {
	  calendarDays.push(null);
	}
	
	// 이번 달 날짜들 추가
	for (let day = 1; day <= daysInMonth; day++) {
	  calendarDays.push(day);
	}
  
	const monthNames = [
	  '1월', '2월', '3월', '4월', '5월', '6월',
	  '7월', '8월', '9월', '10월', '11월', '12월'
	];
  
	const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  
	return { calendarDays, monthNames, dayNames };
  };
  
  export const formatDateString = (year: number, month: number, day: number): string => {
	return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };
  
  export const getDateButtonStyle = (
	day: number | null,
	today: Date,
	currentMonth: number,
	currentYear: number,
	options: {
	  selectedDate?: string;
	  startDate?: string;
	  endDate?: string;
	  reservations?: any[];
	} = {}
  ): string => {
	if (!day) return 'invisible';
	
	const dateStr = formatDateString(currentYear, currentMonth, day);
	const isPast = day < today.getDate() && currentMonth === today.getMonth();
	
	// 예약 조회용 스타일
	if (options.reservations) {
	  const hasReservation = options.reservations.some(reservation => 
		dateStr >= reservation.startDate && dateStr <= reservation.endDate
	  );
	  const isSelected = options.selectedDate === dateStr;
	  
	  if (isPast) {
		return 'text-gray-300 cursor-not-allowed';
	  } else if (isSelected) {
		return 'bg-blue-500 text-white border-2 border-blue-500';
	  } else if (hasReservation) {
		return 'bg-red-100 text-red-800 border border-red-100';
	  } else {
		return 'bg-gray-50 hover:bg-blue-50 text-gray-800';
	  }
	}
	
	// 예약 작성용 스타일
	const isStart = options.startDate === dateStr;
	const isEnd = options.endDate === dateStr;
	const isInRange = options.startDate && options.endDate && 
	  dateStr > options.startDate && dateStr < options.endDate;
	
	if (isPast) {
	  return 'text-gray-300 cursor-not-allowed';
	} else if (isStart) {
	  return 'bg-blue-500 text-white border-2 border-blue-500';
	} else if (isEnd) {
	  return 'bg-green-500 text-white border-2 border-green-500';
	} else if (isInRange) {
	  return 'bg-blue-100 text-blue-800';
	} else {
	  return 'bg-gray-50 hover:bg-blue-50 text-gray-800';
	}
  };