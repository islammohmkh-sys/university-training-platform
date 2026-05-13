
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, Users as UsersIcon, GraduationCap, BookOpen, Activity, BarChart3,
  ShieldCheck, Settings, Search, Plus, Moon, Sun, Languages, Trash2,
  Pencil, Download, Filter, Menu, X, Bell, CheckCircle2, CalendarDays,
  UserCog, ClipboardCheck, Video, Link as LinkIcon, PlayCircle, Clock, ExternalLink
} from "lucide-react";
import "./style.css";

const STORE_KEY = "university-training-platform-v8";
const OLD_KEYS = [
  "university-training-platform-v3",
  "university-training-platform-v4",
  "university-training-platform-v5",
  "university-training-platform-v6",
  "university-training-platform-v7"
];

const translations = {
  ar: {
    app: "منصة التدريب",
    dashboard: "لوحة التحكم",
    trainees: "المتدربين",
    trainers: "المدربين",
    courses: "الدورات التدريبية",
    courseLibrary: "محتوى الكورسات",
    udemyLink: "رابط Udemy",
    assignCourse: "تعيين كورس",
    courseContent: "محتوى الكورس",
    assignedTrainees: "المتدربين المرتبطين",
    watch: "مشاهدة",
    activities: "تسجيل الأنشطة التدريبية",
    assignments: "ربط المتدربين بالتدريب",
    reports: "التقارير والتحليلات",
    users: "الصلاحيات والمستخدمين",
    settings: "الإعدادات",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    search: "بحث سريع",
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    export: "تصدير",
    filters: "فلترة",
    actions: "الإجراءات",
    totalTrainees: "إجمالي المتدربين",
    totalTrainers: "إجمالي المدربين",
    activeCourses: "الدورات النشطة",
    totalActivities: "الأنشطة التدريبية",
    attendanceRate: "نسبة الحضور",
    completionRate: "نسبة الإكمال",
    recent: "آخر النشاطات",
    quick: "اختصارات سريعة",
    fullName: "الاسم الكامل",
    nationalId: "رقم الهوية",
    phone: "رقم الجوال",
    email: "البريد الإلكتروني",
    organization: "جهة العمل",
    department: "القسم",
    jobTitle: "المسمى الوظيفي",
    status: "الحالة",
    regDate: "تاريخ التسجيل",
    assignedTrainer: "المدرب المسؤول",
    notes: "ملاحظات",
    trainerName: "اسم المدرب",
    specialization: "التخصص",
    experience: "سنوات الخبرة",
    courseName: "اسم الدورة",
    description: "وصف الدورة",
    duration: "مدة الدورة",
    trainingType: "نوع التدريب",
    startDate: "تاريخ البداية",
    endDate: "تاريخ النهاية",
    activityTitle: "عنوان النشاط",
    activityType: "نوع النشاط",
    date: "التاريخ",
    startTime: "وقت البداية",
    endTime: "وقت النهاية",
    trainer: "المدرب",
    trainee: "المتدرب",
    course: "الدورة",
    performance: "تقييم الأداء",
    attendance: "الحضور",
    present: "حاضر",
    absent: "غائب",
    late: "متأخر",
    active: "نشط",
    planned: "مخطط",
    completed: "مكتمل",
    progress: "قيد التنفيذ",
    onsite: "حضوري",
    online: "عن بعد",
    hybrid: "هجين",
    role: "الدور",
    selectTraining: "اختيار التدريب",
    selectTrainer: "اختيار المدرب",
    traineeGroup: "مجموعة المتدربين",
    saveAssignment: "حفظ الربط",
    assignedTrainees: "المتدربين المرتبطين",
    company: "بيانات الشركة",
    categories: "تصنيفات التدريب",
    orgs: "الجهات",
    deps: "الأقسام",
    theme: "الثيم",
    lang: "اللغة"
  },
  en: {
    app: "Training Platform",
    dashboard: "Dashboard",
    trainees: "Trainees",
    trainers: "Trainers",
    courses: "Training Courses",
    courseLibrary: "Course Content",
    udemyLink: "Udemy Link",
    assignCourse: "Assign Course",
    courseContent: "Course Content",
    assignedTrainees: "Assigned Trainees",
    watch: "Watch",
    activities: "Training Activities",
    assignments: "Training Assignments",
    reports: "Reports & Analytics",
    users: "Permissions & Users",
    settings: "Settings",
    login: "Login",
    logout: "Logout",
    username: "Username",
    password: "Password",
    search: "Search",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    export: "Export",
    filters: "Filters",
    actions: "Actions",
    totalTrainees: "Total Trainees",
    totalTrainers: "Total Trainers",
    activeCourses: "Active Courses",
    totalActivities: "Training Activities",
    attendanceRate: "Attendance Rate",
    completionRate: "Completion Rate",
    recent: "Recent Activities",
    quick: "Quick Actions",
    fullName: "Full Name",
    nationalId: "National ID",
    phone: "Phone",
    email: "Email",
    organization: "Organization",
    department: "Department",
    jobTitle: "Job Title",
    status: "Status",
    regDate: "Registration Date",
    assignedTrainer: "Assigned Trainer",
    notes: "Notes",
    trainerName: "Trainer Name",
    specialization: "Specialization",
    experience: "Experience",
    courseName: "Course Name",
    description: "Description",
    duration: "Duration",
    trainingType: "Training Type",
    startDate: "Start Date",
    endDate: "End Date",
    activityTitle: "Activity Title",
    activityType: "Activity Type",
    date: "Date",
    startTime: "Start Time",
    endTime: "End Time",
    trainer: "Trainer",
    trainee: "Trainee",
    course: "Course",
    performance: "Performance",
    attendance: "Attendance",
    present: "Present",
    absent: "Absent",
    late: "Late",
    active: "Active",
    planned: "Planned",
    completed: "Completed",
    progress: "In Progress",
    onsite: "Onsite",
    online: "Online",
    hybrid: "Hybrid",
    role: "Role",
    selectTraining: "Select Training",
    selectTrainer: "Select Trainer",
    traineeGroup: "Trainee Group",
    saveAssignment: "Save Assignment",
    assignedTrainees: "Assigned Trainees",
    company: "Company Information",
    categories: "Training Categories",
    orgs: "Organizations",
    deps: "Departments",
    theme: "Theme",
    lang: "Language"
  }
};

