import {
  differenceInHours,
  differenceInCalendarDays,
  format,
} from "date-fns";

type Post = {
  id: number;
  title: string;
  body: string;
  category: string;
  file_url: string | null;
  created_at: string;
  deadline_date?: string |null;
};

const categoryConfig: Record<
  string,
  {
    color: string;
    label: string;
  }
> = {
  deadline: { color: "#C9482F", label: "Deadline" },
  notice: { color: "#2D6E5E", label: "Notice" },
  news: { color: "#B8860B", label: "News" },
  publication: { color: "#3B5BA5", label: "Publication" },
  notes: { color: "#5B6478", label: "Notes" },
};

function isNew(createdAt: string) {
  const date = new Date(createdAt);
  return (
    !isNaN(date.getTime()) &&
    differenceInHours(new Date(), date) < 48
  );
}

function deadlineStatus(deadlineDate: string) {
  const daysLeft = differenceInCalendarDays(
    new Date(deadlineDate),
    new Date()
  );

  if (daysLeft < 0)
    return { label: "Past due", color: "#8A8A8A" };

  if (daysLeft === 0)
    return { label: "Due today", color: "#C9482F" };

  if (daysLeft <= 3)
    return { label: `${daysLeft}d left`, color: "#C9482F" };

  if (daysLeft <= 7)
    return { label: `${daysLeft}d left`, color: "#B8860B" };

  return { label: `${daysLeft}d left`, color: "#2D6E5E" };
}

export default function PostCard({ post }: { post: Post }) {
  const config =
    categoryConfig[post.category] ?? {
      color: "#5B6478",
      label: post.category,
    };

  const deadline = post.deadline_date
    ? deadlineStatus(post.deadline_date)
    : null;

  const createdDate = new Date(post.created_at);

  return (
    <div
      className="bg-white rounded-lg p-4 border border-l-4 shadow-sm"
      style={{
        borderColor: "var(--line)",
        borderLeftColor: config.color,
      }}
    >
      <div className="flex justify-between items-start gap-3 mb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className="font-display font-semibold text-base"
            style={{ color: "var(--ink)" }}
          >
            {post.title}
          </h3>

          {isNew(post.created_at) && (
            <span
              className="text-[10px] font-mono-data uppercase px-1.5 py-0.5 rounded"
              style={{
                background: "#FDF3E0",
                color: "#B8860B",
              }}
            >
              New
            </span>
          )}
        </div>

        {deadline && (
          <span
            className="text-xs font-mono-data px-2 py-1 rounded shrink-0"
            style={{
              background: `${deadline.color}1A`,
              color: deadline.color,
            }}
          >
            {deadline.label}
          </span>
        )}
      </div>

      <p
        className="text-xs uppercase font-mono-data mb-2"
        style={{ color: config.color }}
      >
        {config.label}
      </p>

      <p
        className="text-sm whitespace-pre-wrap mb-3"
        style={{ color: "var(--slate)" }}
      >
        {post.body}
      </p>

      {post.file_url && (
        <a
          href={post.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline"
          style={{ color: "#3B5BA5" }}
        >
          View attachment
        </a>
      )}

      <p
        className="text-xs font-mono-data mt-3"
        style={{ color: "var(--slate)" }}
      >
        {!isNaN(createdDate.getTime())
          ? format(createdDate, "d MMM yyyy")
          : "Unknown date"}
      </p>
    </div>
  );
}