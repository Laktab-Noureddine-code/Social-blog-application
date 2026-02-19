import { motion } from "framer-motion";
import { Search, CalendarDays, Users, MessageCircle, TrendingUp, MapPin } from "lucide-react";

const helpCards = [
  {
    icon: <Search size={22} />,
    title: "Discover Friends",
    desc: "Find people with similar interests near you.",
    color: "text-[#2A7B88]",
    bg: "bg-[#2A7B88]/10",
  },
  {
    icon: <CalendarDays size={22} />,
    title: "Make Plans",
    desc: "Organize hangouts and activities together.",
    color: "text-[#E17055]",
    bg: "bg-[#E17055]/10",
  },
  {
    icon: <Users size={22} />,
    title: "Join Events",
    desc: "Attend local meetups and social gatherings.",
    color: "text-[#6C5CE7]",
    bg: "bg-[#6C5CE7]/10",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "Chat",
    desc: "Message friends in real-time conversations.",
    color: "text-[#00B894]",
    bg: "bg-[#00B894]/10",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Trending",
    desc: "Discover what's popular in your community.",
    color: "text-[#FDCB6E]",
    bg: "bg-[#FDCB6E]/20",
  },
  {
    icon: <MapPin size={22} />,
    title: "Nearby",
    desc: "Connect with people in your neighborhood.",
    color: "text-[#E84393]",
    bg: "bg-[#E84393]/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function HelpSection() {
  return (
    <section className="py-20 px-4 bg-[#EFF5EC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src="/landing/hero-friends.png"
              alt="Friends connecting"
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
              We're here to help you
              <span className="block text-[#2A7B88]">find new friends</span>
            </h2>
            <p className="text-[#636E72] mb-8 text-lg">
              Our platform makes it easy to connect with people who share your
              passions and interests.
            </p>

            {/* Icon Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {helpCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className={`inline-flex p-2.5 rounded-xl ${card.bg} mb-3`}
                  >
                    <div className={card.color}>{card.icon}</div>
                  </div>
                  <h4 className="font-semibold text-[#2D3436] text-sm mb-1 group-hover:text-[#2A7B88] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[#636E72] text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