const defaultUsers = [
  { id: 1, name: "System Admin", username: "admin", password: "admin123", role: "Admin", status: "Active", permissions: ["dashboard","trainees","trainers","courses","courseLibrary","activities","assignments","reports","users","settings"] },
  { id: 2, name: "Training Supervisor", username: "supervisor", password: "123456", role: "Supervisor", status: "Active", permissions: ["dashboard","trainees","trainers","courses","courseLibrary","activities","assignments","reports"] },
  { id: 3, name: "Trainer User", username: "trainer", password: "123456", role: "Trainer", status: "Active", permissions: ["dashboard","trainees","courses","courseLibrary","activities","assignments","reports"] }
];

const seed = {
  trainees: [
    { id: 1, fullName: "محمد العتيبي", nationalId: "1022334455", phone: "0551234567", email: "m@gov.sa", organization: "وزارة الموارد البشرية", department: "HR", jobTitle: "أخصائي تدريب", status: "قيد التنفيذ", regDate: "2026-05-01", assignedTrainer: "إسلام محمد", notes: "ملتزم بالحضور" },
    { id: 2, fullName: "Noura Alharbi", nationalId: "1099887766", phone: "0509988776", email: "noura@company.com", organization: "شركة التقنية المتقدمة", department: "IT", jobTitle: "Business Analyst", status: "نشط", regDate: "2026-05-03", assignedTrainer: "سارة خالد", notes: "Advanced training" }
  ],
  trainers: [
    { id: 1, trainerName: "إسلام محمد", specialization: "Business Analysis", phone: "0551112222", email: "islam@company.com", experience: 8, courses: "Business Analysis Essentials", status: "نشط" },
    { id: 2, trainerName: "سارة خالد", specialization: "Quality Control", phone: "0553334444", email: "sarah@company.com", experience: 6, courses: "QA & UAT", status: "نشط" }
  ],
  courses: [
    { id: 1, courseName: "Business Analysis Essentials", description: "تحليل الأعمال وإدارة المتطلبات", duration: "24 ساعة", trainingType: "حضوري", startDate: "2026-05-12", endDate: "2026-05-16", assignedTrainer: "إسلام محمد", organization: "وزارة الموارد البشرية", status: "نشط" },
    { id: 2, courseName: "QA & UAT", description: "اختبار الجودة وقبول المستخدم", duration: "18 ساعة", trainingType: "هجين", startDate: "2026-05-18", endDate: "2026-05-20", assignedTrainer: "سارة خالد", organization: "شركة التقنية المتقدمة", status: "مخطط" }
  ],
  courseContents: [
    {
      id: 1,
      courseName: "Java Programming for Complete Beginners",
      category: "Core Java",
      udemyLink: "https://www.udemy.com/",
      description: "Java Programming complete learning path with structured sections and videos.",
      totalLength: "60h 37m",
      assignedTrainees: ["محمد العتيبي"],
      sections: [
        { id: 6, title: "Introduction to Eclipse - First Java Programming Project", meta: "12 lectures • 51min", videos: [
          { id: 1, title: "Step 00 - Installing Eclipse - Windows", duration: "02:33", url: "https://www.udemy.com/" },
          { id: 2, title: "Step 00 - Installing Eclipse - Mac", duration: "01:56", url: "https://www.udemy.com/" },
          { id: 3, title: "Step 01 - Creating a New Java Project with Eclipse", duration: "05:13", url: "https://www.udemy.com/" },
          { id: 4, title: "Step 02 - Your first Java class with Eclipse", duration: "05:27", url: "https://www.udemy.com/" },
          { id: 5, title: "Step 03 - Writing Multiplication Table Java Program", duration: "06:10", url: "https://www.udemy.com/" }
        ]},
        { id: 7, title: "Java Coding Exercises - Set 1", meta: "7 lectures • 33min", videos: [
          { id: 1, title: "Exercise 01 - Variables", duration: "04:20", url: "https://www.udemy.com/" },
          { id: 2, title: "Exercise 02 - Methods", duration: "05:40", url: "https://www.udemy.com/" }
        ]}
      ]
    }
  ],
  activities: [
    { id: 1, activityTitle: "جلسة تحليل المتطلبات", activityType: "ورشة عمل", date: "2026-05-12", startTime: "09:00", endTime: "11:00", trainer: "إسلام محمد", trainee: "Noura Alharbi", course: "Business Analysis Essentials", notes: "ربط تلقائي", performance: 88, attendance: "حاضر" },
    { id: 2, activityTitle: "تطبيق Test Cases", activityType: "تطبيق عملي", date: "2026-05-13", startTime: "10:00", endTime: "12:00", trainer: "سارة خالد", trainee: "محمد العتيبي", course: "QA & UAT", notes: "أداء جيد", performance: 82, attendance: "حاضر" }
  ],
  assignments: [
    { id: 1, training: "Business Analysis Essentials", trainer: "إسلام محمد", traineeGroup: "Group A", trainees: ["محمد العتيبي", "Noura Alharbi"], date: "2026-05-12", notes: "Initial assignment" }
  ],
  users: defaultUsers,
  settings: {
    companyName: "Training Company",
    categories: ["Leadership", "Business Analysis", "Quality", "Project Management"],
    organizations: ["وزارة الموارد البشرية", "شركة التقنية المتقدمة", "هيئة حكومية"],
    departments: ["HR", "IT", "Operations", "Finance"]
  }
};

