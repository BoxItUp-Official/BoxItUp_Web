import type { Metadata } from 'next'
import '@/app/careers/careers.css'

export const metadata: Metadata = {
  title: 'Box It Up | 职位',
  description: '加入 Box It Up — 工程、财务、营销等职位招募中。',
  icons: { icon: '/logo_icon.png' },
}

export default function CnCareersPage() {
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
              <div className="careers-eyebrow">开放职位</div>
              <h1 className="careers-title">
                加入我们，共同打造
                <br />
                Box It Up
              </h1>
              <p className="careers-subtitle">
                我们是一个早期创业项目，正在寻找有动力的学生与开发者，从零开始一起打造产品、共同成长。
              </p>

              <div className="careers-filter-wrap">
                <div className="careers-filter-grid">
                  <div className="career-field">
                    <label htmlFor="department">部门</label>
                    <select id="department">
                      <option>按部门筛选</option>
                      <option>产品</option>
                      <option>工程</option>
                      <option>营销</option>
                      <option>运营</option>
                      <option>财务</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="location">工作地点</label>
                    <select id="location">
                      <option>按地点筛选</option>
                      <option>台湾</option>
                      <option>远程</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="city">城市</label>
                    <select id="city">
                      <option>按城市筛选</option>
                      <option>台北</option>
                      <option>新竹</option>
                      <option>远程</option>
                    </select>
                  </div>

                  <a href="#open-roles" className="careers-search-btn">搜索</a>
                  <button className="careers-clear-btn" type="button">清除筛选</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OPEN ROLES ── */}
        <section className="careers-list" id="open-roles">
          <div className="container">
            <p className="careers-result-summary">
              搜索结果：共 3 个职位，涵盖工程、财务与营销
            </p>

            {[
              { role: '软件工程师', dept: '工程', location: '远程', city: '远程' },
              { role: '财务分析师', dept: '财务', location: '远程', city: '远程' },
              { role: '社交媒体／品牌营销', dept: '营销', location: '远程', city: '远程' },
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
          我们正在寻找有想法的人，一起为用户和商家创造真正的价值。
        </div>
      </main>
    </div>
  )
}
