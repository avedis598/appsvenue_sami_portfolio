/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import SkillsAndInterests from "./components/SkillsAndInterests";
import Clients from "./components/Clients";
import Contact from "./components/Contact";

const AdminLogin = lazy(() => import("./components/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function MainApp() {
  return (
    <div className="min-h-dvh bg-navy text-off-white font-sans selection:bg-accent selection:text-white relative">
      <div className="noise-overlay" aria-hidden="true" />
      <main className="relative z-20">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <SkillsAndInterests />
        <Clients />
      </main>
      <div className="relative z-20">
        <Contact />
      </div>
    </div>
  );
}

function AdminFallback() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-black text-white font-sans">
      <p className="text-sm uppercase tracking-[0.2em] text-white/70">Loading…</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<AdminFallback />}>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
