import { memo } from "react";

const Heading = memo( ({title}: {title: string}) => {
  return (
    <h2 className="fs-3 text-capitalize">
      {title}
    </h2>
  )
})

export default Heading
