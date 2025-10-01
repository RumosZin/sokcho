// src/constants/colors.ts
export const BUTTON_COLORS = {
  create: {
    bg: 'bg-blue-50',
    hover: 'hover:bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-50',
  },
  edit: {
    bg: 'bg-yellow-50',
    hover: 'hover:bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-50',
  },
  delete: {
    bg: 'bg-red-50',
    hover: 'hover:bg-red-100',
    text: 'text-red-800',
    border: 'border-red-50',
  },
  success: {
    bg: 'bg-green-50',
    hover: 'hover:bg-green-100',
    text: 'text-green-800',
    border: 'border-green-50',
  },
  error: {
    bg: 'bg-red-50',
    hover: 'hover:bg-red-100',
    text: 'text-red-800',
    border: 'border-red-50',
  },
  info: {
    bg: 'bg-blue-50',
    hover: 'hover:bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-50',
  }
} as const;

export const getButtonClasses = (type: keyof typeof BUTTON_COLORS) => {
  const colors = BUTTON_COLORS[type];
  return `${colors.bg} ${colors.hover} ${colors.text} font-bold py-3 px-6 rounded-lg shadow border ${colors.border} transition-colors duration-200`;
};

export const getToastClasses = (type: keyof typeof BUTTON_COLORS) => {
  const colors = BUTTON_COLORS[type];
  return `${colors.bg} ${colors.hover} ${colors.text} ${colors.border}`;
};