export type InquiryField =
  | {
      id: string
      label: string
      placeholder: string
      type: 'text' | 'email'
      required?: boolean
    }
  | {
      id: string
      label: string
      placeholder: string
      type: 'select'
      required?: boolean
      options: string[]
    }
  | {
      id: string
      label: string
      placeholder: string
      type: 'textarea'
      required?: boolean
    }

export type InquiryType = {
  id: 'consumer' | 'clinic' | 'distributor'
  title: string
  shortDescription: string
  responseTime: string
  emailSubjectPrefix: string
  fields: InquiryField[]
}

export const inquiryTypes: InquiryType[] = [
  {
    id: 'consumer',
    title: 'Consumer',
    shortDescription: 'Product guidance, usage, or order support.',
    responseTime: 'Within 24 hours',
    emailSubjectPrefix: 'Consumer Enquiry',
    fields: [
      { id: 'fullName', label: 'Full Name', placeholder: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email', placeholder: 'Email Address', type: 'email', required: true },
      { id: 'orderNumber', label: 'Order Number', placeholder: 'Order number (optional)', type: 'text' },
      { id: 'subject', label: 'Subject', placeholder: 'Subject', type: 'text', required: true },
      { id: 'message', label: 'Message', placeholder: 'Briefly describe your enquiry', type: 'textarea', required: true },
    ],
  },
  {
    id: 'clinic',
    title: 'Clinic / Practitioner',
    shortDescription: 'Clinical questions, practitioner support, or partnership interest.',
    responseTime: 'Within 12 hours',
    emailSubjectPrefix: 'Clinic / Practitioner Enquiry',
    fields: [
      { id: 'title', label: 'Title', placeholder: 'Professional Title', type: 'text', required: true },
      { id: 'fullName', label: 'Full Name', placeholder: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email', placeholder: 'Professional email', type: 'email', required: true },
      { id: 'clinicName', label: 'Clinic Name', placeholder: 'Clinic or practice name', type: 'text', required: true },
      {
        id: 'areaOfInterest',
        label: 'Area of Interest',
        placeholder: 'Select Area of Interest',
        type: 'select',
        required: true,
        options: ['Clinical dossier', 'Practitioner education', 'Wholesale enquiry', 'Co-branded materials'],
      },
      { id: 'subject', label: 'Subject', placeholder: 'Subject', type: 'text', required: true },
      { id: 'message', label: 'Message', placeholder: 'Briefly describe your enquiry', type: 'textarea', required: true },
    ],
  },
  {
    id: 'distributor',
    title: 'Distributor / Partner',
    shortDescription: 'Wholesale, territory, or strategic partnership enquiries.',
    responseTime: 'Within 6 hours',
    emailSubjectPrefix: 'Distributor / Partner Enquiry',
    fields: [
      { id: 'fullName', label: 'Full Name', placeholder: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email', placeholder: 'Business email', type: 'email', required: true },
      { id: 'companyName', label: 'Company Name', placeholder: 'Company name', type: 'text', required: true },
      { id: 'countryTerritory', label: 'Country / Territory', placeholder: 'Country or territory', type: 'text', required: true },
      { id: 'subject', label: 'Subject', placeholder: 'Subject', type: 'text', required: true },
      { id: 'message', label: 'Message', placeholder: 'Briefly describe your enquiry', type: 'textarea', required: true },
    ],
  },
]

export function getInquiryType(id: InquiryType['id']) {
  return inquiryTypes.find((item) => item.id === id) ?? inquiryTypes[0]
}
