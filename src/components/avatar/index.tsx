import { ReactElement, useEffect, useState } from 'react'
import { Container, AvatarLogo, AvatarLetter } from './style'
import { getRandomHexColor } from '../../utils/helperFns'

interface Props {
	user: {
		avatar: string | undefined
		username: string
	}
}

export default function Avatar({ user }: Props): ReactElement {
	return user.avatar ? <RealAvatar user={user} /> : <LetterAvatar user={user} />
}

function RealAvatar({ user }: Props): ReactElement {
	return (
		<Container>
			<AvatarLogo src={user.avatar} />
		</Container>
	)
}

function LetterAvatar({ user }: Props): ReactElement {
	const [color, setColor] = useState(getRandomHexColor())

	useEffect(() => {
		setColor(getRandomHexColor())
	}, [user.username])

	return (
		<Container background={color}>
			<AvatarLetter>{user.username.charAt(0).toUpperCase()}</AvatarLetter>
		</Container>
	)
}

function getRandomAvatar() {
	const url = 'https://ui-avatars.com/api/?background=random&name='
}
