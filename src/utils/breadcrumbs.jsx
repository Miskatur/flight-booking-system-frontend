import { ChevronRight, House } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
  currentPath,
}) => {
  return (
    <div className="flex items-center">
      <div>
        <House size={20} className="text-textColor" />
      </div>
      <div>
        <ChevronRight strokeWidth={1} size={24} />
      </div>
      <div>
        <Link className="" to={primaryLink}>
          {primaryText}
        </Link>
      </div>
      {/* second  text and link */}
      {secondaryText && secondaryLink && (
        <>
          <div>
            <ChevronRight strokeWidth={1} size={24} />
          </div>
          <div>
            <Link to={primaryLink}>{primaryText}</Link>
          </div>
        </>
      )}
      <div>
        <ChevronRight strokeWidth={1} size={24} />
      </div>
      <div>
        <p className="text-primary font-medium">{currentPath}</p>
      </div>
    </div>
  );
};

export default Breadcrumbs;
