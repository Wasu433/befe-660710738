import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
 
const NewBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const API_BASE = process.env.REACT_APP_API_URL || '';
 
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/v1/books/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch books');
        const raw = await res.json();
        const arr = Array.isArray(raw) ? raw : raw?.data || [];
 
        // เรียงตาม created_at จากใหม่ → เก่า แล้วเอา 5 รายการ
        const latest = [...arr]
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 5);
 
        setBooks(latest);
        setError(null);
      } catch (e) {
        setError(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
 
    fetchBooks();
  }, [API_BASE]);
 
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-56 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }
 
  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }
 
  if (books.length === 0) {
    return <div className="text-center py-8 text-gray-500">ยังไม่มีหนังสือในระบบ</div>;
  }
 
  // ให้การ์ดสูงเท่ากัน
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-stretch">
      {books.map((b) => (
        <div key={b.id ?? b.isbn ?? `${b.title}-${b.author}`} className="h-full flex flex-col">
          <BookCard book={b} />
        </div>
      ))}
    </div>
  );
};
 
export default NewBook;