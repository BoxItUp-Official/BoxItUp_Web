/**
 * Homepage copy for every locale.
 *
 * All three language homepages render the same components from this file, so
 * the structure can never drift between them again — only the words change.
 */

export type Locale = 'en' | 'tw' | 'cn'

export interface Reason { title: string; text: string }
export interface Step { title: string; desc: string }
export interface Qa { q: string; a: string }

export interface HomeContent {
  hero: {
    badge: string
    headline: string
    headlineAccent: string
    headlineTail: string
    subtext: string
    ctaPrimary: string
    ctaSecondary: string
    photoAlt: string
    chipBox: string
    chipMeta: string
    chipNear: string
  }
  trust: { label: string; hint: string; items: string[] }
  about: {
    label: string
    title: string
    titleAccent: string
    titleTail: string
    lead: string
    text: string
    quote: string
    quoteBy: string
    cta: string
  }
  why: {
    label: string
    title: string
    tabCustomer: string
    tabMerchant: string
    customer: Reason[]
    merchant: Reason[]
    ctaCustomer: string
    ctaMerchant: string
  }
  how: {
    label: string
    title: string
    toggleCustomer: string
    toggleMerchant: string
    /** Template with {n} and {total} placeholders — must stay a plain string so
     *  the content object can cross the server → client boundary. */
    stepOf: string
    customer: Step[]
    merchant: Step[]
  }
  impact: {
    label: string
    num: string
    text: string
    rows: { num: string; title: string; text: string }[]
    cta: string
  }
  faq: {
    label: string
    title: string
    tabCustomer: string
    tabMerchant: string
    customer: Qa[]
    merchant: Qa[]
    stillTitle: string
    stillBody: string
    stillCta: string
  }
  cta: {
    badge: string
    headline: string
    subtext: string
    soonPrefixApple: string
    soonPrefixGoogle: string
    note: string
    noteLink: string
  }
}

/** Path prefix for a locale — '' for English, '/tw', '/cn'. */
export function basePath(locale: Locale): string {
  return locale === 'en' ? '' : `/${locale}`
}

const SAMPLE_STORES_EN = [
  'Sunrise Bakery', 'Daily Grind Café', 'Green Leaf Market', 'Mochi & Co.',
  'Corner Deli', 'Fresh Table', 'Bao House', 'Sweet Crumb',
  'Urban Pantry', 'The Rolling Pin', 'Morning Toast', 'Leaf & Bean',
]

const SAMPLE_STORES_TW = [
  '晨光麵包坊', '日常咖啡', '綠葉市集', '麻糬工房',
  '轉角熟食', '鮮食餐桌', '包子鋪', '甜點碎屑',
  '城市食材', '桿麵棍烘焙', '晨間吐司', '葉與豆',
]

const SAMPLE_STORES_CN = [
  '晨光面包坊', '日常咖啡', '绿叶市集', '麻糬工房',
  '转角熟食', '鲜食餐桌', '包子铺', '甜点碎屑',
  '城市食材', '擀面杖烘焙', '晨间吐司', '叶与豆',
]

