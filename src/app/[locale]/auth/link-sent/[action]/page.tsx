import ActionMessage from "@/shared/components/pages/auth/linkSent";
import { LinkSentPageProps } from "@/shared/interfaces/auth";
import { generateMetadata } from "@/shared/utils/metadataUtils";

export default async function LinkSentPage({ params }: LinkSentPageProps) {
  const { action } = await params;

  return <ActionMessage action={action} />;
}

export const metadata = async () =>
  await generateMetadata({ pageName: "linkSent" });
