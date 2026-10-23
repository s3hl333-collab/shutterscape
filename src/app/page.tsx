import ShutterscapeClient from "@/components/ShutterscapeClient";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [gallery, members, activities] = await Promise.all([
    db.getGallery(),
    db.getMembers(),
    db.getActivities(),
  ]);

  return (
    <ShutterscapeClient
      initialGallery={gallery}
      initialMembers={members}
      initialActivities={activities}
    />
  );
}
