export interface DailySprint {
  id: string;
  dayOfWeek: number; // 0 (CN) -> 6 (Thứ 7)
  title: string;
  subTitle: string;
  icon: string;
  topicTag: string;
  tip: {
    title: string;
    description: string;
    exampleWord: string;
    exampleIpa: string;
  };
  practiceSentences: {
    en: string;
    ipa: string;
    vi: string;
  }[];
  quickReflexQuestion: {
    promptEn: string;
    promptVi: string;
    options: { textEn: string; textVi: string; isCorrect: boolean }[];
  };
}

export const DAILY_SPRINTS: DailySprint[] = [
  {
    id: 'sprint-mon',
    dayOfWeek: 1, // Thứ 2
    title: 'Thứ 2 Khởi Động: Bẻ Khóa Âm Đuôi /s/ & /z/',
    subTitle: 'Nói chuẩn "Nice", "Is", "This" không bị nuốt âm',
    icon: '⚡',
    topicTag: 'Phát âm cơ bản',
    tip: {
      title: 'Mẹo xì gió giòn tan /s/ và rung họng /z/',
      description: 'Khép hờ hai hàm răng, xì luồng gió mạnh cho âm /s/ (nice, face) và rung dây thanh âm cho âm /z/ (is, plays).',
      exampleWord: 'Nice to meet you',
      exampleIpa: '/naɪs tuː miːtʃ juː/',
    },
    practiceSentences: [
      { en: 'Have a nice day!', ipa: '/hæv ə naɪs deɪ/', vi: 'Chúc một ngày tốt lành!' },
      { en: 'This is my favorite coffee.', ipa: '/ðɪs ɪz maɪ ˈfeɪ.vɚ.ɪt ˈkɑː.fi/', vi: 'Đây là loại cà phê yêu thích của tôi.' },
      { en: 'Practice makes perfect.', ipa: '/ˈpræk.tɪs meɪks ˈpɜːr.fɪkt/', vi: 'Luyện tập tạo nên sự hoàn hảo.' },
    ],
    quickReflexQuestion: {
      promptEn: 'Colleague asks: "How is your morning going?"',
      promptVi: 'Đồng nghiệp hỏi: "Buổi sáng của bạn thế nào rồi?"',
      options: [
        { textEn: 'Pretty good, thanks for asking!', textVi: 'Khá tốt, cảm ơn bạn đã hỏi!', isCorrect: true },
        { textEn: 'I am yesterday.', textVi: 'Tôi là hôm qua (Sai ngữ cảnh)', isCorrect: false },
        { textEn: 'Yes, I drink coffee table.', textVi: 'Vâng, tôi uống bàn cà phê (Vô nghĩa)', isCorrect: false },
      ],
    },
  },
  {
    id: 'sprint-tue',
    dayOfWeek: 2, // Thứ 3
    title: 'Thứ 3 Năng Lượng: Tuyệt Chiêu A Rớt Hàm /æ/',
    subTitle: 'Há to miệng cắn burger với "Black", "Cat", "Back"',
    icon: '🍔',
    topicTag: 'Khẩu hình giọng Mỹ',
    tip: {
      title: 'Hạ cằm sâu ít nhất 2cm cho âm /æ/',
      description: 'Há to cả chiều dọc lẫn chiều ngang. Đừng đọc thành âm "e" tiếng Việt kẻo nhầm Bad thành Bed!',
      exampleWord: 'Black bag',
      exampleIpa: '/blæk bæɡ/',
    },
    practiceSentences: [
      { en: 'I have a black bag.', ipa: '/aɪ hæv ə blæk bæɡ/', vi: 'Tôi có một chiếc túi màu đen.' },
      { en: 'That is a fantastic plan.', ipa: '/ðæt ɪz ə fænˈtæs.tɪk plæn/', vi: 'Đó là một kế hoạch tuyệt vời.' },
      { en: 'Can I have that back?', ipa: '/kæn aɪ hæv ðæt bæk/', vi: 'Tôi có thể lấy lại cái đó được không?' },
    ],
    quickReflexQuestion: {
      promptEn: 'Friend asks: "Do you like that black jacket?"',
      promptVi: 'Bạn hỏi: "Bạn có thích chiếc áo khoác đen đó không?"',
      options: [
        { textEn: 'Yeah, it looks awesome on you!', textVi: 'Có chứ, bạn mặc trông rất đỉnh!', isCorrect: true },
        { textEn: 'No, I am sleeping.', textVi: 'Không, tôi đang ngủ.', isCorrect: false },
        { textEn: 'It is a clock.', textVi: 'Nó là cái đồng hồ.', isCorrect: false },
      ],
    },
  },
  {
    id: 'sprint-wed',
    dayOfWeek: 3, // Thứ 4
    title: 'Thứ 4 Bứt Phá: Chiêu Nói Lười Flap T',
    subTitle: 'Biến /t/ thành /d/ nhẹ trong "Water", "Better", "City"',
    icon: '🌊',
    topicTag: 'Bí mật giọng Mỹ',
    tip: {
      title: 'Quẹt nhẹ đầu lưỡi lên vòm miệng trên',
      description: 'Khi âm /t/ đứng giữa 2 nguyên âm, người Mỹ lướt thành /d/ nhẹ: Water -> Wah-der, Better -> Beh-der.',
      exampleWord: 'Cold water',
      exampleIpa: '/koʊld ˈwɑː.t̬ɚ/',
    },
    practiceSentences: [
      { en: 'Could I get some cold water?', ipa: '/kʊd aɪ ɡet sʌm koʊld ˈwɑː.t̬ɚ/', vi: 'Cho tôi xin chút nước lạnh được không?' },
      { en: 'Everything is getting better.', ipa: '/ˈev.ri.θɪŋ ɪz ˈɡet̬.ɪŋ ˈbet̬.ɚ/', vi: 'Mọi thứ đang trở nên tốt hơn.' },
      { en: 'I love living in this city.', ipa: '/aɪ lʌv ˈlɪv.ɪŋ ɪn ðɪs ˈsɪt̬.i/', vi: 'Tôi rất thích sống ở thành phố này.' },
    ],
    quickReflexQuestion: {
      promptEn: 'Waiter asks: "Would you like hot tea or iced water?"',
      promptVi: 'Phục vụ hỏi: "Bạn muốn dùng trà nóng hay nước đá?"',
      options: [
        { textEn: 'Iced water with extra ice, please!', textVi: 'Cho tôi nước đá nhiều đá nhé!', isCorrect: true },
        { textEn: 'I have 5 dollars yesterday.', textVi: 'Tôi có 5 đô hôm qua.', isCorrect: false },
        { textEn: 'No, tea is a car.', textVi: 'Không, trà là cái xe hơi.', isCorrect: false },
      ],
    },
  },
  {
    id: 'sprint-thu',
    dayOfWeek: 4, // Thứ 5
    title: 'Thứ 5 Tự Tin: Thè Lưỡi Cắn Nhẹ /θ/ & /ð/',
    subTitle: 'Trị dứt điểm đọc "Think" thành "Thinh", "This" thành "Đít"',
    icon: '👅',
    topicTag: 'Âm khó trị ngọng',
    tip: {
      title: 'Đưa nhẹ 0.5cm đầu lưỡi ra giữa 2 răng',
      description: 'Thổi luồng hơi gió nhẹ qua đầu lưỡi cho /θ/ (think, thank) và rung cổ cho /ð/ (this, that, together).',
      exampleWord: 'Thank you so much',
      exampleIpa: '/θæŋk juː soʊ mʌtʃ/',
    },
    practiceSentences: [
      { en: 'Thank you for your help!', ipa: '/θæŋk juː fɔːr jɔːr help/', vi: 'Cảm ơn sự giúp đỡ của bạn!' },
      { en: 'I think this is the right way.', ipa: '/aɪ θɪŋk ðɪs ɪz ðə raɪt weɪ/', vi: 'Tôi nghĩ đây là hướng đi đúng.' },
      { en: 'We can work together.', ipa: '/wiː kæn wɜːrk təˈɡeð.ɚ/', vi: 'Chúng ta có thể làm việc cùng nhau.' },
    ],
    quickReflexQuestion: {
      promptEn: 'Partner says: "Thank you so much for the report!"',
      promptVi: 'Đối tác nói: "Cảm ơn bạn rất nhiều vì bản báo cáo!"',
      options: [
        { textEn: 'You are very welcome! Anytime.', textVi: 'Không có chi ạ! Bất cứ khi nào bạn cần.', isCorrect: true },
        { textEn: 'Thank you too to myself.', textVi: 'Cảm ơn chính tôi.', isCorrect: false },
        { textEn: 'I am at the airport.', textVi: 'Tôi đang ở sân bay.', isCorrect: false },
      ],
    },
  },
  {
    id: 'sprint-fri',
    dayOfWeek: 5, // Thứ 6
    title: 'Thứ 6 Chuyên Nghiệp: Small Talk Công Sở',
    subTitle: 'Bắt chuyện cuối tuần tự nhiên với sếp Tây & đồng nghiệp',
    icon: '☕',
    topicTag: 'Giao tiếp đi làm',
    tip: {
      title: 'Hỏi mở về kế hoạch cuối tuần (Weekend Plans)',
      description: 'Dùng mẫu câu "Any plans for the weekend?" thay vì câu hỏi đóng Yes/No.',
      exampleWord: 'Any plans for the weekend?',
      exampleIpa: '/ˈen.i plænz fɔːr ðə ˈwiːk.end/',
    },
    practiceSentences: [
      { en: 'Any exciting plans for the weekend?', ipa: '/ˈen.i ɪkˈsaɪ.t̬ɪŋ plænz fɔːr ðə ˈwiːk.end/', vi: 'Cuối tuần này có kế hoạch gì hào hứng không?' },
      { en: 'I am going to relax at home.', ipa: '/aɪ æm ˈɡoʊ.ɪŋ tuː rɪˈlæks æt hoʊm/', vi: 'Tôi định sẽ nghỉ ngơi ở nhà.' },
      { en: 'Have a wonderful weekend ahead!', ipa: '/hæv ə ˈwʌn.dɚ.fəl ˈwiːk.end əˈhed/', vi: 'Chúc một cuối tuần thật tuyệt vời!' },
    ],
    quickReflexQuestion: {
      promptEn: 'Boss asks: "Are you ready for the weekend?"',
      promptVi: 'Sếp hỏi: "Bạn đã sẵn sàng cho cuối tuần chưa?"',
      options: [
        { textEn: 'Definitely! Can\'t wait to get some rest.', textVi: 'Chắc chắn rồi ạ! Tôi đang rất mong được nghỉ ngơi.', isCorrect: true },
        { textEn: 'I am working on Monday morning.', textVi: 'Tôi đang làm việc sáng thứ hai.', isCorrect: false },
        { textEn: 'No, my name is Nam.', textVi: 'Không, tên tôi là Nam.', isCorrect: false },
      ],
    },
  },
  {
    id: 'sprint-sat',
    dayOfWeek: 6, // Thứ 7
    title: 'Thứ 7 Thư Thái: Order Đồ Uống & Cafe Chuẩn Mỹ',
    subTitle: 'Gọi size ly, chọn sữa hạt, "To-go" mượt mà',
    icon: '🧋',
    topicTag: 'Đời sống thực tế',
    tip: {
      title: 'Cấu trúc gọi đồ chuẩn người Mỹ',
      description: 'Dùng "Can I get a [Size] [Drink] to go?" với ngữ điệu lên giọng nhẹ ở tên món.',
      exampleWord: 'Iced latte with oat milk',
      exampleIpa: '/aɪst ˈlɑː.teɪ wɪð oʊt mɪlk/',
    },
    practiceSentences: [
      { en: 'Can I get a medium iced latte?', ipa: '/kæn aɪ ɡet ə ˈmiː.di.əm aɪst ˈlɑː.teɪ/', vi: 'Cho tôi 1 ly latte đá size vừa nhé?' },
      { en: 'With oat milk and less ice, please.', ipa: '/wɪð oʊt mɪlk ænd les aɪs pliːz/', vi: 'Dùng sữa yến mạch và ít đá giúp tôi.' },
      { en: 'Make that to go, thank you!', ipa: '/meɪk ðæt tuː ɡoʊ, θæŋk juː/', vi: 'Cho tôi mang đi nhé, cảm ơn bạn!' },
    ],
    quickReflexQuestion: {
      promptEn: 'Barista asks: "For here or to go?"',
      promptVi: 'Thu ngân hỏi: "Uống tại quán hay mang đi ạ?"',
      options: [
        { textEn: 'To go, please!', textVi: 'Mang đi giúp tôi nhé!', isCorrect: true },
        { textEn: 'Yes, coffee is hot.', textVi: 'Vâng, cà phê nóng.', isCorrect: false },
        { textEn: 'I am sitting at 5 PM.', textVi: 'Tôi đang ngồi lúc 5 giờ chiều.', isCorrect: false },
      ],
    },
  },
  {
    id: 'sprint-sun',
    dayOfWeek: 0, // Chủ nhật
    title: 'Chủ Nhật Đỉnh Cao: Bẻ Khóa Nối Âm Gonna & Wanna',
    subTitle: 'Nói lướt tự nhiên như người bản xứ trong phim US-UK',
    icon: '🚀',
    topicTag: 'Connected Speech',
    tip: {
      title: 'Nuốt âm rút gọn trong đàm thoại Mỹ',
      description: 'Going to -> Gonna, Want to -> Wanna, Have got to -> Gotta. Giúp câu nói mượt mà không bị ngắt.',
      exampleWord: 'I\'m gonna do it',
      exampleIpa: '/ˈaɪm ˈɡʌn.ə duː ɪt/',
    },
    practiceSentences: [
      { en: 'I\'m gonna take a short walk.', ipa: '/aɪm ˈɡʌn.ə teɪk ə ʃɔːrt wɑːk/', vi: 'Tôi sẽ đi dạo một lát.' },
      { en: 'Do you wanna grab some food?', ipa: '/duː juː ˈwɑːn.ə ɡræb sʌm fuːd/', vi: 'Bạn có muốn đi ăn chút gì không?' },
      { en: 'I gotta run now, see ya!', ipa: '/aɪ ˈɡɑː.t̬ə rʌn naʊ, siː jɑː/', vi: 'Tôi phải đi ngay đây, gặp lại sau nhé!' },
    ],
    quickReflexQuestion: {
      promptEn: 'Friend asks: "Do you wanna join us for dinner tonight?"',
      promptVi: 'Bạn rủ: "Tối nay bạn có muốn đi ăn tối cùng chúng tôi không?"',
      options: [
        { textEn: 'I\'d love to! What time are we meeting?', textVi: 'Tôi rất muốn! Mấy giờ chúng ta gặp nhau?', isCorrect: true },
        { textEn: 'No, I have no shoes yesterday.', textVi: 'Không, hôm qua tôi không có giày.', isCorrect: false },
        { textEn: 'Dinner is a spoon.', textVi: 'Bữa tối là cái thìa.', isCorrect: false },
      ],
    },
  },
];

export function getTodaySprint(): DailySprint {
  const day = new Date().getDay();
  return DAILY_SPRINTS.find(s => s.dayOfWeek === day) || DAILY_SPRINTS[0];
}
