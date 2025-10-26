import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Classes: CollectionConfig = {
  slug: 'classes',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['className', 'grade', 'academicYear', 'capacity'],
    useAsTitle: 'className',
    group: 'School Management',
    description: 'Manage classes, grades, and classroom assignments',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'className',
          type: 'text',
          required: true,
          label: 'Class Name',
          admin: {
            width: '50%',
            description: 'e.g., Class 10A, Grade 7B',
          },
        },
        {
          name: 'grade',
          type: 'select',
          required: true,
          label: 'Grade Level',
          options: [
            { label: 'Grade 1', value: 'grade_1' },
            { label: 'Grade 2', value: 'grade_2' },
            { label: 'Grade 3', value: 'grade_3' },
            { label: 'Grade 4', value: 'grade_4' },
            { label: 'Grade 5', value: 'grade_5' },
            { label: 'Grade 6', value: 'grade_6' },
            { label: 'Grade 7', value: 'grade_7' },
            { label: 'Grade 8', value: 'grade_8' },
            { label: 'Grade 9', value: 'grade_9' },
            { label: 'Grade 10', value: 'grade_10' },
            { label: 'Grade 11', value: 'grade_11' },
            { label: 'Grade 12', value: 'grade_12' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'academicYear',
          type: 'text',
          required: true,
          label: 'Academic Year',
          admin: {
            width: '50%',
            description: 'e.g., 2024/2025',
          },
        },
        {
          name: 'section',
          type: 'text',
          label: 'Section',
          admin: {
            width: '50%',
            description: 'e.g., A, B, C',
          },
        },
      ],
    },
    {
      name: 'classTeacher',
      type: 'relationship',
      relationTo: 'teachers',
      required: true,
      label: 'Class Teacher',
      admin: {
        description: 'Primary teacher responsible for this class',
      },
    },
    {
      name: 'assistantTeachers',
      type: 'relationship',
      relationTo: 'teachers',
      hasMany: true,
      label: 'Assistant Teachers',
      admin: {
        description: 'Additional teachers assigned to this class',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'capacity',
          type: 'number',
          required: true,
          defaultValue: 30,
          label: 'Maximum Capacity',
          admin: {
            width: '50%',
            description: 'Maximum number of students',
          },
        },
        {
          name: 'currentEnrollment',
          type: 'number',
          defaultValue: 0,
          label: 'Current Enrollment',
          admin: {
            width: '50%',
            description: 'Current number of enrolled students',
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'classroom',
      type: 'text',
      label: 'Classroom/Room Number',
      admin: {
        description: 'Physical location of the class',
      },
    },
    {
      name: 'schedule',
      type: 'array',
      label: 'Class Schedule',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'day',
              type: 'select',
              required: true,
              options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
              ],
              admin: {
                width: '33%',
              },
            },
            {
              name: 'startTime',
              type: 'text',
              required: true,
              label: 'Start Time',
              admin: {
                width: '33%',
                description: 'e.g., 08:00',
              },
            },
            {
              name: 'endTime',
              type: 'text',
              required: true,
              label: 'End Time',
              admin: {
                width: '34%',
                description: 'e.g., 14:00',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'subjects',
      type: 'array',
      label: 'Subjects',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'subjectName',
              type: 'text',
              required: true,
              label: 'Subject Name',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'teacher',
              type: 'relationship',
              relationTo: 'teachers',
              label: 'Subject Teacher',
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        description: 'Current status of the class',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Class Description',
      admin: {
        description: 'Additional information about the class',
      },
    },
  ],
  timestamps: true,
}
