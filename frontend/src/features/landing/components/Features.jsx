import { motion } from "framer-motion";

const features = [
  {
    img: "/landing/feature-events.png",
    title: "E-invite",
    desc: "Send and receive invitations to join events and social gatherings with your friends.",
  },
  {
    img: "/landing/feature-matching.png",
    title: "Find the best hangout",
    desc: "Discover the perfect spots to meet up with friends based on shared interests and location.",
  },
  {
    img: "/landing/feature-groups.png",
    title: "At your fingertips",
    desc: "Everything you need to stay connected with your community, right in your pocket.",
  },
  {
    img: "/landing/feature-matching.png",
    title: "Secure Privacy",
    desc: "Your data is protected with end-to-end encryption. Share only what you want to share.",
  },
  {
    img: "/landing/feature-events.png",
    title: "Brings interests together",
    desc: "Match with people who share your hobbies, passions, and goals for meaningful connections.",
  },
  {
    img: "/landing/feature-groups.png",
    title: "Near proximity",
    desc: "Find friends nearby and connect with your local community for real-world meetups.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 md:px-0 bg-[#F7FAF5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-3">
            Features
          </h2>
          <p className="text-[#636E72] max-w-xl mx-auto">
            Explore all the tools that make building friendships easier and more
            fun than ever.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feat) => (
            <motion.div
              key={feat.title}
              variants={itemVariants}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-400 cursor-pointer"
            >
              {/* Illustration */}
              <div className="w-full h-40 rounded-xl bg-[#EFF5EC] flex items-center justify-center mb-5 overflow-hidden">
                <img
                  src={feat.img}
                  alt={feat.title}
                  className="h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#2D3436] mb-2 group-hover:text-[#2A7B88] transition-colors">
                {feat.title}
              </h3>
              <p className="text-[#636E72] text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* See All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2A7B88] text-white font-semibold text-sm hover:bg-[#1F6270] transition-all duration-300 hover:shadow-lg hover:shadow-[#2A7B88]/25"
          >
            See All
          </a>
        </motion.div>
      </div>
    </section>
  );
}