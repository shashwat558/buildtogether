"use client"

import { frame, motion, useMotionValue, useSpring } from "framer-motion"
import { RefObject, useEffect, useRef } from "react"

export default function Drag() {
    const ref = useRef<HTMLDivElement>(null)
    const { x, y } = useFollowPointer(ref)

    return <motion.div variants={{hidden: {opacity: 0, y:-20},
        visible: {
            opacity: 1,
            y:50,
            transition: {
                duration: 1
            }
        }}} ref={ref} style={{ ...ball, x, y }} initial="hidden" animate="visible" />
}

const spring = { damping: 30, stiffness: 70, restDelta: 0.001 }

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
    const xPoint = useMotionValue(0)
    const yPoint = useMotionValue(0)
    const x = useSpring(xPoint, spring)
    const y = useSpring(yPoint, spring)

    useEffect(() => {
        if (!ref.current) return

        const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
            const element = ref.current!

            frame.read(() => {
                xPoint.set(
                    clientX - element.offsetLeft - element.offsetWidth / 2
                )
                yPoint.set(
                    clientY - element.offsetTop - element.offsetHeight / 2
                )
            })
        }

        window.addEventListener("pointermove", handlePointerMove)

        return () =>
            window.removeEventListener("pointermove", handlePointerMove)
    }, [ref, xPoint, yPoint])

    return { x, y }
}

/**
 * ==============   Styles   ================
 */

const ball = {
    width: 20,
    height: 20,
    backgroundColor: "rgba(200, 200, 200, 0.3)"
,
    borderRadius: "50%",
    PointerEvents: "none",
    zIndex: -1
}
