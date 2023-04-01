import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef(null);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(bottomSheetRef);
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-white p-4 "
        >
          Open Bottom Sheet
        </button>
      </div>
      <motion.div
        animate={
          open ? { opacity: 0.6, zIndex: 3 } : { opacity: 0, display: "none" }
        }
        initial={{ opacity: 0 }}
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
      />
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { y: 0, height: "auto" },
              collapsed: { y: "100%", height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="fixed bottom-0 right-0 left-0 z-10 w-full rounded-t-3xl border-2 border-b-0 border-gray-50 bg-white shadow-[0px_-8px_20px_-6px_rgba(0,0,0,0.3)]"
          >
            <div ref={bottomSheetRef} className="h-60 p-4">
              <div className="mb-2 flex justify-end">
                <XMarkIcon className="w-6" onClick={() => setOpen(false)} />
              </div>
              <div className="flex flex-col space-y-3">
                <span>item 1</span>
                <span>item 2</span>
                <span>item 3</span>
                <span>item 4</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
