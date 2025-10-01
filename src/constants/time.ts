export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export const TIME_SLOT_NAMES: Record<TimeSlot, string> = {
  morning: '아침',
  afternoon: '점심',
  evening: '저녁'
};

export const TIME_SLOTS: TimeSlot[] = ['morning', 'afternoon', 'evening'];