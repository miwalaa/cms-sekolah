import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Students: CollectionConfig = {
  slug: 'students',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['fullName', 'studentId', 'class', 'status'],
    useAsTitle: 'fullName',
    group: 'School Management',
    description: 'Manage student records, enrollment, and academic information',
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
          name: 'studentId',
          type: 'text',
          required: true,
          unique: true,
          label: 'Student ID',
          admin: {
            width: '50%',
            description: 'Unique identifier for the student',
          },
        },
      ],
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
            width: '33%',
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
            width: '33%',
          },
        },
        {
          name: 'bloodType',
          type: 'select',
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'AB', value: 'AB' },
            { label: 'O', value: 'O' },
          ],
          label: 'Blood Type',
          admin: {
            width: '34%',
          },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Student Photo',
      admin: {
        description: 'Upload student photo (passport size recommended)',
      },
    },
    {
      type: 'collapsible',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'phone',
          type: 'text',
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
      label: 'Parent/Guardian Information',
      fields: [
        {
          name: 'parentName',
          type: 'text',
          required: true,
          label: 'Parent/Guardian Name',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'parentPhone',
              type: 'text',
              required: true,
              label: 'Parent Phone',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'parentEmail',
              type: 'email',
              label: 'Parent Email',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'parentOccupation',
          type: 'text',
          label: 'Parent Occupation',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Academic Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'class',
              type: 'relationship',
              relationTo: 'classes',
              required: true,
              label: 'Class',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'enrollmentDate',
              type: 'date',
              required: true,
              label: 'Enrollment Date',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'previousSchool',
          type: 'text',
          label: 'Previous School',
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Graduated', value: 'graduated' },
            { label: 'Transferred', value: 'transferred' },
          ],
          admin: {
            description: 'Current enrollment status',
          },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
      admin: {
        description: 'Any additional information about the student',
      },
    },
  ],
  timestamps: true,
}
