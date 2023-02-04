import { ReactElement } from 'react'
import { Container, AvatarLogo } from './style'

interface Props {
	user: {
		avatar: string | undefined
		username: string
	}
}

export default function Avatar({ user }: Props): ReactElement {
	return <RealAvatar user={user} />
}

function RealAvatar({ user }: Props): ReactElement {
	return (
		<Container>
			<AvatarLogo src={user.avatar} />
		</Container>
	)
}
