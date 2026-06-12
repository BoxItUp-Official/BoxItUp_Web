import type { Metadata } from 'next'
import HeroStats from '@/components/HeroStats'
import HeroParallax from '@/components/HeroParallax'
import ContactFormTw from '@/app/tw/contact/ContactFormTw'
import '@/app/contact/contact.css'

const TW_STATS = [
  { target: 2400, suffix: '+', label: '已拯救食物箱' },
  { target: 340, suffix: '+', label: '合作夥伴商家' },
  { target: 18, suffix: 'k kg', label: '減少 CO₂ 排放' },
]

export const metadata: Metadata = {
  title: 'Box It Up | 節省更多，體驗更多。',
  description: 'Box It Up — 連結消費者與折扣驚喜食物箱，減少食物浪費，提升店家曝光。',
  icons: { icon: '/logo_icon.png' },
}

export default function TWPage() {
  return (
    <div
      style={{
        fontFamily: '"PingFang TC", "Heiti TC", "Microsoft JhengHei", "Noto Sans TC", system-ui, -apple-system, sans-serif',
        lineHeight: 1.6,
      }}
    >
      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero__inner container">
          <div className="hero__content">
            <span className="hero__badge">減少食物浪費，從每一個盒子開始</span>
            <h1 className="hero__headline" style={{ letterSpacing: '0.02em', lineHeight: 1.3 }}>
              珍惜食物。
              <br />
              節省開支。
              <br />
              守護地球。
            </h1>
            <p className="hero__subtext">
              Box It Up 連結消費者與在地店家的折扣驚喜食物箱 ——
              減少浪費、提升店家知名度，並為每個人創造真實價值。
            </p>
            <div className="hero__cta-group">
              <a href="#signup" className="btn btn--primary">立即開始</a>
              <a href="/merchant/signup" className="btn btn--secondary">商家註冊</a>
            </div>
            <HeroStats stats={TW_STATS} />
          </div>

          <HeroParallax>
          <div className="hero__visual hero__visual--product">
            <div className="hero__showcase">
              <div className="hero__bg-orb hero__bg-orb--1" />
              <div className="hero__bg-orb hero__bg-orb--2" />
              <div className="hero__floating-card hero__floating-card--offer">
                <span className="hero__floating-label">今日特惠</span>
                <strong>最高 7 折優惠</strong>
                <span>附近店家的驚喜箱</span>
              </div>
              <div className="hero__floating-card hero__floating-card--mini">
                <span className="hero__mini-dot" />
                <div>
                  <strong>附近 12 間店家</strong>
                  <span>周邊新鮮精選</span>
                </div>
              </div>
              <div className="hero__phone">
                <div className="hero__phone-notch" />
                <div className="hero__phone-screen">
                  <div className="hero__app-header">
                    <span className="hero__app-brand">Box It Up</span>
                    <span className="hero__app-pill">驚喜箱</span>
                  </div>
                  <div className="hero__app-card hero__app-card--primary">
                    <div className="hero__app-card-top">
                      <span className="hero__app-tag">精選</span>
                      <span className="hero__app-rating">★ 4.9</span>
                    </div>
                    <h3>烘焙救援箱</h3>
                    <p>今日新鮮糕點與麵包精選。</p>
                    <div className="hero__app-meta">
                      <span>NT$150</span>
                      <span>取貨 18:30</span>
                    </div>
                  </div>
                  <div className="hero__app-list">
                    <div className="hero__app-list-item">
                      <div className="hero__app-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                        </svg>
                      </div>
                      <div>
                        <strong>咖啡套餐</strong>
                        <span>飲品 + 甜點</span>
                      </div>
                      <b>NT$120</b>
                    </div>
                    <div className="hero__app-list-item">
                      <div className="hero__app-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8V5M8 8V6M16 8V6"/>
                        </svg>
                      </div>
                      <div>
                        <strong>午餐便當</strong>
                        <span>主廚每日精選</span>
                      </div>
                      <b>NT$150</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero__floating-card hero__floating-card--impact">
                <span className="hero__impact-number">2,400+</span>
                <span className="hero__impact-text">已拯救的食物箱</span>
              </div>
            </div>
          </div>
          </HeroParallax>
        </div>

        <div className="hero__scroll-indicator" id="scrollIndicator">
          <span>向下探索</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about section" id="about">
        <div className="container">
          <div className="section-label">關於我們</div>
          <div className="about__inner">
            <div className="about__text">
              <h2 className="section-title" style={{ letterSpacing: '0.03em' }}>
                更聰明的方式
                <br />
                對抗食物浪費。
              </h2>
              <p className="about__body">
                每年有數百萬噸完好無損的食物被丟棄，僅僅是因為店家無法及時售出。Box It Up
                的誕生就是為了改變現狀。我們與餐廳、烘焙坊、咖啡廳和超市合作，將剩餘物資包裝成實惠的驚喜箱
                —— 讓資源不再浪費，創造多贏局面。
              </p>
              <p className="about__body">
                我們的平台讓商家能輕鬆上架剩餘物資，也讓消費者能發現附近的超值優惠。這就是簡單而純粹的永續生活。
              </p>
              <a href="#how-it-works" className="btn btn--primary" style={{ marginTop: '2rem' }}>
                了解運作方式
              </a>
            </div>
            <div className="about__metrics">
              <div className="metric-card">
                <span className="metric-card__number">1/3</span>
                <span className="metric-card__desc">全球生產的食物中有三分之一被浪費</span>
              </div>
              <div className="metric-card">
                <span className="metric-card__number">8–10%</span>
                <span className="metric-card__desc">全球溫室氣體排放量來自食物浪費</span>
              </div>
              <div className="metric-card">
                <span className="metric-card__number">$1T+</span>
                <span className="metric-card__desc">每年因食物浪費造成的全球經濟損失</span>
              </div>
              <div className="metric-card metric-card--highlight">
                <span className="metric-card__number">Box It Up</span>
                <span className="metric-card__desc">致力於改變現狀 —— 從每一個盒子開始。</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-label">運作方式</div>
          <h2 className="section-title section-title--center" style={{ letterSpacing: '0.03em' }}>
            簡單三步驟
            <br />
            創造大不同。
          </h2>
          <p className="section-subtitle">無論您是商家還是消費者，只需幾分鐘即可開始。</p>
          <div className="steps">
            <div className="step-card" data-step="01">
              <div className="step-card__icon-wrap">
                <svg className="step-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="20" width="32" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M16 20V14a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="24" cy="31" r="3" fill="currentColor" />
                </svg>
              </div>
              <div className="step-card__number">01</div>
              <h3 className="step-card__title">商家建立驚喜箱</h3>
              <p className="step-card__desc">
                合作商家在每天結束前將剩餘食物整理成精選驚喜箱 ——
                在兩分鐘內設定數量、價格和取貨時段。
              </p>
            </div>
            <div className="step-connector">
              <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q30 0 60 10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
            </div>
            <div className="step-card" data-step="02">
              <div className="step-card__icon-wrap">
                <svg className="step-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="14" width="36" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M6 22h36" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="14" y="6" width="4" height="12" rx="2" fill="currentColor" />
                  <rect x="30" y="6" width="4" height="12" rx="2" fill="currentColor" />
                  <path d="M14 30h8M14 36h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="step-card__number">02</div>
              <h3 className="step-card__title">用戶以折扣價購買</h3>
              <p className="step-card__desc">
                消費者在 App 上瀏覽附近的驚喜箱，一鍵預訂並支付原價的一小部分 ——
                通常可節省高達 70%。
              </p>
            </div>
            <div className="step-connector">
              <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q30 20 60 10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
            </div>
            <div className="step-card" data-step="03">
              <div className="step-card__icon-wrap">
                <svg className="step-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18 18-8.06 18-18S33.94 6 24 6z" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M24 14v10l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="step-card__number">03</div>
              <h3 className="step-card__title">用戶取貨並享用</h3>
              <p className="step-card__desc">
                在指定的取貨時間，用戶直接前往店家領取。每個盒子都是一份驚喜 ——
                每次取貨都拯救了食物免於進入掩埋場。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="value section" id="value">
        <div className="container">
          <div className="section-label">為什麼選擇 Box It Up</div>
          <h2 className="section-title section-title--center" style={{ letterSpacing: '0.03em' }}>
            為食物鏈中的
            <br />
            每個人而設計。
          </h2>
          <p className="section-subtitle">我們的平台在各個層面創造深遠價值。</p>
          <div className="value__grid">
            <div className="value-card">
              <div className="value-card__icon-wrap value-card__icon-wrap--customer">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="value-card__title">對消費者</h3>
              <ul className="value-card__list">
                <li>節省高達 70% 的優質食物開支</li>
                <li>探索新的在地餐廳與咖啡廳</li>
                <li>享受每一次驚喜帶來的樂趣</li>
                <li>為減少食物浪費做出貢獻</li>
                <li>輕鬆取貨 —— 無需等待外送</li>
              </ul>
            </div>
            <div className="value-card value-card--featured">
              <div className="value-card__icon-wrap value-card__icon-wrap--business">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="22" width="36" height="20" rx="3" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M14 22V16a10 10 0 0120 0v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M18 32h12M24 28v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="value-card__featured-badge">最受歡迎</div>
              <h3 className="value-card__title">對商家</h3>
              <ul className="value-card__list">
                <li>從未售出的庫存中回收營收</li>
                <li>為您的店面吸引新客群</li>
                <li>提升品牌的永續發展形象</li>
                <li>零額外負擔 —— 2 分鐘內上架</li>
                <li>即時數據分析與洞察</li>
              </ul>
            </div>
            <div className="value-card">
              <div className="value-card__icon-wrap value-card__icon-wrap--planet">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M8 24c4-6 8-10 16-10s12 4 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 24c4 6 8 10 16 10s12-4 16-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>
              <h3 className="value-card__title">對永續發展</h3>
              <ul className="value-card__list">
                <li>減少數噸食物進入掩埋場</li>
                <li>降低廢棄物產生的甲烷排放</li>
                <li>減少食物系統的碳足跡</li>
                <li>支持循環食物經濟</li>
                <li>可衡量的環境影響力</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED BOXES ── */}
      <section className="featured section" id="featured">
        <div className="container">
          <div className="section-label">今日精選</div>
          <div className="featured__header">
            <h2 className="section-title">
              您附近的
              <br />
              驚喜食物箱。
            </h2>
            <a href="#signup" className="btn btn--outline">查看所有盒子</a>
          </div>
          <div className="featured__grid">
            {[
              { imgClass: 'feat-card__img--1', category: '烘焙坊', discount: '3.3 折', avatarClass: 'feat-card__avatar--1', avatarText: 'GC', store: 'The Golden Crust', distance: '距離 0.3 km', title: '晨間驚喜箱', desc: '精選今日未售出的新鮮麵包、糕點與可頌。', price: '$6.00', oldPrice: '$18.00', pickup: '取貨時間 6–8 PM' },
              { imgClass: 'feat-card__img--2', category: '日式料理', discount: '3.3 折', avatarClass: 'feat-card__avatar--2', avatarText: 'SK', store: 'Sakura Kitchen', distance: '距離 0.8 km', title: '主廚精選箱', desc: '主廚每日親自挑選的壽司捲、握壽司與味噌湯。', price: '$8.00', oldPrice: '$24.00', pickup: '取貨時間 8–9 PM' },
              { imgClass: 'feat-card__img--3', category: '咖啡廳', discount: '3.3 折', avatarClass: 'feat-card__avatar--3', avatarText: 'BC', store: 'Bloom Coffee Co.', distance: '距離 1.2 km', title: '午後驚喜箱', desc: '今日新鮮製作的三明治、捲餅與甜點。', price: '$5.00', oldPrice: '$15.00', pickup: '取貨時間 5–7 PM' },
              { imgClass: 'feat-card__img--4', category: '義式料理', discount: '4 折', avatarClass: 'feat-card__avatar--4', avatarText: 'NP', store: 'Napoli Pronto', distance: '距離 1.5 km', title: '義大利麵與配菜箱', desc: '份量十足的手工義大利麵、普切塔與提拉米蘇。', price: '$9.00', oldPrice: '$22.00', pickup: '取貨時間 9–10 PM' },
            ].map((card) => (
              <div key={card.title} className="feat-card">
                <div className={`feat-card__img ${card.imgClass}`}>
                  <span className="feat-card__category">{card.category}</span>
                  <span className="feat-card__discount">{card.discount}</span>
                </div>
                <div className="feat-card__body">
                  <div className="feat-card__store-row">
                    <div className={`feat-card__avatar ${card.avatarClass}`}>{card.avatarText}</div>
                    <div>
                      <p className="feat-card__store-name">{card.store}</p>
                      <p className="feat-card__distance">{card.distance}</p>
                    </div>
                  </div>
                  <h3 className="feat-card__title">{card.title}</h3>
                  <p className="feat-card__desc">{card.desc}</p>
                  <div className="feat-card__footer">
                    <div className="feat-card__pricing">
                      <span className="feat-card__price">{card.price}</span>
                      <span className="feat-card__price-old">{card.oldPrice}</span>
                    </div>
                    <div className="feat-card__pickup">{card.pickup}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials section" id="testimonials">
        <div className="container">
          <div className="section-label">用戶評價</div>
          <h2 className="section-title section-title--center" style={{ letterSpacing: '0.03em' }}>
            深受消費者
            <br />
            與商家的喜愛。
          </h2>
          <div className="testimonials__grid">
            <div className="testimonial-card">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">「透過 Box It Up，我發現了許多超棒的在地店家。驚喜感讓整個過程非常有趣 —— 而且真的省了很多錢。」</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">SL</div>
                <div>
                  <p className="testimonial-card__name">Sophie L.</p>
                  <p className="testimonial-card__role">忠實用戶</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card testimonial-card--featured">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">「我們以前每天要丟掉近 20% 的烘焙品。自從加入 Box It Up 後，這個數字幾乎降到了零 —— 而且我們還獲得了許多新常客。」</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">MR</div>
                <div>
                  <p className="testimonial-card__name">Marco R.</p>
                  <p className="testimonial-card__role">The Golden Crust 店主</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">「作為一個重視永續發展的人，Box It Up 完全符合我的價值觀。知道我買的每個盒子都拯救了食物免於浪費，感覺真的很棒。」</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">AK</div>
                <div>
                  <p className="testimonial-card__name">Aiko K.</p>
                  <p className="testimonial-card__role">環保意識消費者</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section section" id="signup">
        <div className="container">
          <div className="cta-section__inner">
            <div className="cta-section__badge">加入行動</div>
            <h2 className="cta-section__headline">
              加入減少食物浪費的
              <br />
              全球行動。
            </h2>
            <p className="cta-section__subtext">
              無論您是飢腸轆轆的消費者，還是具有前瞻性的商家，Box It Up
              都有您的位置。立即註冊，開始創造改變 —— 從每一個盒子開始。
            </p>
            <div className="cta-section__actions">
              <a href="#signup" className="btn btn--primary btn--large">立即開始</a>
              <a href="/merchant/signup" className="btn btn--ghost btn--large">商家註冊</a>
            </div>
            <p className="cta-section__note">免費加入。無需任何承諾。</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="home-contact section" id="contact">
        <div className="container">
          <div className="home-contact__inner">
            <div>
              <div className="section-label">聯絡我們</div>
              <h2 className="home-contact__heading">
                有問題或想與我們<br />合作嗎？
              </h2>
              <p className="home-contact__sub">
                無論您是有興趣合作的商店、想加入我們的學生，還是對平台有想法——都歡迎傳訊息給我們。
              </p>
              <div className="home-contact__reasons">
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l1-5h16l1 5"/><path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"/><path d="M9 21v-6h6v6"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>商店合作</strong>
                    <span>將剩餘庫存轉化為新的收入來源，並觸及更多新客群。</span>
                  </div>
                </div>
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>早期協作</strong>
                    <span>學生與開發者可以獲得真實的創業經歷與專案主導機會。</span>
                  </div>
                </div>
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>回饋與想法</strong>
                    <span>分享使用者痛點或產品建議，協助我們打造更好的平台。</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <ContactFormTw />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <a href="/tw" className="footer__logo">
                <img src="/app_logo.png" alt="Box It Up Logo" className="footer__logo-img" />
              </a>
              <p className="footer__tagline">
                連結剩餘食物與在乎的人 —— 減少浪費、創造價值，從每一個盒子開始。
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__social" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" className="footer__social" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">平台</h4>
              <ul className="footer__links">
                <li><a href="#how-it-works">運作方式</a></li>
                <li><a href="#featured">瀏覽盒子</a></li>
                <li><a href="#about">商家專區</a></li>
                <li><a href="#signup">立即註冊</a></li>
              </ul>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">公司</h4>
              <ul className="footer__links">
                <li><a href="#about">關於我們</a></li>
                <li><a href="/careers">加入我們</a></li>
                <li><a href="/contact">合作夥伴</a></li>
              </ul>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">聯絡我們</h4>
              <ul className="footer__links footer__links--contact">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  boxitupofficial@gmail.com
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  台北，台灣
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">© 2026 Box It Up. 保留所有權利。</p>
            <div className="footer__legal">
              <a href="/privacy">隱私權政策</a>
              <a href="/terms">服務條款</a>
              <a href="/cookie">Cookie 政策</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
