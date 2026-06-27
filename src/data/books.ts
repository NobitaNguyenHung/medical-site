/**
 * Single source of truth for homepage dashboard book cards.
 * Add a new entry here when adding a new book/subject.
 */

export interface BookStat { value: number; label: string }

export interface BookEntry {
  num: string;
  system: string;
  icon: string;
  color: { bg: string; accent: string; text: string };
  name: string;
  desc: string;
  /** Progress 0–100 shown as progress bar */
  progress: number;
  /** Stats shown at bottom of card (max 3) */
  stats: BookStat[];
  /** Illustration type for card background */
  illustration: 'bamboo' | 'brain' | 'anatomy' | 'herb' | 'none';
  href: string;
  status: 'ready' | 'building' | 'planned';
}

const base = '/medical-site';

export const books: BookEntry[] = [
  {
    num: '01',
    system: 'YHCT',
    icon: 'ti-plant-2',
    color: { bg: '#E1F5EE', accent: '#1D9E75', text: '#0F6E56' },
    name: 'Ôn bệnh đại cương',
    desc: 'Vệ Khí Dinh Huyết · biện thiệt · ban chẩn · phong ôn · xuân ôn',
    progress: 75,
    stats: [
      { value: 13, label: 'Bài giảng' },
      { value: 7, label: 'Quiz' },
      { value: 20, label: 'Tóm tắt' },
    ],
    illustration: 'bamboo',
    href: `${base}/books/on-benh-dai-cuong/luong-gia/02-dai-cuong/`,
    status: 'ready',
  },
  {
    num: '02',
    system: 'YHHĐ',
    icon: 'ti-stethoscope',
    color: { bg: '#EEEDFE', accent: '#7F77DD', text: '#534AB7' },
    name: 'Triệu chứng học nội khoa',
    desc: 'Tiếp cận triệu chứng · chẩn đoán phân biệt · tư duy bệnh lý',
    progress: 60,
    stats: [
      { value: 24, label: 'Tóm tắt' },
      { value: 15, label: 'Lượng giá' },
    ],
    illustration: 'brain',
    href: `${base}/books/trieu_chung_hoc_noi_khoa_pnt/tom-tat/`,
    status: 'building',
  },
  // ── Thêm sách mới vào đây ──────────────────────────────────────────────────
  // {
  //   num: '03',
  //   system: 'YHHĐ',
  //   icon: 'ti-heart-rate-monitor',
  //   color: { bg: '#E6F1FB', accent: '#378ADD', text: '#185FA5' },
  //   name: 'Tim mạch học',
  //   desc: 'Điện tim · suy tim · van tim · rối loạn nhịp',
  //   progress: 0,
  //   stats: [],
  //   illustration: 'anatomy',
  //   href: `${base}/books/tim-mach/`,
  //   status: 'planned',
  // },
];
