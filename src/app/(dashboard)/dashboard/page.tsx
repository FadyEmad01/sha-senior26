import { PageHeader } from "@/components/shared/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to your dashboard."
      />
      {/* Add dashboard widgets / feature components here */}
    </div>
  );
}
