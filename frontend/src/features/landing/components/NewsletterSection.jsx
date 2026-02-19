import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter signup logic here
    setEmail("");
  };

  return (
    <section className="py-20 px-4 bg-[#EFF5EC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src="/landing/newsletter.png"
              alt="Stay connected"
              className="w-full max-w-md object-contain"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Stay up to date
            </h2>
            <p className="text-[#636E72] mb-8 text-lg">
              Subscribe to our newsletter and never miss the latest updates, events,
              and friendship tips.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white border border-gray-200 text-[#2D3436] placeholder:text-[#636E72]/60 focus:outline-none focus:ring-2 focus:ring-[#2A7B88]/30 focus:border-[#2A7B88] transition-all text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#2A7B88] text-white font-semibold text-sm hover:bg-[#1F6270] transition-all duration-300 hover:shadow-lg hover:shadow-[#2A7B88]/25 whitespace-nowrap"
                >
                  Join Newsletter
                </button>
              </div>
            </form>

            {/* Trust note */}
            <p className="text-[#636E72] text-xs mt-4">
              📬 No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
