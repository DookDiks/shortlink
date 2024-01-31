import CardDisplayLink from "@/containers/CardDisplayLink";
import {prisma} from "@/lib/prisma";
import {getSession} from "@/utils/session";
import HomeNav from "@/components/nav/HomeNav";

const HomePage = async () => {
  const session = await getSession();
  const links = await prisma.links.findMany({
    where: {
      userId: session.id,
    },
  });
  return (
    <>
      <HomeNav/>
      <div className="flex w-full relative h-screen" style={{paddingTop: "4.25rem"}}>
        <div className="w-full h-full flex flex-col justify-between overflow-clip" style={{padding: "0.5rem"}}>
          <CardDisplayLink links={links}/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
