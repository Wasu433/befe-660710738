// src/pages/EditBookPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    year: "",
    price: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/v1/books/${id}`);
      if (!res.ok) {
        alert("ไม่พบหนังสือ");
        navigate("/store-manager/all-book");
        return;
      }
      const data = await res.json();
      setBook(data);
    };
    fetchBook();
  }, [id, navigate]);

  const handleSave = async () => {
    const res = await fetch(`/api/v1/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert("✅ แก้ไขข้อมูลเรียบร้อย!");
      navigate("/store-manager/all-book");
    } else {
      alert("❌ แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-700">✏️ แก้ไขข้อมูลหนังสือ</h2>

        <label className="block mb-2 font-medium">ชื่อหนังสือ</label>
        <input
          type="text"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">ผู้แต่ง</label>
        <input
          type="text"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">ISBN</label>
        <input
          type="text"
          value={book.isbn}
          onChange={(e) => setBook({ ...book, isbn: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">ปีที่ตีพิมพ์</label>
        <input
          type="number"
          value={book.year}
          onChange={(e) => setBook({ ...book, year: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-medium">ราคา</label>
        <input
          type="number"
          value={book.price}
          onChange={(e) => setBook({ ...book, price: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/store-manager/all-book")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}                                                            
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            บันทึกการแก้ไข
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