const en: HomeContent = {
  hero: {
    badge: 'Spend Less. Experience more.',
    headline: 'More Than a Better Price, It’s a Better ',
    headlineAccent: 'Experience',
    headlineTail: '.',
    subtext:
      'Box It Up connects you with curated surprise boxes from local stores, turning excess inventory into great-value meals you can discover every day.',
    ctaPrimary: 'Download the App',
    ctaSecondary: 'Business Early Access →',
    photoAlt: 'Fresh bakery goods rescued through Box It Up',
    chipBox: 'Bakery Rescue Box',
    chipMeta: 'NT$150 · pickup 18:30',
    chipNear: '12 stores near you',
  },
  trust: {
    label: 'We Partner With',
    hint: 'Sample stores — real partners coming soon',
    items: SAMPLE_STORES_EN,
  },
  about: {
    label: 'About Us',
    title: 'Great products deserve to be ',
    titleAccent: 'discovered',
    titleTail: '.',
    lead: 'Every day, perfectly fresh products are left unsold simply because demand is impossible to predict.',
    text: 'We believe exceptional value shouldn’t disappear at the end of the day. Box It Up connects people with curated selections from local brands, creating better value for customers while helping merchants recover value from every product.',
    quote: 'Every meal deserves to be enjoyed — not wasted.',
    quoteBy: 'The Box It Up belief',
    cta: 'Learn more about us →',
  },
  why: {
    label: 'Why Box It Up',
    title: 'Good for you. Good for stores. Good for the planet.',
    tabCustomer: 'For Customers',
    tabMerchant: 'For Merchants',
    customer: [
      { title: 'Discover New Favorites', text: 'Go beyond the usual and discover exceptional local brands you might never have found.' },
      { title: 'Premium for Less', text: 'The same handcrafted quality and freshness—at a price that makes every purchase feel worthwhile.' },
      { title: 'Every Box, A New Experience', text: 'Each curated box brings variety, excitement, and the joy of trying something new.' },
      { title: 'Make Every Purchase Matter', text: 'Every purchase helps reduce unnecessary food waste by giving great products the chance to be enjoyed.' },
    ],
    merchant: [
      { title: 'Recover Extra Revenue', text: 'Convert unsold daily products into revenue before their value disappears, without changing your regular pricing strategy.' },
      { title: 'Reduce Product Waste', text: 'Keep quality food in circulation by giving daily surplus products a timely and more valuable selling channel.' },
      { title: 'Reach New Customers', text: 'Introduce your store to nearby customers through a lower-barrier first purchase that encourages discovery and future visits.' },
      { title: 'Manage Demand Smarter', text: 'Respond to unpredictable daily demand with a flexible channel that helps handle excess inventory more efficiently.' },
    ],
    ctaCustomer: 'Download the app',
    ctaMerchant: 'Request early access',
  },
  how: {
    label: 'How It Works',
    title: 'Three simple steps, whichever side you’re on.',
    toggleCustomer: 'I want to eat',
    toggleMerchant: 'I run a store',
    stepOf: 'Step {n} of {total}',
    customer: [
      { title: 'Download & sign up', desc: 'Get the app and see surprise boxes from stores near you in seconds.' },
      { title: 'Choose your box', desc: 'Browse today’s surprise boxes and pick the one that catches your eye.' },
      { title: 'Pay & get your code', desc: 'Pay in the app, get your pickup code instantly, then collect at the store.' },
    ],
    merchant: [
      { title: 'List today’s box', desc: 'Set price, quantity and pickup window for what’s left today — takes two minutes.' },
      { title: 'Receive orders', desc: 'Customers reserve and pay in the app — orders land straight in your dashboard.' },
      { title: 'Customers pick up', desc: 'Check the pickup code, hand over the box — quick and contactless.' },
      { title: 'Settle daily', desc: 'See exactly what you recovered from waste, day by day, in your dashboard.' },
    ],
  },
  impact: {
    label: 'Impact',
    num: '33%',
    text: 'of all food produced worldwide is wasted. Every box rescued through Box It Up keeps good food — and the water, land and energy behind it — out of the landfill.',
    rows: [
      { num: '100%', title: 'Community-first', text: 'Every box supports an independent local store, keeping value in the neighbourhood.' },
      { num: 'Soon', title: 'Live impact dashboard', text: 'Boxes rescued, CO₂e avoided, stores supported — real numbers after launch.' },
    ],
    cta: 'Learn more about our impact →',
  },
  faq: {
    label: 'FAQ',
    title: 'Questions? Answered.',
    tabCustomer: 'For Customers',
    tabMerchant: 'For Merchants',
    customer: [
      { q: 'What’s inside a surprise box?', a: 'A curated pick of that day’s surplus — fresh items the store simply made too many of. Contents change daily, and that’s the fun: you always get more value than you paid for.' },
      { q: 'Can I choose what goes in the box?', a: 'Not the exact items — the surprise is what makes the price possible. You do choose the store and the box type (bakery, café, meals…), and stores list allergen info where it applies.' },
      { q: 'Is the food fresh?', a: 'Yes. Surplus doesn’t mean expired — it’s food made today that just didn’t sell out. Every partner store follows the same food-safety rules as everything else they sell.' },
      { q: 'How do I pick up my box?', a: 'After you reserve, you get a pickup code in the app. Show it at the store during the pickup window (usually near closing time) and enjoy.' },
      { q: 'How do I pay?', a: 'You pay in the app when you reserve, so pickup is quick and contactless. Payment options will be announced at launch.' },
    ],
    merchant: [
      { q: 'How can my store join?', a: 'Sign up through the early access page — onboarding takes minutes, and you can list your first surprise box the same day, with no upfront cost.' },
      { q: 'Is there a fee to partner?', a: 'No upfront cost to join. Fee details will be shared during onboarding before you list anything — no surprises.' },
      { q: 'How much time does it take each day?', a: 'About two minutes: set the price, quantity and pickup window for whatever you have left. Orders then land straight in your dashboard.' },
    ],
    stillTitle: 'Still have a question?',
    stillBody: 'We’re happy to help — reach out any time.',
    stillCta: 'Contact us →',
  },
  cta: {
    badge: 'Join the movement',
    headline: 'Give every great bite the chance to be discovered.',
    subtext:
      'Download Box It Up to discover curated boxes from premium local bakeries and cafés at exceptional value — or partner with us to help every great product find the customer it deserves.',
    soonPrefixApple: 'Coming soon on the',
    soonPrefixGoogle: 'Coming soon on',
    note: 'Free to join · App launching soon · ',
    noteLink: 'Partner with us as a store →',
  },
}

