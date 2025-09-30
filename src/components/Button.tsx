// src/components/Button.tsx
import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ href, children, className = "" }: ButtonProps) {
  const baseClasses = "bg-white hover:bg-blue-50 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg border border-gray-200 transition-colors duration-200";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <Link 
      href={href}
      className={combinedClasses}
    >
      {children}
    </Link>
  );
}