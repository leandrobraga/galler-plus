import cx from "classnames";
import { Link } from "react-router";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import Button from "./button";
import Container from "./container";
import Divider from "./divider";
import PhotoSearch from "./photo-search";
import PhotoNewDialog from "../contexts/photos/components/photo-new-dialog";

interface MainHeaderProps extends React.ComponentProps<"div"> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {
  return (
    <Container
      as="header"
      className={cx("flex justify-between items-center gap-10", className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-5" />
      </Link>
      <PhotoSearch />
      <Divider orientation="vertical" className="h-10" />
      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
        <Button variant="secondary">Criar Album</Button>
      </div>
    </Container>
  );
}
