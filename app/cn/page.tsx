import type { Metadata } from 'next'
import HeroStats from '@/components/HeroStats'
import HeroParallax from '@/components/HeroParallax'
import ContactFormCn from '@/app/cn/contact/ContactFormCn'
import '@/app/contact/contact.css'

const CN_STATS = [
  { target: 2400, suffix: '+', label: '已拯救食物箱' },
  { target: 340, suffix: '+', label: '合作伙伴商家' },
  { target: 18, suffix: 'k kg', label: '减少 CO₂ 排放' },
]

export const metadata: Metadata = {
  title: 'Box It Up | 节省更多，体验更多。',
  description: 'Box It Up — 连接消费者与折扣惊喜食物箱，减少食物浪费，提升店家曝光。',
  icons: { icon: '/logo_icon.png' },
}

export default function CNPage() {
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
            <span className="hero__badge">减少食物浪费，从每一个盒子开始</span>
            <h1 className="hero__headline" style={{ letterSpacing: '0.02em', lineHeight: 1.3 }}>
              珍惜食物。
              <br />
              节省开支。
              <br />
              守护地球。
            </h1>
            <p className="hero__subtext">
              Box It Up 连接消费者与本地店家的折扣惊喜食物箱 ——
              减少浪费、提升店家知名度，并为每个人创造真实价值。
            </p>
            <div className="hero__cta-group">
              <a href="#signup" className="btn btn--primary">立即开始</a>
              <a href="/merchant/signup" className="btn btn--secondary">商家注册</a>
            </div>
            <HeroStats stats={CN_STATS} />
          </div>

          <HeroParallax>
          <div className="hero__visual hero__visual--product">
            <div className="hero__showcase">
              <div className="hero__bg-orb hero__bg-orb--1" />
              <div className="hero__bg-orb hero__bg-orb--2" />
              <div className="hero__floating-card hero__floating-card--offer">
                <span className="hero__floating-label">今日特惠</span>
                <strong>最高 7 折优惠</strong>
                <span>附近店家的惊喜箱</span>
              </div>
              <div className="hero__floating-card hero__floating-card--mini">
                <span className="hero__mini-dot" />
                <div>
                  <strong>附近 12 间店家</strong>
                  <span>周边新鲜精选</span>
                </div>
              </div>
              <div className="hero__phone">
                <div className="hero__phone-notch" />
                <div className="hero__phone-screen">
                  <div className="hero__app-header">
                    <span className="hero__app-brand">Box It Up</span>
                    <span className="hero__app-pill">惊喜箱</span>
                  </div>
                  <div className="hero__app-card hero__app-card--primary">
                    <div className="hero__app-card-top">
                      <span className="hero__app-tag">精选</span>
                      <span className="hero__app-rating">★ 4.9</span>
                    </div>
                    <h3>烘焙救援箱</h3>
                    <p>今日新鲜糕点与面包精选。</p>
                    <div className="hero__app-meta">
                      <span>NT$150</span>
                      <span>取货 18:30</span>
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
                        <span>饮品 + 甜点</span>
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
                        <strong>午餐便当</strong>
                        <span>主厨每日精选</span>
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
          <div className="section-label">关于我们</div>
          <div className="about__inner">
            <div className="about__text">
              <h2 className="section-title" style={{ letterSpacing: '0.03em' }}>
                更聪明的方式
                <br />
                对抗食物浪费。
              </h2>
              <p className="about__body">
                每年有数百万吨完好无损的食物被丢弃，仅仅是因为店家无法及时售出。Box It Up
                的诞生就是为了改变现状。我们与餐厅、烘焙坊、咖啡厅和超市合作，将剩余物资包装成实惠的惊喜箱
                —— 让资源不再浪费，创造多赢局面。
              </p>
              <p className="about__body">
                我们的平台让商家能轻松上架剩余物资，也让消费者能发现附近的超值优惠。这就是简单而纯粹的可持续生活。
              </p>
              <a href="#how-it-works" className="btn btn--primary" style={{ marginTop: '2rem' }}>
                了解运作方式
              </a>
            </div>
            <div className="about__metrics">
              <div className="metric-card">
                <span className="metric-card__number">1/3</span>
                <span className="metric-card__desc">全球生产的食物中有三分之一被浪费</span>
              </div>
              <div className="metric-card">
                <span className="metric-card__number">8–10%</span>
                <span className="metric-card__desc">全球温室气体排放量来自食物浪费</span>
              </div>
              <div className="metric-card">
                <span className="metric-card__number">$1T+</span>
                <span className="metric-card__desc">每年因食物浪费造成的全球经济损失</span>
              </div>
              <div className="metric-card metric-card--highlight">
                <span className="metric-card__number">Box It Up</span>
                <span className="metric-card__desc">致力于改变现状 —— 从每一个盒子开始。</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-label">运作方式</div>
          <h2 className="section-title section-title--center" style={{ letterSpacing: '0.03em' }}>
            简单三步骤
            <br />
            创造大不同。
          </h2>
          <p className="section-subtitle">无论您是商家还是消费者，只需几分钟即可开始。</p>
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
              <h3 className="step-card__title">商家建立惊喜箱</h3>
              <p className="step-card__desc">
                合作商家在每天结束前将剩余食物整理成精选惊喜箱 ——
                在两分钟内设定数量、价格和取货时段。
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
              <h3 className="step-card__title">用户以折扣价购买</h3>
              <p className="step-card__desc">
                消费者在 App 上浏览附近的惊喜箱，一键预订并支付原价的一小部分 ——
                通常可节省高达 70%。
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
              <h3 className="step-card__title">用户取货并享用</h3>
              <p className="step-card__desc">
                在指定的取货时间，用户直接前往店家领取。每个盒子都是一份惊喜 ——
                每次取货都拯救了食物免于进入填埋场。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="value section" id="value">
        <div className="container">
          <div className="section-label">为什么选择 Box It Up</div>
          <h2 className="section-title section-title--center" style={{ letterSpacing: '0.03em' }}>
            为食物链中的
            <br />
            每个人而设计。
          </h2>
          <p className="section-subtitle">我们的平台在各个层面创造深远价值。</p>
          <div className="value__grid">
            <div className="value-card">
              <div className="value-card__icon-wrap value-card__icon-wrap--customer">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="value-card__title">对消费者</h3>
              <ul className="value-card__list">
                <li>节省高达 70% 的优质食物开支</li>
                <li>探索新的本地餐厅与咖啡厅</li>
                <li>享受每一次惊喜带来的乐趣</li>
                <li>为减少食物浪费做出贡献</li>
                <li>轻松取货 —— 无需等待外送</li>
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
              <div className="value-card__featured-badge">最受欢迎</div>
              <h3 className="value-card__title">对商家</h3>
              <ul className="value-card__list">
                <li>从未售出的库存中回收营收</li>
                <li>为您的店面吸引新客群</li>
                <li>提升品牌的可持续发展形象</li>
                <li>零额外负担 —— 2 分钟内上架</li>
                <li>实时数据分析与洞察</li>
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
              <h3 className="value-card__title">对可持续发展</h3>
              <ul className="value-card__list">
                <li>减少数吨食物进入填埋场</li>
                <li>降低废弃物产生的甲烷排放</li>
                <li>减少食物系统的碳足迹</li>
                <li>支持循环食物经济</li>
                <li>可衡量的环境影响力</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED BOXES ── */}
      <section className="featured section" id="featured">
        <div className="container">
          <div className="section-label">今日精选</div>
          <div className="featured__header">
            <h2 className="section-title">
              您附近的
              <br />
              惊喜食物箱。
            </h2>
            <a href="#signup" className="btn btn--outline">查看所有盒子</a>
          </div>
          <div className="featured__grid">
            {[
              { imgClass: 'feat-card__img--1', category: '烘焙坊', discount: '3.3 折', avatarClass: 'feat-card__avatar--1', avatarText: 'GC', store: 'The Golden Crust', distance: '距离 0.3 km', title: '晨间惊喜箱', desc: '精选今日未售出的新鲜面包、糕点与可颂。', price: '$6.00', oldPrice: '$18.00', pickup: '取货时间 6–8 PM' },
              { imgClass: 'feat-card__img--2', category: '日式料理', discount: '3.3 折', avatarClass: 'feat-card__avatar--2', avatarText: 'SK', store: 'Sakura Kitchen', distance: '距离 0.8 km', title: '主厨精选箱', desc: '主厨每日亲自挑选的寿司卷、握寿司与味噌汤。', price: '$8.00', oldPrice: '$24.00', pickup: '取货时间 8–9 PM' },
              { imgClass: 'feat-card__img--3', category: '咖啡厅', discount: '3.3 折', avatarClass: 'feat-card__avatar--3', avatarText: 'BC', store: 'Bloom Coffee Co.', distance: '距离 1.2 km', title: '午后惊喜箱', desc: '今日新鲜制作的三明治、卷饼与甜点。', price: '$5.00', oldPrice: '$15.00', pickup: '取货时间 5–7 PM' },
              { imgClass: 'feat-card__img--4', category: '意式料理', discount: '4 折', avatarClass: 'feat-card__avatar--4', avatarText: 'NP', store: 'Napoli Pronto', distance: '距离 1.5 km', title: '意大利面与配菜箱', desc: '份量十足的手工意大利面、意式烤面包与提拉米苏。', price: '$9.00', oldPrice: '$22.00', pickup: '取货时间 9–10 PM' },
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
          <div className="section-label">用户评价</div>
          <h2 className="section-title section-title--center" style={{ letterSpacing: '0.03em' }}>
            深受消费者
            <br />
            与商家的喜爱。
          </h2>
          <div className="testimonials__grid">
            <div className="testimonial-card">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">「通过 Box It Up，我发现了许多超棒的本地店家。惊喜感让整个过程非常有趣 —— 而且真的省了很多钱。」</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">SL</div>
                <div>
                  <p className="testimonial-card__name">Sophie L.</p>
                  <p className="testimonial-card__role">忠实用户</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card testimonial-card--featured">
              <div className="testimonial-card__stars">★★★★★</div>
              <p className="testimonial-card__quote">「我们以前每天要丢掉近 20% 的烘焙品。自从加入 Box It Up 后，这个数字几乎降到了零 —— 而且我们还获得了许多新常客。」</p>
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
              <p className="testimonial-card__quote">「作为一个重视可持续发展的人，Box It Up 完全符合我的价值观。知道我买的每个盒子都拯救了食物免于浪费，感觉真的很棒。」</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">AK</div>
                <div>
                  <p className="testimonial-card__name">Aiko K.</p>
                  <p className="testimonial-card__role">环保意识消费者</p>
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
            <div className="cta-section__badge">加入行动</div>
            <h2 className="cta-section__headline">
              加入减少食物浪费的
              <br />
              全球行动。
            </h2>
            <p className="cta-section__subtext">
              无论您是飢肠辘辘的消费者，还是具有前瞻性的商家，Box It Up
              都有您的位置。立即注册，开始创造改变 —— 从每一个盒子开始。
            </p>
            <div className="cta-section__actions">
              <a href="#signup" className="btn btn--primary btn--large">立即开始</a>
              <a href="/merchant/signup" className="btn btn--ghost btn--large">商家注册</a>
            </div>
            <p className="cta-section__note">免费加入。无需任何承诺。</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="home-contact section" id="contact">
        <div className="container">
          <div className="home-contact__inner">
            <div>
              <div className="section-label">联系我们</div>
              <h2 className="home-contact__heading">
                有问题或想与我们<br />合作吗？
              </h2>
              <p className="home-contact__sub">
                无论您是有兴趣合作的商店、想加入我们的学生，还是对平台有想法——都欢迎发消息给我们。
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
                    <span>将多余库存转化为新的收入来源，并触及更多新客群。</span>
                  </div>
                </div>
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>早期协作</strong>
                    <span>学生与开发者可以获得真实的创业经历与项目主导机会。</span>
                  </div>
                </div>
                <div className="home-contact__reason">
                  <div className="home-contact__reason-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
                  <div className="home-contact__reason-body">
                    <strong>反馈与想法</strong>
                    <span>分享用户痛点或产品建议，帮助我们打造更好的平台。</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <ContactFormCn />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <a href="/cn" className="footer__logo">
                <img src="/app_logo.png" alt="Box It Up Logo" className="footer__logo-img" />
              </a>
              <p className="footer__tagline">
                连接剩余食物与在乎的人 —— 减少浪费、创造价值，从每一个盒子开始。
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
                <li><a href="#how-it-works">运作方式</a></li>
                <li><a href="#featured">浏览盒子</a></li>
                <li><a href="#about">商家专区</a></li>
                <li><a href="#signup">立即注册</a></li>
              </ul>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">公司</h4>
              <ul className="footer__links">
                <li><a href="#about">关于我们</a></li>
                <li><a href="/careers">加入我们</a></li>
                <li><a href="/contact">合作伙伴</a></li>
              </ul>
            </div>
            <div className="footer__links-group">
              <h4 className="footer__links-title">联系我们</h4>
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
                  台北，台湾
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">© 2026 Box It Up. 保留所有权利。</p>
            <div className="footer__legal">
              <a href="#">隐私权政策</a>
              <a href="#">服务条款</a>
              <a href="#">Cookie 政策</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
