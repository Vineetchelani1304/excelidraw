import { ChevronRight, Grid, Pencil, ImageIcon, Share2, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="flex items-center justify-center" href="#">
              <Grid className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">DrawSheet</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out" href="#features">
                Features
              </Link>
              <Link className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out" href="#how-it-works">
                How It Works
              </Link>
              <Link className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out" href="#testimonials">
                Testimonials
              </Link>
            </nav>
            <button className="md:hidden">
              <svg className="h-6 w-6 text-gray-500 dark:text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-32 sm:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-8 lg:mb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Create Beautiful Drawings in Your Spreadsheets
                </h1>
                <p className="mt-6 max-w-xl text-xl text-indigo-100 sm:max-w-md lg:max-w-none">
                  DrawSheet brings the power of digital drawing to your spreadsheets. Design, illustrate, and collaborate all in one place.
                </p>
                <div className="mt-10 sm:flex">
                  <div className="rounded-md shadow">
                    <a href="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg"
                  alt="DrawSheet Interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
              Powerful Features for Your Spreadsheets
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Pencil className="h-8 w-8" />}
                title="Advanced Drawing Tools"
                description="Create precise drawings with our intuitive tools designed for spreadsheets."
              />
              <FeatureCard
                icon={<Grid className="h-8 w-8" />}
                title="Seamless Integration"
                description="Works directly within your favorite spreadsheet software for a smooth workflow."
              />
              <FeatureCard
                icon={<ImageIcon className="h-8 w-8" />}
                title="Rich Media Support"
                description="Import images, add textures, and create stunning visuals in your sheets."
              />
              <FeatureCard
                icon={<Share2 className="h-8 w-8" />}
                title="Real-time Collaboration"
                description="Work together with your team in real-time on drawings and designs."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-8 w-8" />}
                title="Version Control"
                description="Keep track of changes and revert to previous versions with ease."
              />
              <FeatureCard
                icon={<Grid className="h-8 w-8" />}
                title="Custom Templates"
                description="Start quickly with pre-made templates or create your own for repeated use."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
              How DrawSheet Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <StepCard
                number={1}
                title="Install the Add-on"
                description="Easily install DrawSheet as an add-on to your preferred spreadsheet software."
              />
              <StepCard
                number={2}
                title="Open the Drawing Tool"
                description="Access DrawSheet directly from your spreadsheet's menu or toolbar."
              />
              <StepCard
                number={3}
                title="Start Creating"
                description="Use our intuitive tools to draw, design, and bring your ideas to life within your spreadsheets."
              />
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <TestimonialCard
                quote="DrawSheet has revolutionized the way we present data to our clients. It's an indispensable tool for our team."
                author="Jane Doe"
                role="Data Analyst, Tech Co."
              />
              <TestimonialCard
                quote="The ability to create professional diagrams directly in my spreadsheets has saved me countless hours of work."
                author="John Smith"
                role="Project Manager, Design Inc."
              />
              <TestimonialCard
                quote="DrawSheet's collaboration features have made remote work so much easier for our distributed team."
                author="Emily Brown"
                role="Team Lead, Global Solutions"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">About DrawSheet</h3>
              <p className="text-sm text-gray-300">
                DrawSheet is revolutionizing the way you work with spreadsheets by bringing powerful drawing tools directly into your favorite spreadsheet software.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">Home</Link></li>
                <li><Link href="#features" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">Features</Link></li>
                <li><Link href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">How It Works</Link></li>
                <li><Link href="#testimonials" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-400" />
                  <a href="mailto:info@drawsheet.com" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">info@drawsheet.com</a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-400" />
                  <a href="tel:+1234567890" className="text-sm text-gray-300 hover:text-white transition duration-150 ease-in-out">+1 (234) 567-890</a>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-300">123 DrawSheet St, San Francisco, CA 94107</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-sm text-gray-400">
              © 2024 DrawSheet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
      <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: number, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="flex flex-col p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
      <blockquote className="flex-1">
        <p className="text-lg font-medium text-gray-900 dark:text-white">"{quote}"</p>
      </blockquote>
      <div className="mt-4">
        <p className="text-base font-semibold text-gray-900 dark:text-white">{author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  )
}

