'use client'

import { useState } from 'react'
import Link from 'next/link'
import '@/app/careers/careers.css'

const JOBS = [
  {
    role: '软件工程师',
    dept: '工程',
    location: '远程',
    city: '远程',
    type: '兼职 / 项目合作',
    description:
      '协助打造 Box It Up 平台——从消费者端的移动应用，到商家后台与后端 API。你将与创始团队紧密合作，对用户每天使用的功能拥有真实的主导权。',
    responsibilities: [
      '设计并实现 Next.js 网页应用与 React Native 移动端的功能',
      '构建与维护 Supabase 数据库结构、RLS 策略及服务端逻辑',
      '参与 API 集成（LINE Login、支付、地图）',
      '参与产品讨论，在早期阶段共同塑造技术决策',
    ],
    requirements: [
      '熟悉 React、TypeScript 及现代前端工具链',
      '具备后端基础概念（REST API、数据库、身份验证）',
      '自我驱动，适应早期创业环境',
      '目前就读或刚完成计算机科学或相关专业学位',
    ],
  },
  {
    role: '财务分析师',
    dept: '财务',
    location: '远程',
    city: '远程',
    type: '兼职 / 项目合作',
    description:
      '协助建立 Box It Up 稳固的财务基础。你将负责构建单位经济模型、准备投资人资料，并确保团队对营收、成本与增长指标有清晰的掌握。',
    responsibilities: [
      '开发并维护财务模型（单位经济、现金流、预测）',
      '准备 Pitch Deck 财务页面与投资人数据室内容',
      '追踪关键业务指标并向创始团队提供洞察',
      '研究定价策略与竞品基准',
    ],
    requirements: [
      '主修财务、会计、经济或相关专业',
      '熟练使用 Excel／Google Sheets；具备财务建模经验者优先',
      '高度细心与分析思维',
      '对创业公司与消费市场有兴趣',
    ],
  },
  {
    role: '社交媒体／品牌营销',
    dept: '营销',
    location: '远程',
    city: '远程',
    type: '兼职 / 项目合作',
    description:
      '主导 Box It Up 在社交平台上的声音。你将创作能建立社群、传达食物减浪费理念的内容，并提升消费者与本地商家的品牌认知。',
    responsibilities: [
      '在 Instagram、TikTok 及 LinkedIn 上制作并安排内容发布',
      '依产品发布与季节节点制定内容日历',
      '真诚地与社群互动并回复粉丝',
      '与团队合作执行活动、合作伙伴计划与 KOL 外联',
    ],
    requirements: [
      '活跃于社交媒体，了解台湾受众喜好',
      '中文写作能力强（简体或繁体均可，具备英文能力佳）',
      '具备视觉内容创作眼光——欢迎摄影、视频或设计技能',
      '热爱可持续发展、饮食文化或本地社区建设',
    ],
  },
]

export default function CnCareersPage() {
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
                    <select
                      id="department"
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                    >
                      <option value="">所有部门</option>
                      <option value="工程">工程</option>
                      <option value="营销">营销</option>
                      <option value="财务">财务</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="location">工作地点</label>
                    <select
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">所有地点</option>
                      <option value="台湾">台湾</option>
                      <option value="远程">远程</option>
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
                      <option value="远程">远程</option>
                    </select>
                  </div>

                  <button
                    className="careers-search-btn"
                    type="button"
                    onClick={() => setExpanded(null)}
                  >
                    搜索
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
                ? '暂无符合条件的职位，请尝试清除筛选条件。'
                : `共 ${filtered.length} 个开放职位`}
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
                        <h4 className="career-detail__heading">工作内容</h4>
                        <ul className="career-detail__list">
                          {job.responsibilities.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="career-detail__heading">我们在找的人</h4>
                        <ul className="career-detail__list">
                          {job.requirements.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="career-detail__footer">
                      <Link
                        href={`/cn/contact?role=${encodeURIComponent(job.role)}`}
                        className="btn btn--primary"
                      >
                        申请该职位
                      </Link>
                      <span className="career-detail__note">
                        请在消息中注明申请职位，我们会阅读每一份申请。
                      </span>
                    </div>
                  </div>
                )}
              </div>
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
