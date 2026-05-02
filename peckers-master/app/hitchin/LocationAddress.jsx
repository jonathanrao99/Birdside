"use client";
import { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client";
import HeaderActionButton from "../components/HeaderActionButton";

export default function LocationAddress({ location = "hitchin" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        `[LocationAddress] Logic starting for location: "${location}"`,
      );
      try {
        // Fetch all mapSection documents to find the best match
        const query = `*[_type == "mapSection" && !(_id in path("drafts.**"))] {
                    _id, name, slug, address, phone, hours, mapEmbed, clickCollectUrl, deliveryUrl
                }`;
        const allDocs = await client.fetch(query, {}, { useCdn: false });

        if (!allDocs || allDocs.length === 0) {
          console.warn(
            "[LocationAddress] No mapSection documents found in Sanity.",
          );
          setLoading(false);
          return;
        }

        console.log(
          "[LocationAddress] Documents in Sanity:",
          allDocs.map((d) => d.slug?.current),
        );

        const locLower = location.toLowerCase();

        // Advanced matching logic:
        // 1. Exact match (case insensitive)
        let match = allDocs.find(
          (doc) => doc.slug?.current?.toLowerCase() === locLower,
        );

        // 2. Slug contains the location prop (e.g. "hitchin-peckers" matches "hitchin")
        if (!match) {
          match = allDocs.find((doc) =>
            doc.slug?.current?.toLowerCase().includes(locLower),
          );
        }

        // 3. Location prop contains the slug (e.g. "stevenage" matches "STE")
        if (!match) {
          match = allDocs.find((doc) => {
            const slugLower = doc.slug?.current?.toLowerCase();
            return slugLower && locLower.includes(slugLower);
          });
        }

        if (match) {
          console.log(
            `[LocationAddress] ✅ SUCCESS: Found "${match.name}" for "${location}"`,
          );
          setData(match);
        } else {
          console.error(
            `[LocationAddress] ❌ ERROR: No match for "${location}"`,
          );
          setData(null);
        }
      } catch (error) {
        console.error("[LocationAddress] Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[40vh] text-white">
        <p className="text-xl font-peakers mb-4">
          Location information not found for "{location}"
        </p>
        <p className="text-sm opacity-50">
          Please ensure a document of type "Map Section" exists in Sanity with a
          slug matching or starting with "{location}".
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex justify-center items-center md:min-h-0 lg:min-h-0 xl:min-h-[75vh] mt-6">
        <div
          className="bg-[#121212] rounded-[18px] px-[6vw] md:px-[4vw] py-[8vw] md:py-[4vw] lg:py-[4vw] gap-[8vw] md:gap-[4vw] flex flex-col md:flex-row shadow-lg h-auto md:min-h-0 lg:min-h-0 xl:min-h-[500px] xl:h-[77vh] w-[90vw] md:w-[90vw] lg:w-[80vw] xl:w-[75vw] xl:max-w-7xl"
          style={{ border: "1px solid #333" }}
        >
          {/* Left Side (Info) */}
          <div
            className="flex flex-col w-full md:w-[48%] lg:w-[48%] pr-0 md:pr-4 lg:pr-[2vw] mr-0 md:mr-0 lg:mr-[1vw]"
            style={{ borderRadius: "0.6vw", background: "transparent" }}
          >
            <div
              className="text-white text-[8vw] md:text-[36px] lg:text-[48px] xl:text-[3.6vw] tracking-[0.1vw] font-bold uppercase mb-2"
              style={{ fontFamily: "var(--font-peakers)", lineHeight: "1.1" }}
            >
              {data.name}
            </div>

            <div className="flex flex-col gap-6 mt-8 md:mt-4 lg:mt-10 mb-6 font-peakers">
              <div className="flex items-center gap-[4vw] md:gap-4">
                <svg
                  className="w-[6vw] h-[7.5vw] md:w-[24px] md:h-[30px] min-w-[20px]"
                  viewBox="0 0 20 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12.5C10 12.5 10.1719 12.5 10.5156 12.5C10.8594 12.5 11.276 12.2552 11.7656 11.7656C12.2552 11.276 12.5 10.6875 12.5 10C12.5 9.3125 12.2552 8.72396 11.7656 8.23438C11.276 7.74479 10.6875 7.5 10 7.5C9.3125 7.5 8.72396 7.74479 8.23438 8.23438C7.74479 8.72396 7.5 9.3125 7.5 10C7.5 10.6875 7.74479 11.276 8.23438 11.7656C8.72396 12.2552 9.3125 12.5 10 12.5ZM10 21.6875C12.5417 19.3542 14.4271 17.2344 15.6562 15.3281C16.8854 13.4219 17.5 11.7292 17.5 10.25C17.5 7.97917 16.776 6.11979 15.3281 4.67188C13.8802 3.22396 12.1042 2.5 10 2.5C7.89583 2.5 6.11979 3.22396 4.67188 4.67188C3.22396 6.11979 2.5 7.97917 2.5 10.25C2.5 11.7292 3.11458 13.4219 4.34375 15.3281C5.57292 17.2344 7.45833 19.3542 10 21.6875ZM10 25C6.64583 22.1458 4.14062 19.4948 2.48438 17.0469C0.828125 14.599 0 12.3333 0 10.25C0 7.125 1.00521 4.63542 3.01562 2.78125C5.02604 0.927084 7.35417 1.90735e-06 10 1.90735e-06C12.6458 1.90735e-06 14.974 0.927084 16.9844 2.78125C18.9948 4.63542 20 7.125 20 10.25C20 12.3333 19.1719 14.599 17.5156 17.0469C15.8594 19.4948 13.3542 22.1458 10 25Z"
                    fill="white"
                  />
                </svg>
                <div className="text-[#e3e3e5] text-[4vw] md:text-[18px] lg:text-[20px] xl:text-[1.1vw] whitespace-pre-line font-medium leading-relaxed">
                  {data.address}
                </div>
              </div>

              <div className="flex items-center gap-[4vw] md:gap-4">
                <svg
                  className="w-[7.5vw] h-[10.5vw] md:w-[28px] md:h-[35px] min-w-[24px]"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.625 18.375L18.375 16.625L13.75 12V6.25H11.25V13L16.625 18.375ZM12.5 25C10.7708 25 9.14583 24.6719 7.625 24.0156C6.10417 23.3594 4.78125 22.4688 3.65625 21.3438C2.53125 20.2188 1.64062 18.8958 0.984375 17.375C0.328125 15.8542 0 14.2292 0 12.5C0 10.7708 0.328125 9.14583 0.984375 7.625C1.64062 6.10417 2.53125 4.78125 3.65625 3.65625C4.78125 2.53125 6.10417 1.64063 7.625 0.984377C9.14583 0.328127 10.7708 1.90735e-06 12.5 1.90735e-06C14.2292 1.90735e-06 15.8542 0.328127 17.375 0.984377C18.8958 1.64063 20.2188 2.53125 21.3438 3.65625C22.4688 4.78125 23.3594 6.10417 24.0156 7.625C24.6719 9.14583 25 10.7708 25 12.5C25 14.2292 24.6719 15.8542 24.0156 17.375C23.3594 18.8958 22.4688 20.2188 21.3438 21.3438C20.2188 22.4688 18.8958 23.3594 17.375 24.0156C15.8542 24.6719 14.2292 25 12.5 25ZM12.5 22.5C15.2708 22.5 17.6302 21.526 19.5781 19.5781C21.526 17.6302 22.5 15.2708 22.5 12.5C22.5 9.72917 21.526 7.36979 19.5781 5.42188C17.6302 3.47396 15.2708 2.5 12.5 2.5C9.72917 2.5 7.36979 3.47396 5.42188 5.42188C3.47396 7.36979 2.5 9.72917 2.5 12.5C2.5 15.2708 3.47396 17.6302 5.42188 19.5781C7.36979 21.526 9.7207 22.5 12.5 22.5Z"
                    fill="white"
                  />
                </svg>
                <div className="text-[#e3e3e5] text-[4vw] md:text-[18px] lg:text-[20px] xl:text-[1.1vw] whitespace-pre-line font-medium leading-relaxed">
                  {location.toLowerCase().includes("hitchin") &&
                    (data.hours === "Monday - Sunday" || !data.hours) ? (
                    <>
                      Monday – Sunday: 12 PM - 10 PM
                    </>
                  ) : location.toLowerCase().includes("stevenage") ? (
                    <>
                      Monday – Thursday: 11:30 AM - 10 PM
                      <br />
                      Friday & Saturday: 11:30 AM - 11 PM
                      <br />
                      Sunday: 11:30 AM - 10:00 PM
                    </>
                  ) : (
                    data.hours
                  )}
                </div>
              </div>
            </div>
            <br />
            <div className="flex items-center gap-[4vw] md:gap-[1.5vw] mb-6 md:mb-4 lg:mb-10">
              <svg
                className="w-[7vw] h-[7vw] md:w-[30px] md:h-[30px] min-w-[26px]"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1875 22.5C18.5833 22.5 16.0104 21.9323 13.4688 20.7969C10.9271 19.6615 8.61458 18.0521 6.53125 15.9688C4.44792 13.8854 2.83854 11.5729 1.70312 9.03125C0.567708 6.48958 0 3.91667 0 1.3125C0 0.9375 0.125 0.625 0.375 0.375C0.625 0.125 0.9375 0 1.3125 0H6.375C6.66667 0 6.92708 0.098959 7.15625 0.296875C7.38542 0.494791 7.52083 0.729166 7.5625 1L8.375 5.375C8.41667 5.70833 8.40625 5.98958 8.34375 6.21875C8.28125 6.44792 8.16667 6.64583 8 6.8125L4.96875 9.875C5.38542 10.6458 5.88021 11.3906 6.45312 12.1094C7.02604 12.8281 7.65625 13.5208 8.34375 14.1875C8.98958 14.8333 9.66667 15.4323 10.375 15.9844C11.0833 16.5365 11.8333 17.0417 12.625 17.5L15.5625 14.5625C15.75 14.375 15.9948 14.2344 16.2969 14.1406C16.599 14.0469 16.8958 14.0208 17.1875 14.0625L21.5 14.9375C21.7917 15.0208 22.0312 15.1719 22.2188 15.3906C22.4062 15.6094 22.5 15.8542 22.5 16.125V21.1875C22.5 21.5625 22.375 21.875 22.125 22.125C21.875 22.375 21.5625 22.5 21.1875 22.5ZM3.78125 7.5L5.84375 5.4375L5.3125 2.5H2.53125C2.63542 3.35417 2.78125 4.19792 2.96875 5.03125C3.15625 5.86458 3.42708 6.6875 3.78125 7.5ZM14.9688 18.6875C15.7812 19.0417 16.6094 19.3229 17.4531 19.5312C18.2969 19.7396 19.1458 19.875 20 19.9375V17.1875L17.0625 16.5938L14.9688 18.6875Z"
                  fill="white"
                />
              </svg>
              <div className="text-[#e3e3e5] text-[4vw] md:text-[18px] lg:text-[20px] xl:text-[1.1vw] font-peakers font-medium">
                {data.phone}
              </div>
            </div>
            <div
              className="flex flex-col md:flex-row gap-[4vw] md:gap-[1.2vw] pt-[4vw] md:pt-0 mt-auto pb-[4vw] md:pb-[2vw] flex-nowrap"
              style={{ fontFamily: "var(--font-neuzeit)" }}
            >
              <HeaderActionButton
                href="https://peckers.vmos.io/store/store-selection?app=online"
                wrapperClassName="w-full md:w-auto"
                className="w-full md:w-auto text-center px-[4vw] md:px-[2.4vw] lg:px-[2.8vw] py-[3vw] md:py-[15px] text-[4vw] md:text-[14px] lg:text-[18px] tracking-wide whitespace-nowrap font-black"
                bgColor="bg-white"
                textColor="text-black"
                borderColor="border-white"
                shimmerColor="bg-red-600"
              >
                CLICK & COLLECT
              </HeaderActionButton>
              <HeaderActionButton
                href="https://peckers.vmos.io/store/store-selection?app=delivery"
                wrapperClassName="w-full md:w-auto"
                className="w-full md:w-auto text-center px-[4vw] md:px-[3.6vw] lg:px-[4vw] py-[3vw] md:py-[15px] text-[4.2vw] md:text-[16px] lg:text-[18px] tracking-wide whitespace-nowrap hover:bg-red-700 font-black"
                bgColor="bg-red-600"
                textColor="text-white"
                borderColor="border-red-600"
                shimmerColor="bg-white"
              >
                DELIVERY
              </HeaderActionButton>
            </div>
          </div>

          {/* Map: interactive so users can pan, zoom, and select locations */}
          <div
            className="map-interactive h-[40vh] md:h-auto md:aspect-square lg:h-auto lg:aspect-square xl:h-[58vh] xl:aspect-auto w-full md:w-[48%] lg:w-[48%] rounded-[2vw] md:rounded-[0.6vw] flex items-center justify-center mt-[4vw] md:mt-0 relative overflow-hidden"
            style={{
              border: "1px solid #333",
              pointerEvents: "auto",
            }}
          >
            {data.mapEmbed && (
              <iframe
                src={data.mapEmbed}
                width="600"
                height="450"
                style={{
                  border: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "auto",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${data.name} map`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
