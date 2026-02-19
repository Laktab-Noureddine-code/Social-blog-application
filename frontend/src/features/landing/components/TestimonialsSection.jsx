import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amy Bright",
    role: "Social Media Enthusiast",
    img: "/landing/testimonial-avatar.png",
    rating: 5,
    quote:
      "I've discovered amazing friends through this platform! The matching algorithm really understands what kind of connections I'm looking for. Highly recommend it to anyone looking to expand their social circle.",
    featured: true,
  },
  {
    name: "David Chen",
    avatar: "DC",
    avatarColor: "bg-[#6C5CE7]",
    rating: 5,
    quote:
      "The events feature helped me find local meetups and I've already made some great friends. Love the interface!",
    featured: false,
  },
  {
    name: "Sarah Miller",
    avatar: "SM",
    avatarColor: "bg-[#E17055]",
    rating: 5,
    quote:
      "Real-time messaging makes it so easy to stay connected. This platform is a game-changer for building friendships.",
    featured: false,
  },
];

export default function TestimonialsSection() {
  const featured = testimonials.find((t) => t.featured);
  const others = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="py-24 px-4 bg-[#F7FAF5]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-3">
            What do our users say?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex flex-col md:flex-row items-center gap-8"
          >
            {/* Avatar with ring */}
            <div className="relative flex-shrink-0">
              <div className="w-48 h-48 rounded-full border-4 border-[#2A7B88]/20 p-1">
                <img
                  src={featured.img}
                  alt={featured.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Decorative dot */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2A7B88]"></div>
            </div>

            {/* Quote area */}
            <div>
              <h3 className="text-xl font-bold text-[#2D3436] mb-1">
                Awesome Experience
              </h3>
              <p className="text-[#636E72] leading-relaxed mb-4 text-sm">
                "{featured.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-[#2D3436]">
                    {featured.name}
                  </p>
                  <div className="flex gap-0.5">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side testimonial cards */}
          <div className="lg:col-span-2 space-y-4">
            {others.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D3436] text-sm">
                      {t.name}
                    </p>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#636E72] text-sm leading-relaxed">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
