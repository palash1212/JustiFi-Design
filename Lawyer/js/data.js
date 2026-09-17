/* ==========================================================
   js/data.js — unified shared mock data
   Client-side (LAWYERS) + Advocate Portal (ADVOCATE_DATA)
========================================================== */

/* ---------- CLIENT-SIDE ---------- */
var LAWYERS = [
  { id: "Br-1", name: "Br. Arefin Shumit", dept: "Corporate", fee: "৳3,500",
    img: "images/shumit.png",
    about: "Corporate lawyer advising on tax, VAT, and business structuring for top-tier firms with over 10 years of experience." },
  { id: "Br-2", name: "Br. Ashraf Hossain", dept: "Corporate", fee: "৳2,500",
    img: "images/ashraf.png",
    about: "Specializes in criminal law, mediation and IPR settlements" },
  { id: "Br-3", name: "Br. Mimo", dept: "Property", fee: "৳1,800",
    img: "images/mimo.png",
    about: "Land and property expert handling title verification, registration, and dispute resolution." },
  { id: "Br-4", name: "Br. Shakil", dept: "Corporate", fee: "৳3,000",
    img: "images/shakil.png",
    about: "Renowned corporate attorney with expertise in cross-border transactions and compliance." }
];

var BOOKING_DATES = ["Fri 28", "Sat 29", "Sun 30", "Mon 31", "Tue 1"];
var BOOKING_SLOTS = ["10:00 AM","10:30 AM","11:30 AM","2:00 PM","3:00 PM","4:30 PM"];

function findLawyer(idOrName) {
  return LAWYERS.find(function (l) {
    return l.id === idOrName || l.name === idOrName;
  }) || LAWYERS[0];
}

function lawyerCardHTML(l) {
  var rating = (4.5 + Math.random() * 0.5).toFixed(1);
  var exp = Math.floor(8 + Math.random() * 17) + "+ Years Experience";
  var practiceTags = {
    Family: ["Family Law", "Mediation"],
    Corporate: ["Corporate Law", "VAT/Tax"],
    Property: ["Land Disputes", "Property Verification"],
    Criminal: ["Criminal Law", "Bail Petitions"]
  }[l.dept] || ["General Practice"];

  var photoHtml = l.img
    ? '<img src="' + l.img + '" alt="' + l.name + '" class="w-full h-full object-cover" />'
    : '<div class="w-full h-full bg-surface-container flex items-center justify-center text-6xl text-surface-variant">' + (l.init || "?") + '</div>';

  return (
    '<div class="bg-white rounded-2xl overflow-hidden legal-soft-shadow border border-surface-variant/50 flex flex-col">' +
    '<div class="h-64 relative"><div class="w-full h-full">' + photoHtml + '</div>' +
    '<div class="absolute top-4 right-4 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200">' +
    '<span class="material-symbols-outlined text-xs" style="font-variation-settings:\'FILL\' 1;">verified</span> Verified Sanad</div></div>' +
    '<div class="p-6 flex-1 flex flex-col">' +
    '<div class="flex justify-between items-start mb-2">' +
    '<h4 class="font-headline-md text-headline-md text-primary">' + l.name + '</h4>' +
    '<div class="flex items-center text-tertiary-container">' +
    '<span class="material-symbols-outlined text-sm" style="font-variation-settings:\'FILL\' 1;">star</span>' +
    '<span class="text-sm font-bold ml-1">' + rating + '</span></div></div>' +
    '<p class="text-caption text-on-surface-variant font-label-md mb-4 uppercase tracking-tighter">' + exp + '</p>' +
    '<div class="flex flex-wrap gap-2 mb-6">' +
    practiceTags.map(function (t) {
      return '<span class="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-xs">' + t + '</span>';
    }).join("") + '</div>' +
    '<a href="consultancy-booking.html?lawyer=' + l.id + '" class="mt-auto w-full bg-tertiary-fixed-dim text-primary font-label-md text-label-md py-3 rounded-xl hover:shadow-lg transition-all text-center">Book Consultation ' + l.fee + '</a>' +
    '</div></div>'
  );
}

