# Synthesis AI — AI Pitch Generator 🚀

**Synthesis AI** là một nền tảng web ứng dụng AI thông minh giúp các chuyên viên công nghệ và lập trình viên tự động hóa việc tạo ra các bản thuyết phục (Pitch Proposals) có tính cá nhân hóa cực cao, bám sát mô tả công việc (Job Description - JD) của nhà tuyển dụng.

Dự án sở hữu giao diện người dùng cao cấp, hiện đại, hỗ trợ đa hồ sơ, phân tích độ tương thích chi tiết cùng khả năng xuất bản/chia sẻ nhanh chóng.

---

## 🌟 Tính Năng Nổi Bật (Premium Features)

1. **Quản Lý Đa Hồ Sơ (Multiple Master Profiles)**:
   * Cho phép tạo và quản lý nhiều Profile độc lập (ví dụ: hồ sơ Web Developer, hồ sơ AI Engineer).
   * Chuyển đổi nhanh profile mặc định chỉ với một nút bấm trực tiếp tại Dashboard.
   * Quản lý các dự án tiêu biểu đi kèm cho từng Profile.

2. **Bộ Quét & Phân Tích JD Bằng File PDF (Multi-modal JD PDF Scanner)**:
   * Cho phép tải lên trực tiếp tài liệu tuyển dụng dưới dạng PDF.
   * Xử lý trích xuất văn bản an toàn ở phía Server, tự động phân tích các kỹ năng trọng yếu, đối tượng mục tiêu và tông giọng phù hợp của JD.

3. **Bộ Chọn Kỹ Năng Thông Minh (Smart Skill Selector)**:
   * Cho phép lọc nhanh, bật/tắt các kỹ năng cụ thể từ Master Profile trước khi gửi payload yêu cầu AI.
   * Kiểm soát chặt chẽ nội dung nào sẽ được đưa vào pitch để đảm bảo tính tập trung.

4. **Trình Phân Tích Độ Phù Hợp & Điểm Alignment (AI Fit Analyzer)**:
   * Phân tích đối sánh kỹ năng và đưa ra điểm số tương thích (Alignment Score) trực quan.
   * Chỉ ra rõ những điểm khớp (Matches) và khoảng cách kỹ năng (Gaps) cần cải thiện.

5. **Biểu Đồ Xu Hướng Hoạt Động (SVG Activity Analytics Chart)**:
   * Biểu đồ đường vẽ bằng SVG thuần responsive, giúp theo dõi tần suất tạo pitch và lịch sử cải thiện điểm số Alignment qua từng đề xuất.

6. **Tối Ưu Ngôn Ngữ & Prompt Gemini AI**:
   * Hệ thống prompt nâng cao sử dụng mô hình **Gemini 2.5 Flash**.
   * Đảm bảo đầu ra **Luôn bằng Tiếng Việt với chuẩn Unicode dựng sẵn (Precomposed Unicode)**, triệt tiêu hoàn toàn lỗi font chữ.
   * Mỗi bản pitch tự động kết thúc bằng một câu **Call-To-Action (CTA)** mạnh mẽ và chuyên nghiệp.

7. **Sửa Lỗi Typography Tiếng Việt (Accents & Font Fixes)**:
   * Tích hợp Google Fonts `Inter` kết hợp `Be Vietnam Pro` trực tiếp qua Next.js font variable, khắc phục triệt để lỗi rớt dấu hoặc khoảng trống giữa các chữ tiếng Việt thường gặp ở Tailwind.

8. **Xuất Bản & Chia Sẻ**:
   * Hỗ trợ xuất trực tiếp ra **PDF** dạng in tối ưu hoặc sao chép nhanh định dạng **Markdown**.
   * Hỗ trợ tạo **Trang liên kết công khai (Public Landing Page)** dạng `/pitch/[id]` được thiết kế chỉn chu để gửi trực tiếp cho nhà tuyển dụng.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Framework chính**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack Compiler).
* **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/) (Type-safe hoàn toàn).
* **Styling & CSS**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom variables.
* **Cơ sở dữ liệu (Database)**: [PostgreSQL](https://www.postgresql.org/) kết nối qua [Prisma ORM](https://www.prisma.io/).
* **Xác thực & Người dùng**: [Clerk Auth](https://clerk.com/) (quản lý Session và bảo mật).
* **AI Engine**: [Google Gemini 2.5 Flash API](https://aistudio.google.com/).

---

## ⚙️ Cấu Hình Môi Trường (Environment Variables)

Dự án sử dụng các biến môi trường để bảo mật khóa kết nối. Hãy tạo một file `.env.local` ở thư mục gốc của dự án dựa trên mẫu dưới đây (hoặc sao chép từ [.env.example](file:///d:/Synthesis-AI-main/pitch-generator/.env.example)):

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

> [!WARNING]
> Không bao giờ được commit file `.env.local` chứa các khóa bảo mật thật lên Git hoặc GitHub. File này đã được thêm vào danh sách bỏ qua trong [.gitignore](file:///d:/Synthesis-AI-main/pitch-generator/.gitignore).

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Thử (Setup Guide)

### Yêu cầu hệ thống:
* **Node.js**: Phiên bản v18 trở lên.
* **PostgreSQL**: Đang chạy cục bộ hoặc dịch vụ Cloud (như Supabase, Neon).

### Các bước khởi chạy:

1. **Clone dự án & truy cập thư mục**:
   ```bash
   git clone <url-repository-cua-ban>
   cd pitch-generator
   ```

2. **Cài đặt các gói phụ thuộc**:
   ```bash
   npm install
   ```

3. **Thiết lập cơ sở dữ liệu (Database Migration)**:
   Khởi tạo bảng trong PostgreSQL và đồng bộ Prisma schema:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Khởi chạy máy chủ phát triển (Dev Server)**:
   Chạy dự án với Turbopack để có hiệu năng biên dịch tối ưu:
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt tại địa chỉ [http://localhost:3000](http://localhost:3000).

---

## 📁 Cấu Trúc Thư Mục Chính

```text
pitch-generator/
├── app/                  # Next.js App Router (Layouts, Pages, Server Actions)
│   ├── api/              # Các API endpoints
│   ├── dashboard/        # Bảng điều khiển quản lý hồ sơ và tạo pitch
│   ├── pitch/            # Trang proposals công khai chia sẻ với nhà tuyển dụng
│   └── layout.tsx        # Cấu hình Layout tổng thể & Load Fonts tối ưu
├── components/           # Các React components tái sử dụng
│   ├── dashboard/        # Giao diện Analytics, Profile, và Smart Selector
│   └── ui/               # UI components nhỏ (Meters, Button, Input...)
├── lib/                  # Thư viện dùng chung (kết nối Prisma, Gemini, Helpers)
├── prisma/               # Cấu hình Prisma schema và migrations
├── public/               # Tài nguyên tĩnh (Hình ảnh, Vector)
├── .gitignore            # File cấu hình bỏ qua của Git
├── .env.example          # File mẫu cấu hình biến môi trường
└── README.md             # Tài liệu hướng dẫn sử dụng (File này)
```

---

## 📝 Bản quyền & Giấy phép
Dự án được phát triển dưới dạng mã nguồn mở phục vụ mục đích học tập và tối ưu hóa quy trình xin việc cá nhân. Vui lòng ghi rõ nguồn khi chia sẻ hoặc phát triển tiếp.
