export default function Skills() {
  const specializations = [
    "Event Management",
    "Conference Production",
    "Visual Identity",
    "Digital Strategy",
  ];

  return (
    <section id="skills" className="px-6 sm:px-12 md:px-20 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl uppercase tracking-[0.2em] mb-10">Specializations</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {specializations.map((skill) => (
            <li
              key={skill}
              className="border border-off-white/20 p-6 text-center text-sm transition-colors duration-300 hover:bg-[#C4815A] hover:text-white"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
