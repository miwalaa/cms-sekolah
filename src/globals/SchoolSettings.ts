import type { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const SchoolSettings: GlobalConfig = {
  slug: 'school-settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
    description: 'Configure school profile, contact information, and general settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'School Profile',
          fields: [
            {
              name: 'schoolName',
              type: 'text',
              required: true,
              label: 'School Name',
            },
            {
              name: 'schoolLogo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'School Logo',
              admin: {
                description: 'Upload school logo (recommended: square, min 200x200px)',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'School Tagline',
              admin: {
                description: 'Short motto or tagline',
              },
            },
            {
              name: 'aboutSchool',
              type: 'textarea',
              label: 'About School',
              admin: {
                description: 'Brief description of the school',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'establishedYear',
                  type: 'number',
                  label: 'Established Year',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'affiliationNumber',
                  type: 'text',
                  label: 'Affiliation Number',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'principalName',
              type: 'text',
              label: 'Principal Name',
            },
            {
              name: 'principalMessage',
              type: 'textarea',
              label: 'Principal\'s Message',
            },
            {
              name: 'principalPhoto',
              type: 'upload',
              relationTo: 'media',
              label: 'Principal\'s Photo',
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'address',
              type: 'textarea',
              required: true,
              label: 'School Address',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                  label: 'City',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'state',
                  type: 'text',
                  label: 'State/Province',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'postalCode',
                  type: 'text',
                  required: true,
                  label: 'Postal Code',
                  admin: {
                    width: '34%',
                  },
                },
              ],
            },
            {
              name: 'country',
              type: 'text',
              required: true,
              label: 'Country',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phoneNumber',
                  type: 'text',
                  required: true,
                  label: 'Phone Number',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'alternatePhone',
                  type: 'text',
                  label: 'Alternate Phone',
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
                  name: 'email',
                  type: 'email',
                  required: true,
                  label: 'Email Address',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'website',
                  type: 'text',
                  label: 'Website URL',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'mapLocation',
              type: 'text',
              label: 'Google Maps Embed URL',
              admin: {
                description: 'Embed URL from Google Maps',
              },
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
            },
            {
              name: 'twitter',
              type: 'text',
              label: 'Twitter/X URL',
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'youtube',
              type: 'text',
              label: 'YouTube URL',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
          ],
        },
        {
          label: 'Academic Settings',
          fields: [
            {
              name: 'currentAcademicYear',
              type: 'text',
              required: true,
              label: 'Current Academic Year',
              admin: {
                description: 'e.g., 2024/2025',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'academicYearStart',
                  type: 'date',
                  label: 'Academic Year Start Date',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'academicYearEnd',
                  type: 'date',
                  label: 'Academic Year End Date',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'workingDays',
              type: 'select',
              hasMany: true,
              required: true,
              label: 'Working Days',
              options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'schoolStartTime',
                  type: 'text',
                  label: 'School Start Time',
                  admin: {
                    width: '50%',
                    description: 'e.g., 08:00',
                  },
                },
                {
                  name: 'schoolEndTime',
                  type: 'text',
                  label: 'School End Time',
                  admin: {
                    width: '50%',
                    description: 'e.g., 14:00',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'System Settings',
          fields: [
            {
              name: 'timezone',
              type: 'text',
              label: 'Timezone',
              defaultValue: 'Asia/Jakarta',
              admin: {
                description: 'e.g., Asia/Jakarta, America/New_York',
              },
            },
            {
              name: 'dateFormat',
              type: 'select',
              label: 'Date Format',
              defaultValue: 'DD/MM/YYYY',
              options: [
                { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
                { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
                { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
              ],
            },
            {
              name: 'language',
              type: 'select',
              label: 'Default Language',
              defaultValue: 'id',
              options: [
                { label: 'English', value: 'en' },
                { label: 'Indonesian', value: 'id' },
              ],
            },
            {
              name: 'maintenanceMode',
              type: 'checkbox',
              label: 'Maintenance Mode',
              defaultValue: false,
              admin: {
                description: 'Enable to show maintenance message on frontend',
              },
            },
            {
              name: 'maintenanceMessage',
              type: 'textarea',
              label: 'Maintenance Message',
              admin: {
                condition: (data) => data.maintenanceMode === true,
              },
            },
          ],
        },
      ],
    },
  ],
}
