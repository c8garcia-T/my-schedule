import { ClassEntry } from "@/types/search-for-schedule-types";
import { Clock, Bell, BookOpen, MapPin } from "lucide-react";

export function Schedule({ scheduleData }: { scheduleData: ClassEntry[] }) {
  return (
    <div className="w-full">
      {scheduleData.map((classRecord, index) => {
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
              {classRecord.isFirstClass && (
                <div className="badge">
                  <Bell className="mr-1 h-3 w-3" />
                  Take Attendance
                </div>
              )}
            </span>
            <div className="mt-1 flex flex-row text-xl">
              <span className="w-1/3">
                <p>Level</p>
                <p>{classRecord.level}</p>
              </span>
              <span className="w-1/3">
                <p>Room</p>
                <p>{classRecord.room}</p>
              </span>
              <span className="w-1/3">
                <p>Subject</p>
                <p>{classRecord.subject}</p>
              </span>
            </div>
            <div className="divider divider-primary"></div>
          </div>
        );
      })}
    </div>
  );
}
