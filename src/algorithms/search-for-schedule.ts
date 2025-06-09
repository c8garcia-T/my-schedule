import { Schedule, ClassEntry } from "@/types/get-class-data-type";

function computeClassEndTime(
  hour: number,
  minutes: number,
): { hour: number; minutes: number } {
  minutes = minutes + 42;
  if (minutes > 59) {
    hour++;
    minutes -= 60;
  }
  return { hour: hour, minutes: minutes };
}

export function searchForSchedule(data: any[][], name: string): Schedule {
  let invalidSearchResults = 0;
  const schedule: ClassEntry[] = [];
  for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
    const row = data[rowIdx];
    const nameColumnIndx = row.indexOf(name);
    let period;
    let timeInterval;
    if (nameColumnIndx !== -1) {
      // Find the Period Column
      const periodRow = data[rowIdx - 3];
      for (let colIdx = nameColumnIndx - 1; colIdx >= 0; colIdx--) {
        if (typeof periodRow[colIdx] === "number") {
          if (periodRow[colIdx] % 1 === 0) {
            period = periodRow[colIdx];
            const rawTime = periodRow[colIdx + 1] * 24;
            let hour = Math.floor(rawTime);
            let minutes = Math.ceil((rawTime % 1) * 60);
            if (minutes === 60) {
              hour++;
              minutes = 0;
            }
            const classEndTime = computeClassEndTime(hour, minutes);
            const endHour = classEndTime.hour;
            const endMinutes = classEndTime.minutes;
            const endTimeStr = `${endHour}:${endMinutes.toString().padEnd(2, "0")} PM`;
            timeInterval = `${hour}:${minutes.toString().padEnd(2, "0")} PM - ${endTimeStr}`;
            break;
          }
        }
      }
      if (period) {
        const dataSlice = data.slice(rowIdx - 3, rowIdx + 2);
        // save valid data
        const classEntry: ClassEntry = {
          level: dataSlice[0][nameColumnIndx],
          room: dataSlice[1][nameColumnIndx] ?? null,
          subbingFor: dataSlice[2][nameColumnIndx] ?? null,
          teacher: dataSlice[3][nameColumnIndx],
          subject: dataSlice[4][nameColumnIndx] ?? null,
          period: period,
          timeInterval: timeInterval!, // timeInterval will always be generated if period is found.
        };
        schedule.push(classEntry);
      } else {
        invalidSearchResults++;
      }
    }
  }

  return { schedule: schedule, invalidSearchResults: invalidSearchResults };
}
