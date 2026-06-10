'use client'

import { useState } from 'react'
import Link from 'next/link'
import './careers.css'

const JOBS = [
  {
    role: 'Software Engineer',
    dept: 'Engineering',
    location: 'Remote',
    city: 'Remote',
    type: 'Part-time / Project-based',
    description:
      'Help build the Box It Up platform — from the consumer-facing mobile app to the merchant dashboard and backend APIs. You will work closely with the founding team and have real ownership over features that users interact with every day.',
    responsibilities: [
      'Design and implement features across the Next.js web app and React Native mobile app',
      'Build and maintain Supabase database schemas, RLS policies, and server-side logic',
      'Contribute to API integrations (LINE Login, payment, maps)',
      'Participate in product discussions and shape technical decisions early',
    ],
    requirements: [
      'Experience with React, TypeScript, and modern frontend tooling',
      'Familiarity with backend concepts (REST APIs, databases, auth)',
      'Self-directed and comfortable in an early-stage startup environment',
      'Currently pursuing or recently completed a degree in CS or related field',
    ],
  },
  {
    role: 'Financial Analyst',
    dept: 'Finance',
    location: 'Remote',
    city: 'Remote',
    type: 'Part-time / Project-based',
    description:
      'Help us build a solid financial foundation for Box It Up. You will work on modelling our unit economics, preparing investor-ready materials, and ensuring we have clear visibility into revenue, costs, and growth metrics.',
    responsibilities: [
      'Develop and maintain financial models (unit economics, cash flow, projections)',
      'Prepare pitch deck financial slides and investor data room materials',
      'Track key business metrics and surface insights to the founding team',
      'Research pricing strategies and competitive benchmarks',
    ],
    requirements: [
      'Studying or recently graduated in Finance, Accounting, Economics, or similar',
      'Proficiency in Excel/Google Sheets; experience with financial modelling a plus',
      'Strong attention to detail and analytical thinking',
      'Interest in startups and consumer marketplaces',
    ],
  },
  {
    role: 'Social Media / Brand Marketing',
    dept: 'Marketing',
    location: 'Remote',
    city: 'Remote',
    type: 'Part-time / Project-based',
    description:
      'Own the Box It Up voice across social platforms. You will create content that builds our community, tells compelling stories about food waste reduction, and drives awareness among both consumers and local business owners.',
    responsibilities: [
      'Create and schedule content across Instagram, TikTok, and LinkedIn',
      'Develop a content calendar aligned with product launches and seasonal moments',
      'Engage with our community and respond to followers authentically',
      'Collaborate with the team on campaigns, partnerships, and influencer outreach',
    ],
    requirements: [
      'Active on social media with a sense for what resonates with Taiwanese audiences',
      'Strong written communication in Traditional or Simplified Chinese (and English a plus)',
      'Creative eye for visual content — photo, video, or graphic design skills welcome',
      'Passion for sustainability, food culture, or local community building',
    ],
  },
]

export default function CareersPage() {
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
                    <select
                      id="department"
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                    >
                      <option value="">All departments</option>
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="location">Location</label>
                    <select
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">All locations</option>
                      <option>Taiwan</option>
                      <option>Remote</option>
                    </select>
                  </div>

                  <div className="career-field">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">All cities</option>
                      <option>Taipei</option>
                      <option>Hsinchu</option>
                      <option>Remote</option>
                    </select>
                  </div>

                  <button
                    className="careers-search-btn"
                    type="button"
                    onClick={() => setExpanded(null)}
                  >
                    Search
                  </button>
                  <button className="careers-clear-btn" type="button" onClick={clearFilters}>
                    Clear
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
                ? 'No roles match your filters — try clearing them.'
                : `${filtered.length} open role${filtered.length !== 1 ? 's' : ''}`}
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
                        <h4 className="career-detail__heading">What you&apos;ll do</h4>
                        <ul className="career-detail__list">
                          {job.responsibilities.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="career-detail__heading">What we&apos;re looking for</h4>
                        <ul className="career-detail__list">
                          {job.requirements.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="career-detail__footer">
                      <Link
                        href={`/contact?role=${encodeURIComponent(job.role)}`}
                        className="btn btn--primary"
                      >
                        Apply for this role
                      </Link>
                      <span className="career-detail__note">
                        Mention the role in your message. We read every application.
                      </span>
                    </div>
                  </div>
                )}
              </div>
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
