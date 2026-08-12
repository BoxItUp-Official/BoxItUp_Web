import type { Locale } from '../homeContent'

/**
 * Copy for the Business Early Access page in every locale.
 *
 * Note the select options: `value` is always the English string so rows in
 * `business_leads` stay comparable no matter which language the store used;
 * only `label` is translated.
 */

export interface Option { value: string; label: string }

export interface BusinessContent {
  metaTitle: string
  metaDescription: string
  badge: string
  title: string
  titleAccent: string
  /** Punctuation after the accent word — kept outside the span so a CJK
   *  full-stop doesn't get rendered in the Latin display face. */
  titleTail: string
  lead: string
  perks: { title: string; text: string }[]
  formTitle: string
  formSub: string
  form: {
    storeName: string
    storeNamePlaceholder: string
    contactName: string
    contactNamePlaceholder: string
    email: string
    phone: string
    category: string
    categoryPlaceholder: string
    city: string
    cityPlaceholder: string
    notes: string
    notesPlaceholder: string
    submit: string
    submitting: string
    note: string
    doneTitle: string
    categories: Option[]
    cities: Option[]
  }
}

const CATEGORY_VALUES = [
  'Bakery', 'Café', 'Restaurant', 'Convenience Store',
  'Supermarket', 'Deli / Butcher', 'Fresh Market / Produce', 'Other',
]
const CITY_VALUES = [
  'Taipei', 'New Taipei', 'Taoyuan', 'Taichung',
  'Tainan', 'Kaohsiung', 'Hsinchu', 'Keelung', 'Other',
]

const CATEGORY_LABELS: Record<Locale, string[]> = {
  en: CATEGORY_VALUES,
  tw: ['烘焙坊', '咖啡廳', '餐廳', '便利商店', '超市', '熟食／肉舖', '生鮮市場', '其他'],
  cn: ['烘焙坊', '咖啡厅', '餐厅', '便利店', '超市', '熟食／肉铺', '生鲜市场', '其他'],
}

const CITY_LABELS: Record<Locale, string[]> = {
  en: CITY_VALUES,
  tw: ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '新竹', '基隆', '其他'],
  cn: ['台北市', '新北市', '桃园市', '台中市', '台南市', '高雄市', '新竹', '基隆', '其他'],
}

function options(values: string[], labels: string[]): Option[] {
  return values.map((value, i) => ({ value, label: labels[i] }))
}

