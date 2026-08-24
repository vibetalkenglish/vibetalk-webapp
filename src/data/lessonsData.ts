import { Lesson, LevelInfo } from '@/types';

export const LEVELS_CONFIG: LevelInfo[] = [
  {
    id: 'lv0',
    title: 'Level 0: Xóa Mù Phát Âm – Bẻ Khóa Âm Đuôi Giọng Mỹ',
    subTitle: 'Từ nay "Like" không còn là "Lie" • Làm chủ 44 âm IPA',
    cefrLevel: 'Chuẩn A1 Foundation',
    badge: 'Phonetics Master 🥉',
    descriptionVi: 'Dành cho người mất gốc, hay nuốt âm đuôi /s/, /t/, /d/, /k/, phát âm theo kiểu Vietlish, chưa phân biệt được nguyên âm ngắn/dài trong giọng Anh - Mỹ.',
    targetVi: 'Triệt tiêu thói quen nuốt âm đuôi, đọc chuẩn 44 âm IPA và tự tin phát âm đúng 100% từ vựng có phiên âm.',
    color: 'from-amber-500 to-orange-500',
    lessons: ['lv0-lesson-1', 'lv0-lesson-2', 'lv0-lesson-3', 'lv0-lesson-4', 'lv0-lesson-5', 'lv0-lesson-6'],
    requiredScoreToPass: 80,
  },
  {
    id: 'lv1',
    title: 'Level 1: Phản Xạ Đời Thường & Tự Tin Giao Tiếp',
    subTitle: 'Order Starbucks, Mua sắm, Chỉ đường cho khách Tây',
    cefrLevel: 'Chuẩn A2 Elementary',
    badge: 'Daily Speaker 🥈',
    descriptionVi: 'Xóa bỏ phản xạ dịch nhẩm trong đầu. Tự tin giao tiếp đời sống thực tế: gọi món tại chuỗi quốc tế, mua sắm, chỉ đường cho người nước ngoài tại Việt Nam.',
    targetVi: 'Tự tin nói các câu giao tiếp hàng ngày tự nhiên theo phong cách người Mỹ, ngắt nghỉ đúng ngữ điệu và phát âm trôi chảy.',
    color: 'from-blue-500 to-indigo-600',
    lessons: ['lv1-lesson-1', 'lv1-lesson-2', 'lv1-lesson-3', 'lv1-lesson-4', 'lv1-lesson-5', 'lv1-lesson-6'],
    requiredScoreToPass: 80,
  },
  {
    id: 'lv2',
    title: 'Level 2: Tiếng Anh Đi Làm, Phỏng Vấn & Công Sở',
    subTitle: 'Phỏng vấn xin việc, Họp online Zoom, Email chuyên nghiệp',
    cefrLevel: 'Chuẩn B1 Intermediate',
    badge: 'Career Ace 🥇',
    descriptionVi: 'Dành cho người muốn làm việc tại công ty đa quốc gia / FDI tại Việt Nam: Phỏng vấn xin việc, họp Zoom/Teams, Small Talk với sếp Tây và viết email ngắn gọn.',
    targetVi: 'Làm chủ giao tiếp công sở, phản xạ đàm phán, bày tỏ quan điểm độc lập và nắm bắt cơ hội tăng lương thăng tiến.',
    color: 'from-emerald-500 to-teal-600',
    lessons: ['lv2-lesson-1', 'lv2-lesson-2', 'lv2-lesson-3', 'lv2-lesson-4', 'lv2-lesson-5', 'lv2-lesson-6'],
    requiredScoreToPass: 80,
  },
  {
    id: 'lv3',
    title: 'Level 3: Du Lịch Thế Giới Tự Túc & Phản Xạ B2',
    subTitle: 'Sân bay quốc tế, Nối âm Connected Speech, Tiếng lóng Mỹ',
    cefrLevel: 'Chuẩn B1+ / B2 Independent',
    badge: 'Global Fluency 👑',
    descriptionVi: 'Xách vali đi du lịch nước ngoài tự túc khắp thế giới, xử lý sự cố sân bay/khách sạn, bẻ khóa nối âm (Connected Speech) và xem phim US-UK không phụ đề.',
    targetVi: 'Đạt ngưỡng người dùng tiếng Anh độc lập (Independent Speaker), phản xạ tự nhiên như người bản xứ mà không sợ bí từ.',
    color: 'from-purple-600 to-pink-600',
    lessons: ['lv3-lesson-1', 'lv3-lesson-2', 'lv3-lesson-3', 'lv3-lesson-4', 'lv3-lesson-5', 'lv3-lesson-6'],
    requiredScoreToPass: 80,
  },
];

