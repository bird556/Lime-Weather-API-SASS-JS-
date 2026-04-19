import type { Metadata } from 'next';
import StaticPageShell from '@/components/StaticPageShell';

export const metadata: Metadata = {
  title: 'Terms of Use — Lime Weather',
  description: 'Terms of use for Lime Weather.',
};

export default function TermsPage() {
  return (
    <StaticPageShell>
      <div className="flex flex-col gap-10">

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-light tracking-tight">Terms of Use</h1>
          <p className="text-sm text-white/40">Last updated: April 2026</p>
        </div>

        <div className="flex flex-col gap-6">
          {SECTIONS.map(({ title, body }) => (
            <section key={title} className="glass rounded-2xl p-6 flex flex-col gap-3">
              <h2 className="text-base font-medium text-lime">{title}</h2>
              <p className="text-sm text-white/65 leading-relaxed">{body}</p>
            </section>
          ))}
        </div>

      </div>
    </StaticPageShell>
  );
}

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: 'By using Lime Weather, you agree to these terms. If you do not agree, please do not use the application.',
  },
  {
    title: 'Use of the Service',
    body: 'Lime Weather is provided free of charge for personal, non-commercial use. You may not use the service for any unlawful purpose, attempt to reverse-engineer the application, or use automated means to scrape or overload the weather API.',
  },
  {
    title: 'Accuracy of Weather Data',
    body: 'Weather data is sourced from WeatherAPI.com and is provided as-is. Lime Weather makes no guarantees about the accuracy, completeness, or timeliness of the data. Do not rely on this application for safety-critical decisions.',
  },
  {
    title: 'Intellectual Property',
    body: 'The Lime Weather application, its design, code, and branding are the property of the developer. Background photography is licensed separately. WeatherAPI.com data is subject to their own terms of service.',
  },
  {
    title: 'Limitation of Liability',
    body: 'Lime Weather is provided "as is" without warranty of any kind. The developer shall not be liable for any damages arising from the use or inability to use this service.',
  },
  {
    title: 'Changes to Terms',
    body: 'These terms may be updated at any time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use after changes constitutes acceptance of the updated terms.',
  },
];
