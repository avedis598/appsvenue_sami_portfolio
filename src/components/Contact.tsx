import { Mail, ArrowUpRight, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" className="px-6 sm:px-12 md:px-20 py-16 md:py-24 border-t border-off-white/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl uppercase tracking-[0.2em] mb-10 md:mb-12">Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 text-lg sm:text-xl font-serif">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {/* Emails */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:s_m_20@hotmail.com"
                className="flex items-center gap-4 hover:text-accent transition-colors w-fit break-all sm:break-normal"
              >
                <Mail className="w-6 h-6 shrink-0 text-off-white/60" aria-hidden="true" />
                <span>s_m_20@hotmail.com</span>
              </a>
              <a
                href="mailto:sami@appsvenuekw.com"
                className="flex items-center gap-4 hover:text-accent transition-colors w-fit break-all sm:break-normal"
              >
                <Mail className="w-6 h-6 shrink-0 text-off-white/60" aria-hidden="true" />
                <span>sami@appsvenuekw.com</span>
              </a>
            </div>

            <div className="w-12 h-px bg-off-white/10 my-2" aria-hidden="true" />

            {/* Phones */}
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/96560055564"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-accent transition-colors w-fit"
              >
                <picture className="shrink-0">
                  <source type="image/webp" srcSet="/whatsapp.webp" />
                  <img
                    src="/whatsapp.png"
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    className="w-6 h-6 object-contain"
                  />
                </picture>
                <span>+965 60055564</span>
              </a>
              <a
                href="tel:+96599458420"
                className="flex items-center gap-4 hover:text-accent transition-colors w-fit"
              >
                <Phone className="w-6 h-6 shrink-0 text-off-white/60" aria-hidden="true" />
                <span>+965 99458420</span>
              </a>
            </div>

            <div className="w-12 h-px bg-off-white/10 my-2" aria-hidden="true" />

            {/* Location */}
            <div className="flex items-center gap-4 text-off-white/60 mt-2">
              <MapPin className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>Kuwait City, KW</span>
            </div>
          </div>

          {/* Column 2: Websites */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <a
                href="https://samiaboulabbada.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-accent transition-colors w-fit group"
              >
                <div
                  className="w-6 h-6 shrink-0 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-accent transition-colors"
                  aria-hidden="true"
                >
                  <ArrowUpRight size={14} strokeWidth={2} />
                </div>
                <span>samiaboulabbada.com</span>
              </a>
              <a
                href="https://appsvenuekw.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-accent transition-colors w-fit group"
              >
                <div
                  className="w-6 h-6 shrink-0 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-accent transition-colors"
                  aria-hidden="true"
                >
                  <ArrowUpRight size={14} strokeWidth={2} />
                </div>
                <span>appsvenuekw.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
