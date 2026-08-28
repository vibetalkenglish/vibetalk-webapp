import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface PersonaConfig {
  name: string;
  avatar: string;
  role: string;
  personality: string;
  greetingEn: string;
  greetingVi: string;
  systemPrompt: string;
}

const PERSONAS: Record<string, PersonaConfig> = {
  jessica: {
    name: 'Jessica (New York)',
    avatar: '👩‍💼',
    role: 'Gia Sư Thân Thiện & Đời Sống',
    personality: 'Warm, encouraging, enthusiastic New Yorker who loves daily chat, coffee, movies, and hobbies.',
    greetingEn: "Hey there! I'm Jessica from New York! How is your day going so far? Want to chat about your hobbies or grab some coffee?",
    greetingVi: "Chào bạn! Tôi là Jessica đến từ New York! Ngày hôm nay của bạn thế nào rồi? Bạn muốn tán gẫu về sở thích hay cà phê không?",
    systemPrompt: `You are Jessica, a friendly American English tutor from New York. 
Keep your answers conversational, natural (1-3 sentences), warm, and encouraging.
If the user's English has grammar or phrasing mistakes, gently suggest a more natural American way to say it in "correctionTipEn" and "correctionTipVi".
Always end your reply with a friendly open-ended question to keep the conversation flowing.`
  },
  david: {
    name: 'David (California)',
    avatar: '👨‍💼',
    role: 'Chuyên Gia Phỏng Vấn & Công Sở',
    personality: 'Professional, sharp Silicon Valley manager who mentors in job interviews, meetings, and business communication.',
    greetingEn: "Hello! I'm David, senior manager from Silicon Valley. Are you ready to practice for your upcoming job interview or office presentation today?",
    greetingVi: "Xin chào! Tôi là David, quản lý cấp cao từ Thung lũng Silicon. Bạn đã sẵn sàng luyện phỏng vấn xin việc hoặc thuyết trình công sở hôm nay chưa?",
    systemPrompt: `You are David, a Silicon Valley tech director and professional business English coach. 
Keep responses sharp, professional, realistic, and constructive (1-3 sentences).
Provide helpful corporate vocabulary and polite business phrasing tips in "correctionTipEn" and "correctionTipVi".
Ask relevant workplace or interview questions to challenge the student.`
  },
  sam: {
    name: 'Sam (Texas)',
    avatar: '🤠',
    role: 'Bạn Đồng Hành Du Lịch Toàn Cầu',
    personality: 'Adventurous, energetic Texan traveler who loves exploring the world, airplanes, food, and culture.',
    greetingEn: "Howdy partner! I'm Sam from Texas! Where are you planning to travel next? Need help with airport customs or finding good food?",
    greetingVi: "Chào bạn thân mến! Tôi là Sam từ Texas! Điểm đến du lịch tiếp theo của bạn là đâu? Cần tôi giúp thủ tục sân bay hay tìm đồ ăn ngon không?",
    systemPrompt: `You are Sam, an enthusiastic American traveler from Texas. 
Use friendly American casual speech and travel idioms (1-3 sentences).
Help the user practice airport check-in, ordering food, asking for directions, and hotel booking.
Provide natural slang or travel tips in "correctionTipEn" and "correctionTipVi".`
  }
};

