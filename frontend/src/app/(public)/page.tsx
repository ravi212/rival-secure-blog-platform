import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MainLayout, Container } from '@/components/layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-linear-to-br from-brand-900 via-brand-800 to-brand-700">
        <Container size="lg" className="text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Share Your Ideas
              <br />
              <span className="bg-linear-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                With The World
              </span>
            </h1>

            <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
              A modern blogging platform designed for creators, developers, and thinkers.
              Write, publish, and engage in a beautiful, secure environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/feed">
                <Button size="lg" variant="secondary">
                  <span>Explore Blogs</span>
                  <ArrowIcon className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" className="bg-white text-brand-900 hover:bg-neutral-100">
                  <span>Start Writing</span>
                  <PenIcon className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <Container size="lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A complete platform for modern blogging with all the features creators need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl border border-neutral-200 hover:shadow-elevation hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center mb-4 text-xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">10K+</p>
              <p className="text-neutral-600">Active Readers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">5K+</p>
              <p className="text-neutral-600">Published Blogs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">1K+</p>
              <p className="text-neutral-600">Active Writers</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-6">
            Ready to Start?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
            Join thousands of creators sharing their stories on Rival.
          </p>
          <Link href="/register">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </Container>
      </section>
    </MainLayout>
  );
}

const features = [
  {
    icon: '✍️',
    title: 'Rich Editor',
    description: 'Write with a powerful, intuitive editor designed for creators.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your content is encrypted and protected with industry standards.',
  },
  {
    icon: '💬',
    title: 'Community',
    description: 'Engage with readers through likes, comments, and discussions.',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Track your blog performance and reader insights.',
  },
  {
    icon: '📱',
    title: 'Responsive',
    description: 'Looks perfect on every device and screen size.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Optimized performance for the best reader experience.',
  },
];

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}

function PenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}