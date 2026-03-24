import { TwinStory } from "@/types";

interface TwinCardProps {
  twin: TwinStory;
}

export default function TwinCard({ twin }: TwinCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white"
          style={{ backgroundColor: twin.avatarColor }}
        >
          {twin.initial}
        </div>
        <div>
          <p className="text-base font-bold text-textPrimary">{twin.name}</p>
          <p className="text-[13px] font-bold text-primary">{twin.transition}</p>
        </div>
      </div>
      <p className="text-sm italic text-textSecondary leading-[1.6]">
        &ldquo;{twin.quote}&rdquo;
      </p>
    </div>
  );
}