const tw: HomeContent = {
  hero: {
    badge: '花得更少，體驗更多。',
    headline: '不只是更好的價格，更是更好的',
    headlineAccent: '體驗',
    headlineTail: '。',
    subtext:
      'Box It Up 連結你與在地店家的精選驚喜箱，把賣不完的好商品，變成每天都能發現的超值美味。',
    ctaPrimary: '下載 App',
    ctaSecondary: '商家搶先體驗 →',
    photoAlt: '透過 Box It Up 被拯救的新鮮烘焙商品',
    chipBox: '烘焙驚喜箱',
    chipMeta: 'NT$150 · 18:30 取餐',
    chipNear: '附近有 12 家店',
  },
  trust: {
    label: '合作夥伴',
    hint: '示範店家 — 正式合作夥伴即將公布',
    items: SAMPLE_STORES_TW,
  },
  about: {
    label: '關於我們',
    title: '好的商品，值得',
    titleAccent: '被看見',
    titleTail: '。',
    lead: '每一天，都有完全新鮮的商品因為需求難以預測而賣不完。',
    text: '我們相信，好價值不該在打烊時消失。Box It Up 讓大家認識在地品牌的精選商品，替顧客創造更好的價值，也幫店家把每一份商品的價值找回來。',
    quote: '每一份美味，都值得被享用，而不是被丟棄。',
    quoteBy: 'Box It Up 的信念',
    cta: '更了解我們 →',
  },
  why: {
    label: '為什麼選擇 Box It Up',
    title: '對你好、對店家好，也對地球好。',
    tabCustomer: '給消費者',
    tabMerchant: '給店家',
    customer: [
      { title: '發現新愛店', text: '跳脫日常選擇，遇見你可能從沒發現過的在地好品牌。' },
      { title: '用更少享受更好', text: '一樣的用心與新鮮度，卻是讓每一次購買都覺得值得的價格。' },
      { title: '每一箱都是新體驗', text: '每個精選驚喜箱都帶來變化、期待，以及嘗鮮的樂趣。' },
      { title: '讓每次購買都有意義', text: '每一次購買，都讓好商品有機會被享用，減少不必要的浪費。' },
    ],
    merchant: [
      { title: '找回額外營收', text: '在價值消失前，把當日未售出的商品轉換成營收，且不影響原本的定價策略。' },
      { title: '減少商品浪費', text: '為每日剩餘商品提供及時且更有價值的銷售管道，讓好食物繼續流通。' },
      { title: '接觸新顧客', text: '透過門檻更低的初次購買，讓附近的顧客認識你的店，並帶來回訪。' },
      { title: '更聰明地管理需求', text: '用彈性的銷售管道因應每日難以預測的需求，更有效率地處理多餘庫存。' },
    ],
    ctaCustomer: '下載 App',
    ctaMerchant: '申請搶先體驗',
  },
  how: {
    label: '運作方式',
    title: '不論你是哪一方，都只要三個簡單步驟。',
    toggleCustomer: '我想吃',
    toggleMerchant: '我是店家',
    stepOf: '第 {n} 步／共 {total} 步',
    customer: [
      { title: '下載並註冊', desc: '下載 App，幾秒內就能看到附近店家的驚喜箱。' },
      { title: '挑選你的驚喜箱', desc: '瀏覽今天的驚喜箱，選一個你喜歡的。' },
      { title: '付款並取得取餐碼', desc: '在 App 內付款，立即拿到取餐碼，再到店取餐。' },
    ],
    merchant: [
      { title: '上架今日驚喜箱', desc: '設定價格、數量與取餐時段，兩分鐘就完成。' },
      { title: '接收訂單', desc: '顧客在 App 預訂並付款，訂單直接進到你的後台。' },
      { title: '顧客取餐', desc: '核對取餐碼、交付商品，快速又免接觸。' },
      { title: '每日結算', desc: '在後台清楚看到每天挽回了多少價值。' },
    ],
  },
  impact: {
    label: '社會影響力',
    num: '33%',
    text: '全球生產的食物中，約有三分之一被浪費掉。每一個透過 Box It Up 被拯救的驚喜箱，都讓好食物——以及背後的水、土地與能源——不必進到掩埋場。',
    rows: [
      { num: '100%', title: '在地優先', text: '每一箱都支持一家在地獨立店家，把價值留在社區裡。' },
      { num: '即將推出', title: '即時影響力儀表板', text: '拯救箱數、減少的 CO₂e、支持的店家——正式上線後公布真實數據。' },
    ],
    cta: '了解更多影響力 →',
  },
  faq: {
    label: '常見問題',
    title: '有疑問嗎？這裡有答案。',
    tabCustomer: '消費者',
    tabMerchant: '店家',
    customer: [
      { q: '驚喜箱裡面有什麼？', a: '是店家當天多做的新鮮商品精選組合。內容每天都不一樣，這正是有趣的地方：你拿到的價值總是超過你付的價格。' },
      { q: '可以自己挑選內容嗎？', a: '無法指定確切品項——正因為是驚喜，才能有這樣的價格。但你可以選擇店家與箱型（烘焙、咖啡、餐點…），店家也會標示相關的過敏原資訊。' },
      { q: '食物新鮮嗎？', a: '新鮮。剩餘不等於過期——這些是當天製作、只是沒賣完的商品。每家合作店家都遵循與其他商品相同的食品安全規範。' },
      { q: '要怎麼取餐？', a: '預訂後，App 會給你一組取餐碼。在取餐時段（通常接近打烊）到店出示即可。' },
      { q: '要怎麼付款？', a: '預訂時直接在 App 內付款，取餐快速又免接觸。付款方式將於正式上線時公布。' },
    ],
    merchant: [
      { q: '我的店要怎麼加入？', a: '透過搶先體驗頁面申請——開通只要幾分鐘，當天就能上架第一個驚喜箱，且無需預付費用。' },
      { q: '合作需要費用嗎？', a: '加入不需預付費用。費用細節會在開通過程中、你上架任何商品之前完整說明，不會有意外。' },
      { q: '每天需要花多少時間？', a: '大約兩分鐘：設定剩餘商品的價格、數量與取餐時段，訂單就會直接進到後台。' },
    ],
    stillTitle: '還有其他問題嗎？',
    stillBody: '我們很樂意協助，隨時與我們聯絡。',
    stillCta: '聯絡我們 →',
  },
  cta: {
    badge: '加入這場改變',
    headline: '讓每一份美味，都有被發現的機會。',
    subtext:
      '下載 Box It Up，用超值價格發現在地優質烘焙坊與咖啡廳的精選驚喜箱——或成為我們的合作夥伴，讓每一份好商品都能遇見值得的顧客。',
    soonPrefixApple: '即將登上',
    soonPrefixGoogle: '即將登上',
    note: '免費加入 · App 即將上線 · ',
    noteLink: '成為合作店家 →',
  },
}

