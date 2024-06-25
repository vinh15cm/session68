import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ManagementBooks() {
  const listBooks: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [id, setID] = useState();
  const [formData, setFormData] = useState({
    bookName: "",
    studentName: "",
    borrowDate: "",
    returnDate: "",
  });

  const openModal = (book: any) => {
    setShowModal(true);
    setID(book.id);
    setFormData({
      bookName: book.bookName,
      studentName: book.studentName,
      borrowDate: book.borrowDate,
      returnDate: book.returnDate,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleStatusChange = (id: number, status: string) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: { id, status: status === "Đã trả" },
    });
  };

  const handleEdits = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    dispatch({
      type: "EDIT",
      payload: formData,
      payload2: id,
    });
    closeModal();
  };

  const handleDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  return (
    <div className="container">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {listBooks.map((item: any, index: any) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.bookName}</td>
              <td>{item.studentName}</td>
              <td>{item.borrowDate}</td>
              <td>{item.returnDate}</td>
              <td>
                <select
                  value={item.status ? "Đã trả" : "Chưa trả"}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                >
                  <option value="Đã trả">Đã trả</option>
                  <option value="Chưa trả">Chưa trả</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => openModal(item)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Sửa thông tin sách</h2>
            <form>
              <label>Tên sách:</label>
              <input
                name="bookName"
                value={formData.bookName}
                onChange={handleEdits}
                type="text"
              />
              <label>Sinh viên mượn:</label>
              <input
                name="studentName"
                value={formData.studentName}
                onChange={handleEdits}
                type="text"
              />
              <label>Ngày mượn:</label>
              <input
                name="borrowDate"
                value={formData.borrowDate}
                onChange={handleEdits}
                type="date"
              />
              <label>Ngày trả:</label>
              <input
                name="returnDate"
                value={formData.returnDate}
                onChange={handleEdits}
                type="date"
              />
              <button
                className="btn btn-primary mt-2"
                type="button"
                onClick={handleEdit}
              >
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
