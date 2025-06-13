import { ClassEntry } from "@/types/search-for-schedule-types";
import { Clock, Bell, BookOpen, MapPin, User } from "lucide-react";

export function Schedule({ scheduleData }: { scheduleData: ClassEntry[] }) {
  return (
    <div className="w-full">
      {scheduleData.map((classRecord, index) => {
        const nextClassPeriod = scheduleData[index + 1];
        let emptyAdjacentPeriod;
        if (
          nextClassPeriod &&
          nextClassPeriod.period !== classRecord.period + 1
        ) {
          emptyAdjacentPeriod = true;
        }
        return (
          <div key={index + "class_record"} className="flex flex-col">
            <span>
              <span className="flex flex-row gap-x-2 text-2xl sm:text-3xl">
                <p className="font-semibold">Period {classRecord.period}</p>
                <div className="flex items-center gap-1">
                  <Clock className="h-6 w-6" />
                  <p>{classRecord.timeInterval}</p>
                </div>
              </span>
              <div className="flex gap-x-2">
                {classRecord.isFirstClass && classRecord.subject && (
                  <div className="badge">
                    <Bell className="mr-1 h-3 w-3" />
                    Take Attendance
                  </div>
                )}
                {classRecord.isLastClass && classRecord.subject && (
                  <div className="badge">
                    <Bell className="mr-1 h-3 w-3" />
                    Students&apos; Last Class
                  </div>
                )}
                {classRecord.subbingFor && (
                  <div className="badge">
                    <User className="mr-1 h-3 w-3" />
                    Subbing For: {classRecord.subbingFor}
                  </div>
                )}
              </div>
            </span>
            <div className="mt-1 flex flex-row text-xl">
              <span className="w-1/3">
                <p className="font-medium">Level</p>
                <p>{classRecord.level}</p>
              </span>
              {classRecord.room && (
                <span className="w-1/3">
                  <span className="flex items-center gap-x-1">
                    <MapPin className="h-5 w-5 text-green-500" />
                    <p className="font-medium">Room</p>
                  </span>
                  <p className="">{classRecord.room}</p>
                </span>
              )}
              {classRecord.subject && (
                <span className="w-1/3">
                  <span className="flex items-center gap-x-1">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <p className="font-medium">Subject</p>
                  </span>
                  <p>{classRecord.subject}</p>
                </span>
              )}
            </div>
            <div className="divider divider-primary"></div>
            {emptyAdjacentPeriod && (
              <>
                <div>No Class</div>
                <div className="divider divider-primary"></div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
