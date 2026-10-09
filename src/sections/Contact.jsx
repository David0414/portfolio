import { lazy, Suspense, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import SceneBoundary from "../components/SceneBoundary";

const ContactExperience = lazy(() => import("../components/models/contact/ContactExperience"));

const Contact = () => {
  const { ref: visualRef, inView: loadVisual } = useInView({ triggerOnce: true, rootMargin: "150px" });
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Let’s build something good."
          sub="GET IN TOUCH / 05"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="send-message-button" disabled={loading} aria-busy={loading}>
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <span className="send-message-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                </button>

              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div ref={visualRef} className="contact-visual w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <SceneBoundary>
                <Suspense fallback={null}>
                  {loadVisual && <ContactExperience />}
                </Suspense>
              </SceneBoundary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
