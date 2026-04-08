import { CompatibilityResult, ZodiacSign } from "@/types";

const signs: ZodiacSign[] = [
  {
    slug: "aries", name: { vi: "Bạch Dương", en: "Aries" }, symbol: "♈", dateRange: { vi: "21/03 - 19/04", en: "Mar 21 - Apr 19" },
    element: { vi: "Lửa", en: "Fire" }, modality: { vi: "Tiên phong", en: "Cardinal" }, rulingPlanet: { vi: "Sao Hỏa", en: "Mars" },
    personality: { vi: "Bạn quyết đoán, nhanh và thích mở đường. Năng lượng dẫn dắt khiến bạn luôn nổi bật.", en: "You move first, move fast, and set the tone. Your leadership energy is naturally magnetic." },
    strengths: [{ vi: "Dũng cảm", en: "Bold" }, { vi: "Chủ động", en: "Proactive" }, { vi: "Truyền lửa", en: "Inspiring" }],
    weaknesses: [{ vi: "Nóng vội", en: "Impulsive" }, { vi: "Thiếu kiên nhẫn", en: "Restless" }, { vi: "Dễ quá tải", en: "Burns out fast" }],
    loveStyle: { vi: "Yêu nhanh, rõ ràng, thích cảm giác rung động mạnh.", en: "Loves fast and honestly, craving high-voltage chemistry." },
    friendshipStyle: { vi: "Bạn bè với bạn luôn có cảm giác được thúc đẩy.", en: "Friends feel energized and pushed to level up." },
    career: { vi: "Hợp môi trường startup, sales, leadership, thể thao.", en: "Thrives in startups, sales, leadership, and action-driven fields." },
    luckyVibe: { vi: "Main Character Energy", en: "Main Character Energy" },
    luckyColors: [{ vi: "Đỏ ruby", en: "Ruby red" }, { vi: "Cam neon", en: "Neon orange" }],
    luckyNumbers: [1, 9, 27], signatureQuote: { vi: "Đừng chờ tín hiệu. Bạn là tín hiệu.", en: "Don’t wait for the signal. Be the signal." },
    lifestyleSummary: { vi: "Sống nhanh nhưng vẫn biết chọn đúng trận để bùng nổ.", en: "Fast-paced, but strategic about where to go all in." },
    oneLiner: { vi: "Bạch Dương: nóng nhưng có lý.", en: "Aries: intense with purpose." },
    dailyHoroscope: {
      love: { vi: "Một tin nhắn chân thành sẽ mở khóa cảm xúc đang đóng băng.", en: "A direct text can melt what felt emotionally frozen." },
      career: { vi: "Bạn có cơ hội lead một việc quan trọng, đừng né spotlight.", en: "A leadership moment is here—don’t dodge the spotlight." },
      mood: { vi: "Khí chất tự tin đang lên cao.", en: "Confidence is peaking." },
      energy: { vi: "8/10 - bùng nổ nhưng cần nghỉ ngắn giữa ngày.", en: "8/10 — explosive but pace yourself." },
      vibeTag: { vi: "Đánh nhanh thắng đẹp", en: "Soft Dominate Day" }, luckyColor: { vi: "Đỏ son", en: "Crimson" }, luckyNumber: 18,
      quote: { vi: "Khi bạn chọn bản thân, vũ trụ chọn phe bạn.", en: "When you choose yourself, the universe backs you." }
    },
    quotes: [
      { vi: "Đừng xin phép để tỏa sáng.", en: "Stop asking permission to shine." },
      { vi: "Drama không thắng được kỷ luật của tôi.", en: "Drama can’t outwork my discipline." },
      { vi: "Tôi không đu trend, tôi tạo trend.", en: "I don’t chase trends, I launch them." }
    ]
  },
  {
    slug: "taurus", name: { vi: "Kim Ngưu", en: "Taurus" }, symbol: "♉", dateRange: { vi: "20/04 - 20/05", en: "Apr 20 - May 20" },
    element: { vi: "Đất", en: "Earth" }, modality: { vi: "Kiên định", en: "Fixed" }, rulingPlanet: { vi: "Sao Kim", en: "Venus" },
    personality: { vi: "Bạn thực tế, tinh tế và biết tận hưởng chất lượng sống.", en: "Grounded, sensual, and built for sustainable luxury." },
    strengths: [{ vi: "Ổn định", en: "Steady" }, { vi: "Gu thẩm mỹ", en: "Stylish" }, { vi: "Kiên trì", en: "Persistent" }],
    weaknesses: [{ vi: "Cứng đầu", en: "Stubborn" }, { vi: "Ngại thay đổi", en: "Change-resistant" }, { vi: "Dễ ôm việc", en: "Overcommits" }],
    loveStyle: { vi: "Yêu chậm mà chắc, coi trọng sự an toàn cảm xúc.", en: "Slow-burn love with deep emotional security." },
    friendshipStyle: { vi: "Bạn là người giữ lời và luôn có mặt lúc cần.", en: "Dependable friend who always shows up." },
    career: { vi: "Hợp tài chính, thiết kế, làm đẹp, F&B cao cấp.", en: "Excellent in finance, design, beauty, and premium hospitality." },
    luckyVibe: { vi: "Soft Luxury Mode", en: "Soft Luxury Mode" },
    luckyColors: [{ vi: "Xanh olive", en: "Olive green" }, { vi: "Hồng phấn", en: "Dusty rose" }], luckyNumbers: [2, 6, 24],
    signatureQuote: { vi: "Chậm để chắc. Chắc để đẹp.", en: "Slow to build. Built to last." },
    lifestyleSummary: { vi: "Tối giản nhưng không tầm thường, bạn ưu tiên giá trị thật.", en: "Minimal but never basic—you invest in real value." },
    oneLiner: { vi: "Kim Ngưu: yên bình nhưng đắt giá.", en: "Taurus: calm and expensive." },
    dailyHoroscope: { love: { vi: "Một cuộc trò chuyện nhẹ nhàng giúp hai bạn hiểu nhau hơn.", en: "A soft conversation deepens emotional trust." }, career: { vi: "Hãy hoàn thiện chi tiết cuối, đó là thứ tạo khác biệt.", en: "Polish the final details—they become your edge." }, mood: { vi: "Êm và chắc.", en: "Grounded and calm." }, energy: { vi: "7/10 - ổn định.", en: "7/10 — stable power." }, vibeTag: { vi: "Slow Glow Day", en: "Slow Glow Day" }, luckyColor: { vi: "Be kem", en: "Cream beige" }, luckyNumber: 6, quote: { vi: "Chất lượng là cách tôi tự yêu mình.", en: "Quality is my love language to myself." } },
    quotes: [{ vi: "Không cần ồn ào để đắt giá.", en: "I don’t need loud to be luxurious." }, { vi: "Bình tĩnh là loại quyền lực hiếm.", en: "Calm is a rare kind of power." }, { vi: "Tiêu chuẩn cao vì trái tim tôi xứng đáng.", en: "My standards are high because my heart is precious." }]
  }
];

