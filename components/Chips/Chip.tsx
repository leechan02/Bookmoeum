export default function Chip({ label }: { label: string }) {
  return (
    <div className="inline-flex justify-center items-center py-1 px-2 rounded-full bg-secondary">
      <div className="text-xs text-primary font-medium">{label}</div>
    </div>
  );
}
