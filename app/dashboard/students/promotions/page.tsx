import { Empty } from "@/components/ui/empty";

export default function StudentPromotionsPage() {
  return (
    <div className="flex h-[50vh] items-center justify-center rounded-lg border-2 border-dashed">
      <Empty title="No Promotions Data" description="The student promotions module is under development. Please check back later." />
    </div>
  );
}
