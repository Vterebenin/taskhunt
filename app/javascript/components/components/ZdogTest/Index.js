import React, { useRef, useEffect, useState } from 'react'
import { Illustration, Ellipse, Rect, Shape, useRender, Box, Cylinder, Anchor } from 'react-zdog'
// New react-spring target, for native animation outside of React
import './styles.css'

/** --- Basic, re-usable shapes -------------------------- */
const TAU = Math.PI * 2

/** --- Assembly ----------------------------------------- */
function Guy() {
	// Change motion every second
	// Turn static values into animated values
	let spinDirection = 'left'
	const ref = useRef()
	let t = 0
	useRender(() => {
		if ((ref.current.rotate.y < 0.4) && (spinDirection === 'left')) {
			ref.current.rotate.y += 0.001
			ref.current.rotate.z += 0.001
		} else if (ref.current.rotate.y > -0.4) {
			spinDirection = 'right'
			ref.current.rotate.y -= 0.001
			ref.current.rotate.z -= 0.001

		} else if (ref.current.rotate.y < -0.4) {
			spinDirection = 'left'
			ref.current.rotate.y -= 0.001
			ref.current.rotate.z -= 0.001

		}

		// ref.current.rotate.y = Math.cos((t += 0.1) / TAU)
		// ref.current.rotate.x = Math.sin((t += 0.1) / TAU)
	})
	return (
		<Anchor ref={ref}>
				{/* 🎩 шапка  */}
				<Cylinder
					diameter={8}
					length={5}
					stroke={false}
					color={'#452612'}
					backface={'#857460'}
					translate={{ y: -6.25, z: 3 }}
					rotate={{ x: TAU / 4 }}

				/>
				<Ellipse
					width={20}
					height={23}
					stroke={1}
					fill={true}

					color={'#452612'}
					translate={{ y: -3.5, z: 5 }}
					rotate={{ x: TAU / 4 }}
				/>
				{/* 👓 Очки */}
				<Rect
					width={0.75}
					height={0.75}
					translate={{ y: -2, x: -2, z: 4 }}
					color={'black'}
				/>
				<Rect
					width={0.75}
					height={0.75}
					// stroke={0.75}
					translate={{ y: -2, x: 2, z: 4 }}
					color={'black'}
				/>
				<Shape
					path={[
						{ x: 0, y: 0 },
						{ x: 4, y: 0 },
					]}
					stroke={0.5}
					closed={false}
					translate={{ y: -2, x: -2, z: 4}}
					// rotate={{ x: TAU / 16, y: TAU / 4 }}
					color={'black'}
				/>
				{/* 👃 нос */}
				<Shape
					path={[
						{ x: 0, y: -1 },
						{ x: 1, y: 1 },
						{ x: -1, y: 1 },
					]}
					stroke={0.75}
					closed={false}
					translate={{ y: 0, x: 0, z: 6.5 }}
					rotate={{ x: TAU / 16, y: TAU / 4 }}
					color={'#664731'}
				/>
				{/* 🚬 сижка */}
				<Shape
					path={[
						{ x: 0, y: 0 },
						{ x: 4, y: 0 },
					]}
					stroke={0.5}
					closed={false}
					translate={{ y: 2, x: 2, z: 6.5 }}
					rotate={{ x: TAU / 6, y: TAU / 4, z: TAU / 4 }}
					color={'red'}
				/>
				{/* 😒 голова  */}
				<Box
					width={8}
					height={6}
					depth={4}
					stroke={false}
					color={'#9c6b49'}
					leftFace={'#a87b5b'}
					rightFace={'#a87b5b'}
					translate={{ y: 0, z: 1.5 }}
				/>

		</Anchor>

	)
}


export default function Index() {
	
	return (
		<Illustration
			onDragStart={(pointer) => {
				console.log(`Drag started at ${pointer.pageX}, ${pointer.pageY}`)
			}}
			zoom={10}
			style={{ width: 300, height: 300 }}
		>
			<Guy />
		</Illustration>
	)
}