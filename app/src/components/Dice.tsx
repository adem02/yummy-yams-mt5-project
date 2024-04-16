import React, {ReactNode, useContext, useLayoutEffect, useRef, useState} from 'react';
import {gsap} from "gsap";
import {AppContext} from "../store/app.context.tsx";

type Props = {
    children?: ReactNode,
    key?: number,
    value: number,
}

const Dice: React.FC<Props> = (props: Props) => {
    const {triesLeft} = useContext(AppContext);

    const faces: number[] = [
        props.value,
        ...gsap.utils.shuffle([1, 2, 3, 4, 5, 6].filter(v => v !== props.value))
    ];

    const dice = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(dice.current!, {
                rotationX: 'random(720, 1080)',
                rotationY: 'random(720, 1080)',
                rotationZ: 0,
                duration: 'random(2, 3)'
            })
        }, dice);

        return () => ctx.revert();
    }, [props.value]);

    return (
        <div className="dice-container">
            <div className="dice" ref={dice}>
                {faces.map((value, index) => (
                    <div key={index} className="face">{value}</div>
                ))}
            </div>
        </div>
    );
};

export default Dice;
