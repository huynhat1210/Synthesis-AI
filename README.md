# Synthesis AI — Context-Aware Dynamic Pitch Generator 🚀

**Synthesis AI** là nền tảng SaaS hỗ trợ lập trình viên, nhà thiết kế và marketer tự động hóa việc tạo ra các bản đề xuất công việc (Pitch Proposals) có tính cá nhân hóa cực cao, bám sát mô tả công việc (Job Description - JD) của nhà tuyển dụng.

Nền tảng sử dụng trí tuệ nhân tạo **Google Gemini 2.5 Flash** để phân tích bối cảnh, đối khớp kỹ năng và kinh nghiệm thực tế từ hồ sơ Master Profile của bạn để tạo nên các bài tự giới thiệu chuyên nghiệp và thuyết phục nhất.

🌐 **Trải nghiệm ứng dụng trực tuyến tại:** [https://synthesis-ai-qyfr.vercel.app/](https://synthesis-ai-qyfr.vercel.app/)

---

## 📸 Hình Ảnh Minh Họa (Product Screenshots)

### 🖥️ Bảng Điều Khiển Trung Tâm (Dashboard View)
Bảng điều khiển chính cho phép quản lý hồ sơ Master, tải lên tài liệu JD PDF và tùy biến các tham số tạo kịch bản AI:
![Synthesis AI Dashboard](public/dashboard_view.png)

### 📊 Quản Lý Kho Lưu Trữ Lịch Sử (Pitch History Archive)
Nơi lưu trữ, đánh dấu yêu thích và quản lý các bài Pitch đã tạo:
![Pitch Archive](public/pitch_archive.png)

### ❓ Trung Tâm Trợ Giúp & Hướng Dẫn (Interactive Help Guide)
Hệ thống tài liệu hướng dẫn nhanh, bộ câu hỏi FAQs thu gọn mượt mà và mẹo copywriting tối ưu AI:
![Help & FAQs](public/help_view.png)

---

## 🌟 Các Tính Năng Nổi Bật (Key Features)

1. **👤 Quản Lý Đa Hồ Sơ (Multiple Master Profiles)**:
   * Cho phép tạo và lưu trữ nhiều bộ hồ sơ khác nhau (ví dụ: hồ sơ *Web Developer*, hồ sơ *Growth Marketer*).
   * Chuyển đổi nhanh hồ sơ hoạt động chỉ với 1 click tại thanh điều hướng bên.

2. **📄 Bộ Quét JD PDF Bằng Laser AI (PDF Context Scanner)**:
   * Tải tệp JD PDF lên trực tiếp, AI sẽ tự động phân tích bối cảnh và bóc tách các yêu cầu kỹ năng, mục tiêu dự án trong tích tắc.

3. **⚙️ Tinh Chỉnh Tham Số Pitch Linh Hoạt**:
   * Điều chỉnh tông giọng bằng thanh trượt trực quan (Trang trọng - Cân bằng - Startup).
   * Bộ lọc kỹ năng thông minh (Smart Selector) giúp bạn chủ động chọn những kỹ năng nào cần AI ưu tiên nhấn mạnh.

4. **📈 Phân Tích Độ Phù Hợp & Đề Xuất (Alignment Analytics)**:
   * Điểm số tương thích (Alignment Score) trực quan.
   * AI tự phân tích và chỉ ra các thế mạnh của bạn (Matches) cũng như các khoảng trống kỹ năng cần cải thiện (Gaps).

5. **🛡️ Giới Hạn Gói Cước & Trình Giả Lập Nâng Cấp Pro (SaaS Limits Simulator)**:
   * **Gói Starter (Free):** Giới hạn tối đa 10 lượt tạo Pitch. Thanh tiến trình (Progress Bar) đổi màu trực quan hiển thị số lượt đã dùng.
   * **Gói Pro (Unlimited):** Mở khóa không giới hạn. Cửa sổ nâng cấp kính mờ (Upgrade Modal) cho phép nâng cấp cước giả lập trực tiếp để mở khóa tính năng ngay lập tức.

6. **🔗 Trang Chia Sẻ Đề Xuất & Tạo Mã QR Động (QR Sharing Hub)**:
   * Mỗi bản Pitch được lưu sẽ có một liên kết công khai chuyên nghiệp dạng `/pitch/[id]` sử dụng giao diện sáng (Trắng - Đen) sang trọng để gửi nhà tuyển dụng.
   * Tích hợp bộ **tạo mã QR động** tại chỗ giúp khách hàng quét nhanh bằng điện thoại di động cùng các nút chia sẻ nhanh qua LinkedIn và Email.

7. **✍️ Khắc Phục Lỗi Typography Tiếng Việt (Vietnamese Font Fixes)**:
   * Kết hợp bộ font chuyên dụng `Inter` & `Be Vietnam Pro`, sửa lỗi rớt dấu hoặc khoảng trắng giữa các chữ tiếng Việt thường gặp của AI.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) với tính năng biên dịch siêu tốc Turbopack.
