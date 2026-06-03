import type { Metadata } from 'next'
import '@/app/contact/contact.css'
import ContactFormTw from './ContactFormTw'

export const metadata: Metadata = {
  title: 'Box It Up | 聯絡我們',
  description: '聯絡 Box It Up — 商店合作、早期協作或一般詢問，歡迎來信。',
  icons: { icon: '/logo_icon.png' },
}

export default function TwContactPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(160deg, #ffffff 0%, #f4f4f4 52%, #d9d9d9 100%)',
        minHeight: '100vh',
      }}
    >
      <main>
        {/* ── HERO ── */}
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero__inner">
              <div className="contact-hero__content">
                <div className="contact-eyebrow">聯絡我們</div>
                <h1 className="contact-title">
                  讓我們聊聊 Box It Up 接下來能創造什麼
                </h1>
                <p className="contact-subtitle">
                  無論您是有興趣合作的商店、想參與建設的學生，或是有意見與想法的使用者，我們都很樂意聽您分享。
                </p>
              </div>

              <aside className="contact-hero__aside">
                <h2 className="contact-hero__aside-title">最好的聯絡理由</h2>
                <div className="contact-hero__aside-list">
                  <div className="contact-hero__aside-item">
                    <strong>商店合作</strong>
                    <span>
                      探索 Box It Up 如何幫助您的商店提升能見度，並創造更有價值的優惠方案。
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>早期協作</strong>
                    <span>
                      學生與開發者可以聯絡我們，獲得實際的創業經歷與專案主導機會。
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>產品回饋</strong>
                    <span>
                      分享您的想法、使用者痛點或建議，協助我們在早期就打造更好的平台。
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── CONTACT CARDS ── */}
        <section className="contact-entry">
          <div className="container">
            <div className="contact-entry__grid">
              <article className="contact-card">
                <div className="contact-card__label">商店專區</div>
                <h3 className="contact-card__title">與 Box It Up 建立合作</h3>
                <p className="contact-card__desc">
                  想將多餘庫存轉化為商機，並透過精選優惠吸引新客群嗎？
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=商店合作詢問"
                  className="contact-card__link"
                >
                  聯絡合作團隊 →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">開發者專區</div>
                <h3 className="contact-card__title">與我們一起打造</h3>
                <p className="contact-card__desc">
                  我們正在尋找有動力的早期協作者與學生，一起從零建立 Box It Up。
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=Box It Up 早期協作申請"
                  className="contact-card__link"
                >
                  介紹您自己 →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">一般詢問</div>
                <h3 className="contact-card__title">問題、想法或回饋</h3>
                <p className="contact-card__desc">
                  歡迎提供產品回饋、使用者問題、媒體合作機會，或任何值得討論的事項。
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=Box It Up 一般詢問"
                  className="contact-card__link"
                >
                  傳送訊息 →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM + INFO ── */}
        <section className="contact-main">
          <div className="container">
            <div className="contact-main__grid">
              <div className="contact-form-wrap">
                <h2 className="contact-block-title">傳送訊息給我們</h2>
                <p className="contact-block-subtitle">
                  填寫下方表單，我們將為您轉介至合適的負責人。
                </p>
                <ContactFormTw />
              </div>

              <div className="contact-info-wrap">
                <h2 className="contact-block-title">直接聯絡</h2>
                <p className="contact-block-subtitle">
                  偏好直接寄信嗎？請使用以下聯絡方式，我們會為您轉達至正確窗口。
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <strong>電子郵件</strong>
                    <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a>
                  </div>
                  <div className="contact-info-item">
                    <strong>電話</strong>
                    <span>+886 123 456 789</span>
                  </div>
                  <div className="contact-info-item">
                    <strong>地點</strong>
                    <span>台灣台北</span>
                  </div>
                </div>

                <div className="contact-faq">
                  <div className="contact-faq__item">
                    <strong>目前有開放正職職缺嗎？</strong>
                    <p>
                      我們目前以早期協作為主，致力於累積使用者與知名度。部分職缺可能以無償、專案制或探索性合作的形式開始。
                    </p>
                  </div>
                  <div className="contact-faq__item">
                    <strong>誰適合加入 Box It Up？</strong>
                    <p>
                      想獲得真實創業經歷、專案主導機會與作品集深度的學生與早期開發者，特別歡迎主動聯絡。
                    </p>
                  </div>
                  <div className="contact-faq__item">
                    <strong>通常多久會回覆？</strong>
                    <p>
                      我們會盡力在幾個工作天內回覆，實際時間視詢問類型與專案進度而定。
                    </p>
                  </div>
                </div>

                <div className="contact-socials">
                  <a href="#">Instagram</a>
                  <a href="#">LinkedIn</a>
                  <a href="#">Email</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
