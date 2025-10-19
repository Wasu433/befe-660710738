import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, PlusCircleIcon, LogoutIcon } from '@heroicons/react/outline';

const AllBookPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ โหลดข้อมูลหนังสือทั้งหมด
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/v1/books/');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลหนังสือได้');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  // ✅ ลบหนังสือ
  const handleDelete = async (id) => {
    if (!window.confirm('แน่ใจหรือไม่ที่จะลบหนังสือเล่มนี้?')) return;
    try {
      const res = await fetch(`/api/v1/books/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('ลบหนังสือไม่สำเร็จ');
      setBooks((prev) => prev.filter((b) => b.id !== id));
      alert('ลบหนังสือสำเร็จ!');
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
  };

  // ✅ ไปหน้าแก้ไขหนังสือ
  const handleEdit = (id) => {
    navigate(`/store-manager/edit-book/${id}`);
  };

  // ✅ ไปหน้าเพิ่มหนังสือ
  const handleAddBook = () => {
    navigate('/store-manager/add-book');
  };

  // ✅ ออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold">BookStore - รายการหนังสือทั้งหมด</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
          >
            <LogoutIcon className="h-5 w-5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">📚 ตารางรายการหนังสือทั้งหมด</h2>
          <button
            onClick={handleAddBook}
            className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-lg transition"
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>เพิ่มหนังสือใหม่</span>
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
        ) : error ? (
          <p className="text-red-500">เกิดข้อผิดพลาด: {error}</p>
        ) : books.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีหนังสือในระบบ</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-6">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-sky-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">ชื่อหนังสือ</th>
                  <th className="px-4 py-2 text-left">ผู้แต่ง</th>
                  <th className="px-4 py-2 text-left">ISBN</th>
                  <th className="px-4 py-2 text-left">ปีที่ตีพิมพ์</th>
                  <th className="px-4 py-2 text-left">ราคา</th>
                  <th className="px-4 py-2 text-center">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{book.id}</td>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.isbn}</td>
                    <td className="px-4 py-2">{book.year}</td>
                    <td className="px-4 py-2">{book.price} บาท</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(book.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllBookPage;
