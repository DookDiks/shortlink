import {cn} from "@dookdiks/utils";
import AddShortLinkForm from "@/containers/AddShortLinkForm";

const EditPage = async () => {


  return (
    <div className={cn('flex h-screen justify-center items-center p-4 lg:p-0')}>
      <div className={cn('lg:w-96')}>
        <AddShortLinkForm/>
      </div>
    </div>
  );
}

export default EditPage;