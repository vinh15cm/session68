import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getValue = localStorage.getItem("books");
    if (getValue) {
      setListBooks(JSON.parse(getValue));
    }
  }, []);

  const [listBooks, setListBooks] = useState(() => {
    const getValue = localStorage.getItem("books");
    return getValue ? JSON.parse(getValue) : [];
  });

  const [formData, setFormData] = useState({
    bookName: "",
    studentName: "",
    borrowDate: "",
    returnDate: "",
    status: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      id: Math.floor(Math.random() * 100000000),
    };
    const updatedListBooks = [...listBooks, newFormData];
    setListBooks(updatedListBooks);
    localStorage.setItem("books", JSON.stringify(updatedListBooks));
    dispatch({
      type: "ADD",
      payload: newFormData,
    });
    setIsOpen(false);
  };

  const handleFilter = (status: string) => {
    console.log(status);

    dispatch({
      type: status,
      payload: listBooks,
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-3">
        <h2>
          <strong>Quản lí mượn sách</strong>
        </h2>
        <div className="d-flex gap-2">
          <div>
            <select
              className="form-select"
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="All">Chọn bộ lọc</option>
              <option value="True">Đã trả</option>
              <option value="False">Chưa trả</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
              Thêm thông tin
            </button>
          </div>
        </div>
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <h2>Thêm thông tin mượn sách</h2>
            <form onSubmit={handleSubmit}>
              <label>Tên sách:</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleInputChange}
              />

              <label>Tên người mượn:</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
              />

              <label>Ngày mượn:</label>
              <input
                type="date"
                name="borrowDate"
                value={formData.borrowDate}
                onChange={handleInputChange}
              />

              <label>Ngày trả:</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
              />

              <div style={{ marginTop: "10px" }}>
                <button className="btn btn-primary me-2" type="submit">
                  Lưu
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 999,
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
