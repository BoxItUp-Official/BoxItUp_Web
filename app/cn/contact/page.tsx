import type { Metadata } from 'next'
import '@/app/contact/contact.css'
import ContactFormCn from './ContactFormCn'

export const metadata: Metadata = {
  title: 'Box It Up | 联系我们',
  description: '联系 Box It Up — 商店合作、早期协作或一般咨询，欢迎来信。',
  icons: { icon: '/logo_icon.png' },
}

export default function CnContactPage() {
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
                <div className="contact-eyebrow">联系我们</div>
                <h1 className="contact-title">
                  让我们聊聊 Box It Up 接下来能创造什么
                </h1>
                <p className="contact-subtitle">
                  无论您是有兴趣合作的商店、想参与建设的学生，还是有意见与想法的用户，我们都很乐意听您分享。
                </p>
              </div>

              <aside className="contact-hero__aside">
                <h2 className="contact-hero__aside-title">最好的联系理由</h2>
                <div className="contact-hero__aside-list">
                  <div className="contact-hero__aside-item">
                    <strong>商店合作</strong>
                    <span>
                      探索 Box It Up 如何帮助您的商店提升曝光度，并创造更有价值的优惠方案。
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>早期协作</strong>
                    <span>
                      学生与开发者可以联系我们，获得真实的创业经历与项目主导机会。
                    </span>
                  </div>
                  <div className="contact-hero__aside-item">
                    <strong>产品反馈</strong>
                    <span>
                      分享您的想法、用户痛点或建议，帮助我们在早期就打造更好的平台。
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
                <div className="contact-card__label">商店专区</div>
                <h3 className="contact-card__title">与 Box It Up 建立合作</h3>
                <p className="contact-card__desc">
                  想将多余库存转化为商机，并通过精选优惠吸引新客群吗？
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=商店合作咨询"
                  className="contact-card__link"
                >
                  联系合作团队 →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">开发者专区</div>
                <h3 className="contact-card__title">与我们一起打造</h3>
                <p className="contact-card__desc">
                  我们正在寻找有动力的早期协作者与学生，一起从零建立 Box It Up。
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=Box It Up 早期协作申请"
                  className="contact-card__link"
                >
                  介绍您自己 →
                </a>
              </article>

              <article className="contact-card">
                <div className="contact-card__label">一般咨询</div>
                <h3 className="contact-card__title">问题、想法或反馈</h3>
                <p className="contact-card__desc">
                  欢迎提供产品反馈、用户问题、媒体合作机会，或任何值得讨论的事项。
                </p>
                <a
                  href="mailto:boxitupofficial@gmail.com?subject=Box It Up 一般咨询"
                  className="contact-card__link"
                >
                  发送消息 →
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
                <h2 className="contact-block-title">发送消息给我们</h2>
                <p className="contact-block-subtitle">
                  填写下方表单，我们将为您转介至合适的负责人。
                </p>
                <ContactFormCn />
              </div>

              <div className="contact-info-wrap">
                <h2 className="contact-block-title">直接联系</h2>
                <p className="contact-block-subtitle">
                  更喜欢直接发邮件？请使用以下联系方式，我们会为您转达至正确窗口。
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <strong>电子邮件</strong>
                    <a href="mailto:boxitupofficial@gmail.com">boxitupofficial@gmail.com</a>
                  </div>
                  <div className="contact-info-item">
                    <strong>电话</strong>
                    <span>+886 123 456 789</span>
                  </div>
                  <div className="contact-info-item">
                    <strong>地点</strong>
                    <span>台湾台北</span>
                  </div>
                </div>

                <div className="contact-faq">
                  <div className="contact-faq__item">
                    <strong>目前有开放正职职位吗？</strong>
                    <p>
                      我们目前以早期协作为主，致力于积累用户与知名度。部分职位可能以无偿、项目制或探索性合作的形式开始。
                    </p>
                  </div>
                  <div className="contact-faq__item">
                    <strong>谁适合加入 Box It Up？</strong>
                    <p>
                      想获得真实创业经历、项目主导机会与作品集深度的学生与早期开发者，特别欢迎主动联系。
                    </p>
                  </div>
                  <div className="contact-faq__item">
                    <strong>通常多久会回复？</strong>
                    <p>
                      我们会尽力在几个工作日内回复，实际时间视咨询类型与项目进度而定。
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
