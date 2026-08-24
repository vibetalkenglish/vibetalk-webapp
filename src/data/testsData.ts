import { LevelTest } from '@/types';

export const LEVEL_TESTS: Record<string, LevelTest> = {
  lv0: {
    levelId: 'lv0',
    titleVi: 'Bài Kiểm Tra Thăng Cấp: Level 0 ➔ Level 1 (Chuẩn A1)',
    descriptionVi: 'Đạt tối thiểu 80% để chứng minh bạn đã làm chủ 44 âm IPA và triệt tiêu thói quen nuốt âm đuôi!',
    passingScore: 80,
    totalQuestions: 5,
    questions: [
      {
        id: 'q0-1',
        type: 'ipa-identification',
        prompt: 'Từ "like" (/laɪk/) có âm đuôi kết thúc là âm nào?',
        promptVi: 'Chọn âm vị kết thúc chính xác để tránh đọc nhầm sang từ "lie" hoặc "light":',
        audioText: 'like',
        options: ['/t/', '/k/', '/s/', '/d/'],
        correctAnswerIndex: 1,
        explanationVi: 'Từ "like" phiên âm là /laɪk/, kết thúc bằng âm bật /k/. Nếu bỏ âm /k/, từ sẽ nghe thành "lie" /laɪ/ (nói dối).'
      },
      {
        id: 'q0-2',
        type: 'listen-choose-word',
        prompt: 'Hãy nghe phát âm và chọn từ có nguyên âm dài /iː/ (mỉm cười căng môi):',
        promptVi: 'Phân biệt cặp từ gây lú giữa /iː/ dài và /ɪ/ ngắn:',
        audioText: 'beach',
        options: ['bitch', 'beach', 'bet', 'batch'],
        correctAnswerIndex: 1,
        explanationVi: '"beach" phiên âm là /biːtʃ/ với âm /iː/ dài và căng khóe môi sang 2 bên.'
      },
      {
        id: 'q0-3',
        type: 'ending-sound-check',
        prompt: 'Trong từ "nice" (/naɪs/), chữ cái đuôi "-ce" được phát âm là âm gì?',
        promptVi: 'Quy tắc âm đuôi cho từ kết thúc bằng -ce:',
        audioText: 'nice',
        options: ['/k/', '/s/', '/z/', '/tʃ/'],
        correctAnswerIndex: 1,
        explanationVi: 'Đuôi "-ce" trong tiếng Anh (nice, face, place, price) luôn được phát âm là âm xì gió /s/.'
      },
      {
        id: 'q0-4',
        type: 'ipa-identification',
        prompt: 'Hiện tượng "Flap T" trong giọng Mỹ biến từ "water" được phát âm tự nhiên giống như thế nào?',
        promptVi: 'Đặc trưng phát âm giọng Mỹ:',
        audioText: 'water',
        options: [
          'Đọc bật mạnh âm "t": "Wah-ter"',
          'Biến /t/ thành /d/ nhẹ: "Wah-der"',
          'Nuốt hoàn toàn âm t: "Wah-er"',
          'Đổi thành âm s: "Wah-ser"'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Trong giọng Mỹ, khi âm /t/ đứng giữa 2 nguyên âm không mang trọng âm, nó sẽ biến thành âm Flap T /t̬/ (đọc lướt như chữ d nhẹ).'
      },
      {
        id: 'q0-5',
        type: 'dialogue-completion',
        prompt: 'Điền từ thích hợp vào chỗ trống: "Do you ____ to practice English every day?"',
        promptVi: 'Chọn từ có ngữ pháp và phát âm phù hợp:',
        audioText: 'Do you like to practice English every day?',
        options: ['likes', 'like', 'liked', 'likely'],
        correctAnswerIndex: 1,
        explanationVi: 'Sau trợ động từ "Do", động từ ở dạng nguyên thể không chia: "like".'
      }
    ]
  },
  lv1: {
    levelId: 'lv1',
    titleVi: 'Bài Kiểm Tra Thăng Cấp: Level 1 ➔ Level 2 (Chuẩn A2)',
    descriptionVi: 'Đạt tối thiểu 80% để mở khóa Level 2 - Tiếng Anh đi làm và công sở tại Việt Nam!',
    passingScore: 80,
    totalQuestions: 5,
    questions: [
      {
        id: 'q1-1',
        type: 'dialogue-completion',
        prompt: 'Khi gọi đồ uống tại quán cafe, câu nào sau đây tự nhiên và lịch thiệp nhất?',
        promptVi: 'Chọn mẫu câu chuẩn văn hóa giao tiếp:',
        audioText: 'Can I get a grande iced Americano, please?',
        options: [
          'Give me one coffee now!',
          'Can I get a grande iced Americano, please?',
          'I want coffee immediately.',
          'Bring me coffee here.'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Mẫu câu "Can I get [item], please?" là cấu trúc chuẩn và phổ biến nhất người Mỹ dùng khi order tại quầy.'
      },
      {
        id: 'q1-2',
        type: 'listen-choose-word',
        prompt: 'Từ "receipt" (hóa đơn) có chữ cái "p" được phát âm như thế nào?',
        promptVi: 'Quy tắc âm câm trong tiếng Anh:',
        audioText: 'receipt',
        options: [
          'Bật mạnh âm /p/ ở giữa',
          'Chữ "p" là âm câm hoàn toàn, đọc là /rɪˈsiːt/',
          'Đổi thành âm /f/',
          'Đọc là "re-cep-t"'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Trong từ "receipt", chữ cái "p" là âm câm (silent letter). Phiên âm chuẩn là /rɪˈsiːt/.'
      },
      {
        id: 'q1-3',
        type: 'ipa-identification',
        prompt: 'Câu chào "How is it going?" khi người Mỹ nói tự nhiên sẽ nối âm như thế nào?',
        promptVi: 'Quy tắc nối âm Connected Speech:',
        audioText: 'How is it going?',
        options: [
          'Đọc tách rời từng từ: How - Is - It - Going',
          'Nối âm /z/ sang "it": "How-zit-going"',
          'Bỏ hoàn toàn chữ "is": "How going"',
          'Đọc thành "How are you"'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Âm /z/ cuối từ "is" nối sang nguyên âm /ɪ/ của từ "it", tạo thành "how-zit going" rất mượt mà.'
      },
      {
        id: 'q1-4',
        type: 'ending-sound-check',
        prompt: 'Khi chỉ đường cho khách Tây: "Go straight ahead", cụm này nối âm như thế nào?',
        promptVi: 'Kỹ năng chỉ đường tại Việt Nam:',
        audioText: 'Go straight ahead',
        options: [
          'Tách rời: Straight - A - Head',
          'Nối /t/ sang /ə/: "Stray-tuh-head"',
          'Nuốt chữ straight',
          'Đọc thành go ahead'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Âm /t/ cuối từ "straight" nối sang Schwa /ə/ của "ahead" tạo thành "stray-tuh-head".'
      },
      {
        id: 'q1-5',
        type: 'listen-choose-word',
        prompt: 'Từ "awesome" mang nghĩa và phiên âm nào dưới đây?',
        promptVi: 'Từ vựng cửa miệng phong cách Mỹ:',
        audioText: 'awesome',
        options: [
          '/ˈɑː.səm/ - Tuyệt vời, đỉnh chóp',
          '/ˈoʊ.sʌm/ - Buồn bã',
          '/əˈweɪ/ - Rời đi',
          '/ˈæf.tɚ/ - Sau khi'
        ],
        correctAnswerIndex: 0,
        explanationVi: '"awesome" /ˈɑː.səm/ là từ khen ngợi cực kỳ phổ biến trong tiếng Anh Mỹ.'
      }
    ]
  },
  lv2: {
    levelId: 'lv2',
    titleVi: 'Bài Kiểm Tra Thăng Cấp: Level 2 ➔ Level 3 (Chuẩn B1)',
    descriptionVi: 'Khẳng định khả năng phỏng vấn xin việc, họp online và giao tiếp công sở tại Việt Nam!',
    passingScore: 80,
    totalQuestions: 5,
    questions: [
      {
        id: 'q2-1',
        type: 'ipa-identification',
        prompt: 'Trong cụm từ "To be honest", chữ "h" được phát âm như thế nào?',
        promptVi: 'Quy tắc âm câm trong giao tiếp công sở:',
        audioText: 'To be honest',
        options: [
          'Phát âm rõ âm /h/: "hó-nịt"',
          'Âm "h" là âm câm, bắt đầu bằng nguyên âm /ɑː/: /ˈɑː.nɪst/',
          'Đọc thành âm /k/',
          'Đọc thành âm /w/'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Trong "honest", chữ "h" hoàn toàn là âm câm. Đọc chuẩn Mỹ là /ˈɑː.nɪst/.'
      },
      {
        id: 'q2-2',
        type: 'dialogue-completion',
        prompt: 'Đồng nghiệp nói: "I have a tight deadline today." - Câu đáp lại nào thể hiện sự đồng cảm?',
        promptVi: 'Kỹ năng Small Talk nơi công sở:',
        audioText: 'I have a tight deadline today.',
        options: [
          'I don\'t care.',
          'Hang in there! Let me know if you need any help.',
          'Go home now.',
          'Deadline is funny.'
        ],
        correctAnswerIndex: 1,
        explanationVi: '"Hang in there!" (Cố gắng lên nhé!) cùng lời đề nghị hỗ trợ là phản xạ giao tiếp công sở rất chuyên nghiệp.'
      },
      {
        id: 'q2-3',
        type: 'listen-choose-word',
        prompt: 'Từ "schedule" theo phát âm chuẩn Anh-Mỹ (US) bắt đầu bằng cụm âm nào?',
        promptVi: 'Phân biệt giọng Anh - Mỹ vs Anh - Anh:',
        audioText: 'schedule',
        options: [
          'Bắt đầu bằng /ʃ/ ("shed-jool" - Giọng Anh-Anh)',
          'Bắt đầu bằng /sk/ ("sked-jool" - Giọng Anh-Mỹ)',
          'Bắt đầu bằng /tʃ/ ("ched-jool")',
          'Bắt đầu bằng /s/ ("sed-jool")'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Người Mỹ luôn phát âm "schedule" là /ˈskedʒ.uːl/ (bắt đầu bằng âm /sk/).'
      },
      {
        id: 'q2-4',
        type: 'ipa-identification',
        prompt: 'Trong cuộc họp online qua Zoom, khi muốn kiểm tra màn hình chia sẻ, bạn nên nói câu nào?',
        promptVi: 'Tiếng Anh họp online chuyên nghiệp:',
        audioText: 'Can everyone see my screen clearly?',
        options: [
          'Look at my computer immediately',
          'Can everyone see my screen clearly?',
          'Why are you not looking?',
          'Computer is on'
        ],
        correctAnswerIndex: 1,
        explanationVi: '"Can everyone see my screen clearly?" là câu mở đầu chuẩn mực và lịch sự khi trình bày trong cuộc họp online.'
      },
      {
        id: 'q2-5',
        type: 'dialogue-completion',
        prompt: 'Khi muốn nêu ý kiến cá nhân một cách lịch sự, bạn nên dùng cụm nào?',
        promptVi: 'Mẫu câu diễn đạt ý kiến tự nhiên:',
        audioText: 'Personally, I believe consistency is the key.',
        options: [
          'Listen to me now',
          'From my perspective / Personally',
          'You are wrong',
          'I force you to think'
        ],
        correctAnswerIndex: 1,
        explanationVi: '"Personally" hoặc "From my perspective" giúp ý kiến của bạn trở nên khách quan, lịch thiệp và mang tính xây dựng.'
      }
    ]
  },
  lv3: {
    levelId: 'lv3',
    titleVi: 'Bài Kiểm Tra Tốt Nghiệp Toàn Khóa: Level 3 (Chuẩn B1+ / B2)',
    descriptionVi: 'Khẳng định khả năng du lịch tự túc toàn cầu, bẻ khóa nối âm và phản xạ độc lập như người bản xứ!',
    passingScore: 80,
    totalQuestions: 5,
    questions: [
      {
        id: 'q3-1',
        type: 'dialogue-completion',
        prompt: 'Khi làm thủ tục tại sân bay quốc tế, nhân viên hỏi: "What is the purpose of your visit?", bạn nên trả lời thế nào nếu đi nghỉ dưỡng?',
        promptVi: 'Kỹ năng xuất nhập cảnh sân bay:',
        audioText: 'I am here for a vacation for seven days.',
        options: [
          'I don\'t know.',
          'I am here for a vacation for seven days.',
          'Give me passport.',
          'Go away please.'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Câu trả lời trực diện, rõ ràng về mục đích (vacation) và thời gian lưu trú (seven days) giúp bạn qua hải quan nhanh chóng.'
      },
      {
        id: 'q3-2',
        type: 'ipa-identification',
        prompt: 'Trong giao tiếp đời thường của người Mỹ, cụm "going to" và "want to" thường được rút gọn thành:',
        promptVi: 'Hiện tượng nối âm và nuốt âm đời thực:',
        audioText: 'I am gonna do it right now.',
        options: [
          'Gonna & Wanna',
          'Gotta & Lemme',
          'Kinda & Outta',
          'Shoulda & Coulda'
        ],
        correctAnswerIndex: 0,
        explanationVi: '"Going to" rút gọn thành "Gonna", "Want to" rút gọn thành "Wanna" trong văn nói tự nhiên của người Mỹ.'
      },
      {
        id: 'q3-3',
        type: 'listen-choose-word',
        prompt: 'Từ lóng "No biggie" của người Mỹ có nghĩa là gì?',
        promptVi: 'Tiếng lóng giao tiếp hiện đại:',
        audioText: 'No biggie! You are welcome.',
        options: [
          'Không to lớn',
          'Không có chi / Không sao cả (No problem)',
          'Rất nghiêm trọng',
          'Cần giúp đỡ'
        ],
        correctAnswerIndex: 1,
        explanationVi: '"No biggie" là cách nói thân mật của "No problem" hoặc "It is not a big deal" (Chuyện nhỏ ấy mà, không có gì đâu).'
      },
      {
        id: 'q3-4',
        type: 'ending-sound-check',
        prompt: 'Khi khách sạn phòng bị hỏng điều hòa, câu nào sau đây là cách phàn nàn lịch thiệp và hiệu quả?',
        promptVi: 'Xử lý tình huống du lịch nước ngoài:',
        audioText: 'The air conditioner in my room is not working. Could someone check it?',
        options: [
          'Your hotel is terrible, fix it now!',
          'The air conditioner in my room is not working. Could someone check it?',
          'I hate this room.',
          'Give me money back.'
        ],
        correctAnswerIndex: 1,
        explanationVi: 'Mô tả rõ sự cố + câu nhờ hỗ trợ lịch sự ("Could someone check it?") là cách giải quyết chuyên nghiệp nhất.'
      },
      {
        id: 'q3-5',
        type: 'dialogue-completion',
        prompt: 'Cụm từ "Hit the road" trong câu "Let\'s hit the road before it gets dark" có nghĩa là gì?',
        promptVi: 'Thành ngữ thông dụng tiếng Anh Mỹ:',
        audioText: 'Let us hit the road now.',
        options: [
          'Đập phá mặt đường',
          'Lên đường / Xuất phát chuyến đi',
          'Dừng xe lại',
          'Đi bộ tập thể dục'
        ],
        correctAnswerIndex: 1,
        explanationVi: '"Hit the road" là thành ngữ rất phổ biến có nghĩa là bắt đầu chuyến đi hoặc rời đi (Depart / Start a journey).'
      }
    ]
  }
};
