// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>DrawSheet</title>
        <meta
          name="description"
          content="A collaborative whiteboard for sketching, brainstorming, and visual collaboration."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-50 min-h-screen">
        {/* Navbar */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-blue-600">DrawSheet</h1>
            <nav className="space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">
                Testimonials
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
              <Link
                href="/app"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Launch App
              </Link>
            </nav>
          </div>
        </header>


        {/* Hero Section */}
        <section className="bg-blue-50 py-20 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-blue-600">
              Turn Your Ideas Into Reality
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              With DrawSheet, you can collaborate, brainstorm, and visualize
              your ideas in real time. Designed for teams and individuals alike.
            </p>
            <div className="mt-8">
              <Link href="/app">
                <a className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700">
                  Get Started for Free
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-800 text-center">
              Why Choose DrawSheet?
            </h3>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-6 bg-blue-50 rounded-lg shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="mt-4 text-xl font-bold text-gray-800">
                  Real-time Collaboration
                </h4>
                <p className="mt-2 text-gray-600">
                  Work with your team seamlessly from anywhere.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="mt-4 text-xl font-bold text-gray-800">
                  Powerful Tools
                </h4>
                <p className="mt-2 text-gray-600">
                  Use our advanced drawing and design features to visualize your
                  ideas.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="mt-4 text-xl font-bold text-gray-800">
                  Easy to Use
                </h4>
                <p className="mt-2 text-gray-600">
                  Our user-friendly interface ensures anyone can start drawing
                  instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-800 text-center">
              What Our Users Say
            </h3>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-6 bg-white rounded-lg shadow">
                <p className="text-gray-600">
                  DrawSheet makes collaboration so easy! Its transformed how
                  we brainstorm as a team.
                </p>
                <h4 className="mt-4 text-lg font-bold text-gray-800">
                  — Emily Johnson
                </h4>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <p className="text-gray-600">
                  The tools are intuitive and the real-time updates are a
                  lifesaver. Highly recommend DrawSheet!
                </p>
                <h4 className="mt-4 text-lg font-bold text-gray-800">
                  — Alex Carter
                </h4>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <p className="text-gray-600">
                  As a designer, I love how simple yet powerful DrawSheet is.
                  It’s my go-to tool for ideation.
                </p>
                <h4 className="mt-4 text-lg font-bold text-gray-800">
                  — Mia Taylor
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-800 text-gray-400 py-8">
          <div className="container mx-auto text-center">
            <p className="text-lg">
              Have questions? Email us at{" "}
              <a href="mailto:support@drawsheet.com" className="text-blue-400">
                support@drawsheet.com
              </a>
            </p>
            <p className="mt-4">&copy; {new Date().getFullYear()} DrawSheet. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
