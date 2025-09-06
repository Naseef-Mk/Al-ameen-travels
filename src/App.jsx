import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plane, FileBadge2, PackageOpen, Building2, Users, ShieldCheck, Clock,
  Phone, Mail, MapPin, Globe, ChevronRight, Menu, X, Facebook, Instagram,
  Linkedin, ArrowUpRight, BadgeCheck, Info
} from "lucide-react";

// ---------- Quick Style Helpers ----------
const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const sectionTitle = "text-2xl sm:text-3xl font-extrabold tracking-tight";
const sectionSub = "mt-2 text-slate-600 max-w-2xl";
const card = "rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow";
const btn = "inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-sm ring-1 ring-slate-200 hover:shadow-md active:scale-[.98]";

// ---------- Company Config ----------
const company = {
  name: "ALAMEEN TRAVEL TOURS & CARGO",
  tagline: "Tickets • Visa • Corporate Travel",
  city: "Salalah, Oman",
  phone: "+968 90664141",
  whatsapp: "96890664141",
  email: "shukoor@alameentravel.com",
  years: 9,
  branchesCount: 3,
  corporatesNote: "Trusted by leading corporates",
  addressMain: "23rd July Street, Salalah",
};
// Format helpers
const toWhatsAppDigits = (val = "") => String(val).replace(/\D/g, "");
const buildWhatsAppUrl = (phone, text) =>
  `https://wa.me/${toWhatsAppDigits(phone)}?text=${encodeURIComponent(text)}`;

const branches = [
  { name: "Head Office", area: "Central Salalah", address: "23rd July St, Salalah", phone: "+968 99172257", maps: "https://www.google.com/maps?q=Salalah%20Oman&output=embed" },
  { name: "New Salalah", area: "Al nahda Street", address: "Near Muscat Pharmacy, Salalah", phone: "+968 90941233", maps: "https://www.google.com/maps?q=Haffa%20Salalah&output=embed" },
  { name: "Sa'adah Branch", area: "Saadah", address: "Al Mashhoor Complex, Saadah, Salalah", phone: company.phone, maps: "https://www.google.com/maps?q=Saadah%20Salalah&output=embed" },
];

