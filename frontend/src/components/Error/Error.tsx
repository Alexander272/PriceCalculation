import { FC, useState } from 'react'
import { Description, ErrorContainer, Icon, Message, More, MoreContainer } from './error.style'

type Props = {
	message: string
	description?: string
}

export const Error: FC<Props> = ({ message, description }) => {
	const [open, setOpen] = useState(false)

	const openHandler = () => setOpen(prev => !prev)

	return (
		<ErrorContainer>
			<Icon>&#33;</Icon>
			<Message>{message}</Message>
			{description && (
				<MoreContainer>
					<More onClick={openHandler}>{open ? 'Скрыть ˄' : 'Подробнее ˅'}</More>
					<Description open={open}>{description}</Description>
				</MoreContainer>
			)}
		</ErrorContainer>
	)
}
