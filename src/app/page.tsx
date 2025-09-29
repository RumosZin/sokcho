import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <nav className="flex flex-col gap-4 w-full max-w-md">
        <Link 
          href="/reservation" 
          className="bg-white hover:bg-blue-50 text-gray-800 font-bold py-4 px-8 rounded-lg shadow-lg border border-gray-200 text-center text-xl transition-colors duration-200"
        >
          예약 📅
        </Link>
        <Link 
          href="/board" 
          className="bg-white hover:bg-blue-50 text-gray-800 font-bold py-4 px-8 rounded-lg shadow-lg border border-gray-200 text-center text-xl transition-colors duration-200"
        >
          게시판 📝
        </Link>
        {/* <Link 
          href="/album" 
          className="bg-white hover:bg-blue-50 text-gray-800 font-bold py-4 px-8 rounded-lg shadow-lg border border-gray-200 text-center text-xl transition-colors duration-200"
        >
          앨범 🖼️
        </Link> */}
      </nav>
    </div>
  );
}
