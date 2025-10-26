'use client'

import React, { useEffect, useState } from 'react'

interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  activeAnnouncements: number
  recentActivities: Array<{
    id: string
    title: string
    type: string
    date: string
  }>
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    activeAnnouncements: 0,
    recentActivities: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch statistics from Payload API
        const [studentsRes, teachersRes, classesRes, announcementsRes] = await Promise.all([
          fetch('/api/students?limit=0'),
          fetch('/api/teachers?limit=0'),
          fetch('/api/classes?limit=0'),
          fetch('/api/announcements?where[status][equals]=published&limit=0'),
        ])

        const [students, teachers, classes, announcements] = await Promise.all([
          studentsRes.json(),
          teachersRes.json(),
          classesRes.json(),
          announcementsRes.json(),
        ])

        setStats({
          totalStudents: students.totalDocs || 0,
          totalTeachers: teachers.totalDocs || 0,
          totalClasses: classes.totalDocs || 0,
          activeAnnouncements: announcements.totalDocs || 0,
          recentActivities: [],
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">School Management Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's an overview of your school.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-students">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Students</p>
            <p className="stat-value">{stats.totalStudents}</p>
          </div>
        </div>

        <div className="stat-card stat-card-teachers">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Teachers</p>
            <p className="stat-value">{stats.totalTeachers}</p>
          </div>
        </div>

        <div className="stat-card stat-card-classes">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Classes</p>
            <p className="stat-value">{stats.totalClasses}</p>
          </div>
        </div>

        <div className="stat-card stat-card-announcements">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.5 5H19a2 2 0 0 1 2 2v8.5" />
              <path d="M17 11h-.5" />
              <path d="M19 19H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h.5" />
              <path d="M3 3v18" />
              <path d="M7 3v18" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Announcements</p>
            <p className="stat-value">{stats.activeAnnouncements}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="card-title">Quick Actions</h2>
          <div className="quick-actions">
            <a href="/admin/collections/students/create" className="action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Add New Student
            </a>
            <a href="/admin/collections/teachers/create" className="action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Add New Teacher
            </a>
            <a href="/admin/collections/announcements/create" className="action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              Create Announcement
            </a>
            <a href="/admin/collections/schedules/create" className="action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Add Schedule
            </a>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Important Links</h2>
          <div className="links-list">
            <a href="/admin/collections/students" className="link-item">
              View All Students
            </a>
            <a href="/admin/collections/teachers" className="link-item">
              View All Teachers
            </a>
            <a href="/admin/collections/classes" className="link-item">
              Manage Classes
            </a>
            <a href="/admin/collections/schedules" className="link-item">
              View Schedule
            </a>
            <a href="/admin/globals/school-settings" className="link-item">
              School Settings
            </a>
          </div>
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h3>Getting Started</h3>
          <p>
            Welcome to the School Management System. Use the sidebar navigation to manage students,
            teachers, classes, and more. Start by adding your school information in the Settings
            section.
          </p>
        </div>
      </div>
    </div>
  )
}
