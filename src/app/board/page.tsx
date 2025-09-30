// src/app/board/page.tsx
'use client';
import Link from 'next/link';
import Button from '@/components/Button';
import { useState } from 'react';

export default function Board() {
  // 임시 게시글 데이터
  const posts = [
    { id: 1, title: '첫 번째 게시글입니다', content: '첫 번째 게시글의 내용입니다. 이것은 조금 더 긴 내용으로 말줄임표가 어떻게 작동하는지 보여주는 예시입니다.' },
    { id: 2, title: '두 번째 게시글입니다', content: '두 번째 게시글의 내용입니다.' },
    { id: 3, title: '세 번째 게시글입니다', content: '세 번째 게시글의 내용입니다. 이것도 긴 내용으로 작성해보겠습니다.' },
    { id: 4, title: '네 번째 게시글입니다', content: '네 번째 게시글의 내용입니다.' },
    { id: 5, title: '다섯 번째 게시글입니다', content: '다섯 번째 게시글의 내용입니다.' },
    { id: 6, title: '여섯 번째 게시글입니다', content: '여섯 번째 게시글의 내용입니다.' },
    { id: 7, title: '일곱 번째 게시글입니다', content: '일곱 번째 게시글의 내용입니다.' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 현재 페이지에 표시할 게시글 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
		<Button href="/">
			홈으로 🏠
		</Button>
		<Button href="/board/write">
			글쓰기 ✍🏼
		</Button>
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="divide-y divide-gray-200">
            {currentPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/board/${post.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <p className="font-bold text-gray-900 flex-shrink-0">
                    {post.title}
                  </p>
                  <p className="text-gray-600 font-normal flex-1 truncate">
                    {post.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-white hover:bg-blue-50 text-gray-800 font-bold shadow-lg border-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            이전
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-2 rounded-lg font-bold shadow-lg border-gray-200 transition-colors duration-200 ${
                currentPage === pageNumber
                  ? 'bg-blue-50 text-gray-800'
                  : 'bg-white hover:bg-blue-50 text-gray-800'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-white hover:bg-blue-50 text-gray-800 font-bold shadow-lg border-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}