import {prisma} from "@/lib/prisma";
import LinkEditForm from "@/containers/LinkEditForm";
import {permanentRedirect} from "next/navigation";
import {cn} from "@dookdiks/utils";

const EditPage = async ({
                          params: {entrypoint},
                        }: {
  params: { entrypoint: string };
}) => {

  const link = await prisma.links.findUnique({
    where: {entrypoint: entrypoint}
  })

  if (!link) permanentRedirect("/")

  return (
    <div className={cn('flex h-screen justify-center items-center p-4 lg:p-0')}>
      <div className={cn('lg:w-96')}>
        <LinkEditForm link={link}/>
      </div>
    </div>
  );
}

export default EditPage;