* **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/) (Đảm bảo kiểm soát kiểu dữ liệu an toàn).
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom variables.
* **Cơ sở dữ liệu**: [PostgreSQL](https://www.postgresql.org/) kết nối qua [Prisma ORM](https://www.prisma.io/).
* **Xác thực**: [Clerk Auth](https://clerk.com/) (đăng nhập an toàn qua Google, Github).
* **Trí tuệ nhân tạo**: [Google Gemini 2.5 Flash API](https://aistudio.google.com/).

---

## ⚙️ Hướng Dẫn Cấu Hình Biến Môi Trường (Environment Setup)

Tạo một file `.env.local` ở thư mục gốc của dự án và điền các khóa kết nối bảo mật dưới đây (bạn có thể tham khảo mẫu tại [.env.example](.env.example)):

```env
# ── Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# ── PostgreSQL Connection URL
DATABASE_URL="postgresql://username:password@localhost:5432/pitch_generator?schema=public"

# ── Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# ── Safe Client Variables
NEXT_PUBLIC_APP_NAME="Synthesis AI"
```

---

## 🚀 Cài Đặt & Khởi Chạy Dưới Local (Local Deployment Guide)

### Khởi chạy dự án chỉ với vài bước đơn giản:

1. **Clone mã nguồn dự án**:
   ```bash
   git clone https://github.com/huynhat1210/Synthesis-AI.git
   cd Synthesis-AI/pitch-generator
   ```

2. **Cài đặt các gói thư viện**:
   ```bash
   npm install
   ```

3. **Đồng bộ cơ sở dữ liệu**:
   Đồng bộ schema Prisma vào cơ sở dữ liệu PostgreSQL của bạn:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Khởi chạy máy chủ phát triển**:
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt tại địa chỉ [http://localhost:3000](http://localhost:3000) để trải nghiệm ứng dụng.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
pitch-generator/
├── app/                  # Thư mục chính của Next.js (Pages, API, Server Actions)
│   ├── dashboard/        # Bảng điều khiển chính chứa Dashboard Client
│   ├── pitch/            # Landing page công khai của bài Pitch sau khi xuất bản
│   └── layout.tsx        # Cấu hình Layout tổng thể & Load font chữ tối ưu
├── components/           # Các React components tái sử dụng
│   ├── dashboard/        # Giao diện các Tab (Profile, Projects, Analytics, Settings, Help)
│   └── ui/               # UI components nhỏ gọn (Checkboxes, inputs)
├── lib/                  # Helpers, cấu hình lưu trữ PostgreSQL và Gemini API
├── prisma/               # Cấu hình file schema Prisma của cơ sở dữ liệu
├── public/               # Tài nguyên tĩnh (Hình ảnh minh họa, favicon)
├── package.json          # Danh sách thư viện và scripts chạy dự án
└── README.md             # Tài liệu giới thiệu sản phẩm (File này)
```

---

## 📝 Bản quyền & Giấy phép
Dự án được phát triển dưới dạng mã nguồn mở phục vụ mục đích tối ưu hóa quy trình ứng tuyển cá nhân. Vui lòng ghi rõ nguồn và tên tác giả khi chia sẻ hoặc phát triển tiếp.
