import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const FeaturedBooks = () => {
  // 🔹 สร้าง state สำหรับข้อมูลหนังสือ, โหลด, และ error
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        // 🔹 เรียก API จริง (proxy จะชี้ไปที่ backend)
        const response = await fetch('/api/v1/books/');

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();

        // 🔹 สุ่มหนังสือมา 3 เล่ม
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setFeaturedBooks(selected);
        setError(null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 🔹 แสดงสถานะ Loading
  if (loading) {
    return (
      <div className="text-center py-8 col-span-full text-gray-600">
        กำลังโหลดข้อมูลหนังสือ...
      </div>
    );
  }

  // 🔹 แสดง Error ถ้าเกิดปัญหา
  if (error) {
    return (
      <div className="text-center py-8 col-span-full text-red-600">
        Error: {error}
      </div>
    );
  }

  // 🔹 แสดงรายการหนังสือแนะนำ
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredBooks.length > 0 ? (
        featuredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))
      ) : (
        <div className="text-center py-8 col-span-full text-gray-600">
          ไม่มีข้อมูลหนังสือแนะนำ
        </div>
      )}
    </div>
  );
};

export default FeaturedBooks;