/* ---------- ADVOCATE PORTAL ---------- */
var ADVOCATE_DATA = {
  upcoming: [
    { id: 201, clientName: 'Farhana Ahmed', clientInitials: 'FA',
      clientPhone: '+880 1711-444444', clientEmail: 'farhana@example.com',
      matterType: 'Property Dispute', service: 'Legal Consultation',
      mode: 'Online Video Call',
      scheduledDate: '2026-09-14', scheduledTime: '16:30', duration: 45,
      caseSummary: 'Verifying a title deed for a plot in Gazipur. Need confirmation before purchase.',
      existingCase: false,
      files: [{ name: 'Title_Deed.pdf', size: '2.3 MB' }],
      fee: 3500, platformCharge: 150,
      requestedAt: '2026-09-10T11:00:00', status: 'accepted',
      userNotes: [{ text: 'I have already paid the token money.', at: '2026-09-11T09:00:00' }],
      lawyerNotesSent: [{ text: 'Please have the title deed ready.', at: '2026-09-11T10:00:00' }],
      meetingLink: 'https://meet.google.com/xyz-abc-def',
      lawyerNote: null, feedback: null },
    { id: 202, clientName: 'Rashed Karim', clientInitials: 'RK',
      clientPhone: '+880 1711-333333', clientEmail: 'rashed@example.com',
      matterType: 'Corporate Advisory', service: 'Business Registration',
      mode: 'Online Video Call',
      scheduledDate: '2026-09-18', scheduledTime: '10:00', duration: 45,
      caseSummary: 'Need help incorporating a private limited company and setting up RJSC filings.',
      existingCase: false,
      files: [{ name: 'Business_Plan.pdf', size: '2.1 MB' }],
      fee: 5000, platformCharge: 150,
      requestedAt: '2026-09-12T09:15:00', status: 'accepted',
      userNotes: [{ text: 'Can you review the draft MOA I sent?', at: '2026-09-13T10:00:00' }],
      lawyerNotesSent: [{ text: 'Yes, I will review it before our session.', at: '2026-09-13T11:30:00' }],
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      lawyerNote: null, feedback: null },
    { id: 203, clientName: 'Imran Hossain', clientInitials: 'IH',
      clientPhone: '+880 1711-555555', clientEmail: 'imran@example.com',
      matterType: 'Criminal Bail', service: 'Legal Consultation',
      mode: 'Chamber Visit',
      scheduledDate: '2026-09-20', scheduledTime: '14:00', duration: 45,
      caseSummary: 'Anticipatory bail application for a business partner accused of financial fraud.',
      existingCase: true,
      files: [{ name: 'FIR_Copy.pdf', size: '1.5 MB' }],
      fee: 5000, platformCharge: 150,
      requestedAt: '2026-09-11T16:20:00', status: 'accepted',
      userNotes: [], lawyerNotesSent: [],
      meetingLink: null, lawyerNote: null, feedback: null },
    { id: 204, clientName: 'Nusrat Jahan', clientInitials: 'NJ',
      clientPhone: '+880 1711-202020', clientEmail: 'nusrat@example.com',
      matterType: 'Property Dispute', service: 'Legal Consultation',
      mode: 'Online Video Call',
      scheduledDate: '2026-09-22', scheduledTime: '11:00', duration: 45,
      caseSummary: 'Land partition dispute with relatives — need mediation advice.',
      existingCase: false, files: [],
      fee: 3500, platformCharge: 150,
      requestedAt: '2026-09-14T10:00:00', status: 'accepted',
      userNotes: [], lawyerNotesSent: [],
      meetingLink: 'https://zoom.us/j/1234567890',
      lawyerNote: null, feedback: null }
  ],

  history: [
    { id: 101, clientName: 'Md. Rahat Hossain', clientInitials: 'RH',
      clientPhone: '+880 1711-666666',
      matterType: 'Property Dispute', service: 'Legal Consultation',
      mode: 'Online Video Call',
      scheduledDate: '2026-09-12', scheduledTime: '16:30', duration: 45,
      caseSummary: 'Title verification for land in Gazipur — buyer wanted confirmation before purchase.',
      existingCase: false,
      files: [{ name: 'Title_Deed.pdf', size: '2.3 MB' }],
      fee: 3500, platformCharge: 150, earned: 3150,
      requestedAt: '2026-09-08T10:00:00', status: 'completed',
      acceptedAt: '2026-09-08T14:20:00', completedAt: '2026-09-12T17:15:00',
      userNotes: [{ text: 'Thank you so much for your time.', at: '2026-09-12T18:00:00' }],
      lawyerNotesSent: [{ text: 'Please have the title deed ready.', at: '2026-09-08T14:30:00' }],
      meetingLink: 'https://meet.google.com/xyz-abc-def',
      feedback: { decision: 'Case resolved / advice provided', note: 'Verified CS and RS records. Title chain is clean; mutation is up to date.', files: [], at: '2026-09-12T17:15:00' },
      rating: 5, review: 'Extremely professional and explained everything clearly.' },
    { id: 102, clientName: 'Farhana Ahmed', clientInitials: 'FA',
      clientPhone: '+880 1711-777777',
      matterType: 'Family Law — Mahr', service: 'Legal Consultation',
      mode: 'Chamber Visit',
      scheduledDate: '2026-09-05', scheduledTime: '11:00', duration: 45,
      caseSummary: 'Needed advice on recovering Mahr after divorce.',
      existingCase: false, files: [],
      fee: 3500, platformCharge: 150, earned: 3150,
      requestedAt: '2026-09-01T09:00:00', status: 'completed',
      acceptedAt: '2026-09-01T12:00:00', completedAt: '2026-09-05T12:00:00',
      userNotes: [], lawyerNotesSent: [], meetingLink: null,
      feedback: { decision: 'Partial resolution — further action needed', note: 'Advised on Mahr recovery procedure. Prepared a draft demand notice.', files: [], at: '2026-09-05T12:00:00' },
      rating: 5, review: 'Very professional and thorough.' },
    { id: 103, clientName: 'Imran Hossain', clientInitials: 'IH',
      clientPhone: '+880 1711-888888',
      matterType: 'Corporate — RJSC Filing', service: 'Business Registration',
      mode: 'Online Video Call',
      scheduledDate: '2026-08-28', scheduledTime: '14:00', duration: 45,
      caseSummary: 'Wanted help with registering a new private limited company.',
      existingCase: false,
      files: [{ name: 'Business_Plan.pdf', size: '1.8 MB' }],
      fee: 5000, platformCharge: 150, earned: 4500,
      requestedAt: '2026-08-24T16:00:00', status: 'completed',
      acceptedAt: '2026-08-25T10:00:00', completedAt: '2026-08-28T15:00:00',
      userNotes: [], lawyerNotesSent: [{ text: 'Please bring the proposed company name options.', at: '2026-08-25T10:30:00' }],
      meetingLink: null,
      feedback: { decision: 'Case resolved / advice provided', note: 'Reviewed company structure and name availability.', files: [{ name: 'RJSC_Checklist.pdf', size: '180 KB' }], at: '2026-08-28T15:00:00' },
      rating: 4, review: 'Helpful session. Would appreciate a follow-up email with the checklist.' },
    { id: 104, clientName: 'Sabrina Akhter', clientInitials: 'SA',
      clientPhone: '+880 1711-999999',
      matterType: 'Criminal Bail', service: 'Legal Consultation',
      mode: 'Chamber Visit',
      scheduledDate: '2026-09-25', scheduledTime: '15:30', duration: 45,
      caseSummary: 'Sought advice on anticipatory bail for her brother.',
      existingCase: true, files: [],
      fee: 5000, platformCharge: 150, earned: 0,
      requestedAt: '2026-09-15T11:00:00', status: 'rejected',
      rejectedAt: '2026-09-15T14:00:00',
      rejectionReason: 'Outside my practice area — I focus on corporate and property law.',
      userNotes: [], lawyerNotesSent: [], meetingLink: null, feedback: null },
    { id: 105, clientName: 'Tanvir Rahman', clientInitials: 'TR',
      clientPhone: '+880 1711-101010',
      matterType: 'Corporate — Tax Advisory', service: 'Tax Advisory',
      mode: 'Online Video Call',
      scheduledDate: '2026-08-14', scheduledTime: '10:00', duration: 45,
      caseSummary: 'VAT registration for a new e-commerce startup.',
      existingCase: false, files: [],
      fee: 3500, platformCharge: 150, earned: 1750,
      requestedAt: '2026-08-10T09:30:00', status: 'cancelled',
      acceptedAt: '2026-08-10T11:00:00', cancelledAt: '2026-08-13T18:00:00',
      cancelledReason: 'Client cancelled — personal emergency.', refundPercent: 50,
      userNotes: [], lawyerNotesSent: [], meetingLink: null, feedback: null },
    { id: 106, clientName: 'Nusrat Jahan', clientInitials: 'NJ',
      clientPhone: '+880 1711-202020',
      matterType: 'Property Dispute', service: 'Legal Consultation',
      mode: 'Chamber Visit',
      scheduledDate: '2026-08-14', scheduledTime: '11:00', duration: 45,
      caseSummary: 'Land partition dispute with relatives.',
      existingCase: false, files: [],
      fee: 3500, platformCharge: 150, earned: 0,
      requestedAt: '2026-08-05T10:00:00', status: 'rescheduled',
      acceptedAt: '2026-08-05T15:00:00', rescheduledAt: '2026-08-08T09:00:00',
      rescheduleReason: 'Supreme Court hearing scheduled at the same time.',
      rescheduledTo: { date: '2026-08-14', time: '11:00' },
      userNotes: [], lawyerNotesSent: [], meetingLink: null, feedback: null }
  ],

  requests: [
    { id: 1, clientName: 'Mehedi Hasan', clientInitials: 'MH',
      clientPhone: '+880 1711-111111', clientEmail: 'mehedi@example.com',
      matterType: 'Property Dispute', service: 'Legal Consultation',
      mode: 'Online Video Call',
      scheduledDate: '2026-10-20', scheduledTime: '16:30', duration: 45,
      caseSummary: 'My brother and I have a dispute over our ancestral property in Dhaka.',
      existingCase: false,
      files: [{ name: 'Khatian_Copy.pdf', size: '1.2 MB' }, { name: 'NID_Front.jpg', size: '245 KB' }],
      fee: 3500, platformCharge: 150,
      requestedAt: '2026-09-14T10:30:00', status: 'new',
      userNotes: [{ text: 'Please let me know if you need any additional documents.', at: '2026-09-14T10:35:00' }],
      lawyerNotesSent: [], meetingLink: null, lawyerNote: null,
      rejectionReason: null, rescheduleReason: null, rescheduledTo: null, feedback: null },
    { id: 2, clientName: 'Nusrat Jahan', clientInitials: 'NJ',
      clientPhone: '+880 1711-222222', clientEmail: 'nusrat@example.com',
      matterType: 'Family Law — Divorce', service: 'Legal Consultation',
      mode: 'Chamber Visit',
      scheduledDate: '2026-10-22', scheduledTime: '11:00', duration: 45,
      caseSummary: 'Seeking guidance on filing for divorce and child custody arrangements.',
      existingCase: true,
      files: [{ name: 'Marriage_Certificate.pdf', size: '820 KB' }],
      fee: 3500, platformCharge: 150,
      requestedAt: '2026-09-13T15:00:00', status: 'new',
      userNotes: [], lawyerNotesSent: [], meetingLink: null, lawyerNote: null,
      rejectionReason: null, rescheduleReason: null, rescheduledTo: null, feedback: null },
    { id: 3, clientName: 'Sabrina Akhter', clientInitials: 'SA',
      clientPhone: '+880 1711-999999', clientEmail: 'sabrina@example.com',
      matterType: 'Criminal Bail', service: 'Legal Consultation',
      mode: 'Online Video Call',
      scheduledDate: '2026-10-24', scheduledTime: '15:00', duration: 45,
      caseSummary: 'Anticipatory bail application for a family member.',
      existingCase: true, files: [],
      fee: 5000, platformCharge: 150,
      requestedAt: '2026-09-15T09:00:00', status: 'new',
      userNotes: [], lawyerNotesSent: [], meetingLink: null, lawyerNote: null,
      rejectionReason: null, rescheduleReason: null, rescheduledTo: null, feedback: null },
    { id: 4, clientName: 'Md. Rahat Hossain', clientInitials: 'RH',
      clientPhone: '+880 1711-666666', clientEmail: 'rahat@example.com',
      matterType: 'Property Dispute', service: 'Legal Consultation',
      mode: 'Online Video Call',
      scheduledDate: '2026-09-10', scheduledTime: '16:30', duration: 45,
      caseSummary: 'Title verification for land in Gazipur.',
      existingCase: false, files: [{ name: 'Title_Deed.pdf', size: '2.3 MB' }],
      fee: 3500, platformCharge: 150,
      requestedAt: '2026-09-08T10:00:00', status: 'accepted',
      userNotes: [{ text: 'Thank you so much for your time.', at: '2026-09-11T08:00:00' }],
      lawyerNotesSent: [{ text: 'Please have the title deed ready.', at: '2026-09-08T14:20:00' }],
      meetingLink: 'https://meet.google.com/xyz-abc-def', lawyerNote: null,
      rejectionReason: null, rescheduleReason: null, rescheduledTo: null, feedback: null },
    { id: 5, clientName: 'Imran Hossain', clientInitials: 'IH',
      clientPhone: '+880 1711-555555', clientEmail: 'imran@example.com',
      matterType: 'Criminal Bail', service: 'Legal Consultation',
      mode: 'Chamber Visit',
      scheduledDate: '2026-09-28', scheduledTime: '14:00', duration: 45,
      caseSummary: 'Anticipatory bail application for a business partner.',
      existingCase: true, files: [{ name: 'FIR_Copy.pdf', size: '1.5 MB' }],
      fee: 5000, platformCharge: 150,
      requestedAt: '2026-09-11T16:20:00', status: 'rescheduled',
      userNotes: [], lawyerNotesSent: [{ text: 'Sending a new proposal shortly.', at: '2026-09-12T10:00:00' }],
      meetingLink: null, lawyerNote: null,
      rejectionReason: null,
      rescheduleReason: 'Court hearing scheduled at the same time',
      rescheduledTo: { date: '2026-09-30', time: '11:00' },
      feedback: null }
  ],

  payments: [
    { id: 'PAY-1001', date: '2026-09-12', client: 'Md. Rahat Hossain', service: 'Consultation', amount: 3150, status: 'Received', method: 'bKash' },
    { id: 'PAY-1002', date: '2026-09-05', client: 'Farhana Ahmed', service: 'Consultation', amount: 3150, status: 'Received', method: 'Bank Transfer' },
    { id: 'PAY-1003', date: '2026-08-28', client: 'Imran Hossain', service: 'Business Registration', amount: 4500, status: 'Received', method: 'Card' },
    { id: 'PAY-1004', date: '2026-08-14', client: 'Tanvir Rahman', service: 'Tax Advisory', amount: 1750, status: 'Partial Refund', method: 'Nagad' },
    { id: 'PAY-1005', date: '2026-08-10', client: 'Nusrat Jahan', service: 'Consultation', amount: 0, status: 'Refunded', method: 'bKash' }
  ]
};