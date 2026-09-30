const Heading = ({children}: {children: React.ReactNode}) => {
  return (
    <h2 className="fs-3 text-capitalize">
      {children}
    </h2>
  )
}

export default Heading
