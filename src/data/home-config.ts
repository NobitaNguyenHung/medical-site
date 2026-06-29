/**
 * Home dashboard config — all non-book content.
 * Edit here to change nav, tools, stats, greeting without touching components.
 */

const base = '/medical-site';

// ── Sidebar navigation ─────────────────────────────────────────────────────────
export interface NavItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export const sidebarNav: NavItem[] = [
  { icon: 'ti-layout-dashboard', label: 'Tổng quan',       href: `${base}/`,               active: true },
  { icon: 'ti-books',            label: 'Môn học',          href: '#' },
  { icon: 'ti-tools',            label: 'Công cụ học tập',  href: '#' },
  { icon: 'ti-route',            label: 'Lộ trình',         href: `${base}/learning-paths/` },
  { icon: 'ti-bookmark',         label: 'Bộ sưu tập',       href: '#' },
  { icon: 'ti-calendar',         label: 'Lịch học',         href: '#' },
  { icon: 'ti-notes',            label: 'Ghi chú',          href: '#' },
  { icon: 'ti-chart-bar',        label: 'Thống kê',         href: '#' },
  { icon: 'ti-settings',         label: 'Cài đặt',          href: '#' },
];

// ── Wide utility card (Lộ trình) ───────────────────────────────────────────────
export interface WideUtil {
  icon: string;
  iconBg: string;
  iconColor: string;
  cardBg: string;
  name: string;
  desc: string;
  cta: string;
  ctaColor: string;
  ctaBorder: string;
  href: string;
}

export const utilityWide: WideUtil = {
  icon: 'ti-route',
  iconBg: '#F5DDB3',
  iconColor: '#854F0B',
  cardBg: '#FAEEDA',
  name: 'Lộ trình học',
  desc: 'Có hướng dẫn từng bước',
  cta: 'Tiếp tục lộ trình',
  ctaColor: '#854F0B',
  ctaBorder: '#BA7517',
  href: `${base}/learning-paths/`,
};

// ── Small utility cards ────────────────────────────────────────────────────────
export interface SmallUtil {
  icon: string;
  iconBg: string;
  iconColor: string;
  name: string;
  desc: string;
  stat: string;
  progress: number;
  progressColor: string;
  href: string;
}

export const utilitiesSmall: SmallUtil[] = [
  {
    icon: 'ti-clipboard-list',
    iconBg: '#FAECE7',
    iconColor: '#993C1D',
    name: 'Ca lâm sàng',
    desc: 'Học từng bước',
    stat: '1 ca đang học',
    progress: 15,
    progressColor: '#E24B4A',
    href: `${base}/cases/demo-on-benh-tutorial/`,
  },
  {
    icon: 'ti-checklist',
    iconBg: '#E6F1FB',
    iconColor: '#185FA5',
    name: 'Lượng giá',
    desc: 'MCQ · Flashcard',
    stat: '7 bài kiểm',
    progress: 30,
    progressColor: '#378ADD',
    href: `${base}/books/on-benh-dai-cuong/luong-gia/01-onbenh-thayhung/`,
  },
  {
    icon: 'ti-search',
    iconBg: '#F1EFE8',
    iconColor: '#5F5E5A',
    name: 'Tra cứu nhanh',
    desc: 'Bảng · Thuật ngữ',
    stat: '20+ tóm tắt',
    progress: 60,
    progressColor: '#1D9E75',
    href: `${base}/books/on-benh-dai-cuong/tom-tat/01-bai-1-dai-cuong-ve-on-benh/`,
  },
];

// ── Daily study budget ────────────────────────────────────────────────────────
export interface StudyBudgetMetric {
  icon: string;
  label: string;
  value: string;
  tone: 'warm' | 'blue' | 'green';
}

export interface StudyBudget {
  title: string;
  subtitle: string;
  recommendation: 'nhẹ' | 'vừa' | 'nghỉ';
  metrics: StudyBudgetMetric[];
}

export const studyBudget: StudyBudget = {
  title: 'Ngân sách học hôm nay',
  subtitle: 'Cân bằng nhịp học ngắn hạn và sức bền trong tuần.',
  recommendation: 'nhẹ',
  metrics: [
    { icon: 'ti-clock-hour-5', label: '5h', value: 'x%', tone: 'warm' },
    { icon: 'ti-calendar-week', label: 'Weekly', value: 'y%', tone: 'blue' },
    { icon: 'ti-battery-3', label: 'Budget hôm nay', value: 'z%', tone: 'green' },
  ],
};

// ── Bottom stats bar ───────────────────────────────────────────────────────────
export interface SiteStat {
  icon: string;
  value: string;
  label: string;
}

export const siteStats: SiteStat[] = [
  { icon: 'ti-books',         value: '3',   label: 'Môn học' },
  { icon: 'ti-school',        value: '22',  label: 'Bài giảng' },
  { icon: 'ti-file-text',     value: '90+', label: 'Trang nội dung' },
  { icon: 'ti-flame',         value: '0',   label: 'Ngày liên tiếp' },
];

// ── User profile ───────────────────────────────────────────────────────────────
export const userProfile = {
  name: 'Hưng',
  greeting: 'Chào mừng trở lại',
  subtext: 'Hành trình học tập hôm nay của bạn như thế nào?',
  avatarInitial: 'H',
};
