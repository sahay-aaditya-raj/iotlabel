'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Zap, CloudCog, Database, ChartLine } from 'lucide-react';


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f16] bg-gradient-to-br from-[#0f0f16] to-[#1a1a27] text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600 rounded-full opacity-20 blur-[100px]" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-fuchsia-600 rounded-full opacity-20 blur-[100px]" />
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-6">
              Greenhouse Buddy IoT
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              A smart greenhouse monitoring and control system that helps you maintain optimal growing conditions for your plants through IoT technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://github.com/yourusername/iotproj-next" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#1a1a27] border border-[#2a2a3d] text-gray-300 rounded-full font-medium hover:bg-[#252533] hover:border-violet-500 hover:text-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
                Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-4"
          >
            Key Features
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our IoT solution provides comprehensive monitoring and control capabilities for your greenhouse environment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800 p-6 rounded-2xl shadow-xl"
          >
            <div className="bg-gradient-to-r from-rose-600 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-rose-500/20">
              <BarChart3 className="text-white h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Monitoring</h3>
            <p className="text-gray-400">
              Track temperature, humidity, and soil moisture in real-time with beautiful, responsive charts and visuals.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800 p-6 rounded-2xl shadow-xl"
          >
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
              <Zap className="text-white h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Remote Control</h3>
            <p className="text-gray-400">
              Control your greenhouse equipment remotely via an intuitive interface, including motors and alert systems.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-4"
          >
            Technology Stack
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Our project leverages a modern, robust technology stack to deliver a seamless IoT experience. Each technology plays a crucial role in ensuring reliability, scalability, and a great user experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-12">
            <div className="bg-[#181825] rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">Next.js</h4>
              <p className="text-gray-400">
                Next.js is a powerful React framework for building fast, scalable web applications. It provides server-side rendering, static site generation, and API routes, making it ideal for modern full-stack projects.
              </p>
            </div>
            <div className="bg-[#181825] rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">MongoDB</h4>
              <p className="text-gray-400">
                MongoDB is a flexible NoSQL database used to store sensor data and user information. Its document-based structure is perfect for handling dynamic IoT data and scaling as your greenhouse grows.
              </p>
            </div>
            <div className="bg-[#181825] rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">Tailwind CSS</h4>
              <p className="text-gray-400">
                Tailwind CSS is a utility-first CSS framework that enables rapid UI development. It helps us create a beautiful, responsive interface with minimal custom CSS.
              </p>
            </div>
            <div className="bg-[#181825] rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">Recharts</h4>
              <p className="text-gray-400">
                Recharts is a charting library built with React, used for visualizing real-time sensor data. It provides interactive and customizable charts for monitoring greenhouse conditions.
              </p>
            </div>
            <div className="bg-[#181825] rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">IoT Sensors</h4>
              <p className="text-gray-400">
                Various IoT sensors collect environmental data such as temperature, humidity, and soil moisture. These sensors are integrated with microcontrollers and communicate with the cloud database.
              </p>
            </div>
            <div className="bg-[#181825] rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">Shadcn UI</h4>
              <p className="text-gray-400">
                Shadcn UI provides a set of accessible and customizable UI components, helping us maintain design consistency and accessibility across the application.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Tech 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a1a27] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <svg
                viewBox="0 -101.5 512 512"
                className=" h-72 w-auto text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M120.81043,80.5613102 L217.378325,80.5613102 L217.378325,88.2366589 L129.662487,88.2366589 L129.662487,146.003758 L212.147564,146.003758 L212.147564,153.679106 L129.662487,153.679106 L129.662487,217.101725 L218.384241,217.101725 L218.384241,224.777073 L120.81043,224.777073 L120.81043,80.5613102 Z M226.0292,80.5613102 L236.289538,80.5613102 L281.756922,143.983929 L328.230222,80.5613102 L391.441486,0 L287.591232,150.649363 L341.105941,224.777073 L330.443237,224.777073 L281.756922,157.314798 L232.869425,224.777073 L222.407904,224.777073 L276.324978,150.649363 L226.0292,80.5613102 Z M344.928421,88.2366588 L344.928421,80.5613102 L454.975585,80.5613102 L454.975585,88.2366589 L404.27744,88.2366589 L404.27744,224.777073 L395.425382,224.777073 L395.425382,88.2366589 L344.928421,88.2366588 Z M1.42108547e-14,80.5613102 L11.0650714,80.5613102 L163.64593,308.884007 L100.591558,224.777073 L9.25442331,91.4683847 L8.85205708,224.777073 L1.42108547e-14,224.777073 L1.42108547e-14,80.5613102 Z M454.083705,214.785469 C452.275167,214.785469 450.918762,213.38418 450.918762,211.573285 C450.918762,209.762388 452.275167,208.361099 454.083705,208.361099 C455.913774,208.361099 457.248648,209.762388 457.248648,211.573285 C457.248648,213.38418 455.913774,214.785469 454.083705,214.785469 Z M462.781915,206.334618 L467.518563,206.334618 C467.583153,208.900055 469.456284,210.624719 472.212151,210.624719 C475.290972,210.624719 477.03492,208.770705 477.03492,205.29982 L477.03492,183.310363 L481.85769,183.310363 L481.85769,205.321379 C481.85769,211.573285 478.240613,215.173518 472.255212,215.173518 C466.635824,215.173518 462.781915,211.681076 462.781915,206.334618 Z M488.166045,206.054362 L492.945754,206.054362 C493.354828,209.007848 496.239878,210.883419 500.395211,210.883419 C504.270652,210.883419 507.11264,208.878498 507.11264,206.119036 C507.11264,203.747625 505.304102,202.324777 501.191828,201.354653 L497.187209,200.384531 C491.56782,199.069474 489.005723,196.353129 489.005723,191.782772 C489.005723,186.24229 493.527071,182.555823 500.30909,182.555823 C506.617445,182.555823 511.224912,186.24229 511.504805,191.480955 L506.811217,191.480955 C506.359083,188.613703 503.861576,186.824365 500.244499,186.824365 C496.43365,186.824365 493.893085,188.656819 493.893085,191.459398 C493.893085,193.679901 495.52938,194.95184 499.577063,195.900406 L503.000368,196.741178 C509.373314,198.228702 512,200.815695 512,205.493846 C512,211.443935 507.392533,215.173518 500.029197,215.173518 C493.139526,215.173518 488.51053,211.6164 488.166045,206.054362 Z"
                    fill="currentColor"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
            </div>
            <h3 className="font-medium text-white">Next.js</h3>
          </motion.div>

          {/* Tech 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a27] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-medium text-white">MongoDB</h3>
          </motion.div>

          {/* Tech 3 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a27] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <svg fill="#00bcff" width="800px" height="800px" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"/>
              </svg>
            </div>
            <h3 className="font-medium text-white">Tailwind CSS</h3>
          </motion.div>

          {/* Tech 4 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a1a27] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <ChartLine className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-medium text-white">Recharts</h3>
          </motion.div>

          {/* Tech 5 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a1a27] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <CloudCog className="w-10 h-10 text-violet-400" />
            </div>
            <h3 className="font-medium text-white">IoT Sensors</h3>
          </motion.div>

          {/* Tech 6 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-[#1a1a27] p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-5"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></line></svg>
            </div>
            <h3 className="font-medium text-white">Shadcn UI</h3>
          </motion.div>
        </div>
      </div>

      {/* About Project Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-4"
          >
            About The Project
          </motion.h2>
          <div className="prose prose-invert max-w-none">
            <p>
              This project is part of the IoT lab experiential learning program, designed to demonstrate how Internet of Things technology can be applied to real-world agricultural monitoring and automation.
            </p>
            <p>
              The system uses a combination of sensors to collect environmental data such as temperature, humidity, and soil moisture from plant growing environments. This data is transmitted to a cloud database and visualized through a web interface that allows users to monitor conditions and control connected devices.
            </p>
            <p>
              The primary goals of this project include:
            </p>
            <ul>
              <li>Demonstrating IoT sensor integration and data collection</li>
              <li>Implementing real-time monitoring and control systems</li>
              <li>Creating intuitive data visualizations for environmental metrics</li>
              <li>Building a responsive web interface for mobile and desktop access</li>
              <li>Providing automated and manual control options for connected equipment</li>
            </ul>
            <p>
              Through this project, students gain hands-on experience with full-stack development, IoT hardware integration, and practical applications of sensor technology in agricultural settings.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0f0f16] border-t border-gray-800 py-10 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Greenhouse Buddy IoT
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                IoT Lab Experiential Learning Project
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-300 ml-6">
                Dashboard
              </Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 ml-6">
                Documentation
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors duration-300 ml-6">
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} IoT Lab Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}