function normalizeData(raw) {
  const d = { ...seed, ...(raw || {}) };
  d.trainees = Array.isArray(d.trainees) ? d.trainees : seed.trainees;
  d.trainers = Array.isArray(d.trainers) ? d.trainers : seed.trainers;
  d.courses = Array.isArray(d.courses) ? d.courses : seed.courses;
  d.activities = Array.isArray(d.activities) ? d.activities : seed.activities;
  d.assignments = Array.isArray(d.assignments) ? d.assignments : seed.assignments;
  d.courseContents = Array.isArray(d.courseContents) ? d.courseContents : seed.courseContents;
  d.users = Array.isArray(d.users) ? d.users : seed.users;
  d.users = d.users.map(u => {
    const base = defaultUsers.find(x => x.username === u.username) || {};
    return {
      ...base,
      ...u,
      password: u.password || base.password || "123456",
      permissions: Array.isArray(u.permissions) && u.permissions.length ? u.permissions : (base.permissions || ["dashboard"]),
      status: u.status || "Active"
    };
  });
  for (const u of defaultUsers) {
    if (!d.users.some(x => x.username === u.username)) d.users.push(u);
  }
  return d;
}

function loadData() {
  try {
    OLD_KEYS.forEach(k => localStorage.removeItem(k));
    return normalizeData(JSON.parse(localStorage.getItem(STORE_KEY) || "null"));
  } catch {
    return seed;
  }
}

function saveData(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(normalizeData(data)));
}

function loadUser() {
  try {
    const u = JSON.parse(localStorage.getItem("utp-current-user-v8") || "null");
    if (!u || !u.username) return null;
    const base = defaultUsers.find(x => x.username === u.username) || {};
    return normalizeData({ users: [{ ...base, ...u }] }).users[0];
  } catch {
    return null;
  }
}

function Badge({ children }) {
  const value = String(children || "");
  let cls = "badge blue";
  if (["نشط", "Active", "حاضر", "Present", "Admin"].some(x => value.includes(x))) cls = "badge green";
  if (["مخطط", "Planned", "متأخر", "Late", "Supervisor"].some(x => value.includes(x))) cls = "badge amber";
  if (["غائب", "Absent", "Disabled"].some(x => value.includes(x))) cls = "badge red";
  return <span className={cls}>{children}</span>;
}

function Button({ children, variant = "primary", ...props }) {
  return <button className={`btn ${variant}`} {...props}>{children}</button>;
}

function Card({ children, className = "" }) {
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`card ${className}`}>{children}</motion.div>;
}

