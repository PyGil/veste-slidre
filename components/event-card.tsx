import Image from "next/image";
import Link from "next/link";

import { Event } from "@/lib/interfaces/event";
import { dateWithNnLocale, getShortMonth } from "@/lib/utils/date";
import { getImageData } from "@/lib/utils/sanity";
import { Card, CardContent, CardTitle } from "@/shadcn-ui/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { ClassName } from "@/lib/types/class-name";
import { cn } from "@/shadcn-ui/lib/utils";

export default function EventCard({
  slug,
  title,
  date,
  image,
  duration,
  location,
  className,
}: Event & ClassName) {
  return (
    <Link
      href={`/events/${slug}`}
      key={slug}
      className={cn(className, "group")}
      aria-label={`Les mer om ${title}`}
    >
      <Card className="pt-6 relative h-full min-h-[340px] overflow-hidden">
        <CardContent className="z-30 absolute top-1 left-1 rounded-lg bg-card/50 backdrop-blur-lg p-2 text-center text-foreground">
          <p className="uppercase text-sm">{getShortMonth(date)}</p>
          <p className="uppercase font-bold text-xl">
            {dateWithNnLocale(date, "dd")}
          </p>
        </CardContent>
        <CardContent className="z-30 absolute bottom-0 left-0 right-0 bg-card/50 backdrop-blur p-2 backdrop-saturate-150 border-t-[1px]">
          <CardTitle className="text-foreground font-normal text-lg">
            {title}
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
              <Clock className="h-4 w-4 text-foreground mr-1" />
              <span className="text-foreground text-sm">{duration}</span>
            </div>
            <div className="flex items-center bg-card-foreground/20 rounded-full py-1 px-2 w-fit mt-2">
              <MapPin className="h-4 w-4 text-foreground mr-1" />
              <span className="text-foreground text-sm">{location}</span>
            </div>
          </div>
        </CardContent>
        <span className="z-30 absolute left-1/2 top-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-foreground text-background px-5 py-2 rounded-3xl text-lg text-center opacity-0 group-hover:opacity-100 group-hover:top-1/2 group-focus-visible:opacity-100 group-focus-visible:top-1/2 transition-all duration-300">
          Les mer
        </span>
        <div className="rounded-lg absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 group-hover:brightness-50 group-hover:scale-110 group-hover:bg-lg group-focus-visible:brightness-50 group-focus-visible:scale-110 group-focus-visible:bg-lg transition-all duration-200">
          {image && (
            <Image
              width={500}
              height={350}
              src={getImageData(image).url()}
              alt={title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </Card>
    </Link>
  );
}
