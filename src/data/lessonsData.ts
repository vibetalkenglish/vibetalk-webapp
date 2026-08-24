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
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Khẳng Định Sở Thích & Cảm Nhận',
      pattern: 'I like [Danh từ / Hành động] because it is [Tính từ].',
      formulaVi: 'Tôi thích [X] bởi vì nó [Y]',
      usageVi: 'Khuôn mẫu đa năng giúp bạn luyện bật rõ âm /k/ trong "like", âm /z/ trong "is" và âm đuôi tính từ mà không bao giờ bị nuốt âm.',
      examples: [
        { en: 'I like this place because it is nice.', ipa: '/aɪ laɪk ðɪs pleɪs bɪˈkɑːz ɪt ɪz naɪs/', vi: 'Tôi thích nơi này vì nó rất đẹp.', fillWord: 'this place / nice' },
        { en: 'I like to practice because it is fast.', ipa: '/aɪ laɪk tuː ˈpræk.tɪs bɪˈkɑːz ɪt ɪz fæst/', vi: 'Tôi thích luyện tập vì nó nhanh gọn.', fillWord: 'to practice / fast' },
        { en: 'I like this coffee because it is exact.', ipa: '/aɪ laɪk ðɪs ˈkɑː.fi bɪˈkɑːz ɪt ɪz ɪɡˈzækt/', vi: 'Tôi thích cà phê này vì nó chuẩn vị.', fillWord: 'this coffee / exact' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-0-1-1',
        promptVi: 'Nghe và chọn từ phát ra âm /k/ bật ở đuôi (không bị nuốt âm):',
        audioWord: 'like',
        options: [
          { word: 'like', ipa: '/laɪk/', meaningVi: 'thích (bật /k/)' },
          { word: 'lie', ipa: '/laɪ/', meaningVi: 'nói dối / nằm (không có âm đuôi)' }
        ],
        correctIndex: 0,
        explanationVi: 'Từ "like" /laɪk/ có âm đuôi /k/ bật nhẹ trong cổ họng, khác với "lie" /laɪ/ không có âm kết thúc.'
      },
      {
        id: 'drill-0-1-2',
        promptVi: 'Nghe và chọn từ phát ra âm /s/ xì gió ở đuôi:',
        audioWord: 'nice',
        options: [
          { word: 'nice', ipa: '/naɪs/', meaningVi: 'tuyệt vời (xì /s/)' },
          { word: 'night', ipa: '/naɪt/', meaningVi: 'buổi đêm (bật /t/)' }
        ],
        correctIndex: 0,
        explanationVi: 'Từ "nice" /naɪs/ có âm xì gió /s/ kéo dài ở cuối, trong khi "night" /naɪt/ ngắt bằng âm bật /t/.'
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: Mời Lịch Sự Với Nguyên Âm Căng & Thả Lỏng",
      pattern: "Please [Động từ] and take a look at this [Danh từ].",
      formulaVi: "Xin vui lòng [làm gì] và xem qua [cái gì]",
      usageVi: "Giúp bạn luyện tập sự tương phản giữa âm /iː/ kéo dài mỉm cười (please, sheet) và âm /ɪ/ thả lỏng ngắn gọn (sit, ship).",
      examples: [
            {
                  en: "Please sit down and take a look at this sheet.",
                  ipa: "/pliːz sɪt daʊn ænd teɪk ə lʊk æt ðɪs ʃiːt/",
                  vi: "Xin mời ngồi xuống và xem qua tờ tài liệu này.",
                  fillWord: "sit down / sheet"
            },
            {
                  en: "Please leave the keys on the ship.",
                  ipa: "/pliːz liːv ðə kiːz ɑːn ðə ʃɪp/",
                  vi: "Xin hãy để chìa khóa lại trên tàu.",
                  fillWord: "leave / ship"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-0-2-1",
            promptVi: "Nghe và phân biệt: Đây là âm /iː/ (Cười tươi kéo dài) hay /ɪ/ (Thả lỏng ngắn gọn)?",
            audioWord: "beach",
            options: [
                  {
                        word: "beach",
                        ipa: "/biːtʃ/",
                        meaningVi: "bãi biển (âm /iː/ kéo dài)"
                  },
                  {
                        word: "bitch",
                        ipa: "/bɪtʃ/",
                        meaningVi: "từ nhạy cảm (âm /ɪ/ ngắn)"
                  }
            ],
            correctIndex: 0,
            explanationVi: "Từ \"beach\" có nguyên âm /iː/ căng mọng kéo dài khóe môi cười, tuyệt đối không phát âm giật cục kẻo nhầm từ nhạy cảm."
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: Hỏi & Xác Nhận Đồ Vật Với Âm A Rớt Hàm",
      pattern: "Is that [Tính từ màu sắc/kích thước] [Danh từ] yours?",
      formulaVi: "Chiếc [X] [Y] kia có phải của bạn không?",
      usageVi: "Luyện tập hạ cằm sâu cho các từ chứa âm /æ/ (that, black, bag) khi hỏi người khác.",
      examples: [
            {
                  en: "Is that black bag yours on the desk?",
                  ipa: "/ɪz ðæt blæk bæɡ jɔːrz ɑːn ðə desk/",
                  vi: "Chiếc túi màu đen trên bàn kia có phải của bạn không?",
                  fillWord: "black bag"
            },
            {
                  en: "Is that black jacket in the back yours?",
                  ipa: "/ɪz ðæt blæk ˈdʒæk.ɪt ɪn ðə bæk jɔːrz/",
                  vi: "Chiếc áo khoác đen phía sau kia có phải của bạn không?",
                  fillWord: "black jacket"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-0-3-1",
            promptVi: "Nghe và chọn từ phát ra âm /æ/ há to rớt hàm:",
            audioWord: "cat",
            options: [
                  {
                        word: "cat",
                        ipa: "/kæt/",
                        meaningVi: "con mèo (âm /æ/ rớt hàm)"
                  },
                  {
                        word: "cut",
                        ipa: "/kʌt/",
                        meaningVi: "cắt (âm /ʌ/ miệng khép hờ)"
                  }
            ],
            correctIndex: 0,
            explanationVi: "Âm /æ/ trong \"cat\" yêu cầu cằm rớt sâu, âm /ʌ/ trong \"cut\" miệng thả lỏng tự nhiên."
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: Hỏi Quan Điểm Lịch Sự Với Âm TH Thè Lưỡi",
      pattern: "What do you think about [Danh từ / Ý tưởng]?",
      formulaVi: "Bạn nghĩ gì về [điều gì]?",
      usageVi: "Mẫu câu kinh điển giúp bạn luyện đặt đầu lưỡi ra giữa 2 răng khi phát âm \"think\" và \"this\".",
      examples: [
            {
                  en: "What do you think about this new method?",
                  ipa: "/wɑːt duː juː θɪŋk əˈbaʊt ðɪs nuː ˈmeθ.əd/",
                  vi: "Bạn nghĩ gì về phương pháp mới này?",
                  fillWord: "this new method"
            },
            {
                  en: "What do you think about working together?",
                  ipa: "/wɑːt duː juː θɪŋk əˈbaʊt ˈwɜːrk.ɪŋ təˈɡeð.ɚ/",
                  vi: "Bạn nghĩ sao về việc cùng làm việc với nhau?",
                  fillWord: "working together"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-0-4-1",
            promptVi: "Nghe và phân biệt: Từ này bắt đầu bằng âm thè lưỡi /θ/ hay âm /s/?",
            audioWord: "think",
            options: [
                  {
                        word: "think",
                        ipa: "/θɪŋk/",
                        meaningVi: "suy nghĩ (thè lưỡi cắn nhẹ)"
                  },
                  {
                        word: "sink",
                        ipa: "/sɪŋk/",
                        meaningVi: "chìm xuống / bồn rửa (xì răng khép)"
                  }
            ],
            correctIndex: 0,
            explanationVi: "Âm /θ/ trong \"think\" có đầu lưỡi kẹp nhẹ giữa 2 răng, khác với \"sink\" hai hàm răng khép kín."
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: Kể Về Sự Kiện Mới Với Âm Chu Môi /ʃ/ & /dʒ/",
      pattern: "She just [Động từ quá khứ] a new [Danh từ].",
      formulaVi: "Cô ấy vừa [làm gì] một [cái gì] mới",
      usageVi: "Luyện chu môi tròn thổi gió cho \"she\" và bật rung nổ giòn cho \"job\", \"change\".",
      examples: [
            {
                  en: "She just started a new job this morning.",
                  ipa: "/ʃiː dʒʌst ˈstɑːr.t̬ɪd ə nuː dʒɑːb ðɪs ˈmɔːr.nɪŋ/",
                  vi: "Cô ấy vừa bắt đầu công việc mới sáng nay.",
                  fillWord: "started / job"
            },
            {
                  en: "She just made a huge change in her career.",
                  ipa: "/ʃiː dʒʌst meɪd ə hjuːdʒ tʃeɪndʒ ɪn hɜːr kəˈrɪr/",
                  vi: "Cô ấy vừa tạo ra một bước ngoặt lớn trong sự nghiệp.",
                  fillWord: "made / change"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-0-5-1",
            promptVi: "Nghe và chọn từ phát ra âm chu môi /ʃ/:",
            audioWord: "she",
            options: [
                  {
                        word: "she",
                        ipa: "/ʃiː/",
                        meaningVi: "cô ấy (chu mỏ thổi gió)"
                  },
                  {
                        word: "see",
                        ipa: "/siː/",
                        meaningVi: "nhìn thấy (bè môi cười)"
                  }
            ],
            correctIndex: 0,
            explanationVi: "Từ \"she\" /ʃiː/ môi phải chu tròn như ra hiệu suỵt im lặng, khác với \"see\" /siː/ môi bè sang hai bên."
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: So Sánh Hơn Cực Mượt Với Biến Âm Flap T",
      pattern: "[Danh từ A] is much better for me, thank you!",
      formulaVi: "[Món A] tốt hơn nhiều cho tôi, cảm ơn bạn!",
      usageVi: "Luyện nói lướt \"beh-der\" và \"wah-der\" không bị ngắc ngứ khi chọn lựa đồ ăn, nước uống.",
      examples: [
            {
                  en: "Cold water is much better for me, thank you!",
                  ipa: "/koʊld ˈwɑː.t̬ɚ ɪz mʌtʃ ˈbet̬.ɚ fɔːr miː, θæŋk juː/",
                  vi: "Nước lạnh tốt hơn nhiều cho tôi, cảm ơn bạn!",
                  fillWord: "Cold water"
            },
            {
                  en: "This city is much better in winter.",
                  ipa: "/ðɪs ˈsɪt̬.i ɪz mʌtʃ ˈbet̬.ɚ ɪn ˈwɪn.t̬ɚ/",
                  vi: "Thành phố này đẹp hơn nhiều vào mùa đông.",
                  fillWord: "This city"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-0-6-1",
            promptVi: "Nghe và nhận diện âm Flap T kiểu Mỹ:",
            audioWord: "water",
            options: [
                  {
                        word: "water",
                        ipa: "/ˈwɑː.t̬ɚ/",
                        meaningVi: "nước uống (đọc là wah-der)"
                  },
                  {
                        word: "waiter",
                        ipa: "/ˈweɪ.t̬ɚ/",
                        meaningVi: "người bồi bàn (đọc là way-der)"
                  }
            ],
            correctIndex: 0,
            explanationVi: "Âm /ɑː/ mở rộng họng trong \"water\" khác với nguyên âm đôi /eɪ/ trong \"waiter\"."
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: Bắt Chuyện Tự Nhiên & Giới Thiệu Bản Thân",
      pattern: "Pretty good! I am [Tên] from [Thành phố]. Pleasure to meet you!",
      formulaVi: "Khá tốt! Tôi là [Tên] đến từ [Nơi chốn]. Rất vui được gặp bạn!",
      usageVi: "Mẫu câu mở đầu thân thiện, tự tin khi gặp gỡ người nước ngoài tại Việt Nam.",
      examples: [
            {
                  en: "Pretty good! I am Minh from Hanoi. Pleasure to meet you!",
                  ipa: "/ˈprɪt̬.i ɡʊd! aɪ æm mɪnh frʌm hæˈnɔɪ. ˈpleʒ.ɚ tuː miːtʃ juː/",
                  vi: "Khá tốt! Tôi là Minh đến từ Hà Nội. Rất vui được gặp bạn!",
                  fillWord: "Minh / Hanoi"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-1-1-1",
            promptVi: "Nghe câu chào và chọn câu có nối âm How-zit-going:",
            audioWord: "awesome",
            options: [
                  {
                        word: "awesome",
                        ipa: "/ˈɑː.səm/",
                        meaningVi: "tuyệt vời (từ lóng phổ biến)"
                  },
                  {
                        word: "awful",
                        ipa: "/ˈɑː.fəl/",
                        meaningVi: "tồi tệ (trái nghĩa)"
                  }
            ],
            correctIndex: 0,
            explanationVi: "\"Awesome\" /ˈɑː.səm/ có nghĩa là tuyệt vời, rất hay được người Mỹ dùng để trả lời khi được hỏi thăm."
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: Gọi Đồ Uống Chuẩn Người Mỹ (Starbucks / Cafe)",
      pattern: "Can I get a [Kích cỡ] [Tên đồ uống] with [Yêu cầu thêm], [To go / For here]?",
      formulaVi: "Cho tôi 1 ly [cỡ] [món] [yêu cầu], [mang đi / tại quán] nhé?",
      usageVi: "Chỉ cần thay tên món là bạn có thể tự tin gọi bất kỳ loại đồ uống nào tại các chuỗi quốc tế.",
      examples: [
            {
                  en: "Can I get a grande iced Americano with extra ice, to go?",
                  ipa: "/kæn aɪ ɡet ə ˈɡrɑːn.deɪ aɪst əˌmer.ɪˈkɑː.noʊ wɪð ˈek.strə aɪs, tuː ɡoʊ/",
                  vi: "Cho mình 1 ly Americano đá size vừa, nhiều đá, mang đi nhé?",
                  fillWord: "grande iced Americano / extra ice / to go"
            },
            {
                  en: "Can I get a tall hot latte with oat milk, for here?",
                  ipa: "/kæn aɪ ɡet ə tɑːl hɑːt ˈlɑː.teɪ wɪð oʊt mɪlk, fɔːr hɪr/",
                  vi: "Cho mình 1 ly latte nóng size nhỏ, sữa yến mạch, dùng tại đây nhé?",
                  fillWord: "tall hot latte / oat milk / for here"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-1-2-1",
            promptVi: "Nghe và chọn từ phát âm đúng (chú ý chữ \"p\" là âm câm):",
            audioWord: "receipt",
            options: [
                  {
                        word: "receipt",
                        ipa: "/rɪˈsiːt/",
                        meaningVi: "hóa đơn (âm p câm, đọc là ri-sít)"
                  },
                  {
                        word: "recipe",
                        ipa: "/ˈres.ə.pi/",
                        meaningVi: "công thức nấu ăn (3 âm tiết)"
                  }
            ],
            correctIndex: 0,
            explanationVi: "Trong từ \"receipt\" /rɪˈsiːt/, chữ \"p\" là âm câm, tuyệt đối không đọc là ri-síp-tờ."
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
    ],
    sentencePattern: {
      titleVi: "Khuôn Mẫu Câu: Gọi Món & Tách Hóa Đơn Nhà Hàng",
      pattern: "We are ready! Could we get [Số lượng món] and split the bill?",
      formulaVi: "Chúng tôi sẵn sàng! Cho chúng tôi [món] và chia tiền hóa đơn nhé?",
      usageVi: "Dùng khi đi ăn uống cùng bạn bè hoặc đối tác tại nhà hàng nước ngoài.",
      examples: [
            {
                  en: "We are ready! Could we get two beef burgers and split the bill?",
                  ipa: "/wiː ɑːr ˈred.i! kʊd wiː ɡet tuː biːf ˈbɜːr.ɡɚz ænd splɪt ðə bɪl/",
                  vi: "Cho chúng tôi 2 burger bò và chia tiền hóa đơn nhé?",
                  fillWord: "two beef burgers"
            }
      ]
},
    earTrainingDrills: [
      {
            id: "drill-1-3-1",
            promptVi: "Nghe và chọn từ miêu tả món ăn ngon miệng:",
            audioWord: "delicious",
            options: [
                  {
                        word: "delicious",
                        ipa: "/dɪˈlɪʃ.əs/",
                        meaningVi: "thơm ngon, ngon miệng"
                  },
                  {
                        word: "delicate",
                        ipa: "/ˈdel.ə.kət/",
                        meaningVi: "tinh tế, mỏng manh"
                  }
            ],
            correctIndex: 0,
            explanationVi: "\"Delicious\" /dɪˈlɪʃ.əs/ có trọng âm rơi vào âm tiết thứ 2 -LISH-."
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
    titleEn: 'English Job Interview in Vietnam',
    titleVi: 'Phỏng Vấn Xin Việc Bằng Tiếng Anh Tại Công Ty Đa Quốc Gia / FDI',
    descriptionVi: 'Tự tin giới thiệu bản thân, trình bày kinh nghiệm làm việc, điểm mạnh cá nhân và đàm phán mức lương.',
    icon: 'Briefcase',
    durationMinutes: 15,
    tags: ['Phỏng vấn', 'Job Interview', 'Tiếng Anh đi làm'],
    keyTakeaways: [
      'Cấu trúc giới thiệu kinh nghiệm: I have X years of experience in...',
      'Mô tả thế mạnh: Strong problem-solving & teamwork skills',
      'Cách đặt câu hỏi ngược lại cho nhà tuyển dụng'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Experience" và "Strength"',
        description: 'Experience /ɪkˈspɪr.i.əns/ có 4 âm tiết, trọng âm rơi vào -SPIR-. Strength /streŋθ/ thè lưỡi âm /θ/ ở đuôi.',
        rule: 'Không đọc strength thành "xờ-tren".',
        examples: [
          { en: 'experience', ipa: '/ɪkˈspɪr.i.əns/', vi: 'kinh nghiệm', soundTip: 'Trọng âm âm 2' },
          { en: 'strength', ipa: '/streŋθ/', vi: 'thế mạnh', soundTip: 'Thè lưỡi âm th' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-1-1',
        word: 'experience',
        ipa: '/ɪkˈspɪr.i.əns/',
        partOfSpeech: 'noun',
        meaningVi: 'kinh nghiệm làm việc',
        exampleSentence: 'I have four years of experience in finance.',
        exampleSentenceVi: 'Tôi có 4 năm kinh nghiệm trong ngành tài chính.',
        endingSoundNote: 'Đuôi -ce đọc thành /s/ xì gió.',
        americanTip: 'Nhấn mạnh âm -SPIR-.'
      },
      {
        id: 'v2-1-2',
        word: 'strength',
        ipa: '/streŋθ/',
        partOfSpeech: 'noun',
        meaningVi: 'thế mạnh, điểm mạnh',
        exampleSentence: 'My greatest strength is problem-solving.',
        exampleSentenceVi: 'Điểm mạnh lớn nhất của tôi là giải quyết vấn đề.',
        endingSoundNote: 'Cụm /str/ đầu, âm /θ/ thè lưỡi ở cuối.',
        americanTip: 'Không đọc mất âm th.'
      },
      {
        id: 'v2-1-3',
        word: 'teamwork',
        ipa: '/ˈtiːm.wɜːrk/',
        partOfSpeech: 'noun',
        meaningVi: 'kỹ năng làm việc nhóm',
        exampleSentence: 'I value strong teamwork and open communication.',
        exampleSentenceVi: 'Tôi đánh giá cao tinh thần đồng đội và giao tiếp cởi mở.',
        endingSoundNote: 'Bật /k/ ở cuối từ work.',
        americanTip: 'Trọng âm rơi vào TEAM-.'
      },
      {
        id: 'v2-1-4',
        word: 'position',
        ipa: '/pəˈzɪʃ.ən/',
        partOfSpeech: 'noun',
        meaningVi: 'vị trí công việc ứng tuyển',
        exampleSentence: 'Why are you interested in this position?',
        exampleSentenceVi: 'Tại sao bạn lại quan tâm đến vị trí này?',
        endingSoundNote: 'Âm giữa là /z/, đuôi /ʃən/.',
        americanTip: 'Trọng âm rơi vào -ZISH-.'
      },
      {
        id: 'v2-1-5',
        word: 'contribute',
        ipa: '/kənˈtrɪb.juːt/',
        partOfSpeech: 'verb',
        meaningVi: 'đóng góp, cống hiến',
        exampleSentence: 'I want to contribute to the company growth.',
        exampleSentenceVi: 'Tôi muốn đóng góp vào sự phát triển của công ty.',
        endingSoundNote: 'Bật nhẹ /t/ ở cuối.',
        americanTip: 'Trọng âm rơi vào -TRIB-.'
      }
    ],
    dialogue: [
      {
        id: 'd2-1-1',
        speaker: 'A',
        speakerName: 'Interviewer (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Welcome! Could you tell me a little bit about your professional background?',
        textVi: 'Chào mừng bạn! Bạn có thể chia sẻ đôi nét về quá trình làm việc của mình không?',
        ipa: '/ˈwel.kəm! kʊd juː tel miː ə ˈlɪt̬.əl bɪt əˈbaʊt jɔːr prəˈfeʃ.ən.əl ˈbæk.ɡraʊnd/'
      },
      {
        id: 'd2-1-2',
        speaker: 'B',
        speakerName: 'Minh (Ứng viên)',
        avatar: '👨‍💼',
        textEn: 'Certainly! I have four years of experience in project management with strong teamwork skills.',
        textVi: 'Chắc chắn rồi ạ! Tôi có 4 năm kinh nghiệm quản lý dự án cùng kỹ năng làm việc nhóm tốt.',
        ipa: '/ˈsɜːr.tən.li! aɪ hæv fɔːr jɪrz ʌv ɪkˈspɪr.i.əns ɪn ˈprɑː.dʒekt ˈmæn.ədʒ.mənt wɪð strɑːŋ ˈtiːm.wɜːrk skɪlz/'
      },
      {
        id: 'd2-1-3',
        speaker: 'A',
        speakerName: 'Interviewer (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Impressive! What would you say is your greatest strength in high-pressure situations?',
        textVi: 'Rất ấn tượng! Vậy điểm mạnh lớn nhất của bạn trong môi trường áp lực cao là gì?',
        ipa: '/ɪmˈpres.ɪv! wɑːt wʊd juː seɪ ɪz jɔːr ˈɡreɪ.t̬ɪst streŋθ ɪn haɪ ˈpreʃ.ɚ ˌsɪtʃ.uˈeɪ.ʃənz/'
      },
      {
        id: 'd2-1-4',
        speaker: 'B',
        speakerName: 'Minh (Ứng viên)',
        avatar: '👨‍💼',
        textEn: 'I excel at problem-solving and keeping my team focused on our core deadlines.',
        textVi: 'Thế mạnh của tôi là giải quyết vấn đề và giữ cho cả nhóm luôn bám sát các hạn chót then chốt.',
        ipa: '/aɪ ɪkˈsel æt ˈprɑː.bləm ˌsɑːl.vɪŋ ænd ˈkiː.pɪŋ maɪ tiːm ˈfoʊ.kəst ɑːn ˈaʊ.ɚ kɔːr ˈded.laɪnz/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: I have [X] years of experience in + [Field]',
        structure: 'I have + [Number] years of experience in + [Industry/Skill]',
        explanationVi: 'Mẫu câu vàng khi trả lời phỏng vấn để nêu rõ số năm kinh nghiệm chuyên môn.',
        exampleEn: 'I have four years of experience in project management.',
        exampleIpa: '/aɪ hæv fɔːr jɪrz ʌv ɪkˈspɪr.i.əns ɪn ˈprɑː.dʒekt ˈmæn.ədʒ.mənt/',
        exampleVi: 'Tôi có 4 năm kinh nghiệm trong quản lý dự án.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Trả Lời Phỏng Vấn Xin Việc (Job Interview)',
      pattern: 'I have [Số năm] years of experience in [Lĩnh vực] with strong [Kỹ năng] skills.',
      formulaVi: 'Tôi có [X] năm kinh nghiệm trong [ngành] cùng kỹ năng [thế mạnh] tốt.',
      usageVi: 'Khung trả lời ngắn gọn, trực diện, thể hiện sự chuyên nghiệp và tự tin trước nhà tuyển dụng.',
      examples: [
        { en: 'I have three years of experience in marketing with strong teamwork skills.', ipa: '/aɪ hæv θriː jɪrz ʌv ɪkˈspɪr.i.əns ɪn ˈmɑːr.kɪ.t̬ɪŋ wɪð strɑːŋ ˈtiːm.wɜːrk skɪlz/', vi: 'Tôi có 3 năm kinh nghiệm trong ngành marketing cùng kỹ năng làm việc nhóm tốt.', fillWord: 'three / marketing / teamwork' },
        { en: 'I have five years of experience in software design with strong problem-solving skills.', ipa: '/aɪ hæv faɪv jɪrz ʌv ɪkˈspɪr.i.əns ɪn ˈsɑːft.wer dɪˈzaɪn wɪð strɑːŋ ˈprɑː.bləm ˌsɑːl.vɪŋ skɪlz/', vi: 'Tôi có 5 năm kinh nghiệm trong ngành thiết kế phần mềm cùng kỹ năng giải quyết vấn đề tốt.', fillWord: 'five / software design / problem-solving' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-2-1-1',
        promptVi: 'Nghe và chọn từ chỉ điểm mạnh cá nhân:',
        audioWord: 'strength',
        options: [
          { word: 'strength', ipa: '/streŋθ/', meaningVi: 'điểm mạnh, thế mạnh' },
          { word: 'strange', ipa: '/streɪndʒ/', meaningVi: 'kỳ lạ, xa lạ' }
        ],
        correctIndex: 0,
        explanationVi: '"Strength" /streŋθ/ kết thúc bằng âm thè lưỡi /θ/, khác với "strange" /streɪndʒ/ kết thúc bằng /dʒ/.'
      }
    ]
  },
  {
    id: 'lv2-lesson-2',
    levelId: 'lv2',
    titleEn: 'Office Small Talk & Water Cooler Chats',
    titleVi: 'Trò Chuyện Thân Mật Bên Máy Pha Cà Phê Công Sở (Small Talk)',
    descriptionVi: 'Cách bắt chuyện tự nhiên với đồng nghiệp quốc tế, hỏi thăm cuối tuần, thảo luận thời tiết và tạo mối quan hệ tốt.',
    icon: 'Coffee',
    durationMinutes: 15,
    tags: ['Office', 'Small Talk', 'Công sở'],
    keyTakeaways: [
      'Bắt chuyện cuối tuần: Any plans for the weekend?',
      'Phản hồi hào hứng: That sounds like a blast!',
      'Tránh các chủ đề nhạy cảm nơi công sở'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Colleague" và "Schedule"',
        description: 'Colleague /ˈkɑː.liːɡ/ chỉ có 2 âm tiết, trọng âm rơi vào âm 1. Schedule /ˈskedʒ.uːl/ theo giọng Mỹ.',
        rule: 'Không đọc colleague thành "co-lít-gơ".',
        examples: [
          { en: 'colleague', ipa: '/ˈkɑː.liːɡ/', vi: 'đồng nghiệp', soundTip: 'Bật nhẹ /ɡ/ đuôi' },
          { en: 'schedule', ipa: '/ˈskedʒ.uːl/', vi: 'lịch trình', soundTip: 'Âm /sk/ liền mạch' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-2-1',
        word: 'colleague',
        ipa: '/ˈkɑː.liːɡ/',
        partOfSpeech: 'noun',
        meaningVi: 'đồng nghiệp',
        exampleSentence: 'She is a very supportive colleague.',
        exampleSentenceVi: 'Cô ấy là một người đồng nghiệp rất hay giúp đỡ.',
        endingSoundNote: 'Âm đuôi /ɡ/ rung nhẹ.',
        americanTip: 'Chỉ có 2 âm tiết, không đọc âm thứ 3.'
      },
      {
        id: 'v2-2-2',
        word: 'schedule',
        ipa: '/ˈskedʒ.uːl/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'lịch làm việc, lên lịch',
        exampleSentence: 'My schedule is quite packed today.',
        exampleSentenceVi: 'Lịch làm việc của tôi hôm nay khá kín.',
        endingSoundNote: 'Âm đầu /skedʒ/, âm cuối /uːl/.',
        americanTip: 'Người Mỹ đọc là "ske-jul", khác giọng Anh "she-dyul".'
      },
      {
        id: 'v2-2-3',
        word: 'packed',
        ipa: '/pækt/',
        partOfSpeech: 'adj',
        meaningVi: 'bận rộn, kín lịch',
        exampleSentence: 'I have a packed afternoon with meetings.',
        exampleSentenceVi: 'Buổi chiều của tôi kín lịch họp.',
        endingSoundNote: 'Đuôi -ed đọc thành âm /t/ sau /k/.',
        americanTip: 'Âm /æ/ há to cằm.'
      },
      {
        id: 'v2-2-4',
        word: 'relaxing',
        ipa: '/rɪˈlæk.sɪŋ/',
        partOfSpeech: 'adj',
        meaningVi: 'thư giãn, thoải mái',
        exampleSentence: 'Have a relaxing weekend ahead!',
        exampleSentenceVi: 'Chúc một cuối tuần thư giãn nhé!',
        endingSoundNote: 'Trọng âm rơi vào -LAK-.',
        americanTip: 'Dùng khi chúc đồng nghiệp.'
      }
    ],
    dialogue: [
      {
        id: 'd2-2-1',
        speaker: 'A',
        speakerName: 'Brian (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Morning Trang! Grabbed your morning coffee yet?',
        textVi: 'Chào buổi sáng Trang! Đã lấy cà phê sáng chưa?',
        ipa: '/ˈmɔːr.nɪŋ Trang! ɡræbd jɔːr ˈmɔːr.nɪŋ ˈkɑː.fi jet/'
      },
      {
        id: 'd2-2-2',
        speaker: 'B',
        speakerName: 'Trang (Học viên)',
        avatar: '👩‍💼',
        textEn: 'Just got one! My schedule is pretty packed today with project reviews.',
        textVi: 'Tôi vừa lấy một ly! Hôm nay lịch của tôi khá kín với các buổi đánh giá dự án.',
        ipa: '/dʒʌst ɡɑːt wʌn! maɪ ˈskedʒ.uːl ɪz ˈprɪt̬.i pækt təˈdeɪ wɪð ˈprɑː.dʒekt rɪˈvjuːz/'
      },
      {
        id: 'd2-2-3',
        speaker: 'A',
        speakerName: 'Brian (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Same here! Any relaxing plans once we wrap up for the weekend?',
        textVi: 'Tôi cũng vậy! Bạn có kế hoạch thư giãn gì sau khi kết thúc công việc cuối tuần chưa?',
        ipa: '/seɪm hɪr! ˈen.i rɪˈlæk.sɪŋ plænz wʌns wiː ræp ʌp fɔːr ðə ˈwiːk.end/'
      },
      {
        id: 'd2-2-4',
        speaker: 'B',
        speakerName: 'Trang (Học viên)',
        avatar: '👩‍💼',
        textEn: 'I\'m planning to go camping near the mountains with some colleagues.',
        textVi: 'Tôi dự định đi cắm trại gần vùng núi cùng vài người đồng nghiệp.',
        ipa: '/aɪm ˈplæn.ɪŋ tuː ɡoʊ ˈkæm.pɪŋ nɪr ðə ˈmaʊn.tənz wɪð sʌm ˈkɑː.liːɡz/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: Any plans for [Event]? (Hỏi kế hoạch ngắn gọn)',
        structure: 'Any plans for + the weekend / tonight / the holiday?',
        explanationVi: 'Lược bỏ "Do you have...", tạo cảm giác gần gũi, thân mật nơi công sở.',
        exampleEn: 'Any plans for the weekend?',
        exampleIpa: '/ˈen.i plænz fɔːr ðə ˈwiːk.end/',
        exampleVi: 'Cuối tuần có kế hoạch gì chưa?'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Bắt Chuyện Thân Mật Nơi Công Sở',
      pattern: 'My schedule is pretty packed today with [Công việc]. How about yours?',
      formulaVi: 'Lịch của tôi hôm nay khá kín với [việc]. Còn bạn thì sao?',
      usageVi: 'Cách mở đầu trò chuyện nhẹ nhàng, tự nhiên trước khi bắt đầu ngày làm việc.',
      examples: [
        { en: 'My schedule is pretty packed today with client meetings. How about yours?', ipa: '/maɪ ˈskedʒ.uːl ɪz ˈprɪt̬.i pækt təˈdeɪ wɪð ˈklaɪ.ənt ˈmiː.t̬ɪŋz. haʊ əˈbaʊt jɔːrz/', vi: 'Lịch hôm nay của tôi khá kín với các cuộc họp khách hàng. Còn bạn thì sao?', fillWord: 'client meetings' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-2-2-1',
        promptVi: 'Nghe và chọn từ chỉ đồng nghiệp công ty:',
        audioWord: 'colleague',
        options: [
          { word: 'colleague', ipa: '/ˈkɑː.liːɡ/', meaningVi: 'đồng nghiệp' },
          { word: 'college', ipa: '/ˈkɑː.lɪdʒ/', meaningVi: 'trường cao đẳng (đuôi /dʒ/)' }
        ],
        correctIndex: 0,
        explanationVi: '"Colleague" kết thúc bằng âm /ɡ/ rung nhẹ, còn "college" kết thúc bằng âm /dʒ/ nổ gió.'
      }
    ]
  },
  {
    id: 'lv2-lesson-3',
    levelId: 'lv2',
    titleEn: 'Online Meetings on Zoom & Teams',
    titleVi: 'Làm Chủ Cuộc Họp Trực Tuyến Qua Zoom & Microsoft Teams',
    descriptionVi: 'Cách xử lý sự cố mic, chia sẻ màn hình, ngắt lời lịch sự và tóm tắt biên bản cuộc họp.',
    icon: 'Video',
    durationMinutes: 15,
    tags: ['Zoom', 'Teams', 'Họp online'],
    keyTakeaways: [
      'Xử lý sự cố mic: You are on mute, Your audio is cutting out',
      'Chia sẻ màn hình: Can everyone see my screen?',
      'Ngắt lời lịch sự: Sorry to interrupt, but...'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Mute" và "Screen"',
        description: 'Mute /mjuːt/ có âm /j/ ở giữa, kết thúc bằng /t/. Screen /skriːn/ có cụm /skr/.',
        rule: 'Không đọc mute thành "mút".',
        examples: [
          { en: 'on mute', ipa: '/ɑːn mjuːt/', vi: 'đang tắt mic', soundTip: 'Bật /t/ dứt khoát' },
          { en: 'share screen', ipa: '/ʃer skriːn/', vi: 'chia sẻ màn hình', soundTip: 'Chu môi cho share' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-3-1',
        word: 'mute',
        ipa: '/mjuːt/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'tắt tiếng, tắt mic',
        exampleSentence: 'You are on mute, could you unmute?',
        exampleSentenceVi: 'Bạn đang tắt mic, bạn bật mic lên nhé?',
        endingSoundNote: 'Âm /j/ lướt nhẹ, kết thúc bằng /t/.',
        americanTip: 'Cụm từ phổ biến nhất trong mọi cuộc họp online.'
      },
      {
        id: 'v2-3-2',
        word: 'screen',
        ipa: '/skriːn/',
        partOfSpeech: 'noun',
        meaningVi: 'màn hình máy tính',
        exampleSentence: 'Let me share my screen with you.',
        exampleSentenceVi: 'Để tôi chia sẻ màn hình với bạn.',
        endingSoundNote: 'Cụm /skr/, nguyên âm /iː/ kéo dài.',
        americanTip: 'Đầu lưỡi chạm răng trên cho âm /n/.'
      },
      {
        id: 'v2-3-3',
        word: 'interrupt',
        ipa: '/ˌɪn.t̬əˈrʌpt/',
        partOfSpeech: 'verb',
        meaningVi: 'ngắt lời, chen ngang',
        exampleSentence: 'Sorry to interrupt, but I have a quick question.',
        exampleSentenceVi: 'Xin lỗi vì ngắt lời, nhưng tôi có câu hỏi nhanh.',
        endingSoundNote: 'Cụm đuôi /pt/ bật cả p và t.',
        americanTip: 'Trọng âm rơi vào âm cuối -RUPT.'
      },
      {
        id: 'v2-3-4',
        word: 'summarize',
        ipa: '/ˈsʌm.ə.raɪz/',
        partOfSpeech: 'verb',
        meaningVi: 'tóm tắt, tổng kết',
        exampleSentence: 'Let me summarize the key takeaways.',
        exampleSentenceVi: 'Để tôi tóm tắt lại các ý chính.',
        endingSoundNote: 'Âm cuối /z/ rung nhẹ.',
        americanTip: 'Trọng âm rơi vào SUM-.'
      }
    ],
    dialogue: [
      {
        id: 'd2-3-1',
        speaker: 'A',
        speakerName: 'Host (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Hi team! Can everyone hear me clearly and see my shared screen?',
        textVi: 'Chào cả nhóm! Mọi người có nghe rõ tiếng tôi và thấy màn hình chia sẻ không?',
        ipa: '/haɪ tiːm! kæn ˈev.ri.wʌn hɪr miː ˈklɪr.li ænd siː maɪ ʃerd skriːn/'
      },
      {
        id: 'd2-3-2',
        speaker: 'B',
        speakerName: 'Đức (Học viên)',
        avatar: '👨‍💻',
        textEn: 'Yes, we can see it loud and clear! Ready when you are.',
        textVi: 'Vâng, chúng tôi thấy và nghe rất rõ ràng! Sẵn sàng khi bạn bắt đầu.',
        ipa: '/jes, wiː kæn siː ɪt laʊd ænd klɪr! ˈred.i wen juː ɑːr/'
      },
      {
        id: 'd2-3-3',
        speaker: 'A',
        speakerName: 'Host (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'John, you\'re currently on mute if you\'re trying to speak.',
        textVi: 'John ơi, bạn hiện đang tắt mic nếu như bạn đang định phát biểu đấy.',
        ipa: '/John, jʊr ˈkɝː.ənt.li ɑːn mjuːt ɪf jʊr ˈtraɪ.ɪŋ tuː spiːk/'
      },
      {
        id: 'd2-3-4',
        speaker: 'B',
        speakerName: 'Đức (Học viên)',
        avatar: '👨‍💻',
        textEn: 'Sorry to interrupt, let me summarize our action items before John speaks.',
        textVi: 'Xin lỗi vì ngắt lời, để tôi tóm tắt các đầu việc hành động trước khi John nói nhé.',
        ipa: '/ˈsɑːr.i tuː ˌɪn.t̬əˈrʌpt, let miː ˈsʌm.ə.raɪz ˈaʊ.ɚ ˈæk.ʃən ˈaɪ.t̬əmz bɪˈfɔːr John spiːks/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: Can everyone see/hear...? (Kiểm tra kết nối)',
        structure: 'Can everyone see my screen / hear me clearly?',
        explanationVi: 'Câu mở đầu kinh điển trong mọi buổi họp trực tuyến qua Zoom/Teams.',
        exampleEn: 'Can everyone see my screen?',
        exampleIpa: '/kæn ˈev.ri.wʌn siː maɪ skriːn/',
        exampleVi: 'Mọi người có nhìn thấy màn hình của tôi không?'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Kiểm Tra Tương Tác Họp Trực Tuyến',
      pattern: 'Can everyone [Hear / See] my [Audio / Screen] clearly?',
      formulaVi: 'Mọi người có [nghe / nhìn] thấy [âm thanh / màn hình] rõ ràng không?',
      usageVi: 'Dùng khi bắt đầu trình bày trong cuộc họp online.',
      examples: [
        { en: 'Can everyone see my presentation slides clearly?', ipa: '/kæn ˈev.ri.wʌn siː maɪ ˌprez.ənˈteɪ.ʃən slaɪdz ˈklɪr.li/', vi: 'Mọi người có nhìn thấy slide thuyết trình của tôi rõ không?', fillWord: 'presentation slides' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-2-3-1',
        promptVi: 'Nghe và chọn từ chỉ trạng thái tắt mic:',
        audioWord: 'mute',
        options: [
          { word: 'mute', ipa: '/mjuːt/', meaningVi: 'tắt mic' },
          { word: 'mood', ipa: '/muːd/', meaningVi: 'tâm trạng (đuôi /d/)' }
        ],
        correctIndex: 0,
        explanationVi: '"Mute" có âm đuôi /t/ dứt khoát, còn "mood" kết thúc bằng âm /d/ rung nhẹ.'
      }
    ]
  },
  {
    id: 'lv2-lesson-4',
    levelId: 'lv2',
    titleEn: 'US-Style Email & Business Messaging',
    titleVi: 'Viết Email & Nhắn Tin Công Việc Ngắn Gọn Kiểu Mỹ',
    descriptionVi: 'Cách viết email trực diện, đi thẳng vào vấn đề (Bottom Line Up Front), gửi file đính kèm và xác nhận tiến độ.',
    icon: 'Mail',
    durationMinutes: 15,
    tags: ['Email', 'Messaging', 'Công sở'],
    keyTakeaways: [
      'Mở đầu chuyên nghiệp: I hope this email finds you well',
      'Đính kèm file: Please find the attached report for your review',
      'Kêu gọi hành động: Please let me know your thoughts by 5 PM'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Attached" và "Appreciate"',
        description: 'Attached /əˈtætʃt/ đuôi -ed đọc thành /t/ sau /tʃ/. Appreciate /əˈpriː.ʃi.eɪt/ có âm /ʃ/.',
        rule: 'Không đọc attach-chịt.',
        examples: [
          { en: 'attached file', ipa: '/əˈtætʃt faɪl/', vi: 'tệp đính kèm', soundTip: 'Bật /t/ dứt khoát' },
          { en: 'appreciate', ipa: '/əˈpriː.ʃi.eɪt/', vi: 'trân trọng, cảm kích', soundTip: 'Âm /iː/ dài' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-4-1',
        word: 'attached',
        ipa: '/əˈtætʃt/',
        partOfSpeech: 'adj',
        meaningVi: 'được đính kèm (tài liệu)',
        exampleSentence: 'Please review the attached spreadsheet.',
        exampleSentenceVi: 'Xin vui lòng xem qua bảng tính đính kèm.',
        endingSoundNote: 'Cụm đuôi /tʃt/ bật nổ dứt khoát.',
        americanTip: 'Từ luôn có trong các email công việc.'
      },
      {
        id: 'v2-4-2',
        word: 'appreciate',
        ipa: '/əˈpriː.ʃi.eɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'đánh giá cao, cảm kích',
        exampleSentence: 'I really appreciate your timely feedback.',
        exampleSentenceVi: 'Tôi rất cảm kích phản hồi kịp thời của bạn.',
        endingSoundNote: 'Âm giữa là /ʃi/, đuôi /eɪt/.',
        americanTip: 'Dùng thay cho "Thank you very much" trang trọng.'
      },
      {
        id: 'v2-4-3',
        word: 'follow up',
        ipa: '/ˈfɑːl.oʊ ʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'theo dõi, hỏi thăm tiến độ tiếp theo',
        exampleSentence: 'I am writing to follow up on our discussion.',
        exampleSentenceVi: 'Tôi viết email này để theo dõi tiếp cuộc thảo luận của chúng ta.',
        endingSoundNote: 'Nối âm: fal-low-wup.',
        americanTip: 'Thuật ngữ tiêu chuẩn trong giao tiếp kinh doanh.'
      },
      {
        id: 'v2-4-4',
        word: 'deadline',
        ipa: '/ˈded.laɪn/',
        partOfSpeech: 'noun',
        meaningVi: 'hạn chót hoàn thành',
        exampleSentence: 'The final deadline is this Friday.',
        exampleSentenceVi: 'Hạn chót cuối cùng là thứ Sáu tuần này.',
        endingSoundNote: 'Âm /d/ nén hơi trước line.',
        americanTip: 'Trọng âm rơi vào DEAD-.'
      }
    ],
    dialogue: [
      {
        id: 'd2-4-1',
        speaker: 'A',
        speakerName: 'Manager (Mỹ)',
        avatar: '👩‍💼',
        textEn: 'Hi Linh! Just following up on the quarterly budget draft.',
        textVi: 'Chào Linh! Tôi nhắn tin để theo dõi bản thảo ngân sách quý.',
        ipa: '/haɪ Linh! dʒʌst ˈfɑːl.oʊ.ɪŋ ʌp ɑːn ðə ˈkwɔːr.tɚ.li ˈbʌdʒ.ɪt dræft/'
      },
      {
        id: 'd2-4-2',
        speaker: 'B',
        speakerName: 'Linh (Học viên)',
        avatar: '👩‍💻',
        textEn: 'Good morning! I just emailed you the attached document for your review.',
        textVi: 'Chào buổi sáng! Tôi vừa gửi email tài liệu đính kèm để bạn xem qua rồi ạ.',
        ipa: '/ɡʊd ˈmɔːr.nɪŋ! aɪ dʒʌst ˈiː.meɪld juː ðə əˈtætʃt ˈdɑː.kjə.mənt fɔːr jɔːr rɪˈvjuː/'
      },
      {
        id: 'd2-4-3',
        speaker: 'A',
        speakerName: 'Manager (Mỹ)',
        avatar: '👩‍💼',
        textEn: 'Awesome turnaround! I truly appreciate your prompt delivery ahead of the deadline.',
        textVi: 'Tốc độ xử lý tuyệt vời! Tôi rất cảm kích vì bạn hoàn thành sớm trước hạn chót.',
        ipa: '/ˈɑː.səm ˈtɝːn.əˌraʊnd! aɪ ˈtruː.li əˈpriː.ʃi.eɪt jɔːr prɑːmpt dɪˈlɪv.ɚ.i əˈhed ʌv ðə ˈded.laɪn/'
      },
      {
        id: 'd2-4-4',
        speaker: 'B',
        speakerName: 'Linh (Học viên)',
        avatar: '👩‍💻',
        textEn: 'You are very welcome. Let me know if you need any adjustments.',
        textVi: 'Không có chi ạ. Cứ báo tôi nếu cần điều chỉnh thêm nhé.',
        ipa: '/juː ɑːr ˈver.i ˈwel.kəm. let miː noʊ ɪf juː niːd ˈen.i əˈdʒʌst.mənts/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: I am writing to follow up on + [Topic]',
        structure: 'I am writing to follow up on + [Topic / Discussion]',
        explanationVi: 'Mẫu câu mở đầu chuẩn mực khi gửi email nhắc việc hoặc theo dõi dự án.',
        exampleEn: 'I am writing to follow up on our meeting.',
        exampleIpa: '/aɪ æm ˈraɪ.t̬ɪŋ tuː ˈfɑːl.oʊ ʌp ɑːn ˈaʊ.ɚ ˈmiː.t̬ɪŋ/',
        exampleVi: 'Tôi viết thư này để theo dõi nội dung cuộc họp của chúng ta.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Gửi Tài Liệu & Đề Nghị Xem Xét',
      pattern: 'Please find the attached [Tên tài liệu] for your review by [Thời gian].',
      formulaVi: 'Xin vui lòng xem qua [tài liệu] đính kèm trước [giờ].',
      usageVi: 'Mẫu câu viết email hoặc tin nhắn Slack/Teams tiêu chuẩn.',
      examples: [
        { en: 'Please find the attached report for your review by 5 PM.', ipa: '/pliːz faɪnd ðə əˈtætʃt rɪˈpɔːrt fɔːr jɔːr rɪˈvjuː baɪ faɪv piː em/', vi: 'Xin vui lòng xem qua báo cáo đính kèm trước 5 giờ chiều.', fillWord: 'report / 5 PM' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-2-4-1',
        promptVi: 'Nghe và chọn từ chỉ tệp đính kèm:',
        audioWord: 'attached',
        options: [
          { word: 'attached', ipa: '/əˈtætʃt/', meaningVi: 'được đính kèm (đuôi /t/)' },
          { word: 'attacks', ipa: '/əˈtæks/', meaningVi: 'tấn công (đuôi /ks/)' }
        ],
        correctIndex: 0,
        explanationVi: '"Attached" có âm đuôi /tʃt/, khác với "attacks" có âm đuôi /ks/.'
      }
    ]
  },
  {
    id: 'lv2-lesson-5',
    levelId: 'lv2',
    titleEn: 'Project Progress & Handling Deadlines',
    titleVi: 'Báo Cáo Tiến Độ Dự Án & Xử Lý Deadline',
    descriptionVi: 'Cách báo cáo đúng tiến độ (On track), giải thích sự cố nghẽn cổ chai (Bottleneck) và xin gia hạn deadline chuyên nghiệp.',
    icon: 'Clock',
    durationMinutes: 15,
    tags: ['Tiến độ', 'Deadline', 'Dự án'],
    keyTakeaways: [
      'Báo cáo tích cực: Everything is on track for Friday launch',
      'Nêu khó khăn khéo léo: We encountered a minor bottleneck with...',
      'Đề xuất giải pháp thay vì chỉ than vãn'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Bottleneck" và "Prioritize"',
        description: 'Bottleneck /ˈbɑː.t̬əl.nek/ có âm Flap T và âm L tối. Prioritize /praɪˈɔːr.ə.taɪz/ có 4 âm tiết.',
        rule: 'Nhấn trọng âm rõ ràng.',
        examples: [
          { en: 'on track', ipa: '/ɑːn træk/', vi: 'đúng tiến độ', soundTip: 'Bật /k/ dứt khoát' },
          { en: 'bottleneck', ipa: '/ˈbɑː.t̬əl.nek/', vi: 'điểm nghẽn', soundTip: 'Đọc là bah-del-nek' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-5-1',
        word: 'on track',
        ipa: '/ɑːn træk/',
        partOfSpeech: 'idiom / phrase',
        meaningVi: 'đúng tiến độ dự kiến',
        exampleSentence: 'We are on track to finish by Friday.',
        exampleSentenceVi: 'Chúng tôi đang đúng tiến độ để hoàn thành trước thứ Sáu.',
        endingSoundNote: 'Âm /æ/ há to, kết thúc /k/.',
        americanTip: 'Cụm từ được các sếp Tây thích nghe nhất.'
      },
      {
        id: 'v2-5-2',
        word: 'bottleneck',
        ipa: '/ˈbɑː.t̬əl.nek/',
        partOfSpeech: 'noun',
        meaningVi: 'điểm nghẽn cổ chai gây chậm trễ',
        exampleSentence: 'Server approval is our main bottleneck.',
        exampleSentenceVi: 'Phê duyệt máy chủ là điểm nghẽn chính của chúng tôi.',
        endingSoundNote: 'Flap T ở giữa, bật /k/ ở cuối.',
        americanTip: 'Dùng khi giải thích lý do chậm tiến độ.'
      },
      {
        id: 'v2-5-3',
        word: 'prioritize',
        ipa: '/praɪˈɔːr.ə.taɪz/',
        partOfSpeech: 'verb',
        meaningVi: 'ưu tiên, đặt lên hàng đầu',
        exampleSentence: 'We must prioritize client security first.',
        exampleSentenceVi: 'Chúng ta phải ưu tiên bảo mật của khách hàng trước.',
        endingSoundNote: 'Âm cuối /z/ rung nhẹ.',
        americanTip: 'Trọng âm rơi vào -OR-.'
      },
      {
        id: 'v2-5-4',
        word: 'milestone',
        ipa: '/ˈmaɪl.stoʊn/',
        partOfSpeech: 'noun',
        meaningVi: 'cột mốc quan trọng của dự án',
        exampleSentence: 'We reached our first key milestone.',
        exampleSentenceVi: 'Chúng tôi đã đạt được cột mốc quan trọng đầu tiên.',
        endingSoundNote: 'Cụm /st/, âm đuôi /n/.',
        americanTip: 'Trọng âm rơi vào MILE-.'
      }
    ],
    dialogue: [
      {
        id: 'd2-5-1',
        speaker: 'A',
        speakerName: 'Director (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'How is the new product launch shaping up for this quarter?',
        textVi: 'Tiến độ ra mắt sản phẩm mới trong quý này đang thế nào rồi?',
        ipa: '/haʊ ɪz ðə nuː ˈprɑː.dʌkt lɑːntʃ ˈʃeɪ.pɪŋ ʌp fɔːr ðɪs ˈkwɔːr.t̬ɚ/'
      },
      {
        id: 'd2-5-2',
        speaker: 'B',
        speakerName: 'Bình (Học viên)',
        avatar: '👨‍💻',
        textEn: 'We are currently on track to reach our main milestone by next Wednesday.',
        textVi: 'Chúng tôi hiện đang đúng tiến độ để đạt cột mốc chính trước thứ Tư tới.',
        ipa: '/wiː ɑːr ˈkɝː.ənt.li ɑːn træk tuː riːtʃ ˈaʊ.ɚ meɪn ˈmaɪl.stoʊn baɪ nekst ˈwenz.deɪ/'
      },
      {
        id: 'd2-5-3',
        speaker: 'A',
        speakerName: 'Director (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'Are there any potential bottlenecks that could delay the release?',
        textVi: 'Có bất kỳ điểm nghẽn tiềm ẩn nào có thể làm chậm ngày phát hành không?',
        ipa: '/ɑːr ðer ˈen.i poʊˈten.ʃəl ˈbɑː.t̬əl.neks ðæt kʊd dɪˈleɪ ðə rɪˈliːs/'
      },
      {
        id: 'd2-5-4',
        speaker: 'B',
        speakerName: 'Bình (Học viên)',
        avatar: '👨‍💻',
        textEn: 'None at all. We prioritized quality testing to prevent any unexpected issues.',
        textVi: 'Dạ không hề ạ. Chúng tôi đã ưu tiên kiểm thử chất lượng để phòng ngừa mọi sự cố bất ngờ.',
        ipa: '/nʌn æt ɑːl. wiː praɪˈɔːr.ə.taɪzd ˈkwɑː.lə.t̬i ˈtes.tɪŋ tuː prɪˈvent ˈen.i ˌʌn.ɪkˈspek.tɪd ˈɪʃ.uːz/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: We are on track to + V (Báo cáo đúng tiến độ)',
        structure: 'We are on track to + Verb + by [Time]',
        explanationVi: 'Cấu trúc thể hiện sự tự tin và khả năng kiểm soát tiến độ công việc xuất sắc.',
        exampleEn: 'We are on track to launch next week.',
        exampleIpa: '/wiː ɑːr ɑːn træk tuː lɑːntʃ nekst wiːk/',
        exampleVi: 'Chúng tôi đang đúng tiến độ để ra mắt vào tuần tới.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Báo Cáo Tiến Độ Dự Án Chuẩn Xác',
      pattern: 'We are currently on track to [Mục tiêu] by [Hạn chót].',
      formulaVi: 'Chúng tôi hiện đang đúng tiến độ để [hoàn thành] trước [hạn chót].',
      usageVi: 'Dùng khi báo cáo tiến độ trong các buổi họp giao ban.',
      examples: [
        { en: 'We are currently on track to complete the testing by Friday.', ipa: '/wiː ɑːr ˈkɝː.ənt.li ɑːn træk tuː kəmˈpliːt ðə ˈtes.tɪŋ baɪ ˈfraɪ.deɪ/', vi: 'Chúng tôi hiện đang đúng tiến độ để hoàn thành kiểm thử trước thứ Sáu.', fillWord: 'complete the testing / Friday' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-2-5-1',
        promptVi: 'Nghe và chọn cụm từ chỉ đúng tiến độ:',
        audioWord: 'on track',
        options: [
          { word: 'on track', ipa: '/ɑːn træk/', meaningVi: 'đúng tiến độ' },
          { word: 'on time', ipa: '/ɑːn taɪm/', meaningVi: 'đúng giờ' }
        ],
        correctIndex: 0,
        explanationVi: '"On track" mang ý nghĩa bám sát tiến độ toàn bộ quá trình.'
      }
    ]
  },
  {
    id: 'lv2-lesson-6',
    levelId: 'lv2',
    titleEn: 'Presenting Ideas & Polite Disagreement',
    titleVi: 'Thuyết Trình Ý Tưởng & Phản Biện Lịch Sự (Disagree Politely)',
    descriptionVi: 'Cách trình bày ý tưởng thuyết phục, chuyển ý mượt mà và cách bất đồng quan điểm lịch sự mà không gây mất lòng đồng nghiệp.',
    icon: 'Award',
    durationMinutes: 15,
    tags: ['Thuyết trình', 'Phản biện', 'Công sở'],
    keyTakeaways: [
      'Mở đầu ý tưởng: From my perspective, I propose that...',
      'Bất đồng lịch sự: I see your point, however...',
      'Tóm tắt kết luận: In conclusion, this approach allows us to...'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Perspective" và "Proposal"',
        description: 'Perspective /pɚˈspek.tɪv/ có 3 âm tiết, trọng âm rơi vào -SPEC-. Proposal /prəˈpoʊ.zəl/ âm giữa là /z/.',
        rule: 'Ngắt nghỉ dứt khoát trước từ however.',
        examples: [
          { en: 'perspective', ipa: '/pɚˈspek.tɪv/', vi: 'góc nhìn, quan điểm', soundTip: 'Bật /v/ nhẹ' },
          { en: 'however', ipa: '/haʊˈev.ɚ/', vi: 'tuy nhiên', soundTip: 'Hạ giọng nhẹ' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v2-6-1',
        word: 'perspective',
        ipa: '/pɚˈspek.tɪv/',
        partOfSpeech: 'noun',
        meaningVi: 'góc nhìn, quan điểm cá nhân',
        exampleSentence: 'From my perspective, this strategy is safer.',
        exampleSentenceVi: 'Theo quan điểm của tôi, chiến lược này an toàn hơn.',
        endingSoundNote: 'Âm /v/ khép nhẹ ở răng trên môi dưới.',
        americanTip: 'Cụm "from my perspective" rất trang nhã.'
      },
      {
        id: 'v2-6-2',
        word: 'proposal',
        ipa: '/prəˈpoʊ.zəl/',
        partOfSpeech: 'noun',
        meaningVi: 'đề xuất, bản kế hoạch',
        exampleSentence: 'We submitted the final budget proposal.',
        exampleSentenceVi: 'Chúng tôi đã nộp bản đề xuất ngân sách cuối cùng.',
        endingSoundNote: 'Âm giữa là /z/, đuôi /əl/.',
        americanTip: 'Trọng âm rơi vào -PO-.'
      },
      {
        id: 'v2-6-3',
        word: 'however',
        ipa: '/haʊˈev.ɚ/',
        partOfSpeech: 'adv / conjunction',
        meaningVi: 'tuy nhiên, dẫu vậy',
        exampleSentence: 'I see your point, however we need more data.',
        exampleSentenceVi: 'Tôi hiểu ý bạn, tuy nhiên chúng ta cần thêm dữ liệu.',
        endingSoundNote: 'Âm đuôi /ɚ/ cong lưỡi.',
        americanTip: 'Dùng để chuyển ý phản biện lịch sự.'
      },
      {
        id: 'v2-6-4',
        word: 'conclusion',
        ipa: '/kənˈkluː.ʒən/',
        partOfSpeech: 'noun',
        meaningVi: 'kết luận, tổng kết',
        exampleSentence: 'In conclusion, this plan saves both time and cost.',
        exampleSentenceVi: 'Tóm lại, kế hoạch này tiết kiệm cả thời gian lẫn chi phí.',
        endingSoundNote: 'Âm giữa là /ʒ/ rung lưỡi.',
        americanTip: 'Dùng chốt bài thuyết trình.'
      }
    ],
    dialogue: [
      {
        id: 'd2-6-1',
        speaker: 'A',
        speakerName: 'VP of Strategy (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'I suggest we immediately shift our entire budget to social media marketing.',
        textVi: 'Tôi đề xuất chúng ta chuyển ngay toàn bộ ngân sách sang marketing mạng xã hội.',
        ipa: '/aɪ səˈdʒest wiː ɪˈmiː.di.ət.li ʃɪft ˈaʊ.ɚ ɪnˈtaɪr ˈbʌdʒ.ɪt tuː ˈsoʊ.ʃəl ˈmiː.di.ə ˈmɑːr.kɪ.t̬ɪŋ/'
      },
      {
        id: 'd2-6-2',
        speaker: 'B',
        speakerName: 'Thành (Học viên)',
        avatar: '👨‍💼',
        textEn: 'I see your point; however, from my perspective, keeping our search ads maintains steady revenue.',
        textVi: 'Tôi hiểu ý bạn; tuy nhiên theo quan điểm của tôi, việc duy trì quảng cáo tìm kiếm giúp giữ vững nguồn doanh thu ổn định.',
        ipa: '/aɪ siː jɔːr pɔɪnt; haʊˈev.ɚ, frʌm maɪ pɚˈspek.tɪv, ˈkiː.pɪŋ ˈaʊ.ɚ sɜːrtʃ ædz meɪnˈteɪnz ˈsted.i ˈrev.ə.nuː/'
      },
      {
        id: 'd2-6-3',
        speaker: 'A',
        speakerName: 'VP of Strategy (Mỹ)',
        avatar: '👨‍💼',
        textEn: 'That\'s a fair observation. How do you propose we balance both channels?',
        textVi: 'Đó là một nhận định rất xác đáng. Vậy bạn đề xuất cân bằng cả hai kênh như thế nào?',
        ipa: '/ðæts ə fer ˌɑːb.zɚˈveɪ.ʃən. haʊ duː juː prəˈpoʊz wiː ˈbæl.əns boʊθ ˈtʃæn.əlz/'
      },
      {
        id: 'd2-6-4',
        speaker: 'B',
        speakerName: 'Thành (Học viên)',
        avatar: '👨‍💼',
        textEn: 'In conclusion, a 70-30 split proposal gives us aggressive growth with minimal risk.',
        textVi: 'Tóm lại, đề xuất phân bổ 70-30 sẽ mang lại tăng trưởng mạnh mẽ với rủi ro thấp nhất.',
        ipa: '/ɪn kənˈkluː.ʒən, ə ˈsev.ən.t̬i ˈθɝː.t̬i splɪt prəˈpoʊ.zəl ɡɪvz ʌs əˈɡres.ɪv ɡroʊθ wɪð ˈmɪn.ə.məl rɪsk/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: I see your point; however... (Phản biện lịch sự)',
        structure: 'I see your point; however, from my perspective + [Clause]',
        explanationVi: 'Công thức vàng trong đàm phán kinh doanh: ghi nhận ý kiến trước khi đưa ra góc nhìn phản biện.',
        exampleEn: 'I see your point; however, we need to consider costs.',
        exampleIpa: '/aɪ siː jɔːr pɔɪnt; haʊˈev.ɚ, wiː niːd tuː kənˈsɪd.ɚ kɑːsts/',
        exampleVi: 'Tôi hiểu ý bạn; tuy nhiên, chúng ta cần cân nhắc chi phí.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Trình Bày Quan Điểm & Đề Xuất',
      pattern: 'In conclusion, this approach allows us to [Lợi ích] while [Tối ưu rủi ro].',
      formulaVi: 'Tóm lại, hướng tiếp cận này cho phép chúng ta [lợi ích] trong khi [tối ưu rủi ro].',
      usageVi: 'Dùng khi chốt phần kết luận trong các bài thuyết trình trước ban giám đốc.',
      examples: [
        { en: 'In conclusion, this approach allows us to expand quickly while minimizing financial risk.', ipa: '/ɪn kənˈkluː.ʒən, ðɪs əˈproʊtʃ əˈlaʊz ʌs tuː ɪkˈspænd ˈkwɪk.li waɪl ˈmɪn.ə.maɪz.ɪŋ faɪˈnæn.ʃəl rɪsk/', vi: 'Tóm lại, giải pháp này cho phép chúng ta mở rộng nhanh chóng trong khi giảm thiểu rủi ro tài chính.', fillWord: 'expand quickly / minimizing financial risk' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-2-6-1',
        promptVi: 'Nghe và chọn từ chỉ góc nhìn, quan điểm:',
        audioWord: 'perspective',
        options: [
          { word: 'perspective', ipa: '/pɚˈspek.tɪv/', meaningVi: 'góc nhìn, quan điểm' },
          { word: 'prospective', ipa: '/prəˈspek.tɪv/', meaningVi: 'tiềm năng, tương lai' }
        ],
        correctIndex: 0,
        explanationVi: '"Perspective" có âm đầu /pɚ/, còn "prospective" có âm đầu /prə/.'
      }
    ]
  },

  // ================= LEVEL 3 (6 BÀI) =================
  {
    id: 'lv3-lesson-1',
    levelId: 'lv3',
    titleEn: 'International Airport & Customs Navigation',
    titleVi: 'Thủ Tục Sân Bay Quốc Tế, Xuất Nhập Cảnh & Hải Quan',
    descriptionVi: 'Tự tin trả lời câu hỏi của nhân viên hải quan Mỹ, khai báo hành lý, tìm cổng bay (Gate) và xử lý hành lý thất lạc.',
    icon: 'Plane',
    durationMinutes: 15,
    tags: ['Sân bay', 'Hải quan', 'Du lịch tự túc'],
    keyTakeaways: [
      'Trả lời mục đích chuyến đi: I\'m here for vacation / business',
      'Thời gian lưu trú: I will be staying for 10 days',
      'Tìm cổng bay và hành lý ký gửi'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Passport" và "Customs"',
        description: 'Passport /ˈpæs.pɔːrt/ có âm /æ/ rớt hàm, cong lưỡi âm /r/ rồi bật /t/. Customs /ˈkʌs.təmz/ đuôi là /mz/.',
        rule: 'Không đọc customs thành "cát-tơm".',
        examples: [
          { en: 'passport', ipa: '/ˈpæs.pɔːrt/', vi: 'hộ chiếu', soundTip: 'Bật /t/ dứt khoát' },
          { en: 'customs', ipa: '/ˈkʌs.təmz/', vi: 'hải quan', soundTip: 'Rung /z/ đuôi' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-1-1',
        word: 'passport',
        ipa: '/ˈpæs.pɔːrt/',
        partOfSpeech: 'noun',
        meaningVi: 'hộ chiếu',
        exampleSentence: 'Please have your passport and boarding pass ready.',
        exampleSentenceVi: 'Xin vui lòng chuẩn bị sẵn hộ chiếu và thẻ lên máy bay.',
        endingSoundNote: 'Âm /æ/ hạ hàm, kết thúc bằng /rt/.',
        americanTip: 'Vật bất ly thân khi bay quốc tế.'
      },
      {
        id: 'v3-1-2',
        word: 'destination',
        ipa: '/ˌdes.təˈneɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'điểm đến du lịch',
        exampleSentence: 'What is your final destination today?',
        exampleSentenceVi: 'Điểm đến cuối cùng của bạn hôm nay là đâu?',
        endingSoundNote: 'Trọng âm rơi vào -NAY- /neɪ/.',
        americanTip: 'Nhân viên hải quan thường xuyên hỏi câu này.'
      },
      {
        id: 'v3-1-3',
        word: 'declare',
        ipa: '/dɪˈkler/',
        partOfSpeech: 'verb',
        meaningVi: 'khai báo hải quan (tiền tệ, hàng hóa)',
        exampleSentence: 'Do you have anything to declare?',
        exampleSentenceVi: 'Bạn có thứ gì cần khai báo hải quan không?',
        endingSoundNote: 'Âm đuôi /er/ cong lưỡi.',
        americanTip: 'Trả lời: "Nothing to declare" nếu không có hàng đặc biệt.'
      },
      {
        id: 'v3-1-4',
        word: 'luggage',
        ipa: '/ˈlʌɡ.ɪdʒ/',
        partOfSpeech: 'noun',
        meaningVi: 'hành lý (ký gửi hoặc xách tay)',
        exampleSentence: 'Where can I claim my luggage?',
        exampleSentenceVi: 'Tôi có thể nhận lại hành lý ở đâu?',
        endingSoundNote: 'Âm đuôi là /ɪdʒ/ nổ gió.',
        americanTip: 'Người Mỹ dùng "luggage" hoặc "baggage".'
      }
    ],
    dialogue: [
      {
        id: 'd3-1-1',
        speaker: 'A',
        speakerName: 'Officer (Mỹ)',
        avatar: '👮‍♂️',
        textEn: 'Passport please. What is the main purpose of your visit to the United States?',
        textVi: 'Xin cho xem hộ chiếu. Mục đích chính chuyến đi đến Mỹ của bạn là gì?',
        ipa: '/ˈpæs.pɔːrt pliːz. wɑːt ɪz ðə meɪn ˈpɝː.pəs ʌv jɔːr ˈvɪz.ɪt tuː ðə juːˈnaɪ.t̬ɪd steɪts/'
      },
      {
        id: 'd3-1-2',
        speaker: 'B',
        speakerName: 'Khánh (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'I am here on vacation for ten days. I will be visiting Los Angeles and San Francisco.',
        textVi: 'Tôi đến đây để du lịch nghỉ dưỡng trong 10 ngày. Tôi sẽ đi thăm Los Angeles và San Francisco.',
        ipa: '/aɪ æm hɪr ɑːn veɪˈkeɪ.ʃən fɔːr ten deɪz. aɪ wɪl biː ˈvɪz.ɪt.ɪŋ lɔːs ˈæn.dʒə.ləs ænd sæn frænˈsɪs.koʊ/'
      },
      {
        id: 'd3-1-3',
        speaker: 'A',
        speakerName: 'Officer (Mỹ)',
        avatar: '👮‍♂️',
        textEn: 'Do you have any food, fruits, or meat products to declare in your luggage?',
        textVi: 'Bạn có mang theo thức ăn, hoa quả hay thịt hộp nào cần khai báo trong hành lý không?',
        ipa: '/duː juː hæv ˈen.i fuːd, fruːts, ɔːr miːt ˈprɑː.dʌkts tuː dɪˈkler ɪn jɔːr ˈlʌɡ.ɪdʒ/'
      },
      {
        id: 'd3-1-4',
        speaker: 'B',
        speakerName: 'Khánh (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'No officer, I have nothing to declare. Just personal clothing.',
        textVi: 'Dạ không thưa ngài, tôi không có gì cần khai báo. Chỉ có quần áo cá nhân thôi.',
        ipa: '/noʊ ˈɑː.fə.sɚ, aɪ hæv ˈnʌθ.ɪŋ tuː dɪˈkler. dʒʌst ˈpɝː.sən.əl ˈkloʊ.ðɪŋ/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: I am here for [Purpose] for [Duration]',
        structure: 'I am here on / for + [Purpose] for + [Time duration]',
        explanationVi: 'Mẫu câu ngắn gọn chuẩn mực nhất để trả lời nhân viên hải quan sân bay chỉ trong 10 giây.',
        exampleEn: 'I am here on vacation for ten days.',
        exampleIpa: '/aɪ æm hɪr ɑːn veɪˈkeɪ.ʃən fɔːr ten deɪz/',
        exampleVi: 'Tôi đến đây đi du lịch trong 10 ngày.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Trả Lời Hải Quan Sân Bay Quốc Tế',
      pattern: 'I am here for [Mục đích chuyến đi] for [Số ngày / tuần] days.',
      formulaVi: 'Tôi đến đây vì mục đích [du lịch/nghỉ dưỡng] trong [X] ngày.',
      usageVi: 'Câu trả lời chuẩn mực giúp bạn qua cổng hải quan sân bay chỉ trong 30 giây.',
      examples: [
        { en: 'I am here for a vacation for seven days.', ipa: '/aɪ æm hɪr fɔːr ə veɪˈkeɪ.ʃən fɔːr ˈsev.ən deɪz/', vi: 'Tôi đến đây để du lịch nghỉ dưỡng trong 7 ngày.', fillWord: 'a vacation / seven' },
        { en: 'I am here for a business conference for four days.', ipa: '/aɪ æm hɪr fɔːr ə ˈbɪz.nɪs ˈkɑːn.fɚ.əns fɔːr fɔːr deɪz/', vi: 'Tôi đến đây tham dự hội nghị công tác trong 4 ngày.', fillWord: 'a business conference / four' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-3-1-1',
        promptVi: 'Nghe và chọn từ phát âm có âm đuôi /t/ dứt khoát:',
        audioWord: 'passport',
        options: [
          { word: 'passport', ipa: '/ˈpæs.pɔːrt/', meaningVi: 'hộ chiếu' },
          { word: 'password', ipa: '/ˈpæs.wɜːrd/', meaningVi: 'mật khẩu (đuôi /d/)' }
        ],
        correctIndex: 0,
        explanationVi: '"Passport" kết thúc bằng /rt/ bật /t/, còn "password" kết thúc bằng /rd/ rung nhẹ.'
      }
    ]
  },
  {
    id: 'lv3-lesson-2',
    levelId: 'lv3',
    titleEn: 'Hotel Check-in, Amenities & Tour Booking',
    titleVi: 'Check-in Khách Sạn, Yêu Cầu Dịch Vụ & Đặt Tour Du Lịch',
    descriptionVi: 'Cách nhận phòng, hỏi pass Wi-Fi, yêu cầu dọn phòng, xin nâng cấp phòng (Room upgrade) và đặt xe đưa đón.',
    icon: 'Home',
    durationMinutes: 15,
    tags: ['Khách sạn', 'Check-in', 'Du lịch tự túc'],
    keyTakeaways: [
      'Nhận phòng: I have a reservation under the name...',
      'Hỏi tiện ích miễn phí: Is breakfast complimentary?',
      'Xử lý vấn đề phòng: The air conditioner is not working properly'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Reservation" và "Complimentary"',
        description: 'Reservation /ˌrez.ɚˈveɪ.ʃən/ nhấn âm 3. Complimentary /ˌkɑːm.pləˈmen.t̬ɚ.i/ có nghĩa là miễn phí đi kèm.',
        rule: 'Trọng âm rõ ràng.',
        examples: [
          { en: 'reservation', ipa: '/ˌrez.ɚˈveɪ.ʃən/', vi: 'đặt phòng trước', soundTip: 'Âm /z/ ở giữa' },
          { en: 'complimentary', ipa: '/ˌkɑːm.pləˈmen.t̬ɚ.i/', vi: 'miễn phí đi kèm', soundTip: 'Đọc flap T' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-2-1',
        word: 'reservation',
        ipa: '/ˌrez.ɚˈveɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'đặt chỗ, đặt phòng trước',
        exampleSentence: 'I have a reservation for three nights.',
        exampleSentenceVi: 'Tôi có đặt phòng trước cho ba đêm.',
        endingSoundNote: 'Trọng âm rơi vào -VAY- /veɪ/.',
        americanTip: 'Dùng khi check-in khách sạn, nhà hàng.'
      },
      {
        id: 'v3-2-2',
        word: 'complimentary',
        ipa: '/ˌkɑːm.pləˈmen.t̬ɚ.i/',
        partOfSpeech: 'adj',
        meaningVi: 'miễn phí đi kèm dịch vụ',
        exampleSentence: 'Breakfast and Wi-Fi are complimentary.',
        exampleSentenceVi: 'Bữa sáng và Wi-Fi là dịch vụ miễn phí đi kèm.',
        endingSoundNote: 'Flap T ở giữa từ.',
        americanTip: 'Từ sang trọng thay cho chữ "free".'
      },
      {
        id: 'v3-2-3',
        word: 'upgrade',
        ipa: '/ˈʌp.ɡreɪd/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'nâng cấp (hạng phòng, vé máy bay)',
        exampleSentence: 'Could we get a complimentary room upgrade?',
        exampleSentenceVi: 'Chúng tôi có thể được nâng cấp phòng miễn phí không?',
        endingSoundNote: 'Âm đuôi /d/ rung nhẹ.',
        americanTip: 'Bí quyết xin phòng view đẹp khi đi du lịch.'
      },
      {
        id: 'v3-2-4',
        word: 'keycard',
        ipa: '/ˈkiː.kɑːrd/',
        partOfSpeech: 'noun',
        meaningVi: 'thẻ từ mở cửa phòng',
        exampleSentence: 'Here is your electronic keycard.',
        exampleSentenceVi: 'Đây là thẻ từ mở khóa phòng của bạn.',
        endingSoundNote: 'Bật /d/ ở cuối từ card.',
        americanTip: 'Trọng âm rơi vào KEY-.'
      }
    ],
    dialogue: [
      {
        id: 'd3-2-1',
        speaker: 'A',
        speakerName: 'Receptionist (Mỹ)',
        avatar: '👩‍💼',
        textEn: 'Good afternoon! Welcome to Grand Palace Hotel. How may I assist you today?',
        textVi: 'Chào buổi chiều! Chào mừng quý khách đến khách sạn Grand Palace. Tôi có thể hỗ trợ gì ạ?',
        ipa: '/ɡʊd ˌæf.tɚˈnuːn! ˈwel.kəm tuː ɡrænd ˈpæl.əs hoʊˈtel. haʊ meɪ aɪ əˈsɪst juː təˈdeɪ/'
      },
      {
        id: 'd3-2-2',
        speaker: 'B',
        speakerName: 'Hoàng (Học viên)',
        avatar: '👨‍💼',
        textEn: 'Hi! I have a reservation for three nights under the name Hoang Nguyen.',
        textVi: 'Chào bạn! Tôi có đặt phòng trước 3 đêm dưới tên Nguyễn Hoàng.',
        ipa: '/haɪ! aɪ hæv ə ˌrez.ɚˈveɪ.ʃən fɔːr θriː naɪts ˈʌn.dɚ ðə neɪm Hoang Nguyen/'
      },
      {
        id: 'd3-2-3',
        speaker: 'A',
        speakerName: 'Receptionist (Mỹ)',
        avatar: '👩‍💼',
        textEn: 'I found your booking! We upgraded you to an ocean view suite with complimentary breakfast.',
        textVi: 'Tôi tìm thấy phòng của bạn rồi! Chúng tôi đã nâng cấp bạn lên phòng suite hướng biển có bữa sáng miễn phí.',
        ipa: '/aɪ faʊnd jɔːr ˈbʊk.ɪŋ! wiː ˈʌp.ɡreɪ.dɪd juː tuː ən ˈoʊ.ʃən vjuː swiːt wɪð ˌkɑːm.pləˈmen.t̬ɚ.i ˈbrek.fəst/'
      },
      {
        id: 'd3-2-4',
        speaker: 'B',
        speakerName: 'Hoàng (Học viên)',
        avatar: '👨‍💼',
        textEn: 'That is fantastic news! Thank you so much for the wonderful hospitality.',
        textVi: 'Tin tuyệt vời quá! Cảm ơn bạn rất nhiều vì sự hiếu khách chu đáo này.',
        ipa: '/ðæt ɪz fænˈtæs.tɪk nuːz! θæŋk juː soʊ mʌtʃ fɔːr ðə ˈwʌn.dɚ.fəl ˌhɑː.spɪˈtæl.ə.t̬i/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: I have a reservation under the name [Name]',
        structure: 'I have a reservation under the name + [Your Name]',
        explanationVi: 'Mẫu câu chuẩn quốc tế khi check-in tại mọi khách sạn và nhà hàng trên thế giới.',
        exampleEn: 'I have a reservation under the name Hoang Nguyen.',
        exampleIpa: '/aɪ hæv ə ˌrez.ɚˈveɪ.ʃən ˈʌn.dɚ ðə neɪm Hoang Nguyen/',
        exampleVi: 'Tôi có đặt phòng trước dưới tên Nguyễn Hoàng.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Check-in Nhận Phòng Khách Sạn',
      pattern: 'I have a reservation for [Số đêm] nights under the name [Tên].',
      formulaVi: 'Tôi có đặt phòng trước cho [X] đêm dưới tên [Tên].',
      usageVi: 'Dùng khi làm thủ tục nhận phòng ở mọi khách sạn quốc tế.',
      examples: [
        { en: 'I have a reservation for three nights under the name David.', ipa: '/aɪ hæv ə ˌrez.ɚˈveɪ.ʃən fɔːr θriː naɪts ˈʌn.dɚ ðə neɪm ˈdeɪ.vɪd/', vi: 'Tôi có đặt phòng 3 đêm dưới tên David.', fillWord: 'three / David' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-3-2-1',
        promptVi: 'Nghe và chọn từ mang nghĩa đặt phòng trước:',
        audioWord: 'reservation',
        options: [
          { word: 'reservation', ipa: '/ˌrez.ɚˈveɪ.ʃən/', meaningVi: 'đặt phòng trước' },
          { word: 'preservation', ipa: '/ˌprez.ɚˈveɪ.ʃən/', meaningVi: 'bảo tồn, giữ gìn' }
        ],
        correctIndex: 0,
        explanationVi: '"Reservation" có âm đầu /rez/, còn "preservation" có âm đầu /prez/.'
      }
    ]
  },
  {
    id: 'lv3-lesson-3',
    levelId: 'lv3',
    titleEn: 'Travel Emergencies & Pharmacy Assistance',
    titleVi: 'Cứu Nguy Sự Cố Du Lịch, Mua Thuốc Tây & Bệnh Viện',
    descriptionVi: 'Cách trình bày triệu chứng bệnh khi vào hiệu thuốc Tây (Pharmacy), hỏi liều dùng và giải quyết khi bị mất hộ chiếu/đồ đạc.',
    icon: 'AlertCircle',
    durationMinutes: 15,
    tags: ['Hiệu thuốc', 'Sự cố', 'Khẩn cấp'],
    keyTakeaways: [
      'Nêu triệu chứng: I have a headache / fever / sore throat',
      'Hỏi liều lượng: How many times a day should I take this?',
      'Báo mất đồ: I lost my wallet, where is the nearest police station?'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Pharmacy" và "Prescription"',
        description: 'Pharmacy /ˈfɑːr.mə.si/ âm đầu là /f/. Prescription /prɪˈskrɪp.ʃən/ có cụm /skr/.',
        rule: 'Không đọc pharmacy thành "phát-ma-si".',
        examples: [
          { en: 'pharmacy', ipa: '/ˈfɑːr.mə.si/', vi: 'tiệm thuốc tây', soundTip: 'Trọng âm âm 1' },
          { en: 'headache', ipa: '/ˈhed.eɪk/', vi: 'đau đầu', soundTip: 'Bật /k/ đuôi' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-3-1',
        word: 'pharmacy',
        ipa: '/ˈfɑːr.mə.si/',
        partOfSpeech: 'noun',
        meaningVi: 'hiệu thuốc tây',
        exampleSentence: 'Where is the nearest 24-hour pharmacy?',
        exampleSentenceVi: 'Hiệu thuốc mở cửa 24/7 gần nhất ở đâu?',
        endingSoundNote: 'Âm đầu /f/, âm đuôi xì /si/.',
        americanTip: 'Ở Mỹ dùng "pharmacy" hoặc "drugstore".'
      },
      {
        id: 'v3-3-2',
        word: 'prescription',
        ipa: '/prɪˈskrɪp.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'đơn thuốc của bác sĩ',
        exampleSentence: 'Do I need a doctor prescription for this medicine?',
        exampleSentenceVi: 'Tôi có cần đơn của bác sĩ cho loại thuốc này không?',
        endingSoundNote: 'Cụm /skr/, đuôi /ʃən/.',
        americanTip: 'Thuốc không cần đơn gọi là OTC (Over-the-counter).'
      },
      {
        id: 'v3-3-3',
        word: 'painkiller',
        ipa: '/ˈpeɪnˌkɪl.ɚ/',
        partOfSpeech: 'noun',
        meaningVi: 'thuốc giảm đau (Panadol, Tylenol)',
        exampleSentence: 'Can you recommend an effective painkiller?',
        exampleSentenceVi: 'Bạn có thể gợi ý loại thuốc giảm đau hiệu quả không?',
        endingSoundNote: 'Âm đuôi /ɚ/ cong lưỡi.',
        americanTip: 'Tylenol và Advil là 2 loại phổ biến nhất ở Mỹ.'
      },
      {
        id: 'v3-3-4',
        word: 'symptom',
        ipa: '/ˈsɪmp.təm/',
        partOfSpeech: 'noun',
        meaningVi: 'triệu chứng bệnh',
        exampleSentence: 'My main symptoms are fever and a sore throat.',
        exampleSentenceVi: 'Triệu chứng chính của tôi là sốt và đau họng.',
        endingSoundNote: 'Âm /p/ nén hơi trước t.',
        americanTip: 'Trọng âm rơi vào SYMP-.'
      }
    ],
    dialogue: [
      {
        id: 'd3-3-1',
        speaker: 'A',
        speakerName: 'Pharmacist (Mỹ)',
        avatar: '👩‍⚕️',
        textEn: 'Hello! How can I help you today? Are you experiencing any symptoms?',
        textVi: 'Xin chào! Tôi có thể giúp gì cho bạn? Bạn đang có triệu chứng gì không?',
        ipa: '/həˈloʊ! haʊ kæn aɪ help juː təˈdeɪ? ɑːr juː ɪkˈspɪr.i.əns.ɪŋ ˈen.i ˈsɪmp.təmz/'
      },
      {
        id: 'd3-3-2',
        speaker: 'B',
        speakerName: 'Ngân (Học viên)',
        avatar: '👩‍🎓',
        textEn: 'I have a terrible headache and mild fever since yesterday.',
        textVi: 'Tôi bị đau đầu dữ dội và sốt nhẹ từ hôm qua.',
        ipa: '/aɪ hæv ə ˈter.ə.bəl ˈhed.eɪk ænd maɪld ˈfiː.vɚ sɪns ˈjes.tɚ.deɪ/'
      },
      {
        id: 'd3-3-3',
        speaker: 'A',
        speakerName: 'Pharmacist (Mỹ)',
        avatar: '👩‍⚕️',
        textEn: 'I recommend this painkiller. Take one tablet every six hours with water.',
        textVi: 'Tôi khuyên bạn dùng loại thuốc giảm đau này. Uống 1 viên mỗi 6 tiếng cùng với nước nhé.',
        ipa: '/aɪ ˌrek.əˈmend ðɪs ˈpeɪnˌkɪl.ɚ. teɪk wʌn ˈtæb.lət ˈev.ri sɪks ˈaʊ.ɚz wɪð ˈwɑː.t̬ɚ/'
      },
      {
        id: 'd3-3-4',
        speaker: 'B',
        speakerName: 'Ngân (Học viên)',
        avatar: '👩‍🎓',
        textEn: 'Thank you so much! Does it cause any drowsiness?',
        textVi: 'Cảm ơn bạn rất nhiều! Thuốc này có gây buồn ngủ không?',
        ipa: '/θæŋk juː soʊ mʌtʃ! dʌz ɪt kɑːz ˈen.i ˈdraʊ.zi.nəs/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: I have a + [Tên triệu chứng]',
        structure: 'I have a headache / sore throat / fever / stomachache',
        explanationVi: 'Mẫu câu diễn đạt tình trạng sức khỏe khi gặp bác sĩ hoặc dược sĩ.',
        exampleEn: 'I have a terrible headache.',
        exampleIpa: '/aɪ hæv ə ˈter.ə.bəl ˈhed.eɪk/',
        exampleVi: 'Tôi bị đau đầu khủng khiếp.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Trình Bày Triệu Chứng Tại Hiệu Thuốc',
      pattern: 'I have a [Triệu chứng bệnh]. What medicine do you recommend?',
      formulaVi: 'Tôi bị [triệu chứng]. Bạn gợi ý loại thuốc nào phù hợp?',
      usageVi: 'Dùng khi vào hiệu thuốc tây ở nước ngoài.',
      examples: [
        { en: 'I have a mild fever. What medicine do you recommend?', ipa: '/aɪ hæv ə maɪld ˈfiː.vɚ. wɑːt ˈmed.ə.sən duː juː ˌrek.əˈmend/', vi: 'Tôi bị sốt nhẹ. Bạn khuyên nên uống thuốc gì?', fillWord: 'mild fever' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-3-3-1',
        promptVi: 'Nghe và chọn từ chỉ hiệu thuốc tây:',
        audioWord: 'pharmacy',
        options: [
          { word: 'pharmacy', ipa: '/ˈfɑːr.mə.si/', meaningVi: 'tiệm thuốc tây' },
          { word: 'farmer', ipa: '/ˈfɑːr.mɚ/', meaningVi: 'người nông dân' }
        ],
        correctIndex: 0,
        explanationVi: '"Pharmacy" có 3 âm tiết kết thúc bằng /si/.'
      }
    ]
  },
  {
    id: 'lv3-lesson-4',
    levelId: 'lv3',
    titleEn: 'Public Transit & Metro Navigation in Big Cities',
    titleVi: 'Đi Tàu Điện Ngầm (Subway/Metro), Xe Buýt & Mua Vé Tự Động',
    descriptionVi: 'Cách đọc bản đồ tàu điện ngầm New York/Tokyo/London, chuyển tuyến (Transfer), nạp thẻ và hỏi nhân viên nhà ga.',
    icon: 'Compass',
    durationMinutes: 15,
    tags: ['Metro', 'Subway', 'Phương tiện công cộng'],
    keyTakeaways: [
      'Hỏi tuyến tàu: Does this train go directly to Times Square?',
      'Chuyển tuyến: You need to transfer to the Blue Line',
      'Mua vé tự động: Where can I top up my transit card?'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Subway" và "Transfer"',
        description: 'Subway /ˈsʌb.weɪ/ âm đầu là /sʌb/. Transfer /ˈtræns.fɝː/ có âm A rớt hàm /æ/.',
        rule: 'Trọng âm rõ ràng.',
        examples: [
          { en: 'subway station', ipa: '/ˈsʌb.weɪ ˈsteɪ.ʃən/', vi: 'ga tàu điện ngầm', soundTip: 'Âm /s/ giòn' },
          { en: 'transfer', ipa: '/ˈtræns.fɝː/', vi: 'chuyển tuyến', soundTip: 'Âm /æ/ hạ hàm' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-4-1',
        word: 'subway',
        ipa: '/ˈsʌb.weɪ/',
        partOfSpeech: 'noun',
        meaningVi: 'tàu điện ngầm (ở Mỹ)',
        exampleSentence: 'The subway is the fastest way to travel.',
        exampleSentenceVi: 'Tàu điện ngầm là cách di chuyển nhanh nhất.',
        endingSoundNote: 'Âm đầu /sʌb/, đuôi /weɪ/.',
        americanTip: 'Ở Anh gọi là "Underground" hoặc "Tube".'
      },
      {
        id: 'v3-4-2',
        word: 'transfer',
        ipa: '/ˈtræns.fɝː/',
        partOfSpeech: 'verb / noun',
        meaningVi: 'chuyển tuyến (đổi sang tàu khác)',
        exampleSentence: 'You need to transfer at Central Station.',
        exampleSentenceVi: 'Bạn cần chuyển tuyến tại Ga Trung Tâm.',
        endingSoundNote: 'Âm /æ/ rớt hàm, đuôi /fɝː/ cong lưỡi.',
        americanTip: 'Thuật ngữ quan trọng khi đi metro.'
      },
      {
        id: 'v3-4-3',
        word: 'platform',
        ipa: '/ˈplæt.fɔːrm/',
        partOfSpeech: 'noun',
        meaningVi: 'sân ga, ke ga chờ tàu',
        exampleSentence: 'The train to airport departs from platform 3.',
        exampleSentenceVi: 'Chuyến tàu đi sân bay khởi hành từ ke số 3.',
        endingSoundNote: 'Âm /æ/ hạ hàm, kết thúc /rm/.',
        americanTip: 'Luôn kiểm tra số platform trước khi lên tàu.'
      },
      {
        id: 'v3-4-4',
        word: 'fare',
        ipa: '/fer/',
        partOfSpeech: 'noun',
        meaningVi: 'giá vé tàu, xe buýt',
        exampleSentence: 'What is the standard subway fare?',
        exampleSentenceVi: 'Giá vé tàu điện ngầm tiêu chuẩn là bao nhiêu?',
        endingSoundNote: 'Nguyên âm đôi /eə/ rồi cong lưỡi /r/.',
        americanTip: 'Đọc giống từ "fair".'
      }
    ],
    dialogue: [
      {
        id: 'd3-4-1',
        speaker: 'A',
        speakerName: 'Station Agent (Mỹ)',
        avatar: '👨‍✈️',
        textEn: 'Hello! Looking for a train platform? Where are you heading?',
        textVi: 'Xin chào! Bạn đang tìm ke ga tàu à? Bạn đang đi đến đâu?',
        ipa: '/həˈloʊ! ˈlʊk.ɪŋ fɔːr ə treɪn ˈplæt.fɔːrm? wer ɑːr juː ˈhed.ɪŋ/'
      },
      {
        id: 'd3-4-2',
        speaker: 'B',
        speakerName: 'Dũng (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'Hi! Does this subway line go directly to the airport terminal?',
        textVi: 'Chào bạn! Tuyến tàu điện ngầm này có đi thẳng đến nhà ga sân bay không?',
        ipa: '/haɪ! dʌz ðɪs ˈsʌb.weɪ laɪn ɡoʊ daɪˈrekt.li tuː ðə ˈer.pɔːrt ˈtɝː.mən.əl/'
      },
      {
        id: 'd3-4-3',
        speaker: 'A',
        speakerName: 'Station Agent (Mỹ)',
        avatar: '👨‍✈️',
        textEn: 'No, you\'ll need to take this train to 42nd Street and transfer to the Blue Line on Platform 2.',
        textVi: 'Không, bạn cần đi chuyến này đến Phố 42 rồi chuyển sang Tuyến Xanh ở Ke số 2.',
        ipa: '/noʊ, jʊl niːd tuː teɪk ðɪs treɪn tuː ˈfɔːr.t̬i ˈsek.ənd striːt ænd ˈtræns.fɝː tuː ðə bluː laɪn ɑːn ˈplæt.fɔːrm tuː/'
      },
      {
        id: 'd3-4-4',
        speaker: 'B',
        speakerName: 'Dũng (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'Got it! How much is the one-way fare for that transfer?',
        textVi: 'Tôi hiểu rồi! Giá vé một chiều cho lần chuyển tuyến đó là bao nhiêu?',
        ipa: '/ɡɑːt ɪt! haʊ mʌtʃ ɪz ðə wʌn weɪ fer fɔːr ðæt ˈtræns.fɝː/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: Does this [Train/Bus] go directly to [Place]?',
        structure: 'Does this line / train go directly to + [Destination]?',
        explanationVi: 'Mẫu câu nhanh nhất để tránh bị lên nhầm tàu hoặc đi nhầm hướng.',
        exampleEn: 'Does this train go directly to the airport?',
        exampleIpa: '/dʌz ðɪs treɪn ɡoʊ daɪˈrekt.li tuː ðə ˈer.pɔːrt/',
        exampleVi: 'Tàu này có đi thẳng ra sân bay không?'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Hỏi Tuyến Phương Tiện Công Cộng',
      pattern: 'Does this [Phương tiện] go directly to [Địa điểm]?',
      formulaVi: 'Tuyến [tàu/xe] này có đi thẳng đến [địa điểm] không?',
      usageVi: 'Dùng khi đi tàu điện hoặc xe buýt tại các thành phố lớn.',
      examples: [
        { en: 'Does this subway line go directly to Times Square?', ipa: '/dʌz ðɪs ˈsʌb.weɪ laɪn ɡoʊ daɪˈrekt.li tuː taɪmz skwer/', vi: 'Tuyến tàu điện ngầm này có đi thẳng đến Quảng trường Thời Đại không?', fillWord: 'subway line / Times Square' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-3-4-1',
        promptVi: 'Nghe và chọn từ chỉ giá vé:',
        audioWord: 'fare',
        options: [
          { word: 'fare', ipa: '/fer/', meaningVi: 'tiền vé tàu xe' },
          { word: 'fair', ipa: '/fer/', meaningVi: 'hội chợ / công bằng (đồng âm)' }
        ],
        correctIndex: 0,
        explanationVi: '"Fare" và "fair" là cặp từ đồng âm phát âm /fer/.'
      }
    ]
  },
  {
    id: 'lv3-lesson-5',
    levelId: 'lv3',
    titleEn: 'Connected Speech: Gonna, Wanna, Gotta, Lemme',
    titleVi: 'Nói Lướt Như Người Bản Xứ: Gonna, Wanna, Gotta, Lemme',
    descriptionVi: 'Bẻ khóa kỹ thuật nói nuốt âm rút gọn trong đàm thoại hàng ngày của người Mỹ để nói chuyện trôi chảy tự nhiên.',
    icon: 'Zap',
    durationMinutes: 15,
    tags: ['Connected Speech', 'Nói lướt', 'Giọng Mỹ'],
    keyTakeaways: [
      'Going to -> Gonna, Want to -> Wanna, Have got to -> Gotta',
      'Let me -> Lemme, Give me -> Gimme',
      'Quy tắc khi nào nên dùng (Văn nói thân mật)'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Bật Ngữ Điệu Của "Gonna" và "Wanna"',
        description: 'Gonna /ˈɡʌn.ə/ phát âm nhẹ và lướt nhanh, trọng âm dồn vào động từ chính đi phía sau.',
        rule: 'Chỉ dùng trong văn nói, không viết trong email công việc trang trọng.',
        examples: [
          { en: 'I\'m gonna do it', ipa: '/aɪm ˈɡʌn.ə duː ɪt/', vi: 'Tôi sẽ làm điều đó', soundTip: 'Nói lướt 1 hơi' },
          { en: 'wanna grab food', ipa: '/ˈwɑːn.ə ɡræb fuːd/', vi: 'muốn đi ăn chút gì', soundTip: 'Wanna nối grab' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-5-1',
        word: 'gonna',
        ipa: '/ˈɡʌn.ə/',
        partOfSpeech: 'slang / contraction',
        meaningVi: 'sẽ (viết tắt của going to)',
        exampleSentence: 'I\'m gonna call you later.',
        exampleSentenceVi: 'Lát nữa tôi sẽ gọi cho bạn nhé.',
        endingSoundNote: 'Âm /ʌ/ ngắn, kết thúc bằng /ə/.',
        americanTip: 'Từ nói lướt thông dụng nhất ở Mỹ.'
      },
      {
        id: 'v3-5-2',
        word: 'wanna',
        ipa: '/ˈwɑːn.ə/',
        partOfSpeech: 'slang / contraction',
        meaningVi: 'muốn (viết tắt của want to)',
        exampleSentence: 'Do you wanna grab some iced coffee?',
        exampleSentenceVi: 'Bạn có muốn đi uống cafe đá không?',
        endingSoundNote: 'Âm /ɑː/ mở rộng, đuôi /ə/.',
        americanTip: 'Dùng khi rủ rê bạn bè thân mật.'
      },
      {
        id: 'v3-5-3',
        word: 'gotta',
        ipa: '/ˈɡɑː.t̬ə/',
        partOfSpeech: 'slang / contraction',
        meaningVi: 'phải làm gì (viết tắt của have got to)',
        exampleSentence: 'I gotta run now, see ya!',
        exampleSentenceVi: 'Tôi phải đi ngay đây, gặp lại sau nhé!',
        endingSoundNote: 'Flap T ở giữa từ.',
        americanTip: 'Đọc là "gah-da".'
      },
      {
        id: 'v3-5-4',
        word: 'lemme',
        ipa: '/ˈlem.i/',
        partOfSpeech: 'slang / contraction',
        meaningVi: 'để tôi (viết tắt của let me)',
        exampleSentence: 'Lemme check my schedule real quick.',
        exampleSentenceVi: 'Để tôi xem nhanh lịch làm việc của mình nhé.',
        endingSoundNote: 'Âm /m/ kéo dài nhẹ.',
        americanTip: 'Đọc là "leh-mee".'
      }
    ],
    dialogue: [
      {
        id: 'd3-5-1',
        speaker: 'A',
        speakerName: 'Jake (Mỹ)',
        avatar: '👱‍♂️',
        textEn: 'Hey bro! Do you wanna grab some food after work tonight?',
        textVi: 'Ê bạn ơi! Tối nay tan làm có muốn đi ăn chút gì không?',
        ipa: '/heɪ broʊ! duː juː ˈwɑːn.ə ɡræb sʌm fuːd ˈæf.tɚ wɜːrk təˈnaɪt/'
      },
      {
        id: 'd3-5-2',
        speaker: 'B',
        speakerName: 'Bảo (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'I\'d love to! Lemme finish this report first and I\'m gonna meet you at 6.',
        textVi: 'Tôi rất thích! Để tôi làm xong báo cáo này rồi tôi sẽ gặp bạn lúc 6 giờ nhé.',
        ipa: '/aɪd lʌv tuː! ˈlem.i ˈfɪn.ɪʃ ðɪs rɪˈpɔːrt fɜːrst ænd aɪm ˈɡʌn.ə miːt juː æt sɪks/'
      },
      {
        id: 'd3-5-3',
        speaker: 'A',
        speakerName: 'Jake (Mỹ)',
        avatar: '👱‍♂️',
        textEn: 'Sounds like a plan! I gotta run to a quick client meeting right now.',
        textVi: 'Chốt kèo nhé! Tôi phải chạy đi họp nhanh với khách hàng bây giờ đây.',
        ipa: '/saʊndz laɪk ə plæn! aɪ ˈɡɑː.t̬ə rʌn tuː ə kwɪk ˈklaɪ.ənt ˈmiː.t̬ɪŋ raɪt naʊ/'
      },
      {
        id: 'd3-5-4',
        speaker: 'B',
        speakerName: 'Bảo (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'No worries, see ya at the restaurant later!',
        textVi: 'Không sao đâu, lát gặp lại bạn ở nhà hàng nhé!',
        ipa: '/noʊ ˈwɝː.iz, siː jɑː æt ðə ˈres.trɑːnt ˈleɪ.t̬ɚ/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: I\'m gonna + V / Do you wanna + V?',
        structure: 'I\'m gonna + Verb / Do you wanna + Verb?',
        explanationVi: 'Quy tắc nói lướt đàm thoại tự nhiên của người bản xứ Mỹ trong đời sống hàng ngày.',
        exampleEn: 'I\'m gonna call you later.',
        exampleIpa: '/aɪm ˈɡʌn.ə kɑːl juː ˈleɪ.t̬ɚ/',
        exampleVi: 'Lát nữa tôi sẽ gọi cho bạn nhé.'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Giao Tiếp Thân Mật Bằng Connected Speech',
      pattern: 'I\'m gonna [Hành động tương lai] because I wanna [Mong muốn].',
      formulaVi: 'Tôi sẽ [làm gì] bởi vì tôi muốn [làm gì].',
      usageVi: 'Giúp bạn nói tiếng Anh mượt mà như xem phim Hollywood.',
      examples: [
        { en: 'I\'m gonna take a walk because I wanna get fresh air.', ipa: '/aɪm ˈɡʌn.ə teɪk ə wɑːk bɪˈkɑːz aɪ ˈwɑːn.ə ɡet freʃ er/', vi: 'Tôi sẽ đi dạo vì tôi muốn hít thở không khí trong lành.', fillWord: 'take a walk / get fresh air' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-3-5-1',
        promptVi: 'Nghe và chọn cụm từ nói lướt của "going to":',
        audioWord: 'gonna',
        options: [
          { word: 'gonna', ipa: '/ˈɡʌn.ə/', meaningVi: 'sẽ (going to)' },
          { word: 'gunner', ipa: '/ˈɡʌn.ɚ/', meaningVi: 'pháo thủ (đuôi /ɚ/)' }
        ],
        correctIndex: 0,
        explanationVi: '"Gonna" kết thúc bằng âm /ə/ nhẹ, còn "gunner" kết thúc bằng âm /ɚ/ cuộn lưỡi.'
      }
    ]
  },
  {
    id: 'lv3-lesson-6',
    levelId: 'lv3',
    titleEn: 'American Slang & Everyday Idioms',
    titleVi: 'Tiếng Lóng & Thành Ngữ Cửa Miệng Hàng Ngày Của Người Mỹ',
    descriptionVi: 'Hiểu và sử dụng các thành ngữ lóng thông dụng: Piece of cake (Dễ ợt), Hit the sack (Đi ngủ), Under the weather (Mệt trong người), Touch base (Bắt liên lạc).',
    icon: 'Sparkles',
    durationMinutes: 15,
    tags: ['Thành ngữ', 'Slang', 'Bản xứ'],
    keyTakeaways: [
      'Thành ngữ phổ biến: Piece of cake, No biggie, Touch base',
      'Hiểu nghĩa bóng không dịch từng từ theo nghĩa đen',
      'Tự tin giao tiếp và xem phim không cần phụ đề'
    ],
    vietnamesePronunciationTips: [
      {
        title: 'Mẹo Phát Âm "Piece of cake" và "Touch base"',
        description: 'Piece of cake /piːs əv keɪk/ nối âm xì /s/ sang of: pee-səv cake. Touch base /tʌtʃ beɪs/ có âm /tʃ/ và /s/.',
        rule: 'Ngữ điệu tự nhiên, thoải mái.',
        examples: [
          { en: 'piece of cake', ipa: '/piːs əv keɪk/', vi: 'dễ như ăn bánh', soundTip: 'Nối âm mượt mà' },
          { en: 'no biggie', ipa: '/noʊ ˈbɪɡ.i/', vi: 'chuyện nhỏ ấy mà', soundTip: 'Vui vẻ' },
        ]
      }
    ],
    vocabulary: [
      {
        id: 'v3-6-1',
        word: 'piece of cake',
        ipa: '/piːs əv keɪk/',
        partOfSpeech: 'idiom',
        meaningVi: 'dễ như ăn kẹo, cực kỳ dễ dàng',
        exampleSentence: 'That English test was a piece of cake!',
        exampleSentenceVi: 'Bài kiểm tra tiếng Anh đó dễ như ăn kẹo!',
        endingSoundNote: 'Nối âm: pee-səv cake.',
        americanTip: 'Thành ngữ miêu tả độ dễ phổ biến nhất.'
      },
      {
        id: 'v3-6-2',
        word: 'no biggie',
        ipa: '/noʊ ˈbɪɡ.i/',
        partOfSpeech: 'slang / phrase',
        meaningVi: 'không có gì to tát, chuyện nhỏ',
        exampleSentence: 'Thanks for helping! - No biggie!',
        exampleSentenceVi: 'Cảm ơn đã giúp nhé! - Chuyện nhỏ ấy mà!',
        endingSoundNote: 'Âm /ɡ/ giòn tan.',
        americanTip: 'Dùng thay cho "You are welcome" thân thiện.'
      },
      {
        id: 'v3-6-3',
        word: 'touch base',
        ipa: '/tʌtʃ beɪs/',
        partOfSpeech: 'idiom / phrase',
        meaningVi: 'liên lạc ngắn gọn, cập nhật tình hình',
        exampleSentence: 'Let\'s touch base next Monday.',
        exampleSentenceVi: 'Thứ Hai tuần tới chúng ta liên lạc cập nhật nhé.',
        endingSoundNote: 'Âm /tʃ/ nổ gió trong touch, /s/ trong base.',
        americanTip: 'Xuất phát từ môn bóng chày Mỹ.'
      },
      {
        id: 'v3-6-4',
        word: 'hit the sack',
        ipa: '/hɪt ðə sæk/',
        partOfSpeech: 'idiom',
        meaningVi: 'đi ngủ (khi đã quá mệt mỏi)',
        exampleSentence: 'I\'m exhausted, time to hit the sack.',
        exampleSentenceVi: 'Tôi kiệt sức rồi, đến giờ đi ngủ thôi.',
        endingSoundNote: 'Bật /t/ trong hit, /k/ trong sack.',
        americanTip: 'Nghĩa là leo lên giường đi ngủ.'
      }
    ],
    dialogue: [
      {
        id: 'd3-6-1',
        speaker: 'A',
        speakerName: 'Rachel (Mỹ)',
        avatar: '👩‍🦰',
        textEn: 'How did your English level presentation go today?',
        textVi: 'Bài thuyết trình thăng cấp tiếng Anh của bạn hôm nay thế nào rồi?',
        ipa: '/haʊ dɪd jɔːr ˈɪŋ.ɡlɪʃ ˈlev.əl ˌprez.ənˈteɪ.ʃən ɡoʊ təˈdeɪ/'
      },
      {
        id: 'd3-6-2',
        speaker: 'B',
        speakerName: 'Khang (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'It was a piece of cake! The judges loved my American accent.',
        textVi: 'Dễ như ăn kẹo vậy! Ban giám khảo rất thích chất giọng Mỹ của tôi.',
        ipa: '/ɪt wɑːz ə piːs əv keɪk! ðə ˈdʒʌdʒ.ɪz lʌvd maɪ əˈmer.ɪˈkæn ˈæk.sent/'
      },
      {
        id: 'd3-6-3',
        speaker: 'A',
        speakerName: 'Rachel (Mỹ)',
        avatar: '👩‍🦰',
        textEn: 'I knew you could do it! Let\'s touch base this weekend to celebrate.',
        textVi: 'Tôi biết bạn làm được mà! Cuối tuần này hẹn gặp nhau ăn mừng nhé.',
        ipa: '/aɪ nuː juː kʊd duː ɪt! lets tʌtʃ beɪs ðɪs ˈwiːk.end tuː ˈsel.ə.breɪt/'
      },
      {
        id: 'd3-6-4',
        speaker: 'B',
        speakerName: 'Khang (Học viên)',
        avatar: '👨‍🎓',
        textEn: 'Definitely! No biggie at all, coffee is on me this time.',
        textVi: 'Chắc chắn rồi! Chuyện nhỏ ấy mà, lần này để tôi mời cà phê nhé.',
        ipa: '/ˈdef.ən.ət.li! noʊ ˈbɪɡ.i æt ɑːl, ˈkɑː.fi ɪz ɑːn miː ðɪs taɪm/'
      }
    ],
    grammarNotes: [
      {
        titleVi: 'Cấu trúc: It was a piece of cake! (Khen dễ dàng)',
        structure: 'It is / was a piece of cake!',
        explanationVi: 'Thành ngữ cửa miệng thông dụng nhất của người Mỹ để diễn tả một việc cực kỳ dễ dàng và trôi chảy.',
        exampleEn: 'That test was a piece of cake!',
        exampleIpa: '/ðæt test wɑːz ə piːs əv keɪk/',
        exampleVi: 'Bài thi đó dễ ợt ấy mà!'
      }
    ],
    sentencePattern: {
      titleVi: 'Khuôn Mẫu Câu: Thành Ngữ & Tiếng Lóng Thân Mật',
      pattern: 'No biggie! Whenever you want to [Hành động], let\'s touch base.',
      formulaVi: 'Chuyện nhỏ ấy mà! Bất cứ khi nào bạn muốn [làm gì], cứ liên lạc nhé.',
      usageVi: 'Cách giao tiếp thân mật, phóng khoáng đậm chất Mỹ.',
      examples: [
        { en: 'No biggie! Whenever you want to practice English, let\'s touch base.', ipa: '/noʊ ˈbɪɡ.i! wenˈev.ɚ juː wɑːnt tuː ˈpræk.tɪs ˈɪŋ.ɡlɪʃ, lets tʌtʃ beɪs/', vi: 'Chuyện nhỏ! Bất cứ khi nào bạn muốn luyện tiếng Anh, cứ liên lạc nhé.', fillWord: 'practice English' }
      ]
    },
    earTrainingDrills: [
      {
        id: 'drill-3-6-1',
        promptVi: 'Nghe và chọn thành ngữ chỉ sự dễ dàng:',
        audioWord: 'piece of cake',
        options: [
          { word: 'piece of cake', ipa: '/piːs əv keɪk/', meaningVi: 'dễ như ăn kẹo' },
          { word: 'peace of mind', ipa: '/piːs əv maɪnd/', meaningVi: 'bình yên trong tâm trí' }
        ],
        correctIndex: 0,
        explanationVi: '"Piece of cake" kết thúc bằng /keɪk/, còn "peace of mind" kết thúc bằng /maɪnd/.'
      }
    ]
  }
];