export const LESSONS: Lesson[] = [
  // ================= LEVEL 0 (6 BÀI) =================
  {
    id: 'lv0-lesson-1',
    levelId: 'lv0',
    titleEn: 'Mastering Ending Sounds: /s/, /z/, /t/, /d/, /k/',
    titleVi: 'Bộ 5 Âm Đuôi Sống Còn: Tuyệt Chiêu Không Nuốt Âm',
    descriptionVi: 'Khắc phục lỗi kinh điển của 90% người Việt: bỏ quên âm kết thúc khiến người nước ngoài không hiểu bạn đang nói từ gì.',
    icon: 'Sparkles',
    durationMinutes: 12,
    tags: ['Âm đuôi', 'IPA Giọng Mỹ', 'Trị nuốt âm'],
    keyTakeaways: [
      'Hiểu vì sao tiếng Việt không có âm đuôi bật hơi và cách tạo phản xạ mới',
      'Phân biệt cặp từ dễ gây hiểu lầm: Like vs Light vs Line vs Lie',
      'Thực hành xì âm /s/, rung âm /z/ và bật /k/ ở cuối từ giòn tan'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Bật Âm /t/ và /d/ Cuối Từ',
        description: 'Đầu lưỡi chạm mạnh chân răng trên, nén hơi rồi bật nhẹ dứt khoát.',
        rule: 'Không kéo dài, âm đuôi chỉ chiếm 20% trường độ của từ.',
        examples: [
          { en: 'cat', ipa: '/kæt/', vi: 'con mèo', soundTip: 'Bật nhẹ /t/ dứt khoát' },
          { en: 'need', ipa: '/niːd/', vi: 'cần thiết', soundTip: 'Rung nhẹ /d/ ở cuống lưỡi' },
          { en: 'light', ipa: '/laɪt/', vi: 'ánh sáng', soundTip: 'Khác với "like" /laɪk/' },
        ]
      },
      {
        title: 'Mẹo Âm /s/ và /z/ Cuối Từ (Âm Xì Gió)',
        description: 'Hai hàm răng khép hờ, xì luồng hơi gió giòn tan như mở nắp lon nước ngọt.',
        rule: 'Từ kết thúc bằng nguyên âm + s hoặc phụ âm rung -> đọc là /z/.',
        examples: [
          { en: 'is', ipa: '/ɪz/', vi: 'thì/là', soundTip: 'Đọc là /ɪz/ (rung), không đọc /ɪs/' },
          { en: 'face', ipa: '/feɪs/', vi: 'khuôn mặt', soundTip: 'Đuôi -ce luôn đọc là /s/' },
          { en: 'six', ipa: '/sɪks/', vi: 'số 6', soundTip: 'Bao gồm cả âm /k/ + /s/' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v0-1',
        word: 'like',
        ipa: '/laɪk/',
        partOfSpeech: 'verb',
        meaningVi: 'thích / giống như',
        exampleSentence: 'I like this American accent.',
        exampleSentenceVi: 'Tôi thích chất giọng Anh - Mỹ này.',
        endingSoundNote: 'Nhớ bật âm /k/ cuối, nếu không sẽ nghe thành từ "lie" (nói dối).',
        americanTip: 'Bật /k/ giòn trong cổ họng.'
      },
      {
        id: 'v0-2',
        word: 'nice',
        ipa: '/naɪs/',
        partOfSpeech: 'adj',
        meaningVi: 'tuyệt vời, đẹp, dễ thương',
        exampleSentence: 'Have a nice day!',
        exampleSentenceVi: 'Chúc một ngày tốt lành!',
        endingSoundNote: 'Đuôi -ce đọc thành âm /s/ xì gió rõ ràng.',
        americanTip: 'Cười tươi và xì hơi nhẹ.'
      },
      {
        id: 'v0-3',
        word: 'practice',
        ipa: '/ˈpræk.tɪs/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'luyện tập',
        exampleSentence: 'Practice makes perfect.',
        exampleSentenceVi: 'Luyện tập tạo nên sự hoàn hảo.',
        endingSoundNote: 'Trọng âm rơi vào âm tiết đầu PRAC-, đuôi xì /s/.',
        americanTip: 'Âm /æ/ hạ cằm sâu.'
      },
      {
        id: 'v0-4',
        word: 'exact',
        ipa: '/ɪɡˈzækt/',
        partOfSpeech: 'adj',
        meaningVi: 'chính xác',
        exampleSentence: 'That is the exact word.',
        exampleSentenceVi: 'Đó chính là từ ngữ chính xác.',
        endingSoundNote: 'Cụm âm đuôi /kt/ cần bật cả /k/ rồi chuyển sang /t/.',
        americanTip: 'Giữ luồng hơi ngắt nhẹ dứt khoát.'
      }
    ],
    dialogue: [
      {
        id: 'd0-1',
        speaker: 'A',
        speakerName: 'Alex (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Do you like to practice English every day?',
        textVi: 'Bạn có thích luyện tập tiếng Anh mỗi ngày không?',
        ipa: '/duː juː laɪk tuː ˈpræk.tɪs ˈɪŋ.ɡlɪʃ ˈev.ri deɪ/'
      },
      {
        id: 'd0-2',
        speaker: 'B',
        speakerName: 'Lan (Học viên)',
        avatar: '👩‍🎓',
        textEn: 'Yes! It is very nice and helpful.',
        textVi: 'Có chứ! Nó rất tuyệt và hữu ích.',
        ipa: '/jes! ɪt ɪz ˈver.i naɪs ænd ˈhelp.fəl/'
      },
      {
        id: 'd0-3',
        speaker: 'A',
        speakerName: 'Alex (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Great job with your ending sounds!',
        textVi: 'Bạn phát âm các âm đuôi rất chuẩn đấy!',
        ipa: '/ɡreɪt dʒɑːb wɪð jɔːr ˈen.dɪŋ saʊndz/'
      }
    ]
  },
  {
    id: 'lv0-lesson-2',
    levelId: 'lv0',
    titleEn: 'Confusing Vowel Pairs: /iː/ vs /ɪ/',
    titleVi: 'Cặp Âm Gây Lú: Mẹo Cười Tươi vs Mặt Quạu (/iː/ vs /ɪ/)',
    descriptionVi: 'Tránh những pha "muối mặt" khi phát âm nhầm giữa "sheet" (tờ giấy) và từ bậy, hoặc "beach" (bãi biển) và từ nhạy cảm.',
    icon: 'Volume2',
    durationMinutes: 15,
    tags: ['Nguyên âm', 'Cặp từ gây lú', 'Khẩu hình'],
    keyTakeaways: [
      'Cách nhận diện nguyên âm căng môi (Tense) và nguyên âm thả lỏng (Lax)',
      'Quy tắc kéo dài 1s cho /iː/ và phát âm dứt khoát 0.3s cho /ɪ/',
      'Thực hành các cặp từ tương phản không sợ nói hớ'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Cặp /iː/ (Cười Tươi) vs /ɪ/ (Mặt Thả Lỏng)',
        description: 'Âm /iː/ khóe môi bè sang 2 bên như đang mỉm cười. Âm /ɪ/ cơ mặt thả lỏng, hơi hướng âm "ê" nhẹ.',
        rule: 'Kéo dài 1s cho /iː/ và phát âm dứt khoát 0.3s cho /ɪ/.',
        examples: [
          { en: 'sheet', ipa: '/ʃiːt/', vi: 'tờ giấy / ga trải giường', soundTip: 'Kéo dài môi cười tươi' },
          { en: 'sit', ipa: '/sɪt/', vi: 'ngồi xuống', soundTip: 'Thả lỏng hàm ngắn gọn' },
          { en: 'beach', ipa: '/biːtʃ/', vi: 'bãi biển', soundTip: 'Âm /iː/ căng mọng' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v0-5',
        word: 'beach',
        ipa: '/biːtʃ/',
        partOfSpeech: 'noun',
        meaningVi: 'bãi biển',
        exampleSentence: 'Let\'s go to the beach this weekend.',
        exampleSentenceVi: 'Cuối tuần này cùng đi biển nhé.',
        endingSoundNote: 'Âm /iː/ dài mỉm cười + đuôi /tʃ/ chu môi nổ gió.',
        americanTip: 'Kéo dài âm ee để không bị nhầm lẫn với từ nhạy cảm.'
      },
      {
        id: 'v0-6',
        word: 'ship',
        ipa: '/ʃɪp/',
        partOfSpeech: 'noun',
        meaningVi: 'con tàu lớn',
        exampleSentence: 'The ship is sailing on the ocean.',
        exampleSentenceVi: 'Con tàu đang lướt đi trên đại dương.',
        endingSoundNote: 'Âm đầu /ʃ/ chu mỏ, âm giữa /ɪ/ ngắn thả lỏng.',
        americanTip: 'Bật nhẹ /p/ ở môi.'
      }
    ],
    dialogue: [
      {
        id: 'd0-4',
        speaker: 'A',
        speakerName: 'Sarah (Mỹ)',
        avatar: '👩‍🦰',
        textEn: 'Please sit down and take a look at this sheet.',
        textVi: 'Xin mời ngồi xuống và xem qua tờ tài liệu này.',
        ipa: '/pliːz sɪt daʊn ænd teɪk ə lʊk æt ðɪs ʃiːt/'
      },
      {
        id: 'd0-5',
        speaker: 'B',
        speakerName: 'David (Mỹ)',
        avatar: '👨‍🦱',
        textEn: 'Thanks! The view of the beach outside is amazing.',
        textVi: 'Cảm ơn! Quang cảnh bãi biển bên ngoài thật tuyệt vời.',
        ipa: '/θæŋks! ðə vjuː ʌv ðə biːtʃ ˌaʊtˈsaɪd ɪz əˈmeɪ.zɪŋ/'
      }
    ]
  },
  {
    id: 'lv0-lesson-3',
    levelId: 'lv0',
    titleEn: 'Ash A /æ/ vs Short E /e/',
    titleVi: 'Âm A Rớt Hàm /æ/ vs /e/ (Mẹo Há To Cắn Burger)',
    descriptionVi: 'Học cách hạ hàm sâu để phát âm chuẩn xác âm /æ/ bẹt đậm chất Mỹ trong "cat, bag, black, back" mà không bị biến thành âm e tiếng Việt.',
    icon: 'Maximize2',
    durationMinutes: 14,
    tags: ['Âm A rớt hàm', 'Khẩu hình', 'Giọng Mỹ'],
    keyTakeaways: [
      'Hạ hàm dưới xuống tối đa khi phát âm âm /æ/',
      'Phân biệt cặp từ kinh điển: Man vs Men, Bad vs Bed, Pan vs Pen',
      'Đọc câu liền mạch có nhiều âm /æ/'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Hạ Cằm Cho Âm /æ/',
        description: 'Đặt một ngón tay dưới cằm, khi phát âm "cat", cằm phải đẩy ngón tay xuống sâu ít nhất 2cm.',
        rule: 'Há to miệng theo cả chiều dọc lẫn chiều ngang.',
        examples: [
          { en: 'cat', ipa: '/kæt/', vi: 'con mèo', soundTip: 'Hạ hàm thật sâu' },
          { en: 'black', ipa: '/blæk/', vi: 'màu đen', soundTip: 'Âm /æ/ bẹt vang' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v0-7',
        word: 'black',
        ipa: '/blæk/',
        partOfSpeech: 'adj',
        meaningVi: 'màu đen',
        exampleSentence: 'He is wearing a black jacket.',
        exampleSentenceVi: 'Anh ấy đang mặc một chiếc áo khoác đen.',
        endingSoundNote: 'Âm /æ/ hạ hàm sâu + đuôi /k/.',
        americanTip: 'Đừng đọc thành "bờ lếch".'
      },
      {
        id: 'v0-8',
        word: 'bag',
        ipa: '/bæɡ/',
        partOfSpeech: 'noun',
        meaningVi: 'cái túi xách, ba lô',
        exampleSentence: 'Put your laptop in the bag.',
        exampleSentenceVi: 'Hãy để laptop vào trong túi xách.',
        endingSoundNote: 'Âm /æ/ + đuôi /ɡ/ rung cổ họng.',
        americanTip: 'Bật nhẹ /ɡ/ cuối từ.'
      }
    ],
    dialogue: [
      {
        id: 'd0-8',
        speaker: 'A',
        speakerName: 'Jessica',
        avatar: '👩‍🦳',
        textEn: 'Is that black bag yours on the desk?',
        textVi: 'Chiếc túi màu đen trên bàn kia có phải của bạn không?',
        ipa: '/ɪz ðæt blæk bæɡ jɔːrz ɑːn ðə desk/'
      },
      {
        id: 'd0-9',
        speaker: 'B',
        speakerName: 'Nam',
        avatar: '🧑',
        textEn: 'Yes, that is my black bag. Thanks for asking!',
        textVi: 'Đúng rồi, đó là chiếc túi đen của tôi. Cảm ơn bạn đã hỏi!',
        ipa: '/jes, ðæt ɪz maɪ blæk bæɡ. θæŋks fɔːr ˈæsk.ɪŋ/'
      }
    ]
  },
  {
    id: 'lv0-lesson-4',
    levelId: 'lv0',
    titleEn: 'Interdental Sounds: /θ/ & /ð/',
    titleVi: 'Chiêu Thè Lưỡi Cắn Nhẹ: Cặp Âm /θ/ và /ð/',
    descriptionVi: 'Tuyệt đối không đọc "think" thành "thinh" hay "this" thành "đít". Nắm vững tuyệt chiêu kẹp lưỡi giữa hai hàm răng.',
    icon: 'Smile',
    durationMinutes: 15,
    tags: ['Thè lưỡi', 'Âm TH', 'Không nói ngọng'],
    keyTakeaways: [
      'Thò nhẹ đầu lưỡi ra giữa 2 hàm răng khoảng 0.5cm',
      'Âm /θ/ là âm gió (không rung họng): think, thank, birthday',
      'Âm /ð/ là âm rung (rung họng dzzz-dzzz): this, that, mother'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Quy Tắc Đặt Lưỡi Cặp Âm TH',
        description: 'Nhìn vào gương, đảm bảo nhìn thấy đầu lưỡi thò ra ngoài răng khi phát âm "think" hoặc "this".',
        rule: 'Không rụt lưỡi vào trong khoang miệng.',
        examples: [
          { en: 'think', ipa: '/θɪŋk/', vi: 'suy nghĩ', soundTip: 'Thổi hơi qua đầu lưỡi' },
          { en: 'this', ipa: '/ðɪs/', vi: 'cái này', soundTip: 'Rung dây thanh âm' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v0-9',
        word: 'think',
        ipa: '/θɪŋk/',
        partOfSpeech: 'verb',
        meaningVi: 'nghĩ, suy nghĩ',
        exampleSentence: 'I think you are doing a great job.',
        exampleSentenceVi: 'Tôi nghĩ bạn đang làm rất tốt đấy.',
        endingSoundNote: 'Đầu lưỡi thò ra + âm đuôi /ŋk/.',
        americanTip: 'Không đọc thành "thinh".'
      },
      {
        id: 'v0-10',
        word: 'together',
        ipa: '/təˈɡeð.ɚ/',
        partOfSpeech: 'adv',
        meaningVi: 'cùng nhau',
        exampleSentence: 'We can practice English together.',
        exampleSentenceVi: 'Chúng ta có thể cùng nhau luyện tập tiếng Anh.',
        endingSoundNote: 'Âm /ð/ rung ở giữa từ, đuôi -er cong lưỡi.',
        americanTip: 'Đọc là "tờ-ghe-đờr".'
      }
    ],
    dialogue: [
      {
        id: 'd0-10',
        speaker: 'A',
        speakerName: 'Mark',
        avatar: '🧔',
        textEn: 'What do you think about this new method?',
        textVi: 'Bạn nghĩ gì về phương pháp mới này?',
        ipa: '/wɑːt duː juː θɪŋk əˈbaʊt ðɪs nuː ˈmeθ.əd/'
      },
      {
        id: 'd0-11',
        speaker: 'B',
        speakerName: 'Huyền',
        avatar: '👩',
        textEn: 'I think it helps us speak more naturally together.',
        textVi: 'Tôi nghĩ nó giúp chúng ta nói tự nhiên hơn cùng nhau.',
        ipa: '/aɪ θɪŋk ɪt helps ʌs spiːk mɔːr ˈnætʃ.ɚ.əl.i təˈɡeð.ɚ/'
      }
    ]
  },
  {
    id: 'lv0-lesson-5',
    levelId: 'lv0',
    titleEn: 'Palato-Alveolar Sounds: /ʃ/, /tʃ/, /dʒ/',
    titleVi: 'Âm Chu Môi Suỵt Im Lặng /ʃ/ & Cặp Âm Bật /tʃ/, /dʒ/',
    descriptionVi: 'Học cách chu môi tròn để phát âm chuẩn xác "she, watch, job, change" mà không bị lẫn lộn sang âm s nhẹ.',
    icon: 'Radio',
    durationMinutes: 16,
    tags: ['Chu môi', 'Âm bật', 'Phụ âm khó'],
    keyTakeaways: [
      'Âm /ʃ/: Chu môi ra hiệu "Suỵt! Trật tự nào" (she, shopping, fish)',
      'Âm /tʃ/: Bật hơi nổ giòn "tch!" (chair, watch, change)',
      'Âm /dʒ/: Khẩu hình chu môi bật rung họng "dzzz!" (job, orange, bridge)'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Chu Môi Khi Phát Âm /ʃ/ và /tʃ/',
        description: 'Loe tròn khóe môi về phía trước khoảng 1cm, tạo khoảng trống cộng hưởng âm thanh.',
        rule: 'She -> chu môi, See -> bè miệng cười.',
        examples: [
          { en: 'she', ipa: '/ʃiː/', vi: 'cô ấy', soundTip: 'Chu môi tròn thổi gió' },
          { en: 'job', ipa: '/dʒɑːb/', vi: 'công việc', soundTip: 'Rung họng giòn tan' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v0-11',
        word: 'job',
        ipa: '/dʒɑːb/',
        partOfSpeech: 'noun',
        meaningVi: 'công việc, nghề nghiệp',
        exampleSentence: 'He got a great job at an international company.',
        exampleSentenceVi: 'Anh ấy vừa nhận được một công việc tuyệt vời tại công ty quốc tế.',
        endingSoundNote: 'Âm đầu /dʒ/ rung + đuôi /b/.',
        americanTip: 'Mở rộng họng âm /ɑː/.'
      },
      {
        id: 'v0-12',
        word: 'change',
        ipa: '/tʃeɪndʒ/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'thay đổi / tiền thừa trả lại',
        exampleSentence: 'Keep the change, please!',
        exampleSentenceVi: 'Xin cứ giữ lại tiền thừa nhé!',
        endingSoundNote: 'Bắt đầu bằng /tʃ/ và kết thúc bằng /ndʒ/.',
        americanTip: 'Bật nhẹ dứt khoát.'
      }
    ],
    dialogue: [
      {
        id: 'd0-12',
        speaker: 'A',
        speakerName: 'Tom',
        avatar: '👨',
        textEn: 'She just started a new job this morning.',
        textVi: 'Cô ấy vừa bắt đầu công việc mới sáng nay.',
        ipa: '/ʃiː dʒʌst ˈstɑːr.t̬ɪd ə nuː dʒɑːb ðɪs ˈmɔːr.nɪŋ/'
      },
      {
        id: 'd0-13',
        speaker: 'B',
        speakerName: 'Mai',
        avatar: '👩‍🦰',
        textEn: 'That is wonderful! A positive change for her career.',
        textVi: 'Tuyệt quá! Một sự thay đổi tích cực cho sự nghiệp của cô ấy.',
        ipa: '/ðæt ɪz ˈwʌn.dɚ.fəl! ə ˈpɑː.zə.t̬ɪv tʃeɪndʒ fɔːr hɜːr kəˈrɪr/'
      }
    ]
  },
  {
    id: 'lv0-lesson-6',
    levelId: 'lv0',
    titleEn: 'Flap T & Rhotic R-Colored Vowels /ɚ/',
    titleVi: 'Tuyệt Chiêu Nói Lười: Flap T & Âm Cong Lưỡi /ɚ/',
    descriptionVi: 'Bí mật số 1 tạo nên chất giọng Anh - Mỹ: Hiện tượng biến âm Flap T và cách cong lưỡi sâu cho các từ có chữ r.',
    icon: 'Flame',
    durationMinutes: 16,
    tags: ['Flap T', 'Cong lưỡi', 'Giọng Mỹ'],
    keyTakeaways: [
      'Biến âm /t/ kẹp giữa 2 nguyên âm thành /d/ nhẹ: Water -> Wah-der, City -> Cih-dee',
      'Âm R-colored /ɚ/ và /ɜːr/: Cong đầu lưỡi vào trong họng (bird, work, learn, better)',
      'Nói câu trôi chảy không bị vấp và mỏi miệng'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Quy Tắc Flap T & R-Colored',
        description: 'Thả lỏng đầu lưỡi quẹt nhẹ lên vòm miệng trên khi nói "better", "water".',
        rule: 'Better -> "Beh-der", Party -> "Par-dee".',
        examples: [
          { en: 'water', ipa: '/ˈwɑː.t̬ɚ/', vi: 'nước uống', soundTip: 'Đọc là "oa-đờr"' },
          { en: 'better', ipa: '/ˈbet̬.ɚ/', vi: 'tốt hơn', soundTip: 'Đọc là "beh-der"' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v0-13',
        word: 'water',
        ipa: '/ˈwɑː.t̬ɚ/',
        partOfSpeech: 'noun',
        meaningVi: 'nước',
        exampleSentence: 'Could I get a glass of cold water, please?',
        exampleSentenceVi: 'Cho tôi xin một ly nước lạnh được không?',
        endingSoundNote: 'Flap T /t̬/ + đuôi -er cong lưỡi.',
        americanTip: 'Nói lướt "wah-der" cực kỳ tự nhiên.'
      },
      {
        id: 'v0-14',
        word: 'better',
        ipa: '/ˈbet̬.ɚ/',
        partOfSpeech: 'adj',
        meaningVi: 'tốt hơn',
        exampleSentence: 'Your English is getting better every day.',
        exampleSentenceVi: 'Tiếng Anh của bạn đang tiến bộ hơn mỗi ngày.',
        endingSoundNote: 'Flap T nhẹ nhàng ở giữa từ.',
        americanTip: 'Quẹt nhẹ đầu lưỡi.'
      }
    ],
    dialogue: [
      {
        id: 'd0-14',
        speaker: 'A',
        speakerName: 'Phục vụ',
        avatar: '🤵',
        textEn: 'Would you like some cold water or hot tea?',
        textVi: 'Bạn muốn dùng chút nước lạnh hay trà nóng?',
        ipa: '/wʊd juː laɪk sʌm koʊld ˈwɑː.t̬ɚ ɔːr hɑːt tiː/'
      },
      {
        id: 'd0-15',
        speaker: 'B',
        speakerName: 'Khách hàng',
        avatar: '👩',
        textEn: 'Cold water is much better for me, thank you!',
        textVi: 'Nước lạnh sẽ tốt hơn nhiều cho tôi, cảm ơn bạn!',
        ipa: '/koʊld ˈwɑː.t̬ɚ ɪz mʌtʃ ˈbet̬.ɚ fɔːr miː, θæŋk juː/'
      }
    ]
  },

  // ================= LEVEL 1 (6 BÀI) =================
  {
    id: 'lv1-lesson-1',
    levelId: 'lv1',
    titleEn: 'Natural Greetings & Making Friends with Foreigners',
    titleVi: 'Chào Hỏi Tự Nhiên (Nói Không Với "I am fine thank you")',
    descriptionVi: 'Tạm biệt mẫu câu sách giáo khoa cũ kỹ. Học các câu mở đầu tự nhiên để bắt chuyện với khách Tây tại Việt Nam.',
    icon: 'Smile',
    durationMinutes: 14,
    tags: ['Chào hỏi', 'Bắt chuyện Tây', 'Tự tin'],
    keyTakeaways: [
      'Các câu chào tự nhiên: "How\'s it going?", "What\'s up?", "Good to see you"',
      'Cách giới thiệu bản thân ngắn gọn, lịch thiệp và tạo thiện cảm',
      'Ngữ điệu xuống giọng tự nhiên ở cuối câu trần thuật'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Nối Âm Câu Chào: How is it going',
        description: 'Người Mỹ nối âm: How-zit-go-ing -> /ˈhaʊ.zɪt ˈɡoʊ.ɪŋ/',
        rule: 'Nối âm /z/ từ "is" sang "it".',
        examples: [
          { en: 'How\'s it going?', ipa: '/ˈhaʊ.zɪt ˈɡoʊ.ɪŋ/', vi: 'Dạo này thế nào rồi?', soundTip: 'Nối "how-zit"' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1-1',
        word: 'awesome',
        ipa: '/ˈɑː.səm/',
        partOfSpeech: 'adj',
        meaningVi: 'tuyệt vời, đỉnh chóp',
        exampleSentence: 'Everything is going awesome!',
        exampleSentenceVi: 'Mọi thứ đều đang diễn ra cực kỳ tuyệt vời!',
        endingSoundNote: 'Trọng âm AW-, đuôi Schwa -some đọc nhẹ nhàng.',
        americanTip: 'Từ cửa miệng cực kỳ phổ biến tại Mỹ.'
      },
      {
        id: 'v1-2',
        word: 'pleasure',
        ipa: '/ˈpleʒ.ɚ/',
        partOfSpeech: 'noun',
        meaningVi: 'niềm vinh hạnh / niềm vui',
        exampleSentence: 'It is a pleasure to meet you.',
        exampleSentenceVi: 'Rất vinh hạnh được làm quen với bạn.',
        endingSoundNote: 'Âm giữa là /ʒ/ rung và đuôi -er cong lưỡi.',
        americanTip: 'Đọc êm ái, rung nhẹ cổ họng.'
      }
    ],
    dialogue: [
      {
        id: 'd1-1',
        speaker: 'A',
        speakerName: 'Mike (Khách du lịch)',
        avatar: '👨‍💼',
        textEn: 'Hey there! How is it going today?',
        textVi: 'Chào bạn! Hôm nay mọi việc thế nào rồi?',
        ipa: '/heɪ ðer! ˈhaʊ.zɪt ˈɡoʊ.ɪŋ təˈdeɪ/'
      },
      {
        id: 'd1-2',
        speaker: 'B',
        speakerName: 'Minh (Việt Nam)',
        avatar: '🧑‍💻',
        textEn: 'Pretty good! I am Minh from Hanoi. Pleasure to meet you!',
        textVi: 'Khá tốt! Tôi là Minh đến từ Hà Nội. Rất vui được gặp bạn!',
        ipa: '/ˈprɪt̬.i ɡʊd! aɪ æm mɪnh frʌm hæˈnɔɪ. ˈpleʒ.ɚ tuː miːtʃ juː/'
      }
    ]
  },
  {
    id: 'lv1-lesson-2',
    levelId: 'lv1',
    titleEn: 'Ordering Food & Drinks at Starbucks & International Chains',
    titleVi: 'Gọi Đồ Tại Quán Cafe & Chuỗi Quốc Tế (Starbucks, Highlands)',
    descriptionVi: 'Tự tin gọi kích cỡ ly (Tall, Grande, Venti), chọn loại sữa hạt (Oat milk) và trả lời câu hỏi "For here or to go?".',
    icon: 'Coffee',
    durationMinutes: 16,
    tags: ['Order đồ uống', 'Starbucks', 'Đời sống'],
    keyTakeaways: [
      'Cấu trúc gọi đồ chuẩn người Mỹ: "Can I get a [Size] [Drink] with [Milk]?"',
      'Từ vựng về cà phê & đồ ăn: Iced Americano, Caramel Macchiato, Oat milk',
      'Trả lời câu hỏi thanh toán: "For here or to go?" (Dùng tại đây hay mang đi)'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Ngữ Điệu Tự Nhiên Khi Order',
        description: 'Lên giọng nhẹ ở cuối món đồ uống để thể hiện sự lịch thiệp, xuống giọng khi kết thúc câu.',
        rule: 'Can I get an iced latte? ↗ With oat milk, please. ↘',
        examples: [
          { en: 'To go, please', ipa: '/tuː ɡoʊ pliːz/', vi: 'Mang đi giúp tôi nhé', soundTip: 'Âm /oʊ/ chu môi tròn' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1-3',
        word: 'receipt',
        ipa: '/rɪˈsiːt/',
        partOfSpeech: 'noun',
        meaningVi: 'hóa đơn, biên lai',
        exampleSentence: 'Would you like your receipt in the bag?',
        exampleSentenceVi: 'Bạn có muốn bỏ hóa đơn vào túi không?',
        endingSoundNote: 'Âm "p" là âm câm! Đọc là /rɪˈsiːt/ với đuôi /t/.',
        americanTip: 'Tuyệt đối không đọc chữ p.'
      },
      {
        id: 'v1-4',
        word: 'extra',
        ipa: '/ˈek.strə/',
        partOfSpeech: 'adj / adv',
        meaningVi: 'thêm vào, bổ sung',
        exampleSentence: 'Could I have extra ice, please?',
        exampleSentenceVi: 'Cho tôi thêm chút đá nhé?',
        endingSoundNote: 'Cụm /kstr/ cần phát âm liền mạch.',
        americanTip: 'Nhấn mạnh âm EX-.'
      }
    ],
    dialogue: [
      {
        id: 'd1-3',
        speaker: 'A',
        speakerName: 'Barista',
        avatar: '☕',
        textEn: 'Hi! What can I get started for you today?',
        textVi: 'Xin chào! Hôm nay bạn muốn dùng món gì ạ?',
        ipa: '/haɪ! wɑːt kæn aɪ ɡet ˈstɑːr.t̬ɪd fɔːr juː təˈdeɪ/'
      },
      {
        id: 'd1-4',
        speaker: 'B',
        speakerName: 'Khách hàng',
        avatar: '👩',
        textEn: 'Can I get a grande iced Americano with extra ice, to go?',
        textVi: 'Cho mình 1 ly Americano đá size vừa, nhiều đá, mang đi nhé?',
        ipa: '/kæn aɪ ɡet ə ˈɡrɑːn.deɪ aɪst əˌmer.ɪˈkɑː.noʊ wɪð ˈek.strə aɪs, tuː ɡoʊ/'
      }
    ]
  },
  {
    id: 'lv1-lesson-3',
    levelId: 'lv1',
    titleEn: 'Ordering Food at Fast Food Chains & Restaurants',
    titleVi: 'Gọi Món Tại Nhà Hàng & Fast Food (McDonald\'s, Pizza 4P\'s)',
    descriptionVi: 'Cách xem menu, yêu cầu bớt cay, xin thêm gia vị, gọi món combo và yêu cầu tách hóa đơn (Split the bill).',
    icon: 'Utensils',
    durationMinutes: 16,
    tags: ['Nhà hàng', 'Fast food', 'Ăn uống'],
    keyTakeaways: [
      'Cấu trúc gọi món: "We are ready to order", "What do you recommend?"',
      'Yêu cầu đặc biệt: "Less spicy, please", "No onions, please"',
      'Thanh toán: "Could we split the bill?", "Can I pay by card?"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Cụm Từ: Split The Bill',
        description: 'Split /splɪt/ (Bật /t/ dứt khoát), Bill /bɪl/ (Đầu lưỡi chạm răng trên ở âm l).',
        rule: 'Split the bill -> chia tiền ăn sòng phẳng.',
        examples: [
          { en: 'Split the bill', ipa: '/splɪt ðə bɪl/', vi: 'Chia tiền hóa đơn', soundTip: 'Âm /ɪ/ ngắn' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1-5',
        word: 'recommend',
        ipa: '/ˌrek.əˈmend/',
        partOfSpeech: 'verb',
        meaningVi: 'giới thiệu, gợi ý món ngon',
        exampleSentence: 'Which dish do you recommend for dinner?',
        exampleSentenceVi: 'Bạn gợi ý món nào ngon cho bữa tối?',
        endingSoundNote: 'Trọng âm rơi vào âm tiết thứ 3 -MEND.',
        americanTip: 'Bật nhẹ /d/ cuối.'
      },
      {
        id: 'v1-6',
        word: 'delicious',
        ipa: '/dɪˈlɪʃ.əs/',
        partOfSpeech: 'adj',
        meaningVi: 'ngon miệng, thơm ngon',
        exampleSentence: 'This beef pho is absolutely delicious!',
        exampleSentenceVi: 'Món phở bò này thực sự ngon tuyệt vời!',
        endingSoundNote: 'Âm giữa là /ʃ/ chu môi nhẹ.',
        americanTip: 'Nhấn mạnh LISH-.'
      }
    ],
    dialogue: [
      {
        id: 'd1-5',
        speaker: 'A',
        speakerName: 'Phục vụ bàn',
        avatar: '👨‍🍳',
        textEn: 'Are you ready to order, or do you need a few more minutes?',
        textVi: 'Quý khách đã sẵn sàng gọi món chưa, hay cần thêm vài phút ạ?',
        ipa: '/ɑːr juː ˈred.i tuː ˈɔːr.dɚ, ɔːr duː juː niːd ə fjuː mɔːr ˈmɪn.ɪts/'
      },
      {
        id: 'd1-6',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '🙋‍♂️',
        textEn: 'We are ready! Could we get two beef burgers and split the bill?',
        textVi: 'Chúng tôi sẵn sàng rồi! Cho chúng tôi 2 burger bò và chia tiền hóa đơn nhé?',
        ipa: '/wiː ɑːr ˈred.i! kʊd wiː ɡet tuː biːf ˈbɜːr.ɡɚz ænd splɪt ðə bɪl/'
      }
    ]
  },
  {
    id: 'lv1-lesson-4',
    levelId: 'lv1',
    titleEn: 'Grocery Shopping & Buying Clothes (Fitting Room & Sale)',
    titleVi: 'Đi Siêu Thị & Mua Sắm Quần Áo (Hỏi Giá, Thử Đồ & Sale)',
    descriptionVi: 'Cách hỏi tìm quầy hàng trong siêu thị, hỏi phòng thử đồ (Fitting rooms), kích cỡ quần áo và xin giảm giá.',
    icon: 'ShoppingBag',
    durationMinutes: 15,
    tags: ['Mua sắm', 'Siêu thị', 'Thử đồ'],
    keyTakeaways: [
      'Tìm đồ trong siêu thị: "Where can I find the milk / fruits?"',
      'Thử đồ: "Can I try this shirt on?", "Where are the fitting rooms?"',
      'Hỏi sale: "Is this item on sale?", "Do you have size L?"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Cụm: Try It On',
        description: 'Nối âm: Try it on -> /ˈtraɪ.ɪt.ɑːn/ -> "try-it-tahn".',
        rule: 'Nối /t/ sang /ɑːn/.',
        examples: [
          { en: 'Try it on', ipa: '/traɪ ɪt ɑːn/', vi: 'Mặc thử nó vào', soundTip: 'Nối âm mượt mà' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1-7',
        word: 'discount',
        ipa: '/ˈdɪs.kaʊnt/',
        partOfSpeech: 'noun',
        meaningVi: 'giảm giá, chiết khấu',
        exampleSentence: 'Is there any special discount today?',
        exampleSentenceVi: 'Hôm nay có chương trình giảm giá đặc biệt nào không?',
        endingSoundNote: 'Âm đôi /aʊ/ và đuôi /nt/ dứt khoát.',
        americanTip: 'Nhấn trọng âm DIS-.'
      },
      {
        id: 'v1-8',
        word: 'fitting',
        ipa: '/ˈfɪt̬.ɪŋ/',
        partOfSpeech: 'noun / adj',
        meaningVi: 'thử đồ',
        exampleSentence: 'The fitting rooms are right around the corner.',
        exampleSentenceVi: 'Phòng thử đồ ở ngay góc rẽ kia nhé.',
        endingSoundNote: 'Flap T ở giữa từ.',
        americanTip: 'Đọc là "fit-ding".'
      }
    ],
    dialogue: [
      {
        id: 'd1-7',
        speaker: 'A',
        speakerName: 'Bạn',
        avatar: '👱‍♀️',
        textEn: 'Excuse me, could I try this jacket on? Where are the fitting rooms?',
        textVi: 'Xin lỗi, tôi có thể thử chiếc áo khoác này được không? Phòng thử đồ ở đâu vậy?',
        ipa: '/ɪkˈskjuːz miː, kʊd aɪ traɪ ðɪs ˈdʒæk.ɪt ɑːn? wer ɑːr ðə ˈfɪt̬.ɪŋ ruːmz/'
      },
      {
        id: 'd1-8',
        speaker: 'B',
        speakerName: 'Nhân viên bán hàng',
        avatar: '👔',
        textEn: 'Sure! The fitting rooms are straight ahead on your left.',
        textVi: 'Chắc chắn rồi! Phòng thử đồ ở ngay phía trước bên tay trái của bạn nhé.',
        ipa: '/ʃʊr! ðə ˈfɪt̬.ɪŋ ruːmz ɑːr streɪt əˈhed ɑːn jɔːr left/'
      }
    ]
  },
  {
    id: 'lv1-lesson-5',
    levelId: 'lv1',
    titleEn: 'Giving Directions to Tourists & Booking Grab in Vietnam',
    titleVi: 'Chỉ Đường Cho Khách Tây Tại Việt Nam & Hướng Dẫn Đi Lại',
    descriptionVi: 'Tự tin hướng dẫn khách Tây tìm đường tại Hà Nội / TP.HCM / Đà Nẵng, giải thích cách bắt Grab và thanh toán.',
    icon: 'Compass',
    durationMinutes: 15,
    tags: ['Chỉ đường', 'Khách du lịch', 'Đi lại'],
    keyTakeaways: [
      'Chỉ hướng: "Go straight ahead", "Turn left at the intersection", "Across the street"',
      'Chỉ địa danh nổi tiếng: Hoan Kiem Lake, Ben Thanh Market, Dragon Bridge',
      'Hướng dẫn phương tiện: "You can book a Grab bike / taxi easily on your phone"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Nối Âm: Across The Street',
        description: 'Across: /əˈkrɑːs/, Street: /striːt/. Phát âm rõ /s/ và /t/.',
        rule: 'Không đọc thành "xờ trít".',
        examples: [
          { en: 'Across the street', ipa: '/əˈkrɑːs ðə striːt/', vi: 'Bên kia đường', soundTip: 'Âm /s/ rõ ràng' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1-9',
        word: 'intersection',
        ipa: '/ˌɪn.t̬ɚˈsek.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'ngã tư, giao lộ',
        exampleSentence: 'Turn right at the next intersection.',
        exampleSentenceVi: 'Rẽ phải ở ngã tư tiếp theo nhé.',
        endingSoundNote: 'Đuôi -tion chu mỏ nhẹ /ʃən/.',
        americanTip: 'Nhấn trọng âm vào SEC-.'
      }
    ],
    dialogue: [
      {
        id: 'd1-9',
        speaker: 'A',
        speakerName: 'Khách Tây',
        avatar: '👱‍♂️',
        textEn: 'Excuse me, how can I get to Ben Thanh Market from here?',
        textVi: 'Xin lỗi, làm thế nào để tôi đi đến Chợ Bến Thành từ đây?',
        ipa: '/ɪkˈskjuːz miː, haʊ kæn aɪ ɡet tuː ben thanh ˈmɑːr.kɪt frʌm hɪr/'
      },
      {
        id: 'd1-10',
        speaker: 'B',
        speakerName: 'Bạn (Việt Nam)',
        avatar: '🙋‍♂️',
        textEn: 'It is about ten minutes on foot. Just go straight and it is across the street!',
        textVi: 'Đi bộ khoảng 10 phút thôi. Bạn cứ đi thẳng và nó nằm ngay bên kia đường!',
        ipa: '/ɪt ɪz əˈbaʊt ten ˈmɪn.ɪts ɑːn fʊt. dʒʌst ɡoʊ streɪt ænd ɪt ɪz əˈkrɑːs ðə striːt/'
      }
    ]
  },
  {
    id: 'lv1-lesson-6',
    levelId: 'lv1',
    titleEn: 'Introducing Yourself & Vietnamese Food Culture to Foreigners',
    titleVi: 'Giới Thiệu Bản Thân & Đồ Ăn Việt Nam Cho Bạn Bè Quốc Tế',
    descriptionVi: 'Cách giới thiệu về Phở, Bánh mì, Cà phê trứng bằng các tính từ miêu tả hấp dẫn, tạo ấn tượng thân thiện và mến khách.',
    icon: 'Heart',
    durationMinutes: 16,
    tags: ['Ẩm thực Việt', 'Giới thiệu bản thân', 'Văn hóa'],
    keyTakeaways: [
      'Giới thiệu bản thân trong 60s: Tên, nghề nghiệp, sở thích du lịch ẩm thực',
      'Miêu tả món ăn: "Crispy baguette" (Bánh mì giòn rụm), "Rich broth" (Nước dùng đậm đà)',
      'Mời bạn bè đi thử món ăn đường phố'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Các Tính Từ Miêu Tả Ẩm Thực',
        description: 'Crispy: /ˈkrɪs.pi/ (Giòn), Flavorful: /ˈfleɪ.vɚ.fəl/ (Đậm đà hương vị).',
        rule: 'Nhấn mạnh vào âm tiết đầu tiên.',
        examples: [
          { en: 'Crispy', ipa: '/ˈkrɪs.pi/', vi: 'giòn tan', soundTip: 'Bật nhẹ /p/' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v1-10',
        word: 'traditional',
        ipa: '/trəˈdɪʃ.ən.əl/',
        partOfSpeech: 'adj',
        meaningVi: 'truyền thống, lâu đời',
        exampleSentence: 'Pho is the most famous traditional soup in Vietnam.',
        exampleSentenceVi: 'Phở là món súp truyền thống nổi tiếng nhất ở Việt Nam.',
        endingSoundNote: '4 âm tiết, trọng âm rơi vào -DISH-.',
        americanTip: 'Đuôi -al đọc lướt /əl/.'
      }
    ],
    dialogue: [
      {
        id: 'd1-11',
        speaker: 'A',
        speakerName: 'Emma (Khách Mỹ)',
        avatar: '👩',
        textEn: 'What is your favorite Vietnamese food that I must try?',
        textVi: 'Món ăn Việt Nam yêu thích nào của bạn mà tôi nhất định phải thử?',
        ipa: '/wɑːt ɪz jɔːr ˈfeɪ.vɚ.ɪt ˌvjet.nəˈmiːz fuːd ðæt aɪ mʌst traɪ/'
      },
      {
        id: 'd1-12',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '🧑',
        textEn: 'You definitely have to try hot Pho and crispy Banh Mi. They are amazing!',
        textVi: 'Bạn nhất định phải thử món Phở nóng hổi và Bánh mì giòn rụm. Chúng ngon tuyệt đỉnh!',
        ipa: '/juː ˈdef.ə.nət.li hæv tuː traɪ hɑːt fə ænd ˈkrɪs.pi banh mi. ðeɪ ɑːr əˈmeɪ.zɪŋ/'
      }
    ]
  },

  // ================= LEVEL 2 (6 BÀI) =================
  {
    id: 'lv2-lesson-1',
    levelId: 'lv2',
    titleEn: 'Job Interview Mastery in English (Vietnam Workplace)',
    titleVi: 'Trả Lời Phỏng Vấn Xin Việc Tự Tin Bằng Tiếng Anh',
    descriptionVi: 'Trang bị câu trả lời sắc sảo cho 3 câu hỏi phỏng vấn kinh điển tại các công ty đa quốc gia: Giới thiệu bản thân, điểm mạnh và lý do ứng tuyển.',
    icon: 'Briefcase',
    durationMinutes: 18,
    tags: ['Phỏng vấn', 'Xin việc', 'Sự nghiệp'],
    keyTakeaways: [
      'Cách trả lời "Tell me about yourself" theo công thức Hiện tại - Quá khứ - Tương lai',
      'Nêu điểm mạnh chuyên nghiệp: "My biggest strength is problem-solving"',
      'Cách đặt câu hỏi ngược lại cho nhà tuyển dụng để ghi điểm'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Professional & Experience',
        description: 'Professional: /prəˈfeʃ.ən.əl/ (Nhấn FE-), Experience: /ɪkˈspɪr.i.əns/ (Nhấn SPEER-)',
        rule: 'Đuôi -ce trong experience đọc là /s/ xì gió.',
        examples: [
          { en: 'Experience', ipa: '/ɪkˈspɪr.i.əns/', vi: 'kinh nghiệm làm việc', soundTip: 'Đuôi /s/' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-1',
        word: 'deadline',
        ipa: '/ˈded.laɪn/',
        partOfSpeech: 'noun',
        meaningVi: 'hạn chót hoàn thành công việc',
        exampleSentence: 'I always deliver quality work before the deadline.',
        exampleSentenceVi: 'Tôi luôn bàn giao công việc chất lượng trước hạn chót.',
        endingSoundNote: 'Âm d chặn hơi ở giữa, đuôi /n/ ngân mũi.',
        americanTip: 'Nhấn mạnh DEAD-.'
      },
      {
        id: 'v2-2',
        word: 'strength',
        ipa: '/streŋθ/',
        partOfSpeech: 'noun',
        meaningVi: 'thế mạnh, điểm mạnh',
        exampleSentence: 'Communication is one of my greatest strengths.',
        exampleSentenceVi: 'Kỹ năng giao tiếp là một trong những thế mạnh lớn nhất của tôi.',
        endingSoundNote: 'Cụm /str/ đầu và /ŋθ/ cuối thè lưỡi cắn nhẹ.',
        americanTip: 'Không bỏ quên âm th cuối.'
      }
    ],
    dialogue: [
      {
        id: 'd2-1',
        speaker: 'A',
        speakerName: 'Interviewer (HR)',
        avatar: '👩‍💼',
        textEn: 'Welcome! Could you tell me a little bit about yourself?',
        textVi: 'Chào mừng bạn! Bạn có thể giới thiệu đôi nét về bản thân không?',
        ipa: '/ˈwel.kəm! kʊd juː tel miː ə ˈlɪt̬.əl bɪt əˈbaʊt jɔːrˈself/'
      },
      {
        id: 'd2-2',
        speaker: 'B',
        speakerName: 'Ứng viên',
        avatar: '👨‍💼',
        textEn: 'I have three years of experience in marketing with strong teamwork skills.',
        textVi: 'Tôi có 3 năm kinh nghiệm trong ngành marketing cùng kỹ năng làm việc nhóm tốt.',
        ipa: '/aɪ hæv θriː jɪrz ʌv ɪkˈspɪr.i.əns ɪn ˈmɑːr.kɪ.t̬ɪŋ wɪð strɑːŋ ˈtiːm.wɜːrk skɪlz/'
      }
    ]
  },
  {
    id: 'lv2-lesson-2',
    levelId: 'lv2',
    titleEn: 'Office Small Talk with Foreign Managers & Colleagues',
    titleVi: 'Nghệ Thuật Small Talk Bên Máy Pha Cafe & Bàn Ăn Trưa',
    descriptionVi: 'Cách bắt chuyện tự nhiên với sếp và đồng nghiệp nước ngoài về kế hoạch cuối tuần, thể thao và thời tiết mà không bị sượng sùng.',
    icon: 'Coffee',
    durationMinutes: 18,
    tags: ['Công sở', 'Small Talk', 'Đồng nghiệp'],
    keyTakeaways: [
      'Chủ đề Small Talk an toàn: Thời tiết, giao thông, kế hoạch cuối tuần, phim ảnh',
      'Cách thể hiện sự lắng nghe tích cực: "No way!", "That sounds exciting!", "Totally!"',
      'Cách kết thúc cuộc trò chuyện khéo léo để quay lại bàn làm việc'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Cụm Từ Cảm Thán Giọng Mỹ',
        description: 'Người Mỹ thường nhấn rất mạnh và kéo dài âm vào các tính từ cảm xúc.',
        rule: 'Awesome! -> /ˈɑː.səm/ (Cao giọng), Totally! -> /ˈtoʊ.t̬əl.i/ (Flap T)',
        examples: [
          { en: 'Totally agree', ipa: '/ˈtoʊ.t̬əl.i əˈɡriː/', vi: 'Hoàn toàn đồng ý', soundTip: 'Flap T ở chữ totally' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-3',
        word: 'schedule',
        ipa: '/ˈskedʒ.uːl/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'lịch trình / xếp lịch',
        exampleSentence: 'Let\'s schedule a quick sync meeting tomorrow.',
        exampleSentenceVi: 'Hãy cùng xếp một buổi họp ngắn vào ngày mai nhé.',
        endingSoundNote: 'Giọng Anh - Mỹ bắt đầu bằng /sk/ (đọc là "sked-jool").',
        americanTip: 'Khác với Anh - Anh đọc là shed-yool.'
      },
      {
        id: 'v2-4',
        word: 'colleague',
        ipa: '/ˈkɑː.liːɡ/',
        partOfSpeech: 'noun',
        meaningVi: 'đồng nghiệp',
        exampleSentence: 'My colleagues are very supportive and friendly.',
        exampleSentenceVi: 'Các đồng nghiệp của tôi rất nhiệt tình hỗ trợ và thân thiện.',
        endingSoundNote: 'Trọng âm CAW-, đuôi bật nhẹ /ɡ/.',
        americanTip: 'Không đọc chữ u và e cuối.'
      }
    ],
    dialogue: [
      {
        id: 'd2-3',
        speaker: 'A',
        speakerName: 'John (Sếp Tây)',
        avatar: '👨‍💼',
        textEn: 'Morning! Any big plans for the upcoming weekend?',
        textVi: 'Chào buổi sáng! Cuối tuần tới bạn có kế hoạch lớn gì chưa?',
        ipa: '/ˈmɔːr.nɪŋ! ˈen.i bɪɡ plænz fɔːr ðə ˈʌpˌkʌm.ɪŋ ˈwiːk.end/'
      },
      {
        id: 'd2-4',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '👩‍💻',
        textEn: 'I am planning a short road trip to Ninh Binh with friends. How about you?',
        textVi: 'Tôi dự định đi phượt một chuyến ngắn đến Ninh Bình với bạn bè. Còn anh thì sao?',
        ipa: '/aɪ æm ˈplæn.ɪŋ ə ʃɔːrt roʊd trɪp tuː nɪnh bɪnh wɪð frendz. haʊ əˈbaʊt juː/'
      }
    ]
  },
  {
    id: 'lv2-lesson-3',
    levelId: 'lv2',
    titleEn: 'Online Meetings (Zoom/Teams) & Screen Sharing',
    titleVi: 'Họp Online Qua Zoom / Teams: Kiểm Tra Mic & Chia Sẻ Màn Hình',
    descriptionVi: 'Làm chủ các tình huống họp trực tuyến: Kiểm tra mic, chia sẻ màn hình, xử lý khi mạng lag và xin phép phát biểu.',
    icon: 'Video',
    durationMinutes: 18,
    tags: ['Họp online', 'Zoom', 'Công nghệ'],
    keyTakeaways: [
      'Mở đầu họp: "Can everyone hear me clearly?", "Can everyone see my screen?"',
      'Nhắc đồng nghiệp bật mic: "You are on mute, please unmute yourself"',
      'Xin phép phát biểu: "Sorry to jump in, but I have a quick question"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Screen & Microphone',
        description: 'Screen: /skriːn/ (Kéo dài âm /iː/), Mute: /mjuːt/ (Bật /t/ cuối).',
        rule: 'On mute -> /ɑːn mjuːt/.',
        examples: [
          { en: 'Screen', ipa: '/skriːn/', vi: 'màn hình máy tính', soundTip: 'Âm /iː/ cười tươi' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-5',
        word: 'perspective',
        ipa: '/pɚˈspek.tɪv/',
        partOfSpeech: 'noun',
        meaningVi: 'góc nhìn, quan điểm',
        exampleSentence: 'From my perspective, this solution saves both time and cost.',
        exampleSentenceVi: 'Theo góc nhìn của tôi, giải pháp này tiết kiệm cả thời gian và chi phí.',
        endingSoundNote: 'Đuôi -tive đọc là /tɪv/.',
        americanTip: 'Nhấn mạnh SPEC-.'
      }
    ],
    dialogue: [
      {
        id: 'd2-5',
        speaker: 'A',
        speakerName: 'Trưởng nhóm',
        avatar: '👨‍💼',
        textEn: 'Can everyone see my shared screen clearly?',
        textVi: 'Mọi người có nhìn thấy rõ màn hình tôi chia sẻ không?',
        ipa: '/kæn ˈev.ri.wʌn siː maɪ ʃerd skriːn ˈklɪr.li/'
      },
      {
        id: 'd2-6',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '🧑‍💻',
        textEn: 'Yes, we can see it clearly. Please go ahead!',
        textVi: 'Vâng, chúng tôi thấy rất rõ. Xin mời anh cứ tiếp tục!',
        ipa: '/jes, wiː kæn siː ɪt ˈklɪr.li. pliːz ɡoʊ əˈhed/'
      }
    ]
  },
  {
    id: 'lv2-lesson-4',
    levelId: 'lv2',
    titleEn: 'Writing Professional Emails & Slack Messages (US Style)',
    titleVi: 'Viết Email & Tin Nhắn Công Việc Chuẩn Phong Cách Mỹ',
    descriptionVi: 'Học cách viết email trực diện, ngắn gọn, súc tích (Direct communication). Mẫu email xin nghỉ phép, nhờ hỗ trợ và gửi tài liệu đính kèm.',
    icon: 'Mail',
    durationMinutes: 18,
    tags: ['Viết email', 'Slack', 'Văn hóa làm việc'],
    keyTakeaways: [
      'Tiêu đề email rõ ràng: [Action Required] Project X Status Update',
      'Mở đầu & Kết thúc lịch sự: "Hope you are having a productive week", "Best regards"',
      'Gửi tài liệu đính kèm: "Please find the attached document for your review"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Attached & Document',
        description: 'Attached: /əˈtætʃt/ (Đuôi -ed đọc thành âm /t/ sau âm /tʃ/).',
        rule: 'Document: /ˈdɑː.kjə.mənt/ (Nhấn DOC-).',
        examples: [
          { en: 'Attached', ipa: '/əˈtætʃt/', vi: 'đính kèm theo', soundTip: 'Bật nhẹ /t/ cuối' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-6',
        word: 'attached',
        ipa: '/əˈtætʃt/',
        partOfSpeech: 'adj',
        meaningVi: 'được đính kèm',
        exampleSentence: 'Please review the attached report by 5 PM.',
        exampleSentenceVi: 'Xin vui lòng xem qua báo cáo đính kèm trước 5 giờ chiều.',
        endingSoundNote: 'Cụm /tʃt/ nổ gió rồi ngắt /t/.',
        americanTip: 'Đừng đọc thành "a-tát-chịt".'
      }
    ],
    dialogue: [
      {
        id: 'd2-7',
        speaker: 'A',
        speakerName: 'Đồng nghiệp Mỹ',
        avatar: '👨‍💼',
        textEn: 'Did you get a chance to review the attached contract?',
        textVi: 'Bạn đã có dịp xem qua bản hợp đồng đính kèm chưa?',
        ipa: '/dɪd juː ɡet ə tʃæns tuː rɪˈvjuː ðə əˈtætʃt ˈkɑːn.trækt/'
      },
      {
        id: 'd2-8',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '👩‍💻',
        textEn: 'Yes, I just reviewed it. Everything looks aligned with our goals.',
        textVi: 'Rồi, tôi vừa xem qua xong. Mọi thứ đều rất khớp với mục tiêu của chúng ta.',
        ipa: '/jes, aɪ dʒʌst rɪˈvjuːd ɪt. ˈev.ri.θɪŋ lʊks əˈlaɪnd wɪð ˈaʊ.ɚ ɡoʊlz/'
      }
    ]
  },
  {
    id: 'lv2-lesson-5',
    levelId: 'lv2',
    titleEn: 'Reporting Project Progress & Handling Tight Deadlines',
    titleVi: 'Báo Cáo Tiến Độ Dự Án & Xử Lý Deadline Gấp',
    descriptionVi: 'Cách cập nhật tiến độ công việc hàng tuần, báo cáo trở ngại (Blockers) và đề xuất phương án giải quyết linh hoạt.',
    icon: 'CheckSquare',
    durationMinutes: 18,
    tags: ['Báo cáo tiến độ', 'Deadline', 'Giải quyết vấn đề'],
    keyTakeaways: [
      'Báo cáo tiến độ: "We are currently on track to finish by Friday"',
      'Nêu trở ngại: "We ran into an unexpected technical blocker"',
      'Đề xuất phương án: "I suggest we reallocate resources to meet the timeline"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Cụm: On Track',
        description: 'On track /ɑːn træk/ (Âm /æ/ hạ cằm, đuôi /k/ bật dứt khoát).',
        rule: 'Nghĩa là đúng tiến độ dự kiến.',
        examples: [
          { en: 'On track', ipa: '/ɑːn træk/', vi: 'đúng tiến độ', soundTip: 'Bật /k/ cuối' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-7',
        word: 'progress',
        ipa: '/ˈprɑː.ɡres/',
        partOfSpeech: 'noun',
        meaningVi: 'sự tiến bộ, tiến độ công việc',
        exampleSentence: 'We have made significant progress this week.',
        exampleSentenceVi: 'Chúng ta đã đạt được tiến độ đáng kể trong tuần này.',
        endingSoundNote: 'Trọng âm PRAH-, đuôi xì /s/.',
        americanTip: 'Giọng Mỹ đọc /ɑː/ ở âm đầu.'
      }
    ],
    dialogue: [
      {
        id: 'd2-9',
        speaker: 'A',
        speakerName: 'Quản lý dự án',
        avatar: '👨‍💼',
        textEn: 'How is the new feature progressing for this sprint?',
        textVi: 'Tính năng mới đang tiến triển như thế nào trong đợt làm việc này?',
        ipa: '/haʊ ɪz ðə nuː ˈfiː.tʃɚ prəˈɡres.ɪŋ fɔːr ðɪs sprɪnt/'
      },
      {
        id: 'd2-10',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '🧑‍💻',
        textEn: 'We are completely on track and will launch on schedule.',
        textVi: 'Chúng tôi hoàn toàn đúng tiến độ và sẽ ra mắt đúng lịch trình.',
        ipa: '/wiː ɑːr kəmˈpliːt.li ɑːn træk ænd wɪl lɑːntʃ ɑːn ˈskedʒ.uːl/'
      }
    ]
  },
  {
    id: 'lv2-lesson-6',
    levelId: 'lv2',
    titleEn: 'Presenting Ideas & Polite Disagreement in Meetings',
    titleVi: 'Thuyết Trình Ý Tưởng & Phản Biện Lịch Thiệp',
    descriptionVi: 'Nâng cấp kỹ năng trình bày ý kiến sắc bén, cách phản biện mà không gây mất lòng đồng nghiệp ("I see your point, but...").',
    icon: 'Award',
    durationMinutes: 20,
    tags: ['Thuyết trình', 'Phản biện', 'Giao tiếp cao cấp'],
    keyTakeaways: [
      'Mở đầu thuyết trình: "Today I would like to walk you through our new strategy"',
      'Phản biện lịch thiệp: "That is a valid point, however, we should also consider..."',
      'Đúc kết: "In conclusion, this approach gives us the highest return"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Conclusion & Strategy',
        description: 'Conclusion: /kənˈkluː.ʒən/ (Âm /ʒ/ rung nhẹ ở đuôi).',
        rule: 'Strategy: /ˈstræt̬.ə.dʒi/ (Nhấn STRAT-, đuôi /dʒi/).',
        examples: [
          { en: 'Strategy', ipa: '/ˈstræt̬.ə.dʒi/', vi: 'chiến lược', soundTip: 'Flap T ở giữa' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-8',
        word: 'strategy',
        ipa: '/ˈstræt̬.ə.dʒi/',
        partOfSpeech: 'noun',
        meaningVi: 'chiến lược, kế hoạch',
        exampleSentence: 'This marketing strategy will increase our sales.',
        exampleSentenceVi: 'Chiến lược tiếp thị này sẽ gia tăng doanh số của chúng ta.',
        endingSoundNote: 'Trọng âm STRAT-, đuôi /dʒi/.',
        americanTip: 'Đọc là "strat-uh-jee".'
      }
    ],
    dialogue: [
      {
        id: 'd2-11',
        speaker: 'A',
        speakerName: 'Bạn (Thuyết trình)',
        avatar: '👩‍💼',
        textEn: 'In conclusion, this strategy reduces costs while improving user experience.',
        textVi: 'Tóm lại, chiến lược này giúp giảm chi phí đồng thời nâng cao trải nghiệm người dùng.',
        ipa: '/ɪn kənˈkluː.ʒən, ðɪs ˈstræt̬.ə.dʒi rɪˈduː.sɪz kɑːsts waɪl ɪmˈpruː.vɪŋ ˈjuː.zɚ ɪkˈspɪr.i.əns/'
      },
      {
        id: 'd2-12',
        speaker: 'B',
        speakerName: 'Sếp / Đối tác',
        avatar: '👨‍💼',
        textEn: 'Impressive presentation! I completely agree with your proposal.',
        textVi: 'Bài thuyết trình rất ấn tượng! Tôi hoàn toàn đồng ý với đề xuất của bạn.',
        ipa: '/ɪmˈpres.ɪv ˌprez.ənˈteɪ.ʃən! aɪ kəmˈpliːt.li əˈɡriː wɪð jɔːr prəˈpoʊ.zəl/'
      }
    ]
  },

  // ================= LEVEL 3 (6 BÀI) =================
  {
    id: 'lv3-lesson-1',
    levelId: 'lv3',
    titleEn: 'International Airport & Passport Control Mastery',
    titleVi: 'Thủ Tục Sân Bay Quốc Tế & Qua Cổng Xuất Nhập Cảnh',
    descriptionVi: 'Tự tin làm thủ tục tại sân bay quốc tế: Ký gửi hành lý, đổi chỗ ngồi, qua cổng an ninh và trả lời hải quan xuất nhập cảnh.',
    icon: 'Plane',
    durationMinutes: 20,
    tags: ['Sân bay', 'Hải quan', 'Du lịch tự túc'],
    keyTakeaways: [
      'Thủ tục check-in sân bay: "I would like a window seat, please"',
      'Trả lời nhân viên hải quan: Mục đích chuyến đi, thời gian lưu trú, nơi ở',
      'Hỏi cổng ra máy bay: "Where is boarding gate B12?"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Baggage & Boarding Pass',
        description: 'Baggage: /ˈbæɡ.ɪdʒ/ (Âm /æ/ rớt hàm, đuôi /ɪdʒ/ rung cổ họng)',
        rule: 'Boarding: /ˈbɔːr.dɪŋ/ (Cong lưỡi âm r chuẩn Mỹ).',
        examples: [
          { en: 'Boarding pass', ipa: '/ˈbɔːr.dɪŋ pæs/', vi: 'thẻ lên máy bay', soundTip: 'Âm r cong lưỡi' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-1',
        word: 'passport',
        ipa: '/ˈpæs.pɔːrt/',
        partOfSpeech: 'noun',
        meaningVi: 'hộ chiếu',
        exampleSentence: 'Please have your passport and boarding pass ready.',
        exampleSentenceVi: 'Xin vui lòng chuẩn bị sẵn hộ chiếu và thẻ lên máy bay.',
        endingSoundNote: 'Âm đầu /pæs/ rớt hàm, âm sau /pɔːrt/ cong lưỡi và bật /t/.',
        americanTip: 'Nhấn mạnh PASS-.'
      },
      {
        id: 'v3-2',
        word: 'destination',
        ipa: '/ˌdes.təˈneɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'điểm đến du lịch',
        exampleSentence: 'What is the final destination of your trip?',
        exampleSentenceVi: 'Điểm đến cuối cùng trong chuyến đi của bạn là gì?',
        endingSoundNote: '4 âm tiết, trọng âm chính rơi vào -NAY-.',
        americanTip: 'Đuôi -tion chu môi nhẹ.'
      }
    ],
    dialogue: [
      {
        id: 'd3-1',
        speaker: 'A',
        speakerName: 'Nhân viên Hải quan',
        avatar: '👮‍♂️',
        textEn: 'Good morning. What is the purpose of your visit today?',
        textVi: 'Chào buổi sáng. Mục đích chuyến thăm của bạn hôm nay là gì?',
        ipa: '/ɡʊd ˈmɔːr.nɪŋ. wɑːt ɪz ðə ˈpɜːr.pəs ʌv jɔːr ˈvɪz.ɪt təˈdeɪ/'
      },
      {
        id: 'd3-2',
        speaker: 'B',
        speakerName: 'Bạn (Du khách)',
        avatar: '🧳',
        textEn: 'I am here for a vacation for seven days.',
        textVi: 'Tôi đến đây để du lịch nghỉ dưỡng trong 7 ngày.',
        ipa: '/aɪ æm hɪr fɔːr ə veɪˈkeɪ.ʃən fɔːr ˈsev.ən deɪz/'
      }
    ]
  },
  {
    id: 'lv3-lesson-2',
    levelId: 'lv3',
    titleEn: 'Hotel Check-in, Amenities & Booking Day Tours',
    titleVi: 'Check-in Khách Sạn & Đặt Tour Du Lịch Nước Ngoài',
    descriptionVi: 'Cách đặt cọc tiền phòng, hỏi mật khẩu Wifi, giờ ăn sáng buffet, đặt tour trải nghiệm và xin thêm đồ dùng khách sạn.',
    icon: 'MapPin',
    durationMinutes: 18,
    tags: ['Khách sạn', 'Đặt tour', 'Du lịch'],
    keyTakeaways: [
      'Check-in: "I have a reservation under the name [Name]"',
      'Hỏi tiện ích: "What time is breakfast served in the morning?"',
      'Đặt tour: "Do you have any city day tours available for tomorrow?"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Reservation & Amenities',
        description: 'Reservation: /ˌrez.ɚˈveɪ.ʃən/ (Nhấn -VA-), Amenities: /əˈmen.ə.t̬iz/ (Tiện nghi).',
        rule: 'Nhấn mạnh đúng trọng âm.',
        examples: [
          { en: 'Reservation', ipa: '/ˌrez.ɚˈveɪ.ʃən/', vi: 'đặt phòng trước', soundTip: 'Nhấn -VA-' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-3',
        word: 'reservation',
        ipa: '/ˌrez.ɚˈveɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'đặt phòng trước',
        exampleSentence: 'I made a reservation online last week.',
        exampleSentenceVi: 'Tôi đã đặt phòng trực tuyến vào tuần trước.',
        endingSoundNote: 'Đuôi -tion đọc là /ʃən/ chu mỏ nhẹ.',
        americanTip: 'Âm thứ 2 là /ɚ/ có cong lưỡi.'
      }
    ],
    dialogue: [
      {
        id: 'd3-3',
        speaker: 'A',
        speakerName: 'Lễ tân khách sạn',
        avatar: '🛎️',
        textEn: 'Welcome to Grand View Hotel! How may I assist you?',
        textVi: 'Chào mừng quý khách đến với khách sạn Grand View! Tôi có thể giúp gì cho bạn ạ?',
        ipa: '/ˈwel.kəm tuː ɡrænd vjuː hoʊˈtel! haʊ meɪ aɪ əˈsɪst juː/'
      },
      {
        id: 'd3-4',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '🧳',
        textEn: 'Hi, I have a reservation for three nights under the name Nam.',
        textVi: 'Xin chào, tôi có đặt phòng 3 đêm dưới tên Nam.',
        ipa: '/haɪ, aɪ hæv ə ˌrez.ɚˈveɪ.ʃən fɔːr θriː naɪts ˈʌn.dɚ ðə neɪm nam/'
      }
    ]
  },
  {
    id: 'lv3-lesson-3',
    levelId: 'lv3',
    titleEn: 'Travel Emergencies & Buying Medicine at Pharmacies',
    titleVi: 'Xử Lý Sự Cố Du Lịch & Mua Thuốc Tây Cấp Tốc',
    descriptionVi: 'Xử lý các tình huống phát sinh: Báo hỏng thiết bị phòng, lạc đường, đi hiệu thuốc mua thuốc cảm sốt / đau bụng khi ở nước ngoài.',
    icon: 'ShieldAlert',
    durationMinutes: 20,
    tags: ['Cứu nguy du lịch', 'Hiệu thuốc', 'Khẩn cấp'],
    keyTakeaways: [
      'Khiếu nại khách sạn lịch thiệp: "The air conditioner in my room is not working"',
      'Mua thuốc tại hiệu thuốc: Mô tả triệu chứng cảm sốt, đau họng, say tàu xe',
      'Hỏi cảnh sát / trợ giúp khẩn cấp: "I lost my wallet, where is the nearest police station?"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Emergency & Pharmacy',
        description: 'Emergency: /ɪˈmɜːr.dʒən.si/ (Nhấn MUR-), Pharmacy: /ˈfɑːr.mə.si/ (Nhấn PHAR-).',
        rule: 'Không đọc thành "pha-ma-xi".',
        examples: [
          { en: 'Pharmacy', ipa: '/ˈfɑːr.mə.si/', vi: 'hiệu thuốc tây', soundTip: 'Cong lưỡi âm r' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-4',
        word: 'pharmacy',
        ipa: '/ˈfɑːr.mə.si/',
        partOfSpeech: 'noun',
        meaningVi: 'hiệu thuốc tây',
        exampleSentence: 'Is there a 24-hour pharmacy nearby?',
        exampleSentenceVi: 'Gần đây có hiệu thuốc nào mở cửa 24/7 không?',
        endingSoundNote: 'Nhấn mạnh PHAR- cong lưỡi.',
        americanTip: 'Đọc là "far-muh-see".'
      }
    ],
    dialogue: [
      {
        id: 'd3-5',
        speaker: 'A',
        speakerName: 'Dược sĩ (Pharmacy)',
        avatar: '👩‍⚕️',
        textEn: 'Hello! How can I help you today?',
        textVi: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?',
        ipa: '/həˈloʊ! haʊ kæn aɪ help juː təˈdeɪ/'
      },
      {
        id: 'd3-6',
        speaker: 'B',
        speakerName: 'Bạn',
        avatar: '🧑',
        textEn: 'I have a mild fever and a sore throat. What medicine do you recommend?',
        textVi: 'Tôi bị sốt nhẹ và đau họng. Bạn gợi ý loại thuốc nào phù hợp?',
        ipa: '/aɪ hæv ə maɪld ˈfiː.vɚ ænd ə sɔːr θroʊt. wɑːt ˈmed.ə.sən duː juː ˌrek.əˈmend/'
      }
    ]
  },
  {
    id: 'lv3-lesson-4',
    levelId: 'lv3',
    titleEn: 'Navigating Public Transit: Metro, Trains & Buses Abroad',
    titleVi: 'Giao Tiếp Phương Tiện Công Cộng: Tàu Điện Ngầm & Xe Buýt',
    descriptionVi: 'Cách mua vé tự động tại cây bán vé Metro, hỏi đúng tuyến tàu (Subway line), đổi ga chuyển tuyến và không lo bị lạc.',
    icon: 'Train',
    durationMinutes: 18,
    tags: ['Tàu điện ngầm', 'Metro', 'Đi lại quốc tế'],
    keyTakeaways: [
      'Mua vé tự động: "How do I purchase a one-day metro pass?"',
      'Hỏi tuyến tàu: "Does this train go to Central Station?"',
      'Đổi ga chuyển tuyến: "Where do I transfer to the Blue Line?"'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Từ: Transit & Transfer',
        description: 'Transit: /ˈtræn.zɪt/ (Âm /z/ ở giữa), Transfer: /ˈtræns.fɜːr/ (Nhấn TRANS-).',
        rule: 'Đuôi -fer cong lưỡi chuẩn Mỹ.',
        examples: [
          { en: 'Transfer', ipa: '/ˈtræns.fɜːr/', vi: 'đổi chuyến, chuyển tuyến', soundTip: 'Cong lưỡi âm r' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-5',
        word: 'transfer',
        ipa: '/ˈtræns.fɜːr/',
        partOfSpeech: 'verb / noun',
        meaningVi: 'chuyển tuyến tàu / đổi xe',
        exampleSentence: 'You need to transfer at the next station.',
        exampleSentenceVi: 'Bạn cần đổi chuyến ở nhà ga tiếp theo.',
        endingSoundNote: 'Đuôi -fer cong lưỡi.',
        americanTip: 'Nhấn âm tiết đầu.'
      }
    ],
    dialogue: [
      {
        id: 'd3-7',
        speaker: 'A',
        speakerName: 'Bạn',
        avatar: '🧳',
        textEn: 'Excuse me, does this subway train go directly to the airport?',
        textVi: 'Xin lỗi, chuyến tàu điện ngầm này có đi thẳng đến sân bay không?',
        ipa: '/ɪkˈskjuːz miː, dʌz ðɪs ˈsʌb.weɪ treɪn ɡoʊ daɪˈrekt.li tuː ðə ˈer.pɔːrt/'
      },
      {
        id: 'd3-8',
        speaker: 'B',
        speakerName: 'Người địa phương',
        avatar: '🧔',
        textEn: 'No, you will need to transfer to the Red Line at Station 5.',
        textVi: 'Không, bạn sẽ cần chuyển sang Tuyến Đỏ tại Nhà ga số 5 nhé.',
        ipa: '/noʊ, juː wɪl niːd tuː ˈtræns.fɜːr tuː ðə red laɪn æt ˈsteɪ.ʃən faɪv/'
      }
    ]
  },
  {
    id: 'lv3-lesson-5',
    levelId: 'lv3',
    titleEn: 'Advanced Connected Speech (Gonna, Wanna, Gotta, Lemme)',
    titleVi: 'Bẻ Khóa Nối Âm Nâng Cao (Connected Speech Cực Mượt)',
    descriptionVi: 'Bí kíp giúp bạn nghe hiểu người Mỹ nói nhanh như gió bằng cách bẻ khóa các dạng rút gọn thông dụng nhất trong phim ảnh.',
    icon: 'Zap',
    durationMinutes: 20,
    tags: ['Nối âm nâng cao', 'Gonna Wanna', 'Phản xạ nhanh'],
    keyTakeaways: [
      'Going to -> Gonna, Want to -> Wanna, Have got to -> Gotta, Let me -> Lemme',
      'Kind of -> Kinda, Out of -> Outta, Should have -> Shoulda',
      'Luyện ngữ điệu nhấn trọng âm câu để nói lướt tự nhiên'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Quy Tắc Nuốt Âm "Gonna" & "Wanna"',
        description: 'Người Mỹ gần như không bao giờ nói "I am going to", họ luôn nói "I\'m gonna".',
        rule: 'I\'m gonna go -> /ˈaɪm ˈɡʌn.ə ɡoʊ/, I wanna know -> /ˈaɪ ˈwɑːn.ə noʊ/',
        examples: [
          { en: 'I\'m gonna do it', ipa: '/ˈaɪm ˈɡʌn.ə duː ɪt/', vi: 'Tôi sẽ làm điều đó', soundTip: 'Nói lướt tự nhiên' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-6',
        word: 'fluent',
        ipa: '/ˈfluː.ənt/',
        partOfSpeech: 'adj',
        meaningVi: 'trôi chảy, lưu loát',
        exampleSentence: 'With daily practice, you will become completely fluent.',
        exampleSentenceVi: 'Với việc luyện tập mỗi ngày, bạn sẽ trở nên hoàn toàn lưu loát.',
        endingSoundNote: 'Âm /uː/ dài lướt sang Schwa /ənt/.',
        americanTip: 'Bật nhẹ /t/ ở đuôi.'
      }
    ],
    dialogue: [
      {
        id: 'd3-9',
        speaker: 'A',
        speakerName: 'Chris (Mỹ)',
        avatar: '🧔',
        textEn: 'Hey, do you wanna grab some street food tonight? It\'s gonna be fun!',
        textVi: 'Này, tối nay bạn có muốn đi ăn đồ ăn đường phố không? Sẽ vui lắm đấy!',
        ipa: '/heɪ, duː juː ˈwɑːn.ə ɡræb sʌm striːt fuːd təˈnaɪt? ɪts ˈɡʌn.ə biː fʌn/'
      },
      {
        id: 'd3-10',
        speaker: 'B',
        speakerName: 'Bạn (B2 Speaker)',
        avatar: '😎',
        textEn: 'I\'m totally down! Lemme finish this email first.',
        textVi: 'Tôi hoàn toàn đồng ý! Để tôi hoàn thành nốt email này đã.',
        ipa: '/aɪm ˈtoʊ.t̬əl.i daʊn! ˈlem.mi ˈfɪn.ɪʃ ðɪs ˈiː.meɪl fɜːrst/'
      }
    ]
  },
  {
    id: 'lv3-lesson-6',
    levelId: 'lv3',
    titleEn: 'Popular American Slangs & Daily Idioms (B2 Fluency)',
    titleVi: 'Tiếng Lóng & Thành Ngữ Mỹ Hàng Ngày (Xem Phim Không Cần Sub)',
    descriptionVi: 'Làm chủ các câu lóng thời thượng nhất của người Mỹ: "No biggie", "I feel you", "Hit the road", "On the same page" để nói chuyện như dân bản xứ.',
    icon: 'Sparkles',
    durationMinutes: 22,
    tags: ['Slangs Mỹ', 'Thành ngữ', 'Xem phim US-UK'],
    keyTakeaways: [
      'Các câu lóng phổ biến: "No biggie" (Chuyện nhỏ), "I feel you" (Tôi đồng cảm với bạn)',
      'Thành ngữ công việc & đời sống: "On the same page" (Cùng chung quan điểm), "Piece of cake" (Dễ ợt)',
      'Tự tin giao tiếp và xem phim US-UK mà không cần phụ đề tiếng Việt'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Phát Âm Cụm: No Biggie & I Feel You',
        description: 'No biggie: /noʊ ˈbɪɡ.i/ (Nhấn BIG-), I feel you: /aɪ fiːl juː/ (Âm /iː/ kéo dài).',
        rule: 'Nói với ngữ điệu tự nhiên và thoải mái.',
        examples: [
          { en: 'No biggie', ipa: '/noʊ ˈbɪɡ.i/', vi: 'Chuyện nhỏ ấy mà', soundTip: 'Nói thân mật' }
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-7',
        word: 'vibe',
        ipa: '/vaɪb/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'bầu không khí, cảm xúc, bắt nhịp',
        exampleSentence: 'I really love the relaxed vibe of this city.',
        exampleSentenceVi: 'Tôi thực sự yêu thích bầu không khí thư thái của thành phố này.',
        endingSoundNote: 'Âm đuôi /b/ ngậm môi bật nhẹ.',
        americanTip: 'Từ lóng phổ biến của giới trẻ Mỹ.'
      }
    ],
    dialogue: [
      {
        id: 'd3-11',
        speaker: 'A',
        speakerName: 'David (Mỹ)',
        avatar: '👨‍🦱',
        textEn: 'Thanks for helping me with the luggage earlier!',
        textVi: 'Cảm ơn bạn đã giúp tôi mang hành lý lúc nãy nhé!',
        ipa: '/θæŋks fɔːr ˈhelp.ɪŋ miː wɪð ðə ˈlʌɡ.ɪdʒ ˈɜːr.li.ɚ/'
      },
      {
        id: 'd3-12',
        speaker: 'B',
        speakerName: 'Bạn (B2 Fluent)',
        avatar: '😎',
        textEn: 'No biggie! Anytime you need a hand, just let me know.',
        textVi: 'Chuyện nhỏ ấy mà! Bất cứ khi nào bạn cần giúp, cứ bảo tôi nhé.',
        ipa: '/noʊ ˈbɪɡ.i! ˈen.i.taɪm juː niːd ə hænd, dʒʌst let miː noʊ/'
      }
    ]
  }
];