export const BUSINESS_CONTENT: Record<Locale, BusinessContent> = {
  en: {
    metaTitle: 'Business Early Access | Box It Up',
    metaDescription:
      'Register your store for early access to Box It Up — turn surplus food into revenue when we open to partner stores.',
    badge: 'Early access · Partner stores',
    title: 'Bring your store to ',
    titleAccent: 'Box It Up.',
    titleTail: '',
    lead: 'We’re opening to partner stores soon. Register your interest and we’ll reach out as soon as sign-ups go live — with onboarding help to get your first surprise box listed.',
    perks: [
      { title: 'First in line', text: 'Get onboarded before we open publicly, and start listing from day one.' },
      { title: 'Turn surplus into revenue', text: 'Recover value from food you’d otherwise throw away — no upfront cost.' },
      { title: 'Shape the product', text: 'Early partners help decide what we build next for stores like yours.' },
    ],
    formTitle: 'Request early access',
    formSub: 'Takes under a minute. We’ll only use this to contact you about partnering.',
    form: {
      storeName: 'Store name *',
      storeNamePlaceholder: 'e.g. Sunrise Bakery',
      contactName: 'Your name *',
      contactNamePlaceholder: 'Owner or manager',
      email: 'Email *',
      phone: 'Phone',
      category: 'Store type',
      categoryPlaceholder: 'Select a type',
      city: 'City',
      cityPlaceholder: 'Select a city',
      notes: 'Anything else?',
      notesPlaceholder: 'Tell us about your store, or what you’d like to know.',
      submit: 'Request early access',
      submitting: 'Sending…',
      note: 'No commitment — we’ll simply let you know when partner sign-ups open.',
      doneTitle: 'Thanks — you’re on the list.',
      categories: options(CATEGORY_VALUES, CATEGORY_LABELS.en),
      cities: options(CITY_VALUES, CITY_LABELS.en),
    },
  },

  tw: {
    metaTitle: '商家搶先體驗 | Box It Up',
    metaDescription:
      '登記你的店家，搶先加入 Box It Up — 在我們開放合作店家時，把賣不完的商品變成營收。',
    badge: '搶先體驗 · 合作店家',
    title: '讓你的店加入 ',
    titleAccent: 'Box It Up',
    titleTail: '。',
    lead: '我們即將開放合作店家。留下你的聯絡資訊，開放註冊時我們會第一時間通知你，並協助你完成開通、上架第一個驚喜箱。',
    perks: [
      { title: '搶先加入', text: '在正式對外開放前完成開通，第一天就能開始上架。' },
      { title: '把剩餘變成營收', text: '把原本要丟棄的商品價值找回來，且無需預付費用。' },
      { title: '一起形塑產品', text: '早期夥伴的意見，決定我們接下來為店家開發什麼功能。' },
    ],
    formTitle: '申請搶先體驗',
    formSub: '不用一分鐘。我們只會用這些資訊與你聯絡合作事宜。',
    form: {
      storeName: '店名 *',
      storeNamePlaceholder: '例如：晨光麵包坊',
      contactName: '你的姓名 *',
      contactNamePlaceholder: '負責人或店長',
      email: '電子郵件 *',
      phone: '電話',
      category: '店家類型',
      categoryPlaceholder: '請選擇類型',
      city: '城市',
      cityPlaceholder: '請選擇城市',
      notes: '還有其他想告訴我們的嗎？',
      notesPlaceholder: '介紹一下你的店，或告訴我們你想了解什麼。',
      submit: '申請搶先體驗',
      submitting: '送出中…',
      note: '沒有任何約束——開放店家註冊時，我們會通知你。',
      doneTitle: '感謝你——已經收到你的登記。',
      categories: options(CATEGORY_VALUES, CATEGORY_LABELS.tw),
      cities: options(CITY_VALUES, CITY_LABELS.tw),
    },
  },

  cn: {
    metaTitle: '商家抢先体验 | Box It Up',
    metaDescription:
      '登记你的商家，抢先加入 Box It Up — 在我们开放合作商家时，把卖不完的商品变成营收。',
    badge: '抢先体验 · 合作商家',
    title: '让你的店加入 ',
    titleAccent: 'Box It Up',
    titleTail: '。',
    lead: '我们即将开放合作商家。留下你的联系信息，开放注册时我们会第一时间通知你，并协助你完成开通、上架第一个惊喜箱。',
    perks: [
      { title: '抢先加入', text: '在正式对外开放前完成开通，第一天就能开始上架。' },
      { title: '把剩余变成营收', text: '把原本要丢弃的商品价值找回来，且无需预付费用。' },
      { title: '一起塑造产品', text: '早期伙伴的意见，决定我们接下来为商家开发什么功能。' },
    ],
    formTitle: '申请抢先体验',
    formSub: '不用一分钟。我们只会用这些信息与你联系合作事宜。',
    form: {
      storeName: '店名 *',
      storeNamePlaceholder: '例如：晨光面包坊',
      contactName: '你的姓名 *',
      contactNamePlaceholder: '负责人或店长',
      email: '电子邮箱 *',
      phone: '电话',
      category: '商家类型',
      categoryPlaceholder: '请选择类型',
      city: '城市',
      cityPlaceholder: '请选择城市',
      notes: '还有其他想告诉我们的吗？',
      notesPlaceholder: '介绍一下你的店，或告诉我们你想了解什么。',
      submit: '申请抢先体验',
      submitting: '提交中…',
      note: '没有任何约束——开放商家注册时，我们会通知你。',
      doneTitle: '感谢你——已经收到你的登记。',
      categories: options(CATEGORY_VALUES, CATEGORY_LABELS.cn),
      cities: options(CITY_VALUES, CITY_LABELS.cn),
    },
  },
}