export async function POST(req: NextRequest) {
  try {
    const { messages, persona = 'jessica' } = await req.json() as {
      messages: ChatMessage[];
      persona: string;
    };

    const currentPersona = PERSONAS[persona] || PERSONAS.jessica;
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || 'Hello!';

    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    // 1. Try Gemini Flash if key is present
    if (geminiKey) {
      try {
        const promptText = `${currentPersona.systemPrompt}
User message: "${lastUserMessage}"
Respond strictly in valid JSON format:
{
  "replyEn": "Your conversational response in American English",
  "replyVi": "Bản dịch tiếng Việt tự nhiên của câu trả lời trên",
  "correctionTipEn": "Gợi ý cách diễn đạt chuẩn Mỹ hơn (nếu có câu người dùng cần sửa, nếu không để trống)",
  "correctionTipVi": "Giải thích tiếng Việt ngắn gọn về cách dùng từ này (nếu có)"
}`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return NextResponse.json(parsed);
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back...', err);
      }
    }

    // 2. Try OpenAI GPT-4o-mini if key is present
    if (openAiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: `${currentPersona.systemPrompt}. Respond in JSON with keys: replyEn, replyVi, correctionTipEn, correctionTipVi.` },
              ...messages
            ],
            response_format: { type: 'json_object' }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const raw = data?.choices?.[0]?.message?.content;
          if (raw) {
            return NextResponse.json(JSON.parse(raw));
          }
        }
      } catch (err) {
        console.warn('OpenAI API call failed, falling back...', err);
      }
    }

    // 3. Fallback Smart Rule Engine (100% Free & Instant)
    const lower = lastUserMessage.toLowerCase();
    let replyEn = '';
    let replyVi = '';
    let tipEn = '';
    let tipVi = '';

    if (persona === 'david') {
      if (lower.includes('experience') || lower.includes('job') || lower.includes('work')) {
        replyEn = "That sounds like a strong foundation! Could you walk me through a major challenge you solved in your recent project?";
        replyVi = "Nghe có vẻ là một nền tảng vững chắc! Bạn có thể chia sẻ về một thử thách lớn mà bạn đã giải quyết trong dự án gần đây không?";
        tipEn = "Use the STAR method: Situation, Task, Action, Result to structure your answer.";
        tipVi = "Dùng mô hình STAR (Bối cảnh, Nhiệm vụ, Hành động, Kết quả) để câu trả lời thuyết phục nhất.";
      } else if (lower.includes('strength') || lower.includes('good at')) {
        replyEn = "That is a valuable skill in any cross-functional team! How do you handle tight deadlines under pressure?";
        replyVi = "Đó là một kỹ năng rất giá trị trong nhóm làm việc! Bạn xử lý các hạn chót gấp dưới áp lực như thế nào?";
        tipEn = "Say 'I thrive under pressure by prioritizing high-impact tasks' for a natural corporate tone.";
        tipVi = "Dùng cụm 'thrive under pressure' để thể hiện khả năng làm việc tốt dưới áp lực.";
      } else {
        replyEn = `Thank you for sharing that. In a business setting, clarity is key. What is your primary career goal for the next two years?`;
        replyVi = `Cảm ơn bạn đã chia sẻ. Trong môi trường công sở, sự rõ ràng là then chốt. Mục tiêu nghề nghiệp chính của bạn trong 2 năm tới là gì?`;
      }
    } else if (persona === 'sam') {
      if (lower.includes('airport') || lower.includes('flight') || lower.includes('travel')) {
        replyEn = "Awesome! Always make sure to have your passport and boarding pass ready at the gate. What destination are you most excited to visit?";
        replyVi = "Tuyệt vời! Hãy luôn chuẩn bị sẵn hộ chiếu và thẻ lên máy bay ở cổng nhé. Điểm đến nào làm bạn hào hứng muốn ghé thăm nhất?";
        tipEn = "Say 'I'm catching a flight' instead of 'I go by plane' to sound like a native.";
        tipVi = "Người bản xứ thường dùng 'catch a flight' thay vì nói 'go by plane'.";
      } else if (lower.includes('hotel') || lower.includes('room')) {
        replyEn = "Pro tip: ask the front desk if they have any complimentary room upgrades! Do you prefer staying near the city center or by the beach?";
        replyVi = "Mẹo hay: hãy hỏi quầy lễ tân xem có phòng nâng cấp miễn phí không nhé! Bạn thích ở gần trung tâm hay gần bãi biển hơn?";
        tipEn = "Use 'complimentary' instead of 'free' when speaking to hotel staff.";
        tipVi = "Dùng từ 'complimentary' thay vì 'free' nghe sang trọng và chuyên nghiệp hơn.";
      } else {
        replyEn = `That sounds like a great trip idea! Traveling independently gives you so much freedom. What local food do you wanna try first?`;
        replyVi = `Nghe như một ý tưởng du lịch tuyệt vời! Đi du lịch tự túc mang lại rất nhiều sự tự do. Món ăn địa phương nào bạn muốn thử trước tiên?`;
        tipEn = "Use 'wanna' and 'gonna' in casual travel conversation.";
        tipVi = "Dùng 'wanna' và 'gonna' khi trò chuyện du lịch thân mật.";
      }
    } else {
      // Jessica (Default)
      if (lower.includes('coffee') || lower.includes('drink') || lower.includes('starbucks')) {
        replyEn = "I love coffee! In New York, my go-to order is an iced oat milk latte. What is your favorite drink when you relax?";
        replyVi = "Tôi mê cà phê lắm! Ở New York, món ruột của tôi là latte sữa yến mạch đá. Đồ uống yêu thích của bạn khi thư giãn là gì?";
        tipEn = "Say 'My go-to drink is...' to describe your favorite item naturally.";
        tipVi = "Dùng cụm 'My go-to...' để chỉ món ruột, đồ uống quen thuộc nhất của bạn.";
      } else if (lower.includes('weekend') || lower.includes('movie') || lower.includes('music')) {
        replyEn = "That sounds so relaxing! I usually go for a walk in Central Park on weekends. Any exciting plans coming up for you?";
        replyVi = "Nghe thật thư thái! Tôi thường đi dạo ở Central Park vào cuối tuần. Bạn có kế hoạch thú vị nào sắp tới không?";
        tipEn = "Say 'Any plans coming up?' instead of 'Do you have plans in future?'.";
        tipVi = "Dùng 'Any plans coming up?' để hỏi kế hoạch sắp tới ngắn gọn và tự nhiên.";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('how are you')) {
        replyEn = "Hey! I'm doing wonderful today. It's so great to practice English with you! Tell me, what is something fun you did recently?";
        replyVi = "Chào bạn! Hôm nay tôi cảm thấy rất tuyệt. Thật vui được luyện tiếng Anh cùng bạn! Kể tôi nghe, dạo này bạn có làm điều gì vui không?";
        tipEn = "Respond with 'Doing great, thanks!' or 'Pretty good!' for natural greetings.";
        tipVi = "Đáp lại bằng 'Doing great!' hoặc 'Pretty good!' thay cho câu học vẹt 'I am fine thank you'.";
      } else {
        replyEn = `I hear you! That's really interesting. Practicing every day like this will make your American accent super fluent. What would you like to talk about next?`;
        replyVi = `Tôi hiểu ý bạn rồi! Thú vị thật đấy. Luyện tập mỗi ngày thế này sẽ giúp giọng Mỹ của bạn siêu trôi chảy. Tiếp theo bạn muốn nói về chủ đề gì?`;
      }
    }

    return NextResponse.json({
      replyEn,
      replyVi,
      correctionTipEn: tipEn,
      correctionTipVi: tipVi
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      {
        replyEn: "That's wonderful! Keep practicing speaking out loud every day. What other topics would you like to explore?",
        replyVi: "Thật tuyệt vời! Hãy tiếp tục luyện nói to mỗi ngày nhé. Bạn muốn khám phá thêm chủ đề nào khác?",
        correctionTipEn: "",
        correctionTipVi: ""
      },
      { status: 200 }
    );
  }
}
