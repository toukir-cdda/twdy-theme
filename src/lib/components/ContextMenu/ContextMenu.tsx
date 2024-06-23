// ContextMenu.js
import React, { useRef } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  useInteractions,
  useDismiss,
  FloatingArrow,
} from "@floating-ui/react";

type ContextMenuProps = {
  children: React.ReactElement;
  menuItems: React.ReactElement[];
  arrowFill?: string;
  indicatorArrow?: boolean;
};

const ContextMenu = ({
  children,
  menuItems,
  arrowFill,
  indicatorArrow,
}: ContextMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRef = useRef(null);

  const { x, y, refs, strategy, context } = useFloating({
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const handleContextMenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      {React.cloneElement(
        children,
        getReferenceProps({
          ref: refs.setReference,
          onContextMenu: handleContextMenu,
        })
      )}
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
            zIndex: 1000,
          }}
          {...getFloatingProps()}
        >
          <div className="bg-primary-200 dark:bg-primary-700 shadow-md rounded-md p-2 relative">
            {React.Children.map(menuItems, (item) =>
              React.cloneElement(item, {
                onClick: () => {
                  if (item.props && typeof item.props.onClick === "function") {
                    item.props.onClick();
                  }

                  setIsOpen(false);
                },
              })
            )}
            {indicatorArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill={arrowFill || "white"}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
