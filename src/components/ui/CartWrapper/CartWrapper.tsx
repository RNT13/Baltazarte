
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type CartWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const CartWrapper = ({ isOpen, onClose, children }: CartWrapperProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              opacity: {
                duration: 0.3,
              },
              when: "beforeChildren",
            }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(5px)",
              zIndex: 99,
            }}
          />

          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "end",
              zIndex: 100,
            }}
            onClick={onClose}
          >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

