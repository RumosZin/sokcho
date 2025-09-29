// src/app/board/[id]/page.tsx
'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PostDetail() {
  const params = useParams();
  const postId = params.id;

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

  // 현재 게시글 찾기
  const post = posts.find(p => p.id === parseInt(postId as string));

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
          <Link 
            href="/board" 
            className="bg-white hover:bg-blue-50 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg border border-gray-200 transition-colors duration-200"
          >
            ← 목록으로
          </Link>
          <Link 
            href="/" 
            className="bg-white hover:bg-blue-50 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg border border-gray-200 transition-colors duration-200"
          >
            홈으로
          </Link>
        </div>

        {/* 게시글 내용 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 게시글 제목 */}
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          {/* 게시글 정보 */}
          <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>

          {/* 게시글 본문 */}
          <div className="text-gray-800 leading-relaxed">
            {post.content.split('\n').map((line, index) => (
              <p key={index} className="mb-4">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}