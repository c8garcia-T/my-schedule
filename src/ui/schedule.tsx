import { ClassEntry } from "@/types/search-for-schedule-types";

export function Schedule({ scheduleData }: { scheduleData: ClassEntry[] }) {
  return scheduleData.map((classRecord, index) => {
    return (
      <div key={index + "class_record"} className="flex flex-col">
        <span className="mb-4 flex flex-row gap-x-2 text-2xl sm:text-3xl">
          <p>Period {classRecord.period}</p>
          <p>{classRecord.timeInterval}</p>
        </span>
        <div className="flex flex-row text-xl">
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
  });
}
