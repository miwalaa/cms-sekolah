import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Teachers: CollectionConfig = {
  slug: 'teachers',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['fullName', 'employeeId', 'subject', 'status'],
    useAsTitle: 'fullName',
    group: 'School Management',
    description: 'Manage teacher profiles, subjects, and employment information',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          label: 'Full Name',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'employeeId',
          type: 'text',
          required: true,
          unique: true,
          label: 'Employee ID',
          admin: {
            width: '50%',
            description: 'Unique identifier for the teacher',
          },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Teacher Photo',
      admin: {
        description: 'Upload teacher photo',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'dateOfBirth',
          type: 'date',
          required: true,
          label: 'Date of Birth',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'gender',
          type: 'select',
          required: true,
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email Address',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number',
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          label: 'Home Address',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'city',
              type: 'text',
              label: 'City',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'Postal Code',
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Professional Information',
      fields: [
        {
          name: 'subject',
          type: 'text',
          required: true,
          label: 'Primary Subject',
          admin: {
            description: 'Main subject taught by the teacher',
          },
        },
        {
          name: 'additionalSubjects',
          type: 'array',
          label: 'Additional Subjects',
          fields: [
            {
              name: 'subjectName',
              type: 'text',
              label: 'Subject Name',
            },
          ],
        },
        {
          name: 'qualification',
          type: 'select',
          required: true,
          label: 'Highest Qualification',
          options: [
            { label: 'High School Diploma', value: 'high_school' },
            { label: 'Associate Degree', value: 'associate' },
            { label: "Bachelor's Degree", value: 'bachelor' },
            { label: "Master's Degree", value: 'master' },
            { label: 'Doctorate', value: 'doctorate' },
          ],
        },
        {
          name: 'certifications',
          type: 'textarea',
          label: 'Certifications',
          admin: {
            description: 'List any teaching certifications or licenses',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'joinDate',
              type: 'date',
              required: true,
              label: 'Join Date',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'yearsOfExperience',
              type: 'number',
              label: 'Years of Experience',
              admin: {
                width: '50%',
                description: 'Total years of teaching experience',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Employment Details',
      fields: [
        {
          name: 'employmentType',
          type: 'select',
          required: true,
          defaultValue: 'full_time',
          label: 'Employment Type',
          options: [
            { label: 'Full Time', value: 'full_time' },
            { label: 'Part Time', value: 'part_time' },
            { label: 'Contract', value: 'contract' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'On Leave', value: 'on_leave' },
            { label: 'Resigned', value: 'resigned' },
            { label: 'Retired', value: 'retired' },
          ],
          admin: {
            description: 'Current employment status',
          },
        },
        {
          name: 'assignedClasses',
          type: 'relationship',
          relationTo: 'classes',
          hasMany: true,
          label: 'Assigned Classes',
          admin: {
            description: 'Classes currently taught by this teacher',
          },
        },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
      admin: {
        description: 'Brief biography or introduction',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
      admin: {
        description: 'Any additional information about the teacher',
      },
    },
  ],
  timestamps: true,
}
