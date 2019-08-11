import React, { useRef } from 'react'
import { Illustration, Ellipse, Rect, Shape, useRender, Box, Cylinder, Anchor } from 'react-zdog'
// New react-spring target, for native animation outside of React

/** --- Basic, re-usable shapes -------------------------- */
const TAU = Math.PI * 2

/** --- Assembly ----------------------------------------- */
function Guy() {
	// Change motion every second
	// Turn static values into animated values
	let spinDirection = 'left'
	const ref = useRef()
	let t = 0
	let mouseX, mouseY;
	window.addEventListener("mousemove", function (e) {
		mouseX = e.clientX
		mouseY = e.clientY
		
	})

	if (ref.current) {
		ref.current.rotate.x = window.width / 2 - mouseY / 5000
		ref.current.rotate.y = window.height / 2 - mouseX / 5000
	}

	useRender(() => {
		const changeX = window.innerWidth / 5000 - mouseX / 2500
		const changeY = window.innerHeight / 10000 - mouseY / 2500 
		ref.current.rotate.y = changeX
		if ((changeY < -0.0655) && (changeY > -0.145)) {
			ref.current.rotate.x = changeY
		} else if (changeY > -0.145) {
			ref.current.rotate.x = -0.0655
		}	else {
			ref.current.rotate.x = -0.145
		}
		if ((changeX < 0.28) && (changeX > -0.28)) {
			ref.current.rotate.y = changeX
		} else if (changeX > -0.28) {
			ref.current.rotate.y = 0.28
		}	else {
			ref.current.rotate.y = -0.28
		}
		console.log(ref.current.rotate.y, "y", ref.current.rotate.x, "x");
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
				translate={{ y: -3.5, z: 4.5 }}
				rotate={{ x: TAU / 4 }}
			/>
			{/* 👓 Очки */}
			<Rect
				width={1.5}
				height={1}
				translate={{ y: -2, x: -2, z: 4 }}
				color={'black'}
			/>
			<Rect
				width={1.5}
				height={1}
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
				translate={{ y: -2, x: -2, z: 4 }}
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
				color={'#452612'}
			/>
			{/* 🚬 сижка */}
			<Shape
				path={[
					{ x: 1, y: 0 },
					{ x: 4, y: 0 },
				]}
				stroke={0.5}
				closed={false}
				translate={{ y: 2, x: 1, z: 6.5 }}
				rotate={{ x: TAU / 6, z: TAU / 4.25 }}
				color={'white'}
			/>
			<Shape
				path={[
					{ x: 0, y: 0 },
					{ x: 1, y: 0 },
				]}
				stroke={0.5}
				closed={false}
				translate={{ y: 2, x: 1, z: 6.5 }}
				rotate={{ x: TAU / 6, z: TAU / 4.25 }}
				color={'orange'}
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
			zoom={12}
			className="th-hunter"
			style={{ width: 300, height: 300 }}
		>
			<Guy />
		</Illustration>
	)
}