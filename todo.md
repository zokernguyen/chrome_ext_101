**Chrome Extension 101**
_(with Manifest V3)_

# I. Main concepts
---

# 1. Manifest (M) file

- Là file config extension dưới dạng JSON. Bao gồm phiên bản manifest (!), cấu hình quyền của ext, khai báo các file script để ext hoạt động hoặc các file phương tiện cho phần UI (như icon mặc định, ...) của ext.
- Xem thêm về cú pháp và các key của file M tại: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json

---

# 2. Content script (C) files

- Các file CS phụ trách việc thay đổi nội dung trên trình duyệt bằng cách tác động đến mã JS của browser. CS sẽ khởi chạy khi ext được load thành công lên trình duyệt.
- 1 ext có thể có nhiều file CS, được liệt kê trong 1 array ở file M.
- Khi ext hoạt động, các file CS sẽ được gộp vào một môi trường thực thi chung. Do đó nếu có một file phụ thuộc vào file khác (ví dụ tạo instance mới từ constructor của file khác), thì việc liệt kê file theo thứ tự là cần thiết để code có thể thực thi chính xác (mà không cần đến cú pháp export/import). Điều này cũng tương tự việc phải khai báo biến trước khi sử dụng nó (bỏ qua vấn đề hoisting).
- Có thể debug bằng browser console.
- Mặc dù các file CS có thể điều khiển nội dung của trang web nhưng chúng lại bị hạn chế về khả năng tương tác với trình duyệt và các phần khác của ext. Đó là lý do chúng ta cần đến...

---

# 3. Background script (BGS) file
- Ở manifest V3 được gọi là service worker.
- Là file chạy ẩn (vẫn hoạt động kể cả khi ext không được kích hoạt).
- Do chạy ẩn nên không thể trực tiếp degug BGS bằng browser console, mà phải sử dụng chức năng **"Inspect views"** trong phần quản lý ext của browser.
- File BGS có một scope thực thi riêng biệt so với các file CS.
- Code trong BGS không thể trực tiếp tác động đến mã JS của browser.
- BGS chịu trách nhiệm xử lý các sự kiện và thực hiện các tác vụ không liên quan đến nội dung của trang web. Nó có thể tương tác với chính trình duyệt, truy cập API và giao tiếp với các phần khác của ext. Cụ thể, nó có thể lắng nghe sự kiện user click vào biểu tượng ext, sự kiện browser bị tắt đi/khởi động lên hoặc một tab mới được mở. Nó cũng có thể gửi và nhận dữ liệu từ máy chủ từ xa, quản lý bộ nhớ hoặc cập nhật UI của ext.

> Để dễ hình dung, hãy tưởng tượng một chiếc TV. Những gì đang được hiển thị trên màn ảnh cũng tương đương với nội dung của trang web, là thứ nằm trên foreground mà các CS có thể trực tiếp tác động đến và làm thay đổi. Còn các nút điều khiển của TV như chuyển kênh, tăng giảm âm lượng, tùy chỉnh... có thể được xem là phần giao diện của browser với các nút Home, Reload, Open Boookmarks... Chúng thuộc về phần background và cần đến các service worker/ BGS để xử lý.

---

# 4. Popup (P)

- Nó có thể bị nhầm lẫn là một phần của browser UI (thuộc phần background), vì chúng ta kích hoạt nó bằng cách click vào một icon trên browser UI. Tuy vậy, P là một thành phần riêng biệt hoàn toàn, không thuộc về foreground hay background, mà có thể được xem là GUI của ext.
- Cần 1 file .html cho phần giao diện tĩnh (static page) và một file phụ trách logic tương tác của riêng P.
- Mỗi khi click vào ext icon, P sẽ bị reload.

---

# 5. Sending messeges to receiver.

- Là cách để các thành phần của ext có thể giao tiếp với nhau.
- Ví dụ trong ext tra từ điển, người dùng tương tác với foreground (trên P) để bôi đen từ cần tra hoặc nhập từ cần tra trên P. Khi đó 1 file CS lắng nghe sự kiện bôi đen từ trên trang hoặc file xử lý logic của P sẽ cần thực hiện việc gửi đi thông tin về từ cần tra này cho BGS. Khi nhận được thông tin, BGS tiếp tục gọi API tới một từ điển online để tra cứu và nhận kết quả, sau đó BGS mới mang kết quả này gửi ngược về cho CS trên trang hoặc P để hiển thị kết quả cho người dùng.
- Cần lưu ý rằng các CS chỉ có thể tương tác với nhau khi chúng ở trên cùng 1 tab, hay có cùng ngữ cảnh/context (sử dụng tabs.sendMessage để gửi msg). Khi cần giao tiếp giữa các tab khác nhau thì phải có thêm một bước nhận/gửi thông tin qua trung gian là BGS (sử dụng runtime.sendMessage để gửi msg).
- Ví dụ: editor_cs cho phép đánh dấu văn bản trên trang còn popup_cs giúp hiển thị các đoạn văn bản đã đánh dấu leen P, đồng thời cung cấp một btn để xóa đoạn băn bản đã đánh dấu. Trên cùng 1 tab, 2 cs này có thể liên lạc trực tiếp với nhau để ngay lập tức hiển thị đoạn text đã đánh dấu. Nhưng khi đứng ở tab (2), mở P để xóa 1 đoạn text đã đánh dấu nằm trên tab (1), thì sẽ cần có sự tham gia của BGS.

---

# 6. Override

- Ext có thể thay thế tab hiện tại mặc định của trình duyệt bằng 1 trang tùy chỉnh. (vd, sử dụng key "newtab" trong M).

---

# 7. Context menu

- Cần cấp quyền trong M ("contextMenus"), dùng để tạo thêm mục lựa chọn tương tác với ext trong menu sổ ra khi click chuột phải trên trình duyệt.
- Logic của context menu do BGS xử lý.

---

# 8. Options page

- Cũng là một trang dạng html của ext (giống popup), được sử dụng làm trang tùy chỉnh setting của ext. Có thể truy cập bằng context menu khi click phải icon ext.
- Cần được khai báo trong M.
- Ngoài popup và option page, ext còn có thể có nhiều trang html khác như trang override (ghi đè trang tab mới của browser) hay trang sandbox.

# II. Manifest V3