const baseSigns = [
  ["gemini","Song Tử","Gemini","♊","21/05 - 20/06","May 21 - Jun 20","Khí","Air","Linh hoạt, dí dỏm, thông minh xã hội.","Quick-minded, witty, socially magnetic."],
  ["cancer","Cự Giải","Cancer","♋","21/06 - 22/07","Jun 21 - Jul 22","Nước","Water","Tinh tế cảm xúc, bảo vệ người mình thương.","Emotionally intuitive and deeply protective."],
  ["leo","Sư Tử","Leo","♌","23/07 - 22/08","Jul 23 - Aug 22","Lửa","Fire","Tỏa sáng, hào phóng, có khí chất sân khấu.","Radiant, generous, and naturally iconic."],
  ["virgo","Xử Nữ","Virgo","♍","23/08 - 22/09","Aug 23 - Sep 22","Đất","Earth","Tỉ mỉ, sắc bén, luôn nâng chuẩn.","Precise, discerning, and high-standard."],
  ["libra","Thiên Bình","Libra","♎","23/09 - 22/10","Sep 23 - Oct 22","Khí","Air","Thanh lịch, công bằng, giỏi kết nối.","Elegant, diplomatic, and socially fluent."],
  ["scorpio","Bọ Cạp","Scorpio","♏","23/10 - 21/11","Oct 23 - Nov 21","Nước","Water","Sâu sắc, bí ẩn, trung thành mãnh liệt.","Intense, private, and profoundly loyal."],
  ["sagittarius","Nhân Mã","Sagittarius","♐","22/11 - 21/12","Nov 22 - Dec 21","Lửa","Fire","Tự do, ham học hỏi, truyền cảm hứng.","Free-spirited, curious, and optimistic."],
  ["capricorn","Ma Kết","Capricorn","♑","22/12 - 19/01","Dec 22 - Jan 19","Đất","Earth","Tham vọng, kỷ luật, xây giá trị dài hạn.","Ambitious, disciplined, built for legacy."],
  ["aquarius","Bảo Bình","Aquarius","♒","20/01 - 18/02","Jan 20 - Feb 18","Khí","Air","Khác biệt, sáng tạo, tư duy tương lai.","Original, inventive, future-focused."],
  ["pisces","Song Ngư","Pisces","♓","19/02 - 20/03","Feb 19 - Mar 20","Nước","Water","Mơ mộng, chữa lành, nghệ sĩ bẩm sinh.","Dreamy, healing, and artistically tuned."]
] as const;

