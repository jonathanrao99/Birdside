import { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";

export default function MobileBottomBar() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await client.fetch(`*[_type == "siteSettings"][0]`);
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-transparent shadow-none flex items-center gap-[5px] px-2 min-[375px]:px-4 py-3 z-50 pb-[calc(14px+env(safe-area-inset-bottom))]">
      <a
        href="https://peckers.vmos.io/store/store-selection?app=online"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 min-[375px]:gap-2 bg-white text-black py-2.5 sm:py-3 rounded-xl text-[12px] min-[375px]:text-[13px] sm:text-[15px] font-black active:scale-95 transition-transform shadow-md tracking-wide sm:tracking-wider whitespace-nowrap px-1"
        style={{ fontFamily: "var(--font-neuzeit)" }}
      >
        <span className="flex items-center justify-center h-full">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[15px] h-[15px] sm:w-[18px] sm:h-[18px]"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </span>
        <span className="leading-none mt-1">CLICK & COLLECT</span>
      </a>
      <a
        href="https://peckers.vmos.io/store/store-selection?app=delivery"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 min-[375px]:gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 sm:py-3 rounded-xl text-[13px] min-[375px]:text-[14px] sm:text-[15px] font-black active:scale-95 transition-transform shadow-[0_4px_15px_rgba(220,38,38,0.4)] tracking-wide sm:tracking-wider whitespace-nowrap px-1"
        style={{ fontFamily: "var(--font-neuzeit)" }}
      >
        <span className="flex items-center justify-center h-full">
          <svg
            width="20"
            height="13"
            viewBox="0 0 17 11"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] sm:w-[22px] h-auto"
          >
            <path d="M13.5527 3.375C15.3984 3.40137 16.9014 4.9043 16.9277 6.72363C16.9277 8.62207 15.3984 10.1514 13.5 10.125C11.6807 10.125 10.1777 8.62207 10.1777 6.77637C10.1514 5.74805 10.626 4.8252 11.3379 4.19238L11.0215 3.63867C9.99316 4.48242 9.49219 5.69531 9.54492 6.93457C9.54492 7.30371 9.25488 7.59375 8.91211 7.59375H6.69727C6.30176 9.07031 4.9834 10.125 3.42773 10.125C1.5293 10.125 0 8.5957 0.0527344 6.6709C0.0791016 4.9043 1.50293 3.4541 3.2959 3.40137C3.66504 3.375 4.03418 3.42773 4.37695 3.5332L4.66699 2.97949C4.42969 2.61035 4.06055 2.32031 3.42773 2.32031H1.95117C1.58203 2.32031 1.31836 2.05664 1.31836 1.71387C1.29199 1.34473 1.6084 1.05469 1.95117 1.05469H3.42773C4.87793 1.05469 5.58984 1.50293 6.03809 2.10938H10.0986L9.59766 1.26562H7.85742C7.62012 1.26562 7.43555 1.08105 7.43555 0.84375V0.421875C7.43555 0.210938 7.62012 0 7.85742 0H9.9668C10.1777 0 10.3887 0.131836 10.4941 0.316406L11.1006 1.31836L12.0762 0.210938C12.208 0.0791016 12.3662 0 12.5508 0H13.7637C14.1064 0 14.3965 0.290039 14.3965 0.632812V1.47656C14.3965 1.8457 14.1064 2.10938 13.7637 2.10938H11.5752L12.4453 3.55957C12.7881 3.4541 13.1836 3.375 13.5527 3.375ZM3.42773 8.85938C4.27148 8.85938 5.00977 8.3584 5.35254 7.59375H3.2168C2.71582 7.59375 2.42578 7.09277 2.66309 6.6709L3.74414 4.66699C3.63867 4.66699 3.5332 4.64062 3.42773 4.64062C2.24121 4.64062 1.31836 5.58984 1.31836 6.75C1.31836 7.93652 2.24121 8.85938 3.42773 8.85938ZM15.6357 6.88184C15.7148 5.66895 14.7393 4.64062 13.5527 4.66699C13.3945 4.66699 13.2627 4.66699 13.1309 4.69336L14.3965 6.8291C14.5283 7.04004 14.4492 7.30371 14.2646 7.40918L13.8955 7.62012C13.6846 7.75195 13.4473 7.67285 13.3154 7.48828L12.0234 5.2998C11.6543 5.69531 11.4434 6.19629 11.4434 6.75C11.4434 7.96289 12.4453 8.93848 13.6582 8.85938C14.7129 8.80664 15.583 7.93652 15.6357 6.88184Z" />
          </svg>
        </span>
        <span className="leading-none mt-1">DELIVERY</span>
      </a>
    </div>
  );
}
