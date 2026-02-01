const IconHeader = ({ text, icon }) => {
  return (
    <div className="icon-header">
      <div className="icon-header-text">{text}</div>
      <div className="icon-header-splitter" />
      <div className="icon-header-icon">{icon}</div>
    </div>
  )
}

export default IconHeader