for (const [slug, vi, en, symbol, rangeVi, rangeEn, elVi, elEn, pVi, pEn] of baseSigns) {
  signs.push({
    slug, name: { vi, en }, symbol, dateRange: { vi: rangeVi, en: rangeEn }, element: { vi: elVi, en: elEn }, modality: { vi: "Biến đổi", en: "Mutable" }, rulingPlanet: { vi: "Biểu tượng chiếu mệnh", en: "Signature ruler" },
    personality: { vi: pVi, en: pEn }, strengths: [{ vi: "Linh hoạt", en: "Adaptive" }, { vi: "Tinh tế", en: "Perceptive" }, { vi: "Thu hút", en: "Magnetic" }],
    weaknesses: [{ vi: "Dễ overthink", en: "Overthinks" }, { vi: "Nhạy cảm", en: "Sensitive" }, { vi: "Đôi lúc phân tán", en: "Scattered" }],
    loveStyle: { vi: "Yêu bằng sự hiện diện và thấu hiểu.", en: "Loves through emotional presence and understanding." },
    friendshipStyle: { vi: "Bạn bè với bạn luôn có cảm giác được lắng nghe.", en: "Friends feel seen and heard around you." },
    career: { vi: "Phát huy tốt ở môi trường sáng tạo, chiến lược hoặc truyền thông.", en: "Thrives in creative, strategic, and media-driven spaces." },
    luckyVibe: { vi: "Aura Thu Hút", en: "Magnetic Aura" },
    luckyColors: [{ vi: "Tím khói", en: "Smoky violet" }, { vi: "Vàng champagne", en: "Champagne gold" }], luckyNumbers: [3, 7, 22],
    signatureQuote: { vi: "Tôi là nhịp điệu riêng, không phải bản sao.", en: "I’m a rhythm, not a replica." },
    lifestyleSummary: { vi: "Bạn ưu tiên cảm hứng có chiều sâu và nhịp sống có chủ đích.", en: "You choose depth, intention, and aesthetically smart living." },
    oneLiner: { vi: `${vi}: khí chất có story.`, en: `${en}: energy with a storyline.` },
    dailyHoroscope: {
      love: { vi: "Giữ nhịp giao tiếp dịu dàng sẽ tạo cảm giác an toàn.", en: "Gentle communication creates emotional safety." },
      career: { vi: "Một ý tưởng cũ có thể trở thành cú bứt phá mới.", en: "An old idea can become today’s smart breakthrough." },
      mood: { vi: "Nhạy bén và có chiều sâu.", en: "Intuitive and focused." },
      energy: { vi: "7/10 - ổn định, đẹp để hoàn thiện bản thân.", en: "7/10 — steady, perfect for refinement." },
      vibeTag: { vi: "Glow Up Có Chiến Lược", en: "Strategic Glow Up" },
      luckyColor: { vi: "Tím midnight", en: "Midnight violet" }, luckyNumber: 12,
      quote: { vi: "Không cần hoàn hảo, chỉ cần thật với điều mình muốn.", en: "You don’t need perfect. You need honest desire." }
    },
    quotes: [
      { vi: "Tôi chọn bình yên, nhưng vẫn rất khó đoán.", en: "I choose peace, still impossible to predict." },
      { vi: "Sức hút của tôi đến từ sự thật, không phải filter.", en: "My glow comes from truth, not filters." },
      { vi: "Nhẹ nhàng không có nghĩa là dễ bị bỏ qua.", en: "Soft never means forgettable." }
    ]
  });
}

export const zodiacSigns = signs;

export const compatibilityKey = (a: string, b: string) => [a, b].sort().join("-");

const templates: CompatibilityResult[] = [
  { score: 92, romance: 94, friendship: 88, communication: 90, summary: { vi: "Cặp đôi dễ tạo chemistry bùng nổ nhưng vẫn biết nương nhau.", en: "High chemistry with strong mutual support." }, whyWorks: { vi: "Một người truyền lửa, người kia giữ nhịp cân bằng.", en: "One sparks momentum, the other sustains it." }, watchOut: { vi: "Tránh phản ứng nhanh khi chưa hiểu hết cảm xúc đối phương.", en: "Avoid reacting before fully understanding emotions." } },
  { score: 78, romance: 75, friendship: 86, communication: 74, summary: { vi: "Khác biệt tạo sức hút, nhưng cần học cách nói cùng ngôn ngữ.", en: "Differences create attraction, but alignment takes effort." }, whyWorks: { vi: "Cả hai bổ sung góc nhìn giúp nhau trưởng thành.", en: "You push each other toward growth." }, watchOut: { vi: "Đừng dùng im lặng để né mâu thuẫn.", en: "Don’t use silence to avoid conflict." } },
  { score: 85, romance: 83, friendship: 90, communication: 84, summary: { vi: "Độ hợp cao nhờ cùng tôn trọng tự do và cá tính.", en: "Strong match rooted in freedom and mutual respect." }, whyWorks: { vi: "Hai bạn truyền cảm hứng cho nhau liên tục.", en: "You constantly inspire each other." }, watchOut: { vi: "Giữ cam kết nhỏ để tránh hụt hẫng.", en: "Honor small commitments to avoid disappointment." } }
];

export const getCompatibility = (first: string, second: string): CompatibilityResult => {
  const idx = (compatibilityKey(first, second).length + first.length + second.length) % templates.length;
  return templates[idx];
};
