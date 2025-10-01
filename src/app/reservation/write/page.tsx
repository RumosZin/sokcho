// src/app/reservation/write/page.tsx
'use client';
import Button from '@/components/Button';
import Calendar from '@/components/Calendar';
import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { getButtonClasses } from '@/constants/colors';
import { useRouter } from 'next/navigation';

type TimeSlot = 'morning' | 'afternoon' | 'evening';

export default function ReservationWrite() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startTimeSlot, setStartTimeSlot] = useState<TimeSlot>('evening');
  const [endTimeSlot, setEndTimeSlot] = useState<TimeSlot>('morning');
  const [guestName, setGuestName] = useState('');
  const [comments, setComments] = useState('');
  const { showToast } = useToast();
  const router = useRouter();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const handleDateClick = (dateStr: string) => {
    // 시작 날짜가 없거나, 클릭한 날짜가 시작 날짜보다 이전이면 시작 날짜로 설정
    if (!startDate || dateStr < startDate) {
      setStartDate(dateStr);
      setEndDate(''); // 시작 날짜 변경 시 끝 날짜 초기화
    } 
    // 시작 날짜가 있고, 클릭한 날짜가 시작 날짜와 같거나 이후면 끝 날짜로 설정
    else if (dateStr >= startDate) {
      setEndDate(dateStr);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate || !guestName.trim()) {
      showToast('시작일, 종료일, 예약자 성명을 모두 입력해주세요.', 'error');
      return;
    }

    // 예약 데이터 생성
    const reservationData = {
      id: Date.now(), // 임시 ID (실제로는 서버에서 생성)
      guestName,
      comments,
      startDate,
      startTimeSlot,
      endDate,
      endTimeSlot
    };

    console.log('예약 정보:', reservationData);

    // 예약 완료 후 예약 조회 페이지로 이동
    router.push('/reservation');
    showToast('예약이 완료되었습니다.', 'success');
  };
  const timeSlotNames = {
    morning: '아침',
    afternoon: '점심', 
    evening: '저녁'
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <Button href="/">
            홈으로 🏠
          </Button>
          <Button href="/reservation">
            목록으로 ↩️
          </Button>
        </div>

        
          {/* 캘린더 영역 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <Calendar
              year={currentYear}
              month={currentMonth}
              onDateClick={handleDateClick}
              mode="write"
              startDate={startDate}
              endDate={endDate}
            />
          </div>

          {/* 예약 정보 입력 영역 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 예약자 성명 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  예약자 성명 *
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="성명을 입력하세요"
                />
              </div>

              {/* 시작일 시간대 */}
              {startDate && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    시작일 시간대
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['morning', 'afternoon', 'evening'] as TimeSlot[]).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setStartTimeSlot(slot)}
                        className={`py-2 px-3 rounded-lg font-medium transition-colors duration-200 ${
                          startTimeSlot === slot
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300'
                        }`}
                      >
                        {timeSlotNames[slot]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 종료일 시간대 */}
              {endDate && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    종료일 시간대
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['morning', 'afternoon', 'evening'] as TimeSlot[]).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setEndTimeSlot(slot)}
                        className={`py-2 px-3 rounded-lg font-medium transition-colors duration-200 ${
                          endTimeSlot === slot
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300'
                        }`}
                      >
                        {timeSlotNames[slot]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 기타사항 */}
              <div>
			  	<label className="block text-sm font-bold text-gray-700 mb-2">
                  기타사항
                </label>
                <input
                  type="text"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="기타사항이 있다면 입력해주세요"
                />
              </div>

              {/* 예약 요약 */}
              {startDate && endDate && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">입장 ➡️ </span> {startDate} {timeSlotNames[startTimeSlot]}</p>
                    <p><span className="font-medium">퇴장 ⬅️ </span> {endDate} {timeSlotNames[endTimeSlot]}</p>
                    {guestName && <p><span className="font-medium">예약자:</span> {guestName}</p>}
                    {comments && <p><span className="font-medium">기타사항:</span> {comments}</p>}
                  </div>
                </div>
              )}

              {/* 예약 버튼 */}
              <button
                type="submit"
                className={`w-full ${getButtonClasses('success')} mt-6`}
                disabled={!startDate || !endDate || !guestName.trim()}
              >
                예약하기 🔑
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}