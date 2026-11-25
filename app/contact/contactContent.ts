import type { Locale } from '../homeContent'

/**
 * Copy for the Contact page in every locale.
 *
 * All three locales render components/… ContactPageBody, so the structure
 * cannot drift apart again — only the strings below differ. (Before this,
 * /tw/contact and /cn/contact were separate 176-line pages still using the
 * pre-redesign class names, which no longer had any styles.)
 */

export interface ContactTopic {
  /** Stored in Supabase — language-neutral, never translate. */
  value: string
  label: string
}

export interface ContactContent {
  metaTitle: string
  metaDescription: string
  label: string
  title: string
  titleAccent: string
  titleTail: string
  subtitle: string

  emailTitle: string
  location: string
  linksTitle: string
  linkBusiness: string
  linkCareers: string
  linkFaq: string

  form: {
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    topic: string
    topicPlaceholder: string
    topics: ContactTopic[]
    organization: string
    organizationPlaceholder: string
    message: string
    messagePlaceholder: string
    submit: string
    submitting: string
    successTitle: string
    successBody: string
    errMissing: string
    errEmail: string
    errServer: string
  }
}

/** Option values are slugs so rows in contact_submissions stay comparable. */
const TOPIC_VALUES = ['store', 'builder', 'user', 'feedback']

function topics(labels: string[]): ContactTopic[] {
  return TOPIC_VALUES.map((value, i) => ({ value, label: labels[i] }))
}

export const CONTACT_CONTENT: Record<Locale, ContactContent> = {
  en: {
    metaTitle: 'Box It Up | Contact',
    metaDescription:
      'Contact Box It Up — reach out for store partnerships, support, or general enquiries.',
    label: 'Contact',
    title: 'We’d love to hear from ',
    titleAccent: 'you',
    titleTail: '.',
    subtitle:
      'Questions, feedback, or partnership enquiries — send us a message and we’ll get back to you within a few business days.',

    emailTitle: 'Email us',
    location: 'Taipei, Taiwan',
    linksTitle: 'Quick links',
    linkBusiness: 'Run a store? Request early access →',
    linkCareers: 'Open roles →',
    linkFaq: 'Read the FAQ →',

    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      topic: 'I’m reaching out about',
      topicPlaceholder: 'Select a topic',
      topics: topics([
        'Store partnership',
        'Early collaboration / student role',
        'General inquiry',
        'Product feedback',
      ]),
      organization: 'Organization / School',
      organizationPlaceholder: 'Optional',
      message: 'Message',
      messagePlaceholder: 'Tell us a bit more about your interest, idea, or question.',
      submit: 'Send message',
      submitting: 'Sending…',
      successTitle: 'Message sent!',
      successBody: 'Thanks for reaching out — we’ll be in touch soon.',
      errMissing: 'Please fill in all required fields.',
      errEmail: 'Please enter a valid email address.',
      errServer: 'Something went wrong. Please try again.',
    },
  },

  tw: {
    metaTitle: 'Box It Up | 聯絡我們',
    metaDescription:
      '聯絡 Box It Up —— 店家合作、問題回報，或任何想告訴我們的事。',
    label: '聯絡我們',
    title: '我們很想聽聽',
    titleAccent: '你的想法',
    titleTail: '。',
    subtitle:
      '不論是合作提案、使用回饋，還是單純想問一句——留言給我們，我們會在幾個工作天內回覆。',

    emailTitle: '寫信給我們',
    location: '台北，台灣',
    linksTitle: '快速連結',
    linkBusiness: '經營店家？申請搶先體驗 →',
    linkCareers: '職缺機會 →',
    linkFaq: '看常見問題 →',

    form: {
      name: '姓名',
      namePlaceholder: '你的名字',
      email: '電子郵件',
      emailPlaceholder: 'you@example.com',
      topic: '我想聊的是',
      topicPlaceholder: '請選擇主旨',
      topics: topics([
        '店家合作',
        '早期協作／學生職缺',
        '一般詢問',
        '產品回饋',
      ]),
      organization: '公司／學校',
      organizationPlaceholder: '選填',
      message: '訊息內容',
      messagePlaceholder: '多告訴我們一些你的想法、需求或問題。',
      submit: '送出訊息',
      submitting: '送出中…',
      successTitle: '訊息已送出！',
      successBody: '謝謝你的來信——我們會盡快與你聯絡。',
      errMissing: '請填寫所有必填欄位。',
      errEmail: '請輸入有效的電子郵件地址。',
      errServer: '發生錯誤，請再試一次。',
    },
  },

  cn: {
    metaTitle: 'Box It Up | 联系我们',
    metaDescription:
      '联系 Box It Up —— 商家合作、问题反馈，或任何想告诉我们的事。',
    label: '联系我们',
    title: '我们很想听听',
    titleAccent: '你的想法',
    titleTail: '。',
    subtitle:
      '不论是合作提案、使用反馈，还是单纯想问一句——留言给我们，我们会在几个工作日内回复。',

    emailTitle: '写信给我们',
    location: '台北，台湾',
    linksTitle: '快速链接',
    linkBusiness: '经营商家？申请抢先体验 →',
    linkCareers: '职位机会 →',
    linkFaq: '看常见问题 →',

    form: {
      name: '姓名',
      namePlaceholder: '你的名字',
      email: '电子邮箱',
      emailPlaceholder: 'you@example.com',
      topic: '我想聊的是',
      topicPlaceholder: '请选择主题',
      topics: topics([
        '商家合作',
        '早期协作／学生职位',
        '一般咨询',
        '产品反馈',
      ]),
      organization: '公司／学校',
      organizationPlaceholder: '选填',
      message: '留言内容',
      messagePlaceholder: '多告诉我们一些你的想法、需求或问题。',
      submit: '发送留言',
      submitting: '发送中…',
      successTitle: '留言已发送！',
      successBody: '谢谢你的来信——我们会尽快与你联系。',
      errMissing: '请填写所有必填栏位。',
      errEmail: '请输入有效的电子邮箱地址。',
      errServer: '出了点问题，请再试一次。',
    },
  },
}
