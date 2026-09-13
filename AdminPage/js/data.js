// AdminPage/js/data.js
const DATA = {
  clients: [
    { id:'CLI-10234', name:'Mahmudul Karim', email:'mahmud@mail.com', status:'Active',   joined:'12 Jan 2025', services:'Booking, Affidavit' },
    { id:'CLI-88214', name:'Abdullah Hasan',  email:'abdullah@mail.com', status:'Inactive', joined:'03 Mar 2025', services:'Land & Property' },
    { id:'CLI-10891', name:'Shirin Rahman',   email:'shirin@mail.com',   status:'Active',   joined:'21 Apr 2024', services:'Affidavit, Tax' },
    { id:'CLI-10892', name:'Nasrin Akter',    email:'nasrin@mail.com',   status:'Active',   joined:'07 Jul 2024', services:'Tax & Income' },
  ],
  lawyers: [
    { id:'LW-2001', name:'Barrister Sabbir Chowdhury', bar:'BD-33471', area:'Corporate Law', rating:4.8, bookings:126, status:'Active',   verified:true },
    { id:'LW-2002', name:'Advocate Nusrat Ara',         bar:'BD-19045', area:'Family Law',    rating:4.5, bookings:84,  status:'Inactive', verified:false },
    { id:'LW-2003', name:'Md. Rezaul Karim',            bar:'BD-27810', area:'Criminal Law',  rating:4.2, bookings:39,  status:'Active',   verified:true },
  ],
  deedWriters: [
    { id:'DW-101', name:'Kazi Nazrul Islam', reg:'DW-DHK-0091', area:'Dhaka', deals:142, status:'Active',   verified:true },
    { id:'DW-102', name:'Mokbul Hossain',    reg:'DW-CHT-0042', area:'Chattogram', deals:78, status:'Inactive', verified:true },
    { id:'DW-103', name:'Ruhul Amin',        reg:'DW-RAJ-0023', area:'Rajshahi', deals:31, status:'Active',   verified:false },
  ],
  admins: [
    { id:'ADM-001', name:'Rafiq Ahmed',   email:'rafiq@justifi.com.bd',   role:'Super Admin',   mfa:true,  lastLogin:'Now',           status:'Active' },
    { id:'ADM-002', name:'Farhana Islam', email:'farhana@justifi.com.bd', role:'Support Admin', mfa:true,  lastLogin:'Today, 1:20 PM', status:'Active' },
    { id:'ADM-003', name:'Kamrul Hasan',  email:'kamrul@justifi.com.bd',  role:'System Admin',  mfa:false, lastLogin:'3 days ago',     status:'Inactive' },
  ],
  bookings: [
    { id:'#BK-10294', client:'Mahmudul Karim', lawyer:'B. Sabbir Chowdhury', date:'12 Sep, 4:00 PM', mode:'Video Call', payment:'Paid',     status:'Confirmed' },
    { id:'#BK-10301', client:'Shirin Rahman',  lawyer:'Adv. Nusrat Ara',    date:'13 Sep, 11:00 AM', mode:'Chamber',   payment:'Pending',  status:'Pending' },
    { id:'#BK-10288', client:'Tania Islam',    lawyer:'Md. Rezaul Karim',   date:'10 Sep, 2:00 PM',  mode:'Video Call', payment:'Refunded', status:'Disputed' },
  ],
  affidavitRequests: [
    { id:'#AF-20394', user:'Kamal Uddin Bhuiyan', type:'Name Change',   submitted:'1 hour ago', progress:35, status:'Under Review', risk:'High',   lawyer:null },
    { id:'#AF-20401', user:'Rehana Begum',         type:'Same Person',   submitted:'3 hours ago', progress:15, status:'Pending',      risk:'Low',    lawyer:null },
    { id:'#AF-20388', user:'Joynal Abedin',        type:'Land Ownership', submitted:'Yesterday',  progress:100,status:'Completed',    risk:'Low',    lawyer:'Farhana Islam' },
  ],
  landRequests: [
    { id:'#LP-1042', user:'Habibur Rahman',   service:'25-Year Ownership Verification', location:'Savar, Dhaka',   progress:60, status:'In Review',  lawyer:null },
    { id:'#LP-1039', user:'Ayesha Siddiqua',  service:'Pre-purchase Verification',      location:'Gazipur Sadar',  progress:20, status:'Pending',    lawyer:null },
    { id:'#LP-1021', user:'Md. Iqbal Hossain',service:'Mutation (Namjari)',             location:'Comilla Sadar',  progress:100,status:'Completed',  lawyer:'Legal Team A' },
  ],
  taxRequests: [
    { id:'#TX-3021', user:'Nasrin Akter', service:'Land Development Tax', location:'Dhaka',      progress:70, status:'Processing', lawyer:'Finance Team' },
    { id:'#TX-3018', user:'Kamrul Hasan', service:'Dakhila Collection',   location:'Chattogram', progress:30, status:'Pending',    lawyer:null },
  ],
  transactions: [
    { id:'#TXN-88231', user:'Abdullah Hasan',  service:'Land & Property', amount:'৳45,000', method:'bKash', status:'Review',     risk:'High',   caseId:'#LP-1042' },
    { id:'#TXN-88214', user:'Shirin Rahman',   service:'Booking',         amount:'৳1,500',  method:'Card',  status:'Successful', risk:'Low',    caseId:'#BK-10301' },
    { id:'#TXN-88190', user:'Mahmudul Karim',  service:'Affidavit',       amount:'৳300',    method:'Nagad', status:'Successful', risk:'Low',    caseId:'#AF-20394' },
    { id:'#TXN-88175', user:'Nasrin Akter',    service:'Tax & Income',    amount:'৳2,100',  method:'Rocket',status:'Failed',     risk:'Medium', caseId:'#TX-3021' },
  ],
  sessions: [
    { user:'Shirin Rahman',        role:'Client',       device:'Chrome / Android', ip:'103.25.12.45', location:'Dhaka, BD',       login:'10:42 AM',          status:'Active',   risk:'Low' },
    { user:'B. Sabbir Chowdhury',  role:'Lawyer',       device:'Safari / iPhone',  ip:'103.25.12.78', location:'Chattogram, BD',  login:'Yesterday 6:15 PM', status:'Active',   risk:'Medium' },
    { user:'Kazi Nazrul Islam',    role:'Deed-Writer',  device:'Firefox / Windows',ip:'45.33.22.11',  location:'Rajshahi, BD',    login:'Yesterday 2:05 PM', status:'Inactive', risk:'Low' },
    { user:'Farhana Islam',        role:'Admin',        device:'Edge / MacBook',   ip:'172.16.0.5',   location:'Dhaka, BD',       login:'Today 9:00 AM',     status:'Active',   risk:'Low' },
  ],
  permissions: [
    { module:'Clients',     user:'✓', lawyer:'—', deed:'✓', admin:'✓' },
    { module:'Lawyers',     user:'—', lawyer:'✓', deed:'—', admin:'✓' },
    { module:'Affidavit',   user:'✓', lawyer:'—', deed:'✓', admin:'✓' },
    { module:'Transactions',user:'—', lawyer:'—', deed:'—', admin:'✓' },
    { module:'Security',    user:'—', lawyer:'—', deed:'—', admin:'✓' },
  ],
};