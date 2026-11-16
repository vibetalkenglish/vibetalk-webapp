import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { DAILY_LIMITS } from '@/lib/limits';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng | VibeTalk',
  description: 'Điều khoản khi sử dụng VibeTalk và mua gói Pro.',
};

const CONTACT = '[EMAIL LIÊN HỆ]';

export default function TermsPage() {
  return (
    <LegalPage title="Điều Khoản Sử Dụng" updated="16/11/2026">
      <p>
        Khi dùng VibeTalk (&quot;dịch vụ&quot;), bạn đồng ý với các điều khoản dưới đây và với{' '}
        <Link href="/privacy">Chính sách quyền riêng tư</Link>. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ.
      </p>

      <h2>1. Tài khoản</h2>
      <ul>
        <li>Bạn có thể học ở chế độ khách mà không cần tài khoản. Khi đó, tiến độ chỉ lưu trên trình duyệt đang dùng.</li>
        <li>Khi đăng ký, bạn cần dùng email của chính mình và tự giữ bí mật mật khẩu. Mọi hoạt động từ tài khoản của bạn được coi là do bạn thực hiện.</li>
        <li>Tên hiển thị sẽ xuất hiện công khai trên bảng xếp hạng. Không dùng tên phản cảm hoặc mạo danh người khác.</li>
      </ul>

      <h2>2. Gói Pro và thanh toán</h2>
      <ul>
        <li>Giá các gói được niêm yết tại <Link href="/pricing">trang Bảng giá</Link> và tính bằng đồng Việt Nam.</li>
        <li>
          Bạn thanh toán bằng chuyển khoản ngân hàng qua mã VietQR. Hãy chuyển <strong>đúng số tiền</strong> và ghi{' '}
          <strong>đúng nội dung chuyển khoản</strong> (mã đơn) để hệ thống nhận diện. Gói Pro được kích hoạt sau khi chúng tôi
          nhận được tiền, thường trong vài phút, có thể lâu hơn nếu ngân hàng chậm hoặc cần duyệt thủ công.
        </li>
        <li>Nếu chuyển sai số tiền hoặc sai nội dung, hãy liên hệ {CONTACT} và gửi kèm ảnh chụp giao dịch để được hỗ trợ.</li>
        <li>
          Gói theo thời hạn (1 tháng, 6 tháng, 1 năm) hết hạn khi đủ thời gian và không tự gia hạn. Gói &quot;Trọn đời&quot; có
          hiệu lực trong suốt thời gian VibeTalk còn hoạt động.
        </li>
        <li>
          Hoàn tiền: [CHÍNH SÁCH HOÀN TIỀN, ví dụ: hoàn tiền trong 7 ngày nếu không kích hoạt được Pro do lỗi từ phía chúng tôi].
        </li>
      </ul>

      <h2>3. Tính năng AI</h2>
      <ul>
        <li>
          Gia Sư AI và giọng đọc AI do bên thứ ba cung cấp (Google Gemini, ElevenLabs) và có giới hạn lượt dùng mỗi ngày
          (tài khoản miễn phí: {DAILY_LIMITS.ai_chat.free} lượt chat, {DAILY_LIMITS.tts.free} lượt giọng đọc; gói Pro:{' '}
          {DAILY_LIMITS.ai_chat.pro} lượt chat, {DAILY_LIMITS.tts.pro} lượt giọng đọc). Hết lượt, ứng dụng chuyển sang chế độ
          miễn phí (trả lời mẫu, giọng đọc của trình duyệt).
        </li>
        <li>Nội dung do AI tạo ra có thể sai hoặc chưa tự nhiên. Đây là công cụ luyện tập, không thay thế giáo viên hay chứng chỉ chính thức.</li>
        <li>Chúng tôi có thể thay đổi giới hạn lượt dùng hoặc nhà cung cấp AI để duy trì chất lượng và chi phí.</li>
      </ul>

      <h2>4. Hành vi không được phép</h2>
      <ul>
        <li>Can thiệp, dò lỗi trái phép, gửi tự động hàng loạt yêu cầu, hoặc tìm cách vượt qua giới hạn lượt dùng hay kích hoạt Pro.</li>
        <li>Gian lận điểm EXP hay thứ hạng.</li>
        <li>Sao chép, bán lại hoặc phân phối nội dung bài học khi chưa được phép.</li>
        <li>Gửi nội dung vi phạm pháp luật, xúc phạm hoặc quấy rối qua các tính năng của dịch vụ.</li>
      </ul>
      <p>Chúng tôi có thể tạm khoá hoặc xoá tài khoản vi phạm. Nếu vi phạm nghiêm trọng, chúng tôi không hoàn tiền.</p>

      <h2>5. Nội dung và quyền sở hữu</h2>
      <p>
        Bài học, âm thanh, hình ảnh và mã nguồn của VibeTalk thuộc quyền sở hữu của chúng tôi hoặc bên cấp phép. Bạn được dùng
        chúng cho mục đích học tập cá nhân.
      </p>

      <h2>6. Giới hạn trách nhiệm</h2>
      <p>
        Dịch vụ được cung cấp theo hiện trạng. Chúng tôi cố gắng duy trì dịch vụ ổn định, nhưng không cam kết dịch vụ luôn hoạt
        động liên tục hay không có lỗi. Trong phạm vi pháp luật cho phép, trách nhiệm của chúng tôi không vượt quá số tiền bạn đã
        trả cho gói Pro trong 12 tháng gần nhất.
      </p>

      <h2>7. Thay đổi điều khoản</h2>
      <p>
        Khi cập nhật điều khoản, chúng tôi sẽ đổi ngày ở đầu trang. Nếu bạn tiếp tục dùng dịch vụ sau khi điều khoản thay đổi,
        nghĩa là bạn đồng ý với nội dung mới.
      </p>

      <h2>8. Luật áp dụng</h2>
      <p>
        Các điều khoản này tuân theo pháp luật Việt Nam. Tranh chấp sẽ được ưu tiên giải quyết bằng thương lượng. Nếu thương lượng
        không thành, tranh chấp được giải quyết tại cơ quan có thẩm quyền ở Việt Nam.
      </p>

      <h2>9. Liên hệ</h2>
      <p>Mọi thắc mắc, vui lòng gửi về <strong>{CONTACT}</strong>.</p>
    </LegalPage>
  );
}
