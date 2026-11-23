import { motion } from "motion/react";

const experiences = [
  {
    year: "2016 – Present",
    company: "Appsvenue Company, Kuwait",
    role: "Founder & Director",
    logoPng: "/appsvenue.png",
    logoWebp: "/appsvenue.webp",
    website: "https://appsvenuekw.com",
  },
  { year: "2008 – 2016", company: "Badra International", role: "Events & Conference Manager" },
  { year: "March 2008", company: "Layalina Magazine", role: "Graphic Designer" },
  { year: "2004 – 2008", company: "Al-Khat Presses", role: "Electronic Montage Technician" },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 sm:px-12 md:px-20 py-16 md:py-20 bg-black/[0.03] border-y border-off-white/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 max-w-5xl mx-auto items-stretch">
        {/* Image on left */}
        <motion.div
          className="md:col-span-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <picture className="block w-full h-full">
            <source
              type="image/webp"
              srcSet="/sami_body-600w.webp 600w, /sami_body.webp 1200w"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <img
              src="/sami_body.png"
              alt="Sami Majdi Aboulabbada standing portrait"
              width={1200}
              height={2537}
              loading="lazy"
              className="w-full max-h-[28rem] md:max-h-none md:h-full object-cover object-top rounded-lg"
              referrerPolicy="no-referrer"
            />
          </picture>
        </motion.div>

        {/* Timeline */}
        <div className="md:col-span-8 flex flex-col justify-between">
          <h2 className="text-xl uppercase tracking-[0.2em] mb-10">Selected Experience</h2>
          <ol className="relative border-l border-accent/60 pl-6 sm:pl-8 space-y-12 flex-grow">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.company}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ x: 10 }}
              >
                <div
                  className="absolute -left-[31px] sm:-left-[39px] top-1 w-3 h-3 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <div className="font-serif text-lg font-bold text-accent mb-2">{exp.year}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{exp.role}</h3>
                <div className="text-base sm:text-lg text-off-white/60 mb-2">{exp.company}</div>
                {exp.logoPng && exp.logoWebp && exp.website && (
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <picture>
                      <source type="image/webp" srcSet={exp.logoWebp} />
                      <img
                        src={exp.logoPng}
                        alt="Appsvenue logo"
                        width={576}
                        height={134}
                        loading="lazy"
                        className="w-[144px] h-auto object-contain"
                      />
                    </picture>
                    <div className="flex flex-wrap items-center gap-2">
                      <motion.a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black text-white text-sm px-4 py-2 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Visit Website
                      </motion.a>
                      <motion.a
                        href="https://wa.me/96560055564"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Contact Sami on WhatsApp"
                      >
                        <picture>
                          <source type="image/webp" srcSet="/whatsapp.webp" />
                          <img
                            src="/whatsapp.png"
                            alt=""
                            width={40}
                            height={40}
                            loading="lazy"
                            className="w-10 h-10 object-contain"
                          />
                        </picture>
                      </motion.a>
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      {/* Education */}
      <div className="max-w-4xl mx-auto mt-16 md:mt-20 pt-10 border-t border-off-white/10">
        <h2 className="text-xl uppercase tracking-[0.2em] mb-8">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-1">B.Com in Accounting</h3>
            <p className="text-sm text-off-white/60">University of India in Kuwait</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">High School</h3>
            <p className="text-sm text-off-white/60">Al Ikhlas National School</p>
          </div>
        </div>
      </div>
    </section>
  );
}
