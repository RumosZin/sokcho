// src/app/board/[id]/edit/page.tsx
'use client';
import Button from '@/components/Button';
import { useToast } from '@/contexts/ToastContext';
import { getButtonClasses } from '@/constants/colors'; // 추가
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // 임시 게시글 데이터 (실제로는 API에서 가져와야 함)
  const posts = [
    { id: 1, title: '첫 번째 게시글입니다', content: '첫 번째 게시글의 내용입니다. 이것은 조금 더 긴 내용으로 말줄임표가 어떻게 작동하는지 보여주는 예시입니다. 여기에는 더 자세한 내용이 들어갑니다.\n\n이것은 두 번째 단락입니다. 게시글의 전체 내용을 볼 수 있습니다.', date: '2024-01-15', author: '작성자1' },
    { id: 2, title: '두 번째 게시글입니다', content: '두 번째 게시글의 내용입니다.\n\n이 게시글에는 더 많은 정보가 포함되어 있습니다.', date: '2024-01-14', author: '작성자2' },
    { id: 3, title: '세 번째 게시글입니다', content: '세 번째 게시글의 내용입니다. 이것도 긴 내용으로 작성해보겠습니다.\n\n여러 단락으로 구성된 내용입니다.', date: '2024-01-13', author: '작성자3' },
    { id: 4, title: '네 번째 게시글입니다', content: '네 번째 게시글의 내용입니다.', date: '2024-01-12', author: '작성자4' },
    { id: 5, title: '다섯 번째 게시글입니다', content: '다섯 번째 게시글의 내용입니다.', date: '2024-01-11', author: '작성자5' },
    { id: 6, title: '여섯 번째 게시글입니다', content: '여섯 번째 게시글의 내용입니다.', date: '2024-01-10', author: '작성자6' },
    { id: 7, title: '일곱 번째 게시글입니다', content: '일곱 번째 게시글의 내용입니다.', date: '2024-01-09', author: '작성자7' },
  ];

  // 게시글 데이터 로드
  useEffect(() => {
    const post = posts.find(p => p.id === parseInt(postId as string));
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
    setLoading(false);
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!title.trim() || !content.trim()) {
      showToast('제목과 내용을 모두 입력해주세요.', 'error');
      return;
    }

    // 여기서 실제로는 API로 수정된 데이터를 전송해야 합니다
    console.log('게시글 수정:', { id: postId, title, content });
    
    // 수정 완료 후 해당 게시글 상세 페이지로 이동
    router.push(`/board/${postId}`);
    
    // 성공 토스트 표시 - 'edit' 타입 사용
    showToast('게시글이 수정되었습니다.', 'edit');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <Button href="/">
            홈으로 🏠
          </Button>
          <Button href={`/board/${postId}`}>
            목록으로 ↩️
          </Button>
        </div>

        {/* 게시글 수정 폼 */}
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

            {/* 수정 버튼 */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => router.push(`/board/${postId}`)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg shadow border border-gray-50 transition-colors duration-200"
              >
                취소
              </button>
              <button
                type="submit"
                className={getButtonClasses('edit')} // colors.ts 사용
              >
                수정완료 ✏️
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}