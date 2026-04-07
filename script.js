function int(value) {
  return Math.floor(value);
}

function jdFromDate(dd, mm, yy) {
  const a = int((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + int((153 * m + 2) / 5) + 365 * y + int(y / 4) - int(y / 100) + int(y / 400) - 32045;

  if (jd < 2299161) {
    jd = dd + int((153 * m + 2) / 5) + 365 * y + int(y / 4) - 32083;
  }

  return jd;
}

function getNewMoonDay(k, timeZone) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;

  const jd1 =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3 +
    0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

  const c1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
    0.0021 * Math.sin(2 * dr * M) -
    0.4068 * Math.sin(Mpr * dr) +
    0.0161 * Math.sin(dr * 2 * Mpr) -
    0.0004 * Math.sin(dr * 3 * Mpr) +
    0.0104 * Math.sin(dr * 2 * F) -
    0.0051 * Math.sin(dr * (M + Mpr)) -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M)) -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr)) +
    0.001 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));

  const deltaT = T < -11 ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3 : -0.000278 + 0.000265 * T + 0.000262 * T2;

  const jdNew = jd1 + c1 - deltaT;
  return int(jdNew + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn, timeZone) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  const dl =
    (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M) +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);

  let L = (L0 + dl) * dr;
  L = L - Math.PI * 2 * int(L / (Math.PI * 2));
  return int((L / Math.PI) * 6);
}

