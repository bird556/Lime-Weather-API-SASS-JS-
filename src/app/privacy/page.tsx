import type { Metadata } from 'next';
import StaticPageShell from '@/components/StaticPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy — Lime Weather',
  description: 'How Lime Weather handles your data.',
};

export default function PrivacyPage() {
  return (
    <StaticPageShell>
      <div className="flex flex-col gap-10">

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-light tracking-tight">Privacy Policy</h1>
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
    title: 'What We Collect',
    body: 'Lime Weather collects only the city name you search for in order to fetch weather data. No account, email address, or personally identifiable information is required or stored.',
  },
  {
    title: 'How We Use Your Search',
    body: 'City search queries are forwarded server-side to WeatherAPI.com solely to retrieve current weather conditions. They are not logged, stored in a database, or used for any analytics or advertising purpose.',
  },
  {
    title: 'Third-Party Services',
    body: 'Weather data is provided by WeatherAPI.com. Your city query is sent to their servers as part of the request. Please review WeatherAPI\'s own privacy policy at weatherapi.com for details on their data handling.',
  },
  {
    title: 'Cookies & Local Storage',
    body: 'Lime Weather does not set any cookies. Recently searched cities are stored temporarily in React state only — they are cleared when you close or refresh the page and never written to localStorage or any external service.',
  },
  {
    title: 'Changes to This Policy',
    body: 'This policy may be updated from time to time. The "Last updated" date at the top of this page will reflect any changes.',
  },
  {
    title: 'Contact',
    body: 'For questions about this privacy policy, please reach out via the project\'s GitHub repository.',
  },
];
