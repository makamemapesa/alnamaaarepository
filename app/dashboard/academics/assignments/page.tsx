import { Empty } from "@/components/ui/empty";

export default function AssignmentsPage() {
  return (
    <div className="flex h-[50vh] items-center justify-center rounded-lg border-2 border-dashed">
      <Empty title="No Assignments" description="The assignments module is under development. Please check back later." />
    </div>
  );
}
