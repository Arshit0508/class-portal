import { Mail } from "lucide-react";

const ADMIN_EMAIL = "arshitjearth@gmail.com";

export default function ContactAdmin() {
  const subject = encodeURIComponent("CSE 2028 Portal — Query");
  const body = encodeURIComponent("Hi Arshit,\n\n");
  const mailtoLink = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <a
      href={mailtoLink}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors hover:bg-gray-100"
      style={{ borderColor: "var(--line)", color: "var(--ink)" }}
    >
      <Mail size={16} />
      <span>Contact Admin</span>
    </a>
  );
}