import { Portfolio } from "@/components/Portfolio";
import { PageLoader } from "@/components/PageLoader";

const Index = () => {
  return (
    <PageLoader>
      <Portfolio />
    </PageLoader>
  );
};

export default Index;
