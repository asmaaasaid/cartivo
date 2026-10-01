import type { TLoading } from "@customTypes/shared"
import type React from "react"
type LoadingProps = {
    loading: TLoading,
    error: null | string,
    children: React.ReactNode
}

const Loading = ({loading, error, children}: LoadingProps) => {
    if(loading === 'pending'){
        return <p>please wait</p>
    }
    if(loading === 'failed'){
        return <p> {error} </p>
    }
  return <> {children} </>
}

export default Loading
