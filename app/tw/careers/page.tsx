import type { Metadata } from 'next'
import '@/app/careers/careers.css'

export const metadata: Metadata = {
  title: 'Box It Up | 職缺',
  description: '加入 Box It Up — 工程、財務、行銷等職缺開放中。',
  icons: { icon: '/logo_icon.png' },
}

export default function TwCareersPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #111111 0%, #1a1a1a 100%)',
        color: 'rgba(255,255,255,0.92)',
        minHeight: '100vh',
      }}
    >
      <main>
        {/* ── HERO ── */}
        <section className="careers-hero">
          <div className="container">
            <div
              className="careers-hero__content"
              style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
            >
              <div className="careers-eyebrow">開放職缺</div>
              <h1 className="careers-title">
                加入我們，一起打造
                <br />
                Box It Up
              </h1>
              <p className="careers-subtitle">
                我們是一個早期創業專案，正在尋找有動力的學生與開發者，一起從零開始打造產品、共同成長。
              </p>

              <div className="careers-filter-wrap">
                <div className="careers-filter-grid">
                  <div className="career-field">
                    <label htmlFor="department">部門</label>
                    <select id="department">
                      <option>依部門篩選</option>
                      <option>產品</option>
                      <option>工程</option>
                      <option>行銷</option>
                      <option>營運</option>
                      <option>財務</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="location">工作地點</label>
                    <select id="location">
                      <option>依地點篩選</option>
                      <option>台灣</option>
                      <option>遠端</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="city">城市</label>
                    <select id="city">
                      <option>依城市篩選</option>
                      <option>台北</option>
                      <option>新竹</option>
                      <option>遠端</option>
                    </select>
                  </div>

                  <a href="#open-roles" className="careers-search-btn">搜尋</a>
                  <button className="careers-clear-btn" type="button">清除篩選</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OPEN ROLES ── */}
        <section className="careers-list" id="open-roles">
          <div className="container">
            <p className="careers-result-summary">
              搜尋結果：共 3 個職缺，涵蓋工程、財務與行銷
            </p>

            {[
              { role: '軟體工程師', dept: '工程', location: '遠端', city: '遠端' },
              { role: '財務分析師', dept: '財務', location: '遠端', city: '遠端' },
              { role: '社群媒體／品牌行銷', dept: '行銷', location: '遠端', city: '遠端' },
            ].map((job) => (
              <a key={job.role} href="#" className="career-row">
                <div className="career-role">{job.role}</div>
                <div className="career-meta">{job.dept}</div>
                <div className="career-meta">{job.location}</div>
                <div className="career-meta">{job.city}</div>
                <div className="career-arrow">›</div>
              </a>
            ))}
          </div>
        </section>

        <div className="careers-footer-note">
          我們正在尋找有想法的人，一起為使用者和商家創造真正的價值。
        </div>
      </main>
    </div>
  )
}
