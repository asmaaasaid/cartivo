import type { TLoading } from "@customTypes/shared"
import type React from "react"
type LoadingProps = {
    status: TLoading,
    error: null | string,
    children: React.ReactNode
}

const Loading = ({status, error, children}: LoadingProps) => {
    if(status === 'pending'){
        return <p>please wait</p>
    }
    if(status === 'failed'){
        return <p> {error} </p>
    }
  return <> {children} </>
}

export default Loading
