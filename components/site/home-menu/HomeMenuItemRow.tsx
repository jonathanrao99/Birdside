"use client";

import Image from "next/image";
import Link from "next/link";
import type { OurMenuItem } from "@/lib/our-menu-types";
import { memo, useId } from "react";

function HomeMenuItemRow({ item }: { item: OurMenuItem }) {
  const headingId = useId().replace(/:/g, "");

  return (
    <div className="menu_item" role="listitem">
      <div className="menu_block">
        <div className="menu_block-content">
          <Link
            aria-labelledby={headingId}
            className="menu_img-hit"
            href={item.productHref}
            prefetch={false}
          >
            <Image
              alt=""
              className="menu_img"
              height={420}
              loading="lazy"
              sizes={
                item.imageSizes ??
                "(max-width: 767px) 92vw, (max-width: 1199px) 45vw, 420px"
              }
              src={item.imageSrc}
              width={420}
            />
          </Link>
          <div className="menu_infos">
            <div className="menu_texts">
              <div className="text-color-white">
                <h3 className="menu_name" id={headingId}>
                  {item.name}
                </h3>
              </div>
              <div className="text-color-grey-300">
                <div>{item.price}</div>
              </div>
              <div className="menu_desc text-color-grey-300">{item.description}</div>
            </div>
            <Link
              aria-label={`View ${item.name}`}
              className="button-icon_component w-inline-block"
              data-w-id={item.buttonWId}
              href={item.productHref}
              prefetch={false}
            >
              <div className="button-icon_text">View</div>
              <div aria-hidden className="lottie-animation-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(HomeMenuItemRow);
