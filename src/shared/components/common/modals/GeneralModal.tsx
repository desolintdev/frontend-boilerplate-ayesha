"use client";

import { Fragment, ReactNode } from "react";

import { FiLoader } from "react-icons/fi";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { ButtonProps, GeneralModalProps } from "@/shared/interfaces/dialogs";

export const GeneralModal = ({
  title,
  content,
  isOpen,
  setIsOpen,
  width = "w-[550px]",
  buttons,
  buttonsAlignment = "justify-center",
}: GeneralModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`${width}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col">
              {content && (
                <>
                  {content.map((contentItem: ReactNode, index: number) => (
                    <Fragment key={"key" + index}>{contentItem}</Fragment>
                  ))}
                </>
              )}
            </div>
            {buttons && (
              <div
                className={`flex gap-[10px] pt-5 w-full items-center ${buttonsAlignment}`}
              >
                {buttons.map((button: ButtonProps) => (
                  <Button
                    className={button.styles}
                    onClick={button.handleClick}
                    key={button.title}
                    variant={button.variant}
                  >
                    {!button?.loading ? (
                      button.title
                    ) : (
                      <FiLoader
                        className="loader-icon"
                        size={20}
                        color={button.loaderColor}
                      />
                    )}
                  </Button>
                ))}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
