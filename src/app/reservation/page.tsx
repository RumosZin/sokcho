// src/app/reservation/page.tsx
'use client';
import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import { TIME_SLOT_NAMES } from '@/constants/time';
import { useState } from 'react';

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // 임시 예약 데이터
  const reservations = [
    {
      id: 1,
      guestName: '김철수',
      comments: '조용한 방 부탁드립니다',
      startDate: '2025-10-15',
      startTimeSlot: 'evening',
      endDate: '2025-10-16',
      endTimeSlot: 'morning'
    },
    {
      id: 2,
      guestName: '이영희',
      comments: '',
      startDate: '2025-10-16',
      startTimeSlot: 'afternoon',
      endDate: '2025-10-23',
      endTimeSlot: 'afternoon'
    }
  ];

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  // 특정 날짜에 예약이 있는지 확인
  const getReservationsForDate = (dateStr: string) => {
    return reservations.filter(reservation => {
      return dateStr >= reservation.startDate && dateStr <= reservation.endDate;
    });
  };

  const selectedDateReservations = selectedDate ? getReservationsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <Button href="/">홈으로 🏠</Button>
          <Button href="/reservation/write">예약하기 🔑</Button>
        </div>

        {/* 캘린더 영역 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <Calendar
            year={currentYear}
            month={currentMonth}
            onDateClick={handleDateClick}
            mode="view"
            selectedDate={selectedDate}
            reservations={reservations}
          />
        </div>

        {/* 선택된 날짜의 예약 정보 */}
        {selectedDate && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              {selectedDate} 예약 정보
            </h3>
            
            {selectedDateReservations.length > 0 ? (
              <div className="space-y-4">
                {selectedDateReservations.map((reservation) => (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{reservation.guestName}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium w-16">입장 ➡️</span>
                        <span>{reservation.startDate} {TIME_SLOT_NAMES[reservation.startTimeSlot]}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-16">퇴장 ⬅️</span>
                        <span>{reservation.endDate} {TIME_SLOT_NAMES[reservation.endTimeSlot]}</span>
                      </div>
                    </div>
                    {reservation.comments && (
                      <div className="mt-2 text-sm flex items-center">
                        <span>{reservation.comments}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">이 날짜에는 예약이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}