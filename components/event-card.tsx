import Image from "next/image";
import Link from "next/link";

import { Event } from "@/lib/interfaces/event";
import { dateWithNnLocale, getShortMonth } from "@/lib/utils/date";
import { getImageData } from "@/lib/utils/sanity";
import { Card, CardContent, CardTitle } from "@/shadcn-ui/components/ui/card";
import { Clock } from "lucide-react";
import { ClassName } from "@/lib/types/class-name";
import { cn } from "@/shadcn-ui/lib/utils";

export default function EventCard({
  slug,
  title,
  date,
  image,
  duration,
  className,
}: Event & ClassName) {
  return (
    <Link
      href={`/events/${slug}`}
      key={slug}
      className={cn(className, "group")}
    >
      <Card className="pt-6 relative h-full min-h-[340px] bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 bg-full overflow-hidden transition-all duration-200 hover:bg-lg">
        <CardContent className="z-30 absolute top-1 left-1 rounded-lg bg-card/50 backdrop-blur-lg p-2 text-center text-foreground">
          <p className="uppercase text-sm">{getShortMonth(date)}</p>
          <p className="uppercase font-bold text-xl">{dateWithNnLocale(date, "dd")}</p>
        </CardContent>
        <CardContent className="z-30 absolute bottom-0 left-0 right-0 bg-card/50 backdrop-blur p-2 backdrop-saturate-150 border-t-[1px]">
          <CardTitle className="text-foreground font-normal">{title}</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
              <Clock className="h-4 w-4 text-foreground mr-1" />
              <span className="text-foreground text-sm">{duration}</span>
            </div>
            {/* <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
            <MapPin className="h-4 w-4 text-foreground mr-1" />
            <span className="text-foreground text-sm">
              {location}
            </span>
          </div> */}
          </div>
        </CardContent>
        <span className="z-30 absolute left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 text-xl text-center opacity-0 group-hover:opacity-100 group-hover:top-1/2 group-focus-visible:opacity-100 group-focus-visible:top-1/2 transition-all duration-200">
          Les mer om {title}
        </span>
        {image && (
          <>
            <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-200 absolute z-20 top-0 left-0 w-full h-full bg-gradient-to-br from-[#1c8aff]/90 via-transparent to-[#9849f8]/90" />
            <Image
              width={500}
              height={350}
              src={getImageData(image).url()}
              alt={title}
              className="rounded-lg object-cover absolute inset-0 w-full h-full transition-all duration-200 group-hover:scale-110 group-hover:blur-xl  group-focus-visible:scale-110 group-focus-visible:blur-xl"
            />
          </>
        )}
      </Card>
    </Link>
  );
}
