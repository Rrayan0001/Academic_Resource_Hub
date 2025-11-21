import { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion";

const GlowingEffect = memo(
    ({
        blur = 0,
        inactiveZone = 0.7,
        proximity = 0,
        spread = 20,
        glow = false,
        className = '',
        movementDuration = 2,
        borderWidth = 1,
        disabled = true,
    }) => {
        const containerRef = useRef(null);
        const lastPosition = useRef({ x: 0, y: 0 });
        const animationFrameRef = useRef(0);

        const handleMove = useCallback(
            (e) => {
                if (!containerRef.current) return;

                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }

                animationFrameRef.current = requestAnimationFrame(() => {
                    const element = containerRef.current;
                    if (!element) return;

                    const { left, top, width, height } = element.getBoundingClientRect();
                    const mouseX = e?.x ?? lastPosition.current.x;
                    const mouseY = e?.y ?? lastPosition.current.y;

                    if (e) {
                        lastPosition.current = { x: mouseX, y: mouseY };
                    }

                    const center = [left + width * 0.5, top + height * 0.5];
                    const distanceFromCenter = Math.hypot(
                        mouseX - center[0],
                        mouseY - center[1]
                    );
                    const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

                    if (distanceFromCenter < inactiveRadius) {
                        element.style.setProperty("--active", "0");
                        return;
                    }

                    const isActive =
                        mouseX > left - proximity &&
                        mouseX < left + width + proximity &&
                        mouseY > top - proximity &&
                        mouseY < top + height + proximity;

                    element.style.setProperty("--active", isActive ? "1" : "0");

                    if (!isActive) return;

                    const currentAngle =
                        parseFloat(element.style.getPropertyValue("--start")) || 0;
                    let targetAngle =
                        (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
                        Math.PI +
                        90;

                    const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
                    const newAngle = currentAngle + angleDiff;

                    animate(currentAngle, newAngle, {
                        duration: movementDuration,
                        ease: [0.16, 1, 0.3, 1],
                        onUpdate: (value) => {
                            element.style.setProperty("--start", String(value));
                        },
                    });
                });
            },
            [inactiveZone, proximity, movementDuration]
        );

        useEffect(() => {
            if (disabled) return;

            const handleScroll = () => handleMove();
            const handlePointerMove = (e) => handleMove(e);

            window.addEventListener("scroll", handleScroll, { passive: true });
            document.body.addEventListener("pointermove", handlePointerMove, {
                passive: true,
            });

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                window.removeEventListener("scroll", handleScroll);
                document.body.removeEventListener("pointermove", handlePointerMove);
            };
        }, [handleMove, disabled]);

        return (
            <>
                <div
                    style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        inset: '-1px',
                        display: disabled ? 'block' : 'none',
                        borderRadius: 'inherit',
                        border: '1px solid rgba(200, 200, 200, 0.2)',
                        opacity: glow ? 1 : 0,
                        transition: 'opacity 0.3s'
                    }}
                />
                <div
                    ref={containerRef}
                    style={{
                        '--blur': `${blur}px`,
                        '--spread': spread,
                        '--start': '0',
                        '--active': '0',
                        '--glowingeffect-border-width': `${borderWidth}px`,
                        '--repeating-conic-gradient-times': '5',
                        '--gradient': `radial-gradient(circle, rgba(59, 130, 246, 0.8) 10%, rgba(59, 130, 246, 0) 20%),
              radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.6) 5%, rgba(139, 92, 246, 0) 15%),
              radial-gradient(circle at 60% 60%, rgba(16, 185, 129, 0.8) 10%, rgba(16, 185, 129, 0) 20%), 
              radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.7) 10%, rgba(59, 130, 246, 0) 20%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                rgba(59, 130, 246, 0.8) 0%,
                rgba(139, 92, 246, 0.6) calc(25% / var(--repeating-conic-gradient-times)),
                rgba(16, 185, 129, 0.8) calc(50% / var(--repeating-conic-gradient-times)), 
                rgba(59, 130, 246, 0.7) calc(75% / var(--repeating-conic-gradient-times)),
                rgba(59, 130, 246, 0.8) calc(100% / var(--repeating-conic-gradient-times))
              )`,
                        pointerEvents: 'none',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                        opacity: 1,
                        transition: 'opacity 0.3s',
                        filter: blur > 0 ? `blur(${blur}px)` : 'none',
                        display: disabled ? 'none' : 'block',
                        ...className
                    }}
                    className={className}
                >
                    <div
                        style={{
                            borderRadius: 'inherit',
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            WebkitMaskImage: 'conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), transparent 0deg, #fff, transparent calc(var(--spread) * 2deg))',
                            maskImage: 'conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), transparent 0deg, #fff, transparent calc(var(--spread) * 2deg))'
                        }}
                    >
                        <div
                            style={{
                                content: '""',
                                borderRadius: 'inherit',
                                position: 'absolute',
                                inset: `calc(-1 * var(--glowingeffect-border-width))`,
                                padding: 'var(--glowingeffect-border-width)',
                                background: 'linear-gradient(transparent, transparent), var(--gradient)',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'border-box',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                maskComposite: 'exclude',
                                opacity: 'var(--active)',
                                transition: 'opacity 0.3s',
                                pointerEvents: 'none'
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }
);

GlowingEffect.displayName = "GlowingEffect";

export default GlowingEffect;
