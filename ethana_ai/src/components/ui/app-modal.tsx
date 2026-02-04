import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { SET_MODAL } from "@/store/reducer/notify-reducer"

export interface AppModalProps {
  // open: boolean
  // onOpenChange: (open: boolean) => void
  heading?: string
  body: React.ReactNode
}

export function AppModal({

  heading,
  body,
}: AppModalProps) {
  const open =useSelector((state:any)=>state?.notify?.modalState)
  const dispatch=useDispatch()
  const onOpenChange=()=>dispatch(SET_MODAL(false))
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl bg-background p-6 shadow-lg"
        >

          {heading && (
            <DialogHeader>
              <DialogTitle>{heading}</DialogTitle>
            </DialogHeader>
          )}

          <div className="mt-4">
            {body}
          </div>

        </motion.div>

      </DialogContent>
    </Dialog>
  )
}
