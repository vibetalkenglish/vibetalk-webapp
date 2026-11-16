# Cài đặt Supabase cho VibeTalk

Làm một lần. Không cần cài thêm phần mềm gì trên máy.

## 1. Tạo project
1. Vào https://supabase.com → **New project**. Region: **Southeast Asia (Singapore)**.
2. Đặt mật khẩu database và lưu lại (app không dùng mật khẩu này, nhưng bạn sẽ cần nó nếu sau này kết nối thẳng vào database).

## 2. Tạo bảng
1. Dashboard → **SQL Editor** → **New query**.
2. Dán toàn bộ nội dung `supabase/migrations/0001_init.sql` → **Run**. Phải báo "Success".
3. Tạo query mới, dán `supabase/migrations/0002_usage_limits.sql` → **Run**.
   File này bắt buộc: thiếu nó thì Gia Sư AI và giọng đọc AI sẽ tự chuyển sang chế độ miễn phí (trả lời mẫu, giọng trình duyệt).

## 3. Cài đặt đăng nhập
Dashboard → **Authentication**:
- **URL Configuration**
  - Site URL: `https://vibetalk-webapp.vercel.app`
  - Redirect URLs: thêm `https://vibetalk-webapp.vercel.app/**` và `http://localhost:3000/**`
    (thêm cả domain riêng nếu sau này có).
- **Sign In / Providers → Email**: bật Email.
  - Email gửi mặc định của Supabase chỉ được vài email mỗi giờ. Khi ra mắt thử, chọn một trong hai:
    - tắt **Confirm email** (học viên đăng ký xong dùng được ngay), hoặc
    - cài SMTP riêng (ví dụ Resend) ở **Authentication → Emails → SMTP Settings**.
  - "Quên mật khẩu" luôn cần gửi email, nên muốn dùng ổn định thì nên có SMTP riêng.

## 4. Lấy key và đặt vào Vercel
Dashboard → **Project Settings → API**:

| Biến trên Vercel | Lấy từ | Ghi chú |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable key | Công khai được, vì đã có RLS bảo vệ |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role / secret key | **Bí mật.** Chỉ đặt trên Vercel, không gửi cho ai |

Vercel → Project → Settings → Environment Variables: thêm 3 biến, tick **Production** và **Preview**, rồi **Redeploy**.
Khi chạy trên máy: chép `.env.example` thành `.env.local` rồi điền vào.

## 5. Tạo admin đầu tiên
1. Đăng ký tài khoản trên web bằng email của bạn.
2. Vào SQL Editor, chạy câu dưới (thay email):
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'email-cua-ban@example.com');
   ```
3. Đăng xuất rồi đăng nhập lại. Mục **🛡️ Cổng Quản Trị Admin** sẽ hiện trong menu, và `/admin` mở được.

## Giới hạn chi phí AI
- Chỉ người **đã đăng nhập** mới dùng Gia Sư AI thật (Gemini) và giọng đọc AI (ElevenLabs). Khách dùng trả lời mẫu và giọng của trình duyệt.
- Mỗi ngày (tính theo giờ Việt Nam), mỗi người được:
  - Free: 20 lượt chat AI, 50 lượt giọng đọc AI.
  - Pro: 200 lượt chat AI, 500 lượt giọng đọc AI.
- Muốn đổi các con số này thì sửa `src/lib/limits.ts`.
- Mỗi tin nhắn gửi AI tối đa 500 ký tự, mỗi lần chỉ gửi 12 tin gần nhất. Mỗi đoạn đọc tối đa 400 ký tự; dài hơn thì dùng giọng trình duyệt.
- Nên đặt thêm hạn mức chi tiêu ngay trên trang Google AI Studio và ElevenLabs để chặn chi phí từ phía nhà cung cấp.

## Dữ liệu được lưu ở đâu
- `profiles`: tên, avatar, EXP, streak, Pro (`is_pro`, `pro_until`), quyền (`role`).
- `progress`: level, bài đã học, bài đã lưu, kết quả test.
- `notebook_entries`: từ vựng trong sổ tay.
- `orders`: đơn mua Pro. Chỉ máy chủ tạo được, số tiền lấy từ `src/lib/plans.ts`.
- `app_config`: tài khoản ngân hàng hiện trên mã VietQR.
- `usage_counters`: số lượt dùng AI mỗi ngày của từng người.

Học viên không tự bật được Pro hay quyền admin. Các cột đó chỉ máy chủ (service role) hoặc admin sửa được.
