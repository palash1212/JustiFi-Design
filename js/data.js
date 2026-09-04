/* ==========================================================
   js/data.js — shared mock data used across pages
========================================================== */
var LAWYERS = [
  {
    id: "Br-1",
    name: " Br. Arefin Shumit",
    dept: "Corporate",
    fee: "৳3,500",
    img: "images/shumit.png",
    about:
      "Corporate lawyer advising on tax, VAT, and business structuring for top-tier firms with over 10 years of experience.",
  },
  {
    id: "Br-2",
    name: "Br. Ashraf Hossain",
    dept: "Corporate",
    fee: "৳2,500",
    img: "images/ashraf.png",
    about:
      "Specializes in criminal law, mediation and IPR settlements",
  },
  {
    id: "Br-3",
    name: "Br. Mimo",
    dept: "Property",
    fee: "৳1,800",
    img: "images/mimo.png",
    about:
      "Land and property expert handling title verification, registration, and dispute resolution.",
  },
  {
    id: "Br-4",
    name: "Br. Shakil",
    dept: "Corporate",
    fee: "৳3,000",
    img: "images/shakil.png",
    about:
      "Renowned corporate attorney with expertise in cross-border transactions and compliance.",
  },
];

var BOOKING_DATES = ["Fri 28", "Sat 29", "Sun 30", "Mon 31", "Tue 1"];
var BOOKING_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:30 AM",
  "2:00 PM",
  "3:00 PM",
  "4:30 PM",
];

function findLawyer(idOrName) {
  return (
    LAWYERS.find(function (l) {
      return l.id === idOrName || l.name === idOrName;
    }) || LAWYERS[0]
  );
}

// Unified function that returns a modern Tailwind-style card HTML
// (used on index.html, lawyer_list.html, etc.)
function lawyerCardHTML(l) {
  var rating = (4.5 + Math.random() * 0.5).toFixed(1);
  var exp = Math.floor(8 + Math.random() * 17) + "+ Years Experience";
  var practiceTags = {
    Family: ["Family Law", "Mediation"],
    Corporate: ["Corporate Law", "VAT/Tax"],
    Property: ["Land Disputes", "Property Verification"],
    Criminal: ["Criminal Law", "Bail Petitions"],
  }[l.dept] || ["General Practice"];

  var photoHtml = l.img
    ? '<img src="' +
      l.img +
      '" alt="' +
      l.name +
      '" class="w-full h-full object-cover" />'
    : '<div class="w-full h-full bg-surface-container flex items-center justify-center text-6xl text-surface-variant">' +
      l.init +
      "</div>";

  return (
    '<div class="bg-white rounded-2xl overflow-hidden legal-soft-shadow border border-surface-variant/50 flex flex-col">' +
    '<div class="h-64 relative">' +
    '<div class="w-full h-full">' +
    photoHtml +
    "</div>" +
    '<div class="absolute top-4 right-4 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200">' +
    '<span class="material-symbols-outlined text-xs" style="font-variation-settings: \'FILL\' 1;">verified</span> Verified Sanad' +
    "</div>" +
    "</div>" +
    '<div class="p-6 flex-1 flex flex-col">' +
    '<div class="flex justify-between items-start mb-2">' +
    '<h4 class="font-headline-md text-headline-md text-primary">' +
    l.name +
    "</h4>" +
    '<div class="flex items-center text-tertiary-container">' +
    '<span class="material-symbols-outlined text-sm" style="font-variation-settings: \'FILL\' 1;">star</span>' +
    '<span class="text-sm font-bold ml-1">' +
    rating +
    "</span>" +
    "</div>" +
    "</div>" +
    '<p class="text-caption text-on-surface-variant font-label-md mb-4 uppercase tracking-tighter">' +
    exp +
    "</p>" +
    '<div class="flex flex-wrap gap-2 mb-6">' +
    practiceTags
      .map(function (t) {
        return (
          '<span class="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-xs">' +
          t +
          "</span>"
        );
      })
      .join("") +
    "</div>" +
    '<a href="consultancy-booking.html?lawyer=' +
    l.id +
    '" class="mt-auto w-full bg-tertiary-fixed-dim text-primary font-label-md text-label-md py-3 rounded-xl hover:shadow-lg transition-all text-center">Book Consultation ' +
    l.fee +
    "</a>" +
    "</div>" +
    "</div>"
  );
}
