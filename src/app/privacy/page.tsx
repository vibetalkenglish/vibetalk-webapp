import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { DAILY_LIMITS } from '@/lib/limits';

export const metadata: Metadata = {
  title: 'Chính sách quyền riêng tư | VibeTalk',
  description: 'VibeTalk thu thập dữ liệu gì, dùng để làm gì, lưu ở đâu và quyền của bạn.',
};

const CONTACT = '[EMAIL LIÊN HỆ]';

export default function PrivacyPage() {
  return (
    <LegalPage title="Chính Sách Quyền Riêng Tư" updated="16/11/2026">
      <p>
        Chính sách này giải thích VibeTalk (&quot;chúng tôi&quot;) thu thập dữ liệu gì khi bạn dùng website, dùng để làm gì,
        lưu ở đâu và bạn có những quyền gì. Chúng tôi chỉ thu thập những gì cần để bạn học và để vận hành dịch vụ.
      </p>

      <h2>1. Dữ liệu chúng tôi thu thập</h2>
      <ul>
        <li>
          <strong>Tài khoản:</strong> email, tên hiển thị, avatar. Mật khẩu được nhà cung cấp xác thực (Supabase) mã hoá;
          chúng tôi không đọc được mật khẩu của bạn.
        </li>
        <li>
          <strong>Quá trình học:</strong> level, bài đã học, bài và từ vựng đã lưu, kết quả bài kiểm tra, điểm EXP, chuỗi ngày học,
          số lượt dùng tính năng AI mỗi ngày.
        </li>
        <li>
          <strong>Thanh toán:</strong> mã đơn, gói đã chọn, số tiền, thời điểm và trạng thái thanh toán. Chúng tôi không lưu số thẻ
          hay mật khẩu ngân hàng của bạn. Thông báo giao dịch từ ngân hàng hoặc dịch vụ trung gian có thể kèm tên tài khoản người
          chuyển và nội dung chuyển khoản.
        </li>
        <li>
          <strong>Nội dung bạn gửi cho AI:</strong> câu bạn nói hoặc gõ khi trò chuyện với Gia Sư AI, và đoạn văn bản cần đọc to.
        </li>
        <li>
          <strong>Giọng nói:</strong> phần nhận dạng giọng nói do trình duyệt của bạn thực hiện. Một số trình duyệt (ví dụ Chrome)
          gửi âm thanh tới máy chủ của nhà cung cấp trình duyệt để nhận dạng. Bản ghi âm luyện phát âm chỉ phát lại trên thiết bị
          của bạn; chúng tôi không tải lên hay lưu trữ.
        </li>
        <li>
          <strong>Dữ liệu trên trình duyệt:</strong> khi chưa đăng nhập, tiến độ học và cài đặt (giọng đọc, cỡ chữ) được lưu trong
          bộ nhớ của trình duyệt trên thiết bị của bạn.
        </li>
        <li>
          <strong>Nhật ký kỹ thuật:</strong> địa chỉ IP, loại trình duyệt và thời gian truy cập do máy chủ ghi lại để bảo mật và
          sửa lỗi.
        </li>
      </ul>

      <h2>2. Chúng tôi dùng dữ liệu để làm gì</h2>
      <ul>
        <li>Tạo và đăng nhập tài khoản, đồng bộ tiến độ học giữa các thiết bị.</li>
        <li>Hiển thị bảng xếp hạng. Bảng xếp hạng chỉ hiện tên hiển thị, avatar, EXP, chuỗi ngày học và level, không bao giờ hiện email.</li>
        <li>Xác nhận thanh toán và kích hoạt gói Pro.</li>
        <li>
          Cung cấp tính năng AI và giới hạn lượt dùng (miễn phí {DAILY_LIMITS.ai_chat.free} lượt chat AI và{' '}
          {DAILY_LIMITS.tts.free} lượt giọng đọc AI mỗi ngày) để giữ chi phí hợp lý.
        </li>
        <li>Gửi email cần thiết như xác nhận tài khoản và đặt lại mật khẩu. Chúng tôi không gửi quảng cáo nếu bạn chưa đồng ý.</li>
        <li>Bảo vệ dịch vụ khỏi gian lận và lạm dụng.</li>
      </ul>
      <p>Chúng tôi không bán dữ liệu cá nhân của bạn.</p>

      <h2>3. Nơi lưu trữ và bên xử lý dữ liệu</h2>
      <p>Để vận hành, chúng tôi dùng các nhà cung cấp sau. Họ xử lý dữ liệu thay mặt chúng tôi, và có thể đặt máy chủ ngoài Việt Nam:</p>
      <ul>
        <li><strong>Supabase:</strong> cơ sở dữ liệu và đăng nhập (tài khoản, tiến độ, đơn hàng).</li>
        <li><strong>Vercel:</strong> lưu trữ và chạy website.</li>
        <li><strong>Google (Gemini API):</strong> tạo câu trả lời của Gia Sư AI từ tin nhắn bạn gửi.</li>
        <li><strong>ElevenLabs:</strong> chuyển văn bản thành giọng đọc.</li>
        <li><strong>VietQR (img.vietqr.io):</strong> tạo ảnh mã QR chuyển khoản, gồm số tài khoản nhận, số tiền và mã đơn.</li>
        <li><strong>Dịch vụ báo giao dịch ngân hàng</strong> (khi được bật): thông báo cho chúng tôi khi có tiền chuyển vào, để kích hoạt Pro tự động.</li>
      </ul>
      <p>
        Chúng tôi không lưu lại nội dung các cuộc trò chuyện với Gia Sư AI. Tuy vậy, các nhà cung cấp AI có thể lưu tạm theo chính
        sách của họ. Vì vậy, đừng gửi thông tin nhạy cảm (số giấy tờ, mật khẩu, thông tin tài chính) vào ô chat.
      </p>

      <h2>4. Thời gian lưu trữ</h2>
      <p>
        Chúng tôi lưu dữ liệu tài khoản và học tập đến khi bạn yêu cầu xoá tài khoản. Thông tin đơn hàng có thể được giữ lâu hơn
        theo yêu cầu của pháp luật về kế toán và thuế. Nhật ký kỹ thuật được xoá định kỳ.
      </p>

      <h2>5. Quyền của bạn</h2>
      <ul>
        <li>Xem và sửa tên hiển thị, avatar ngay trong trang Hồ sơ.</li>
        <li>Yêu cầu một bản sao dữ liệu của bạn, yêu cầu sửa hoặc xoá tài khoản và dữ liệu đi kèm.</li>
        <li>Rút lại sự đồng ý xử lý dữ liệu. Khi đó, một số tính năng có thể ngừng hoạt động.</li>
      </ul>
      <p>
        Để thực hiện các quyền trên, gửi email tới <strong>{CONTACT}</strong> từ địa chỉ email bạn đã dùng để đăng ký.
        Chúng tôi phản hồi trong thời hạn pháp luật Việt Nam về bảo vệ dữ liệu cá nhân quy định.
      </p>

      <h2>6. Bảo mật</h2>
      <p>
        Dữ liệu được truyền qua kết nối mã hoá (HTTPS). Cơ sở dữ liệu được phân quyền để mỗi người chỉ đọc được dữ liệu của chính
        mình. Không hệ thống nào an toàn tuyệt đối. Nếu xảy ra sự cố ảnh hưởng tới dữ liệu của bạn, chúng tôi sẽ thông báo theo
        quy định.
      </p>

      <h2>7. Trẻ em</h2>
      <p>Nếu bạn dưới 16 tuổi, hãy dùng VibeTalk khi đã có sự đồng ý của cha mẹ hoặc người giám hộ.</p>

      <h2>8. Thay đổi chính sách</h2>
      <p>Khi thay đổi chính sách này, chúng tôi sẽ cập nhật ngày ở đầu trang. Thay đổi quan trọng sẽ được thông báo trên website hoặc qua email.</p>

      <h2>9. Liên hệ</h2>
      <p>Mọi câu hỏi về quyền riêng tư, vui lòng gửi về <strong>{CONTACT}</strong>.</p>
    </LegalPage>
  );
}
