import { IpaSound } from '@/types';

export const IPA_SOUNDS: IpaSound[] = [
  // --- MONOPHTHONGS (NGUYÊN ÂM ĐƠN) ---
  {
    id: 'i_long',
    symbol: 'iː',
    type: 'monophthong',
    name: 'Long E Sound (Cặp Âm Cười Tươi)',
    vietnameseGuide: 'Kéo dài như âm "i" tiếng Việt, khóe miệng kéo toét sang hai bên như đang cười tươi chụp ảnh check-in.',
    vietnameseCommonMistake: 'Người Việt hay phát âm quá ngắn hoặc không chịu căng khóe môi, dẫn đến nhầm lẫn tai hại giữa "sheep" (con cừu) và "ship" (con tàu), hay "beach" (bãi biển) và từ nhạy cảm.',
    mouthGuide: 'Môi kéo căng hết cỡ sang 2 bên như đang mỉm cười, lưỡi nâng cao về phía trước, giữ âm vang trong 1 giây.',
    audioSampleWord: 'sheep',
    examples: [
      { word: 'see', ipa: '/siː/', meaningVi: 'nhìn thấy', highlightPart: 'ee' },
      { word: 'feel', ipa: '/fiːl/', meaningVi: 'cảm thấy', highlightPart: 'ee' },
      { word: 'team', ipa: '/tiːm/', meaningVi: 'đội nhóm', highlightPart: 'ea' },
      { word: 'peace', ipa: '/piːs/', meaningVi: 'hòa bình', highlightPart: 'ea' },
    ]
  },
  {
    id: 'i_short',
    symbol: 'ɪ',
    type: 'monophthong',
    name: 'Short I Sound (Âm Mặt Thả Lỏng)',
    vietnameseGuide: 'Âm "i" ngắn, mở miệng hơi giống âm "ê" nhẹ, dứt khoát và thả lỏng toàn bộ cơ mặt.',
    vietnameseCommonMistake: 'Đọc thành âm "i" dài hoặc "ê" hẳn. Tuyệt đối không bè khóe miệng khi phát âm âm này.',
    mouthGuide: 'Hàm thả lỏng hơi hạ xuống một chút, lưỡi đặt thấp hơn âm /iː/, phát ra âm thanh ngắn gọn 0.3s.',
    audioSampleWord: 'ship',
    examples: [
      { word: 'sit', ipa: '/sɪt/', meaningVi: 'ngồi', highlightPart: 'i' },
      { word: 'fit', ipa: '/fɪt/', meaningVi: 'vừa vặn', highlightPart: 'i' },
      { word: 'minute', ipa: '/ˈmɪn.ɪt/', meaningVi: 'phút', syllables: 'min-ute', highlightPart: 'i' },
      { word: 'build', ipa: '/bɪld/', meaningVi: 'xây dựng', highlightPart: 'ui' },
    ]
  },
  {
    id: 'u_short',
    symbol: 'ʊ',
    type: 'monophthong',
    name: 'Short U Sound',
    vietnameseGuide: 'Âm "u" ngắn, miệng tròn nhẹ nhưng thả lỏng, hướng hơi từ cuống họng ra giống nửa "u" nửa "ô".',
    vietnameseCommonMistake: 'Chu mỏ quá mức như đọc chữ "u" tiếng Việt.',
    mouthGuide: 'Môi hơi mở tròn, không chu ra phía trước, đẩy hơi ngắn và dứt khoát.',
    audioSampleWord: 'book',
    examples: [
      { word: 'look', ipa: '/lʊk/', meaningVi: 'nhìn', highlightPart: 'oo' },
      { word: 'good', ipa: '/ɡʊd/', meaningVi: 'tốt', highlightPart: 'oo' },
      { word: 'put', ipa: '/pʊt/', meaningVi: 'đặt/để', highlightPart: 'u' },
      { word: 'push', ipa: '/pʊʃ/', meaningVi: 'đẩy', highlightPart: 'u' },
    ]
  },
  {
    id: 'u_long',
    symbol: 'uː',
    type: 'monophthong',
    name: 'Long U Sound',
    vietnameseGuide: 'Âm "u" dài giọng Anh - Mỹ. Môi chu tròn về phía trước như huýt sáo, kéo dài âm.',
    vietnameseCommonMistake: 'Không chu môi đủ tròn khiến âm bị bẹt và nông.',
    mouthGuide: 'Môi chu tròn hết cỡ về phía trước, cuống lưỡi nâng cao về phía sau vòm họng.',
    audioSampleWord: 'moon',
    examples: [
      { word: 'blue', ipa: '/bluː/', meaningVi: 'màu xanh biển', highlightPart: 'ue' },
      { word: 'food', ipa: '/fuːd/', meaningVi: 'thức ăn', highlightPart: 'oo' },
      { word: 'choose', ipa: '/tʃuːz/', meaningVi: 'lựa chọn', highlightPart: 'oo' },
      { word: 'group', ipa: '/ɡruːp/', meaningVi: 'nhóm', highlightPart: 'ou' },
    ]
  },
  {
    id: 'e_short',
    symbol: 'e',
    type: 'monophthong',
    name: 'Short E Sound',
    vietnameseGuide: 'Tương tự âm "e" tiếng Việt nhưng khoang miệng mở rộng hơn một chút và dứt khoát.',
    vietnameseCommonMistake: 'Đọc quá hẹp như âm "ê" hoặc kéo dài lê thê.',
    mouthGuide: 'Miệng mở tự nhiên theo chiều dọc, đầu lưỡi chạm nhẹ chân răng hàm dưới.',
    audioSampleWord: 'bed',
    examples: [
      { word: 'head', ipa: '/hed/', meaningVi: 'cái đầu', highlightPart: 'ea' },
      { word: 'check', ipa: '/tʃek/', meaningVi: 'kiểm tra', highlightPart: 'e' },
      { word: 'send', ipa: '/send/', meaningVi: 'gửi', highlightPart: 'e' },
      { word: 'next', ipa: '/nekst/', meaningVi: 'tiếp theo', highlightPart: 'e' },
    ]
  },
  {
    id: 'schwa',
    symbol: 'ə',
    type: 'monophthong',
    name: 'Schwa Sound (Âm Lười Phổ Biến Nhất Tiếng Anh)',
    vietnameseGuide: 'Âm "ơ" lười. Thả lỏng toàn bộ cơ mặt và lưỡi, chỉ bật nhẹ âm thanh ngắn từ cổ họng.',
    vietnameseCommonMistake: 'Người Việt hay nhấn dấu sắc hoặc nhấn trọng âm vào âm này (ví dụ đọc "about" thành "A-bao" thay vì /əˈbaʊt/).',
    mouthGuide: 'Khuôn mặt hoàn toàn thư giãn, môi và hàm mở hờ, không cử động.',
    audioSampleWord: 'about',
    examples: [
      { word: 'banana', ipa: '/bəˈnæn.ə/', meaningVi: 'quả chuối', syllables: 'ba-nan-a', highlightPart: 'a' },
      { word: 'support', ipa: '/səˈpɔːrt/', meaningVi: 'hỗ trợ', syllables: 'sup-port', highlightPart: 'u' },
      { word: 'famous', ipa: '/ˈfeɪ.məs/', meaningVi: 'nổi tiếng', syllables: 'fa-mous', highlightPart: 'ou' },
      { word: 'family', ipa: '/ˈfæm.əl.i/', meaningVi: 'gia đình', syllables: 'fam-i-ly', highlightPart: 'i' },
    ]
  },
  {
    id: 'er_rhotic',
    symbol: 'ɜːr',
    type: 'monophthong',
    name: 'American R-Colored Vowel (Âm Cong Lưỡi Đậm Điệu Mỹ)',
    vietnameseGuide: 'Đặc trưng số 1 của giọng Anh - Mỹ! Vừa phát âm "ơ" vừa cong đầu lưỡi sâu vào trong vòm họng.',
    vietnameseCommonMistake: 'Người Việt hay quên cong lưỡi âm "r", đọc thẳng đơ như "bớt" thay vì "bird" /bɜːrd/.',
    mouthGuide: 'Môi hơi chu nhẹ, thân lưỡi co lại và đầu lưỡi cong ngược lên trần họng tạo âm vang ấm áp.',
    audioSampleWord: 'bird',
    examples: [
      { word: 'learn', ipa: '/lɜːrn/', meaningVi: 'học hỏi', highlightPart: 'ear' },
      { word: 'work', ipa: '/wɜːrk/', meaningVi: 'làm việc', highlightPart: 'or' },
      { word: 'first', ipa: '/fɜːrst/', meaningVi: 'đầu tiên', highlightPart: 'ir' },
      { word: 'turn', ipa: '/tɜːrn/', meaningVi: 'xoay/rẽ', highlightPart: 'ur' },
    ]
  },
  {
    id: 'ash',
    symbol: 'æ',
    type: 'monophthong',
    name: 'Short Ash A (Âm A Rớt Hàm)',
    vietnameseGuide: 'Nửa A nửa E đặc trưng giọng Anh - Mỹ. Há miệng thật to như chuẩn bị cắn chiếc bánh hamburger khổng lồ!',
    vietnameseCommonMistake: 'Đọc thành âm "a" thuần hoặc âm "e" thuần tiếng Việt làm mất hẳn điệu Mỹ.',
    mouthGuide: 'Hạ hàm dưới xuống thật sâu, lưỡi đè thấp sát đáy miệng, mở rộng miệng theo cả 4 hướng.',
    audioSampleWord: 'cat',
    examples: [
      { word: 'apple', ipa: '/ˈæp.əl/', meaningVi: 'quả táo', syllables: 'ap-ple', highlightPart: 'a' },
      { word: 'black', ipa: '/blæk/', meaningVi: 'màu đen', highlightPart: 'a' },
      { word: 'hand', ipa: '/hænd/', meaningVi: 'bàn tay', highlightPart: 'a' },
      { word: 'back', ipa: '/bæk/', meaningVi: 'phía sau', highlightPart: 'a' },
    ]
  },
  {
    id: 'open_o',
    symbol: 'ɑː',
    type: 'monophthong',
    name: 'Open Ah Sound (Mở Rộng Cuống Họng)',
    vietnameseGuide: 'Âm "a" mở rộng cuống họng. Trong giọng Anh - Mỹ, các từ như "hot", "box", "stop" đọc theo âm này (/hɑːt/, /bɑːks/).',
    vietnameseCommonMistake: 'Người Việt hay đọc theo kiểu Anh - Anh tròn môi (/hɒt/), trong khi giọng Mỹ mở miệng dọc và phát âm /ɑː/.',
    mouthGuide: 'Mở miệng to như khi bác sĩ khám họng "Aaaa", lưỡi đặt thấp và phẳng.',
    audioSampleWord: 'hot',
    examples: [
      { word: 'stop', ipa: '/stɑːp/', meaningVi: 'dừng lại', highlightPart: 'o' },
      { word: 'box', ipa: '/bɑːks/', meaningVi: 'cái hộp', highlightPart: 'o' },
      { word: 'father', ipa: '/ˈfɑː.ðɚ/', meaningVi: 'người cha', syllables: 'fa-ther', highlightPart: 'a' },
      { word: 'watch', ipa: '/wɑːtʃ/', meaningVi: 'đồng hồ/xem', highlightPart: 'a' },
    ]
  },

  // --- DIPHTHONGS (NGUYÊN ÂM ĐÔI) ---
  {
    id: 'ey_diphthong',
    symbol: 'eɪ',
    type: 'diphthong',
    name: 'Long A Diphthong',
    vietnameseGuide: 'Bắt đầu từ âm /e/ lướt mượt mà sang âm /ɪ/, khóe miệng dần kéo sang 2 bên.',
    vietnameseCommonMistake: 'Đọc cộc lốc thành âm "ê" hoặc "ây" tiếng Việt không có độ trượt âm.',
    mouthGuide: 'Mở miệng vừa phải ở âm /e/, sau đó khép hàm dần và nâng nhẹ lưỡi lên vị trí âm /ɪ/.',
    audioSampleWord: 'face',
    examples: [
      { word: 'day', ipa: '/deɪ/', meaningVi: 'ngày', highlightPart: 'ay' },
      { word: 'make', ipa: '/meɪk/', meaningVi: 'làm/tạo ra', highlightPart: 'a_e' },
      { word: 'great', ipa: '/ɡreɪt/', meaningVi: 'tuyệt vời', highlightPart: 'ea' },
      { word: 'rain', ipa: '/reɪn/', meaningVi: 'cơn mưa', highlightPart: 'ai' },
    ]
  },
  {
    id: 'ow_diphthong',
    symbol: 'aʊ',
    type: 'diphthong',
    name: 'Ow Diphthong',
    vietnameseGuide: 'Bắt đầu từ âm /æ/ hoặc /ɑː/ rồi chu tròn môi về âm /ʊ/ (như "ao" nhưng mở miệng to hơn).',
    vietnameseCommonMistake: 'Đọc thành "ao" cụt ngủn của tiếng Việt mà không mở rộng hàm ở đầu âm.',
    mouthGuide: 'Mở to miệng ở âm đầu, sau đó thu nhỏ và chu tròn môi lại ở cuối âm.',
    audioSampleWord: 'house',
    examples: [
      { word: 'now', ipa: '/naʊ/', meaningVi: 'bây giờ', highlightPart: 'ow' },
      { word: 'cloud', ipa: '/klaʊd/', meaningVi: 'đám mây', highlightPart: 'ou' },
      { word: 'down', ipa: '/daʊn/', meaningVi: 'xuống', highlightPart: 'ow' },
      { word: 'sound', ipa: '/saʊnd/', meaningVi: 'âm thanh', highlightPart: 'ou' },
    ]
  },
  {
    id: 'ai_diphthong',
    symbol: 'aɪ',
    type: 'diphthong',
    name: 'Long I Diphthong',
    vietnameseGuide: 'Bắt đầu từ âm /ɑː/ mở rộng rồi trượt nhẹ nhàng sang âm /ɪ/ bè miệng.',
    vietnameseCommonMistake: 'Đọc thành "ai" tiếng Việt nhanh và cụt.',
    mouthGuide: 'Hàm dưới hạ thấp, sau đó đẩy dần lên cao trong khi khóe môi giãn sang 2 bên.',
    audioSampleWord: 'time',
    examples: [
      { word: 'life', ipa: '/laɪf/', meaningVi: 'cuộc sống', highlightPart: 'i_e' },
      { word: 'fly', ipa: '/flaɪ/', meaningVi: 'bay', highlightPart: 'y' },
      { word: 'mind', ipa: '/maɪnd/', meaningVi: 'tâm trí', highlightPart: 'i' },
      { word: 'bright', ipa: '/braɪt/', meaningVi: 'tươi sáng', highlightPart: 'igh' },
    ]
  },
  {
    id: 'oh_diphthong',
    symbol: 'oʊ',
    type: 'diphthong',
    name: 'American Long O Diphthong',
    vietnameseGuide: 'Đặc trưng giọng Mỹ: Bắt đầu từ /o/ và kết thúc bằng cách chu nhỏ môi thành /ʊ/.',
    vietnameseCommonMistake: 'Đọc cụt ngủn thành âm "ô" hoặc "âu" tiếng Việt.',
    mouthGuide: 'Môi mở tròn trung bình, sau đó từ từ khép lại nhỏ hơn ở cuối từ.',
    audioSampleWord: 'go',
    examples: [
      { word: 'home', ipa: '/hoʊm/', meaningVi: 'ngôi nhà', highlightPart: 'o_e' },
      { word: 'road', ipa: '/roʊd/', meaningVi: 'con đường', highlightPart: 'oa' },
      { word: 'phone', ipa: '/foʊn/', meaningVi: 'điện thoại', highlightPart: 'o_e' },
      { word: 'slow', ipa: '/sloʊ/', meaningVi: 'chậm rãi', highlightPart: 'ow' },
    ]
  },

  // --- CONSONANTS (PHỤ ÂM - ĐẶC BIỆT CHÚ TRỌNG LỖI NGƯỜI VIỆT) ---
  {
    id: 's_voiceless',
    symbol: 's',
    type: 'consonant-voiceless',
    name: 'Voiceless S (Âm Đuôi Xì Gió Huyền Thoại)',
    vietnameseGuide: 'Hai hàm răng khép hờ, đầu lưỡi đặt sát chân răng cửa trên, xì hơi mạnh ra ngoài như tiếng mở nắp lon coca. Dây thanh quản KHÔNG rung.',
    vietnameseCommonMistake: '90% người Việt bỏ quên âm này khi đứng ở cuối từ ("like" đọc thành "lai", "six" đọc thành "sích", "nice" thành "nai").',
    mouthGuide: 'Răng khép nhẹ, môi thả lỏng, ép luồng khí qua khe hẹp giữa lưỡi và răng tạo tiếng xì gió giòn giã.',
    audioSampleWord: 'sun',
    examples: [
      { word: 'nice', ipa: '/naɪs/', meaningVi: 'tuyệt/đẹp', highlightPart: 'ce' },
      { word: 'place', ipa: '/pleɪs/', meaningVi: 'địa điểm', highlightPart: 'ce' },
      { word: 'yes', ipa: '/jes/', meaningVi: 'đồng ý', highlightPart: 's' },
      { word: 'class', ipa: '/klæs/', meaningVi: 'lớp học', highlightPart: 'ss' },
    ]
  },
  {
    id: 'z_voiced',
    symbol: 'z',
    type: 'consonant-voiced',
    name: 'Voiced Z (Âm Rung Tiếng Ong Kêu)',
    vietnameseGuide: 'Khẩu hình y hệt âm /s/, nhưng phải RUNG DÂY THANH QUẢN trong cổ họng tạo âm rù rù như tiếng ong bay.',
    vietnameseCommonMistake: 'Người Việt hay biến âm /z/ thành /s/ khi đứng ở cuối từ (ví dụ "is" /ɪz/ đọc thành "ít" hoặc "is" gió).',
    mouthGuide: 'Đặt tay lên cổ họng, vừa xì răng vừa cảm nhận thanh quản rung bần bật.',
    audioSampleWord: 'zoo',
    examples: [
      { word: 'easy', ipa: '/ˈiː.zi/', meaningVi: 'dễ dàng', syllables: 'ea-sy', highlightPart: 's' },
      { word: 'always', ipa: '/ˈɔːl.weɪz/', meaningVi: 'luôn luôn', syllables: 'al-ways', highlightPart: 's' },
      { word: 'music', ipa: '/ˈmjuː.zɪk/', meaningVi: 'âm nhạc', syllables: 'mu-sic', highlightPart: 's' },
      { word: 'rose', ipa: '/roʊz/', meaningVi: 'hoa hồng', highlightPart: 'se' },
    ]
  },
  {
    id: 'theta_voiceless',
    symbol: 'θ',
    type: 'consonant-voiceless',
    name: 'Unvoiced TH (Chiêu Thè Lưỡi Cắn Nhẹ Không Rung)',
    vietnameseGuide: 'Thò nhẹ đầu lưỡi ra giữa 2 hàm răng khoảng 0.5cm, thổi luồng hơi gió êm ra ngoài. Cổ họng KHÔNG rung.',
    vietnameseCommonMistake: 'Hầu hết người mới học đều đọc thành chữ "th" hoặc "t" tiếng Việt ("think" -> "thinh", "three" -> "tri").',
    mouthGuide: 'Đặt đầu lưỡi thò ra giữa 2 hàng răng cửa, đẩy luồng hơi êm qua bề mặt lưỡi.',
    audioSampleWord: 'think',
    examples: [
      { word: 'thank', ipa: '/θæŋk/', meaningVi: 'cảm ơn', highlightPart: 'th' },
      { word: 'mouth', ipa: '/maʊθ/', meaningVi: 'cái miệng', highlightPart: 'th' },
      { word: 'birthday', ipa: '/ˈbɜːrθ.deɪ/', meaningVi: 'sinh nhật', syllables: 'birth-day', highlightPart: 'th' },
      { word: 'path', ipa: '/pæθ/', meaningVi: 'con đường nhỏ', highlightPart: 'th' },
    ]
  },
  {
    id: 'eth_voiced',
    symbol: 'ð',
    type: 'consonant-voiced',
    name: 'Voiced TH (Chiêu Thè Lưỡi Rung Cổ)',
    vietnameseGuide: 'Khẩu hình đặt lưỡi giữa 2 răng giống /θ/, nhưng phải RUNG DÂY THANH QUẢN tạo âm dzz-dzz ấm áp.',
    vietnameseCommonMistake: 'Người Việt hay đọc thành chữ "d" hoặc "đ" tiếng Việt ("this" -> "đít", "the" -> "đơ").',
    mouthGuide: 'Đầu lưỡi kẹp nhẹ giữa 2 hàm răng, rung cổ họng phát ra âm dzz-dzz ấm áp.',
    audioSampleWord: 'this',
    examples: [
      { word: 'mother', ipa: '/ˈmʌð.ɚ/', meaningVi: 'mẹ', syllables: 'moth-er', highlightPart: 'th' },
      { word: 'weather', ipa: '/ˈweð.ɚ/', meaningVi: 'thời tiết', syllables: 'weath-er', highlightPart: 'th' },
      { word: 'together', ipa: '/təˈɡeð.ɚ/', meaningVi: 'cùng nhau', syllables: 'to-geth-er', highlightPart: 'th' },
      { word: 'breathe', ipa: '/briːð/', meaningVi: 'hít thở', highlightPart: 'the' },
    ]
  },
  {
    id: 'sh_voiceless',
    symbol: 'ʃ',
    type: 'consonant-voiceless',
    name: 'SH Sound (Âm Chu Môi Suỵt Im Lặng)',
    vietnameseGuide: 'Chu môi tròn về phía trước như đang ra hiệu "Suỵt! Trật tự nào", đẩy luồng hơi ma sát mạnh mẽ.',
    vietnameseCommonMistake: 'Không chu môi, để bẹt miệng biến thành âm /s/ nhẹ ("she" đọc thành "si").',
    mouthGuide: 'Môi loe tròn về phía trước, lưỡi cong nhẹ lùi về sau, thổi hơi ma sát mạnh mẽ.',
    audioSampleWord: 'she',
    examples: [
      { word: 'shop', ipa: '/ʃɑːp/', meaningVi: 'cửa hàng', highlightPart: 'sh' },
      { word: 'fish', ipa: '/fɪʃ/', meaningVi: 'con cá', highlightPart: 'sh' },
      { word: 'action', ipa: '/ˈæk.ʃən/', meaningVi: 'hành động', syllables: 'ac-tion', highlightPart: 'ti' },
      { word: 'special', ipa: '/ˈspeʃ.əl/', meaningVi: 'đặc biệt', syllables: 'spe-cial', highlightPart: 'ci' },
    ]
  },
  {
    id: 'ch_voiceless',
    symbol: 'tʃ',
    type: 'consonant-voiceless',
    name: 'CH Sound (Bật Hơi Chu Môi)',
    vietnameseGuide: 'Kết hợp giữa bật hơi của âm /t/ và chu môi của /ʃ/. Ngắt luồng khí rồi bật mạnh dứt khoát.',
    vietnameseCommonMistake: 'Đọc thành chữ "ch" tiếng Việt quá mềm, không có độ giật và nổ gió.',
    mouthGuide: 'Đầu lưỡi chặn vòm họng trên, môi chu tròn, bật lưỡi nhanh tạo tiếng nổ giòn "tch!".',
    audioSampleWord: 'chair',
    examples: [
      { word: 'watch', ipa: '/wɑːtʃ/', meaningVi: 'đồng hồ', highlightPart: 'tch' },
      { word: 'teach', ipa: '/tiːtʃ/', meaningVi: 'dạy học', highlightPart: 'ch' },
      { word: 'nature', ipa: '/ˈneɪ.tʃɚ/', meaningVi: 'thiên nhiên', syllables: 'na-ture', highlightPart: 'tu' },
      { word: 'future', ipa: '/ˈfjuː.tʃɚ/', meaningVi: 'tương lai', syllables: 'fu-ture', highlightPart: 'tu' },
    ]
  },
  {
    id: 'd3_voiced',
    symbol: 'dʒ',
    type: 'consonant-voiced',
    name: 'DJ Sound (Âm J Giọng Mỹ Rung Họng)',
    vietnameseGuide: 'Khẩu hình giống /tʃ/ nhưng RUNG THANH QUẢN mạnh mẽ trong cổ họng.',
    vietnameseCommonMistake: 'Đọc thành "d" hoặc "z" ("job" đọc thành "dóp" hoặc "dúp").',
    mouthGuide: 'Môi chu, lưỡi chạm vòm miệng bật xuống đồng thời rung dây thanh âm "dzzz!".',
    audioSampleWord: 'job',
    examples: [
      { word: 'bridge', ipa: '/brɪdʒ/', meaningVi: 'cây cầu', highlightPart: 'dge' },
      { word: 'large', ipa: '/lɑːrdʒ/', meaningVi: 'rộng lớn', highlightPart: 'ge' },
      { word: 'orange', ipa: '/ˈɔːr.ɪndʒ/', meaningVi: 'quả cam', syllables: 'or-ange', highlightPart: 'ge' },
      { word: 'manage', ipa: '/ˈmæn.ədʒ/', meaningVi: 'quản lý', syllables: 'man-age', highlightPart: 'ge' },
    ]
  }
];
