import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    img: "/landing/feature-matching.png",
    title: "Create your profile",
    desc: "Set up your profile with your interests, hobbies, and what you're looking for in a friend.",
  },
  {
    num: "02",
    img: "/landing/feature-events.png",
    title: "Match with friends",
    desc: "Our smart algorithm suggests people near you who share your interests and passions.",
  },
  {
    num: "03",
    img: "/landing/feature-groups.png",
    title: "Start conversations",
    desc: "Break the ice and start chatting in real-time with your new connections.",
  },
  {
    num: "04",
    img: "/landing/hero-friends.png",
    title: "Social connection",
    desc: "Build lasting friendships, join groups, and attend events together.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-3">
            How it Works
          </h2>
          <p className="text-[#636E72] max-w-xl mx-auto">
            Getting started is simple. Follow these easy steps to start making
            meaningful connections.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center group"
            >
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2A7B88] text-white font-bold text-sm mb-5">
                {step.num}
              </div>

              {/* Illustration */}
              <div className="w-full h-36 rounded-2xl bg-[#EFF5EC] flex items-center justify-center mb-5 overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-[#2D3436] mb-2 text-base">
                {step.title}
              </h3>
              <p className="text-[#636E72] text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="#testimonials"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2A7B88] text-white font-semibold text-sm hover:bg-[#1F6270] transition-all duration-300 hover:shadow-lg hover:shadow-[#2A7B88]/25"
          >
            Find new friends
          </a>
        </motion.div>
      </div>
    </section>
  );
}