const cn: HomeContent = {
  hero: {
    badge: '花得更少，体验更多。',
    headline: '不只是更好的价格，更是更好的',
    headlineAccent: '体验',
    headlineTail: '。',
    subtext:
      'Box It Up 连接你与本地商家的精选惊喜箱，把卖不完的好商品，变成每天都能发现的超值美味。',
    ctaPrimary: '下载 App',
    ctaSecondary: '商家抢先体验 →',
    photoAlt: '通过 Box It Up 被拯救的新鲜烘焙商品',
    chipBox: '烘焙惊喜箱',
    chipMeta: 'NT$150 · 18:30 取餐',
    chipNear: '附近有 12 家店',
  },
  trust: {
    label: '合作伙伴',
    hint: '示范商家 — 正式合作伙伴即将公布',
    items: SAMPLE_STORES_CN,
  },
  about: {
    label: '关于我们',
    title: '好的商品，值得',
    titleAccent: '被看见',
    titleTail: '。',
    lead: '每一天，都有完全新鲜的商品因为需求难以预测而卖不完。',
    text: '我们相信，好价值不该在打烊时消失。Box It Up 让大家认识本地品牌的精选商品，为顾客创造更好的价值，也帮商家把每一份商品的价值找回来。',
    quote: '每一份美味，都值得被享用，而不是被丢弃。',
    quoteBy: 'Box It Up 的信念',
    cta: '更了解我们 →',
  },
  why: {
    label: '为什么选择 Box It Up',
    title: '对你好、对商家好，也对地球好。',
    tabCustomer: '给消费者',
    tabMerchant: '给商家',
    customer: [
      { title: '发现新爱店', text: '跳脱日常选择，遇见你可能从没发现过的本地好品牌。' },
      { title: '用更少享受更好', text: '一样的用心与新鲜度，却是让每一次购买都觉得值得的价格。' },
      { title: '每一箱都是新体验', text: '每个精选惊喜箱都带来变化、期待，以及尝鲜的乐趣。' },
      { title: '让每次购买都有意义', text: '每一次购买，都让好商品有机会被享用，减少不必要的浪费。' },
    ],
    merchant: [
      { title: '找回额外营收', text: '在价值消失前，把当日未售出的商品转换成营收，且不影响原本的定价策略。' },
      { title: '减少商品浪费', text: '为每日剩余商品提供及时且更有价值的销售渠道，让好食物继续流通。' },
      { title: '接触新顾客', text: '通过门槛更低的初次购买，让附近的顾客认识你的店，并带来回访。' },
      { title: '更聪明地管理需求', text: '用灵活的销售渠道应对每日难以预测的需求，更有效率地处理多余库存。' },
    ],
    ctaCustomer: '下载 App',
    ctaMerchant: '申请抢先体验',
  },
  how: {
    label: '运作方式',
    title: '不论你是哪一方，都只要三个简单步骤。',
    toggleCustomer: '我想吃',
    toggleMerchant: '我是商家',
    stepOf: '第 {n} 步／共 {total} 步',
    customer: [
      { title: '下载并注册', desc: '下载 App，几秒内就能看到附近商家的惊喜箱。' },
      { title: '挑选你的惊喜箱', desc: '浏览今天的惊喜箱，选一个你喜欢的。' },
      { title: '付款并获取取餐码', desc: '在 App 内付款，立即拿到取餐码，再到店取餐。' },
    ],
    merchant: [
      { title: '上架当日惊喜箱', desc: '设定价格、数量与取餐时段，两分钟就完成。' },
      { title: '接收订单', desc: '顾客在 App 预订并付款，订单直接进入你的后台。' },
      { title: '顾客取餐', desc: '核对取餐码、交付商品，快速又免接触。' },
      { title: '每日结算', desc: '在后台清楚看到每天挽回了多少价值。' },
    ],
  },
  impact: {
    label: '社会影响力',
    num: '33%',
    text: '全球生产的食物中，约有三分之一被浪费掉。每一个通过 Box It Up 被拯救的惊喜箱，都让好食物——以及背后的水、土地与能源——不必进入填埋场。',
    rows: [
      { num: '100%', title: '本地优先', text: '每一箱都支持一家本地独立商家，把价值留在社区里。' },
      { num: '即将推出', title: '实时影响力仪表板', text: '拯救箱数、减少的 CO₂e、支持的商家——正式上线后公布真实数据。' },
    ],
    cta: '了解更多影响力 →',
  },
  faq: {
    label: '常见问题',
    title: '有疑问吗？这里有答案。',
    tabCustomer: '消费者',
    tabMerchant: '商家',
    customer: [
      { q: '惊喜箱里面有什么？', a: '是商家当天多做的新鲜商品精选组合。内容每天都不一样，这正是有趣的地方：你拿到的价值总是超过你付的价格。' },
      { q: '可以自己挑选内容吗？', a: '无法指定确切品项——正因为是惊喜，才能有这样的价格。但你可以选择商家与箱型（烘焙、咖啡、餐点…），商家也会标示相关的过敏原信息。' },
      { q: '食物新鲜吗？', a: '新鲜。剩余不等于过期——这些是当天制作、只是没卖完的商品。每家合作商家都遵循与其他商品相同的食品安全规范。' },
      { q: '要怎么取餐？', a: '预订后，App 会给你一组取餐码。在取餐时段（通常接近打烊）到店出示即可。' },
      { q: '要怎么付款？', a: '预订时直接在 App 内付款，取餐快速又免接触。付款方式将于正式上线时公布。' },
    ],
    merchant: [
      { q: '我的店要怎么加入？', a: '通过抢先体验页面申请——开通只要几分钟，当天就能上架第一个惊喜箱，且无需预付费用。' },
      { q: '合作需要费用吗？', a: '加入不需预付费用。费用细节会在开通过程中、你上架任何商品之前完整说明，不会有意外。' },
      { q: '每天需要花多少时间？', a: '大约两分钟：设定剩余商品的价格、数量与取餐时段，订单就会直接进入后台。' },
    ],
    stillTitle: '还有其他问题吗？',
    stillBody: '我们很乐意协助，随时与我们联系。',
    stillCta: '联系我们 →',
  },
  cta: {
    badge: '加入这场改变',
    headline: '让每一份美味，都有被发现的机会。',
    subtext:
      '下载 Box It Up，用超值价格发现本地优质烘焙坊与咖啡厅的精选惊喜箱——或成为我们的合作伙伴，让每一份好商品都能遇见值得的顾客。',
    soonPrefixApple: '即将登陆',
    soonPrefixGoogle: '即将登陆',
    note: '免费加入 · App 即将上线 · ',
    noteLink: '成为合作商家 →',
  },
}

export const HOME_CONTENT: Record<Locale, HomeContent> = { en, tw, cn }
