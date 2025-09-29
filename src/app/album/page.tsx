// src/app/album/page.tsx
import Link from 'next/link';

export default function Album() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">앨범 화면</h1>
          <Link href="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            홈으로
          </Link>
        </div>
        <p className="text-lg">여기에 앨범 기능을 추가하세요.</p>
      </div>
    </div>
  );
}