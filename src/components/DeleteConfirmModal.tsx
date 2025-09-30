// src/components/DeleteConfirmModal.tsx
interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
  }
  
  export default function DeleteConfirmModal({ 
	isOpen, 
	onClose, 
	onConfirm, 
	title = "게시글" 
  }: DeleteConfirmModalProps) {
	if (!isOpen) return null;
  
	return (
	  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
		<div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
		  <div className="text-center">
			<div className="text-4xl mb-4">🗑️</div>
			<h3 className="text-lg font-bold text-gray-900 mb-2">
			[ <span className="truncate inline-block max-w-48 align-bottom">{title}</span> ] 삭제
			</h3>
			<p className="text-gray-600 mb-6">
			  삭제한 내용은 복구할 수 없습니다.
			</p>
			<div className="flex gap-3 justify-center">
			  <button
				onClick={onClose}
				className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg shadow border border-gray-50 transition-colors duration-200"
			  >
				취소
			  </button>
			  <button
				onClick={onConfirm}
				className="bg-red-50 hover:bg-red-100 text-red-800 font-bold py-2 px-4 rounded-lg shadow border border-red-50 transition-colors duration-200"
			  >
				삭제
			  </button>
			</div>
		  </div>
		</div>
	  </div>
	);
  }