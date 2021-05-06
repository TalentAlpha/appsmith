import React from "react";
import { TooltipStyles } from "./tooltip";
import { PopoverStyles } from "./popover";
import { CommentThreadPopoverStyles } from "./commentThreadPopovers";
import { PortalStyles } from "./portals";

export default function GlobalStyles() {
  return (
    <>
      <TooltipStyles />
      <PopoverStyles />
      <CommentThreadPopoverStyles />
      <PortalStyles />
    </>
  );
}
