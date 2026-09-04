/* ==========================================================
   js/data.js — shared mock data used across pages
========================================================== */
var LAWYERS = [
  { id: 'farhana-rahman', name: 'Farhana Rahman', dept: 'Family', fee: '৳1,500', init: 'FR',
    about: 'Specializes in family law, mediation, and Mahr settlements with over 10 years of experience.' },
  { id: 'kamal-hossain', name: 'Kamal Hossain', dept: 'Corporate', fee: '৳2,500', init: 'KH',
    about: 'Corporate lawyer advising on tax, VAT, and business structuring for top-tier firms.' },
  { id: 'nusrat-jahan', name: 'Nusrat Jahan', dept: 'Property', fee: '৳1,800', init: 'NJ',
    about: 'Land and property expert handling title verification, registration, and dispute resolution.' },
  { id: 'shafiqul-islam', name: 'Shafiqul Islam', dept: 'Corporate', fee: '৳3,000', init: 'SI',
    about: 'Renowned corporate attorney with expertise in cross-border transactions and compliance.' }
];

var BOOKING_DATES = ['Fri 28', 'Sat 29', 'Sun 30', 'Mon 31', 'Tue 1'];
var BOOKING_SLOTS = ['10:00 AM', '10:30 AM', '11:30 AM', '2:00 PM', '3:00 PM', '4:30 PM'];

function findLawyer(idOrName) {
  return LAWYERS.find(function (l) { return l.id === idOrName || l.name === idOrName; }) || LAWYERS[0];
}

function lawyerCardHTML(l) {
  return '<div class="lawyer-card card" onclick="location.href=\'booking.html?lawyer=' + l.id + '\'">' +
    '<div class="photo">' + l.init + '</div>' +
    '<h4>' + l.name + '</h4>' +
    '<div class="dept">' + l.dept + ' Law</div>' +
    '<div class="badge">🏆 Verified Sanad</div>' +
    '<div class="tags">8+ years · ⭐ 4.9</div>' +
    '<div class="fee">' + l.fee + ' <span style="font-weight:400;font-size:11px;color:var(--slate);">/session</span></div>' +
    '<div class="actions">' +
    '<a class="btn-outline" style="font-size:11px;padding:6px 4px;text-align:center;" href="booking.html?lawyer=' + l.id + '" onclick="event.stopPropagation();">View Profile</a>' +
    '<a class="btn-gold" style="font-size:11px;padding:6px 4px;text-align:center;" href="booking.html?lawyer=' + l.id + '" onclick="event.stopPropagation();">Book Consultation</a>' +
    '</div></div>';
}
