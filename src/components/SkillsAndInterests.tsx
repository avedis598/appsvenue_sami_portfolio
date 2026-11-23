import { motion } from "motion/react";
import { Trophy, Plane, Book, Camera } from "lucide-react";

export default function SkillsAndInterests() {
  const software = [
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Apple Software",
    "Advanced Creative Suite",
  ];
  const languages = ["Arabic - Native", "English - Fluent"];
  const interests = [
    { name: "Sports", icon: Trophy },
    { name: "Traveling", icon: Plane },
    { name: "Reading", icon: Book },
    { name: "Photography", icon: Camera },
  ];

  return (
    <section className="px-6 sm:px-12 md:px-20 py-12 md:py-16 bg-gray-200/50">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h2 className="text-xl uppercase tracking-[0.2em] mb-8 md:mb-10">Software Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {software.map((skill) => (
              <motion.li
                key={skill}
                className="border border-off-white/20 py-2 px-4 text-sm font-sans transition-colors duration-300"
                whileHover={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  borderColor: "#000000",
                }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl uppercase tracking-[0.2em] mb-8 md:mb-10">Languages</h2>
          <ul className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <motion.li
                key={lang}
                className="border border-off-white/20 py-2 px-4 text-sm font-sans transition-colors duration-300"
                whileHover={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  borderColor: "#000000",
                }}
              >
                {lang}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl uppercase tracking-[0.2em] mb-8 md:mb-10">My Interests</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {interests.map((interest) => (
              <motion.li
                key={interest.name}
                className="flex flex-col items-center gap-4"
                whileHover={{ scale: 1.1, color: "#C4815A" }}
              >
                <interest.icon size={32} aria-hidden="true" />
                <span className="text-sm uppercase tracking-wider">{interest.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
