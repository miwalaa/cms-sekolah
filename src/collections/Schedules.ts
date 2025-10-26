import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Schedules: CollectionConfig = {
  slug: 'schedules',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'class', 'date', 'type'],
    useAsTitle: 'title',
    group: 'School Management',
    description: 'Manage class schedules, exams, and school events',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Schedule Title',
      admin: {
        description: 'e.g., Mathematics Exam, Sports Day, Parent-Teacher Meeting',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Schedule Type',
      options: [
        { label: 'Regular Class', value: 'regular_class' },
        { label: 'Exam', value: 'exam' },
        { label: 'Quiz', value: 'quiz' },
        { label: 'School Event', value: 'school_event' },
        { label: 'Holiday', value: 'holiday' },
        { label: 'Meeting', value: 'meeting' },
        { label: 'Extra Curricular', value: 'extra_curricular' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          label: 'Date',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
          admin: {
            width: '50%',
            description: 'For multi-day events',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startTime',
          type: 'text',
          required: true,
          label: 'Start Time',
          admin: {
            width: '50%',
            description: 'e.g., 09:00',
          },
        },
        {
          name: 'endTime',
          type: 'text',
          required: true,
          label: 'End Time',
          admin: {
            width: '50%',
            description: 'e.g., 11:00',
          },
        },
      ],
    },
    {
      name: 'class',
      type: 'relationship',
      relationTo: 'classes',
      label: 'Class',
      admin: {
        description: 'Leave empty for school-wide events',
      },
    },
    {
      name: 'teacher',
      type: 'relationship',
      relationTo: 'teachers',
      label: 'Teacher/Organizer',
      admin: {
        description: 'Teacher responsible for this schedule',
      },
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Subject',
      admin: {
        description: 'Applicable for classes and exams',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location/Room',
      admin: {
        description: 'Where the event will take place',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Additional details about the schedule',
      },
    },
    {
      name: 'isRecurring',
      type: 'checkbox',
      label: 'Recurring Event',
      defaultValue: false,
    },
    {
      name: 'recurringPattern',
      type: 'select',
      label: 'Recurring Pattern',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
      ],
      admin: {
        condition: (data) => data.isRecurring === true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'scheduled',
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Postponed', value: 'postponed' },
      ],
    },
    {
      name: 'notifyParents',
      type: 'checkbox',
      label: 'Notify Parents',
      defaultValue: false,
      admin: {
        description: 'Send notification to parents about this schedule',
      },
    },
  ],
  timestamps: true,
}