function Field({ label, children }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

function Input(props) {
  return <input className="input" {...props} />;
}

function Select(props) {
  return <select className="input" {...props} />;
}

function Modal({ open, title, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modalOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal" initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}>
            <div className="modalHead">
              <h2>{title}</h2>
              <Button variant="ghost" onClick={onClose}><X size={18} /></Button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const nav = [
  ["dashboard", LayoutDashboard],
  ["trainees", UsersIcon],
  ["trainers", GraduationCap],
  ["courses", BookOpen],
  ["courseLibrary", Video],
  ["activities", Activity],
  ["assignments", UserCog],
  ["reports", BarChart3],
  ["users", ShieldCheck],
  ["settings", Settings]
];

function App() {
  const [data, setData] = useState(loadData);
  const [currentUser, setCurrentUser] = useState(loadUser);
  const [lang, setLang] = useState(localStorage.getItem("utp-lang") || "ar");
  const [dark, setDark] = useState(localStorage.getItem("utp-dark") === "1");
  const [page, setPage] = useState("dashboard");
  const [q, setQ] = useState("");
  const [mobile, setMobile] = useState(false);

  const t = translations[lang] || translations.ar;

  useEffect(() => saveData(data), [data]);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("utp-lang", lang);
    localStorage.setItem("utp-dark", dark ? "1" : "0");
  }, [lang, dark]);

  useEffect(() => {
    if (currentUser) localStorage.setItem("utp-current-user-v8", JSON.stringify(currentUser));
    else localStorage.removeItem("utp-current-user-v8");
  }, [currentUser]);

  const appApi = useMemo(() => ({
    data,
    add: (module, item) => setData(d => ({ ...d, [module]: [{ ...item, id: Date.now() }, ...(d[module] || [])] })),
    update: (module, item) => setData(d => ({ ...d, [module]: (d[module] || []).map(x => x.id === item.id ? item : x) })),
    remove: (module, id) => setData(d => ({ ...d, [module]: (d[module] || []).filter(x => x.id !== id) })),
    setData
  }), [data]);

  if (!currentUser) {
    return <LoginPage t={t} data={data} setCurrentUser={setCurrentUser} lang={lang} setLang={setLang} dark={dark} setDark={setDark} />;
  }

  const allowedPages = Array.isArray(currentUser.permissions) && currentUser.permissions.length ? currentUser.permissions : ["dashboard"];
  const activePage = allowedPages.includes(page) ? page : allowedPages[0];

  return (
    <div className="appShell">
      <Sidebar t={t} page={activePage} setPage={setPage} mobile={mobile} setMobile={setMobile} currentUser={currentUser} />
      <main className="main">
        <Topbar t={t} title={t[activePage] || t.dashboard} q={q} setQ={setQ} lang={lang} setLang={setLang} dark={dark} setDark={setDark} setMobile={setMobile} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <section className="content">
          {activePage === "dashboard" && <Dashboard t={t} data={data} setPage={setPage} />}
          {activePage === "trainees" && <Trainees t={t} app={appApi} q={q} />}
          {activePage === "trainers" && <Trainers t={t} app={appApi} q={q} />}
          {activePage === "courses" && <Courses t={t} app={appApi} q={q} />}
          {activePage === "courseLibrary" && <CourseLibrary t={t} app={appApi} q={q} />}
          {activePage === "activities" && <Activities t={t} app={appApi} q={q} />}
          {activePage === "assignments" && <Assignments t={t} app={appApi} q={q} />}
          {activePage === "reports" && <Reports t={t} data={data} />}
          {activePage === "users" && <UsersPage t={t} app={appApi} q={q} />}
          {activePage === "settings" && <SettingsPage t={t} app={appApi} lang={lang} setLang={setLang} dark={dark} setDark={setDark} />}
        </section>
      </main>
    </div>
  );
}

function LoginPage({ t, data, setCurrentUser, lang, setLang, dark, setDark }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    const u = username.trim();
    const p = password.trim();
    const users = normalizeData(data).users;
    const user = users.find(x => String(x.username).trim() === u && String(x.password).trim() === p && x.status !== "Disabled");
    if (!user) {
      setError(lang === "ar" ? "اسم المستخدم أو كلمة المرور غير صحيحة" : "Invalid username or password");
      return;
    }
    setCurrentUser(user);
  };

  return (
    <div className="loginPage proLogin">
      <div className="loginBackground"><span className="orb one" /><span className="orb two" /><span className="orb three" /></div>
      <motion.div className="loginShell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <section className="loginVisual">
          <div className="visualBadge"><ShieldCheck size={22} /> Secure Access</div>
          <h2>{lang === "ar" ? "إدارة التدريب باحترافية" : "Enterprise Training Management"}</h2>
          <p>{lang === "ar" ? "دخول آمن حسب الدور والصلاحيات وربط كامل بين التدريب والمدربين والمتدربين." : "Role-based secure access with connected training, trainers and trainee assignments."}</p>
          <div className="visualStats">
            <div><strong>9</strong><span>{lang === "ar" ? "شاشات" : "Modules"}</span></div>
            <div><strong>4</strong><span>{lang === "ar" ? "أدوار" : "Roles"}</span></div>
            <div><strong>RTL</strong><span>{lang === "ar" ? "دعم عربي" : "Arabic Ready"}</span></div>
          </div>
        </section>
        <section className="loginCard proCard">
          <div className="loginLogo">T</div>
          <h1>{t.app}</h1>
          <div className="formStack">
            <Field label={t.username}><Input value={username} onChange={e => { setUsername(e.target.value); setError(""); }} placeholder={lang === "ar" ? "اكتب اسم المستخدم" : "Enter username"} /></Field>
            <Field label={t.password}><Input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} placeholder={lang === "ar" ? "اكتب كلمة المرور" : "Enter password"} onKeyDown={e => { if (e.key === "Enter") login(); }} /></Field>
            {error && <div className="loginError">{error}</div>}
            <Button onClick={login}>{t.login}</Button>
          </div>
          <div className="loginTools">
            <Button variant="secondary" onClick={() => setLang(lang === "ar" ? "en" : "ar")}><Languages size={16} />{lang === "ar" ? "EN" : "AR"}</Button>
            <Button variant="secondary" onClick={() => setDark(!dark)}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function Sidebar({ t, page, setPage, mobile, setMobile, currentUser }) {
  const allowed = currentUser?.permissions || ["dashboard"];
  return (
    <>
      <div className={`mobileBackdrop ${mobile ? "show" : ""}`} onClick={() => setMobile(false)} />
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <div className="brand">
          <div className="logo">T</div>
          <div>
            <h1>{t.app}</h1>
            <p>{currentUser?.role}</p>
          </div>
          <button className="onlyMobile closeBtn" onClick={() => setMobile(false)}><X /></button>
        </div>
        <nav>
          {nav.filter(([key]) => allowed.includes(key)).map(([key, Icon]) => (
            <button key={key} className={page === key ? "active" : ""} onClick={() => { setPage(key); setMobile(false); }}>
              <Icon size={18} /><span>{t[key]}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

function Topbar({ t, title, q, setQ, lang, setLang, dark, setDark, setMobile, currentUser, setCurrentUser }) {
  return (
    <header className="topbar">
      <div className="titleWrap">
        <Button variant="ghost onlyMobileBtn" onClick={() => setMobile(true)}><Menu /></Button>
        <div><h2>{title}</h2><p>{currentUser?.name} · {currentUser?.role}</p></div>
      </div>
      <div className="topActions">
        <div className="search"><Search size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} /></div>
        <Button variant="secondary" onClick={() => setLang(lang === "ar" ? "en" : "ar")}><Languages size={16} />{lang === "ar" ? "EN" : "AR"}</Button>
        <Button variant="secondary" onClick={() => setDark(!dark)}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button>
        <Button variant="ghost"><Bell size={18} /></Button>
        <Button variant="secondary" onClick={() => setCurrentUser(null)}>{t.logout}</Button>
      </div>
    </header>
  );
}

function Dashboard({ t, data, setPage }) {
  const attendance = Math.round(((data.activities || []).filter(a => a.attendance === "حاضر" || a.attendance === "Present").length / Math.max((data.activities || []).length, 1)) * 100);
  const completion = Math.round(((data.courses || []).filter(c => c.status === "مكتمل" || c.status === "Completed").length / Math.max((data.courses || []).length, 1)) * 100);
  const cards = [
    [t.totalTrainees, data.trainees.length, UsersIcon],
    [t.totalTrainers, data.trainers.length, GraduationCap],
    [t.activeCourses, data.courses.filter(c => c.status === "نشط" || c.status === "Active").length, BookOpen],
    [t.totalActivities, data.activities.length, Activity],
    [t.attendanceRate, `${attendance}%`, CheckCircle2],
    [t.completionRate, `${completion}%`, ClipboardCheck]
  ];
  const chartData = [
    { name: "Jan", activities: 20, attendance: 80 },
    { name: "Feb", activities: 26, attendance: 84 },
    { name: "Mar", activities: 31, attendance: 88 },
    { name: "Apr", activities: 38, attendance: 91 },
    { name: "May", activities: Math.max(data.activities.length * 12, 25), attendance }
  ];
  return (
    <div className="pageStack">
      <div className="statsGrid">
        {cards.map(([label, value, Icon]) => <Card key={label} className="statCard"><div><span>{label}</span><strong>{value}</strong></div><i><Icon size={20} /></i></Card>)}
      </div>
      <div className="dashboardGrid">
        <Card className="chartCard wide">
          <div className="cardHead"><div><h3>{t.totalActivities}</h3><p>{t.attendanceRate}</p></div><Button variant="secondary"><Filter size={16} />{t.filters}</Button></div>
          <div className="chartBox"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area type="monotone" dataKey="activities" stroke="#2563eb" fill="#bfdbfe" strokeWidth={3} /><Area type="monotone" dataKey="attendance" stroke="#10b981" fillOpacity={0} strokeWidth={3} /></AreaChart></ResponsiveContainer></div>
        </Card>
        <Card className="chartCard">
          <h3>{t.attendanceRate}</h3>
          <div className="chartBox small"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{ name: t.present, value: attendance }, { name: t.absent, value: 100 - attendance }]} dataKey="value" innerRadius={55} outerRadius={82}><Cell fill="#2563eb" /><Cell fill="#e2e8f0" /></Pie><Tooltip /></PieChart></ResponsiveContainer></div>
          <div className="centerMetric">{attendance}%</div>
        </Card>
      </div>
      <div className="dashboardGrid">
        <Card><h3>{t.quick}</h3><div className="quickButtons"><Button onClick={() => setPage("trainees")}><Plus size={16} />{t.trainees}</Button><Button variant="secondary" onClick={() => setPage("activities")}><CalendarDays size={16} />{t.activities}</Button><Button variant="secondary" onClick={() => window.print()}><Download size={16} />{t.export}</Button></div></Card>
        <Card className="wide"><h3>{t.recent}</h3><div className="activityList">{data.activities.slice(0, 5).map(a => <div key={a.id} className="activityItem"><div><strong>{a.activityTitle}</strong><span>{a.trainer} → {a.trainee} · {a.course}</span></div><Badge>{a.attendance}</Badge></div>)}</div></Card>
      </div>
    </div>
  );
}

function Header({ title, desc, addLabel, onAdd, t }) {
  return <div className="pageHeader"><div><h3>{title}</h3><p>{desc}</p></div><div className="headerActions"><Button variant="secondary"><Filter size={16} />{t.filters}</Button><Button variant="secondary" onClick={() => window.print()}><Download size={16} />{t.export}</Button>{addLabel && <Button onClick={onAdd}><Plus size={16} />{addLabel}</Button>}</div></div>;
}

function Table({ columns, rows, q, onEdit, onDelete, t }) {
  const filtered = (rows || []).filter(r => JSON.stringify(r).toLowerCase().includes((q || "").toLowerCase()));
  return (
    <Card className="tableCard"><div className="tableWrap"><table><thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th>{t.actions}</th></tr></thead><tbody>{filtered.map(row => <tr key={row.id}>{columns.map(c => <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}<td><div className="rowActions"><Button variant="secondary" onClick={() => onEdit(row)}><Pencil size={15} /></Button><Button variant="danger" onClick={() => onDelete(row.id)}><Trash2 size={15} /></Button></div></td></tr>)}</tbody></table></div></Card>
  );
}

function CrudModule({ t, app, q, module, title, desc, addLabel, blank, fields, columns, extra }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const openAdd = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = row => { setEditing(row); setForm(row); setOpen(true); };
  const save = () => { editing ? app.update(module, form) : app.add(module, form); setOpen(false); };
  return (
    <div className="pageStack">
      <Header title={title} desc={desc} addLabel={addLabel} onAdd={openAdd} t={t} />
      {extra}
      <Table columns={columns} rows={app.data[module]} q={q} onEdit={openEdit} onDelete={(id) => app.remove(module, id)} t={t} />
      <Modal open={open} title={editing ? t.edit : addLabel} onClose={() => setOpen(false)}>
        <div className="formGrid">{fields.map(f => <Field key={f.key} label={f.label}>{f.type === "select" ? <Select value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}>{(f.options || []).map(o => <option key={o}>{o}</option>)}</Select> : <Input type={f.type || "text"} value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} />}</Field>)}</div>
        <div className="modalActions"><Button variant="secondary" onClick={() => setOpen(false)}>{t.cancel}</Button><Button onClick={save}>{t.save}</Button></div>
      </Modal>
    </div>
  );
}

function Trainees({ t, app, q }) {
  const trainers = app.data.trainers.map(x => x.trainerName);
  return <CrudModule t={t} app={app} q={q} module="trainees" title={t.trainees} desc="Manage trainee profiles, attachments, history and assigned trainer." addLabel={`${t.add} ${t.trainee}`} blank={{ fullName: "", nationalId: "", phone: "", email: "", organization: "", department: "", jobTitle: "", status: t.progress, regDate: new Date().toISOString().slice(0, 10), assignedTrainer: trainers[0] || "", notes: "" }} fields={[{ key: "fullName", label: t.fullName }, { key: "nationalId", label: t.nationalId }, { key: "phone", label: t.phone }, { key: "email", label: t.email }, { key: "organization", label: t.organization }, { key: "department", label: t.department }, { key: "jobTitle", label: t.jobTitle }, { key: "regDate", label: t.regDate, type: "date" }, { key: "status", label: t.status, type: "select", options: [t.progress, t.active, t.completed] }, { key: "assignedTrainer", label: t.assignedTrainer, type: "select", options: trainers }, { key: "notes", label: t.notes }]} columns={[{ key: "fullName", label: t.fullName }, { key: "nationalId", label: t.nationalId }, { key: "organization", label: t.organization }, { key: "jobTitle", label: t.jobTitle }, { key: "status", label: t.status, render: v => <Badge>{v}</Badge> }, { key: "assignedTrainer", label: t.assignedTrainer }]} />;
}

function Trainers({ t, app, q }) {
  const extra = <div className="miniGrid">{app.data.trainers.slice(0, 3).map(tr => <Card key={tr.id} className="trainerMini"><div className="avatar">{tr.trainerName.slice(0, 1)}</div><div><strong>{tr.trainerName}</strong><span>{tr.specialization}</span></div></Card>)}</div>;
  return <CrudModule t={t} app={app} q={q} module="trainers" title={t.trainers} desc="Manage trainers, CVs, assigned courses and performance." addLabel={`${t.add} ${t.trainer}`} blank={{ trainerName: "", specialization: "", phone: "", email: "", experience: 0, courses: "", status: t.active }} fields={[{ key: "trainerName", label: t.trainerName }, { key: "specialization", label: t.specialization }, { key: "phone", label: t.phone }, { key: "email", label: t.email }, { key: "experience", label: t.experience, type: "number" }, { key: "courses", label: t.courseName }, { key: "status", label: t.status, type: "select", options: [t.active, t.progress] }]} columns={[{ key: "trainerName", label: t.trainerName }, { key: "specialization", label: t.specialization }, { key: "phone", label: t.phone }, { key: "email", label: t.email }, { key: "experience", label: t.experience }, { key: "status", label: t.status, render: v => <Badge>{v}</Badge> }]} extra={extra} />;
}

function Courses({ t, app, q }) {
  const trainers = app.data.trainers.map(x => x.trainerName);
  return <CrudModule t={t} app={app} q={q} module="courses" title={t.courses} desc="Plan courses, track attendance, completion and assigned trainer." addLabel={`${t.add} ${t.courseName}`} blank={{ courseName: "", description: "", duration: "", trainingType: t.onsite, startDate: "", endDate: "", assignedTrainer: trainers[0] || "", organization: "", status: t.planned }} fields={[{ key: "courseName", label: t.courseName }, { key: "description", label: t.description }, { key: "duration", label: t.duration }, { key: "trainingType", label: t.trainingType, type: "select", options: [t.onsite, t.online, t.hybrid] }, { key: "startDate", label: t.startDate, type: "date" }, { key: "endDate", label: t.endDate, type: "date" }, { key: "assignedTrainer", label: t.assignedTrainer, type: "select", options: trainers }, { key: "organization", label: t.organization }, { key: "status", label: t.status, type: "select", options: [t.planned, t.active, t.completed] }]} columns={[{ key: "courseName", label: t.courseName }, { key: "duration", label: t.duration }, { key: "trainingType", label: t.trainingType }, { key: "startDate", label: t.startDate }, { key: "endDate", label: t.endDate }, { key: "assignedTrainer", label: t.assignedTrainer }, { key: "status", label: t.status, render: v => <Badge>{v}</Badge> }]} />;
}


function CourseLibrary({ t, app, q }) {
  const courses = app.data.courseContents || [];
  const trainees = app.data.trainees.map(x => x.fullName);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedTrainees, setSelectedTrainees] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseName: "", category: "", udemyLink: "", description: "", totalLength: "",
    assignedTrainees: [], sections: [{ id: 1, title: "", meta: "", videos: [{ id: 1, title: "", duration: "", url: "" }] }]
  });
  const course = courses.find(c => c.id === selectedCourse) || courses[0];

  const toggleTrainee = name => setSelectedTrainees(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);

  const saveAssignment = () => {
    if (!course) return;
    app.update("courseContents", { ...course, assignedTrainees: Array.from(new Set([...(course.assignedTrainees || []), ...selectedTrainees])) });
    setSelectedTrainees([]);
    setAssignOpen(false);
  };

  const saveCourse = () => {
    app.add("courseContents", { ...newCourse, id: Date.now() });
    setAddOpen(false);
  };

  return (
    <div className="pageStack courseLibraryPage">
      <Header title={t.courseLibrary} desc="Register course content, Udemy links, sections, videos and trainee assignments." addLabel={t.add} onAdd={() => setAddOpen(true)} t={t} />

      <div className="courseHero">
        <div>
          <div className="courseIcon"><BookOpen size={28} /></div>
          <h2>{course?.courseName || t.courseLibrary}</h2>
          <p>{course?.description}</p>
          <div className="courseMeta">
            <span>{(course?.sections || []).length} sections</span>
            <span>{course?.totalLength}</span>
            <span>{(course?.assignedTrainees || []).length} assigned trainees</span>
          </div>
        </div>
        <div className="courseHeroActions">
          {course?.udemyLink && <Button variant="secondary" onClick={() => window.open(course.udemyLink, "_blank")}><ExternalLink size={16} />{t.openUdemy || "Udemy"}</Button>}
          <Button onClick={() => setAssignOpen(true)}><UsersIcon size={16} />{t.assignCourse}</Button>
        </div>
      </div>

      <div className="udemyLayout">
        <Card className="courseSections">
          {courses.filter(c => JSON.stringify(c).toLowerCase().includes((q || "").toLowerCase())).map(c => (
            <button key={c.id} className={c.id === course?.id ? "courseSection active" : "courseSection"} onClick={() => setSelectedCourse(c.id)}>
              <span className="sectionNumber">{(c.sections || []).length}</span>
              <div><strong>{c.courseName}</strong><small>{c.totalLength || "Course content"}</small></div>
            </button>
          ))}
        </Card>

        <Card className="courseContentPanel">
          <div className="courseTag">{course?.category || t.courseContent}</div>
          <h3>{course?.courseName}</h3>
          <p>{course?.description}</p>

          <div className="courseAssigned">
            <strong>{t.assignedTrainees}</strong>
            <div className="chips neutral">
              {(course?.assignedTrainees || []).length ? course.assignedTrainees.map(x => <span key={x}>{x}</span>) : <span>No assigned trainees</span>}
            </div>
          </div>

          <div className="sectionList">
            {(course?.sections || []).map((section, index) => (
              <div className="courseVideoSection" key={section.id || index}>
                <div className="videoSectionHeader">
                  <span className="sectionPill">Section {section.id || index + 1}</span>
                  <h4>{section.title}</h4>
                  <p>{section.meta}</p>
                </div>
                <div className="videoRows">
                  {(section.videos || []).map(video => (
                    <div className="videoRow" key={video.id}>
                      <div className="videoTitle"><PlayCircle size={18} /><span>{video.title}</span></div>
                      <div className="videoActions">
                        <span><Clock size={14} />{video.duration}</span>
                        <Button variant="secondary" onClick={() => window.open(video.url || course.udemyLink, "_blank")}><LinkIcon size={14} />{t.watch}</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal open={assignOpen} title={t.assignCourse} onClose={() => setAssignOpen(false)}>
        <div className="assignSummary"><strong>{course?.courseName}</strong><span>{course?.udemyLink}</span></div>
        <div className="chips selectable">{trainees.map(name => <button key={name} className={selectedTrainees.includes(name) ? "selected" : ""} onClick={() => toggleTrainee(name)}>{name}</button>)}</div>
        <div className="modalActions"><Button variant="secondary" onClick={() => setAssignOpen(false)}>{t.cancel}</Button><Button onClick={saveAssignment}>{t.save}</Button></div>
      </Modal>

      <Modal open={addOpen} title={`${t.add} ${t.courseLibrary}`} onClose={() => setAddOpen(false)}>
        <div className="formGrid">
          <Field label={t.courseName}><Input value={newCourse.courseName} onChange={e => setNewCourse({ ...newCourse, courseName: e.target.value })} /></Field>
          <Field label={t.udemyLink}><Input value={newCourse.udemyLink} onChange={e => setNewCourse({ ...newCourse, udemyLink: e.target.value })} /></Field>
          <Field label="Category"><Input value={newCourse.category} onChange={e => setNewCourse({ ...newCourse, category: e.target.value })} /></Field>
          <Field label="Total Length"><Input value={newCourse.totalLength} onChange={e => setNewCourse({ ...newCourse, totalLength: e.target.value })} /></Field>
          <Field label={t.description}><Input value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} /></Field>
          <Field label="Section Title"><Input value={newCourse.sections[0].title} onChange={e => setNewCourse({ ...newCourse, sections: [{ ...newCourse.sections[0], title: e.target.value }] })} /></Field>
          <Field label="Video Title"><Input value={newCourse.sections[0].videos[0].title} onChange={e => setNewCourse({ ...newCourse, sections: [{ ...newCourse.sections[0], videos: [{ ...newCourse.sections[0].videos[0], title: e.target.value }] }] })} /></Field>
          <Field label="Video Duration"><Input value={newCourse.sections[0].videos[0].duration} onChange={e => setNewCourse({ ...newCourse, sections: [{ ...newCourse.sections[0], videos: [{ ...newCourse.sections[0].videos[0], duration: e.target.value }] }] })} /></Field>
        </div>
        <div className="modalActions"><Button variant="secondary" onClick={() => setAddOpen(false)}>{t.cancel}</Button><Button onClick={saveCourse}>{t.save}</Button></div>
      </Modal>
    </div>
  );
}


function Activities({ t, app, q }) {
  const trainers = app.data.trainers.map(x => x.trainerName);
  const trainees = app.data.trainees.map(x => x.fullName);
  const courses = app.data.courses.map(x => x.courseName);
  return <CrudModule t={t} app={app} q={q} module="activities" title={t.activities} desc="Main module: automatically connects Trainer + Trainee + Course + Evaluation." addLabel={t.activities} blank={{ activityTitle: "", activityType: "Workshop", date: new Date().toISOString().slice(0, 10), startTime: "09:00", endTime: "10:00", trainer: trainers[0] || "", trainee: trainees[0] || "", course: courses[0] || "", notes: "", performance: 80, attendance: t.present }} fields={[{ key: "activityTitle", label: t.activityTitle }, { key: "activityType", label: t.activityType }, { key: "date", label: t.date, type: "date" }, { key: "startTime", label: t.startTime, type: "time" }, { key: "endTime", label: t.endTime, type: "time" }, { key: "trainer", label: t.trainer, type: "select", options: trainers }, { key: "trainee", label: t.trainee, type: "select", options: trainees }, { key: "course", label: t.course, type: "select", options: courses }, { key: "performance", label: t.performance, type: "number" }, { key: "attendance", label: t.attendance, type: "select", options: [t.present, t.absent, t.late] }, { key: "notes", label: t.notes }]} columns={[{ key: "activityTitle", label: t.activityTitle }, { key: "date", label: t.date }, { key: "trainer", label: t.trainer }, { key: "trainee", label: t.trainee }, { key: "course", label: t.course }, { key: "performance", label: t.performance, render: v => <strong className="blueText">{v}%</strong> }, { key: "attendance", label: t.attendance, render: v => <Badge>{v}</Badge> }]} />;
}

function Assignments({ t, app, q }) {
  const courses = app.data.courses.map(x => x.courseName);
  const trainers = app.data.trainers.map(x => x.trainerName);
  const trainees = app.data.trainees.map(x => x.fullName);
  const [selectedTrainees, setSelectedTrainees] = useState([]);
  const [form, setForm] = useState({ training: courses[0] || "", trainer: trainers[0] || "", traineeGroup: "Group A", trainees: [], date: new Date().toISOString().slice(0, 10), notes: "" });
  const toggleTrainee = name => setSelectedTrainees(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
  const save = () => { app.add("assignments", { ...form, trainees: selectedTrainees }); setSelectedTrainees([]); };
  const columns = [{ key: "training", label: t.selectTraining }, { key: "trainer", label: t.selectTrainer }, { key: "traineeGroup", label: t.traineeGroup }, { key: "trainees", label: t.assignedTrainees, render: v => Array.isArray(v) ? v.join(", ") : "" }, { key: "date", label: t.date }];
  return (
    <div className="pageStack">
      <Header title={t.assignments} desc="Select training, responsible trainer, trainee group and save the relationship." t={t} />
      <Card>
        <div className="formGrid">
          <Field label={t.selectTraining}><Select value={form.training} onChange={e => setForm({ ...form, training: e.target.value })}>{courses.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label={t.selectTrainer}><Select value={form.trainer} onChange={e => setForm({ ...form, trainer: e.target.value })}>{trainers.map(x => <option key={x}>{x}</option>)}</Select></Field>
          <Field label={t.traineeGroup}><Input value={form.traineeGroup} onChange={e => setForm({ ...form, traineeGroup: e.target.value })} /></Field>
          <Field label={t.date}><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></Field>
        </div>
        <div className="traineePicker"><h3>{t.assignedTrainees}</h3><div className="chips selectable">{trainees.map(name => <button key={name} className={selectedTrainees.includes(name) ? "selected" : ""} onClick={() => toggleTrainee(name)}>{name}</button>)}</div></div>
        <Field label={t.notes}><Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></Field>
        <div className="modalActions"><Button onClick={save}>{t.saveAssignment}</Button></div>
      </Card>
      <Table columns={columns} rows={app.data.assignments || []} q={q} onEdit={() => {}} onDelete={(id) => app.remove("assignments", id)} t={t} />
    </div>
  );
}

function Reports({ t, data }) {
  const chart = [{ name: t.trainees, value: data.trainees.length }, { name: t.trainers, value: data.trainers.length }, { name: t.courses, value: data.courses.length }, { name: t.activities, value: data.activities.length }];
  return <div className="pageStack"><Header title={t.reports} desc="Export PDF / Excel, visual charts and monthly statistics." addLabel={t.export} onAdd={() => window.print()} t={t} /><div className="dashboardGrid"><Card className="wide"><h3>{t.reports}</h3><div className="chartBox"><ResponsiveContainer width="100%" height="100%"><BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#2563eb" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer></div></Card><Card><h3>{t.performance}</h3><div className="performanceList">{data.activities.map(a => <div key={a.id} className="performanceItem"><div><strong>{a.trainee}</strong><span>{a.performance}%</span></div><div className="progress"><i style={{ width: `${a.performance}%` }} /></div></div>)}</div></Card></div></div>;
}

function UsersPage({ t, app, q }) {
  return <CrudModule t={t} app={app} q={q} module="users" title={t.users} desc="Admin can manage users, roles, permissions and reset passwords." addLabel={`${t.add} User`} blank={{ name: "", username: "", password: "123456", role: "Viewer", status: "Active", permissions: ["dashboard"] }} fields={[{ key: "name", label: t.fullName }, { key: "username", label: t.username }, { key: "password", label: t.password }, { key: "role", label: t.role, type: "select", options: ["Admin", "Supervisor", "Trainer", "Viewer"] }, { key: "status", label: t.status, type: "select", options: ["Active", "Disabled"] }]} columns={[{ key: "name", label: t.fullName }, { key: "username", label: t.username }, { key: "role", label: t.role, render: v => <Badge>{v}</Badge> }, { key: "status", label: t.status, render: v => <Badge>{v}</Badge> }, { key: "permissions", label: "Permissions", render: v => <span className="mutedSmall">{Array.isArray(v) ? v.length + " screens" : "0 screens"}</span> }]} />;
}

function SettingsPage({ t, app, lang, setLang, dark, setDark }) {
  const [settings, setSettings] = useState(app.data.settings || seed.settings);
  const save = () => app.setData(d => ({ ...d, settings }));
  return <div className="pageStack"><Header title={t.settings} desc="Company information, categories, organizations, departments, languages and theme." addLabel={t.save} onAdd={save} t={t} /><div className="dashboardGrid"><Card><h3>{t.company}</h3><div className="formStack"><Field label="Company Name"><Input value={settings.companyName} onChange={e => setSettings({ ...settings, companyName: e.target.value })} /></Field><Field label={t.lang}><Select value={lang} onChange={e => setLang(e.target.value)}><option value="ar">العربية</option><option value="en">English</option></Select></Field><Field label={t.theme}><Select value={dark ? "dark" : "light"} onChange={e => setDark(e.target.value === "dark")}><option value="light">Light</option><option value="dark">Dark</option></Select></Field></div></Card><Card className="wide"><h3>{t.categories}</h3><div className="chips">{settings.categories.map(x => <span key={x}>{x}</span>)}</div><h3>{t.orgs}</h3><div className="chips neutral">{settings.organizations.map(x => <span key={x}>{x}</span>)}</div><h3>{t.deps}</h3><div className="chips neutral">{settings.departments.map(x => <span key={x}>{x}</span>)}</div></Card></div></div>;
}

createRoot(document.getElementById("root")).render(<App />);
