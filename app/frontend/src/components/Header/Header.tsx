import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Back, HeaderContainer } from './header.style'

type Props = {}

export const Header: FC<Props> = () => {
	// const location = useLocation()

	return <HeaderContainer>{/* {location.pathname != '/' && <Back>&darr;</Back>} */}</HeaderContainer>
}
