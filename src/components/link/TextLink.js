import { useLinkColors } from "styles/theme/foundations/colors";
import { Link } from "./Link";
import { navLinks } from "./links";

export const TextLink = props => {
  const linkColors = useLinkColors();
  return (
    <Link
      to={props.to}
      p={2}
      color={linkColors.default}
      _hover={{
        textDecoration: "none",
        color: linkColors.hover
      }}
      {...props}
    >
      {props.title}
    </Link>
  );
};

export const appLinks = navLinks.map(linkData => {
  return (
    <TextLink key={linkData.title} to={linkData.to} title={linkData.title} />
  );
});
