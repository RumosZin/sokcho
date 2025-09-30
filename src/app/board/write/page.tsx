// src/app/board/write/page.tsx
'use client';
import Button from '@/components/Button';
import { useToast } from '@/contexts/ToastContext';
import { getButtonClasses } from '@/constants/colors'; // 추가
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WritePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!title.trim() || !content.trim()) {
      showToast('제목과 내용을 모두 입력해주세요.', 'error');
      return;
    }

    // 여기서 실제로는 API로 데이터를 전송해야 합니다
    console.log('게시글 작성:', { title, content });
    
    // 즉시 게시판 목록으로 이동
    router.push('/board');
    
    // 성공 토스트 표시 - 'create' 타입 사용
    showToast('게시글을 작성했습니다.', 'create');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <Button href="/">
            홈으로 🏠
          </Button>
          <Button href="/board">
            목록으로 ↩️
          </Button>
        </div>

        {/* 게시글 작성 폼 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* 제목 입력 */}
            <div className="mb-6">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                placeholder="제목을 입력하세요"
              />
            </div>

            {/* 구분선 */}
            <div className="border-b border-gray-200 mb-6"></div>

            {/* 내용 입력 */}
            <div className="mb-8">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-80 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent resize-vertical"
                placeholder="내용을 입력하세요"
              />
            </div>

            {/* 작성 버튼 */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => router.push('/board')}
                className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg shadow border border-gray-50 transition-colors duration-200"
              >
                취소
              </button>
              <button
                type="submit"
                className={getButtonClasses('create')} // colors.ts 사용
              >
                작성완료 ✅
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}