function getLunarMonth11(yy, timeZone) {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = int(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  if (getSunLongitude(nm, timeZone) >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11, timeZone) {
  const k = int((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let i = 1;
  let last;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i += 1;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 15);
  return i - 1;
}

function convertSolarToLunar(dd, mm, yy, timeZone = 7) {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = int((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = int((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }

  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

  return { lunarDay, lunarMonth, lunarYear, lunarLeap, dayNumber };
}

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

function canChiYear(year) {
  return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
}

function canChiDay(jd) {
  return `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;
}

const goodHourByDayChi = {
  Tý: ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
  Sửu: ['Dần', 'Mão', 'Tỵ', 'Thân', 'Tuất', 'Hợi'],
  Dần: ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  Mão: ['Tý', 'Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  Thìn: ['Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  Tỵ: ['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi'],
  Ngọ: ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
  Mùi: ['Dần', 'Mão', 'Tỵ', 'Thân', 'Tuất', 'Hợi'],
  Thân: ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  Dậu: ['Tý', 'Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  Tuất: ['Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  Hợi: ['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi'],
};

function formatBranchHours(branch) {
  const ranges = {
    Tý: '23:00-00:59',
    Sửu: '01:00-02:59',
    Dần: '03:00-04:59',
    Mão: '05:00-06:59',
    Thìn: '07:00-08:59',
    Tỵ: '09:00-10:59',
    Ngọ: '11:00-12:59',
    Mùi: '13:00-14:59',
    Thân: '15:00-16:59',
    Dậu: '17:00-18:59',
    Tuất: '19:00-20:59',
    Hợi: '21:00-22:59',
  };
  return `${branch} (${ranges[branch]})`;
}

function getBranchFromYear(year) {
  return CHI[(year + 8) % 12];
}

function compatibilityScore(yearA, yearB) {
  const branchA = getBranchFromYear(yearA);
  const branchB = getBranchFromYear(yearB);

  const tamHopGroups = [
    ['Thân', 'Tý', 'Thìn'],
    ['Dần', 'Ngọ', 'Tuất'],
    ['Hợi', 'Mão', 'Mùi'],
    ['Tỵ', 'Dậu', 'Sửu'],
  ];

  const xungPairs = [
    ['Tý', 'Ngọ'],
    ['Sửu', 'Mùi'],
    ['Dần', 'Thân'],
    ['Mão', 'Dậu'],
    ['Thìn', 'Tuất'],
    ['Tỵ', 'Hợi'],
  ];

  if (branchA === branchB) {
    return { level: 'Khá hợp', detail: `Đồng tuổi chi (${branchA}), dễ đồng điệu nhưng cần tránh bảo thủ.` };
  }

  if (tamHopGroups.some((group) => group.includes(branchA) && group.includes(branchB))) {
    return { level: 'Rất hợp', detail: `${branchA} và ${branchB} thuộc nhóm tam hợp.` };
  }

  if (xungPairs.some((pair) => pair.includes(branchA) && pair.includes(branchB))) {
    return { level: 'Cần cân nhắc', detail: `${branchA} và ${branchB} thuộc cặp xung trực tiếp.` };
  }

  return { level: 'Trung bình', detail: `${branchA} và ${branchB} không xung trực diện, cần xét thêm mệnh/ngũ hành.` };
}

function zodiacFromDate(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const signs = [
    ['Ma Kết', 1, 19],
    ['Bảo Bình', 2, 18],
    ['Song Ngư', 3, 20],
    ['Bạch Dương', 4, 19],
    ['Kim Ngưu', 5, 20],
    ['Song Tử', 6, 20],
    ['Cự Giải', 7, 22],
    ['Sư Tử', 8, 22],
    ['Xử Nữ', 9, 22],
    ['Thiên Bình', 10, 22],
    ['Bọ Cạp', 11, 21],
    ['Nhân Mã', 12, 21],
    ['Ma Kết', 12, 31],
  ];

  for (let i = 0; i < signs.length; i += 1) {
    const [name, month, day] = signs[i];
    if (m < month || (m === month && d <= day)) return name;
  }
  return 'Ma Kết';
}

function dailyAdvice(seed) {
  const tips = [
    'Hôm nay thích hợp hoàn thành việc tồn đọng.',
    'Bạn nên ưu tiên đối thoại nhẹ nhàng trong các mối quan hệ.',
    'Tài chính ổn định, tránh quyết định chi tiêu bốc đồng.',
    'Năng lượng tốt cho việc học tập và phát triển kỹ năng mới.',
    'Nên dành thời gian nghỉ ngơi để giữ cân bằng tinh thần.',
  ];
  return tips[seed % tips.length];
}

const form = document.getElementById('convert-form');
const dateInput = document.getElementById('solar-date');
const timezoneInput = document.getElementById('timezone');
const resultEl = document.getElementById('result');

const compatibilityForm = document.getElementById('compatibility-form');
const yearAInput = document.getElementById('year-a');
const yearBInput = document.getElementById('year-b');
const compatibilityResult = document.getElementById('compatibility-result');

const goodHoursForm = document.getElementById('good-hours-form');
const goodHoursDate = document.getElementById('good-hours-date');
const goodHoursResult = document.getElementById('good-hours-result');

const noteForm = document.getElementById('note-form');
const noteLunarInput = document.getElementById('note-lunar');
const noteTextInput = document.getElementById('note-text');
const noteList = document.getElementById('note-list');

const zodiacForm = document.getElementById('zodiac-form');
const zodiacDate = document.getElementById('zodiac-date');
const zodiacResult = document.getElementById('zodiac-result');

function renderNotes() {
  const notes = JSON.parse(localStorage.getItem('lunarNotes') || '[]');
  if (!notes.length) {
    noteList.innerHTML = 'Chưa có ghi chú nào.';
    return;
  }

  noteList.innerHTML = notes
    .map((n, i) => `<div class="note-item"><span><strong>${n.lunar}</strong>: ${n.text}</span><button data-index="${i}" class="delete-note">Xóa</button></div>`)
    .join('');
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('delete-note')) {
    const notes = JSON.parse(localStorage.getItem('lunarNotes') || '[]');
    notes.splice(Number(target.dataset.index), 1);
    localStorage.setItem('lunarNotes', JSON.stringify(notes));
    renderNotes();
  }
});

const today = new Date();
dateInput.valueAsDate = today;
goodHoursDate.valueAsDate = today;
zodiacDate.valueAsDate = today;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!dateInput.value) return;

  const [yyyy, mm, dd] = dateInput.value.split('-').map(Number);
  const tz = Number(timezoneInput.value);
  const lunar = convertSolarToLunar(dd, mm, yyyy, tz);

  resultEl.innerHTML = `
    <strong>Kết quả:</strong><br />
    Dương lịch: ${dd}/${mm}/${yyyy}<br />
    Âm lịch: <strong>${lunar.lunarDay}/${lunar.lunarMonth}/${lunar.lunarYear}${lunar.lunarLeap ? ' (nhuận)' : ''}</strong><br />
    Năm âm lịch: ${canChiYear(lunar.lunarYear)}<br />
    Ngày Can Chi: ${canChiDay(lunar.dayNumber)}
  `;
});

compatibilityForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const yearA = Number(yearAInput.value);
  const yearB = Number(yearBInput.value);
  if (!yearA || !yearB) return;

  const score = compatibilityScore(yearA, yearB);
  compatibilityResult.innerHTML = `
    Tuổi A: ${yearA} (${canChiYear(yearA)})<br />
    Tuổi B: ${yearB} (${canChiYear(yearB)})<br />
    <strong>Mức độ: ${score.level}</strong><br />
    Gợi ý: ${score.detail}
  `;
});

goodHoursForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!goodHoursDate.value) return;

  const [yyyy, mm, dd] = goodHoursDate.value.split('-').map(Number);
  const jd = jdFromDate(dd, mm, yyyy);
  const dayChi = CHI[(jd + 1) % 12];
  const hours = goodHourByDayChi[dayChi].map(formatBranchHours).join(', ');
  goodHoursResult.innerHTML = `Ngày ${dd}/${mm}/${yyyy} (${dayChi}) có giờ hoàng đạo: <strong>${hours}</strong>`;
});

noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const lunar = noteLunarInput.value.trim();
  const text = noteTextInput.value.trim();
  if (!lunar || !text) return;

  const notes = JSON.parse(localStorage.getItem('lunarNotes') || '[]');
  notes.push({ lunar, text });
  localStorage.setItem('lunarNotes', JSON.stringify(notes));

  noteLunarInput.value = '';
  noteTextInput.value = '';
  renderNotes();
});

zodiacForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!zodiacDate.value) return;

  const date = new Date(zodiacDate.value);
  const sign = zodiacFromDate(date);
  const seed = date.getFullYear() + date.getMonth() * 31 + date.getDate();
  zodiacResult.innerHTML = `<strong>${sign}</strong>: ${dailyAdvice(seed)}`;
});

renderNotes();
form.dispatchEvent(new Event('submit'));