const nav = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "corporates", label: "Corporates" },
  { id: "branches", label: "Branches" },
  { id: "cargo", label: "Cargo" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const services = [
  {
    title: "Air Tickets",
    desc: "Worldwide flight bookings with best-value itineraries, rescheduling support, and multi-airline options.",
    icon: Plane,
    cta: "Book Tickets",
    href: `https://wa.me/${"96890664141"}?text=I%20want%20to%20book%20air%20tickets`,
  },
  {
    title: "Visa Processing",
    desc: "End-to-end visa assistance: documentation, application filing, appointment help, and status guidance.",
    icon: FileBadge2,
    cta: "Start Visa",
    href: `https://wa.me/${"96890664141"}?text=Visa%20processing%20enquiry`,
  },
  {
    title: "Cargo",
    desc: "Our cargo services are being set up. Please check back soon.",
    icon: PackageOpen,
    cta: "Coming Soon",
    href: "#cargo",
    disabled: true,
    badge: "Soon",
  },
];

const faqs = [
  { q: "Do you operate only in Salalah?", a: "Our teams are based in Salalah across three branches, but we serve customers across Oman and abroad via phone, WhatsApp, and email." },
  { q: "Which services are available now?", a: "Currently we provide Air Tickets and Visa Processing. Cargo is planned and will launch soon." },
  { q: "Do you handle corporate travel?", a: "Yes. We manage negotiated fares, last‑minute changes, and billing tailored for enterprise workflows." },
  { q: "What documents are needed for visa help?", a: "It varies by destination. Typically passport scans, photos, bank statements, travel plan, and forms. Contact us and we’ll share a destination‑specific checklist." },
];



const heroPhotos = [
  "https://images.squarespace-cdn.com/content/v1/663347bbc67a1e4c304c3ab8/cf780b6c-7a86-4560-bc03-b6fd353b10b6/marwan-alfarsi-ci3C0TxhP24-unsplash.jpg",
  "https://www.holidify.com/images/bgImages/SALALAH.jpg",
  
 
];

// ---------- Small UI primitives ----------
function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100 ${className}`}>{children}</span>;
}
function Pill({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 ${className}`}>{children}</span>;
}
function IconCircle({ Icon, tone = "sky" }) {
  const palette = {
    sky: "bg-sky-50 text-sky-600 ring-sky-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
    slate: "bg-slate-50 text-slate-600 ring-slate-100",
  };
  return <div className={`h-12 w-12 rounded-2xl grid place-content-center ring-1 ${palette[tone]}`}><Icon className="h-6 w-6" /></div>;
}
function Section({ id, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`py-14 sm:py-16 ${className}`}>
      <div className={container}>
        {title && (
          <div className="mb-8">
            <h2 className={sectionTitle}>{title}</h2>
            {subtitle && <p className={sectionSub}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
function NavLink({ to, children, onClick }) {
  return (
    <a href={`#${to}`} onClick={onClick} className="text-sm font-semibold text-slate-700 hover:text-slate-900">
      {children}
    </a>
  );
}
function HeroCarousel({ photos = [] }) {
  const [i, setI] = React.useState(0);
  const count = photos.length;

  // auto-rotate every 5s
  React.useEffect(() => {
    if (!count) return;
    const id = setInterval(() => setI((p) => (p + 1) % count), 5000);
    return () => clearInterval(id);
  }, [count]);

  // keyboard navigation
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setI((p) => (p + 1) % count);
      if (e.key === "ArrowLeft") setI((p) => (p - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  if (!count) {
    return (
      <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200 h-[48vh] sm:h-[60vh] bg-slate-100" />
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-200 h-[48vh] sm:h-[60vh]">
      {/* image */}
      <img
        src={photos[i]}
        alt="Destination"
        className="absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
      />

      {/* subtle corner gradient (no blur) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/25 via-transparent to-transparent" />

      {/* Controls */}
      <button
        onClick={() => setI((p) => (p - 1 + count) % count)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 grid place-content-center h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 hover:bg-white"
      >
        ‹
      </button>
      <button
        onClick={() => setI((p) => (p + 1) % count)}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 grid place-content-center h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 hover:bg-white"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Main App ----------
export default function App() {
  const [open, setOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroPhotos.length), 5000);
    return () => clearInterval(id);
  }, []);

  const whatsappHref = useMemo(
    () => `https://wa.me/${company.whatsapp}?text=Hello%20ALAMEEN%2C%20I%27d%20like%20to%20plan%20a%20trip`,
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* Header (no backdrop-blur) */}
      <header className="sticky top-0 z-50 bg-white/95 border-b">
        <div className={`${container} flex items-center justify-between py-3`}>
          <div className="flex items-center gap-3">
            {/* Logo */}
            <a href="#home" className="shrink-0" aria-label={`${company.name} home`}>
              <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-slate-200 bg-white">
                <img
                  src={company.logoUrl || "./logo.png"}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </a>
            <div className="leading-tight">
              <div className="font-extrabold">{company.name}</div>
              <div className="text-xs text-slate-500">{company.tagline}</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <NavLink key={n.id} to={n.id}>{n.label}</NavLink>
            ))}
            <a href={whatsappHref} className={`${btn} bg-sky-600 text-white ring-sky-600/30`}>
              <Phone className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(true)} aria-label="Open Menu">
            <Menu />
          </button>
        </div>

        {/* Mobile sheet */}
        {open && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <div className="font-extrabold">Menu</div>
                <button onClick={() => setOpen(false)} aria-label="Close Menu"><X /></button>
              </div>
              <div className="mt-6 grid gap-4">
                {nav.map((n) => (
                  <NavLink key={n.id} to={n.id} onClick={() => setOpen(false)}>{n.label}</NavLink>
                ))}
                <a href={whatsappHref} className={`${btn} bg-sky-600 text-white ring-sky-600/30`}>
                  <Phone className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO (no blur, crisp image) */}
{/* =========================
   HERO (Redesigned, No-Blur)
   - Split layout (copy/paste over your old hero section)
   - Auto-rotating carousel (right side)
   - Arrow keys support, dots, and buttons
   - No blur overlays; text stays readable
========================= */}
<section id="home" className="relative border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] grid md:grid-cols-2 gap-8 items-center">
    {/* LEFT: Copy */}
    <div className="py-16 md:py-0">
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-sky-50 text-sky-700 ring-1 ring-sky-100">
        Salalah • {company.years}+ Years • {company.branchesCount} Branches
      </span>

      <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight text-slate-900">
        Fly smarter from {company.city}
      </h1>

      <p className="mt-4 text-slate-600 max-w-xl">
        {company.corporatesNote}. Tickets & visa handled by experts. Dedicated support for families and business travellers.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={whatsappHref}
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-sm ring-1 ring-emerald-200 bg-emerald-600 text-white hover:shadow-md active:scale-[.98]"
        >
          <Plane className="h-4 w-4" />
          Plan My Trip
        </a>
        <a
          href={whatsappHref}
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-sm ring-1 ring-slate-200 bg-white text-slate-900 hover:shadow-md active:scale-[.98]"
        >
          <FileBadge2 className="h-4 w-4" />
          Visa Help
        </a>
      </div>

      {/* Trust bullets */}
      <div className="mt-8 grid grid-cols-3 max-w-md gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 grid place-content-center rounded-xl ring-1 bg-emerald-50 text-emerald-600 ring-emerald-100">
            <ShieldCheck className="h-5 w-5" />
          </div>
          Reliable
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 grid place-content-center rounded-xl ring-1 bg-sky-50 text-sky-600 ring-sky-100">
            <Users className="h-5 w-5" />
          </div>
          Corporate-ready
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 grid place-content-center rounded-xl ring-1 bg-amber-50 text-amber-600 ring-amber-100">
            <Clock className="h-5 w-5" />
          </div>
          Quick support
        </div>
      </div>

      {/* Compact quick-enquiry strip (optional) */}
<form
  className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 p-3 rounded-2xl ring-1 ring-slate-200 bg-white"
  onSubmit={(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = `Hello ALAMEEN,%0A%0AI'd like to check fares.%0A%0AFrom: ${encodeURIComponent(
      data.get("from") || ""
    )}%0ATo: ${encodeURIComponent(data.get("to") || "")}%0ADepart: ${encodeURIComponent(
      data.get("depart") || ""
    )}%0AReturn: ${encodeURIComponent(data.get("return") || "")}%0ATravellers: ${encodeURIComponent(
      data.get("pax") || ""
    )}%0A%0AThanks!`;
    const wa = `https://wa.me/${company.whatsapp}?text=${msg}`;
    window.open(wa, "_blank");
  }}
>
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
    <input name="from" required placeholder="From (e.g., MCT)" className="rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
    <input name="to" required placeholder="To (e.g., DEL)" className="rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
    <input type="date" name="depart" required className="rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
    <input name="pax" placeholder="Name" className="rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200" />
  </div>
  <button type="submit" className="rounded-xl px-5 py-3 text-sm font-semibold bg-slate-900 text-white ring-1 ring-slate-900/10">
    Check Fare
  </button>
</form>

    </div>

    {/* RIGHT: Carousel (no blur) */}
    <HeroCarousel photos={heroPhotos} />
  </div>
</section>


      {/* Services */}
      <Section id="services" title="Our Services" subtitle="Focused on what we do best—tickets and visas. Cargo is coming soon.">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`${card} p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <IconCircle Icon={s.icon} tone={i === 0 ? "sky" : i === 1 ? "emerald" : "slate"} />
                {s.badge && <Badge>{s.badge}</Badge>}
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              <div className="mt-5">
                <a
                  href={s.href}
                  className={`${btn} ${s.disabled ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white ring-slate-900/10"}`}
                  onClick={(e) => s.disabled && e.preventDefault()}
                >
                  {s.cta} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Corporates */}
      <Section id="corporates" title="Enterprise & Corporate Travel" subtitle={company.corporatesNote}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Negotiated fares & flexible rules",
            "Dedicated account manager & SLAs",
            "Last‑minute change support",
            "Centralized invoicing & reports",
            "Traveler safety & compliance guidance",
            "Visa & document coordination",
          ].map((point, i) => (
            <div key={i} className={`${card} p-5 flex items-start gap-3`}>
              <IconCircle Icon={BadgeCheck} tone="emerald" />
              <div className="text-sm font-medium text-slate-700">{point}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Branches */}
      <Section id="branches" title={`Our ${company.branchesCount} Branches in Salalah`} subtitle="Walk in to any branch or message us—same great support everywhere.">
        <div className="grid gap-6 md:grid-cols-3">
          {branches.map((b) => (
            <motion.div key={b.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className={`${card} overflow-hidden`}>
              <div className="aspect-[4/3] bg-slate-100">
                <iframe title={`Map ${b.name}`} src={b.maps} className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <IconCircle Icon={Building2} tone="slate" />
                  <div>
                    <div className="font-bold">{b.name}</div>
                    <div className="text-sm text-slate-600">{b.area}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-600 flex items-center gap-2"><MapPin className="h-4 w-4" /> {b.address}</div>
                <div className="mt-1 text-sm text-slate-600 flex items-center gap-2"><Phone className="h-4 w-4" /> {b.phone}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Cargo Coming Soon */}
      <Section id="cargo" title="Cargo Services" subtitle="We’re preparing a reliable cargo solution. Join our waitlist to be notified.">
        <div className={`${card} p-6 grid gap-6 md:grid-cols-2 items-center`}>
          <div>
            <div className="flex items-center gap-3">
              <IconCircle Icon={PackageOpen} tone="slate" />
              <Badge>Coming Soon</Badge>
            </div>
            <h3 className="mt-4 text-xl font-extrabold">Door‑to‑door cargo, right—when we launch</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Cargo isn’t active yet. We’re finalizing partners, pricing, and routes so we can deliver a dependable service from Salalah.
            </p>
            <ul className="mt-3 text-sm text-slate-600 list-disc ml-5">
              <li>Transparent pricing & tracking</li>
              <li>Priority for existing clients</li>
              <li>Support via the same ALAMEEN team</li>
            </ul>
          </div>
          <form
            className="bg-slate-50 rounded-2xl p-4 ring-1 ring-slate-200"
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.currentTarget.elements.email?.value;
              if (email) window.location.href = `mailto:${company.email}?subject=Cargo%20waitlist&body=Please%20notify%20me%20at%20${email}%20when%20cargo%20launches.`;
            }}
          >
            <label className="text-sm font-semibold">Get notified at</label>
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <button className={`${btn} mt-3 bg-slate-900 text-white ring-slate-900/10`} type="submit">
              Notify Me <ChevronRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-xs text-slate-500">We’ll email your request to our team—no spam, just one update.</p>
          </form>
        </div>
      </Section>

      {/* About */}
      <Section id="about" title="About ALAMEEN" subtitle={`Local expertise in ${company.city} with ${company.years}+ years of service and ${company.branchesCount} branches.`}>
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <p className="text-slate-700 text-sm leading-relaxed">
              We’re a Salalah‑born travel company focused on exactly what matters: airline tickets and visa processing. Over the past {company.years}+ years we’ve grown to {company.branchesCount} branches and built strong relationships with airlines and consulates. Families trust us for smooth journeys; enterprises count on us for responsive, policy‑aware support.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className={`${card} p-4 text-center`}><div className="text-2xl font-extrabold">{company.years}+</div><div className="text-xs text-slate-600">Years</div></div>
              <div className={`${card} p-4 text-center`}><div className="text-2xl font-extrabold">{company.branchesCount}</div><div className="text-xs text-slate-600">Branches</div></div>
              <div className={`${card} p-4 text-center`}><div className="text-2xl font-extrabold">24/7</div><div className="text-xs text-slate-600">Support*</div></div>
            </div>
            
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-slate-200">
              <img
                src="./logo.png"
                alt="Travel planning desk"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="Frequently Asked Questions">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <details key={i} className={`${card} p-4`}>
              <summary className="flex items-center gap-2 cursor-pointer list-none">
                <IconCircle Icon={Info} tone="sky" />
                <span className="font-semibold">{f.q}</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact Us" subtitle="Reach us on WhatsApp, call, or send an email. We’re quick to respond.">
        <div className="grid gap-6 md:grid-cols-5">
          <div className={`${card} p-6 md:col-span-2`}>
            <div className="flex items-start gap-3">
              <IconCircle Icon={Globe} tone="sky" />
              <div>
                <div className="font-bold">{company.name}</div>
                <div className="text-sm text-slate-600">{company.addressMain}</div>
                <div className="mt-2 text-sm text-slate-700 flex items-center gap-2"><Phone className="h-4 w-4" /> {company.phone}</div>
                <a href={`mailto:${company.email}`} className="mt-1 block text-sm text-slate-700 hover:underline flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {company.email}
                </a>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <a href={whatsappHref} className={`${btn} bg-emerald-600 text-white ring-emerald-600/20`}><Phone className="h-4 w-4"/> WhatsApp</a>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`${btn} bg-slate-900 text-white ring-slate-900/10`}><Phone className="h-4 w-4"/> Call</a>
            </div>
            <div className="mt-4 flex items-center gap-4 text-slate-500">
              <a href="#" aria-label="Facebook" className="hover:text-slate-700"><Facebook /></a>
              <a href="https://www.instagram.com/alameen_salalah/" aria-label="Instagram" className="hover:text-slate-700"><Instagram /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-slate-700"><Linkedin /></a>
            </div>
          </div>

<form
  className={`${card} p-6 md:col-span-3`}
  onSubmit={(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const text =
`New enquiry from website (${company.name})
Name: ${data.get("name")}
Phone: ${data.get("phone")}
Service: ${data.get("service")}
Travel dates: ${data.get("dates")}
Message: ${data.get("message") || "-"}`;

    const url = buildWhatsAppUrl(company.whatsapp || company.phone, text);

    // open in new tab for web.whatsapp.com / mobile app
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
      // fallback (popup blocked)
      window.location.href = url;
    }
  }}
>
  <div className="grid gap-4 sm:grid-cols-2">
    <div>
      <label className="text-xs font-semibold">Full Name</label>
      <input
        name="name"
        required
        className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
      />
    </div>
    <div>
      <label className="text-xs font-semibold">Phone</label>
      <input
        name="phone"
        required
        className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
      />
    </div>
    <div>
      <label className="text-xs font-semibold">Service</label>
      <select
        name="service"
        required
        className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
      >
        <option>Air Tickets</option>
        <option>Visa Processing</option>
      </select>
    </div>
    <div>
      <label className="text-xs font-semibold">Travel Dates</label>
      <input
        name="dates"
        placeholder="e.g., 05 Sep → 12 Sep"
        className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
      />
    </div>
    <div className="sm:col-span-2">
      <label className="text-xs font-semibold">Message</label>
      <textarea
        name="message"
        rows={4}
        className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
        placeholder="Tell us your route, number of travelers, and any preferences"
      />
    </div>
  </div>
  <button type="submit" className={`${btn} mt-4 bg-sky-600 text-white ring-sky-600/20`}>
    Send Enquiry <Mail className="h-4 w-4" />
  </button>
</form>
        </div>
      </Section>

      {/* Footer */}
      <footer className="mt-10 border-t">
        <div className={`${container} py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4`}>
          <div>
              <a href="#home" className="shrink-0" aria-label={`${company.name} home`}>
              <div className="h-14 w-14 rounded-full overflow-hidden ring-1 ring-slate-200 bg-white">
                <img
                  src={company.logoUrl || "src/logo.png"}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </a>
            <div className="font-extrabold">{company.name}</div>
            <p className="mt-2 text-sm text-slate-600">Tickets & Visa specialists in {company.city}.</p>
            <div className="mt-3 text-xs text-slate-500">© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
          </div>
          <div>
            <div className="font-semibold">Quick Links</div>
            <ul className="mt-2 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="hover:underline">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {company.addressMain}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {company.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a className="hover:underline" href={`mailto:${company.email}`}>{company.email}</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Hours</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>Sat–Thu: 9:00 – 21:00</li>
              <li>Fri: 16:00 – 21:00</li>
              <li className="text-xs text-slate-400"></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating actions */}
      <a
        href={whatsappHref}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-5 py-3 shadow-lg ring-1 ring-emerald-600/30 hover:scale-[1.02]"
      >
        <Phone className="h-4 w-4" /> WhatsApp
      </a>

    </div>
  );
}


