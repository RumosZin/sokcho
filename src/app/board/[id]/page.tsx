// src/app/board/[id]/page.tsx
'use client';
import Button from '@/components/Button';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { useToast } from '@/contexts/ToastContext'; // 전역 토스트 import
import { getButtonClasses } from '@/constants/colors'; // 추가
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToast } = useToast(); 

  // 임시 게시글 데이터 (실제로는 API에서 가져와야 함)
  const posts = [
    { id: 1, title: '첫 번째 게시글입니다', content: '첫 번째 게시글의 내용입니다. 이것은 조금 더 긴 내용으로 말줄임표가 어떻게 작동하는지 보여주는 예시입니다. 여기에는 더 자세한 내용이 들어갑니다.\n\n이것은 두 번째 단락입니다. 게시글의 전체 내용을 볼 수 있습니다.', date: '2024-01-15', author: '작성자1' },
    { id: 2, title: '두 번째 게시글입니다', content: '두 번째 게시글의 내용입니다.\n\n이 게시글에는 더 많은 정보가 포함되어 있습니다.', date: '2024-01-14', author: '작성자2' },
    { id: 3, title: '세 번째 게시글입니다', content: '세 번째 게시글의 내용입니다. 이것도 긴 내용으로 작성해보겠습니다.\n\n여러 단락으로 구성된 내용입니다.', date: '2024-01-13', author: '작성자3' },
    { id: 4, title: '네 번째 게시글입니다', content: '네 번째 게시글의 내용입니다.', date: '2024-01-12', author: '작성자4' },
    { id: 5, title: '다섯 번째 게시글입니다', content: '다섯 번째 게시글의 내용입니다.', date: '2024-01-11', author: '작성자5' },
    { id: 6, title: '여섯 번째 게시글입니다', content: '여섯 번째 게시글의 내용입니다.', date: '2024-01-10', author: '작성자6' },
    { id: 7, title: '7번이지롱에베ㅔㅔㅔㅔㅔ~~~~~~~', content: '일곱 번째 게시글의 내용입니다.', date: '2024-01-09', author: '작성자7' },
  ];

  // 현재 게시글 찾기
  const post = posts.find(p => p.id === parseInt(postId as string));

  // 삭제 처리 함수
  const handleDelete = () => {
    // 여기서 실제로는 API로 삭제 요청을 보내야 합니다
    console.log('게시글 삭제:', postId);
    
    // 삭제 모달 닫기
    setIsDeleteModalOpen(false);
    
    // 즉시 페이지 이동
    router.push('/board');
    
    // 전역 토스트 표시 (페이지 이동 후에도 보임)
    showToast('게시글을 삭제했습니다.', 'delete');
  };

  if (!post) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다</h1>
            <Link 
              href="/board" 
              className="bg-white hover:bg-blue-50 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg border border-gray-200 transition-colors duration-200"
            >
              게시판으로 돌아가기
            </Link>
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
            <Button href="/board">
              목록으로 ↩️
            </Button>
        </div>

        {/* 게시글 내용 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 게시글 제목 */}
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          {/* 게시글 정보 */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4 text-gray-600">
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* 게시글 본문 */}
          <div className="text-gray-800 leading-relaxed mb-6">
            {post.content.split('\n').map((line, index) => (
              <p key={index} className="mb-4">
                {line}
              </p>
            ))}
          </div>

          {/* 수정/삭제 버튼 */}
          <div className="flex justify-end gap-2 pt-6 border-t border-gray-200">
            <button 
              onClick={() => router.push(`/board/${postId}/edit`)}
              className={`${getButtonClasses('edit')} py-2 px-4`} // colors.ts 사용, 크기만 조정
            >
              수정 ✏️
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)} 
              className={`${getButtonClasses('delete')} py-2 px-4`} // colors.ts 사용, 크기만 조정
            >
              삭제 🗑️
            </button>
          </div>
        </div>

        {/* 삭제 확인 모달 */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={post.title}
        />
      </div>
    </div>
  );
}