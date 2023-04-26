**Chrome Extension 101**

# I. Main concepts
---

# 1. Manifest (M) file

- Là file config extension dưới dạng JSON. Bao gồm phiên bản manifest (!), cấu hình quyền của ext, khai báo các file script để ext hoạt động hoặc các file phương tiện cho phần UI (như icon mặc định, ...) của ext.
- Xem thêm về cú pháp và các key của file M tại: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json

---

# 2. Content script (C) files

- Các file CS phụ trách việc thay đổi nội dung của browser và sẽ khởi chạy khi ext được load thành công lên trình duyệt.
- 1 ext có thể có nhiều file CS, được liệt kê trong 1 array ở file M.
- Khi ext hoạt động, các file CS sẽ được gộp vào một môi trường thực thi chung. Do đó nếu có một file phụ thuộc vào file khác (ví dụ tạo instance mới từ constructor của file khác), thì việc liệt kê file theo thứ tự là cần thiết để code có thể thực thi chính xác (mà không cần đến cú pháp export/import). Điều này cũng tương tự việc phải khai báo biến trước khi sử dụng nó (bỏ qua vấn đề hoisting).

---

# 3. Background script (B) file
- Ở manifest V3 được gọi là service worker.
- Là file chạy ẩn (vẫn hoạt động kể cả khi ext không được kích hoạt).
- Do chạy ẩn nên không thể trực tiếp degug B bằng browser console, mà phải sử dụng chức năng **"Inspect views"** trong phần quản lý ext của browser.
- File B chịu trách nhiệm tương tác với các file C để lắng nghe sự kiện, gọi API hoặc thay đổi cấu hình browser.
- File B có một scope thực thi riêng biệt so với các file C.
- Mỗi khi click icon, popup sẽ bị reload.

---

# 4. Popup

- Có thể được xem là phần GUI của ext.
- Cần 1 file .html cho phần giao diện tĩnh (static page) và một file C phụ trách logic tương tác. Nhưng logic này sẽ không liên quan gì đến nội dung trên trang mà chỉ gói gọn trong phạm vi cửa sổ popup.

_=> Làm thế nào để liên lạc giữa các file C thay đổi nội dung trang với popup?_

# 5. Override

- Ext có thể thay thế tab hiện tại mặc định của trình duyệt bằng 1 trang tùy chỉnh. (vd, sử dụng key "newtab" trong M).

# 6. Manifest V3
