'use client'

import { useState } from 'react'
import Link from 'next/link'
import '@/app/careers/careers.css'

const JOBS = [
  {
    role: '軟體工程師',
    dept: '工程',
    location: '遠端',
    city: '遠端',
    type: '兼職 / 專案合作',
    description:
      '協助打造 Box It Up 平台——從消費者端的行動應用，到商家後台與後端 API。你將與創辦團隊緊密合作，對用戶每天使用的功能擁有真實的主導權。',
    responsibilities: [
      '設計並實作 Next.js 網頁應用與 React Native 行動端的功能',
      '建置與維護 Supabase 資料庫結構、RLS 政策及伺服器端邏輯',
      '參與 API 整合（LINE Login、金流、地圖）',
      '參與產品討論，在早期階段共同形塑技術決策',
    ],
    requirements: [
      '熟悉 React、TypeScript 及現代前端工具鏈',
      '具備後端基礎概念（REST API、資料庫、身份驗證）',
      '自我驅動，適應早期新創環境',
      '目前就讀或剛完成資工或相關科系學位',
    ],
  },
  {
    role: '財務分析師',
    dept: '財務',
    location: '遠端',
    city: '遠端',
    type: '兼職 / 專案合作',
    description:
      '協助建立 Box It Up 穩固的財務基礎。你將負責建構單位經濟模型、準備投資人資料，並確保團隊對營收、成本與成長指標有清晰的掌握。',
    responsibilities: [
      '開發並維護財務模型（單位經濟、現金流、預測）',
      '準備 Pitch Deck 財務頁面與投資人資料室內容',
      '追蹤關鍵業務指標並向創辦團隊提供洞察',
      '研究定價策略與競品標竿',
    ],
    requirements: [
      '主修財務、會計、經濟或相關科系',
      '熟練使用 Excel／Google Sheets；具備財務建模經驗者佳',
      '高度細心與分析思維',
      '對新創與消費市場有興趣',
    ],
  },
  {
    role: '社群媒體／品牌行銷',
    dept: '行銷',
    location: '遠端',
    city: '遠端',
    type: '兼職 / 專案合作',
    description:
      '主導 Box It Up 在社群平台上的聲音。你將創作能建立社群、傳達食物減廢理念的內容，並提升消費者與在地商家的品牌認知。',
    responsibilities: [
      '在 Instagram、TikTok 及 LinkedIn 上製作並排程內容',
      '依產品發布與節慶節點制定內容行事曆',
      '真誠地與社群互動並回覆粉絲',
      '與團隊合作執行活動、合作夥伴計畫與網紅外聯',
    ],
    requirements: [
      '活躍於社群媒體，了解台灣受眾喜好',
      '中文書寫能力強（繁體或簡體均可，具備英文能力佳）',
      '具備視覺內容創作眼光——歡迎攝影、影片或設計技能',
      '熱愛永續發展、飲食文化或在地社群建設',
    ],
  },
]

export default function TwCareersPage() {
  const [dept, setDept] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = JOBS.filter(
    (j) =>
      (!dept || j.dept === dept) &&
      (!location || j.location === location) &&
      (!city || j.city === city)
  )

  function clearFilters() {
    setDept('')
    setLocation('')
    setCity('')
  }

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
                    <select
                      id="department"
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                    >
                      <option value="">所有部門</option>
                      <option value="工程">工程</option>
                      <option value="行銷">行銷</option>
                      <option value="財務">財務</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="location">工作地點</label>
                    <select
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">所有地點</option>
                      <option value="台灣">台灣</option>
                      <option value="遠端">遠端</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="city">城市</label>
                    <select
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">所有城市</option>
                      <option value="台北">台北</option>
                      <option value="新竹">新竹</option>
                      <option value="遠端">遠端</option>
                    </select>
                  </div>

                  <button
                    className="careers-search-btn"
                    type="button"
                    onClick={() => setExpanded(null)}
                  >
                    搜尋
                  </button>
                  <button className="careers-clear-btn" type="button" onClick={clearFilters}>
                    清除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OPEN ROLES ── */}
        <section className="careers-list" id="open-roles">
          <div className="container">
            <p className="careers-result-summary">
              {filtered.length === 0
                ? '目前沒有符合條件的職缺，請嘗試清除篩選條件。'
                : `共 ${filtered.length} 個開放職缺`}
            </p>

            {filtered.map((job) => (
              <div key={job.role}>
                <button
                  className="career-row"
                  type="button"
                  onClick={() => setExpanded(expanded === job.role ? null : job.role)}
                  aria-expanded={expanded === job.role}
                >
                  <div className="career-role">{job.role}</div>
                  <div className="career-meta">{job.dept}</div>
                  <div className="career-meta">{job.location}</div>
                  <div className="career-meta career-meta--type">{job.type}</div>
                  <div className="career-arrow">{expanded === job.role ? '∨' : '›'}</div>
                </button>

                {expanded === job.role && (
                  <div className="career-detail">
                    <p className="career-detail__desc">{job.description}</p>

                    <div className="career-detail__cols">
                      <div>
                        <h4 className="career-detail__heading">工作內容</h4>
                        <ul className="career-detail__list">
                          {job.responsibilities.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="career-detail__heading">我們在找的人</h4>
                        <ul className="career-detail__list">
                          {job.requirements.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="career-detail__footer">
                      <Link
                        href={`/tw/contact?role=${encodeURIComponent(job.role)}`}
                        className="btn btn--primary"
                      >
                        應徵這個職缺
                      </Link>
                      <span className="career-detail__note">
                        請在訊息中告知應徵職缺。我們會閱讀每一份申請。
                      </span>
                    </div>
                  </div>
                )}
              </div>
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
