export function EmptySchedule({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center gap-x-2 text-2xl">
      <div className="inline-grid *:[grid-area:1/1]">
        <div className="status status-error animate-ping"></div>
        <div className="status status-error"></div>
      </div>
      &ldquo;{name}&rdquo; was not found in the file.
    </div>
  );
}
