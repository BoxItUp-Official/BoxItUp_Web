import type { Metadata } from 'next'
import './careers.css'

export const metadata: Metadata = {
  title: 'Box It Up | Careers',
  description: 'Join us in building Box It Up — open positions in Engineering, Finance, and Marketing.',
  icons: { icon: '/logo_icon.png' },
}

export default function CareersPage() {
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
              <div className="careers-eyebrow">Open Positions</div>
              <h1 className="careers-title">
                Join us in building
                <br />
                Box It Up
              </h1>
              <p className="careers-subtitle">
                We&apos;re an early-stage project looking for driven students and builders who want
                to grow something from the ground up — and grow with it.
              </p>

              <div className="careers-filter-wrap">
                <div className="careers-filter-grid">
                  <div className="career-field">
                    <label htmlFor="department">Department</label>
                    <select id="department">
                      <option>Filter by department</option>
                      <option>Product</option>
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                      <option>Finance</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="location">Location</label>
                    <select id="location">
                      <option>Filter by location</option>
                      <option>Taiwan</option>
                      <option>Remote</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="city">City</label>
                    <select id="city">
                      <option>Filter by city</option>
                      <option>Taipei</option>
                      <option>Hsinchu</option>
                      <option>Remote</option>
                    </select>
                  </div>

                  <a href="#open-roles" className="careers-search-btn">Search</a>
                  <button className="careers-clear-btn" type="button">Clear results</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OPEN ROLES ── */}
        <section className="careers-list" id="open-roles">
          <div className="container">
            <p className="careers-result-summary">
              Search result: 3 jobs across Engineering, Finance, and Marketing
            </p>

            {[
              { role: 'Software Engineer', dept: 'Engineering', location: 'Remote', city: 'Remote' },
              { role: 'Financial Analyst', dept: 'Finance', location: 'Remote', city: 'Remote' },
              { role: 'Social Media / Brand Marketing', dept: 'Marketing', location: 'Remote', city: 'Remote' },
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
          We&apos;re looking for thoughtful people who want to build real value for users and
          businesses.
        </div>
      </main>
    </div>
  )
}
