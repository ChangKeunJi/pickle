import DirDropdown from "../utility/DirDropdown";

const Directory = ({ dir }) => {
  let title = dir.title;

  if (title.length > 16) {
    title = title.slice(0, 16);
    title += "...";
  }

  return (
    <div className="dir-item">
      {title}
      <DirDropdown />
    </div>
  );
};

export default Directory;
