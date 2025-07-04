import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../../src/hover-effecyts.css"; // Asegúrate de importar el archivo CSS aquí.

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const hotelRef = useRef(null); // Cambié el nombre a hotelRef
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [hotelRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (

    <div id="work" ref={sectionRef} className="app-showcase px-5 md:px-20 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

        {/* Proyecto: Hotel San Felipe */}
        <div className="project bg-[#1C1C21] p-5 rounded-xl">
          <div className="image-wrapper relative rounded-xl overflow-hidden">
            <img src="/images/project1.webp" alt="Hotel" className="w-full rounded-xl object-cover" />
            <div className="absolute bottom-4 right-4 space-x-2">
              <a href="https://github.com/David0414/HotelSanFe" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-black hover:text-white transition">
                GitHub
              </a>
              <a href="https://front-hotel-six.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-white hover:text-black transition">
                Live
              </a>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">Hotel San Felipe - Booking System & Admin Dashboard</h2>
          <p className="text-white-50">A hotel reservation system with admin dashboard for managing bookings, rooms, and customer data.</p>
        </div>

        {/* Proyecto: Expense Tracker */}
        <div className="project bg-[#1C1C21] p-5 rounded-xl">
          <div className="image-wrapper relative rounded-xl overflow-hidden">
            <img src="/images/project2.webp" alt="Expense Tracker" className="w-full rounded-xl object-cover" />
            <div className="absolute bottom-4 right-4 space-x-2">
              <a href="https://github.com/David0414/expenseTrackerBack" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-black hover:text-white transition">
                GitHub
              </a>
              <a href="https://expesne-traacker-front.vercel.app/login" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-white hover:text-black transition">
                Live
              </a>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">Expense Tracker - MERN</h2>
          <p className="text-white-50">A fully responsive tracker built with the MERN stack (MongoDB, Express, React, Node.js).</p>
        </div>

        {/* Proyecto: Employee Management */}
        <div className="project bg-[#1C1C21] p-5 rounded-xl">
          <div className="image-wrapper relative rounded-xl overflow-hidden">
            <img src="/images/project3.webp" alt="Employee CRUD" className="w-full rounded-xl object-cover" />
            <div className="absolute bottom-4 right-4 space-x-2">
              <a href="https://github.com/David0414/ProyectoFinalBackend.git" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-black hover:text-white transition">
                GitHub
              </a>
              <a href="https://proyectofinalbackend-production-e38f.up.railway.app/" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-white hover:text-black transition">
                Live
              </a>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">Employee Management System - Express & JWT</h2>
          <p className="text-white-50">CRUD system for employee records with login protection and admin privileges using Express & JWT.</p>
        </div>

        {/* Proyecto: FinLink con video ajustado */}
        <div className="project bg-[#1C1C21] p-5 rounded-xl">
          <div className="image-wrapper relative rounded-xl overflow-hidden">
            <video
              src="/images/finlink-demo.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[300px] rounded-xl object-contain"
            />
            <div className="absolute bottom-4 right-4">
              <a
                href="https://github.com/David0414/FinLink"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-black hover:text-white transition"
              >
                GitHub
              </a>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">
            FinLink – FinTech App Clone with Clerk
          </h2>
          <p className="text-white-50">
            A React Native FinTech clone with OTP login using Clerk, crypto data from CoinMarketCap, native menus, and smooth gestures with Zustand + Reanimated 3.
          </p>
        </div>



        {/* Proyecto SRI */}
        <div className="project bg-[#1C1C21] p-5 rounded-xl">
          <div className="image-wrapper relative rounded-xl overflow-hidden">
            <img src="/images/project4.webp" alt="Employee CRUD" className="w-full rounded-xl object-cover" />
            <div className="absolute bottom-4 right-4 space-x-2">
              <a href="https://github.com/David0414/SRIFrontend.git" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-black hover:text-white transition">
                GitHub
              </a>
              <a href="https://sri-frontend.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-white hover:text-black transition">
                Live
              </a>
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">Sistema de rutas inteligentes</h2>
          <p className="text-white-50">Project for the optimization of routes in case of natural disasters or emergencies using algorithms like Dijkstra and AI to find the most suitable route.</p>
        </div>

      </div>
    </div>
  );


};

export default AppShowcase;
